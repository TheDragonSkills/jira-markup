# Jira Code And Panel Syntax

## Choose The Right Block

| Content | Preferred Markup | Why |
|---|---|---|
| Logs, stack traces, literal text | `{noformat}` | Preserves text and prevents wiki formatting. |
| Source code or configuration | `{code}` | Preserves text and can syntax-highlight. |
| Callout text or grouped notes | `{panel}` | Provides a visible container and can render wiki formatting inside. |

## Noformat Blocks

Use `{noformat}` when symbols such as `*`, `_`, `{}`, or `|` must remain literal:

```text
{noformat}
ERROR export failed for account=42
payload contains *literal* asterisks
{noformat}
```

Panel-style parameters may be accepted by some renderers:

```text
{noformat:title=Raw payload}
{"status":"failed","retry":false}
{noformat}
```

Use `nopanel` when the renderer supports it and you need plain preformatted text without the surrounding panel chrome:

```text
{noformat:nopanel=true}
raw text only
{noformat}
```

## Panels

Basic panel:

```text
{panel}
This note can contain *Jira formatting*.
{panel}
```

Titled panel:

```text
{panel:title=Rollback Plan}
Revert the feature flag and restart the worker.
{panel}
```

Styled panel:

```text
{panel:title=Customer Impact|borderStyle=solid|borderColor=#cccccc|titleBGColor=#f7d6c1|bgColor=#ffffce}
Exports are delayed for the billing team.
{panel}
```

Common parameters:

- `title`: panel title
- `borderStyle`: CSS border style such as `solid` or `dashed`
- `borderColor`: border color
- `borderWidth`: border width
- `bgColor`: body background color
- `titleBGColor`: title background color

Use styled panels sparingly. A title alone is usually enough.

## Code Blocks

Use `{code}` for code and structured config:

```text
{code:title=worker.js|borderStyle=solid}
async function runJob(job) {
  return queue.process(job);
}
{code}
```

Without a language parameter, Jira commonly treats code blocks as Java.

Specify a language when highlighting matters:

```text
{code:json}
{
  "status": "failed",
  "retryable": true
}
{code}
```

Language identifiers commonly include `actionscript`, `ada`, `applescript`, `bash`, `c`, `c#`, `c++`, `css`, `erlang`, `go`, `groovy`, `haskell`, `html`, `java`, `javascript`, `json`, `lua`, `objc`, `perl`, `php`, `python`, `r`, `ruby`, `scala`, `sql`, `swift`, `visualbasic`, `xml`, and `yaml`. If unsure, use `{code}` without a language or use `{noformat}` for logs.

## Repair Checklist

- If formatting leaks after a block, add the missing closing macro.
- If markup inside a block is rendering unexpectedly, switch from `{panel}` to `{noformat}` or `{code}`.
- If highlighting is wrong, change the language identifier or omit it.
- If a block contains a literal closing macro string, warn the user because Jira may close the block early.
