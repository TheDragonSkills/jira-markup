#!/usr/bin/env sh
set -eu

script_dir=$(CDPATH= cd "$(dirname "$0")" && pwd)
repository_root=$(dirname "$script_dir")

cd "$repository_root"

remove_statsig_meta_tag() {
    file=$1
    temp_file="${file}.tmp"

    sed 's/<meta[[:space:]][^>]*name="ajs-fe-statsig-values"[^>]*>//g' "$file" > "$temp_file"
    mv "$temp_file" "$file"
}

sections="texteffects headings breaks links lists images attachments tables advanced miscellaneous"

for section in $sections; do
    curl -o "source/${section}.html" "https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=${section}"
done

for file in source/*.html; do
    [ -f "$file" ] || continue
    remove_statsig_meta_tag "$file"
done

codex "\$aif-distillation source --path skills --redact-source-map --name jira-markup"
