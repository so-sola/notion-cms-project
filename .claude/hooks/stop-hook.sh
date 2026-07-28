#!/usr/bin/env bash
# Claude Code Stop 훅: 작업 완료 알림을 슬랙으로 전송
set -eo pipefail

if [ -z "${SLACK_WEBHOOK_URL:-}" ]; then
  exit 0
fi

curl -s -X POST -H 'Content-type: application/json' \
  --data "$(jq -n --arg text '✅ [claude-nextjs-starters] 작업이 완료되었습니다' '{text:$text}')" \
  "$SLACK_WEBHOOK_URL" > /dev/null
