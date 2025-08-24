/**
 * n8n Workflow Phase Stitcher
 * Intelligently combines parallel-developed phases into a unified workflow
 */

class WorkflowPhaseStitcher {
  constructor(schema, phaseOutputs) {
    this.schema = schema;
    this.phaseOutputs = phaseOutputs;
    this.unifiedWorkflow = {
      name: schema.metadata.name,
      nodes: [],
      connections: {},
      settings: schema.settings || {},
      staticData: null,
      pinData: {}
    };
    this.nodeIdMap = new Map();
    this.errors = [];
  }

  /**
   * Main stitching orchestration
   */
  async stitch() {
    try {
      console.log('🔄 Starting phase stitching process...');
      
      // Step 1: Validate all phase outputs
      if (!this.validatePhaseOutputs()) {
        throw new Error('Phase validation failed: ' + this.errors.join(', '));
      }

      // Step 2: Merge nodes with intelligent positioning
      this.mergeNodes();

      // Step 3: Resolve and create connections
      this.resolveConnections();

      // Step 4: Validate interfaces between phases
      this.validateInterfaces();

      // Step 5: Apply error handling
      this.applyErrorHandling();

      // Step 6: Final validation
      const isValid = await this.validateUnifiedWorkflow();
      
      if (!isValid) {
        throw new Error('Unified workflow validation failed');
      }

      console.log('✅ Stitching completed successfully');
      return this.unifiedWorkflow;
      
    } catch (error) {
      console.error('❌ Stitching failed:', error);
      throw error;
    }
  }

  /**
   * Validate that all phase outputs are present and valid
   */
  validatePhaseOutputs() {
    console.log('🔍 Validating phase outputs...');
    
    for (const phaseKey in this.schema.node_registry) {
      if (!this.phaseOutputs[phaseKey]) {
        this.errors.push(`Missing output for ${phaseKey}`);
        return false;
      }

      const phaseOutput = this.phaseOutputs[phaseKey];
      
      // Check for required nodes
      const expectedNodes = this.schema.node_registry[phaseKey];
      const outputNodeIds = phaseOutput.nodes.map(n => n.id);
      
      for (const expectedNode of expectedNodes) {
        if (!outputNodeIds.includes(expectedNode.id)) {
          this.errors.push(`Missing node ${expectedNode.id} in ${phaseKey}`);
          return false;
        }
      }
    }
    
    return true;
  }

  /**
   * Merge nodes from all phases with intelligent positioning
   */
  mergeNodes() {
    console.log('🔗 Merging nodes from all phases...');
    
    let xOffset = 0;
    const PHASE_SPACING = 400;
    
    Object.keys(this.schema.node_registry).forEach((phaseKey, phaseIndex) => {
      const phaseOutput = this.phaseOutputs[phaseKey];
      
      phaseOutput.nodes.forEach(node => {
        // Create unique node ID for unified workflow
        const unifiedNodeId = `${node.id}_${phaseKey}`;
        
        // Store mapping for connection resolution
        this.nodeIdMap.set(`${phaseKey}:${node.id}`, unifiedNodeId);
        
        // Adjust position to prevent overlap
        const adjustedNode = {
          ...node,
          id: unifiedNodeId,
          name: node.name || unifiedNodeId,
          position: [
            node.position[0] + xOffset,
            node.position[1]
          ]
        };
        
        // Add to unified workflow
        this.unifiedWorkflow.nodes.push(adjustedNode);
      });
      
      // Update offset for next phase
      xOffset += PHASE_SPACING;
    });
    
    console.log(`✅ Merged ${this.unifiedWorkflow.nodes.length} nodes`);
  }

  /**
   * Resolve connections between nodes across phases
   */
  resolveConnections() {
    console.log('🔌 Resolving connections...');
    
    // First, add intra-phase connections
    Object.keys(this.schema.node_registry).forEach(phaseKey => {
      const phaseOutput = this.phaseOutputs[phaseKey];
      
      if (phaseOutput.connections) {
        Object.entries(phaseOutput.connections).forEach(([sourceId, targets]) => {
          const unifiedSourceId = this.nodeIdMap.get(`${phaseKey}:${sourceId}`);
          
          if (!this.unifiedWorkflow.connections[unifiedSourceId]) {
            this.unifiedWorkflow.connections[unifiedSourceId] = {};
          }
          
          // Map target connections
          Object.entries(targets).forEach(([outputType, targetList]) => {
            this.unifiedWorkflow.connections[unifiedSourceId][outputType] = 
              targetList.map(targetArray => 
                targetArray.map(target => ({
                  ...target,
                  node: this.nodeIdMap.get(`${phaseKey}:${target.node}`) || target.node
                }))
              );
          });
        });
      }
    });
    
    // Then, add inter-phase connections from schema
    this.schema.connections.forEach(connection => {
      const sourcePhase = this.findNodePhase(connection.source.node);
      const targetPhase = this.findNodePhase(connection.target.node);
      
      const sourceNodeId = this.nodeIdMap.get(`${sourcePhase}:${connection.source.node}`);
      const targetNodeId = this.nodeIdMap.get(`${targetPhase}:${connection.target.node}`);
      
      if (sourceNodeId && targetNodeId) {
        if (!this.unifiedWorkflow.connections[sourceNodeId]) {
          this.unifiedWorkflow.connections[sourceNodeId] = {};
        }
        
        const outputType = connection.source.output || 'main';
        const inputIndex = connection.target.input || 0;
        
        if (!this.unifiedWorkflow.connections[sourceNodeId][outputType]) {
          this.unifiedWorkflow.connections[sourceNodeId][outputType] = [[]];
        }
        
        this.unifiedWorkflow.connections[sourceNodeId][outputType][0].push({
          node: targetNodeId,
          type: outputType,
          index: inputIndex
        });
      }
    });
    
    console.log('✅ Connections resolved');
  }

  /**
   * Validate interfaces between phases match schema definitions
   */
  validateInterfaces() {
    console.log('🔎 Validating phase interfaces...');
    
    for (const interfaceKey in this.schema.interfaces) {
      const interface = this.schema.interfaces[interfaceKey];
      const [sourcePhase, targetPhase] = interfaceKey.split('_to_');
      
      // Find boundary nodes
      const sourceBoundaryNodes = this.findPhaseBoundaryNodes(sourcePhase, 'output');
      const targetBoundaryNodes = this.findPhaseBoundaryNodes(targetPhase, 'input');
      
      // Validate data compatibility
      sourceBoundaryNodes.forEach(sourceNode => {
        const sourceOutput = sourceNode.outputs?.find(o => o.name === interface.output.format);
        
        targetBoundaryNodes.forEach(targetNode => {
          const targetInput = targetNode.inputs?.find(i => i.data === interface.input.expects);
          
          if (!sourceOutput || !targetInput) {
            console.warn(`⚠️ Interface mismatch between ${sourceNode.id} and ${targetNode.id}`);
          }
        });
      });
    }
    
    console.log('✅ Interfaces validated');
  }

  /**
   * Apply error handling configuration from schema
   */
  applyErrorHandling() {
    console.log('🛡️ Applying error handling...');
    
    Object.entries(this.schema.error_handling).forEach(([phaseKey, handlers]) => {
      const phaseNodes = this.unifiedWorkflow.nodes.filter(node => 
        node.id.includes(phaseKey)
      );
      
      phaseNodes.forEach(node => {
        // Apply error handling based on schema configuration
        Object.entries(handlers).forEach(([errorType, errorConfig]) => {
          if (node.parameters) {
            node.parameters.onError = errorConfig.action;
            
            if (errorConfig.max_retries) {
              node.parameters.retryOnFail = true;
              node.parameters.maxRetries = errorConfig.max_retries;
            }
            
            if (errorConfig.initial_wait) {
              node.parameters.waitBetweenRetries = errorConfig.initial_wait;
            }
          }
        });
      });
    });
    
    console.log('✅ Error handling applied');
  }

  /**
   * Final validation of the unified workflow
   */
  async validateUnifiedWorkflow() {
    console.log('🏁 Running final validation...');
    
    // Check node count
    const expectedNodeCount = Object.values(this.schema.node_registry)
      .reduce((sum, phase) => sum + phase.length, 0);
    
    if (this.unifiedWorkflow.nodes.length !== expectedNodeCount) {
      console.error(`Node count mismatch: expected ${expectedNodeCount}, got ${this.unifiedWorkflow.nodes.length}`);
      return false;
    }
    
    // Check all nodes have connections (except triggers)
    const connectedNodes = new Set();
    Object.values(this.unifiedWorkflow.connections).forEach(targets => {
      Object.values(targets).forEach(targetList => {
        targetList.forEach(targetArray => {
          targetArray.forEach(target => connectedNodes.add(target.node));
        });
      });
    });
    
    const unconnectedNodes = this.unifiedWorkflow.nodes
      .filter(node => 
        !node.type.includes('trigger') && 
        !connectedNodes.has(node.id) &&
        !this.unifiedWorkflow.connections[node.id]
      );
    
    if (unconnectedNodes.length > 0) {
      console.warn('⚠️ Unconnected nodes found:', unconnectedNodes.map(n => n.id));
    }
    
    // Validate required fields
    const invalidNodes = this.unifiedWorkflow.nodes.filter(node => 
      !node.id || !node.type || !node.position
    );
    
    if (invalidNodes.length > 0) {
      console.error('Invalid nodes found:', invalidNodes);
      return false;
    }
    
    console.log('✅ Workflow validation passed');
    return true;
  }

  /**
   * Helper: Find which phase a node belongs to
   */
  findNodePhase(nodeId) {
    for (const [phaseKey, nodes] of Object.entries(this.schema.node_registry)) {
      if (nodes.some(n => n.id === nodeId)) {
        return phaseKey;
      }
    }
    return null;
  }

  /**
   * Helper: Find boundary nodes for a phase
   */
  findPhaseBoundaryNodes(phaseKey, direction) {
    const phaseNodes = this.schema.node_registry[phaseKey] || [];
    
    if (direction === 'output') {
      // Find nodes that output to other phases
      return phaseNodes.filter(node => 
        node.outputs && node.outputs.length > 0
      );
    } else {
      // Find nodes that receive input from other phases
      return phaseNodes.filter(node => 
        node.inputs && node.inputs.length > 0
      );
    }
  }

  /**
   * Export the unified workflow as n8n-compatible JSON
   */
  exportWorkflow() {
    return {
      name: this.unifiedWorkflow.name,
      nodes: this.unifiedWorkflow.nodes,
      connections: this.unifiedWorkflow.connections,
      active: false,
      settings: this.unifiedWorkflow.settings,
      versionId: "GENERATED_UUID",
      id: "GENERATED_UUID",
      meta: {
        instanceId: "GENERATED_UUID"
      },
      tags: []
    };
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WorkflowPhaseStitcher;
}