param(
  [string]$NodePath = "",
  [int]$MaxFallbackExamplesPerLevel = 300,
  [int]$ExpectedEnglishWordsPerLevel = 1000
)

$ErrorActionPreference = "Stop"

if (-not $NodePath) {
  $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
  if (-not $nodeCommand) {
    throw "Node.js was not found. Pass -NodePath to the bundled node.exe path."
  }
  $NodePath = $nodeCommand.Source
}

$script = @'
const fs = require("fs");
const vm = require("vm");

const maxFallback = Number(process.argv[2] || 300);
const expectedPerLevel = Number(process.argv[3] || 1000);
const code = fs.readFileSync("study/word-bank.js", "utf8");
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox, { filename: "study/word-bank.js" });

const words = sandbox.window.STUDY_WORD_BANK || [];
const english = words.filter((word) => word.type === "english");
const levels = ["elementary", "middle", "high"];
let failed = false;

for (const level of levels) {
  const rows = english.filter((word) => word.level === level);
  const normalized = rows.map((word) => String(word.word || "").toLowerCase());
  const duplicates = normalized.filter((word, index) => normalized.indexOf(word) !== index);
  const nonSingle = rows.filter((word) => !/^[a-z]{2,24}$/i.test(String(word.word || "")));
  const missingMeaning = rows.filter((word) => !word.meaning);
  const missingExample = rows.filter((word) => !word.example || !word.exampleKo);
  const fallbackExamples = rows.filter((word) => String(word.example || "").startsWith("I study the word"));

  console.log(`${level}: ${rows.length} words, duplicates ${new Set(duplicates).size}, nonSingle ${nonSingle.length}, missingMeaning ${missingMeaning.length}, missingExample ${missingExample.length}, fallbackExamples ${fallbackExamples.length}`);

  if (rows.length !== expectedPerLevel || duplicates.length || nonSingle.length || missingMeaning.length || missingExample.length || fallbackExamples.length > maxFallback) {
    failed = true;
  }
}

const allKeys = english.map((word) => String(word.word || "").toLowerCase());
const crossLevelDuplicates = allKeys.filter((word, index) => allKeys.indexOf(word) !== index);
const duplicateSet = new Set(crossLevelDuplicates);
console.log(`english total: ${english.length}, cross-level duplicate words: ${duplicateSet.size}`);

if (duplicateSet.size) {
  console.log(`duplicate words: ${Array.from(duplicateSet).sort().join(", ")}`);
  failed = true;
}

if (failed) {
  process.exitCode = 1;
}
'@

$tempScript = Join-Path $env:TEMP "validate-study-word-bank.js"
Set-Content -Encoding UTF8 -Path $tempScript -Value $script
& $NodePath $tempScript $MaxFallbackExamplesPerLevel $ExpectedEnglishWordsPerLevel
