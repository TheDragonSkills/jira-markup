# Jira Markup Skill

<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://banners.beyondco.de/Jira%20Markup.png?pattern=topography&style=style_1&fontSize=100px&md=1&showWatermark=1&icon=book-open&theme=dark&packageManager=&packageName=&description=by+The+Dragon+Code&images=book-open">
    <img src="https://banners.beyondco.de/Jira%20Markup.png?pattern=topography&style=style_1&fontSize=100px&md=1&showWatermark=1&icon=book-open&theme=light&packageManager=&packageName=&description=by+The+Dragon+Code&images=book-open" alt="Jira Markup">
</picture>

> Agent skills for producing paste-ready Jira wiki markup.

This repository contains a small set of focused skills that help an AI agent format Jira comments, issue descriptions,
reports, and notes using Jira wiki markup. The skills are split by formatting task so the agent can choose the narrowest
syntax reference needed for the user's request.

## Quick Start

```shell
npx skills add TheDragonSkills/jira-markup
```

After installation, ask your agent to format content for Jira. For example:

```text
Format this incident summary as a Jira comment with headings, a status table, and a code block for the log excerpt.
```

## Documentation

| Skill                                                                                  | Syntax reference                                                            | Use it for                                                                          |
|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| [`jira-markup-text-formatting`](skills/jira-markup-text-formatting/SKILL.md)           | [`SYNTAX.md`](skills/jira-markup-text-formatting/references/SYNTAX.md)      | Inline emphasis, headings, quotes, colors, escapes, icons, and line breaks.         |
| [`jira-markup-structure-formatting`](skills/jira-markup-structure-formatting/SKILL.md) | [`SYNTAX.md`](skills/jira-markup-structure-formatting/references/SYNTAX.md) | Bulleted lists, numbered lists, nested lists, and Jira tables.                      |
| [`jira-markup-linking-media`](skills/jira-markup-linking-media/SKILL.md)               | [`SYNTAX.md`](skills/jira-markup-linking-media/references/SYNTAX.md)        | Links, anchors, user references, images, attachments, and media embeds.             |
| [`jira-markup-code-panels`](skills/jira-markup-code-panels/SKILL.md)                   | [`SYNTAX.md`](skills/jira-markup-code-panels/references/SYNTAX.md)          | `{code}`, `{noformat}`, and `{panel}` blocks for code, logs, configs, and callouts. |

Each skill includes:

- `SKILL.md` with usage rules and quality checks.
- `references/SYNTAX.md` with Jira wiki syntax notes.
- `examples/REQUESTS.md` with practical request patterns.

## Example Output

```text
h2. Incident Summary

*Status:* {color:red}Blocked{color}
*Owner:* {{platform-team}}

||Check||Result||
|API health|Passing|
|Export job|Failing|

{code:language=text|title=Latest error}
Export failed: missing customer_id
{code}
```

## Repository Layout

```text
skills/
  jira-markup-code-panels/
  jira-markup-linking-media/
  jira-markup-structure-formatting/
  jira-markup-text-formatting/
source/
  *.html
bin/
  make.sh
  make.ps1
```

The `source/` directory stores the downloaded Jira wiki renderer help pages used as source material. The `bin/make.sh`
and `bin/make.ps1` scripts refresh those pages and run the distillation workflow that regenerates the skill packages.

## Development

Refresh the source pages and regenerate skills from macOS/Linux:

```shell
./bin/make.sh
```

Refresh from Windows PowerShell:

```powershell
./bin/make.ps1
```

The build scripts download Jira renderer help sections, remove a noisy Statsig metadata tag, and invoke the AI Factory
distillation flow:

```text
codex "$aif-distillation source --split --path skills --redact-source-map --name jira-markup"
```

## Good Fit

Use these skills when you need Jira wiki markup that is:

- ready to paste into Jira-rendered fields;
- structured enough for issue descriptions, comments, incident updates, or release notes;
- careful about Jira-specific macro syntax and escaping rules;
- readable as plain text before Jira renders it.

## License

This package is licensed under the [MIT License](LICENSE.md).
