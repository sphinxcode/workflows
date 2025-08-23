# n8n Workflow Development Framework with n8n-MCP

## Executive Summary
This document defines the systematic approach for designing, building, validating, and deploying n8n workflows using n8n-MCP tools with phased implementation, version control, and quality assurance.

## Core Workflow Development Process

### Phase 0: Discovery & Documentation
**ALWAYS start new workflow projects with:**
```
1. mcp__n8n-mcp__tools_documentation() - Understand best practices
2. Create project structure:
   - [projectName].md - Project implementation plan
   - [workflowID].md - Workflow phase tracking
   - mermaid-diagram.md - Visual architecture
```

### Phase 1: Requirements Analysis & Research
**Before any implementation:**
1. **Deep Analysis**
   - Parse workflow requirement documents (WRD)
   - Understand business logic and data flow
   - Identify critical paths and error scenarios
   - Ask clarifying questions if requirements are unclear

2. **Research & Pattern Discovery**
   ```
   - WebSearch: Find similar n8n workflows and implementation patterns
   - list_node_templates({nodeTypes: ['relevant-nodes']})
   - search_templates({query: 'use-case-keywords'})
   - Research API documentation for external services
   ```

3. **Node Discovery**
   ```
   - search_nodes({query: 'functionality'})
   - list_nodes({category: 'trigger|transform|output'})
   - list_ai_tools() for AI-capable nodes
   - get_node_documentation(nodeType) for complex nodes
   ```

### Phase 2: Architecture Design & Validation
1. **Visual Architecture**
   - Create/review mermaid diagram
   - Map nodes to workflow phases
   - Define data transformation points
   - Identify integration boundaries

2. **Pre-Implementation Validation**
   ```
   - validate_node_minimal(nodeType, config)
   - search_node_properties(nodeType, 'critical-params')
   - get_node_for_task('specific-task')
   ```

3. **Quality Gate: Architecture Review**
   - Present visual workflow to user
   - Validate against WRD (>80% accuracy required)
   - Get approval before proceeding

### Phase 3: Phased Implementation

#### Implementation Rules
1. **Phase Boundaries**
   - Each phase is self-contained and testable
   - Phases connect via defined interfaces
   - No phase exceeds 10-15 nodes

2. **Phase Structure**
   ```
   Phase Start:
   1. Read [workflowID].md - Understand previous state
   2. Read [projectName].md - Understand current phase goals
   3. Pull workflow from n8n - Get current implementation
   4. Research phase-specific patterns
   5. Plan phase implementation
   
   Phase Build:
   1. Implement nodes for current phase only
   2. Validate each node configuration
   3. Test phase independently
   4. Document phase completion
   
   Phase Complete:
   1. Save workflow locally as JSON
   2. Push to GitHub (sphinxcode/workflows)
   3. Update/create in n8n server
   4. Update [workflowID].md with phase summary
   ```

### Phase 4: Version Control & Deployment

#### Git Workflow
```bash
# Every workflow operation follows:
1. Save JSON locally: /workflows/[project]/[workflow-name]-v[phase].json
2. Git operations:
   - git add .
   - git commit -m "feat(workflow): [project] - phase [n] implementation"
   - git push origin main
3. Deploy to n8n server
4. Create checkpoint documentation
```

#### n8n Server Operations
```javascript
// Creation
n8n_create_workflow(validatedWorkflow)

// Updates (use diffs for efficiency)
n8n_update_partial_workflow({
  workflowId: id,
  operations: diffOperations
})

// Validation
n8n_validate_workflow({id: workflowId})
```

## Project Structure

```
/home/dev/n8n/
├── workflows/
│   ├── [project-name]/
│   │   ├── [workflow-name]-v1.json
│   │   ├── [workflow-name]-v2.json
│   │   └── ...
├── docs/
│   ├── [projectName].md          # Implementation plan
│   ├── [workflowID].md           # Phase tracking
│   └── mermaid-diagrams/
│       └── [project]-diagram.md
└── claude.md                      # This file
```

## Quality Assurance Framework

### Pre-Build QA Checklist
- [ ] Web search for similar implementations completed
- [ ] n8n templates researched and patterns identified
- [ ] Essential nodes discovered and validated
- [ ] Workflow connections validated against mermaid diagram
- [ ] Accuracy score >80% against WRD

### Node Configuration Standards
```javascript
{
  "name": "descriptive-name",
  "type": "verified-via-search",
  "typeVersion": "latest-stable",
  "position": [logical-x, logical-y],
  "parameters": {
    // Pre-validated configuration
  },
  "credentials": {
    "name": "generic-credential-reference"
  }
}
```

### Environmental Variables
- NEVER hardcode sensitive information
- Use n8n expressions: `{{$env.API_KEY}}`
- Document required environment variables

## Workflow Patterns Library

### Pattern 1: Error-Resilient API Integration
```
Trigger → Validate Input → Try API Call → 
├─ Success: Process Data → Output
└─ Failure: Retry Logic → Error Handler
```

### Pattern 2: Multi-Source Data Aggregation
```
Schedule Trigger → 
├─ Source A: Fetch → Transform
├─ Source B: Fetch → Transform
└─ Merge → Deduplicate → Store
```

### Pattern 3: AI-Enhanced Processing
```
Form Input → Validate → AI Agent →
├─ Tool 1: External API
├─ Tool 2: Database Query
└─ Memory: Context Storage
→ Response Generation → Output
```

## Command Quick Reference

### Discovery Commands
```javascript
mcp__n8n-mcp__search_nodes({query: "webhook"})
mcp__n8n-mcp__list_ai_tools()
mcp__n8n-mcp__get_node_documentation("n8n-nodes-base.slack")
```

### Validation Commands
```javascript
mcp__n8n-mcp__validate_node_minimal(nodeType, {})
mcp__n8n-mcp__validate_workflow(workflowJson)
mcp__n8n-mcp__validate_workflow_connections(workflowJson)
```

### Template Commands
```javascript
mcp__n8n-mcp__search_templates({query: "data-sync"})
mcp__n8n-mcp__get_template(templateId)
mcp__n8n-mcp__list_node_templates({nodeTypes: ["n8n-nodes-base.httpRequest"]})
```

## Phase Execution Protocol

### Starting a New Project
1. Create `[projectName].md` with full implementation plan
2. Initialize workflow in n8n
3. Create initial `[workflowID].md`
4. Commit to GitHub with project structure

### Implementing Each Phase
```
1. REVIEW: Read previous phase documentation
2. RESEARCH: Study patterns and best practices
3. PLAN: Design phase implementation
4. BUILD: Implement phase nodes
5. VALIDATE: Test phase functionality
6. DOCUMENT: Update tracking files
7. VERSION: Commit to GitHub
8. DEPLOY: Update n8n server
```

### Phase Transition Checklist
- [ ] Current phase fully tested
- [ ] Documentation updated
- [ ] GitHub checkpoint created
- [ ] n8n server synchronized
- [ ] Ready for next phase briefing

## Token Optimization Strategies

1. **Use Diff Updates**: 80-90% token savings on modifications
2. **Reference Existing Patterns**: Avoid recreating common structures
3. **Incremental Building**: Small, focused phases
4. **Cache Validation Results**: Reuse successful configurations
5. **Template Reuse**: Leverage proven workflow templates

## Critical Success Factors

1. **Never Skip Research Phase** - Understanding patterns saves rework
2. **Always Validate Before Building** - Catch errors early
3. **Maintain Phase Discipline** - Don't exceed phase boundaries
4. **Document Everything** - Future phases depend on clear records
5. **Test Incrementally** - Each phase must work independently
6. **Version Everything** - GitHub is your safety net

## Emergency Procedures

### Workflow Corruption
1. Revert to last GitHub checkpoint
2. Pull clean version from repository
3. Rebuild from last known good state

### Phase Failure
1. Document failure in [workflowID].md
2. Rollback to previous phase
3. Research alternative approach
4. Implement correction with new version

### Integration Issues
1. Validate credentials and permissions
2. Check API documentation for changes
3. Test with minimal configuration
4. Escalate with detailed error logs

---

## Project Handoff Template

When receiving a new project, expect:
1. **Workflow Requirement Document (WRD)** - Business requirements
2. **Project Implementation Plan** - Technical breakdown
3. **Mermaid Diagram** - Visual architecture

Your response structure:
1. Parse and understand all documents
2. Create project structure
3. Initialize tracking files
4. Present phase 1 plan for approval
5. Begin implementation upon confirmation

---

*Last Updated: [Auto-update on save]*
*Framework Version: 2.0*
*n8n-MCP Integration: Active*