# Jira Markup Request Examples

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

## Convert Tasks To A Nested List

Request:

```text
Make this Jira-ready:
- confirm owner
- check logs
  - API
  - worker
- update customer
```

Output:

```text
* Confirm owner
* Check logs
** API
** Worker
* Update customer
```

## Convert Steps With Nested Exceptions

Request:

```text
Format as numbered steps with exceptions:
1. Validate import
2. Capture invalid rows: missing email, duplicate account
3. Retry
```

Output:

```text
# Validate import
# Capture invalid rows
#* Missing email
#* Duplicate account
# Retry
```

## Create A Comparison Table

Request:

```text
Make a Jira table:
Field, Current, Expected
Priority, Medium, High
Owner, None, Billing team
```

Output:

```text
||Field||Current||Expected||
|Priority|Medium|High|
|Owner|None|Billing team|
```

## Repair A Broken Table Cell

Request:

```text
This row breaks because of the "A | B" value. Fix it for Jira.
```

Output:

```text
||Input||Reason||
|A or B|Pipe characters inside cells can be parsed as column separators.|
```

## Create A Runbook Link

Request:

```text
Link the words "Import runbook" to https://example.test/imports/runbook
```

Output:

```text
[Import runbook|https://example.test/imports/runbook]
```

## Link To An Attachment And Anchor

Request:

```text
Add an anchor named logs and link to the attached file worker.log.
```

Output:

```text
{anchor:logs}
h3. Logs

See [^worker.log] for the full worker trace.
```

## Embed An Attached Screenshot

Request:

```text
Show screenshot.png as a thumbnail in Jira.
```

Output:

```text
!screenshot.png|thumbnail!
```

## Link To A Downloadable Attachment

Request:

```text
Create a Jira link to the attached spreadsheet reconciliation.xlsx.
```

Output:

```text
[^reconciliation.xlsx]
```

## Embed A Sized Video Attachment

Request:

```text
Embed demo.mov at 640 by 360.
```

Output:

```text
!demo.mov|width=640,height=360!
```

Note: use an attached media file for embeds; remote media may be blocked by Jira security settings.

## Add Image Attributes

Request:

```text
Place diagram.png on the right with four pixels of vertical spacing.
```

Output:

```text
!diagram.png|align=right, vspace=4!
```

## Preserve A Log Snippet

Request:

```text
Put this in Jira without interpreting the asterisks:
ERROR retry *disabled* for account=42
```

Output:

```text
{noformat}
ERROR retry *disabled* for account=42
{noformat}
```

## Format JSON With Highlighting

Request:

```text
Format this JSON for Jira:
{"status":"failed","retryable":true}
```

Output:

```text
{code:json}
{"status":"failed","retryable":true}
{code}
```

## Format Code With A Title

Request:

```text
Put this JSON in Jira with the title payload.json:
{"status":"failed"}
```

Output:

```text
{code:language=json|title=payload.json}
{"status":"failed"}
{code}
```

## Add A Titled Panel

Request:

```text
Make a Jira panel titled Rollback Plan with "Disable the import flag and restart the worker."
```

Output:

```text
{panel:title=Rollback Plan}
Disable the import flag and restart the worker.
{panel}
```

## Add A Styled Panel

Request:

```text
Create a Jira warning panel titled Access Risk with a pale yellow background:
The shared token expires today.
```

Output:

```text
{panel:title=Access Risk|bgColor=#FFFFCE}
The shared token expires today.
{panel}
```

## Repair A Broken Code Macro

Request:

```text
Fix this Jira code block:
{code:sql}
select * from invoices
```

Output:

```text
{code:sql}
select * from invoices
{code}
```
