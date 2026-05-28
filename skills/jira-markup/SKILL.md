---
name: jira-markup
description: Format Jira wiki-rendered text, lists, tables, links, media, code blocks, and panels into paste-ready markup.
argument-hint: "<plain text, draft Jira field, links, files, code, table data, or formatting request>"
---

# Jira Markup

Use this skill to convert user-provided content into Jira wiki markup for issue descriptions, comments, and other wiki-rendered fields. It should produce a paste-ready markup block and concise notes about assumptions, renderer-sensitive choices, or escaping.

## When To Use

Use this skill when the user asks to:

- format prose, headings, emphasis, quotes, color, or literal characters for Jira
- build or repair Jira lists, nested outlines, or tables
- create Jira links, anchors, user references, attachment links, images, or media embeds
- wrap logs, code, configuration, or callouts in `{noformat}`, `{code}`, or `{panel}` macros
- fix markup that renders incorrectly in Jira

Do not use this skill for Markdown, HTML, Confluence storage format, or Jira Cloud rich-text editor JSON unless the user explicitly asks to translate between formats.

## Workflow

1. Identify the target content type: prose, structure, link/media, code/log, panel, or mixed Jira field.
2. Preserve the user's meaning and wording unless rewriting is requested.
3. Choose the smallest Jira notation that makes the content readable.
4. Keep block syntax balanced, especially `{quote}`, `{color}`, `{panel}`, `{code}`, and `{noformat}`.
5. Escape literal markup characters when they should render as text, especially single curly braces inside `{{monospace}}`.
6. Return the final Jira-ready markup in a fenced `text` code block.
7. Add short warnings only for meaningful risks such as local file links, remote media restrictions, ambiguous pipes in tables, or renderer-dependent icons.

## References And Examples

- `references/SYNTAX.md` contains the Jira wiki notation rules.
- `references/WORKFLOW.md` contains selection rules, repair checks, and failure modes.
- `examples/REQUESTS.md` shows common input-to-output transformations.

## Quality Bar

- Output is paste-ready Jira wiki markup, not Markdown unless the user requested Markdown.
- List markers start in column 1, and nested marker sequences are contiguous.
- Table rows have consistent cell counts, with header cells using double bars.
- Link and attachment targets preserve exact names, paths, extensions, and aliases.
- Code and literal blocks use the correct macro and close exactly once.
- Literal braces, stars, underscores, pipes, and macro-looking text are escaped or isolated when needed.

## Artifact Ownership

This skill reads only the user-provided content, directly referenced drafts, and project-level Jira formatting rules if present. It writes no files unless the user explicitly asks to update a named artifact. If writing is requested, modify only that artifact and preserve unrelated content.

## Config Policy

No project config is required. If repository or conversation context defines Jira style, security, attachment, or renderer rules, treat those rules as higher priority than these defaults.
