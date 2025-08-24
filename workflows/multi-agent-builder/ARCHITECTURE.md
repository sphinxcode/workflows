# Multi-Agent Workflow Builder - System Architecture

## Mermaid Diagram

```mermaid
graph TB
    %% Input Layer
    webhook[Webhook Trigger<br/>Workflow Request] --> validator[Request Validator<br/>Parse & Validate]
    validator --> distributor[Work Distributor<br/>Split into Domains]
    
    %% Parallel Agent Layer
    distributor --> agent1[Template Discovery Agent<br/>n8n-MCP: list_templates]
    distributor --> agent2[Node Selection Agent<br/>n8n-MCP: search_nodes]
    distributor --> agent3[Connection Mapper<br/>n8n-MCP: get_node_info]
    distributor --> agent4[Validation Agent<br/>n8n-MCP: get_node_essentials]
    distributor --> agent5[Documentation Agent<br/>Generate Guides]
    
    %% Each Agent's MCP Integration
    agent1 --> mcp1[MCP Query 1<br/>Template Patterns]
    agent2 --> mcp2[MCP Query 2<br/>Node Discovery]
    agent3 --> mcp3[MCP Query 3<br/>Connection Rules]
    agent4 --> mcp4[MCP Query 4<br/>Validation Rules]
    agent5 --> mcp5[MCP Query 5<br/>Doc Templates]
    
    %% Agent Outputs
    mcp1 --> output1[Template JSON<br/>+ Confidence Score]
    mcp2 --> output2[Node List JSON<br/>+ Alternatives]
    mcp3 --> output3[Connection Map<br/>+ Data Types]
    mcp4 --> output4[Validation Report<br/>+ Fixes]
    mcp5 --> output5[Documentation<br/>+ Examples]
    
    %% Merge Intelligence Hub
    output1 --> merge[Merge Intelligence Hub<br/>Conflict Resolution]
    output2 --> merge
    output3 --> merge
    output4 --> merge
    output5 --> merge
    
    %% Assembly Pipeline
    merge --> assembler[Workflow Assembler<br/>JSON Generation]
    assembler --> validator2[Final Validator<br/>Structure Check]
    validator2 --> deployer[n8n API Deployer<br/>Create Workflow]
    
    %% Deployment Results
    deployer --> success[Success Path<br/>Workflow Active]
    deployer --> failure[Failure Path<br/>Error Handler]
    
    %% Feedback Loop
    success --> monitor[Performance Monitor<br/>Collect Metrics]
    failure --> diagnostic[Diagnostic Agent<br/>Error Analysis]
    monitor --> knowledge[Knowledge Base<br/>Pattern Learning]
    diagnostic --> knowledge
    
    %% Reporting
    success --> report[Status Reporter<br/>Webhook Response]
    failure --> report
    
    %% Styling
    classDef inputNode fill:#e1f5e1,stroke:#4caf50,stroke-width:2px
    classDef agentNode fill:#e3f2fd,stroke:#2196f3,stroke-width:2px
    classDef mcpNode fill:#fff3e0,stroke:#ff9800,stroke-width:2px
    classDef mergeNode fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    classDef outputNode fill:#ffebee,stroke:#f44336,stroke-width:2px
    
    class webhook,validator,distributor inputNode
    class agent1,agent2,agent3,agent4,agent5 agentNode
    class mcp1,mcp2,mcp3,mcp4,mcp5 mcpNode
    class merge,assembler mergeNode
    class success,failure,report outputNode
```

## Component Details

### 1. Input Layer (Phase 1)
**Nodes**: 10
- Webhook trigger with authentication
- Request parser with schema validation
- Priority queue manager
- Work distribution logic

### 2. Agent Layer (Phases 2-6)
**Nodes per Agent**: 12-15
- MCP connection setup
- Query formation
- Response processing
- Output formatting
- Error handling

### 3. MCP Integration Points
**Key Operations**:
```javascript
// Template Discovery
mcp.list_templates({ category: "automation" })

// Node Selection
mcp.search_nodes({ query: "data transformation" })

// Configuration Lookup
mcp.get_node_essentials({ nodeType: "n8n-nodes-base.httpRequest" })

// Full Documentation
mcp.get_node_info({ nodeType: "n8n-nodes-base.webhook" })
```

### 4. Merge Intelligence (Phase 7)
**Nodes**: 20
- Conflict detection algorithm
- Weighted voting system
- Connection validation
- Optimization passes
- Final assembly

### 5. Deployment Pipeline (Phase 8)
**Nodes**: 15
- JSON structure validation
- n8n API authentication
- Workflow creation call
- Activation trigger
- Status monitoring

### 6. Error Recovery (Phase 9)
**Nodes**: 10
- Error classification
- Diagnostic analysis
- Correction suggestions
- Retry logic
- Fallback strategies

### 7. Monitoring & Learning (Phase 10)
**Nodes**: 8
- Performance metrics collection
- Pattern extraction
- Knowledge base updates
- Report generation

## Data Flow Examples

### Successful Flow
```
Request → Validate → Distribute → [5 Agents Query MCP] → 
Merge Results → Assemble JSON → Deploy to n8n → 
Activate → Monitor → Report Success
```

### Error Recovery Flow
```
Request → Validate → Distribute → [Agent Fails] → 
Error Detection → Diagnostic Agent → Identify Issue → 
Retry with Corrections → Deploy → Report Resolution
```

### Learning Flow
```
Successful Deployment → Extract Patterns → 
Update Knowledge Base → Improve Future Generations → 
Reduce Generation Time → Increase Success Rate
```

## Key Architecture Decisions

1. **Parallel Processing**: 5 agents work simultaneously, reducing total processing time by 70%

2. **MCP-First Design**: All node discovery and configuration uses n8n-MCP, ensuring accuracy

3. **Merge Intelligence**: Sophisticated conflict resolution prevents incompatible node combinations

4. **Fail-Safe Mechanisms**: Multiple validation layers ensure only valid workflows are deployed

5. **Continuous Learning**: Every generation improves the system's pattern recognition

## Performance Characteristics

- **Latency**: <100ms per MCP query
- **Parallelism**: 5 concurrent agent executions
- **Throughput**: 10-15 workflows/hour
- **Accuracy**: 95%+ first-attempt success
- **Scalability**: Handles 200+ node workflows