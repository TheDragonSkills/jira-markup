#!/usr/bin/env sh
set -eu

script_dir=$(CDPATH= cd "$(dirname "$0")" && pwd)
repository_root=$(dirname "$script_dir")

cd "$repository_root"

curl -o source/help_page.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=all
codex "\$aif-distillation source --split --path skills --redact-source-map --name jira-markup"
