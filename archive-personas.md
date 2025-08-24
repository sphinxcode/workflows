# n8n Workflow Development Personas

## 🎭 Two Complementary Development Approaches

Choose your development strategy based on project complexity, team size, and timeline requirements.

---

## 🐢 Persona 1: Sequential Architect
**Command**: `/workflow sequential` or `/ws`

### Identity
"The methodical craftsman who builds workflows brick by brick, ensuring each phase is perfect before moving forward."

### Core Philosophy
- **Incremental Perfection**: Each phase thoroughly tested before proceeding
- **Deep Context Retention**: Full understanding of dependencies and data flow
- **Interactive Refinement**: Continuous feedback and adjustment during development
- **Learning-Oriented**: Ideal for understanding complex business logic

### When to Use Sequential Architect

| Scenario | Sequential | Parallel | Reason |
|----------|:----------:|:--------:|---------|
| Learning n8n | ✅ | ❌ | Better understanding of node interactions |
| < 20 nodes | ✅ | ❌ | Overhead of parallelization not justified |
| Complex dependencies | ✅ | ⚠️ | Easier to manage intricate connections |
| Debugging existing | ✅ | ❌ | Need to trace issues step-by-step |
| Prototype/POC | ✅ | ❌ | Rapid iteration and experimentation |
| Single developer | ✅ | ❌ | No coordination overhead |

### Development Process

```yaml
sequential_workflow:
  phase_1:
    name: "Discovery & Setup"
    steps:
      1. Parse requirements
      2. Research patterns
      3. Build triggers
      4. Test individually
      5. Document findings
    validation: immediate
    feedback: continuous
    
  phase_2:
    name: "Core Logic"
    steps:
      1. Load Phase 1 state
      2. Build processing nodes
      3. Test with Phase 1 output
      4. Refine connections
      5. Save checkpoint
    dependency: phase_1_complete
    
  phase_3:
    name: "Integration"
    steps:
      1. Review previous phases
      2. Add external services
      3. Test end-to-end
      4. Optimize performance
      5. Final validation
```

### Advantages
- **Full Context**: Complete understanding at each step
- **Immediate Feedback**: Issues caught and fixed instantly
- **Flexible Adaptation**: Easy to pivot based on discoveries
- **Lower Complexity**: No coordination overhead
- **Better Learning**: Understand cause and effect clearly

### Command Usage

```bash
# Initialize sequential development
/workflow sequential --project "customer-onboarding"

# Or short form
/ws init

# Continue existing phase
/ws continue --phase 2

# Complete current phase
/ws complete --validate
```

### Token Management Strategy
- **Per Phase**: 20-40K tokens
- **Context Preservation**: Compact at 70% (140K)
- **Handoff**: Minimal, usually in-chat continuation

---

## 🚀 Persona 2: Parallel Orchestrator
**Command**: `/workflow parallel` or `/wp`

### Identity
"The conductor who orchestrates multiple agents simultaneously, building complex workflows at unprecedented speed."

### Core Philosophy
- **Schema-First Design**: Complete blueprint before any development
- **Parallel Execution**: Multiple phases built simultaneously
- **Automated Integration**: Intelligent stitching of components
- **Enterprise Scale**: Optimized for large, complex workflows

### When to Use Parallel Orchestrator

| Scenario | Sequential | Parallel | Reason |
|----------|:----------:|:--------:|---------|
| > 50 nodes | ❌ | ✅ | Massive time savings |
| Multiple developers | ❌ | ✅ | Team collaboration |
| Clear specifications | ⚠️ | ✅ | Schema can be defined upfront |
| Time-critical | ❌ | ✅ | 60-70% faster delivery |
| Modular architecture | ❌ | ✅ | Independent components |
| Production deployment | ⚠️ | ✅ | Consistent quality across phases |

### Development Process

```yaml
parallel_workflow:
  initialization:
    name: "Schema Definition"
    steps:
      1. Create complete node registry
      2. Define all connections
      3. Specify interfaces
      4. Validate schema
    output: workflow-schema.yaml
    
  parallel_execution:
    agents:
      - agent_1: "Phase 1 - Triggers"
      - agent_2: "Phase 2 - Processing"
      - agent_3: "Phase 3 - AI Integration"
      - agent_4: "Phase 4 - Output"
    synchronization:
      - checkpoint_1: "After node creation"
      - checkpoint_2: "After validation"
      - checkpoint_3: "Before stitching"
      
  integration:
    name: "Automated Stitching"
    steps:
      1. Collect phase outputs
      2. Resolve connections
      3. Validate interfaces
      4. Generate unified workflow
    validation: comprehensive
```

### Advantages
- **Speed**: 60-70% faster than sequential
- **Scalability**: Handle 100+ node workflows efficiently
- **Consistency**: Uniform quality across all phases
- **Resource Optimization**: Parallel token usage
- **Team Collaboration**: Multiple agents working simultaneously
- **Early Error Detection**: Issues found across all phases quickly

### Command Usage

```bash
# Initialize parallel development with schema
/workflow parallel --schema workflow-schema.yaml

# Or short form
/wp init --agents 4

# Execute parallel build
/wp spawn --qa strict

# Stitch phases
/wp stitch --validate

# Deploy unified workflow
/wp deploy --github --n8n
```

### Schema Requirements

```yaml
required_definitions:
  - Complete node registry
  - All connections mapped
  - Interface contracts
  - Error handling rules
  - Resource estimates
  - Testing requirements
```

### Token Management Strategy
- **Per Agent**: 30-50K tokens
- **Total Usage**: 120-200K (distributed)
- **Coordination Overhead**: 10-20K
- **No handoff needed**: Agents complete independently

---

## 🎯 Command System Integration

### Primary Commands

```bash
# Choose your persona at project start
/workflow [sequential|parallel] --project "project-name"

# Quick aliases
/ws   # Sequential workflow
/wp   # Parallel workflow

# Switch personas mid-project (with confirmation)
/workflow switch parallel --confirm
```

### Intelligent Auto-Selection

```javascript
// Auto-select based on project analysis
function selectWorkflowPersona(requirements) {
  const factors = {
    node_count: estimateNodes(requirements),
    complexity: analyzeComplexity(requirements),
    dependencies: checkDependencies(requirements),
    timeline: parseTimeline(requirements),
    team_size: getTeamSize()
  };
  
  if (factors.node_count > 50 && factors.timeline === 'urgent') {
    return 'parallel';
  }
  
  if (factors.complexity === 'high' && factors.dependencies === 'intricate') {
    return 'sequential';
  }
  
  // Default recommendation
  return factors.node_count > 30 ? 'parallel' : 'sequential';
}
```

### Persona-Specific Flags

#### Sequential Architect Flags
```bash
--interactive     # Pause for feedback between phases
--deep-test      # Comprehensive testing per phase
--learn-mode     # Extra documentation and explanations
--checkpoint     # Save state after each node group
```

#### Parallel Orchestrator Flags
```bash
--agents [n]     # Number of parallel agents (default: 4)
--schema [file]  # Path to workflow schema
--qa-level       # strict|standard|quick
--auto-stitch    # Automatic phase integration
```

---

## 📊 Comparison Matrix

| Aspect | Sequential Architect | Parallel Orchestrator |
|--------|---------------------|----------------------|
| **Speed** | Standard | 60-70% faster |
| **Learning Curve** | Low | Medium |
| **Setup Time** | Minimal | Schema required |
| **Flexibility** | High | Medium |
| **Error Recovery** | Immediate | Post-build |
| **Token Usage** | Concentrated | Distributed |
| **Best For** | <30 nodes | >30 nodes |
| **Team Size** | 1 developer | 1-4 agents |
| **Documentation** | Inline | Schema-based |
| **Testing** | Continuous | Phase-end |

---

## 🔄 Hybrid Approach

### When to Use Both

```yaml
hybrid_strategy:
  sequential_phases:
    - "Complex business logic"
    - "Authentication flows"
    - "Error handling setup"
    
  parallel_phases:
    - "Data transformation"
    - "API integrations"
    - "Report generation"
    
  workflow:
    1. Sequential: Build core auth (Phase 1-2)
    2. Parallel: Build processing (Phase 3-6)
    3. Sequential: Integration testing (Phase 7)
```

### Switching Command

```bash
# Start sequential, switch to parallel after Phase 2
/ws complete --phase 2
/workflow switch parallel --from-phase 3
/wp spawn --phases "3,4,5,6"
```

---

## 💡 Recommendations

### Choose Sequential When:
- You're learning n8n or the business domain
- Requirements are evolving during development
- Debugging or refactoring existing workflows
- Building proof of concepts
- Working with < 30 nodes

### Choose Parallel When:
- You have complete specifications upfront
- Building production workflows with 50+ nodes
- Time is critical (deadline pressure)
- Workflow has modular, independent components
- You want consistent quality across all phases

### Default Behavior

```javascript
// Intelligent default selection
if (!personaSpecified) {
  if (estimated_nodes < 30) {
    use('sequential');
    notify('Using Sequential Architect for optimal learning and control');
  } else {
    prompt('This looks complex. Would you like to use Parallel Orchestrator for faster development? [Y/n]');
  }
}
```

---

## 🎮 Quick Start Templates

### Sequential Template
```bash
/ws init "project-name"
# Automatic: Research → Build Phase 1 → Test → Continue
```

### Parallel Template
```bash
/wp init "project-name" --auto-schema
# Automatic: Analyze requirements → Generate schema → Spawn agents → Stitch → Deploy
```

---

*Choose your persona wisely. Sequential for understanding, Parallel for speed. Both for excellence.*