#!/usr/bin/env bash
# Claude Code Notification 훅: 권한 승인 요청 메시지만 걸러서 슬랙으로 전송
set -eo pipefail

if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
  exit 0
fi

msg=$(jq -r '.message // empty')

if printf '%s' "$msg" | grep -qi 'permission'; then
  curl -s -X POST -H 'Content-type: application/json' \
    --data "$(jq -n --arg text "🔐 [claude-nextjs-starters] 권한 승인이 필요합니다: $msg" '{text:$text}')" \
    "$SLACK_WEBHOOK_URL" > /dev/null
fi
