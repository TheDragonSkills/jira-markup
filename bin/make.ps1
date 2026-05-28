Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$scriptDirectory = Split-Path -Parent $PSCommandPath
$repositoryRoot = Split-Path -Parent $scriptDirectory

function Remove-StatsigMetaTag {
    param (
        [Parameter(Mandatory = $true)]
        [string] $Path
    )

    $content = Get-Content -LiteralPath $Path -Raw
    $content = $content -replace '<meta\s+[^>]*name="ajs-fe-statsig-values"[^>]*>\r?\n?', ''

    $utf8WithoutBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($Path, $content, $utf8WithoutBom)
}

Push-Location -LiteralPath $repositoryRoot
try {
    curl -o source/texteffects.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=texteffects
    curl -o source/headings.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=headings
    curl -o source/breaks.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=breaks
    curl -o source/links.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=links
    curl -o source/lists.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=lists
    curl -o source/images.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=images
    curl -o source/attachments.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=attachments
    curl -o source/tables.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=tables
    curl -o source/advanced.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=advanced
    curl -o source/miscellaneous.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=miscellaneous

    Get-ChildItem -LiteralPath source -Filter *.html | ForEach-Object {
        Remove-StatsigMetaTag -Path $_.FullName
    }
    
    codex '$aif-distillation source --split --path skills --redact-source-map --name jira-markup'
}
finally {
    Pop-Location
}
