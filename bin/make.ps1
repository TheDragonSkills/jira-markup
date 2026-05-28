Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$scriptDirectory = Split-Path -Parent $PSCommandPath
$repositoryRoot = Split-Path -Parent $scriptDirectory

function Remove-UnwantedTags {
    param (
        [Parameter(Mandatory = $true)]
        [string] $Path
    )

    $content = Get-Content -LiteralPath $Path -Raw

    # Remove paired tags with their content: style, script, form
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '(?is)<(style|script|form)\b[^>]*>.*?</\1\s*>', '')
    # Remove void/self-closing tags: meta, link
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '(?is)<(meta|link)\b[^>]*/?>', '')
    # Remove HTML comments
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '(?s)<!--.*?-->', '')

    $utf8WithoutBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($Path, $content, $utf8WithoutBom)
}

Push-Location -LiteralPath $repositoryRoot
try {
    $sections = @(
        'texteffects',
        'headings',
        'breaks',
        'links',
        'lists',
        'images',
        'attachments',
        'tables',
        'advanced',
        'miscellaneous'
    )

    foreach ($section in $sections) {
        curl -o "source/$section.html" "https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=$section"
    }

    Get-ChildItem -LiteralPath source -Filter *.html | ForEach-Object {
        Remove-UnwantedTags -Path $_.FullName
    }
    
    codex '$aif-distillation source --path skills --redact-source-map --name jira-markup'
}
finally {
    Pop-Location
}
