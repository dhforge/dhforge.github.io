param(
  [string]$CandidatePath = "study/data/english-source-candidates.csv",
  [string]$OutputPath = "study/data/wiktionary-korean-translations.csv",
  [int]$LimitPerLevel = 500
)

$ErrorActionPreference = "Stop"

function ConvertTo-Title([string]$word) {
  return [uri]::EscapeDataString($word)
}

function Get-KoreanTranslation([string]$content) {
  if (-not $content) { return $null }
  $matches = [regex]::Matches($content, "\* Korean:\s*(.+)")
  foreach ($match in $matches) {
    $line = $match.Groups[1].Value
    $template = [regex]::Match($line, "\{\{(?:tt\+?|t\+?|t-check)\|ko\|([^|}]+)")
    if ($template.Success) {
      $value = $template.Groups[1].Value.Trim()
      if ($value -match "^[\p{IsHangulSyllables}][\p{IsHangulSyllables}\s,./-]{0,30}$") { return $value }
    }
  }
  return $null
}

$candidates = Import-Csv $CandidatePath |
  Where-Object { $_.word -match "^[a-z]{2,24}$" } |
  Sort-Object @{ Expression = "level"; Ascending = $true }, @{ Expression = { [int]$_.source_rank }; Ascending = $true }

$selected = @()
foreach ($level in @("elementary", "middle", "high")) {
  $selected += $candidates | Where-Object { $_.level -eq $level } | Select-Object -First $LimitPerLevel
}

$rows = New-Object System.Collections.Generic.List[object]
for ($i = 0; $i -lt $selected.Count; $i += 50) {
  $batch = $selected[$i..([Math]::Min($i + 49, $selected.Count - 1))]
  $titles = ($batch | ForEach-Object { ConvertTo-Title $_.word }) -join "%7C"
  $url = "https://en.wiktionary.org/w/api.php?action=query&prop=revisions&titles=$titles&rvslots=main&rvprop=content&format=json"
  $json = Invoke-RestMethod -Uri $url -Headers @{ "User-Agent" = "dhforge-study-vocab/1.0 (https://dhforge.github.io/study/)" }
  foreach ($page in $json.query.pages.PSObject.Properties.Value) {
    if (-not $page.title -or $page.missing) { continue }
    $content = $page.revisions[0].slots.main.'*'
    $ko = Get-KoreanTranslation $content
    if (-not $ko) { continue }
    $candidate = $batch | Where-Object { $_.word -eq $page.title.ToLowerInvariant() } | Select-Object -First 1
    if (-not $candidate) { continue }
    $rows.Add([pscustomobject]@{
      level = $candidate.level
      word = $candidate.word
      meaning = $ko
      source_rank = $candidate.source_rank
      source = "English Wiktionary Korean translation"
      source_url = "https://en.wiktionary.org/wiki/$($candidate.word)"
    })
  }
  Start-Sleep -Milliseconds 250
}

$outFile = Join-Path (Get-Location) $OutputPath
$outDir = Split-Path -Parent $outFile
if (-not (Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir | Out-Null
}

$rows |
  Sort-Object @{ Expression = "level"; Ascending = $true }, @{ Expression = { [int]$_.source_rank }; Ascending = $true }, @{ Expression = "word"; Ascending = $true } |
  Export-Csv -NoTypeInformation -Encoding UTF8 -Path $outFile

$summary = $rows | Group-Object level | Sort-Object Name | ForEach-Object { "$($_.Name): $($_.Count)" }
Write-Host "Wrote $($rows.Count) Wiktionary Korean translation rows to $OutputPath"
Write-Host ($summary -join ", ")
