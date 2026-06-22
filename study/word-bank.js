"use strict";

// Original DH Forge starter banks. Keep entries short so cards stay useful on phones.
const WORD_BANK_RAW = `
elementary|apple|사과|I eat an apple.
elementary|banana|바나나|The banana is yellow.
elementary|book|책|This book is fun.
elementary|chair|의자|Sit on the chair.
elementary|desk|책상|My bag is on the desk.
elementary|school|학교|We go to school.
elementary|teacher|선생님|The teacher is kind.
elementary|student|학생|A student reads a book.
elementary|friend|친구|She is my friend.
elementary|family|가족|My family is happy.
elementary|mother|어머니|My mother cooks dinner.
elementary|father|아버지|My father drives a car.
elementary|sister|여자 형제|My sister likes music.
elementary|brother|남자 형제|My brother plays soccer.
elementary|home|집|I go home after school.
elementary|room|방|My room is clean.
elementary|door|문|Open the door.
elementary|window|창문|Close the window.
elementary|water|물|Drink some water.
elementary|milk|우유|I drink milk.
elementary|bread|빵|We eat bread.
elementary|rice|밥|Rice is warm.
elementary|egg|달걀|I had an egg.
elementary|fish|물고기|A fish swims.
elementary|bird|새|A bird can fly.
elementary|dog|개|The dog runs.
elementary|cat|고양이|The cat sleeps.
elementary|cow|소|A cow gives milk.
elementary|horse|말|The horse is fast.
elementary|tree|나무|The tree is tall.
elementary|flower|꽃|The flower is red.
elementary|grass|풀|The grass is green.
elementary|sun|태양|The sun is bright.
elementary|moon|달|The moon is round.
elementary|star|별|A star shines.
elementary|sky|하늘|The sky is blue.
elementary|rain|비|Rain falls today.
elementary|snow|눈|Snow is white.
elementary|wind|바람|The wind is cold.
elementary|cloud|구름|A cloud is in the sky.
elementary|big|큰|The box is big.
elementary|small|작은|The cup is small.
elementary|long|긴|This pencil is long.
elementary|short|짧은|The rope is short.
elementary|hot|더운|The soup is hot.
elementary|cold|추운|The water is cold.
elementary|new|새로운|I have a new bag.
elementary|old|오래된|This is an old photo.
elementary|good|좋은|That is a good idea.
elementary|bad|나쁜|It was a bad day.
elementary|happy|행복한|I feel happy.
elementary|sad|슬픈|He looks sad.
elementary|fast|빠른|The train is fast.
elementary|slow|느린|The turtle is slow.
elementary|early|이른|We arrived early.
elementary|late|늦은|Do not be late.
elementary|clean|깨끗한|Keep your desk clean.
elementary|dirty|더러운|My shoes are dirty.
elementary|open|열다|Open your book.
elementary|close|닫다|Close your eyes.
elementary|read|읽다|Read the sentence.
elementary|write|쓰다|Write your name.
elementary|listen|듣다|Listen carefully.
elementary|speak|말하다|Speak slowly.
elementary|walk|걷다|We walk to school.
elementary|run|달리다|I can run fast.
elementary|jump|뛰다|Jump over the line.
elementary|swim|수영하다|I swim in summer.
elementary|play|놀다|Let's play outside.
elementary|sing|노래하다|We sing a song.
elementary|draw|그리다|Draw a circle.
elementary|make|만들다|Make a paper plane.
elementary|take|가져가다|Take your bag.
elementary|give|주다|Give me a pencil.
elementary|come|오다|Come here.
elementary|go|가다|Go to the door.
elementary|eat|먹다|Eat your lunch.
elementary|drink|마시다|Drink water.
elementary|sleep|자다|I sleep at night.
elementary|wake|깨다|Wake up early.
elementary|color|색|What color is it?
elementary|number|숫자|Write the number.
elementary|picture|그림|Look at the picture.
elementary|story|이야기|Tell me a story.
elementary|game|게임|This game is easy.
elementary|music|음악|I like music.
elementary|movie|영화|We watched a movie.
elementary|park|공원|Meet me at the park.
elementary|market|시장|Mom went to the market.
elementary|bus|버스|The bus is here.
elementary|train|기차|The train is long.
elementary|bike|자전거|I ride a bike.
elementary|car|자동차|The car is black.
elementary|road|길|Cross the road safely.
elementary|map|지도|Use the map.
elementary|city|도시|Seoul is a big city.
elementary|country|나라|Korea is my country.
elementary|morning|아침|Good morning.
elementary|afternoon|오후|See you this afternoon.
elementary|evening|저녁|We eat dinner in the evening.
elementary|night|밤|It is dark at night.
elementary|today|오늘|Today is Monday.
elementary|tomorrow|내일|Tomorrow is my birthday.
elementary|yesterday|어제|I was busy yesterday.
middle|ability|능력|Practice improves ability.
middle|accident|사고|The accident blocked traffic.
middle|achieve|이루다|You can achieve your goal.
middle|activity|활동|Reading is a useful activity.
middle|advantage|장점|Speed is one advantage.
middle|advice|조언|She gave me advice.
middle|agree|동의하다|I agree with your answer.
middle|allow|허락하다|My parents allow it.
middle|appear|나타나다|Stars appear at night.
middle|area|지역|This area is quiet.
middle|arrive|도착하다|We arrived on time.
middle|attention|주의|Pay attention in class.
middle|avoid|피하다|Avoid making the same mistake.
middle|believe|믿다|I believe your story.
middle|borrow|빌리다|Can I borrow your pen?
middle|brave|용감한|The brave girl helped him.
middle|careful|조심하는|Be careful on the stairs.
middle|cause|원인|Smoke can cause problems.
middle|certain|확실한|I am certain about it.
middle|chance|기회|This is a good chance.
middle|change|변화|Change takes time.
middle|choice|선택|You made a wise choice.
middle|collect|모으다|He collects stamps.
middle|common|흔한|It is a common mistake.
middle|compare|비교하다|Compare the two pictures.
middle|complete|완성하다|Complete the homework.
middle|condition|상태|The road is in good condition.
middle|connect|연결하다|Connect the dots.
middle|consider|고려하다|Consider another idea.
middle|continue|계속하다|Continue reading.
middle|culture|문화|Food is part of culture.
middle|decide|결정하다|We decided to wait.
middle|decrease|감소하다|The number decreased.
middle|depend|의존하다|Plants depend on sunlight.
middle|describe|묘사하다|Describe your room.
middle|develop|발달하다|Skills develop with practice.
middle|difference|차이|Find the difference.
middle|difficult|어려운|This question is difficult.
middle|discover|발견하다|Scientists discover new facts.
middle|discuss|토론하다|Discuss the topic.
middle|during|동안|I slept during the trip.
middle|effort|노력|Effort matters.
middle|energy|에너지|Food gives us energy.
middle|environment|환경|Protect the environment.
middle|especially|특히|I like fruit, especially apples.
middle|event|사건|The event starts at noon.
middle|example|예|Give me an example.
middle|experience|경험|Travel is a good experience.
middle|explain|설명하다|Please explain the rule.
middle|factory|공장|The factory makes shoes.
middle|famous|유명한|He is a famous singer.
middle|foreign|외국의|She studies a foreign language.
middle|future|미래|Think about the future.
middle|habit|습관|Reading is a good habit.
middle|health|건강|Sleep is important for health.
middle|history|역사|We learn Korean history.
middle|however|그러나|It was cold; however, we went out.
middle|improve|향상시키다|Review can improve memory.
middle|include|포함하다|The box includes a guide.
middle|increase|증가하다|Prices can increase.
middle|information|정보|Find useful information.
middle|interest|관심|I have an interest in science.
middle|invite|초대하다|Invite your friends.
middle|language|언어|English is a language.
middle|local|지역의|Visit the local library.
middle|memory|기억|Sleep helps memory.
middle|message|메시지|Send a message.
middle|method|방법|Use this method.
middle|natural|자연의|This lake is natural.
middle|necessary|필요한|Water is necessary.
middle|notice|알아차리다|Did you notice the change?
middle|opinion|의견|Share your opinion.
middle|opportunity|기회|This is an opportunity.
middle|ordinary|보통의|It was an ordinary day.
middle|patient|참을성 있는|Be patient with children.
middle|planet|행성|Earth is a planet.
middle|popular|인기 있는|The song is popular.
middle|possible|가능한|Is it possible?
middle|prepare|준비하다|Prepare for the test.
middle|problem|문제|Solve the problem.
middle|produce|생산하다|Trees produce oxygen.
middle|protect|보호하다|Protect your eyes.
middle|purpose|목적|What is the purpose?
middle|reason|이유|Tell me the reason.
middle|receive|받다|I received a letter.
middle|reduce|줄이다|Reduce waste.
middle|remember|기억하다|Remember this word.
middle|require|필요로 하다|The job requires skill.
middle|result|결과|Check the result.
middle|return|돌아오다|Return the book.
middle|serious|심각한|This is a serious problem.
middle|similar|비슷한|The two words are similar.
middle|society|사회|Rules help society.
middle|solution|해결책|Find a solution.
middle|suddenly|갑자기|It suddenly rained.
middle|support|지지하다|Friends support each other.
middle|technology|기술|Technology changes quickly.
middle|though|비록 ~이지만|Though tired, he studied.
middle|valuable|가치 있는|Time is valuable.
middle|various|다양한|We tried various foods.
middle|volunteer|자원봉사자|She is a volunteer.
middle|wonder|궁금해하다|I wonder why.
high|abstract|추상적인|The idea is abstract.
high|accurate|정확한|Use accurate data.
high|adapt|적응하다|Animals adapt to changes.
high|adequate|충분한|Get adequate sleep.
high|analyze|분석하다|Analyze the passage.
high|approach|접근법|Try a different approach.
high|assume|가정하다|Do not assume too much.
high|benefit|이익|Exercise has many benefits.
high|challenge|도전|The task is a challenge.
high|complex|복잡한|The system is complex.
high|concept|개념|Understand the concept.
high|conclude|결론짓다|We conclude that it works.
high|conduct|수행하다|Conduct an experiment.
high|consequence|결과|Actions have consequences.
high|consistent|일관된|Be consistent in practice.
high|context|맥락|Guess meaning from context.
high|contrast|대조하다|Contrast the two opinions.
high|contribute|기여하다|Everyone can contribute.
high|controversy|논란|The issue caused controversy.
high|criteria|기준|Use clear criteria.
high|crucial|중대한|Timing is crucial.
high|derive|얻다|The word derives from Latin.
high|despite|~에도 불구하고|Despite rain, they played.
high|detect|감지하다|The device detects heat.
high|determine|결정하다|Determine the cause.
high|distinct|뚜렷한|The two sounds are distinct.
high|emerge|나타나다|New problems emerge.
high|emphasize|강조하다|Emphasize the main point.
high|enable|가능하게 하다|Tools enable faster work.
high|encounter|마주치다|You may encounter errors.
high|enhance|향상시키다|Reading can enhance vocabulary.
high|ensure|보장하다|Ensure the door is locked.
high|establish|설립하다|They established a school.
high|evaluate|평가하다|Evaluate the evidence.
high|evidence|증거|Find evidence in the text.
high|expand|확장하다|Expand your answer.
high|factor|요인|Stress is one factor.
high|feature|특징|This app has useful features.
high|flexible|유연한|A flexible plan helps.
high|function|기능|Explain the function.
high|generate|생성하다|Generate new ideas.
high|hypothesis|가설|Test the hypothesis.
high|identify|식별하다|Identify the speaker.
high|ignore|무시하다|Do not ignore warnings.
high|impact|영향|The impact was large.
high|imply|암시하다|The sentence implies doubt.
high|indicate|나타내다|The sign indicates danger.
high|individual|개인의|Respect individual choice.
high|interpret|해석하다|Interpret the graph.
high|maintain|유지하다|Maintain good habits.
high|major|주요한|This is a major reason.
high|minor|사소한|It is a minor error.
high|modify|수정하다|Modify the plan.
high|obtain|얻다|Obtain reliable information.
high|occur|발생하다|Mistakes occur often.
high|participate|참여하다|Participate in discussion.
high|perspective|관점|Consider another perspective.
high|phenomenon|현상|Migration is a social phenomenon.
high|potential|잠재적인|The idea has potential.
high|previous|이전의|Review the previous lesson.
high|principle|원리|Learn the basic principle.
high|process|과정|Follow the process.
high|prohibit|금지하다|Rules prohibit smoking.
high|promote|촉진하다|Schools promote learning.
high|react|반응하다|How did he react?
high|reflect|반영하다|The essay reflects her view.
high|relevant|관련 있는|Use relevant examples.
high|reliable|믿을 수 있는|Choose reliable sources.
high|represent|나타내다|The symbol represents peace.
high|respond|응답하다|Respond to the question.
high|restrict|제한하다|The rule restricts access.
high|significant|중요한|This is significant evidence.
high|specific|구체적인|Give a specific example.
high|structure|구조|Study the sentence structure.
high|sufficient|충분한|We need sufficient time.
high|survey|조사|The survey asked students.
high|sustain|유지하다|Plants sustain life.
high|temporary|일시적인|The change is temporary.
high|theory|이론|The theory explains it.
high|transform|변형시키다|Heat can transform matter.
high|transition|전환|Use a transition word.
high|trend|추세|The trend is increasing.
high|ultimate|궁극적인|The ultimate goal is learning.
high|valid|타당한|That is a valid point.
high|vary|다르다|Results vary by group.
high|visible|보이는|The moon is visible.
high|whereas|반면에|He likes math, whereas I like art.
high|widespread|널리 퍼진|The idea became widespread.
`.trim();

const HANJA_BANK_RAW = `
basic|一|일|하나|一日은 하루라는 뜻입니다.
basic|二|이|둘|二月은 2월입니다.
basic|三|삼|셋|三角形은 세 각이 있는 도형입니다.
basic|四|사|넷|四方은 네 방향입니다.
basic|五|오|다섯|五感은 다섯 가지 감각입니다.
basic|六|육|여섯|六月은 6월입니다.
basic|七|칠|일곱|七夕은 칠월 칠석입니다.
basic|八|팔|여덟|八方은 여러 방향을 뜻합니다.
basic|九|구|아홉|九月은 9월입니다.
basic|十|십|열|十字는 십자 모양입니다.
basic|百|백|일백|百年은 백 년입니다.
basic|千|천|일천|千里는 먼 거리를 뜻합니다.
basic|萬|만|일만|萬歲는 오래 살기를 바라는 말입니다.
basic|日|일|해, 날|日記는 하루 일을 적은 글입니다.
basic|月|월|달|月曜日은 월요일입니다.
basic|火|화|불|火山은 불을 뿜는 산입니다.
basic|水|수|물|水道는 물이 흐르는 길입니다.
basic|木|목|나무|木材는 나무로 된 재료입니다.
basic|金|금|쇠, 돈|金色은 금빛입니다.
basic|土|토|흙|土地는 땅입니다.
basic|山|산|산|山脈은 산줄기입니다.
basic|川|천|내|河川은 강과 내를 뜻합니다.
basic|田|전|밭|田園은 논밭과 마을입니다.
basic|人|인|사람|人間은 사람을 뜻합니다.
basic|口|구|입|人口는 사람 수입니다.
basic|目|목|눈|目的은 이루려는 바입니다.
basic|耳|이|귀|耳目은 귀와 눈입니다.
basic|手|수|손|手足은 손과 발입니다.
basic|足|족|발|足跡은 발자취입니다.
basic|心|심|마음|中心은 가운데입니다.
basic|力|력|힘|努力은 힘써 애쓰는 일입니다.
basic|大|대|크다|大門은 큰 문입니다.
basic|小|소|작다|小人은 작은 사람 또는 아이입니다.
basic|中|중|가운데|中心은 가운데입니다.
basic|上|상|위|上下는 위와 아래입니다.
basic|下|하|아래|地下는 땅 아래입니다.
basic|左|좌|왼쪽|左右는 왼쪽과 오른쪽입니다.
basic|右|우|오른쪽|右側은 오른쪽입니다.
basic|東|동|동쪽|東海는 동쪽 바다입니다.
basic|西|서|서쪽|西洋은 서쪽 나라를 뜻합니다.
basic|南|남|남쪽|南山은 남쪽 산입니다.
basic|北|북|북쪽|北風은 북쪽에서 부는 바람입니다.
basic|生|생|나다, 살다|生活은 살아가는 일입니다.
basic|學|학|배우다|學校는 배우는 곳입니다.
basic|校|교|학교|校門은 학교 문입니다.
basic|先|선|먼저|先生은 선생님입니다.
basic|友|우|벗|友人은 친구입니다.
basic|父|부|아버지|父母는 부모입니다.
basic|母|모|어머니|母國은 어머니의 나라입니다.
basic|兄|형|형|兄弟는 형과 아우입니다.
basic|弟|제|아우|兄弟는 형제입니다.
basic|女|녀|여자|女子는 여자입니다.
basic|男|남|남자|男子는 남자입니다.
basic|子|자|아이|子女는 자녀입니다.
basic|年|년|해|今年은 올해입니다.
basic|時|시|때|時間은 시간입니다.
basic|分|분|나누다|分數는 나눈 수입니다.
basic|間|간|사이|空間은 빈 자리입니다.
basic|今|금|이제|今年은 올해입니다.
basic|古|고|옛|古典은 오래된 책이나 작품입니다.
basic|新|신|새롭다|新聞은 새 소식입니다.
basic|長|장|길다|長所는 좋은 점입니다.
basic|短|단|짧다|短點은 부족한 점입니다.
basic|高|고|높다|高度는 높이입니다.
basic|低|저|낮다|低音은 낮은 소리입니다.
basic|明|명|밝다|明日은 내일입니다.
basic|暗|암|어둡다|暗記는 외워 기억하는 일입니다.
basic|白|백|희다|白紙는 흰 종이입니다.
basic|黑|흑|검다|黑色은 검은색입니다.
basic|赤|적|붉다|赤字는 손해를 뜻하기도 합니다.
basic|靑|청|푸르다|靑年은 젊은 사람입니다.
basic|正|정|바르다|正答은 바른 답입니다.
basic|不|불|아니다|不足은 충분하지 않음입니다.
basic|有|유|있다|有名은 이름이 알려짐입니다.
basic|無|무|없다|無心은 마음이 없음입니다.
basic|名|명|이름|名字는 이름 글자입니다.
basic|字|자|글자|漢字는 한자입니다.
basic|文|문|글|文章은 글입니다.
basic|語|어|말|英語는 영어입니다.
basic|書|서|글, 책|書店은 책방입니다.
basic|讀|독|읽다|讀書는 책 읽기입니다.
basic|言|언|말|言語는 말과 글입니다.
basic|見|견|보다|意見은 생각입니다.
basic|聞|문|듣다|新聞은 새 소식을 전합니다.
basic|行|행|가다|旅行은 여행입니다.
basic|來|래|오다|未來는 앞으로 올 때입니다.
basic|食|식|먹다|食事는 밥 먹는 일입니다.
basic|飮|음|마시다|飮料는 마실 것입니다.
basic|家|가|집|家族은 가족입니다.
basic|室|실|방|敎室은 교실입니다.
basic|門|문|문|校門은 학교 문입니다.
basic|車|차|수레, 차|自動車는 자동차입니다.
basic|空|공|비다, 하늘|空氣는 공기입니다.
basic|氣|기|기운|天氣는 날씨입니다.
basic|天|천|하늘|天才는 뛰어난 재능을 가진 사람입니다.
basic|雨|우|비|雨傘은 우산입니다.
basic|電|전|번개, 전기|電話는 전화입니다.
basic|話|화|말하다|對話는 서로 이야기함입니다.
`.trim();

const englishWords = WORD_BANK_RAW.split("\n").map((line, index) => {
  const [level, word, meaning, example] = line.split("|");
  return {
    id: `english-${level}-${index}-${word}`,
    type: "english",
    level,
    term: word,
    word,
    meaning,
    example
  };
});

const hanjaWords = HANJA_BANK_RAW.split("\n").map((line, index) => {
  const [level, character, reading, meaning, example] = line.split("|");
  return {
    id: `hanja-${level}-${index}-${character}`,
    type: "hanja",
    level,
    term: character,
    word: character,
    reading,
    meaning: `${reading} / ${meaning}`,
    example
  };
});

window.STUDY_WORD_BANK = [...englishWords, ...hanjaWords];
