---
name: jira-markup-code-panels
description: Format Jira wiki noformat blocks, panels, and syntax-highlighted code macros.
argument-hint: "<logs, code, configuration, or panel content>"
---

# Jira Markup Code And Panels

Use this skill to format logs, code snippets, configuration, terminal output, and callout panels in Jira wiki-rendered fields. It should produce paste-ready macros with balanced opening and closing tags.

## When To Use

Use this skill when the user asks to:

- paste code, logs, stack traces, or config into Jira safely
- prevent Jira markup from interpreting content
- add a visible panel around notes or warnings
- syntax-highlight a code block
- repair broken `{code}`, `{noformat}`, or `{panel}` macros

Do not use this skill for normal inline formatting, links, images, or tables unless they appear inside a macro body.

## Workflow

1. Decide whether the content should be interpreted, highlighted, or preserved literally.
2. Use `{noformat}` for logs and text where Jira markup must not apply.
3. Use `{code}` for source code or structured configuration that benefits from syntax highlighting.
4. Use `{panel}` for explanatory callouts, summaries, and grouped notes that can still contain wiki formatting.
5. Add macro parameters only when they improve readability.
6. Ensure every block macro closes exactly once.
7. Return the final Jira-ready markup in a fenced code block.

## References And Examples

- `references/SYNTAX.md` contains macro parameters and language guidance.
- `examples/REQUESTS.md` shows practical code, log, and panel transformations.

## Quality Bar

- The chosen macro must match the content: literal logs use `{noformat}`, code uses `{code}`, explanatory notes use `{panel}`.
- Macro parameters must be separated correctly.
- The block body must not accidentally close the macro unless that is intended.
- The output must remain readable before and after rendering.

## Artifact Ownership

This skill reads only the user-provided code/log/config/panel content. It writes no files unless explicitly asked to update a named artifact.

## Config Policy

No project config is required. If project style rules specify preferred code languages or panel colors, apply them before these defaults.
