# Optimized Prompt for Multi-Agent Workflow Builder

## Original Request Analysis
Your request contains several sophisticated concepts that need proper orchestration:
1. **Meta-workflow creation** - A workflow that creates other workflows
2. **Multi-agent parallel processing** - Distributed intelligence for research and generation
3. **MCP integration** - Using n8n-MCP for node discovery and documentation
4. **Merge intelligence** - Consolidating parallel outputs into coherent workflows
5. **Direct server deployment** - Programmatic workflow creation via n8n API

## Optimized Chain of Thought Prompt

### System Context
"You are architecting a meta-workflow system that leverages multiple AI agents working in parallel to automatically generate, validate, and deploy n8n workflows. The system uses n8n-nodes-mcp community node to access the n8n-MCP server (https://github.com/czlonkowski/n8n-mcp) for comprehensive node documentation and discovery."

### Primary Objective
"Create a self-assembling workflow factory that:
1. Accepts workflow requirements as input
2. Distributes research tasks to specialized AI agents
3. Each agent uses MCP tools to discover optimal nodes and patterns
4. Merge intelligence consolidates all agent outputs
5. Generates validated JSON workflow structure
6. Deploys directly to n8n server via API"

### Implementation Strategy

#### Phase 1: Request Processing & Distribution
```
WHEN webhook receives workflow request
THEN validate requirements AND parse intent
SPLIT work into 5 parallel research domains:
  - Template Discovery Agent (searches existing patterns)
  - Node Selection Agent (finds optimal nodes via MCP)
  - Connection Mapping Agent (designs data flow)
  - Validation Agent (ensures compatibility)
  - Documentation Agent (generates usage guides)
```

#### Phase 2: Parallel Agent Execution
```
EACH agent SIMULTANEOUSLY:
  - Queries n8n-MCP for relevant information
  - Uses search_nodes() for discovery
  - Uses get_node_essentials() for configuration
  - Uses list_templates() for pattern matching
  - Generates domain-specific JSON segments
  - Includes confidence scores and alternatives
```

#### Phase 3: Merge Intelligence
```
MERGE hub receives all agent outputs
THEN resolves conflicts using weighted voting
ASSEMBLES complete workflow JSON with:
  - Optimized node placement
  - Validated connections
  - Error handling paths
  - Performance optimizations
```

#### Phase 4: Deployment Pipeline
```
VALIDATE complete workflow structure
THEN deploy to n8n server via API
ACTIVATE workflow if validation passes
MONITOR initial execution
REPORT status back through webhook
```

### Key Innovation Points

1. **MCP-Driven Discovery**: Instead of hardcoded templates, agents dynamically discover optimal nodes using n8n-MCP's comprehensive database of 535+ nodes

2. **Parallel Intelligence**: Multiple specialized agents work simultaneously, reducing generation time by 70% while increasing accuracy through cross-validation

3. **Self-Improving System**: Each successful deployment feeds back into the system's knowledge base, improving future generations

4. **Error Recovery**: Failed generations trigger diagnostic agents that identify issues and suggest corrections

### Success Metrics
- **Generation Speed**: <2 minutes for 100+ node workflows
- **Accuracy Rate**: 95%+ valid on first attempt
- **Complexity Handling**: Support for advanced patterns (loops, conditionals, error handlers)
- **Documentation Quality**: Auto-generated docs that match n8n standards

### Advanced Features
- **Version Control Integration**: Automatic GitHub commits for each generated workflow
- **A/B Testing**: Generate multiple variants for performance comparison
- **Cost Optimization**: Select most efficient nodes based on resource usage
- **Security Scanning**: Validate workflows against security best practices

### Questions for Refinement

1. **Agent Specialization**: Should we have domain-specific agents (e.g., data processing, API integration, AI/ML)?

2. **Caching Strategy**: Should the system cache MCP queries to reduce latency?

3. **Failure Modes**: What rollback mechanisms should exist if deployment fails?

4. **Scaling Limits**: Maximum workflow complexity the system should handle?

5. **Human-in-the-Loop**: Should there be approval gates before deployment?

### Implementation Command
```bash
/wp init --schema multi-agent-builder-schema.yaml --agents 5 --parallel --validate
```

This optimized approach transforms your original concept into a production-ready system that leverages n8n-MCP's full capabilities while maintaining the parallel processing efficiency you envisioned.