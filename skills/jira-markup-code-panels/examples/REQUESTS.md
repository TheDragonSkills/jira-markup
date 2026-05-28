# Code And Panel Examples

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
