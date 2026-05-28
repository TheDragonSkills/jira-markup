Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$scriptDirectory = Split-Path -Parent $PSCommandPath
$repositoryRoot = Split-Path -Parent $scriptDirectory

Push-Location -LiteralPath $repositoryRoot
try {
    curl -o source/help_page.html https://ouryahoo.atlassian.net/secure/WikiRendererHelpAction.jspa?section=all
    codex '$aif-distillation source --split --path skills --redact-source-map --name jira-markup'
}
finally {
    Pop-Location
}
