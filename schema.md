# Schema-First Development Guide

## Overview

Schema-first development defines the complete workflow structure BEFORE any implementation begins. Required for parallel development (`/wp`), optional but recommended for sequential (`/ws`).

## Schema Structure

### Minimal Schema (Sequential)
```yaml
workflow:
  name: "project-name"
  phases: 3
  estimated_nodes: 25
  
phases:
  - id: "triggers"
    nodes: 5
    function: "Data ingestion"
  - id: "processing"
    nodes: 12
    function: "Core logic"
  - id: "output"
    nodes: 8
    function: "Delivery"
```

### Parameter-First Schema (REQUIRED for Parallel)
```yaml
workflow:
  name: "project-name"
  approach: "parameter-first"
  
parameter_definitions:
  webhook_trigger:
    type: "n8n-nodes-base.webhook"
    parameters:
      path: "/endpoint"
      method: "POST"
      authentication: "headerAuth"
      
  ai_agent:
    type: "@n8n/n8n-nodes-langchain.agent"
    parameters:
      promptType: "define"
      hasOutputParser: true  # CRITICAL
      systemMessage: "[role]"
      
  output_parser:
    type: "@n8n/n8n-nodes-langchain.outputParserStructured"
    parameters:
      schemaType: "manual"
      inputSchema: "[JSON schema]"
      autoFix: true
```

### Complete Schema (Parallel)
```yaml
metadata:
  name: "workflow-name"
  version: "1.0.0"
  parallel_agents: 4
  
node_registry:
  phase_1:
    - id: "webhook_1"
      type: "n8n-nodes-base.webhook"
      position: [250, 300]
      parameters:
        path: "/webhook"
        method: "POST"
      outputs: ["raw_data"]
      dependencies: []
      
connections:
  - source: "webhook_1"
    target: "validator_1"
    port: "main"
    
interfaces:
  phase_1_to_2:
    output: "validated_data"
    input: "process_ready"
    
error_handling:
  phase_1:
    on_error: "stop_and_error"
    retry: 3
```

## Node Definition Template

```yaml
node:
  id: "unique_identifier"
  type: "n8n-nodes-base.nodetype"
  typeVersion: 1
  position: [x, y]
  parameters:
    # Node-specific configuration
  inputs:
    - source: "previous_node"
      data: "output_name"
  outputs:
    - name: "output_name"
      type: "data_type"
  dependencies: ["required_nodes"]
  credentials:
    name: "credential_type"
```

## Connection Patterns

### Sequential Connection
```yaml
connections:
  - source: "node_a"
    target: "node_b"
    port: "main"
```

### Conditional Routing
```yaml
connections:
  - source: "if_node"
    target: "true_path"
    port: "true"
  - source: "if_node"
    target: "false_path"
    port: "false"
```

### Parallel Execution
```yaml
connections:
  - source: "trigger"
    targets:
      - "processor_1"
      - "processor_2"
      - "processor_3"
```

## Interface Contracts

Define data contracts between phases:

```yaml
interfaces:
  trigger_to_process:
    output:
      format: "json"
      required: ["id", "data", "timestamp"]
      optional: ["metadata"]
    input:
      expects: "validated_object"
      validates: true
      
  process_to_output:
    output:
      format: "array"
      items: "processed_records"
    input:
      expects: "array_of_objects"
```

## Error Handling Schema

```yaml
error_handling:
  global:
    error_workflow: "error-handler-id"
    save_on_error: "all"
    
  phase_specific:
    webhook:
      action: "stop_and_error"
      message: "Webhook failed"
      
    api_call:
      action: "retry_with_backoff"
      max_retries: 3
      initial_wait: 1000
      
    ai_processing:
      action: "fallback_model"
      primary: "gpt-4"
      fallback: "gpt-3.5-turbo"
```

## Resource Estimation

```yaml
resources:
  development:
    tokens: "~50K"
    time: "2 hours"
    
  execution:
    time_average: "30s"
    time_max: "2m"
    memory: "moderate"
    api_calls: 5
    
  scaling:
    concurrent: 10
    rate_limit: "100/min"
```

## Validation Requirements

```yaml
validation:
  pre_build:
    - all_nodes_exist
    - connections_valid
    - interfaces_compatible
    
  per_phase:
    - configuration_valid
    - dependencies_met
    - tests_pass
    
  post_build:
    - workflow_runs
    - no_orphan_nodes
    - error_paths_handled
```

## Schema Generation Commands

```bash
# Generate from requirements
/schema generate --from-wrd document.md

# Generate from mermaid
/schema generate --from-diagram diagram.md

# Validate existing schema
/schema validate schema.yaml

# Convert minimal to complete
/schema expand minimal.yaml
```

## Common Node Types

### Triggers
```yaml
- n8n-nodes-base.webhook
- n8n-nodes-base.scheduleTrigger
- n8n-nodes-base.emailTriggerImap
- n8n-nodes-base.googleDriveTrigger
```

### Processing
```yaml
- n8n-nodes-base.if
- n8n-nodes-base.code
- n8n-nodes-base.set
- n8n-nodes-base.merge
- n8n-nodes-base.splitInBatches
```

### AI/LLM
```yaml
- @n8n/n8n-nodes-langchain.agent
- @n8n/n8n-nodes-langchain.openAi
- @n8n/n8n-nodes-langchain.chainLlm
```

### Integration
```yaml
- n8n-nodes-base.httpRequest
- n8n-nodes-base.slack
- n8n-nodes-base.googleSheets
- n8n-nodes-base.postgres
```

## Schema Best Practices

1. **Define Everything Upfront** - All nodes, connections, and interfaces
2. **Use Consistent IDs** - Clear, descriptive, unique identifiers
3. **Position Logically** - Left-to-right flow, 200-300px spacing
4. **Document Interfaces** - Clear contracts between phases
5. **Plan Error Handling** - Define failure scenarios and recovery
6. **Estimate Resources** - Token usage, execution time, API calls
7. **Version Control** - Track schema changes separately

## Example Schemas

### Simple Webhook → Process → Respond
```yaml
workflow:
  name: "simple-webhook"
  nodes:
    - id: "webhook"
      type: "n8n-nodes-base.webhook"
    - id: "process"
      type: "n8n-nodes-base.code"
    - id: "respond"
      type: "n8n-nodes-base.respondToWebhook"
```

### Complex Multi-Phase AI Workflow
```yaml
# See templates/workflow-schema-template.yaml
```

---

*Use schemas to ensure consistency, enable parallel development, and maintain quality across all phases.*