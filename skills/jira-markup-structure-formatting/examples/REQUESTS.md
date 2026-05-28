# Structure Formatting Examples

## Convert Tasks To A Jira Checklist-Style List

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

## Repair A Broken Table

Request:

```text
This row breaks because of the "A | B" value. Fix it for Jira.
```

Output:

```text
||Input||Reason||
|A or B|Pipe characters inside cells can be parsed as column separators.|
```
