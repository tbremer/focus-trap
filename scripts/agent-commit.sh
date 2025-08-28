#!/usr/bin/env bash
set -euo pipefail

# agent-commit.sh
# Usage: ./scripts/agent-commit.sh -m "message" [--no-all] [files...]
# By default this stages all changes and commits them with a preset agent identity.

AGENT_NAME="AI Agent"
AGENT_EMAIL="ai-agent@users.noreply"

MSG=""
NO_ALL=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    -m|--message)
      shift; MSG="$1"; shift;;
    --no-all)
      NO_ALL=1; shift;;
    --help|-h)
      echo "Usage: $0 -m \"commit message\" [--no-all] [files...]"; exit 0;;
    *)
      break;;
  esac
done

if [ -z "$MSG" ]; then
  echo "Error: commit message required (-m)" >&2
  exit 2
fi

if [ $NO_ALL -eq 0 ]; then
  git add -A
fi

if [ "$#" -gt 0 ]; then
  git add -- "$@"
fi

# Commit using ephemeral git config for author/committer
git -c user.name="$AGENT_NAME" -c user.email="$AGENT_EMAIL" commit -m "$MSG"
echo "Committed as $AGENT_NAME <$AGENT_EMAIL>: $MSG"
