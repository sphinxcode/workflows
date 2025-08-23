# Context Management Guide for n8n Workflow Development

## 🎯 Project Initialization Protocol

### A. First Message Structure (Optimal Order)

```markdown
1. **Project Context** (Top of message):
   - Project name and objective
   - Expected workflow complexity (simple/moderate/complex)
   - Number of estimated phases
   - Critical integrations needed

2. **Long-form Documents** (Place these FIRST, before instructions):
   - Workflow Requirement Document (WRD)
   - Mermaid diagram code
   - Any API documentation or schemas
   - Example data structures

3. **Project Implementation Plan**:
   - Phase breakdown
   - Success criteria
   - Timeline expectations

4. **Specific Request** (At the END):
   - "Initialize project structure"
   - "Begin Phase 1 implementation"
   - "Research and validate approach"
```

### B. What I Need to Read First (Priority Order)

```yaml
initialization_sequence:
  1_project_state:
    - Check for existing [workflowID].md
    - Review any previous phases
    - Load current n8n workflow if exists
    
  2_requirements:
    - Parse WRD completely
    - Understand business logic
    - Identify critical paths
    
  3_architecture:
    - Analyze mermaid diagram
    - Map node relationships
    - Identify phase boundaries
    
  4_context:
    - Research similar patterns
    - Validate node availability
    - Check API requirements
```

## 📊 Context Window Management Strategy

### Current Limits (Claude 3 Opus)
- **Context Window**: 200K tokens (~500 pages)
- **Typical Phase Usage**: 
  - Research & Planning: 5-10K tokens
  - Implementation: 10-20K tokens
  - Complex phases: 20-40K tokens

### Token Usage Monitoring

```python
# Approximate token consumption per activity:
activities = {
    "workflow_json_medium": "3-5K tokens",
    "research_web_search": "2-3K tokens",
    "n8n_mcp_operations": "1-2K tokens per call",
    "documentation_update": "1-2K tokens",
    "code_generation": "5-10K tokens",
    "validation_cycles": "2-5K tokens"
}

# Warning thresholds:
thresholds = {
    "green": "0-100K tokens (50%) - Continue normally",
    "yellow": "100-140K tokens (70%) - Start optimization",
    "orange": "140-180K tokens (90%) - Prepare handoff",
    "red": "180K+ tokens (90%+) - Immediate action needed"
}
```

## 🔄 Phase Transition Strategies

### Strategy 1: Compact & Continue (Recommended for 2-4 phases)

**When to Use**:
- Project has 2-4 total phases
- Strong inter-phase dependencies
- Need to maintain full context
- Under 140K tokens used

**Before Compacting**:
```markdown
1. Save all artifacts:
   - Current workflow JSON to GitHub
   - Update [workflowID].md with phase summary
   - Document any unresolved issues
   
2. Request summary:
   "Please provide a concise summary of:
   - Completed phases
   - Current workflow state
   - Key decisions made
   - Next phase requirements"
   
3. Compact conversation
   
4. Restart with:
   "Continue Phase [N] implementation. 
   Previous summary: [paste summary]
   Current workflow: [workflowID]"
```

### Strategy 2: New Chat per Phase (Recommended for 5+ phases)

**When to Use**:
- Project has 5+ phases
- Phases are relatively independent
- Clean handoff points exist
- Want maximum tokens per phase

**Handoff Protocol**:
```markdown
## End of Current Phase:
1. Generate handoff document:
   - Phase completion summary
   - Workflow state snapshot
   - Unresolved issues
   - Next phase prerequisites
   
2. Save as: /docs/[project]-phase[N]-handoff.md

3. Update [workflowID].md with:
   - Phase completion status
   - GitHub commit hash
   - n8n workflow ID
   - Key metrics

## Start of New Chat:
1. First message:
   "Continue [project] workflow development.
   Previous phase: [N] completed
   Handoff document: [paste handoff.md]
   Next phase: [N+1] - [description]
   Load workflow from: [workflowID]"
```

### Strategy 3: Hybrid Approach (Optimal for Complex Projects)

**Phase Grouping**:
```yaml
chat_session_1:
  - Phase 1: Triggers & Initial Setup
  - Phase 2: Data Ingestion
  compact_and_continue
  
chat_session_2:
  - Phase 3: Core Processing
  - Phase 4: AI Integration
  new_chat_handoff
  
chat_session_3:
  - Phase 5: Output & Delivery
  - Phase 6: Error Handling
  - Phase 7: Testing & Optimization
```

## 📋 Pre-Handoff Checklist

### When Context is ~70% Full (140K tokens)

```markdown
□ Save current workflow to GitHub
□ Update [workflowID].md with current state
□ Document any pending decisions
□ Create phase summary
□ Test current implementation
□ Note any blockers or issues
□ Generate handoff document
□ Confirm GitHub push successful
```

### Essential Information to Preserve

```yaml
must_preserve:
  - Workflow ID and current version
  - Completed node configurations
  - Environment variables used
  - API credentials referenced
  - Custom code snippets
  - Validation results
  - Error patterns discovered
  - Performance metrics

can_regenerate:
  - Node documentation
  - Research results
  - Template examples
  - General patterns
```

## 🚀 Optimal Session Patterns

### Pattern A: Single Complex Phase
```
New Chat → Research → Design → Build → Test → Deploy → Document → End
(Use full context for deep implementation)
```

### Pattern B: Multiple Simple Phases
```
Start → Phase 1 → Phase 2 → Compact → Phase 3 → Phase 4 → New Chat → Phase 5
(Maximize phases per session)
```

### Pattern C: Iterative Refinement
```
Chat 1: Research & Prototype
Chat 2: Implementation & Testing
Chat 3: Optimization & Documentation
(Clean separation of concerns)
```

## 💡 Pro Tips for Context Efficiency

### 1. Front-load Important Content
```markdown
# Good (documents first):
[WRD content]
[Mermaid diagram]
[Schemas]
"Now implement Phase 1"

# Bad (instructions mixed in):
"Implement this"
[WRD content]
"Using this diagram"
[Mermaid]
```

### 2. Use References Instead of Repetition
```markdown
# Instead of pasting workflow JSON repeatedly:
"Load workflow [workflowID] from n8n"
"Reference Phase 2 configuration from [workflowID].md"
```

### 3. Batch Operations
```markdown
# Combine related requests:
"1. Validate all Phase 3 nodes
 2. Update GitHub
 3. Deploy to n8n
 4. Generate Phase 4 plan"
```

### 4. Strategic Summarization
```markdown
# Before compacting, request:
"Create a 500-word technical summary preserving:
- Node configurations
- Integration details  
- Unresolved issues
- Next steps"
```

## 🔴 Emergency Protocols

### Context Overflow (>95% full)
```bash
IMMEDIATE ACTIONS:
1. Stop current operation
2. Save all work to GitHub
3. Generate minimal handoff:
   - Current workflow ID
   - Last successful operation
   - Critical next step
4. Start new chat with handoff
```

### Lost Context Recovery
```bash
RECOVERY STEPS:
1. Check GitHub for last commit
2. Load [workflowID].md
3. Pull workflow from n8n
4. Reconstruct from documentation
5. Continue from last known good state
```

## 📊 Context Usage Examples

### Small Project (2-3 phases)
```
Chat 1: Complete all phases
- Initialize: 5K tokens
- Phase 1: 20K tokens  
- Phase 2: 25K tokens
- Phase 3: 30K tokens
- Documentation: 10K tokens
Total: ~90K tokens (45% usage)
```

### Medium Project (4-6 phases)
```
Chat 1: Phases 1-3 (100K)
- Compact at 70%
- Continue Phases 4-5 (60K)
Chat 2: Phase 6 + optimization
```

### Large Project (7+ phases)
```
Chat 1: Research + Phases 1-2
Chat 2: Phases 3-4
Chat 3: Phases 5-6
Chat 4: Phases 7+ and optimization
```

## 🎯 Decision Matrix

| Scenario | Strategy | Handoff Method |
|----------|----------|----------------|
| <100K tokens, more phases | Compact & Continue | In-chat summary |
| >140K tokens, any phases | New Chat | Handoff document |
| Complex dependencies | Compact & Continue | Detailed summary |
| Independent phases | New Chat per Phase | Minimal handoff |
| Critical operations | Save & New Chat | Full documentation |
| Testing/debugging | Same Chat | No handoff needed |

## 📝 Template: Perfect Phase Handoff

```markdown
# Phase [N] Completion Handoff

## Completed State
- Workflow ID: [id]
- GitHub Commit: [hash]
- Nodes Implemented: [count]
- Tests Passed: [status]

## Key Configurations
```json
{
  "critical_nodes": {},
  "environment_vars": [],
  "credentials_used": []
}
```

## Unresolved Items
- [ ] Issue 1
- [ ] Issue 2

## Next Phase Requirements
- Load workflow [ID] from n8n
- Continue with [specific next action]
- Focus on [primary objective]

## Context Preservation
- Decision: [why specific approach was chosen]
- Pattern: [reusable pattern discovered]
- Warning: [issues to avoid]
```

---

*Remember: The goal is continuous progress with minimal context loss. When in doubt, save everything and start fresh.*