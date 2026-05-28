#!/usr/bin/env sh
set -eu

script_dir=$(CDPATH= cd "$(dirname "$0")" && pwd)
repository_root=$(dirname "$script_dir")

cd "$repository_root"

curl -o source/texteffects.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=texteffects
curl -o source/headings.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=headings
curl -o source/breaks.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=breaks
curl -o source/links.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=links
curl -o source/lists.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=lists
curl -o source/images.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=images
curl -o source/attachments.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=attachments
curl -o source/tables.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=tables
curl -o source/advanced.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=advanced
curl -o source/miscellaneous.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=miscellaneous

codex "\$aif-distillation source --split --path skills --redact-source-map --name jira-markup"
