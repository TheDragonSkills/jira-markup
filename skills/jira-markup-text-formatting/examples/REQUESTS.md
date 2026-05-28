# Text Formatting Examples

## Turn Plain Notes Into A Jira Comment

Request:

```text
Format this for Jira:
Summary: export failed for 12 accounts
Impact: Finance cannot close the report
Next: retry after the credentials are rotated
```

Output:

```text
h3. Summary
Export failed for *12 accounts*.

h3. Impact
Finance cannot close the report.

h3. Next
Retry after the credentials are rotated.
```

## Preserve Literal Markup Characters

Request:

```text
Make Jira show "*required*" literally, not as bold.
```

Output:

```text
\*required\*
```

## Keep Path Parameters Inside Monospace Text

Request:

```text
Format this Jira bullet without breaking the inline code:
Check GET /api/users/{user}/show for the selected user.
```

Output:

```text
* Check {{GET /api/users/\{user\}/show}} for the selected user.
```

## Quote A Customer Message

Request:

```text
Format this quote: We can reproduce this only when the CSV contains blank rows.
```

Output:

```text
bq. We can reproduce this only when the CSV contains blank rows.
```

## Add A Short Warning

Request:

```text
Make "Do not rerun the import" stand out in Jira.
```

Output:

```text
{color:red}Do not rerun the import.{color}
```

Note: use color only when the target Jira renderer supports it and the warning remains understandable without color.
