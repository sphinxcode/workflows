#!/bin/bash

# Secure GitHub push script for n8n workflows
# Token is stored securely in home directory

TOKEN_FILE="/home/dev/.github_token"

if [ ! -f "$TOKEN_FILE" ]; then
    echo "Error: GitHub token not found at $TOKEN_FILE"
    exit 1
fi

TOKEN=$(cat "$TOKEN_FILE")
REPO_URL="https://sphinxcode:${TOKEN}@github.com/sphinxcode/workflows.git"

# Add and commit changes
git add .
git commit -m "$1" || echo "No changes to commit"

# Push to GitHub
git push "$REPO_URL" main

echo "✅ Successfully pushed to GitHub"