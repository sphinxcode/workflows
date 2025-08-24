# n8n Workflow Development Framework

## Quick Start

Choose your development approach:

```bash
/ws  # Sequential: Learning, <30 nodes, debugging
/wp  # Parallel: Production, >30 nodes, speed
/wa  # Auto-select based on requirements
```

See `guide.md` for complete workflow process.

## Project Initialization

### Sequential Approach (`/ws`)

```bash
/ws init "project-name"
```

1. **Research Phase** (MANDATORY)
   - WebSearch for patterns
   - search_nodes() for functionality
   - validate_node_minimal() for configs

2. **Build Phase by Phase**
   - 10-15 nodes per phase
   - Test immediately
   - Document inline
   - Continue with context

3. **Version Control** (Every Phase)
   ```bash
   git add . && git commit -m "phase [n]"
   ./push_to_github.sh
   ```

### Parallel Approach (`/wp`)

```bash
/wp init --schema schema.yaml
```

1. **Define Complete Schema** (See `schema.md`)
   - ALL nodes defined upfront
   - ALL connections mapped
   - Interfaces specified

2. **Spawn Parallel Agents**
   ```bash
   /wp spawn --agents 4 --qa strict
   ```

3. **Automated Stitching**
   - Phases combined automatically
   - Unified workflow generated
   - Single deployment

## Core Requirements

### Research BEFORE Building
```javascript
// ALWAYS execute first
WebSearch("n8n {use-case} patterns 2024")
search_nodes({query: "functionality"})
list_node_templates({nodeTypes: []})
validate_node_minimal(nodeType, config)
```

### Quality Gates (>80% Accuracy)
- [ ] Nodes discovered and validated
- [ ] Connections tested
- [ ] Phases run independently
- [ ] Documentation updated

### Version Control Protocol
```bash
# EVERY phase completion
1. Save locally: /workflows/[project]/phase-[n].json
2. Push GitHub: ./push_to_github.sh
3. Deploy n8n: n8n_create_workflow(validated)
4. Update docs: [workflowID].md
```

## n8n-MCP Commands

### Discovery
```javascript
search_nodes({query: "webhook"})
list_ai_tools()
get_node_documentation(nodeType)
```

### Validation
```javascript
validate_node_minimal(nodeType, {})
validate_workflow(workflowJson)
validate_workflow_connections(workflowJson)
```

### Templates
```javascript
search_templates({query: "use-case"})
get_template(templateId)
list_node_templates({nodeTypes: []})
```

## File Structure

```
/n8n/
├── guide.md         # Complete workflow guide
├── claude.md        # This file - AI instructions
├── schema.md        # Schema templates & guide
├── parallel.md      # Parallel orchestration details
├── personas.md      # Development personas
├── README.md        # Project overview
├── /workflows/      # Workflow JSONs
├── /docs/           # Supporting documentation
│   ├── context.md   # Context management
│   ├── reference.md # Quick reference
│   └── decision.md  # Decision guides
└── /templates/      # Reusable patterns
    ├── workflow-schema-template.yaml
    └── phase-stitcher.js
```

## Decision Matrix

| Factor | Sequential | Parallel |
|--------|:----------:|:--------:|
| Nodes | <30 | >30 |
| Time | Flexible | Urgent |
| Specs | Evolving | Complete |
| Debug | Easy | Post-build |
| Learn | Yes | No |

## Context Management

### Token Thresholds
- 🟢 0-100K: Continue
- 🟡 100-140K: Plan handoff
- 🟠 140-180K: Execute handoff
- 🔴 180K+: Emergency save

### Handoff Decision
```
Under 140K + dependencies → Compact
Over 140K OR independent → New Chat
```

## Project Handoff

When starting a project, provide:
1. **WRD** - Workflow requirements
2. **Mermaid** - Visual diagram
3. **Plan** - Implementation phases

I will:
1. Analyze complexity
2. Recommend approach (`/ws` or `/wp`)
3. Create structure
4. Begin implementation

## Critical Rules

1. **Research First** - Never skip pattern discovery
2. **Validate Always** - Test before proceeding
3. **Document Everything** - Track all phases
4. **Version Control** - GitHub after each phase
5. **Schema for Parallel** - Complete definition required
6. **Quality Gates** - >80% accuracy mandatory
7. **No Hardcoded Secrets** - Use {{$env.VARIABLE}}

## Success Metrics

- Validation: >95% score
- Security: Zero credentials
- Testing: All phases work
- Documentation: Complete
- Performance: <2min/phase

## Emergency Recovery

```bash
# Corruption
git checkout [last-good]

# Failure
document → rollback → research → fix

# Context overflow
save → handoff → new chat
```

---

*Framework v3.0 | Dual Personas | n8n-MCP Active*
*For detailed instructions, see `guide.md`*