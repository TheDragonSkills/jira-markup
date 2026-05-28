# Jira Linking And Media Syntax

## Internal Links

| Target | Markup | Notes |
|---|---|---|
| Current-page anchor | `[#anchor-name]` | Link to an anchor in the same rendered field or page. |
| Attachment on current issue/page | `[^file.ext]` | Link to an attached file. |
| Anchor definition | `{anchor:anchor-name}` | Place this at the destination point. |
| Page by title | `[Page Title]` | Links to the named page in the associated space/context. |
| Page in a space | `[SPACE:Page Title]` | Use when the page is outside the current associated space. |
| User profile | `[~accountid:abc-123]` | Use a real account ID, not display name, when account IDs are required. |

Example:

```text
{anchor:validation-errors}
h3. Validation Errors

See [#validation-errors] after reviewing [^import-log.txt].
```

## External Links

Use brackets for aliases or when punctuation follows the URL:

```text
[https://example.test/runbook]
[Runbook|https://example.test/runbook]
```

When no alias is needed, some renderers link bare URLs automatically, but bracketed markup is less ambiguous.

Email links:

```text
[mailto:support@example.test]
```

Local or network file links:

```text
[file:///c:/temp/report.txt]
[file:///z:/shared/report.txt]
```

Local file links can be browser-dependent and may require users to save or open them manually. Prefer attachments when possible.

## Images

Embed a remote image or attached image:

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

Keep attributes minimal. Over-specified dimensions can make comments hard to read on narrow screens.

## Media Attachments

Embed supported media attachments with optional properties:

```text
!demo.mov!
!SPACE:Release Notes^demo.mov!
!demo.mov|width=640,height=360!
!walkthrough.wmv|id=walkthrough!
```

Common properties:

- `width`: rendered media width
- `height`: rendered media height
- `id`: rendered object identifier for styling

Default media support commonly includes formats such as Flash, QuickTime, Windows Media, Real Media, and MP3. Remote media files may be blocked for security, so prefer attached media when embedding.

## Repair Checklist

- If a link alias renders incorrectly, check the `alias|target` order.
- If an attachment link fails, confirm the file is attached and the extension matches.
- If an image does not render, confirm whether the target is remote or attached and whether permissions allow access.
- If media fails to embed, convert the reference to an attachment link or provide a normal external link.
