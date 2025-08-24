# Complete Parameter Schema for Parallel Development

## Critical Insight: Why Parameter Schemas Matter

When multiple agents work in parallel, they MUST have complete parameter definitions upfront. This ensures:
- Each agent knows exact JSON structure required
- No conflicts during phase stitching
- 100% compatibility between independently built phases
- Automatic validation before deployment

## Core Node Parameter Schemas

### 1. AI Agent Node (Primary Intelligence)
```yaml
node:
  id: "ai_agent_[phase]_[number]"
  type: "@n8n/n8n-nodes-langchain.agent"
  typeVersion: 2.2
  position: [x, y]
  parameters:
    promptType: "define"  # or "auto"
    text: "{{ $json.prompt }}"
    hasOutputParser: true  # CRITICAL for structured output
    needsFallback: true
    options:
      systemMessage: "[Specific agent role and instructions]"
      maxIterations: 10
      returnIntermediateSteps: true
      passthroughBinaryImages: false
      batching:
        batchSize: 1
        delayBetweenBatches: 100
      enableStreaming: false  # Set false for production
  credentials:
    name: "openAiApi"
    id: "credential_id"
  tools:
    - type: "n8n-nodes-mcp"
      parameters:
        url: "https://github.com/czlonkowski/n8n-mcp"
        operation: "HTTP"
        headers:
          Content-Type: "application/json"
```

### 2. Structured Output Parser (MANDATORY for parallel work)
```yaml
node:
  id: "output_parser_[phase]_[number]"
  type: "@n8n/n8n-nodes-langchain.outputParserStructured"
  typeVersion: 1.3
  position: [x + 200, y]
  parameters:
    schemaType: "manual"  # Use manual for complete control
    inputSchema: |
      {
        "type": "object",
        "properties": {
          "phase_output": {
            "type": "object",
            "properties": {
              "nodes": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {"type": "string"},
                    "type": {"type": "string"},
                    "parameters": {"type": "object"},
                    "position": {
                      "type": "array",
                      "items": {"type": "number"}
                    }
                  },
                  "required": ["id", "type", "parameters", "position"]
                }
              },
              "connections": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "source": {"type": "string"},
                    "target": {"type": "string"},
                    "port": {"type": "string"}
                  },
                  "required": ["source", "target"]
                }
              },
              "metadata": {
                "type": "object",
                "properties": {
                  "phase": {"type": "string"},
                  "confidence": {"type": "number"},
                  "alternatives": {"type": "array"}
                }
              }
            },
            "required": ["nodes", "connections", "metadata"]
          }
        },
        "required": ["phase_output"]
      }
    autoFix: true  # Enable auto-correction
    customizeRetryPrompt: false
  connections:
    main:
      - - node: "ai_agent_[phase]_[number]"
          type: "ai_outputParser"
```

### 3. n8n-MCP Tool Node (For Agent Intelligence)
```yaml
node:
  id: "mcp_tool_[phase]_[number]"
  type: "n8n-nodes-mcp"
  position: [x, y - 100]
  parameters:
    url: "https://github.com/czlonkowski/n8n-mcp"
    operation: "search_nodes"  # or get_node_essentials, list_templates
    query: "{{ $json.search_term }}"
    limit: 20
    mode: "OR"
  credentials:
    type: "httpStreamable"
    data:
      url: "http://localhost:3001/stream"
      headers:
        Authorization: "Bearer {{ $env.MCP_TOKEN }}"
  connections:
    ai_tool:
      - - node: "ai_agent_[phase]_[number]"
          type: "ai_tool"
```

### 4. Webhook Trigger (Entry Point)
```yaml
node:
  id: "webhook_trigger"
  type: "n8n-nodes-base.webhook"
  typeVersion: 2
  position: [250, 300]
  parameters:
    path: "/workflow-builder"
    method: "POST"
    authentication: "headerAuth"
    headerAuth:
      name: "X-API-Key"
      value: "={{ $env.WEBHOOK_API_KEY }}"
    responseMode: "onReceived"
    responseData: "allEntries"
    options:
      rawBody: false
      ignoreBots: true
  outputs: ["raw_request"]
```

### 5. Code Node (Processing Logic)
```yaml
node:
  id: "code_processor_[phase]_[number]"
  type: "n8n-nodes-base.code"
  typeVersion: 2
  position: [x, y]
  parameters:
    mode: "runOnceForEachItem"
    language: "javaScript"
    jsCode: |
      // MUST return structured data
      const input = $input.item.json;
      
      // Process according to phase requirements
      const processed = {
        phase: "[phase_name]",
        data: input,
        timestamp: new Date().toISOString(),
        validation: {
          passed: true,
          errors: []
        }
      };
      
      return processed;
  inputs: ["previous_node"]
  outputs: ["processed_data"]
```

### 6. HTTP Request (External APIs)
```yaml
node:
  id: "http_request_[phase]_[number]"
  type: "n8n-nodes-base.httpRequest"
  typeVersion: 4.2
  position: [x, y]
  parameters:
    method: "POST"
    url: "https://api.example.com/endpoint"
    authentication: "predefinedCredentialType"
    nodeCredentialType: "apiKey"
    sendHeaders: true
    headerParameters:
      parameters:
        - name: "Content-Type"
          value: "application/json"
        - name: "X-Request-ID"
          value: "={{ $workflow.id }}-{{ $execution.id }}"
    sendBody: true
    bodyContentType: "json"
    body: |
      {
        "data": "{{ $json.data }}",
        "metadata": {
          "phase": "[phase_name]",
          "timestamp": "{{ $now.toISO() }}"
        }
      }
    options:
      response:
        response:
          fullResponse: false
          neverError: false
      timeout: 30000
      batching:
        batch:
          batchSize: 10
          batchInterval: 1000
```

### 7. Merge Node (Convergence Hub)
```yaml
node:
  id: "merge_hub_[phase]"
  type: "n8n-nodes-base.merge"
  typeVersion: 3
  position: [x, y]
  parameters:
    mode: "combine"  # or "multiplex", "chooseBranch"
    combineBy: "combineAll"  # or "combineByKey", "combineByPosition"
    options:
      clashHandling:
        values:
          resolveClash: "preferInput2"  # or "preferInput1", "addSuffix"
      includeUnpaired: true
  inputs:
    - "agent_1_output"
    - "agent_2_output"
    - "agent_3_output"
    - "agent_n_output"
  outputs: ["merged_data"]
```

### 8. If Node (Conditional Logic)
```yaml
node:
  id: "conditional_[phase]_[number]"
  type: "n8n-nodes-base.if"
  typeVersion: 2
  position: [x, y]
  parameters:
    conditions:
      options:
        conditions:
          - condition:
              leftValue: "={{ $json.confidence }}"
              rightValue: 0.8
              operation:
                type: "number"
                operation: "gte"  # greater than or equal
          - condition:
              leftValue: "={{ $json.status }}"
              rightValue: "approved"
              operation:
                type: "string"
                operation: "equals"
      combinator: "and"  # or "or"
  outputs:
    - name: "true"
      type: "main"
    - name: "false"
      type: "main"
```

### 9. Telegram Node (Approval Gate)
```yaml
node:
  id: "telegram_approval"
  type: "n8n-nodes-base.telegram"
  typeVersion: 1.2
  position: [x, y]
  parameters:
    operation: "sendMessage"
    chatId: "={{ $env.TELEGRAM_CHAT_ID }}"
    text: |
      🔔 *Workflow Approval Required*
      
      Project: {{ $json.project_name }}
      Complexity: {{ $json.complexity }}
      Estimated Nodes: {{ $json.node_count }}
      
      [View Mermaid Diagram]({{ $json.diagram_url }})
      
      Reply with:
      ✅ /approve - Continue execution
      ❌ /reject - Stop and revise
      🔄 /modify - Request changes
    additionalFields:
      parse_mode: "Markdown"
      disable_notification: false
      reply_markup:
        inline_keyboard:
          - - text: "✅ Approve"
              callback_data: "approve_{{ $json.workflow_id }}"
            - text: "❌ Reject"
              callback_data: "reject_{{ $json.workflow_id }}"
            - text: "🔄 Modify"
              callback_data: "modify_{{ $json.workflow_id }}"
  credentials:
    name: "telegramApi"
```

### 10. Google Drive Node (Documentation Storage)
```yaml
node:
  id: "drive_upload_[phase]"
  type: "n8n-nodes-base.googleDrive"
  typeVersion: 3
  position: [x, y]
  parameters:
    operation: "upload"
    name: "={{ $json.filename }}"
    folderId: "={{ $env.GDRIVE_FOLDER_ID }}"
    binaryData: false
    fileContent: "={{ $json.documentation }}"
    options:
      mimeType: "text/markdown"
      keepExistingPermissions: true
      enforceSingleParent: true
  credentials:
    name: "googleDriveOAuth2"
```

## Phase Interface Contracts

### Standard Phase Output Schema
Every phase MUST output this structure:
```javascript
{
  "phase_id": "phase_[number]",
  "status": "completed|partial|failed",
  "nodes": [
    {
      "id": "unique_id",
      "type": "node_type",
      "typeVersion": 1,
      "position": [x, y],
      "parameters": {},
      "credentials": {},
      "disabled": false
    }
  ],
  "connections": {
    "node_id": {
      "main": [
        [
          {
            "node": "target_node_id",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  },
  "metadata": {
    "confidence": 0.95,
    "alternatives": [],
    "errors": [],
    "warnings": []
  }
}
```

## Parallel Agent Configuration

### Agent System Message Templates
```yaml
agents:
  node_discovery:
    systemMessage: |
      You are a node discovery specialist. Use n8n-MCP to find optimal nodes.
      Always return structured JSON matching the phase output schema.
      Include confidence scores and alternatives.
      
  flow_designer:
    systemMessage: |
      You design data flow between nodes. Ensure all connections are valid.
      Return structured JSON with connection mappings.
      Never create orphan nodes.
      
  validator:
    systemMessage: |
      You validate workflow syntax and logic. Check for errors and conflicts.
      Return structured JSON with validation results.
      Flag any issues that need human review.
      
  documenter:
    systemMessage: |
      You generate comprehensive documentation in markdown format.
      Include all parameters, connections, and usage instructions.
      Return structured JSON with documentation sections.
```

## Critical Implementation Rules

### 1. ALWAYS Define Output Parsers
```yaml
MANDATORY: Every AI agent MUST have an output parser
WHY: Ensures structured, predictable JSON output
HOW: Connect outputParserStructured to every agent
```

### 2. Use Manual Schema Definition
```yaml
PREFERRED: schemaType: "manual" over "fromJson"
WHY: Complete control over required/optional fields
HOW: Define full JSON schema with validation rules
```

### 3. Include Phase Metadata
```yaml
REQUIRED: Every phase output includes metadata
WHY: Enables intelligent merge decisions
WHAT: phase_id, confidence, alternatives, errors
```

### 4. Standardize Node IDs
```yaml
FORMAT: [type]_[phase]_[number]
EXAMPLE: ai_agent_2_1, webhook_trigger_1_1
WHY: Prevents ID conflicts during stitching
```

### 5. Position Nodes Logically
```yaml
SPACING: 200-300px horizontal, 150px vertical
FLOW: Left to right, top to bottom
WHY: Visual clarity and automatic layout
```

## Validation Requirements

### Pre-Build Validation
```javascript
function validateSchema(schema) {
  // Check all nodes have required parameters
  for (const node of schema.nodes) {
    assert(node.id, "Node missing ID");
    assert(node.type, "Node missing type");
    assert(node.parameters, "Node missing parameters");
    assert(node.position, "Node missing position");
  }
  
  // Check all connections are valid
  for (const connection of schema.connections) {
    assert(nodeExists(connection.source), "Invalid source");
    assert(nodeExists(connection.target), "Invalid target");
  }
  
  // Check output parser present for AI agents
  const aiAgents = schema.nodes.filter(n => n.type.includes('agent'));
  for (const agent of aiAgents) {
    assert(hasOutputParser(agent), "AI agent missing output parser");
  }
}
```

### Phase Stitching Validation
```javascript
function validatePhaseInterface(phase1Output, phase2Input) {
  // Check data contract compatibility
  const outputSchema = phase1Output.metadata.schema;
  const inputExpected = phase2Input.metadata.expects;
  
  assert(isCompatible(outputSchema, inputExpected), 
         "Phase interface mismatch");
  
  // Check no orphan connections
  for (const connection of phase1Output.connections) {
    if (connection.target.startsWith('phase_2')) {
      assert(phase2Input.nodes.find(n => n.id === connection.target),
             "Cross-phase connection to non-existent node");
    }
  }
}
```

## Example: Complete Parallel Schema

```yaml
workflow:
  name: "multi-agent-builder"
  total_phases: 6
  parallel_agents: "unlimited"
  
phase_1_requirements:
  nodes:
    - webhook_trigger:
        parameters:
          path: "/builder"
          method: "POST"
    - wrd_processor:
        type: "code"
        parameters:
          jsCode: "parse and validate"
    - complexity_analyzer:
        type: "code"
        parameters:
          jsCode: "assess complexity"
  output:
    format: "structured_requirements"
    
phase_2_visualization:
  nodes:
    - mermaid_generator:
        type: "code"
        parameters:
          jsCode: "generate diagram"
    - telegram_sender:
        type: "telegram"
        parameters:
          operation: "sendMessage"
  output:
    format: "approval_status"
    
phase_3_parallel_agents:
  spawn_count: "dynamic"
  agent_tracks:
    - node_discovery:
        ai_agent:
          systemMessage: "discover nodes"
        output_parser:
          schema: "node_list"
    - flow_design:
        ai_agent:
          systemMessage: "design flow"
        output_parser:
          schema: "connections"
    - validation:
        ai_agent:
          systemMessage: "validate"
        output_parser:
          schema: "validation_report"
```

## Conclusion

With complete parameter schemas defined upfront, parallel agents can work independently with 100% confidence that their outputs will merge correctly. This is the KEY to successful parallel development - no ambiguity, no conflicts, just seamless integration.