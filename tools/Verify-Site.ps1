param(
  [string]$BaseUrl = "http://127.0.0.1:8000"
)

$ErrorActionPreference = "Stop"

$Checks = @(
  @{ Path = "/"; Text = "Free Toolbox" },
  @{ Path = "/en/"; Text = "Free Toolbox" },
  @{ Path = "/about.html"; Text = "About DH Forge" },
  @{ Path = "/paper/"; Text = "Printable Paper Lab" },
  @{ Path = "/paper/ko/"; Text = "Printable Paper Generator" },
  @{ Path = "/paper/ko/graph-paper/"; Text = "paper-ko-20260621" },
  @{ Path = "/paper/ko/guides/graph-paper.html"; Text = "Guide" },
  @{ Path = "/paper/ko/guides/dot-grid-paper.html"; Text = "Guide" },
  @{ Path = "/paper/ko/guides/checklist.html"; Text = "Guide" },
  @{ Path = "/paper/ko/guides/habit-tracker.html"; Text = "Guide" },
  @{ Path = "/kids/"; Text = "Kids Practice Lab" },
  @{ Path = "/kids/en/"; Text = "Kids Practice Lab" },
  @{ Path = "/paper/sitemap.xml"; Text = "hreflang" },
  @{ Path = "/kids/sitemap.xml"; Text = "hreflang" },
  @{ Path = "/sitemap-index.xml"; Text = "sitemapindex" },
  @{ Path = "/site.webmanifest"; Text = "DH Forge Free Tools" },
  @{ Path = "/opensearch.xml"; Text = "OpenSearchDescription" },
  @{ Path = "/llms.txt"; Text = "DH Forge" },
  @{ Path = "/humans.txt"; Text = "DH Forge" },
  @{ Path = "/assets/icon-192.png"; Text = "" },
  @{ Path = "/assets/icon-512.png"; Text = "" },
  @{ Path = "/assets/apple-touch-icon.png"; Text = "" },
  @{ Path = "/assets/og-toolbox.png"; Text = "" },
  @{ Path = "/assets/og-paper.png"; Text = "" },
  @{ Path = "/assets/og-kids.png"; Text = "" }
)

foreach ($Check in $Checks) {
  $Uri = $BaseUrl.TrimEnd("/") + $Check.Path
  $Response = Invoke-WebRequest -UseBasicParsing -Uri $Uri
  if ($Response.StatusCode -ne 200) {
    throw "$Uri returned HTTP $($Response.StatusCode)"
  }
  $Response.RawContentStream.Position = 0
  $Bytes = New-Object byte[] $Response.RawContentStream.Length
  [void]$Response.RawContentStream.Read($Bytes, 0, $Bytes.Length)
  $Text = [System.Text.Encoding]::UTF8.GetString($Bytes)
  if ($Check.Text -and -not $Text.Contains($Check.Text)) {
    throw "$Uri did not include expected text: $($Check.Text)"
  }
  Write-Output "OK $($Check.Path)"
}

Write-Output "Site verification passed."
