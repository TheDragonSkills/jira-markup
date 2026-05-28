# Linking And Media Examples

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
