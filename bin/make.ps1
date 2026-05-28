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
        Remove-StatsigMetaTag -Path $_.FullName
    }
    
    codex '$aif-distillation source --path skills --redact-source-map --name jira-markup'
}
finally {
    Pop-Location
}
