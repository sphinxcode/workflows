# n8n Workflow Development Environment

## 🚀 Quick Start

This directory contains a comprehensive framework for developing n8n workflows using Claude Code with n8n-MCP integration.

## 📁 Directory Structure

```
/n8n/
├── claude.md                         # Claude Code instructions for n8n development
├── instructions.md                   # Enhanced workflow development methodology  
├── README.md                          # This file
├── /workflows/                        # Workflow JSON files organized by project
├── /docs/                            # Project documentation and tracking
│   ├── context.md                    # Context window management guide
│   ├── reference.md                  # Quick reference card
│   ├── decision.md                   # New chat vs compact decision guide
│   └── /diagrams/                    # Mermaid diagrams for visual architecture
└── /templates/                        # Reusable workflow patterns
```

## 🔧 Setup Complete

The n8n-MCP tool is configured and operational:
- **534** total nodes available
- **268** AI-capable tools
- **88%** documentation coverage
- **108** trigger nodes

## 📖 Key Documents

### 1. claude.md
Primary instruction set for Claude Code when working with n8n workflows. Includes:
- Phased development methodology
- Quality assurance framework
- Version control protocols
- n8n-MCP tool usage

### 2. instructions.md
Strategic framework for workflow development with:
- Improved chain of thought
- Token optimization strategies
- Emergency recovery procedures
- Success metrics

### 3. docs/context.md
Context window management strategies:
- Token usage monitoring
- Phase transition strategies
- Handoff protocols
- Emergency procedures

### 4. docs/reference.md
Quick reference card for:
- Token usage indicators
- Magic phrases for context management
- Phase sizing guide
- Speed run commands

### 5. docs/decision.md
Decision guide for:
- When to compact vs new chat
- Real-world examples
- Decision flowcharts
- Advanced strategies

## 🎯 Workflow Development Process

### Phase 1: Project Initialization
```bash
1. Receive project requirements (WRD, implementation plan, mermaid diagram)
2. Create project structure in /workflows/[project-name]/
3. Initialize tracking documents in /docs/
4. Research similar implementations
```

### Phase 2: Incremental Building
```bash
1. Build workflow in phases (10-15 nodes each)
2. Save locally → Push to GitHub → Deploy to n8n
3. Validate at each step (>80% accuracy required)
4. Document progress in tracking files
```

### Phase 3: Version Control
Every workflow change follows:
- Local save: `/workflows/[project]/[workflow]-phase[n].json`
- GitHub push: `sphinxcode/workflows` repository
- n8n deployment with validation
- Documentation update

## 🛡️ Quality Assurance

### Pre-Build Checklist
- [ ] Research similar n8n workflows
- [ ] Validate node availability
- [ ] Check against mermaid diagram
- [ ] Verify >80% WRD accuracy

### Security Requirements
- No hardcoded credentials
- Use environment variables: `{{$env.VAR_NAME}}`
- Generic credential references
- Secure GitHub commits
- Token stored in `/home/dev/.github_token` (never in repo)

## 🚦 Getting Started

### For New Projects:
1. Claude will parse your project documents
2. Create appropriate directory structure
3. Present Phase 1 implementation plan
4. Begin building upon approval

### For Existing Projects:
1. Claude will load previous phase documentation
2. Pull current workflow from n8n
3. Research next phase requirements
4. Continue implementation

## 💡 Best Practices

1. **Research First**: Always investigate patterns before building
2. **Validate Early**: Catch errors before they compound
3. **Document Everything**: Future phases depend on clear records
4. **Test Incrementally**: Each phase must work independently
5. **Version Control**: GitHub is your safety net

## 🆘 Emergency Procedures

If something goes wrong:
1. Revert to last GitHub checkpoint
2. Review [workflowID].md for last known state
3. Rebuild from clean version
4. Document issue and resolution

## 📊 Current Status

- **n8n-MCP**: ✅ Operational
- **Directory Structure**: ✅ Created
- **Documentation**: ✅ Complete
- **GitHub Integration**: ✅ Connected
- **n8n Server**: ⏳ Ready for connection

## 🔐 Security Note

GitHub token is stored securely at `/home/dev/.github_token` and is never committed to the repository. Use `./push_to_github.sh` for secure pushing.

---

*Framework Version: 2.0*  
*Last Updated: Auto-generated*  
*n8n-MCP Status: Active*