param(
  [string]$OutputPath = "study/data/english-source-candidates.csv"
)

$ErrorActionPreference = "Stop"

$sources = @(
  @{
    Name = "NDL 1.1"
    Level = "elementary"
    Url = "https://www.newgeneralservicelist.com/s/NDL_11_stats.csv"
    WordColumn = "Word"
    RankColumn = "Rank"
    SourcePage = "https://www.newgeneralservicelist.com/new-dolch-list"
  },
  @{
    Name = "NGSL 1.2"
    Level = "ranked"
    Url = "https://www.newgeneralservicelist.com/s/NGSL_12_stats.csv"
    WordColumn = "Lemma"
    RankColumn = "SFI Rank"
    SourcePage = "https://www.newgeneralservicelist.com/new-general-service-list"
  },
  @{
    Name = "NAWL 1.2"
    Level = "high"
    Url = "https://www.newgeneralservicelist.com/s/NAWL_12_stats.csv"
    WordColumn = "Word"
    RankColumn = "Rank"
    SourcePage = "https://www.newgeneralservicelist.com/new-academic-word-list"
  }
)

function Normalize-Word([string]$value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return $null }
  $word = $value.Trim().ToLowerInvariant()
  if ($word -notmatch "^[a-z]{2,24}$") { return $null }
  return $word
}

function Normalize-Rank([string]$value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return 999999 }
  $clean = $value.Trim().TrimEnd(".")
  $rank = 999999
  if ([int]::TryParse($clean, [ref]$rank)) { return $rank }
  return 999999
}

function Get-Level([string]$sourceLevel, [int]$rank) {
  if ($sourceLevel -ne "ranked") { return $sourceLevel }
  if ($rank -le 1000) { return "elementary" }
  if ($rank -le 2200) { return "middle" }
  return "high"
}

$rows = New-Object System.Collections.Generic.List[object]
$seen = @{}

foreach ($source in $sources) {
  $tempPath = Join-Path $env:TEMP ("study-vocab-" + ($source.Name -replace "[^a-zA-Z0-9]", "-") + ".csv")
  Invoke-WebRequest -UseBasicParsing -Uri $source.Url -OutFile $tempPath
  $items = Import-Csv $tempPath

  foreach ($item in $items) {
    $word = Normalize-Word $item.($source.WordColumn)
    if (-not $word) { continue }

    $rank = Normalize-Rank $item.($source.RankColumn)
    $level = Get-Level $source.Level $rank
    $key = "$level|$word"

    if ($seen.ContainsKey($key)) {
      $rows[$seen[$key]].sources = $rows[$seen[$key]].sources + ";" + $source.Name
      continue
    }

    $seen[$key] = $rows.Count
    $rows.Add([pscustomobject]@{
      level = $level
      word = $word
      source_rank = $rank
      sources = $source.Name
      source_page = $source.SourcePage
    })
  }
}

$outFile = Join-Path (Get-Location) $OutputPath
$outDir = Split-Path -Parent $outFile
if (-not (Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir | Out-Null
}

$rows |
  Sort-Object @{ Expression = "level"; Ascending = $true }, @{ Expression = "source_rank"; Ascending = $true }, @{ Expression = "word"; Ascending = $true } |
  Export-Csv -NoTypeInformation -Encoding UTF8 -Path $outFile

$summary = $rows | Group-Object level | Sort-Object Name | ForEach-Object { "$($_.Name): $($_.Count)" }
Write-Host "Wrote $($rows.Count) source-ranked candidate rows to $OutputPath"
Write-Host ($summary -join ", ")
