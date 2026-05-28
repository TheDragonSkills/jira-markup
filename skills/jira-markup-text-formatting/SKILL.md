---
name: jira-markup-text-formatting
description: Format Jira wiki text with inline emphasis, headings, breaks, quotes, colors, escapes, and icons.
argument-hint: "<plain text or Jira field draft>"
---

# Jira Markup Text Formatting

Use this skill to turn plain text into Jira wiki markup for readable issue descriptions, comments, notes, and short status updates. It should produce a revised Jira-ready text block plus a short note about any formatting choices that may affect rendering.

## When To Use

Use this skill when the user asks to:

- format text for Jira comments, descriptions, or wiki-rendered fields
- add emphasis, headings, line breaks, quotes, or color to Jira text
- escape markup characters so they render literally
- use Jira smiley/icon notation in short messages

Do not use this skill for tables, lists, links, images, attachments, code blocks, or panels unless the request is mainly about inline text and those elements are incidental.

## Workflow

1. Identify the target field and tone: comment, issue description, release note, incident update, or checklist text.
2. Preserve the user's meaning and wording unless they ask for rewriting.
3. Apply only the smallest Jira wiki notation needed for clarity.
4. Prefer headings for sections, blank lines for paragraphs, and inline marks for short spans.
5. Escape literal special characters when the user wants markup characters shown as text.
6. Return the final Jira-ready markup in a fenced code block.
7. Add concise warnings when color, icons, or explicit line breaks may render differently by Jira version or renderer.

## References And Examples

- `references/SYNTAX.md` contains the text formatting notation and decision rules.
- `examples/REQUESTS.md` shows common transformations.

## Quality Bar

- The output must be paste-ready Jira wiki markup.
- Markup must be balanced for paired delimiters and block macros.
- Explicit line breaks must be used sparingly; blank lines are preferred for paragraphs.
- Literal braces, stars, underscores, and similar syntax characters must be escaped when they should not format text.

## Artifact Ownership

This skill reads only the user-provided text and any directly referenced draft. It writes no files unless the user explicitly asks to update a project artifact. If writing is requested, modify only the named artifact and preserve unrelated content.

## Config Policy

No project config is required. If a project defines style rules for Jira text, treat them as higher priority than these defaults.
