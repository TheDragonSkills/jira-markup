# Jira Structure Formatting Syntax

## Bulleted Lists

Use `*` at the start of a line for standard bullets. Add more `*` markers for deeper nesting.

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

Prefer `*` for normal Jira comments because it is the most recognizable convention.

## Numbered Lists

Use `#` at the start of a line for ordered steps:

```text
# Open the issue
# Confirm the affected account
# Attach the export log
```

Use repeated `#` markers for nested numbered lists:

```text
# Prepare the release
## Confirm migrations
## Confirm rollback notes
# Deploy
```

## Mixed Lists

Combine markers when a nested item changes type:

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

Keep each marker sequence at the start of the line. Leading spaces can break rendering.

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
- Use a table when users need side-by-side comparison. Use a list when the content is sequential or hierarchical.

## Repair Checklist

- If bullets render as plain text, remove leading spaces before markers.
- If table rows collapse, check every row starts and ends with `|` or `||`.
- If a column shifts, look for an extra pipe in cell content.
- If nested lists look flat, confirm the marker sequence repeats without spaces, such as `**` or `#*`.
