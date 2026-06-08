# Jira Markup Workflow

Use this reference to decide what markup to apply, how much to apply, and how to repair common rendering problems.

## Selection Rules

| Input pattern | Preferred output |
|---|---|
| Short prose with sections | `h3.` or `h4.` headings plus blank-line paragraphs |
| A critical word or phrase | Inline `*strong*`, `_emphasis_`, or `{{monospace}}` |
| Literal symbols or raw output | `{noformat}` |
| Source code or structured config | `{code}` with a language when useful |
| Callout, note, warning, or summary box | `{panel}` |
| Ordered procedure | `#` list |
| Unordered checklist or facts | `*` list |
| Nested exceptions under a step | Mixed markers such as `#*` |
| Side-by-side fields or comparisons | Table with `||header||` row |
| Long URL with friendly text | `[Alias|target]` |
| Attached screenshot | `!file.png|thumbnail!` unless full size is requested |
| Downloadable attachment | `[^file.ext]` |
| Attached media playback | `!file.mov|width=640,height=360!` when the format is supported |
| Local or network file path | Bracketed `file:///...` link plus a warning |

## Mixed Content Procedure

1. Split the input into sections before applying markup.
2. Format each section with the weakest sufficient construct.
3. Keep code/log/config blocks separate from prose so Jira does not interpret their symbols.
4. Put lists and tables outside `{panel}` unless the panel is explicitly requested as a callout container.
5. Choose attachment notation before media/image notation:
   - `[^file.ext]` for a clickable attachment link.
   - `!image.png!` or `!image.png|thumbnail!` for inline images.
   - `!demo.mov|width=640,height=360!` for supported attached media.
6. Add links after structure is stable so aliases and attachment names stay exact.
7. Escape literals last, after the surrounding structure is chosen.

## Escaping Rules

Escape when the user wants syntax characters to appear literally:

- `\*literal asterisks\*`
- `\_literal underscores\_`
- `\{literal braces\}`
- `\|` only when the renderer supports it; otherwise reword or move pipe-heavy content out of tables

For inline monospace text that contains single braces, escape only the single braces while preserving the double braces that start and end the monospace span:

```text
{{GET /api/users/\{user\}/show}}
```

If content contains a literal closing macro such as `{code}` inside a code block, warn the user that Jira may close the block early. Prefer `{noformat}` or split the block if the renderer cannot escape the macro safely.

When macro parameters are needed, use the correct separator:

- `{panel:title=Note|bgColor=#FFFFCE}` uses `|` between macro parameters.
- `!image.png|align=right, vspace=4!` uses commas inside the image attribute list.
- `!demo.mov|width=640,height=360!` uses commas inside the media attribute list.

## Repair Checklist

Use these checks before returning the final block:

- Inline delimiters are paired and tight around the target text.
- Block macros have exactly one opening and one closing tag.
- Blank lines separate paragraphs; `\\` is used only for forced line breaks.
- List markers start in column 1 with no leading spaces.
- Nested list markers are contiguous, such as `**`, `##`, `#*`, or `*#`.
- Table rows start and end with the correct bars.
- Every table row has the same number of cells.
- Cell text does not contain unhandled raw pipe characters.
- Link aliases use `[alias|target]`, not `[target|alias]`.
- Attachment links use `[^file.ext]`; images and media use `!file.ext!` forms.
- Remote images and remote links are distinct from embedded media; remote media is not presented as guaranteed to embed.
- Local file links are called out as browser-dependent.
- Curly braces inside `{{monospace}}` route or placeholder text are escaped.
- Code, panel, noformat, image, and media parameter separators match Jira notation.

## Output Pattern

Return the Jira-ready result first:

```text
<paste-ready Jira markup>
```

Then add a short note only when useful:

- Mention assumptions about headings, nesting, or table headers.
- Mention renderer risks for local files, remote media, icons, or color.
- Mention escaping decisions when they are likely to surprise the user.

Do not explain every syntax choice for routine formatting.

## Failure Modes

| Symptom | Likely cause | Fix |
|---|---|---|
| Bullets render as plain text | Leading spaces before markers | Move markers to column 1. |
| Nested lists render flat | Spaces or wrong marker sequence | Use contiguous repeated or mixed markers. |
| Table columns shift | Extra raw `|` inside a cell | Reword, escape if supported, or move detail below. |
| Code formatting leaks into following text | Missing closing macro | Add the matching closing tag. |
| Inline route breaks around `{id}` | Single braces parsed as macro-like text | Escape braces inside `{{monospace}}`. |
| Link alias points to wrong target | Alias and URL reversed | Use `[alias|target]`. |
| Image does not render | Missing attachment, permissions, or unsupported target | Verify attachment or use a normal link. |
| Media embed fails | Remote media blocked or unsupported format | Attach the file or link to it instead. |
| Attachment opens inline when a download link was expected | Used image/media notation for a normal file | Use `[^file.ext]`. |
| Styled macro parameters are ignored | Wrong separator or unsupported renderer parameter | Use `|` between macro parameters and keep styling optional. |
