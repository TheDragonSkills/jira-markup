#!/usr/bin/env sh
set -eu

script_dir=$(CDPATH= cd "$(dirname "$0")" && pwd)
repository_root=$(dirname "$script_dir")

cd "$repository_root"

remove_unwanted_tags() {
    file=$1
    temp_file="${file}.tmp"

    # Remove paired tags (style, script, form) with their content, and void tags (meta, link)
    perl -0777 -pe '
        s{<(style|script|form)\b[^>]*>.*?</\1\s*>}{}gis;
        s{<(meta|link)\b[^>]*/?>}{}gis;
        s{<!--\b[^>]*-->}{}gis;
    ' "$file" > "$temp_file"
    mv "$temp_file" "$file"
}

sections="texteffects headings breaks links lists images attachments tables advanced miscellaneous"

for section in $sections; do
    curl -o "source/${section}.html" "https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=${section}"
done

for file in source/*.html; do
    [ -f "$file" ] || continue
    remove_unwanted_tags "$file"
done

codex "\$aif-distillation source --path skills --redact-source-map --name jira-markup"
