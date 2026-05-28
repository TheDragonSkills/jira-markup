# Jira Text Formatting Syntax

## Inline Effects

| Goal | Markup | Use When |
|---|---|---|
| Strong emphasis | `*text*` | A short phrase needs high emphasis. |
| Emphasis | `_text_` | A short phrase needs light emphasis. |
| Citation style | `??text??` | Naming a cited term or quoted source label. |
| Strikethrough | `-text-` | Showing removed or obsolete text. |
| Inserted text | `+text+` | Showing added text in a change note. |
| Superscript | `^text^` | Footnote-like markers or exponent notation. |
| Subscript | `~text~` | Chemical formulas or compact labels. |
| Monospace | `{{text}}` | Inline code, keys, field names, IDs, or literals. |

Keep inline marks tight around the target text. Avoid wrapping long paragraphs in inline emphasis.

## Headings

Use `h1.` through `h6.` at the start of a line:

```text
h2. Summary
h3. Impact
h4. Follow-up
```

Use lower-level headings for comments and issue descriptions. Reserve `h1.` for document-level titles.

## Paragraphs And Breaks

| Goal | Markup | Rule |
|---|---|---|
| New paragraph | blank line | Preferred for normal prose. |
| Forced line break | `\\` | Use only where the renderer would otherwise join lines incorrectly. |
| Horizontal rule | `----` | Use to separate major sections. |
| Em dash | `---` | Use only when the rendered dash symbol is desired. |
| En dash | `--` | Use only when the rendered dash symbol is desired. |

## Quotes And Color

Use `bq. ` for a single quoted paragraph:

```text
bq. Customer reports that exports fail after the latest configuration change.
```

Use `{quote}` for multi-paragraph quoted material:

```text
{quote}
First quoted paragraph.

Second quoted paragraph.
{quote}
```

Use `{color:name-or-hex}` only for short visual warnings or status highlights:

```text
{color:red}Blocked until access is restored.{color}
```

Prefer plain status words over color when the text must be accessible or copied into systems that may strip styling.

## Escapes And Icons

Prefix a special character with a backslash when it must render literally:

```text
\*not bold\*
\{not-a-macro\}
```

Common icon notations include `:)`, `:(`, `:P`, `:D`, `;)`, `(y)`, `(n)`, `(i)`, `(/)`, `(x)`, `(!)`, `(+)`, `(-)`, `(?)`, `(on)`, `(off)`, `(*)`, `(*r)`, `(*g)`, `(*b)`, `(*y)`, `(flag)`, and `(flagoff)`.

Use icons sparingly in operational comments. Prefer words for important states because icon rendering can vary.
