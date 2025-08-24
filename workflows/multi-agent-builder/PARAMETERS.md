# Complete Parameter Reference for Parallel Development

## Why Full Parameters Matter

For parallel agents to work independently, each must know EXACTLY:
- Required vs optional parameters
- Parameter types and formats
- Output structures for downstream nodes
- Credential requirements
- Connection port names

## Core Node Parameters

### 1. AI Agent Node (@n8n/n8n-nodes-langchain.agent)
```yaml
parameters:
  prompt: "string | expression"
  options:
    systemMessage: "string"
    temperature: 0.0-1.0
    maxTokens: 1-32000
    maxIterations: 1-50
    topP: 0.0-1.0
    frequencyPenalty: -2.0-2.0
    presencePenalty: -2.0-2.0
    timeout: milliseconds
    maxRetries: 1-5
    returnIntermediateSteps: boolean
    outputParser:
      type: "structuredOutput"
      schema: {JSON Schema}
tools:
  - type: "n8n-nodes-mcp"
    parameters:
      url: "string"
      operation: "HTTP"
      method: "POST"
      headers: {object}
      body: {object}
credentials:
  name: "string"
  type: "openAiApi|anthropicApi|azureOpenAi"
```

### 2. n8n-MCP Integration (n8n-nodes-mcp as subtool)
```yaml
mcp_tool:
  type: "n8n-nodes-mcp"
  parameters:
    url: "https://github.com/czlonkowski/n8n-mcp"
    operation: "HTTP"
    method: "POST"
    body:
      operation: "search_nodes|get_node_essentials|list_templates|get_node_info"
      query: "string"
      nodeType: "string"
      category: "string"
    headers:
      Content-Type: "application/json"
      Authorization: "Bearer {{token}}"
```

### 3. Webhook Node (n8n-nodes-base.webhook)
```yaml
parameters:
  path: "string"
  method: "GET|POST|PUT|DELETE|PATCH|HEAD"
  responseMode: "onReceived|lastNode|responseNode"
  responseData: "allEntries|firstEntryJson|firstEntryBinary|noData"
  responseBinaryPropertyName: "string"
  responseHeaders:
    values:
      - name: "string"
        value: "string"
  options:
    binaryData: boolean
    rawBody: boolean
    responseContentType: "string"
authentication:
  type: "none|headerAuth|basicAuth"
```

### 4. Code Node (n8n-nodes-base.code)
```yaml
parameters:
  language: "javaScript|python"
  mode: "runOnceForEachItem|runOnceForAllItems"
  jsCode: "string"
  pythonCode: "string"
  continueOnFail: boolean
  pairedItem:
    item: number
```

### 5. Merge Node (n8n-nodes-base.merge)
```yaml
parameters:
  mode: "append|combine|chooseBranch|mergeByIndex|mergeByKey|multiplex"
  options:
    includeUnpaired: boolean
    clashHandling:
      values:
        resolveClash: "preferInput1|preferInput2|addSuffix"
        suffix: "string"
    mergeByKey:
      key1: "string"
      key2: "string"
```

### 6. HTTP Request Node (n8n-nodes-base.httpRequest)
```yaml
parameters:
  method: "GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS"
  url: "string|expression"
  authentication: "none|predefinedCredentialType|genericCredentialType"
  genericAuthType: "httpBasicAuth|httpDigestAuth|httpHeaderAuth|oAuth1|oAuth2"
  sendHeaders: boolean
  headerParameters:
    parameters:
      - name: "string"
        value: "string|expression"
  sendQuery: boolean
  queryParameters:
    parameters:
      - name: "string"
        value: "string|expression"
  sendBody: boolean
  bodyParameters:
    parameters:
      - name: "string"
        value: "any"
  options:
    timeout: milliseconds
    batching:
      batch:
        batchSize: number
        batchInterval: milliseconds
    response:
      response:
        fullResponse: boolean
        neverError: boolean
    retry:
      maxTries: number
      waitBetweenTries: milliseconds
```

### 7. Form Trigger (n8n-nodes-base.formTrigger)
```yaml
parameters:
  formTitle: "string"
  formDescription: "string"
  formFields:
    values:
      - fieldLabel: "string"
        fieldType: "text|number|email|password|textarea|dropdown|checkbox|file"
        requiredField: boolean
        fieldOptions:
          placeholder: "string"
          rows: number
          acceptFileTypes: "string"
          values: ["option1", "option2"]
  responseMode: "onReceived|lastNode"
  formPath: "string"
```

### 8. Telegram Node (n8n-nodes-base.telegram)
```yaml
parameters:
  operation: "sendMessage|sendPhoto|sendDocument|sendLocation"
  chatId: "string|expression"
  text: "string|expression"
  additionalFields:
    parse_mode: "Markdown|HTML"
    disable_notification: boolean
    reply_markup:
      inline_keyboard: [[{text: "string", callback_data: "string"}]]
credentials:
  name: "string"
  type: "telegramApi"
```

## Output Structures

### Standard Output Format
```yaml
outputs:
  main:
    - type: "object|array|string|number|boolean"
      properties:
        key: "type"
      schema:
        type: "object"
        properties: {}
```

### AI Agent Output with Parser
```yaml
outputParser:
  type: "structuredOutput"
  schema:
    type: "object"
    properties:
      result:
        type: "string"
        description: "Main result"
      confidence:
        type: "number"
        minimum: 0
        maximum: 1
      alternatives:
        type: "array"
        items:
          type: "string"
```

## Connection Port Types

### Standard Ports
```yaml
connections:
  - source:
      node: "node_id"
      output: "main"  # main output
    target:
      node: "target_id"
      input: "main"   # main input
```

### Conditional Ports (IF node)
```yaml
connections:
  - source:
      node: "if_node"
      output: "true"  # true branch
    target:
      node: "true_path"
      input: "main"
  - source:
      node: "if_node"
      output: "false" # false branch
    target:
      node: "false_path"
      input: "main"
```

### Error Ports
```yaml
connections:
  - source:
      node: "any_node"
      output: "error"
    target:
      node: "error_handler"
      input: "main"
```

## Credential Structures

### API Credentials
```yaml
credentials:
  openAiApi:
    apiKey: "{{$credentials.openAiApiKey}}"
    organization: "{{$credentials.organization}}"
    
  telegramApi:
    accessToken: "{{$credentials.telegramToken}}"
    
  httpHeaderAuth:
    name: "X-API-Key"
    value: "{{$credentials.apiKey}}"
    
  githubApi:
    accessToken: "{{$credentials.githubToken}}"
    
  n8nApi:
    apiKey: "{{$credentials.n8nApiKey}}"
    baseUrl: "{{$credentials.n8nUrl}}"
```

## Position Guidelines

### Node Positioning Formula
```javascript
position: [
  250 + (columnIndex * 200),  // X: 200px spacing
  300 + (rowIndex * 150)       // Y: 150px spacing
]
```

### Layout Patterns
```yaml
# Linear flow
positions:
  node1: [250, 300]
  node2: [450, 300]
  node3: [650, 300]
  
# Parallel branches
positions:
  trigger: [250, 400]
  branch1: [450, 300]
  branch2: [450, 500]
  merge: [650, 400]
```

## Validation Requirements

### Pre-Build Validation
```javascript
validate_node_minimal(nodeType, {
  // Minimum required parameters only
  path: "/webhook",
  method: "POST"
})
```

### Full Validation
```javascript
validate_workflow({
  nodes: [...],
  connections: {...},
  settings: {...}
})
```

## Parallel Development Rules

### Phase Independence
Each phase must:
1. Define all parameters upfront
2. Include output schemas
3. Specify connection ports
4. List credential requirements

### Interface Contracts
```yaml
phase_interface:
  input:
    expects: "type"
    required: ["field1", "field2"]
    optional: ["field3"]
  output:
    provides: "type"
    guaranteed: ["result", "status"]
    conditional: ["error"]
```

### Synchronization Points
```yaml
sync_points:
  - after_node_creation: "validate parameters"
  - after_connections: "test data flow"
  - before_stitching: "verify interfaces"
  - after_stitching: "full validation"
```

## Common Patterns

### Error Handling Pattern
```yaml
node_with_error_handling:
  parameters:
    continueOnFail: false
  errorOutput:
    node: "error_handler"
    parameters:
      operation: "log_and_notify"
```

### Retry Pattern
```yaml
api_call_with_retry:
  options:
    retry:
      maxTries: 3
      waitBetweenTries: 5000
      backoffRate: 2
```

### Batch Processing Pattern
```yaml
batch_processor:
  parameters:
    batchSize: 100
    mode: "runOnceForAllItems"
  options:
    batching:
      enabled: true
```

## Quick Reference

### Must-Have Parameters by Node Type

| Node Type | Required | Critical for Parallel |
|-----------|----------|----------------------|
| Webhook | path, method | responseMode |
| AI Agent | prompt | tools, outputParser |
| Code | language, code | mode |
| HTTP Request | url, method | authentication |
| Merge | mode | includeUnpaired |
| Form Trigger | formFields | formPath |
| Telegram | operation, chatId | parse_mode |

### Output Types by Category

| Category | Common Output | Schema Required |
|----------|--------------|-----------------|
| Triggers | object | Yes |
| Processing | array/object | Yes |
| AI/LLM | structured | Always |
| Integration | varies | Yes |
| Output | response | No |

---

**Remember**: Every parameter defined here enables an agent to work independently. Missing parameters = blocked parallel development.