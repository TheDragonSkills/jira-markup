---

# @formatter:off
name: jira-markup
description: Format Jira wiki-rendered text, lists, tables, links, attachments, images, media, code blocks, and panels into paste-ready markup. Use this skill to convert user-provided content into Jira wiki markup for issue descriptions, comments, and other wiki-rendered fields.
argument-hint: "<plain text, draft Jira field, links, files, code, table data, or formatting request>"
# @formatter:on
---

# Jira Markup

## Required Workflow

When preparing text for Jira, always run the final text through `scripts/converter.js`.
Do not hand-write Jira wiki markup directly unless the user explicitly asks for manual formatting.

## How It Works

The script accepts Markdown text as input and writes the converted Jira Markup output to `stdout`.

## Usage Examples

Examples assume the current directory is the skill root and Node.js is available.

### Linux and macOS

```bash
printf "# Foo\n## Bar" | node ./scripts/converter.js
```

```bash
cat path/to/file.md | node ./scripts/converter.js
```

```bash
node ./scripts/converter.js $'# Foo\n## Bar'
```

### Windows PowerShell

```powershell
"# Foo`n## Bar" | node .\scripts\converter.js
```

```powershell
Get-Content -Raw -Path .\path\to\file.md | node .\scripts\converter.js
```

```powershell
node .\scripts\converter.js "# Foo`n## Bar"
```
