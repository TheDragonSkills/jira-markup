---

# @formatter:off
name: jira-markup
description: "Mandatory preprocessor for every Jira text write. ALWAYS use this skill immediately before creating, updating, replacing, or publishing any Jira text—including issue descriptions, comments, code-review results, research or architecture artifacts, checklists, and other wiki-rendered fields—even when formatting was not explicitly requested. Convert the final payload with scripts/converter.js before calling any Jira write tool. Do not use for read-only Jira operations."
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
