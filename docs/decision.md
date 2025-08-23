# 🎯 New Chat vs Compact: The Definitive Guide

## The Golden Rule
**Compact & Continue** when you need memory.  
**New Chat** when you need space.

## 📊 Data-Driven Decision Matrix

### Based on Actual Token Consumption Patterns

```yaml
typical_phase_consumption:
  research_and_planning: 10-15K tokens
  simple_implementation: 15-25K tokens  
  complex_implementation: 30-50K tokens
  testing_and_validation: 10-20K tokens
  documentation: 5-10K tokens

context_window: 200K tokens
effective_limit: 180K tokens (90% safety margin)
```

## 🔄 COMPACT & CONTINUE When:

### Scenario 1: Tight Dependencies
```markdown
✅ Phase 2 needs Phase 1's exact node IDs
✅ Complex data flow between phases
✅ Iterative refinement of same components
✅ Under 140K tokens (70% usage)

Example:
- Phase 1: Create webhook trigger (ID: webhook_abc)
- Phase 2: Process webhook data (needs: webhook_abc output)
- Phase 3: Transform and route (needs: both previous outputs)
→ COMPACT after Phase 2
```

### Scenario 2: Debugging Context
```markdown
✅ Troubleshooting across phases
✅ Need to see error evolution
✅ Pattern recognition required
✅ Complex state management

Example:
"The API integration in Phase 1 has an edge case 
affecting Phase 2's data processing"
→ KEEP CONTEXT to see the full picture
```

### Scenario 3: Short Project (2-4 phases)
```markdown
✅ Can complete within 180K tokens
✅ Benefit from full context
✅ Faster without handoffs
✅ Single narrative flow

Token Budget:
- Phase 1: 40K
- Phase 2: 45K
- Compact here (85K used)
- Phase 3: 40K
- Phase 4: 35K
Total: 160K (80% usage) ✅
```

## 🆕 START NEW CHAT When:

### Scenario 1: Clean Boundaries
```markdown
✅ Phases are independent modules
✅ Clear input/output contracts
✅ Different technical domains
✅ Over 140K tokens used

Example:
- Phase 1-2: Data ingestion module ✓
- Phase 3-4: Processing module (new chat)
- Phase 5-6: Delivery module (new chat)
```

### Scenario 2: Large Project (5+ phases)
```markdown
✅ Each phase needs full token budget
✅ Complex research per phase
✅ Extensive testing required
✅ Multiple iterations expected

Phase Distribution:
- Chat 1: Research + Phases 1-2
- Chat 2: Phases 3-4
- Chat 3: Phases 5-6
- Chat 4: Integration + Testing
```

### Scenario 3: Performance Optimization
```markdown
✅ Response speed degrading
✅ Need fresh context for clarity
✅ Major pivot in approach
✅ Starting new major feature

Indicators:
- Responses taking >30 seconds
- Truncated outputs
- Confusion about earlier context
```

## 📈 Real-World Examples

### Example A: E-commerce Workflow
```markdown
Chat 1 (Compact Strategy):
- Phase 1: Product import trigger (30K)
- Phase 2: Inventory validation (35K)
- [Compact at 65K]
- Phase 3: Price calculation (40K)
- Phase 4: Multi-channel sync (40K)
Result: 145K total, maintained context ✅
```

### Example B: AI Content Pipeline
```markdown
Multiple Chats Strategy:
- Chat 1: Trigger + Input validation (80K)
- Chat 2: AI processing + agents (90K)
- Chat 3: Output + distribution (70K)
- Chat 4: Testing + optimization (60K)
Result: Each phase got full space ✅
```

## 🎬 The Perfect Handoff Script

### For Compacting:
```markdown
You: "We're at 70% capacity. Please:
1. Save workflow to GitHub
2. Update [workflowID].md
3. Generate 500-word technical summary
4. List next phase requirements"

[Compact Conversation]

You: "Continue [project] Phase [N].
Previous summary: [paste]
Focus: [specific next objective]"
```

### For New Chat:
```markdown
You (End of Chat 1): 
"Generate complete handoff document:
- Workflow state
- Node configurations  
- Environment variables
- Next phase entry point"

You (Start of Chat 2):
"New session for [project] Phase [N].
Handoff: [paste document]
Load workflow [ID] from n8n.
Implement: [next phase objective]"
```

## 🚦 Quick Decision Flowchart

```
Current Token Usage?
├─ Under 100K (50%)
│  └─ Continue (plenty of room)
├─ 100-140K (50-70%)
│  ├─ 2-3 phases left?
│  │  └─ Compact & Continue
│  └─ 4+ phases left?
│     └─ Finish current, then new chat
└─ Over 140K (70%+)
   ├─ Critical debugging?
   │  └─ Compact & Continue
   └─ Normal flow?
      └─ New Chat
```

## 💡 Advanced Strategies

### The "2-2-2 Pattern" (Optimal for 6-phase projects)
```
Chat 1: Phases 1-2 → Handoff
Chat 2: Phases 3-4 → Handoff  
Chat 3: Phases 5-6 → Complete
```

### The "Research Split" (For complex projects)
```
Chat 1: Deep research + architecture
Chat 2: Implementation Phase 1-3
Chat 3: Implementation Phase 4-6
Chat 4: Testing + Documentation
```

### The "Iterative Loop" (For refinement)
```
Chat 1: Build Phases 1-3
Chat 2: Test and find issues
Chat 3: Refine Phases 1-3
Chat 4: Build Phases 4-6
```

## 🎯 Your Personal Decision

Answer these questions:

1. **How many phases remain?**
   - 1-2 → Stay in chat
   - 3-4 → Depends on complexity
   - 5+ → Plan for new chat

2. **How complex is each phase?**
   - Simple (10-20K) → Batch them
   - Complex (40K+) → Separate them

3. **Do phases depend on each other?**
   - High dependency → Compact
   - Low dependency → New chat

4. **What's your current usage?**
   - Under 70% → Continue
   - 70-85% → Prepare handoff
   - Over 85% → Exit now

## 📝 The Ultimate Formula

```python
def should_start_new_chat():
    if token_usage > 0.7 and phases_remaining > 2:
        return True
    if phase_complexity == "high" and token_usage > 0.5:
        return True
    if dependencies == "low" and clean_boundary:
        return True
    if performance_degraded:
        return True
    return False
```

## 🏁 Final Recommendation

**For Your n8n Projects:**

Given the typical complexity of n8n workflows, I recommend:

1. **Phase 1-2**: First chat (research + triggers + initial processing)
2. **Phase 3-4**: Second chat (core logic + integrations)
3. **Phase 5+**: Third chat (output + error handling + testing)

This gives each major section full token budget while maintaining logical boundaries.

**The 70% Rule**: When you hit 140K tokens (70%), make the transition. This leaves buffer for proper handoff documentation.

---

*Remember: A clean handoff is better than a confused context.*