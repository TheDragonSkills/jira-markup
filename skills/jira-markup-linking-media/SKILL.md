---
name: jira-markup-linking-media
description: Create Jira wiki links, anchors, user references, images, and attachment embeds.
argument-hint: "<link targets, attachment names, image references, or draft text>"
---

# Jira Markup Linking And Media

Use this skill to add navigable links and embedded media to Jira wiki-rendered fields. It should produce paste-ready markup and call out renderer or security constraints when relevant.

## When To Use

Use this skill when the user asks to:

- create internal, external, email, file, page, anchor, or user links
- link to or embed an attachment
- insert remote or attached images
- embed supported media attachments with dimensions or IDs
- fix Jira links or media syntax that renders as plain text

Do not use this skill for tables, lists, code blocks, or general prose formatting unless those elements are part of the link/media draft.

## Workflow

1. Classify each target: external URL, email, file path, anchor, attachment, page, user profile, image, or media attachment.
2. Choose the most specific Jira syntax for the target.
3. Add aliases for long URLs when the user-facing text should be readable.
4. Keep attachment and image names exact, including extensions.
5. Include dimensions or alignment only when requested or needed.
6. Warn when a target depends on browser support, local files, permissions, or remote-server restrictions.
7. Return the final Jira-ready markup in a fenced code block.

## References And Examples

- `references/SYNTAX.md` contains link and media syntax rules.
- `examples/REQUESTS.md` shows link, image, and attachment embed patterns.

## Quality Bar

- Link targets must match the user's intended destination.
- Aliases must be clear and not hide risky or surprising destinations.
- Attachment references must use the correct `^` or image/media notation.
- Remote media embeds must not be suggested when the renderer only permits attached media.

## Artifact Ownership

This skill reads only user-provided targets and draft content. It writes no files unless the user explicitly asks to update a named artifact.

## Config Policy

No project config is required. If a project documents allowed attachment, media, or link policies, follow those rules first.
