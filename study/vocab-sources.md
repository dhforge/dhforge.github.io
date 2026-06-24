# Study Vocabulary Source Policy

This project can use public word lists as candidate sources, but it must not scrape
commercial dictionary pages, copy paid textbook lists, or reuse third-party Korean
definitions/examples as-is.

## Allowed Candidate Workflow

1. Collect English headwords only from sources with clear public access and license
   terms.
2. Deduplicate and normalize candidates before they enter `study/word-bank.js`.
3. Assign levels for Korean learners by combining source rank and learning context:
   elementary, middle, high.
4. Write Korean meanings, English examples, and Korean example translations for this
   project. Do not copy dictionary definition text or example sentences.
5. Run `tools/Validate-StudyWordBank.ps1` before deployment.

## Current Reference Sources

| Source | Use | License / note |
| --- | --- | --- |
| New Dolch List 1.1 | Elementary candidate headwords | New General Service List Project; CC BY-SA 4.0 stated on project pages |
| New General Service List 1.2 | General high-frequency candidate headwords | 2,809-word general English list; CC BY-SA 4.0 stated on project pages |
| New Academic Word List 1.2 | High school / academic candidate headwords | 957-word academic list; CC BY-SA 4.0 stated on project pages |
| Korean Language Society / 어문회 assigned Hanja references | Hanja grade character candidates | Use only grade/character facts as candidates; write readings and meanings in-project |
| Namu mirror of 전국한자능력검정시험 배정한자 | Cross-check assigned Hanja sequence | Candidate cross-check only; do not copy explanations or prose |

Project pages:

- https://www.newgeneralservicelist.com/new-dolch-list
- https://www.newgeneralservicelist.com/new-general-service-list
- https://www.newgeneralservicelist.com/new-academic-word-list
- https://www.hanja.re.kr/
- https://namu.moe/w/%EC%A0%84%EA%B5%AD%ED%95%9C%EC%9E%90%EB%8A%A5%EB%A0%A5%EA%B2%80%EC%A0%95%EC%8B%9C%ED%97%98/%EB%B0%B0%EC%A0%95%ED%95%9C%EC%9E%90

## Do Not Use Directly

- Google/Naver search result snippets as a source of copied word lists.
- Commercial workbook or paid textbook vocabulary pages.
- Dictionary definitions/examples copied into Korean or English cards.
- Large unverified AI-generated batches without source-rank cross-checking.
- Hanja explanations, example sentences, or page prose copied from third-party pages.

## Expansion Target

The long-term target is around 3,000 English cards per level:

- Elementary: child/high-frequency/basic classroom words.
- Middle: general service and school-reading words.
- High: academic, CSAT-style, abstract and subject-area words.

The first safe milestone is to replace generated fallback cards with source-ranked
single-word candidates, then increase each level in verified batches.
