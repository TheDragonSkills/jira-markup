---
name: jira-markup-structure-formatting
description: Build Jira wiki lists and tables for structured issue descriptions, reports, and comments.
argument-hint: "<items, outline, table data, or draft text>"
---

# Jira Markup Structure Formatting

Use this skill to format structured content as Jira wiki lists and tables. It should produce paste-ready markup that keeps rows, nesting, and table headers readable in Jira-rendered fields.

## When To Use

Use this skill when the user asks to:

- convert bullets, steps, or outlines into Jira list markup
- create nested numbered or bulleted lists
- turn CSV-like or prose data into a Jira table
- clean up a Jira table or list that renders incorrectly

Do not use this skill for inline emphasis, links, attachments, images, or code panels unless they appear inside list or table cells.

## Workflow

1. Identify whether the content is best represented as bullets, numbered steps, mixed nesting, or a table.
2. Keep list markers in the first column so Jira recognizes them.
3. Use repeated markers for nesting: `**`, `##`, `#*`, or `*#`.
4. Use table headers only when the first row labels the columns.
5. Escape or rephrase cell content that contains ambiguous pipe characters.
6. Return the final Jira-ready markup in a fenced code block.
7. Mention any assumptions about headers, ordering, or nesting.

## References And Examples

- `references/SYNTAX.md` contains list and table rules.
- `examples/REQUESTS.md` shows practical conversions and repair cases.

## Quality Bar

- List markers start at column 1.
- Nested lists use the minimum depth needed.
- Table rows have a consistent number of cells.
- Header rows use double bars; data rows use single bars.
- The output remains readable as plain text before rendering.

## Artifact Ownership

This skill reads only user-provided structured content and directly referenced drafts. It writes no files unless explicitly asked to update a named artifact, and then only that artifact.

## Config Policy

No project config is required. Follow any project-specific Jira formatting rules if they are provided in the conversation or repository context.
