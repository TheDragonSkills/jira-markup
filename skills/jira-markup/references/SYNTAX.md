# Jira Markup Syntax

Use this reference when selecting exact Jira wiki notation. Prefer readable markup that remains understandable before rendering.

## Inline Text

| Goal | Markup | Use when |
|---|---|---|
| Strong emphasis | `*text*` | A short phrase needs high emphasis. |
| Emphasis | `_text_` | A short phrase needs light emphasis. |
| Citation | `??text??` | A term should appear as a citation. |
| Strikethrough | `-text-` | Showing removed or obsolete text. |
| Inserted text | `+text+` | Showing added text in a change note. |
| Superscript | `^text^` | Footnotes, exponents, or compact markers. |
| Subscript | `~text~` | Chemical formulas or compact labels. |
| Monospace | `{{text}}` | Inline code, field names, IDs, routes, literals. |

Keep inline marks tight around the target text. Do not wrap full paragraphs in inline delimiters.

## Headings And Breaks

Use `h1.` through `h6.` at the start of a line:

```text
h2. Summary
h3. Impact
h4. Follow-up
```

Use lower-level headings for comments and issue descriptions. Reserve `h1.` for document-level titles.

| Goal | Markup | Rule |
|---|---|---|
| New paragraph | blank line | Preferred for normal prose. |
| Forced line break | `\\` | Use only when Jira would otherwise join lines incorrectly. |
| Horizontal rule | `----` | Separate major sections. |
| Em dash symbol | `---` | Use only when the rendered symbol is desired. |
| En dash symbol | `--` | Use only when the rendered symbol is desired. |

## Quotes And Color

Use `bq. ` for one quoted paragraph:

```text
bq. Customer reports that exports fail after the configuration change.
```

Use `{quote}` for multi-paragraph quoted text:

```text
{quote}
First quoted paragraph.

Second quoted paragraph.
{quote}
```

Use `{color:name-or-hex}` only for short visual emphasis:

```text
{color:red}Blocked until access is restored.{color}
```

Prefer plain status words over color when the content must remain accessible or portable.

## Lists

Use `*` at the start of a line for standard bullets. Add more `*` markers for deeper nesting:

```text
* First item
* Second item
** Nested detail
** Another nested detail
* Third item
```

Use `-` at the start of a line for an alternate bullet style:

```text
- Alpha
- Beta
- Gamma
```

Use `#` for ordered steps:

```text
# Open the issue
# Confirm the affected account
# Attach the export log
```

Use contiguous marker sequences for nesting and mixed list types:

```text
# Validate the report
# Document exceptions
#* Missing customer ID
#* Blank amount field
# Submit for approval
```

```text
* Release tasks
*# Run smoke tests
*# Update the Jira ticket
* Follow-up tasks
```

List markers must start in column 1. Leading spaces can make Jira render the line as plain text.

## Tables

Use double bars for header cells and single bars for data cells:

```text
||Field||Current||Expected||
|Status|Open|In Progress|
|Owner|Unassigned|Data team|
```

Rules:

- Every row should have the same number of cells.
- Use concise cell text; long paragraphs are harder to scan in Jira tables.
- Avoid raw `|` inside cells. Reword, escape, or move complex content below the table.
- Use a table for side-by-side comparison; use a list for sequence or hierarchy.

## Links And Anchors

| Target | Markup | Notes |
|---|---|---|
| Current anchor | `[#anchor-name]` | Link to an anchor in the same rendered field or page. |
| Attachment | `[^file.ext]` | Link to an attached file. |
| Anchor definition | `{anchor:anchor-name}` | Place at the destination point. |
| Page by title | `[Page Title]` | Links to the named page in the associated context. |
| Page in a space | `[SPACE:Page Title]` | Use for a page outside the current associated space. |
| User profile | `[~accountid:abc-123]` | Use an account ID when Jira requires it. |
| External URL | `[https://example.test/runbook]` | Brackets avoid ambiguity around punctuation. |
| Aliased URL | `[Runbook|https://example.test/runbook]` | Alias first, target second. |
| Email | `[mailto:support@example.test]` | Creates a mail link. |
| Local file | `[file:///c:/temp/report.txt]` | Browser-dependent; prefer attachments. |

When punctuation follows an external URL, put the URL in brackets or add whitespace so punctuation is not parsed as part of the target.

## Images And Media

Embed remote or attached images with exclamation marks:

```text
!https://example.test/chart.png!
!error-screenshot.png!
```

Use thumbnails for attached images:

```text
!error-screenshot.png|thumbnail!
```

Add image attributes as comma-separated `name=value` pairs:

```text
!diagram.png|align=right, vspace=4!
```

Embed supported media attachments with optional properties:

```text
!demo.mov!
!SPACE:Release Notes^demo.mov!
!demo.mov|width=640,height=360!
!walkthrough.wmv|id=walkthrough!
```

Common media properties are `width`, `height`, and `id`. Prefer attached media for embeds; remote media can be blocked for security.

## Code, Noformat, And Panels

Use `{noformat}` for logs, stack traces, and literal text:

```text
{noformat}
ERROR export failed for account=42
payload contains *literal* asterisks
{noformat}
```

Use `{code}` for source code or structured configuration:

```text
{code:json}
{
  "status": "failed",
  "retryable": true
}
{code}
```

Without a language parameter, Jira commonly treats code as Java. Common language identifiers include `bash`, `c`, `c#`, `c++`, `css`, `go`, `groovy`, `html`, `java`, `javascript`, `json`, `perl`, `php`, `python`, `ruby`, `scala`, `sql`, `swift`, `xml`, and `yaml`.

Use `{panel}` for callouts that may still contain Jira formatting:

```text
{panel:title=Rollback Plan}
Disable the feature flag and restart the worker.
{panel}
```

Common panel parameters include `title`, `borderStyle`, `borderColor`, `borderWidth`, `bgColor`, and `titleBGColor`. Use styled panels sparingly.

## Escapes And Icons

Prefix a special character with a backslash when it must render literally:

```text
\*not bold\*
\{not-a-macro\}
```

Escape single curly braces inside `{{monospace}}` spans when the braces are literal route, placeholder, or template text:

```text
{{GET /api/users/\{user\}/show}}
\{user\}
```

Common icon notations include `:)`, `:(`, `:P`, `:D`, `;)`, `(y)`, `(n)`, `(i)`, `(/)`, `(x)`, `(!)`, `(+)`, `(-)`, `(?)`, `(on)`, `(off)`, `(*)`, `(*r)`, `(*g)`, `(*b)`, `(*y)`, `(flag)`, and `(flagoff)`.

Use icons sparingly in operational comments. Prefer words for important states because icon rendering can vary.
