# n8n Workflow Development Guide

## Quick Start

Choose your development approach based on project complexity:

```bash
/ws  # Sequential: < 30 nodes, learning, debugging
/wp  # Parallel: > 30 nodes, production, speed
/wa  # Auto-select based on requirements
```

## Development Approaches

### 🐢 Sequential Development (`/ws`)
**When**: Learning, evolving requirements, <30 nodes, complex dependencies
**How**: Build → Test → Refine → Repeat
**Speed**: Standard
**Context**: Full retention

### 🚀 Parallel Development (`/wp`)
**When**: Clear specs, >30 nodes, time-critical, modular design
**How**: Schema → Spawn → Stitch → Deploy
**Speed**: 60-70% faster
**Context**: Distributed

## Workflow Process

### 1. Initialize Project
```bash
# Sequential approach
/ws init "project-name"

# Parallel approach (requires schema)
/wp init --schema schema.yaml --agents 4
```

### 2. Research Phase (MANDATORY)
```javascript
// Always execute before building
WebSearch("n8n {use-case} workflow patterns 2024")
search_nodes({query: "needed-functionality"})
list_node_templates({nodeTypes: ["relevant-nodes"]})
validate_node_minimal(nodeType, config)
```

### 3. Build Phases

#### Sequential Building
```
Phase 1: Build 10-15 nodes → Test → Document
Phase 2: Load context → Build next → Test → Document
Phase 3: Continue pattern until complete
```

#### Parallel Building
```
Schema: Define ALL nodes and connections upfront
Spawn: 4 agents build simultaneously
Stitch: Automated phase combination
Deploy: Single unified workflow
```

### 4. Version Control (MANDATORY)
```bash
# Every phase completion
git add .
git commit -m "feat: [project] phase [n]"
./push_to_github.sh
n8n_create_workflow(validated)
```

## File Structure

```
/n8n/
├── guide.md          # This file - main guide
├── claude.md         # AI instructions
├── schema.md         # Schema templates
├── parallel.md       # Parallel orchestration
├── personas.md       # Development personas
├── /workflows/       # Project JSONs
├── /docs/
│   ├── context.md    # Context management
│   ├── reference.md  # Quick reference
│   └── decision.md   # Decision guide
└── /templates/       # Reusable patterns
```

## Quality Gates

### Pre-Build Requirements
- [ ] Research completed (web + templates)
- [ ] Nodes discovered and validated
- [ ] Schema/diagram created
- [ ] >80% accuracy vs requirements

### Per-Phase Validation
- [ ] Node configuration valid
- [ ] Connections tested
- [ ] Phase runs independently
- [ ] Documentation updated

### Final Deployment
- [ ] Full workflow validated
- [ ] GitHub checkpoint created
- [ ] n8n server updated
- [ ] Monitoring active

## Decision Matrix

| Factor | Sequential | Parallel |
|--------|:----------:|:--------:|
| Nodes | <30 | >30 |
| Time | Flexible | Urgent |
| Specs | Evolving | Complete |
| Team | Solo | Multi-agent |
| Debug | Easy | Post-build |

## Commands Reference

### Workflow Commands
```bash
/ws              # Sequential workflow
/wp              # Parallel workflow
/wa              # Auto-select approach
/switch [mode]   # Change approach mid-project
```

### n8n-MCP Commands
```javascript
// Discovery
search_nodes({query: "webhook"})
list_ai_tools()
get_node_documentation(nodeType)

// Validation
validate_node_minimal(nodeType, {})
validate_workflow(json)
validate_workflow_connections(json)

// Templates
search_templates({query: "use-case"})
get_template(id)
list_node_templates({nodeTypes: []})
```

## Context Management

### Token Thresholds
- 🟢 0-100K (50%): Continue normally
- 🟡 100-140K (70%): Plan handoff
- 🟠 140-180K (90%): Execute handoff
- 🔴 180K+ (90%+): Emergency save

### Handoff Strategies
```bash
# Compact (same chat)
- Under 140K tokens
- Strong dependencies
- 2-4 phases remaining

# New Chat
- Over 140K tokens
- Independent phases
- 5+ phases remaining
```

## Emergency Procedures

### Corruption Recovery
```bash
git checkout [last-good-commit]
pull workflow from n8n
rebuild from checkpoint
```

### Phase Failure
```bash
document in [workflowID].md
rollback to previous
research alternatives
implement fix
```

## Success Metrics

- **Quality**: >95% validation score
- **Security**: Zero hardcoded credentials
- **Testing**: All phases testable
- **Documentation**: Complete tracking
- **Performance**: <2min per phase

---

*Framework v3.0 | Dual Persona System | n8n-MCP Active*