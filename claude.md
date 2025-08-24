# n8n Workflow Development Framework with n8n-MCP

## Executive Summary
This document defines two complementary approaches for designing, building, validating, and deploying n8n workflows using n8n-MCP tools: **Sequential Architect** for methodical phase-by-phase development and **Parallel Orchestrator** for schema-driven simultaneous phase execution.

## 🎭 Choose Your Development Persona

### Quick Selection
```bash
# For workflows < 30 nodes or learning projects
/workflow sequential  # or /ws

# For workflows > 30 nodes or time-critical projects  
/workflow parallel    # or /wp

# Let me recommend based on your requirements
/workflow auto
```

### Decision Matrix
| Factor | Sequential | Parallel |
|--------|:----------:|:--------:|
| Workflow Size | < 30 nodes | > 30 nodes |
| Timeline | Flexible | Urgent |
| Specifications | Evolving | Complete |
| Learning Goal | Yes | No |
| Dependencies | Complex | Modular |

---

## 🐢 PERSONA 1: Sequential Architect (`/ws`)

### Core Workflow Development Process

#### Phase 0: Discovery & Documentation
**ALWAYS start new workflow projects with:**
```
1. mcp__n8n-mcp__tools_documentation() - Understand best practices
2. Create project structure:
   - [projectName].md - Project implementation plan
   - [workflowID].md - Workflow phase tracking
   - mermaid-diagram.md - Visual architecture
```

#### Phase 1: Requirements Analysis & Research
**Before any implementation:**
1. **Deep Analysis**
   - Parse workflow requirement documents (WRD)
   - Understand business logic and data flow
   - Identify critical paths and error scenarios
   - Ask clarifying questions if requirements are unclear

2. **Research & Pattern Discovery**
   ```
   - WebSearch: Find similar n8n workflows and implementation patterns
   - list_node_templates({nodeTypes: ['relevant-nodes']})
   - search_templates({query: 'use-case-keywords'})
   - Research API documentation for external services
   ```

3. **Node Discovery**
   ```
   - search_nodes({query: 'functionality'})
   - list_nodes({category: 'trigger|transform|output'})
   - list_ai_tools() for AI-capable nodes
   - get_node_documentation(nodeType) for complex nodes
   ```

#### Phase 2: Architecture Design & Validation
1. **Visual Architecture**
   - Create/review mermaid diagram
   - Map nodes to workflow phases
   - Define data transformation points
   - Identify integration boundaries

2. **Pre-Implementation Validation**
   ```
   - validate_node_minimal(nodeType, config)
   - search_node_properties(nodeType, 'critical-params')
   - get_node_for_task('specific-task')
   ```

3. **Quality Gate: Architecture Review**
   - Present visual workflow to user
   - Validate against WRD (>80% accuracy required)
   - Get approval before proceeding

#### Phase 3: Phased Implementation

##### Implementation Rules
1. **Phase Boundaries**
   - Each phase is self-contained and testable
   - Phases connect via defined interfaces
   - No phase exceeds 10-15 nodes

2. **Phase Structure**
   ```
   Phase Start:
   1. Read [workflowID].md - Understand previous state
   2. Read [projectName].md - Understand current phase goals
   3. Pull workflow from n8n - Get current implementation
   4. Research phase-specific patterns
   5. Plan phase implementation
   
   Phase Build:
   1. Implement nodes for current phase only
   2. Validate each node configuration
   3. Test phase independently
   4. Document phase completion
   
   Phase Complete:
   1. Save workflow locally as JSON
   2. Push to GitHub (sphinxcode/workflows)
   3. Update/create in n8n server
   4. Update [workflowID].md with phase summary
   ```

### Sequential Advantages
- **Full Context**: Complete understanding at each step
- **Immediate Feedback**: Issues caught and fixed instantly
- **Flexible Adaptation**: Easy to pivot based on discoveries
- **Lower Complexity**: No coordination overhead
- **Better Learning**: Understand cause and effect clearly

---

## 🚀 PERSONA 2: Parallel Orchestrator (`/wp`)

### Schema-First Parallel Development

#### Phase 0: Complete Schema Definition
**BEFORE any development begins:**
```yaml
workflow_schema:
  metadata:
    name: "workflow-name"
    phases: 5
    estimated_nodes: 45
    
  node_registry:
    # ALL nodes defined upfront
    phase_1:
      - id: "webhook_1"
        type: "n8n-nodes-base.webhook"
        position: [250, 300]
        outputs: ["raw_data"]
        
    phase_2:
      - id: "processor_1"
        type: "n8n-nodes-base.code"
        inputs: ["webhook_1.raw_data"]
        
  connections:
    # ALL connections mapped
    
  interfaces:
    # Phase boundaries defined
```

#### Parallel Execution Strategy

1. **Schema Validation**
   ```javascript
   // Validate ALL nodes exist before starting
   await validateWorkflowSchema(schema);
   await discoverAllNodes(schema.node_registry);
   await estimateResources(schema);
   ```

2. **Spawn Configuration**
   ```yaml
   spawn_agents:
     - agent_1: "Build Phase 1 - Triggers"
     - agent_2: "Build Phase 2 - Processing"
     - agent_3: "Build Phase 3 - AI Integration"
     - agent_4: "Build Phase 4 - Output"
   
   synchronization:
     - checkpoint_1: "After node creation"
     - checkpoint_2: "Before stitching"
   ```

3. **Automated Stitching**
   ```javascript
   const phases = await collectPhaseOutputs();
   const unified = await stitcher.stitch(phases);
   await validator.validate(unified);
   ```

### Parallel Advantages
- **Speed**: 60-70% faster than sequential
- **Scalability**: Handle 100+ node workflows efficiently
- **Consistency**: Uniform quality across all phases
- **Resource Optimization**: Parallel token usage
- **Early Error Detection**: Issues found across all phases quickly

---

## 🔄 Version Control & Deployment (Both Personas)

### Git Workflow
```bash
# Every workflow operation follows:
1. Save JSON locally: /workflows/[project]/[workflow-name]-v[phase].json
2. Git operations:
   - git add .
   - git commit -m "feat(workflow): [project] - phase [n] implementation"
   - git push origin main
3. Deploy to n8n server
4. Create checkpoint documentation
```

### n8n Server Operations
```javascript
// Creation
n8n_create_workflow(validatedWorkflow)

// Updates (use diffs for efficiency)
n8n_update_partial_workflow({
  workflowId: id,
  operations: diffOperations
})

// Validation
n8n_validate_workflow({id: workflowId})
```

## Project Structure

```
/home/dev/n8n/
├── workflows/
│   ├── [project-name]/
│   │   ├── schema.yaml           # (Parallel only)
│   │   ├── phase-1.json          # (Both)
│   │   ├── phase-2.json          # (Both)
│   │   └── unified-workflow.json # (Final)
├── docs/
│   ├── [projectName].md          # Implementation plan
│   ├── [workflowID].md           # Phase tracking
│   └── mermaid-diagrams/
│       └── [project]-diagram.md
├── templates/
│   ├── workflow-schema-template.yaml
│   └── phase-stitcher.js
└── claude.md                      # This file
```

## Quality Assurance Framework

### Sequential QA (Continuous)
- [ ] Test each node as built
- [ ] Validate connections immediately
- [ ] Run phase before proceeding
- [ ] Document issues inline

### Parallel QA (Phase-End)
- [ ] Schema validation upfront
- [ ] Node discovery for all phases
- [ ] Parallel validation per agent
- [ ] Unified workflow validation

### Common QA Checklist
- [ ] Web search for similar implementations completed
- [ ] n8n templates researched and patterns identified
- [ ] Essential nodes discovered and validated
- [ ] Workflow connections validated against mermaid diagram
- [ ] Accuracy score >80% against WRD

## Command Quick Reference

### Persona Selection
```bash
/workflow sequential --project "name"  # or /ws
/workflow parallel --schema schema.yaml # or /wp
/workflow auto                         # Recommend based on analysis
```

### Discovery Commands
```javascript
mcp__n8n-mcp__search_nodes({query: "webhook"})
mcp__n8n-mcp__list_ai_tools()
mcp__n8n-mcp__get_node_documentation("n8n-nodes-base.slack")
```

### Validation Commands
```javascript
mcp__n8n-mcp__validate_node_minimal(nodeType, {})
mcp__n8n-mcp__validate_workflow(workflowJson)
mcp__n8n-mcp__validate_workflow_connections(workflowJson)
```

### Template Commands
```javascript
mcp__n8n-mcp__search_templates({query: "data-sync"})
mcp__n8n-mcp__get_template(templateId)
mcp__n8n-mcp__list_node_templates({nodeTypes: ["n8n-nodes-base.httpRequest"]})
```

## Phase Execution Protocols

### Sequential Execution (`/ws`)
```
1. REVIEW: Read previous phase documentation
2. RESEARCH: Study patterns and best practices
3. PLAN: Design phase implementation
4. BUILD: Implement phase nodes
5. VALIDATE: Test phase functionality
6. DOCUMENT: Update tracking files
7. VERSION: Commit to GitHub
8. DEPLOY: Update n8n server
```

### Parallel Execution (`/wp`)
```
1. SCHEMA: Define complete workflow structure
2. VALIDATE: Verify all nodes and connections
3. SPAWN: Launch parallel agents
4. SYNCHRONIZE: Coordinate at checkpoints
5. STITCH: Combine phase outputs
6. VALIDATE: Test unified workflow
7. VERSION: Commit to GitHub
8. DEPLOY: Update n8n server
```

## Token Optimization Strategies

### Sequential Optimization
1. **Compact at 70%**: Preserve context efficiently
2. **Reference Previous**: Don't repeat information
3. **Incremental Building**: Small, focused phases

### Parallel Optimization
1. **Distributed Processing**: Agents use separate contexts
2. **Schema Reuse**: Single source of truth
3. **Batch Operations**: Combine similar tasks

### Common Strategies
1. **Use Diff Updates**: 80-90% token savings on modifications
2. **Cache Validation Results**: Reuse successful configurations
3. **Template Reuse**: Leverage proven workflow templates

## When to Use Each Persona

### Use Sequential (`/ws`) When:
- Learning n8n or new domain
- Requirements are evolving
- Workflow has < 30 nodes
- Complex interdependencies
- Debugging existing workflows
- Building proof of concepts

### Use Parallel (`/wp`) When:
- Complete specifications available
- Workflow has > 30 nodes
- Time-critical delivery
- Modular architecture
- Production deployment
- Team collaboration needed

## Hybrid Approach

```bash
# Start sequential for complex logic
/ws init --phases 1-2

# Switch to parallel for bulk processing
/workflow switch parallel --from-phase 3
/wp spawn --phases "3,4,5,6"

# Return to sequential for integration
/workflow switch sequential --phase 7
/ws complete --validate
```

## Critical Success Factors

1. **Choose Right Persona** - Match approach to project needs
2. **Never Skip Research Phase** - Understanding patterns saves rework
3. **Always Validate Before Building** - Catch errors early
4. **Maintain Phase Discipline** - Don't exceed phase boundaries
5. **Document Everything** - Future phases depend on clear records
6. **Test Incrementally** - Each phase must work independently
7. **Version Everything** - GitHub is your safety net

## Emergency Procedures

### Workflow Corruption
1. Revert to last GitHub checkpoint
2. Pull clean version from repository
3. Rebuild from last known good state

### Phase Failure
1. Document failure in [workflowID].md
2. Rollback to previous phase
3. Research alternative approach
4. Implement correction with new version

### Integration Issues
1. Validate credentials and permissions
2. Check API documentation for changes
3. Test with minimal configuration
4. Escalate with detailed error logs

---

## Project Handoff Template

When receiving a new project:
1. **Workflow Requirement Document (WRD)** - Business requirements
2. **Project Implementation Plan** - Technical breakdown
3. **Mermaid Diagram** - Visual architecture

Your response structure:
1. Analyze project complexity
2. Recommend persona (`/ws` or `/wp`)
3. Create appropriate project structure
4. Initialize tracking files
5. Present implementation plan for approval
6. Begin implementation upon confirmation

---

*Last Updated: [Auto-update on save]*
*Framework Version: 3.0*
*Dual Persona System: Active*
*n8n-MCP Integration: Active*