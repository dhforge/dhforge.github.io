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
hanja10|一|일|하나|一日은 하루라는 뜻입니다.
hanja10|二|이|둘|二月은 2월입니다.
hanja10|三|삼|셋|三角形은 세 각이 있는 도형입니다.
hanja10|四|사|넷|四方은 네 방향입니다.
hanja10|五|오|다섯|五感은 다섯 가지 감각입니다.
hanja10|六|육|여섯|六月은 6월입니다.
hanja10|七|칠|일곱|七夕은 칠월 칠석입니다.
hanja10|八|팔|여덟|八方은 여러 방향을 뜻합니다.
hanja10|九|구|아홉|九月은 9월입니다.
hanja10|十|십|열|十字는 십자 모양입니다.
hanja10|百|백|일백|百年은 백 년입니다.
hanja10|千|천|일천|千里는 먼 거리를 뜻합니다.
hanja10|萬|만|일만|萬歲는 오래 살기를 바라는 말입니다.
hanja10|日|일|해, 날|日記는 하루 일을 적은 글입니다.
hanja10|月|월|달|月曜日은 월요일입니다.
hanja10|火|화|불|火山은 불을 뿜는 산입니다.
hanja10|水|수|물|水道는 물이 흐르는 길입니다.
hanja10|木|목|나무|木材는 나무로 된 재료입니다.
hanja10|金|금|쇠, 돈|金色은 금빛입니다.
hanja10|土|토|흙|土地는 땅입니다.
hanja10|山|산|산|山脈은 산줄기입니다.
hanja10|川|천|내|河川은 강과 내를 뜻합니다.
hanja10|田|전|밭|田園은 논밭과 마을입니다.
hanja10|人|인|사람|人間은 사람을 뜻합니다.
hanja10|口|구|입|人口는 사람 수입니다.
hanja10|目|목|눈|目的은 이루려는 바입니다.
hanja10|耳|이|귀|耳目은 귀와 눈입니다.
hanja10|手|수|손|手足은 손과 발입니다.
hanja10|足|족|발|足跡은 발자취입니다.
hanja10|心|심|마음|中心은 가운데입니다.
hanja10|力|력|힘|努力은 힘써 애쓰는 일입니다.
hanja10|大|대|크다|大門은 큰 문입니다.
hanja10|小|소|작다|小人은 작은 사람 또는 아이입니다.
hanja10|中|중|가운데|中心은 가운데입니다.
hanja10|上|상|위|上下는 위와 아래입니다.
hanja10|下|하|아래|地下는 땅 아래입니다.
hanja10|左|좌|왼쪽|左右는 왼쪽과 오른쪽입니다.
hanja10|右|우|오른쪽|右側은 오른쪽입니다.
hanja10|東|동|동쪽|東海는 동쪽 바다입니다.
hanja10|西|서|서쪽|西洋은 서쪽 나라를 뜻합니다.
hanja10|南|남|남쪽|南山은 남쪽 산입니다.
hanja10|北|북|북쪽|北風은 북쪽에서 부는 바람입니다.
hanja10|生|생|나다, 살다|生活은 살아가는 일입니다.
hanja10|學|학|배우다|學校는 배우는 곳입니다.
hanja10|校|교|학교|校門은 학교 문입니다.
hanja10|先|선|먼저|先生은 선생님입니다.
hanja10|友|우|벗|友人은 친구입니다.
hanja10|父|부|아버지|父母는 부모입니다.
hanja10|母|모|어머니|母國은 어머니의 나라입니다.
hanja10|兄|형|형|兄弟는 형과 아우입니다.
hanja10|弟|제|아우|兄弟는 형제입니다.
hanja10|女|녀|여자|女子는 여자입니다.
hanja10|男|남|남자|男子는 남자입니다.
hanja10|子|자|아이|子女는 자녀입니다.
hanja10|年|년|해|今年은 올해입니다.
hanja10|時|시|때|時間은 시간입니다.
hanja10|分|분|나누다|分數는 나눈 수입니다.
hanja10|間|간|사이|空間은 빈 자리입니다.
hanja10|今|금|이제|今年은 올해입니다.
hanja10|古|고|옛|古典은 오래된 책이나 작품입니다.
hanja10|新|신|새롭다|新聞은 새 소식입니다.
hanja10|長|장|길다|長所는 좋은 점입니다.
hanja10|短|단|짧다|短點은 부족한 점입니다.
hanja10|高|고|높다|高度는 높이입니다.
hanja10|低|저|낮다|低音은 낮은 소리입니다.
hanja10|明|명|밝다|明日은 내일입니다.
hanja10|暗|암|어둡다|暗記는 외워 기억하는 일입니다.
hanja10|白|백|희다|白紙는 흰 종이입니다.
hanja10|黑|흑|검다|黑色은 검은색입니다.
hanja10|赤|적|붉다|赤字는 손해를 뜻하기도 합니다.
hanja10|靑|청|푸르다|靑年은 젊은 사람입니다.
hanja10|正|정|바르다|正答은 바른 답입니다.
hanja10|不|불|아니다|不足은 충분하지 않음입니다.
hanja10|有|유|있다|有名은 이름이 알려짐입니다.
hanja10|無|무|없다|無心은 마음이 없음입니다.
hanja10|名|명|이름|名字는 이름 글자입니다.
hanja10|字|자|글자|漢字는 한자입니다.
hanja10|文|문|글|文章은 글입니다.
hanja10|語|어|말|英語는 영어입니다.
hanja10|書|서|글, 책|書店은 책방입니다.
hanja10|讀|독|읽다|讀書는 책 읽기입니다.
hanja10|言|언|말|言語는 말과 글입니다.
hanja10|見|견|보다|意見은 생각입니다.
hanja10|聞|문|듣다|新聞은 새 소식을 전합니다.
hanja10|行|행|가다|旅行은 여행입니다.
hanja10|來|래|오다|未來는 앞으로 올 때입니다.
hanja10|食|식|먹다|食事는 밥 먹는 일입니다.
hanja10|飮|음|마시다|飮料는 마실 것입니다.
hanja10|家|가|집|家族은 가족입니다.
hanja10|室|실|방|敎室은 교실입니다.
hanja10|門|문|문|校門은 학교 문입니다.
hanja10|車|차|수레, 차|自動車는 자동차입니다.
hanja10|空|공|비다, 하늘|空氣는 공기입니다.
hanja10|氣|기|기운|天氣는 날씨입니다.
hanja10|天|천|하늘|天才는 뛰어난 재능을 가진 사람입니다.
hanja10|雨|우|비|雨傘은 우산입니다.
hanja10|電|전|번개, 전기|電話는 전화입니다.
hanja10|話|화|말하다|對話는 서로 이야기함입니다.
`.trim();

const HANJA_LEVEL_PACKS = {
  hanja9: [
    ["力", "력", "힘", "努力은 힘써 애쓰는 일입니다."],
    ["男", "남", "남자", "男子는 남자입니다."],
    ["女", "녀", "여자", "女子는 여자입니다."],
    ["父", "부", "아버지", "父母는 부모입니다."],
    ["母", "모", "어머니", "母國은 어머니의 나라입니다."],
    ["子", "자", "아이", "子女는 자녀입니다."],
    ["兄", "형", "형", "兄弟는 형과 아우입니다."],
    ["弟", "제", "아우", "兄弟는 형제입니다."],
    ["王", "왕", "임금", "王宮은 임금이 사는 궁입니다."],
    ["民", "민", "백성", "國民은 나라의 사람입니다."],
    ["里", "리", "마을", "里長은 마을 대표입니다."],
    ["村", "촌", "마을", "農村은 농사를 짓는 마을입니다."],
    ["林", "림", "수풀", "森林은 나무가 많은 숲입니다."],
    ["竹", "죽", "대나무", "竹林은 대나무 숲입니다."],
    ["石", "석", "돌", "石橋는 돌다리입니다."],
    ["貝", "패", "조개", "貝類는 조개 종류입니다."],
    ["犬", "견", "개", "愛犬은 사랑하는 개입니다."],
    ["牛", "우", "소", "牛乳는 소의 젖입니다."],
    ["馬", "마", "말", "馬車는 말이 끄는 수레입니다."],
    ["魚", "어", "물고기", "魚市場은 생선 시장입니다."]
  ],
  hanja8: [
    ["國", "국", "나라", "韓國은 우리가 사는 나라입니다."],
    ["軍", "군", "군사", "軍人은 나라를 지키는 사람입니다."],
    ["市", "시", "도시", "都市는 사람이 많이 사는 곳입니다."],
    ["道", "도", "길", "道路는 사람이 다니는 길입니다."],
    ["路", "로", "길", "通路는 지나가는 길입니다."],
    ["工", "공", "장인, 일", "工夫는 학문을 익히는 일입니다."],
    ["場", "장", "마당, 곳", "運動場은 운동하는 곳입니다."],
    ["店", "점", "가게", "書店은 책을 파는 가게입니다."],
    ["社", "사", "모임", "會社는 사람들이 모여 일하는 곳입니다."],
    ["會", "회", "모이다", "會議는 모여서 의논하는 일입니다."],
    ["同", "동", "같다", "同時는 같은 때입니다."],
    ["每", "매", "마다", "每日은 날마다입니다."],
    ["前", "전", "앞", "午前은 낮 열두 시 전입니다."],
    ["後", "후", "뒤", "午後는 낮 열두 시 뒤입니다."],
    ["午", "오", "낮", "正午는 낮 열두 시입니다."],
    ["半", "반", "절반", "半分은 둘로 나눈 하나입니다."],
    ["週", "주", "주일", "週末은 한 주의 끝입니다."],
    ["曜", "요", "빛나다", "曜日은 주중의 날입니다."],
    ["休", "휴", "쉬다", "休日은 쉬는 날입니다."],
    ["安", "안", "편안하다", "安全은 위험이 없음입니다."],
    ["全", "전", "온전하다", "全部는 모두입니다."],
    ["多", "다", "많다", "多數는 많은 수입니다."],
    ["少", "소", "적다", "少數는 적은 수입니다."],
    ["强", "강", "강하다", "强風은 센 바람입니다."]
  ],
  hanja7: [
    ["弱", "약", "약하다", "弱點은 부족한 점입니다."],
    ["近", "근", "가깝다", "近所는 가까운 곳입니다."],
    ["遠", "원", "멀다", "遠足은 멀리 나들이 가는 일입니다."],
    ["內", "내", "안", "室內는 방 안입니다."],
    ["外", "외", "밖", "海外는 바다 밖의 나라입니다."],
    ["首", "수", "머리", "首都는 한 나라의 중심 도시입니다."],
    ["身", "신", "몸", "身體는 사람의 몸입니다."],
    ["體", "체", "몸", "體育은 몸을 기르는 교육입니다."],
    ["頭", "두", "머리", "頭痛은 머리가 아픈 증상입니다."],
    ["顔", "안", "얼굴", "顔色은 얼굴빛입니다."],
    ["鼻", "비", "코", "鼻音은 코로 나는 소리입니다."],
    ["齒", "치", "이", "齒科는 이를 치료하는 과입니다."],
    ["病", "병", "병", "病院은 병을 고치는 곳입니다."],
    ["院", "원", "집, 기관", "病院은 치료 기관입니다."],
    ["醫", "의", "의원", "醫師는 병을 고치는 사람입니다."],
    ["藥", "약", "약", "藥局은 약을 파는 곳입니다."],
    ["服", "복", "옷, 따르다", "制服은 정해진 옷입니다."],
    ["衣", "의", "옷", "衣食住는 생활의 기본입니다."],
    ["食", "식", "먹다", "食堂은 밥을 먹는 곳입니다."],
    ["飯", "반", "밥", "朝飯은 아침밥입니다."],
    ["茶", "차", "차", "茶道는 차를 마시는 예절입니다."],
    ["肉", "육", "고기", "肉食은 고기를 먹는 일입니다."],
    ["米", "미", "쌀", "米穀은 쌀과 곡식입니다."],
    ["豆", "두", "콩", "豆腐는 콩으로 만든 음식입니다."]
  ],
  hanja6: [
    ["敎", "교", "가르치다", "敎育은 가르치고 기르는 일입니다."],
    ["育", "육", "기르다", "體育은 몸을 기르는 활동입니다."],
    ["問", "문", "묻다", "質問은 모르는 것을 묻는 일입니다."],
    ["答", "답", "대답", "正答은 맞는 답입니다."],
    ["題", "제", "제목, 문제", "問題는 풀어야 할 일입니다."],
    ["習", "습", "익히다", "學習은 배워 익히는 일입니다."],
    ["練", "련", "익히다", "練習은 반복해서 익히는 일입니다."],
    ["試", "시", "시험하다", "試驗은 실력을 재는 일입니다."],
    ["驗", "험", "시험하다", "經驗은 겪어 본 일입니다."],
    ["課", "과", "공부 과정", "課題는 해야 할 과제입니다."],
    ["科", "과", "과목", "科學은 자연을 연구하는 학문입니다."],
    ["算", "산", "셈하다", "計算은 수를 셈하는 일입니다."],
    ["數", "수", "수", "數學은 수를 배우는 학문입니다."],
    ["理", "리", "이치", "理由는 까닭입니다."],
    ["由", "유", "까닭", "自由는 스스로 할 수 있음입니다."],
    ["英", "영", "꽃부리, 뛰어나다", "英語는 영어입니다."],
    ["漢", "한", "한나라, 한자", "漢字는 중국에서 온 글자입니다."],
    ["字", "자", "글자", "文字는 뜻을 담은 글자입니다."],
    ["句", "구", "글귀", "句節은 글의 마디입니다."],
    ["章", "장", "글", "文章은 글입니다."],
    ["作", "작", "짓다", "作文은 글을 짓는 일입니다."],
    ["者", "자", "사람", "作者는 글을 지은 사람입니다."],
    ["記", "기", "기록하다", "日記는 하루 일을 적은 글입니다."],
    ["錄", "록", "기록하다", "記錄은 적어 남기는 일입니다."]
  ],
  hanja5: [
    ["社", "사", "모임", "社會는 사람들이 모여 사는 곳입니다."],
    ["會", "회", "모이다", "會社는 일하는 조직입니다."],
    ["公", "공", "공평하다", "公共은 함께 쓰는 것입니다."],
    ["共", "공", "함께", "共同은 함께 하는 일입니다."],
    ["私", "사", "사사롭다", "私生活은 개인의 생활입니다."],
    ["家", "가", "집", "家庭은 가족이 사는 집입니다."],
    ["庭", "정", "뜰", "庭園은 집 안의 뜰입니다."],
    ["族", "족", "겨레", "民族은 같은 문화를 가진 사람들입니다."],
    ["親", "친", "친하다", "親友는 친한 친구입니다."],
    ["愛", "애", "사랑", "愛情은 사랑하는 마음입니다."],
    ["情", "정", "뜻, 감정", "感情은 마음의 움직임입니다."],
    ["感", "감", "느끼다", "感動은 마음이 크게 움직임입니다."],
    ["意", "의", "뜻", "意見은 자신의 생각입니다."],
    ["思", "사", "생각하다", "思想은 생각의 체계입니다."],
    ["考", "고", "생각하다", "考察은 깊이 생각하는 일입니다."],
    ["知", "지", "알다", "知識은 알고 있는 내용입니다."],
    ["識", "식", "알다", "常識은 일반적인 지식입니다."],
    ["信", "신", "믿다", "信號는 뜻을 전하는 표시입니다."],
    ["用", "용", "쓰다", "使用은 쓰는 일입니다."],
    ["便", "편", "편하다", "便利는 편하고 이로운 점입니다."],
    ["利", "리", "이롭다", "利益은 얻는 이로움입니다."],
    ["益", "익", "더하다", "有益은 도움이 됨입니다."],
    ["害", "해", "해치다", "被害는 해를 입은 일입니다."],
    ["福", "복", "복", "幸福은 마음이 만족스러운 상태입니다."]
  ],
  hanja4: [
    ["政", "정", "정사", "政治는 나라를 다스리는 일입니다."],
    ["治", "치", "다스리다", "治療는 병을 고치는 일입니다."],
    ["法", "법", "법", "法律은 지켜야 할 규칙입니다."],
    ["律", "률", "법칙", "規律은 정해진 질서입니다."],
    ["官", "관", "관리", "官廳은 나라 일을 하는 기관입니다."],
    ["廳", "청", "관청", "市廳은 도시 행정을 맡는 곳입니다."],
    ["議", "의", "의논하다", "會議는 모여 의논하는 일입니다."],
    ["論", "론", "논하다", "討論은 의견을 주고받는 일입니다."],
    ["決", "결", "정하다", "決定은 뜻을 정하는 일입니다."],
    ["定", "정", "정하다", "安定은 흔들림이 적은 상태입니다."],
    ["約", "약", "맺다", "約束은 지키기로 한 말입니다."],
    ["束", "속", "묶다", "結束은 마음을 하나로 모음입니다."],
    ["責", "책", "책임", "責任은 맡은 일을 다하는 것입니다."],
    ["任", "임", "맡기다", "任務는 맡은 일입니다."],
    ["務", "무", "일", "業務는 맡아 하는 일입니다."],
    ["報", "보", "알리다", "情報는 알려진 내용입니다."],
    ["告", "고", "알리다", "報告는 조사한 일을 알리는 것입니다."],
    ["設", "설", "베풀다", "施設은 어떤 목적의 설비입니다."],
    ["備", "비", "갖추다", "準備는 미리 갖추는 일입니다."],
    ["準", "준", "준하다", "基準은 판단의 바탕입니다."],
    ["基", "기", "터", "基礎는 가장 밑바탕입니다."],
    ["礎", "초", "주춧돌", "基礎는 시작의 바탕입니다."],
    ["構", "구", "얽다", "構造는 짜임새입니다."],
    ["造", "조", "만들다", "製造는 물건을 만드는 일입니다."]
  ],
  hanja3: [
    ["經", "경", "지나다", "經驗은 겪어 본 일입니다."],
    ["濟", "제", "건너다, 구제하다", "經濟는 살림살이의 흐름입니다."],
    ["營", "영", "경영하다", "經營은 조직을 운영하는 일입니다."],
    ["業", "업", "일", "職業은 사람이 하는 일입니다."],
    ["職", "직", "직분", "職場은 일하는 곳입니다."],
    ["務", "무", "일", "事務는 맡아 처리하는 일입니다."],
    ["資", "자", "재물", "資源은 쓸 수 있는 바탕입니다."],
    ["本", "본", "근본", "資本은 사업의 밑천입니다."],
    ["產", "산", "낳다", "生產은 물건을 만들어 내는 일입니다."],
    ["消", "소", "사라지다", "消費는 재화를 쓰는 일입니다."],
    ["費", "비", "쓰다", "學費는 공부에 드는 돈입니다."],
    ["價", "가", "값", "價格은 물건의 값입니다."],
    ["格", "격", "격식", "資格은 어떤 일을 할 조건입니다."],
    ["量", "량", "헤아리다", "數量은 수와 양입니다."],
    ["質", "질", "바탕", "品質은 물건의 질입니다."],
    ["輸", "수", "나르다", "輸送은 실어 나르는 일입니다."],
    ["送", "송", "보내다", "放送은 널리 보내는 일입니다."],
    ["貿", "무", "무역하다", "貿易은 물건을 사고파는 일입니다."],
    ["易", "역", "바꾸다", "交易은 서로 바꾸어 거래하는 일입니다."],
    ["貸", "대", "빌려주다", "貸出은 빌려 내주는 일입니다."],
    ["借", "차", "빌리다", "借用은 빌려 쓰는 일입니다."],
    ["預", "예", "맡기다", "預金은 돈을 맡기는 일입니다."],
    ["貯", "저", "쌓다", "貯蓄은 돈을 모아 두는 일입니다."],
    ["蓄", "축", "쌓다", "蓄積은 쌓아 모으는 일입니다."]
  ],
  hanja2: [
    ["哲", "철", "밝다", "哲學은 삶과 세계를 탐구하는 학문입니다."],
    ["學", "학", "배우다", "學問은 배워 익히는 지식입니다."],
    ["倫", "륜", "인륜", "倫理는 사람이 지켜야 할 도리입니다."],
    ["理", "리", "이치", "論理는 생각의 이치입니다."],
    ["宗", "종", "마루", "宗敎는 믿음의 체계입니다."],
    ["敎", "교", "가르치다", "宗敎는 믿음을 가르치는 체계입니다."],
    ["憲", "헌", "법", "憲法은 나라의 기본 법입니다."],
    ["權", "권", "권리", "權利는 마땅히 누릴 힘입니다."],
    ["義", "의", "옳다", "正義는 바른 도리입니다."],
    ["務", "무", "일", "義務는 해야 할 일입니다."],
    ["責", "책", "꾸짖다", "責任은 맡은 바를 다하는 일입니다."],
    ["任", "임", "맡기다", "責任은 맡은 의무입니다."],
    ["裁", "재", "마르다, 판단하다", "裁判은 법에 따라 판단하는 일입니다."],
    ["判", "판", "판단하다", "判斷은 옳고 그름을 가리는 일입니다."],
    ["訴", "소", "호소하다", "訴訟은 법에 호소하는 절차입니다."],
    ["訟", "송", "송사하다", "訴訟은 다툼을 법으로 해결하는 일입니다."],
    ["罪", "죄", "허물", "犯罪는 법을 어긴 행위입니다."],
    ["犯", "범", "범하다", "犯人은 죄를 지은 사람입니다."],
    ["罰", "벌", "벌하다", "處罰은 잘못에 벌을 주는 일입니다."],
    ["處", "처", "처리하다", "處理는 일을 다루어 해결하는 것입니다."],
    ["警", "경", "경계하다", "警察은 사회 질서를 지키는 기관입니다."],
    ["察", "찰", "살피다", "觀察은 자세히 살피는 일입니다."],
    ["檢", "검", "검사하다", "檢査는 살펴 확인하는 일입니다."],
    ["査", "사", "조사하다", "調査는 자세히 알아보는 일입니다."]
  ],
  hanja1: [
    ["鬱", "울", "답답하다", "憂鬱은 마음이 답답하고 어두운 상태입니다."],
    ["憂", "우", "근심", "憂慮는 걱정하고 염려하는 마음입니다."],
    ["慮", "려", "생각하다", "考慮는 깊이 생각하는 일입니다."],
    ["驚", "경", "놀라다", "驚異는 매우 놀라운 일입니다."],
    ["異", "이", "다르다", "異常은 보통과 다른 상태입니다."],
    ["嚴", "엄", "엄하다", "嚴格은 매우 엄하고 바른 태도입니다."],
    ["肅", "숙", "엄숙하다", "嚴肅은 말과 행동이 매우 조심스러움입니다."],
    ["謙", "겸", "겸손하다", "謙讓은 자신을 낮추고 양보하는 태도입니다."],
    ["讓", "양", "사양하다", "讓步는 자기 뜻을 조금 물리는 일입니다."],
    ["懇", "간", "간절하다", "懇請은 간절히 부탁하는 일입니다."],
    ["請", "청", "청하다", "申請은 어떤 일을 요청하는 것입니다."],
    ["顧", "고", "돌아보다", "顧客은 물건을 사러 오는 손님입니다."],
    ["客", "객", "손님", "旅客은 여행하는 손님입니다."],
    ["鑑", "감", "거울, 살피다", "鑑賞은 예술 작품을 보고 느끼는 일입니다."],
    ["賞", "상", "상주다", "賞狀은 상을 주는 글입니다."],
    ["犧", "희", "희생하다", "犧牲은 남을 위해 손해를 감수하는 일입니다."],
    ["牲", "생", "희생", "犧牲은 자신을 바치는 일입니다."],
    ["躍", "약", "뛰다", "飛躍은 크게 발전하는 일입니다."],
    ["飛", "비", "날다", "飛行은 하늘을 나는 일입니다."],
    ["躊", "주", "머뭇거리다", "躊躇는 망설이고 머뭇거리는 일입니다."],
    ["躇", "저", "머뭇거리다", "躊躇는 쉽게 결정하지 못하는 모습입니다."],
    ["讚", "찬", "기리다", "讚美는 아름다움을 칭찬하는 일입니다."],
    ["譽", "예", "기리다", "名譽는 이름이 높고 좋은 평판입니다."],
    ["懲", "징", "징계하다", "懲戒는 잘못을 바로잡기 위한 벌입니다."]
  ]
};

const HANJA_EXAM_WORDS_RAW = `
hanja10|一日|일일|하루|一日은 하루를 뜻합니다.
hanja10|二月|이월|2월|二月은 한 해의 두 번째 달입니다.
hanja10|三角|삼각|세 개의 각|三角形은 세 각이 있는 도형입니다.
hanja10|四方|사방|네 방향|四方은 동서남북의 여러 방향입니다.
hanja10|五感|오감|다섯 감각|五感은 눈, 귀, 코, 혀, 몸의 감각입니다.
hanja10|六月|유월|6월|六月은 여섯 번째 달입니다.
hanja10|七夕|칠석|칠월 칠석|七夕은 음력 칠월 칠일입니다.
hanja10|八方|팔방|여러 방향|八方은 사방팔방의 방향입니다.
hanja10|九月|구월|9월|九月은 아홉 번째 달입니다.
hanja10|十字|십자|열 십 모양|十字는 십자 모양입니다.
hanja10|學校|학교|배우는 곳|學校에서 학생이 공부합니다.
hanja10|先生|선생|가르치는 사람|先生은 학생을 가르칩니다.
hanja10|父母|부모|아버지와 어머니|父母는 가족의 어른입니다.
hanja10|兄弟|형제|형과 아우|兄弟는 같은 부모에게서 난 사이입니다.
hanja10|天地|천지|하늘과 땅|天地는 하늘과 땅을 뜻합니다.
hanja9|國民|국민|나라의 사람|國民은 한 나라에 속한 사람입니다.
hanja9|王宮|왕궁|임금의 궁|王宮은 왕이 사는 궁입니다.
hanja9|農村|농촌|농사를 짓는 마을|農村에는 논과 밭이 많습니다.
hanja9|森林|삼림|나무가 많은 숲|森林은 큰 숲을 뜻합니다.
hanja9|竹林|죽림|대나무 숲|竹林은 대나무가 많은 숲입니다.
hanja9|石橋|석교|돌다리|石橋는 돌로 만든 다리입니다.
hanja9|貝類|패류|조개 종류|貝類는 조개와 같은 생물입니다.
hanja9|愛犬|애견|사랑하는 개|愛犬을 잘 돌봅니다.
hanja9|牛乳|우유|소의 젖|牛乳는 소에서 얻은 젖입니다.
hanja9|馬車|마차|말이 끄는 수레|馬車는 말이 끄는 차입니다.
hanja9|魚市場|어시장|생선 시장|魚市場에서 생선을 팝니다.
hanja9|男子|남자|남성|男子 학생이 운동합니다.
hanja9|女子|여자|여성|女子 학생이 책을 읽습니다.
hanja9|子女|자녀|아들과 딸|子女는 부모의 아이입니다.
hanja9|努力|노력|힘써 애씀|努力은 목표를 이루는 힘입니다.
hanja8|韓國|한국|우리나라|韓國은 대한민국을 뜻합니다.
hanja8|軍人|군인|군대에 있는 사람|軍人은 나라를 지킵니다.
hanja8|都市|도시|사람이 많이 사는 곳|都市에는 건물이 많습니다.
hanja8|道路|도로|사람과 차가 다니는 길|道路를 안전하게 건넙니다.
hanja8|通路|통로|지나가는 길|通路를 막으면 안 됩니다.
hanja8|工夫|공부|학문을 익힘|工夫는 배워 익히는 일입니다.
hanja8|運動場|운동장|운동하는 곳|運動場에서 달리기를 합니다.
hanja8|書店|서점|책을 파는 가게|書店에서 책을 삽니다.
hanja8|會社|회사|일하는 조직|會社에서 여러 사람이 일합니다.
hanja8|會議|회의|모여 의논함|會議에서 의견을 나눕니다.
hanja8|同時|동시|같은 때|同時에 두 일이 일어났습니다.
hanja8|每日|매일|날마다|每日 조금씩 공부합니다.
hanja8|午前|오전|낮 열두 시 전|午前에 수업이 있습니다.
hanja8|午後|오후|낮 열두 시 뒤|午後에 약속이 있습니다.
hanja8|安全|안전|위험이 없음|安全을 먼저 생각합니다.
hanja7|弱點|약점|부족한 점|弱點을 고치면 더 좋아집니다.
hanja7|近所|근소|가까운 곳|近所에 도서관이 있습니다.
hanja7|遠足|원족|멀리 나들이 감|遠足 날에는 도시락을 준비합니다.
hanja7|室內|실내|방 안|室內에서는 조용히 합니다.
hanja7|海外|해외|바다 밖의 나라|海外 여행을 준비합니다.
hanja7|首都|수도|나라의 중심 도시|首都는 한 나라의 중심입니다.
hanja7|身體|신체|사람의 몸|身體를 건강하게 유지합니다.
hanja7|體育|체육|몸을 기르는 교육|體育 시간에 운동합니다.
hanja7|頭痛|두통|머리 아픔|頭痛이 있으면 쉽니다.
hanja7|顔色|안색|얼굴빛|顔色이 좋지 않습니다.
hanja7|齒科|치과|이를 치료하는 과|齒科에서 이를 검사합니다.
hanja7|病院|병원|병을 고치는 곳|病院에서 치료를 받습니다.
hanja7|醫師|의사|병을 고치는 사람|醫師가 환자를 봅니다.
hanja7|藥局|약국|약을 파는 곳|藥局에서 약을 삽니다.
hanja7|制服|제복|정해진 옷|學生은 制服을 입습니다.
hanja6|敎育|교육|가르치고 기름|敎育은 사람을 성장하게 합니다.
hanja6|質問|질문|모르는 것을 물음|質問을 하면 더 잘 이해합니다.
hanja6|正答|정답|맞는 답|正答을 확인합니다.
hanja6|問題|문제|풀어야 할 일|問題를 차근차근 풉니다.
hanja6|學習|학습|배워 익힘|學習 계획을 세웁니다.
hanja6|練習|연습|반복해 익힘|練習을 많이 하면 늘어납니다.
hanja6|試驗|시험|실력을 재는 일|試驗 전에 복습합니다.
hanja6|經驗|경험|겪어 본 일|經驗은 좋은 배움이 됩니다.
hanja6|課題|과제|해야 할 일|課題를 제출합니다.
hanja6|科學|과학|자연을 연구하는 학문|科學은 원리를 탐구합니다.
hanja6|計算|계산|수를 셈함|計算을 정확히 합니다.
hanja6|數學|수학|수를 배우는 학문|數學 문제를 풉니다.
hanja6|理由|이유|까닭|理由를 설명합니다.
hanja6|自由|자유|스스로 할 수 있음|自由에는 책임이 따릅니다.
hanja6|作文|작문|글을 지음|作文은 생각을 글로 쓰는 일입니다.
hanja5|社會|사회|사람들이 모여 사는 곳|社會에는 여러 규칙이 있습니다.
hanja5|公共|공공|함께 쓰는 것|公共 장소에서는 예절을 지킵니다.
hanja5|共同|공동|함께 함|共同 목표를 세웁니다.
hanja5|私生活|사생활|개인의 생활|私生活은 존중해야 합니다.
hanja5|家庭|가정|가족이 사는 집|家庭은 생활의 기본입니다.
hanja5|民族|민족|같은 문화를 가진 사람들|民族 문화는 소중합니다.
hanja5|親友|친우|친한 친구|親友와 서로 돕습니다.
hanja5|愛情|애정|사랑하는 마음|愛情을 담아 돌봅니다.
hanja5|感情|감정|마음의 움직임|感情을 잘 표현합니다.
hanja5|意見|의견|자신의 생각|意見을 분명히 말합니다.
hanja5|思想|사상|생각의 체계|思想은 행동에 영향을 줍니다.
hanja5|知識|지식|알고 있는 내용|知識을 넓힙니다.
hanja5|常識|상식|일반적인 지식|常識을 갖추어야 합니다.
hanja5|使用|사용|쓰는 일|工具를 올바르게 使用합니다.
hanja5|幸福|행복|마음이 만족스러움|幸福은 가까운 곳에 있습니다.
hanja4|政治|정치|나라를 다스리는 일|政治는 사회의 방향을 정합니다.
hanja4|治療|치료|병을 고침|治療를 꾸준히 받습니다.
hanja4|法律|법률|지켜야 할 법|法律은 사회 질서를 세웁니다.
hanja4|規律|규율|정해진 질서|規律을 지키면 안전합니다.
hanja4|官廳|관청|나라 일을 하는 기관|官廳에서 민원을 처리합니다.
hanja4|市廳|시청|도시 행정 기관|市廳은 도시 일을 맡습니다.
hanja4|討論|토론|의견을 주고받음|討論에서 근거를 제시합니다.
hanja4|決定|결정|뜻을 정함|決定에는 책임이 따릅니다.
hanja4|約束|약속|지키기로 한 말|約束을 지켜야 믿음이 생깁니다.
hanja4|責任|책임|맡은 일을 다함|責任을 다하는 태도가 중요합니다.
hanja4|任務|임무|맡은 일|任務를 성실히 수행합니다.
hanja4|情報|정보|알려진 내용|情報를 정확히 확인합니다.
hanja4|報告|보고|조사한 일을 알림|結果를 報告합니다.
hanja4|施設|시설|목적을 위한 설비|公共 施設을 깨끗이 씁니다.
hanja4|構造|구조|짜임새|文章의 構造를 분석합니다.
hanja3|經濟|경제|살림살이의 흐름|經濟 상황을 살핍니다.
hanja3|經營|경영|조직을 운영함|經營에는 판단력이 필요합니다.
hanja3|職業|직업|사람이 하는 일|職業을 선택합니다.
hanja3|職場|직장|일하는 곳|職場 예절을 지킵니다.
hanja3|事務|사무|맡아 처리하는 일|事務를 정확히 처리합니다.
hanja3|資源|자원|쓸 수 있는 바탕|資源을 아껴야 합니다.
hanja3|資本|자본|사업의 밑천|資本을 모아 사업을 시작합니다.
hanja3|生產|생산|물건을 만들어 냄|工場에서 물건을 生產합니다.
hanja3|消費|소비|재화를 씀|合理的 消費가 필요합니다.
hanja3|價格|가격|물건의 값|價格을 비교합니다.
hanja3|資格|자격|조건이나 능력|資格을 갖추어 지원합니다.
hanja3|數量|수량|수와 양|數量을 정확히 셉니다.
hanja3|品質|품질|물건의 질|品質이 좋은 물건을 고릅니다.
hanja3|輸送|수송|실어 나름|物資를 輸送합니다.
hanja3|貿易|무역|물건을 사고파는 교역|貿易은 나라 사이의 거래입니다.
hanja2|哲學|철학|삶과 세계를 탐구하는 학문|哲學은 깊은 질문에서 시작합니다.
hanja2|倫理|윤리|사람이 지켜야 할 도리|倫理는 옳고 그름을 따집니다.
hanja2|論理|논리|생각의 이치|論理가 맞아야 설득력이 있습니다.
hanja2|宗敎|종교|믿음의 체계|宗敎는 삶의 의미를 묻습니다.
hanja2|憲法|헌법|나라의 기본 법|憲法은 국민의 권리를 보장합니다.
hanja2|權利|권리|마땅히 누릴 힘|權利와 義務는 함께 갑니다.
hanja2|正義|정의|바른 도리|正義로운 사회를 바랍니다.
hanja2|義務|의무|해야 할 일|義務를 다하면 공동체가 유지됩니다.
hanja2|裁判|재판|법에 따른 판단|裁判은 증거를 바탕으로 합니다.
hanja2|判斷|판단|옳고 그름을 가림|判斷을 신중히 해야 합니다.
hanja2|訴訟|소송|법에 호소하는 절차|訴訟은 법적 다툼입니다.
hanja2|犯罪|범죄|법을 어긴 행위|犯罪를 예방해야 합니다.
hanja2|處罰|처벌|잘못에 벌을 줌|處罰은 법에 따라 이루어집니다.
hanja2|警察|경찰|질서를 지키는 기관|警察은 시민의 안전을 지킵니다.
hanja2|調査|조사|자세히 알아봄|事實을 調査합니다.
hanja1|憂鬱|우울|마음이 답답하고 어두움|憂鬱한 감정은 혼자 참지 않아야 합니다.
hanja1|憂慮|우려|걱정하고 염려함|事故 가능성을 憂慮합니다.
hanja1|考慮|고려|깊이 생각함|여러 조건을 考慮합니다.
hanja1|驚異|경이|매우 놀라움|自然의 아름다움에 驚異를 느낍니다.
hanja1|異常|이상|보통과 다름|기계에 異常이 생겼습니다.
hanja1|嚴格|엄격|매우 엄함|嚴格한 기준을 적용합니다.
hanja1|嚴肅|엄숙|말과 행동이 조심스러움|式場의 분위기가 嚴肅합니다.
hanja1|謙讓|겸양|자신을 낮추고 양보함|謙讓의 태도는 품격을 높입니다.
hanja1|讓步|양보|자기 뜻을 조금 물림|서로 讓步하여 문제를 풀었습니다.
hanja1|懇請|간청|간절히 부탁함|도움을 懇請했습니다.
hanja1|申請|신청|요청함|장학금을 申請합니다.
hanja1|顧客|고객|물건을 사러 오는 손님|顧客의 의견을 듣습니다.
hanja1|鑑賞|감상|작품을 보고 느낌|그림을 鑑賞합니다.
hanja1|犧牲|희생|남을 위해 손해를 감수함|犧牲 없이는 큰 성과가 어렵습니다.
hanja1|躊躇|주저|망설임|더 이상 躊躇하지 말고 결정합니다.
`.trim();

const EXTRA_WORD_BANK_RAW = `
elementary|animal|동물|The animal is small.
elementary|ant|개미|An ant is tiny.
elementary|baby|아기|The baby is sleeping.
elementary|ball|공|Throw the ball.
elementary|beach|해변|We play at the beach.
elementary|bear|곰|A bear is strong.
elementary|bed|침대|Go to bed early.
elementary|bell|종|The bell is loud.
elementary|boat|배|The boat is on the lake.
elementary|body|몸|Move your body.
elementary|box|상자|Open the box.
elementary|boy|소년|The boy runs fast.
elementary|breakfast|아침 식사|I eat breakfast.
elementary|brush|붓, 솔|Use a brush.
elementary|cake|케이크|The cake is sweet.
elementary|camera|카메라|Take a picture with a camera.
elementary|candy|사탕|Candy is sweet.
elementary|cap|모자|Wear a cap.
elementary|class|수업, 반|Class starts now.
elementary|clock|시계|Look at the clock.
elementary|coat|외투|Wear a coat.
elementary|cookie|쿠키|I want a cookie.
elementary|crayon|크레용|Draw with a crayon.
elementary|cup|컵|This cup is blue.
elementary|dance|춤추다|They dance together.
elementary|dinner|저녁 식사|Dinner is ready.
elementary|doll|인형|The doll is pretty.
elementary|dream|꿈|I had a dream.
elementary|duck|오리|A duck swims.
elementary|ear|귀|My ear hurts.
elementary|eye|눈|Close one eye.
elementary|face|얼굴|Wash your face.
elementary|farm|농장|We visited a farm.
elementary|finger|손가락|Point with your finger.
elementary|floor|바닥|Sit on the floor.
elementary|food|음식|This food is good.
elementary|frog|개구리|A frog can jump.
elementary|gift|선물|This is a gift.
elementary|girl|소녀|The girl sings.
elementary|glue|풀|Use glue carefully.
elementary|grape|포도|Grapes are purple.
elementary|hair|머리카락|Her hair is long.
elementary|hand|손|Raise your hand.
elementary|hat|모자|The hat is red.
elementary|head|머리|Touch your head.
elementary|hill|언덕|Climb the hill.
elementary|hospital|병원|Go to the hospital.
elementary|house|집|This house is big.
elementary|ice|얼음|Ice is cold.
elementary|juice|주스|I drink juice.
elementary|key|열쇠|Find the key.
elementary|kitchen|부엌|Mom is in the kitchen.
elementary|lake|호수|The lake is calm.
elementary|lamp|등|Turn on the lamp.
elementary|leg|다리|My leg is long.
elementary|lemon|레몬|A lemon is sour.
elementary|library|도서관|Read books in the library.
elementary|lion|사자|A lion is strong.
elementary|lunch|점심|Lunch is at noon.
elementary|mouth|입|Open your mouth.
elementary|nose|코|My nose is small.
elementary|notebook|공책|Write in your notebook.
elementary|orange|오렌지|An orange is round.
elementary|page|쪽|Turn the page.
elementary|pants|바지|These pants are long.
elementary|paper|종이|Fold the paper.
elementary|pencil|연필|Sharpen your pencil.
elementary|phone|전화기|The phone rings.
elementary|pig|돼지|A pig is pink.
elementary|plane|비행기|The plane flies.
elementary|plate|접시|Put food on the plate.
elementary|rabbit|토끼|A rabbit has long ears.
elementary|river|강|The river is wide.
elementary|robot|로봇|The robot moves.
elementary|ruler|자|Use a ruler.
elementary|salt|소금|Salt is white.
elementary|sand|모래|Sand is on the beach.
elementary|sea|바다|The sea is blue.
elementary|shirt|셔츠|This shirt is clean.
elementary|shoe|신발|Tie your shoe.
elementary|shop|가게|Go to the shop.
elementary|snake|뱀|A snake is long.
elementary|soap|비누|Wash with soap.
elementary|spoon|숟가락|Use a spoon.
elementary|street|거리|Walk on the street.
elementary|table|탁자|Put it on the table.
elementary|teeth|이|Brush your teeth.
elementary|tiger|호랑이|A tiger is fast.
elementary|toy|장난감|This toy is new.
elementary|umbrella|우산|Take an umbrella.
elementary|wall|벽|The wall is white.
elementary|watch|손목시계|I wear a watch.
elementary|zoo|동물원|We went to the zoo.
middle|absent|결석한|He was absent yesterday.
middle|accept|받아들이다|Accept the result.
middle|active|활동적인|She is active in class.
middle|actually|실제로|Actually, I agree.
middle|address|주소|Write your address.
middle|adult|어른|An adult should help.
middle|adventure|모험|The book is about an adventure.
middle|affect|영향을 미치다|Weather can affect mood.
middle|almost|거의|I almost finished.
middle|alone|혼자|He lives alone.
middle|along|~을 따라|Walk along the river.
middle|already|이미|I already know it.
middle|although|비록 ~이지만|Although it rained, we went out.
middle|amount|양|A small amount is enough.
middle|ancient|고대의|Ancient people used stone tools.
middle|anger|화|Control your anger.
middle|announce|발표하다|They announced the winner.
middle|another|또 다른|Try another way.
middle|anyway|어쨌든|Anyway, let's start.
middle|article|기사, 물품|Read the article.
middle|author|작가|The author wrote many books.
middle|average|평균|The average score was high.
middle|balance|균형|Keep your balance.
middle|basic|기본적인|Learn basic rules.
middle|battle|전투|The battle was short.
middle|behavior|행동|Good behavior matters.
middle|belong|속하다|This book belongs to me.
middle|beside|~옆에|Sit beside me.
middle|besides|게다가|Besides, it is cheap.
middle|beyond|~너머에|The village is beyond the hill.
middle|billion|십억|A billion is a large number.
middle|blank|빈칸|Fill in the blank.
middle|blood|피|Blood carries oxygen.
middle|board|판|Write on the board.
middle|bottom|바닥, 맨 아래|Look at the bottom.
middle|brain|뇌|The brain controls the body.
middle|breathe|숨 쉬다|Breathe slowly.
middle|bridge|다리|Cross the bridge.
middle|bright|밝은|The room is bright.
middle|burn|타다|Wood can burn.
middle|calm|침착한|Stay calm.
middle|capital|수도, 대문자|Seoul is the capital.
middle|career|직업, 경력|Choose your career.
middle|carry|나르다|Carry the box.
middle|center|중심|Stand in the center.
middle|century|세기|A century is 100 years.
middle|character|성격, 등장인물|The character is brave.
middle|charge|요금, 책임|There is no extra charge.
middle|chemical|화학의|A chemical reaction occurred.
middle|climate|기후|The climate is changing.
middle|college|대학|My brother goes to college.
middle|communicate|의사소통하다|People communicate with words.
middle|community|공동체|Help your community.
middle|competition|경쟁, 대회|The competition was difficult.
middle|concern|걱정, 관련|Health is my main concern.
middle|conversation|대화|We had a conversation.
middle|create|창조하다|Create a new design.
middle|damage|손상|The storm caused damage.
middle|danger|위험|Danger signs are red.
middle|deal|다루다|Deal with the problem.
middle|death|죽음|The story is about life and death.
middle|decision|결정|Make a decision.
middle|degree|정도, 도|The temperature rose by one degree.
middle|deliver|배달하다|Deliver the package.
middle|design|디자인하다|Design a poster.
middle|detail|세부 사항|Check the detail.
middle|direction|방향|Follow the direction.
middle|disease|질병|The disease spread quickly.
middle|distance|거리|Measure the distance.
middle|education|교육|Education changes lives.
middle|effect|영향, 효과|The effect was clear.
middle|electric|전기의|This is an electric car.
middle|element|요소|Water is an important element.
middle|emotion|감정|Music can show emotion.
middle|engine|엔진|The engine is loud.
middle|enter|들어가다|Enter the room.
middle|equal|같은|Two plus two equals four.
middle|escape|탈출하다|They escaped safely.
middle|exact|정확한|Give the exact answer.
middle|except|~을 제외하고|Everyone came except Tom.
middle|exercise|운동|Exercise every day.
middle|expect|기대하다|I expect good results.
middle|express|표현하다|Express your feelings.
middle|fail|실패하다|Do not fear to fail.
middle|field|들판, 분야|He works in this field.
middle|final|마지막의|This is the final test.
middle|force|힘|Gravity is a force.
middle|forest|숲|The forest is quiet.
middle|form|형태|Fill out the form.
middle|freedom|자유|Freedom is important.
middle|fresh|신선한|Fresh fruit tastes good.
middle|gain|얻다|Gain useful experience.
middle|general|일반적인|This is a general rule.
middle|government|정부|The government made a plan.
middle|grade|학년, 성적|What grade are you in?
middle|guard|지키다|Guard the gate.
middle|hero|영웅|The hero saved people.
middle|honest|정직한|Be honest.
middle|huge|거대한|The building is huge.
middle|human|인간|All humans need water.
middle|imagine|상상하다|Imagine a better world.
middle|immediately|즉시|Answer immediately.
middle|industry|산업|The industry is growing.
middle|instead|대신에|Use this instead.
middle|journey|여행|The journey was long.
middle|knowledge|지식|Knowledge grows by learning.
middle|labor|노동|Labor requires effort.
middle|law|법|Follow the law.
middle|level|수준|Choose your level.
middle|material|재료|Wood is a natural material.
middle|matter|문제, 물질|It does not matter.
middle|measure|측정하다|Measure the length.
middle|medicine|약|Take medicine carefully.
middle|nation|국가|Every nation has history.
middle|nature|자연|Nature is beautiful.
middle|neighbor|이웃|Help your neighbor.
middle|object|물건|The object is heavy.
middle|offer|제안하다|They offered help.
middle|peace|평화|We hope for peace.
middle|perfect|완벽한|Practice makes perfect.
middle|period|기간|This period was important.
middle|physical|신체의|Physical health matters.
middle|position|위치|Change your position.
middle|power|힘, 권력|Knowledge is power.
middle|proper|적절한|Use proper language.
middle|public|공공의|This is a public place.
middle|quality|질|Quality is more important than speed.
middle|raise|올리다, 기르다|Raise your hand.
middle|recent|최근의|This is recent news.
middle|record|기록|Keep a record.
middle|relationship|관계|Trust builds relationships.
middle|remain|남다|Please remain seated.
middle|reply|대답하다|Reply to the message.
middle|research|연구|Research takes time.
middle|resource|자원|Water is a resource.
middle|respect|존중하다|Respect other people.
middle|responsible|책임 있는|Be responsible for your work.
middle|science|과학|Science explains nature.
middle|search|찾다|Search for the answer.
middle|secret|비밀|Keep it a secret.
middle|select|선택하다|Select the best answer.
middle|several|몇몇의|Several students agreed.
middle|shape|모양|Draw a shape.
middle|share|나누다|Share your ideas.
middle|skill|기술|Practice builds skill.
middle|space|공간, 우주|There is enough space.
middle|stage|무대, 단계|This is the first stage.
middle|standard|기준|Set a high standard.
middle|stomach|위, 배|My stomach hurts.
middle|surface|표면|The surface is smooth.
middle|symbol|상징|A heart is a symbol of love.
middle|temperature|온도|Check the temperature.
middle|therefore|그러므로|Therefore, we must act.
middle|traffic|교통|Traffic is heavy.
middle|tradition|전통|This is a family tradition.
middle|universe|우주|The universe is huge.
middle|unless|~하지 않는다면|Unless you hurry, you will be late.
middle|vehicle|탈것|A bus is a vehicle.
middle|village|마을|The village is small.
middle|weather|날씨|The weather is nice.
middle|whether|~인지 아닌지|I do not know whether he will come.
middle|whole|전체의|Read the whole story.
high|abandon|버리다|Do not abandon your goal.
high|absolute|절대적인|There is no absolute answer.
high|absorb|흡수하다|Plants absorb water.
high|access|접근|The site gives free access.
high|accompany|동행하다|A teacher accompanied the students.
high|accumulate|축적하다|Knowledge accumulates over time.
high|acknowledge|인정하다|Acknowledge your mistake.
high|acquire|얻다|Acquire a new skill.
high|advocate|옹호하다|They advocate equal rights.
high|allocate|배분하다|Allocate time wisely.
high|alternative|대안|Find an alternative solution.
high|ambiguous|애매한|The sentence is ambiguous.
high|annual|매년의|The annual event is popular.
high|anticipate|예상하다|Anticipate possible problems.
high|apparent|명백한|The difference is apparent.
high|approximately|대략|It takes approximately one hour.
high|arbitrary|임의의|The choice was arbitrary.
high|aspect|측면|Consider every aspect.
high|assemble|모으다, 조립하다|Assemble the parts.
high|assess|평가하다|Assess the risk.
high|assign|배정하다|Assign each student a role.
high|assist|돕다|Assist the elderly.
high|associate|연관짓다|People associate spring with flowers.
high|attribute|속성, 원인으로 보다|They attribute success to effort.
high|authority|권위|The authority made a decision.
high|available|이용 가능한|The book is available online.
high|aware|알고 있는|Be aware of the rules.
high|bias|편견|Avoid bias in judgment.
high|capacity|능력, 용량|The hall has a large capacity.
high|category|범주|Put words into a category.
high|cease|중단하다|The noise ceased.
high|circumstance|상황|Consider the circumstance.
high|civil|시민의|Civil rights are important.
high|clarify|명확히 하다|Clarify your meaning.
high|coherent|일관성 있는|Write a coherent paragraph.
high|coincide|동시에 일어나다|The events coincide.
high|commit|저지르다, 전념하다|Commit to your plan.
high|compatible|양립 가능한|The parts are compatible.
high|compensate|보상하다|They compensated the worker.
high|complement|보완하다|The colors complement each other.
high|comprehensive|포괄적인|Read a comprehensive guide.
high|comprise|구성하다|The team comprises five members.
high|concentrate|집중하다|Concentrate on the task.
high|confer|수여하다, 의논하다|They confer a prize.
high|conflict|갈등|The conflict continued.
high|consent|동의|Get consent first.
high|considerable|상당한|It took considerable effort.
high|constitute|구성하다|These facts constitute evidence.
high|consume|소비하다|Cars consume fuel.
high|contemporary|현대의|Contemporary art is diverse.
high|contradict|모순되다|The facts contradict the claim.
high|conventional|전통적인|This is a conventional method.
high|coordinate|조정하다|Coordinate the schedule.
high|core|핵심|Find the core idea.
high|correspond|일치하다|The numbers correspond.
high|crisis|위기|The crisis required action.
high|decline|감소하다, 거절하다|Sales declined.
high|dedicate|바치다|Dedicate time to study.
high|define|정의하다|Define the term.
high|demonstrate|보여주다|Demonstrate the method.
high|deny|부인하다|He denied the claim.
high|depression|우울, 불황|The economy faced depression.
high|dimension|차원, 크기|Measure each dimension.
high|diminish|줄어들다|The sound diminished.
high|discipline|훈련, 학문 분야|Discipline helps learning.
high|diverse|다양한|The group is diverse.
high|domestic|국내의|Domestic flights are shorter.
high|dominant|지배적인|The dominant idea changed.
high|eliminate|제거하다|Eliminate wrong answers.
high|empirical|경험적인|Use empirical evidence.
high|equivalent|동등한|The two values are equivalent.
high|ethical|윤리적인|Make an ethical choice.
high|eventually|결국|Eventually, he succeeded.
high|exclude|제외하다|Exclude unrelated details.
high|exhibit|보여주다|The results exhibit a pattern.
high|explicit|명시적인|Give explicit instructions.
high|external|외부의|External factors matter.
high|facilitate|촉진하다|Tools facilitate learning.
high|fundamental|근본적인|This is a fundamental issue.
high|furthermore|게다가|Furthermore, it saves time.
high|hierarchy|계층|The company has a hierarchy.
high|highlight|강조하다|Highlight the key sentence.
high|identical|동일한|The twins look identical.
high|ideology|이념|Ideology shapes politics.
high|implicit|암시적인|The message was implicit.
high|incentive|동기, 장려책|Rewards can be an incentive.
high|inevitable|불가피한|Change is inevitable.
high|infer|추론하다|Infer the meaning.
high|infrastructure|기반 시설|Roads are infrastructure.
high|initial|초기의|The initial plan changed.
high|innovate|혁신하다|Companies must innovate.
high|insight|통찰|The book gives insight.
high|integrate|통합하다|Integrate the data.
high|interval|간격|Review at intervals.
high|intrinsic|본질적인|Learning has intrinsic value.
high|investigate|조사하다|Investigate the cause.
high|justify|정당화하다|Justify your answer.
high|layer|층|Add another layer.
high|likewise|마찬가지로|Likewise, we agreed.
high|logic|논리|Use clear logic.
high|mechanism|장치, 구조|Explain the mechanism.
high|mediate|중재하다|A teacher mediated the dispute.
high|mental|정신의|Mental health matters.
high|mutual|상호의|They have mutual respect.
high|neutral|중립의|Stay neutral.
high|nonetheless|그럼에도 불구하고|Nonetheless, she continued.
high|objective|객관적인, 목표|Use objective evidence.
high|occupy|차지하다|The desk occupies space.
high|option|선택지|Choose the best option.
high|orient|방향을 맞추다|Orient the map.
high|outcome|결과|The outcome was positive.
high|overall|전반적인|The overall result improved.
high|parallel|평행의|Draw parallel lines.
high|phase|단계|The project entered a new phase.
high|plus|게다가, 더하기|Plus, it is free.
high|policy|정책|The policy changed.
high|portion|부분|Eat a small portion.
high|precede|앞서다|Cause can precede effect.
high|precise|정확한|Use precise language.
high|predict|예측하다|Predict the result.
high|preserve|보존하다|Preserve old buildings.
high|priority|우선순위|Set your priority.
high|proceed|진행하다|Proceed to the next step.
high|project|계획, 프로젝트|The project takes a month.
high|proportion|비율|Check the proportion.
high|protocol|절차|Follow the protocol.
high|radical|근본적인|They proposed radical change.
high|rational|합리적인|Make a rational decision.
high|recover|회복하다|Recover from illness.
high|regulate|규제하다|Rules regulate behavior.
high|reinforce|강화하다|Review reinforces memory.
high|reject|거절하다|Reject the false idea.
high|release|풀어주다, 발표하다|They released the report.
high|resolve|해결하다|Resolve the issue.
high|retain|유지하다|Retain important facts.
high|reveal|드러내다|The test revealed the truth.
high|reverse|뒤집다|Reverse the order.
high|scheme|계획|The scheme failed.
high|sequence|순서|Put events in sequence.
high|shift|바꾸다|Opinions can shift.
high|simulate|모의 실험하다|Simulate the process.
high|sole|유일한|This is the sole reason.
high|stable|안정적인|The system is stable.
high|statistic|통계|Use a statistic.
high|strategy|전략|Make a strategy.
high|substitute|대체하다|Substitute one word.
high|sum|합계|Find the sum.
high|suspend|중단하다|Suspend the meeting.
high|symbolic|상징적인|The act was symbolic.
high|tension|긴장|Tension increased.
high|terminate|끝내다|Terminate the contract.
high|text|본문|Read the text carefully.
high|theme|주제|Find the theme.
high|trace|추적하다|Trace the origin.
high|transfer|옮기다|Transfer the file.
high|trigger|유발하다|Stress can trigger headaches.
high|undergo|겪다|The city underwent change.
high|undertake|맡다|Undertake a difficult task.
high|uniform|일정한, 제복|The results were uniform.
high|unique|독특한|This is a unique case.
high|utilize|활용하다|Utilize available tools.
high|version|판, 버전|Install the latest version.
high|via|~을 통해|Send it via email.
high|violate|위반하다|Do not violate the rule.
high|virtual|가상의|We had a virtual meeting.
high|volume|양, 부피|Turn down the volume.
high|welfare|복지|Public welfare matters.
high|witness|목격자|The witness spoke clearly.
`.trim();

function makeFallbackExample(word) {
  return `I study the word "${word}".`;
}

function makeFallbackExampleKo(word) {
  return `나는 "${word}"라는 단어를 공부합니다.`;
}

const englishWords = WORD_BANK_RAW.split("\n").map((line, index) => {
  const [level, word, meaning, example, exampleKo] = line.split("|");
  const cardExample = exampleKo ? example : makeFallbackExample(word);
  return {
    id: `english-${level}-${index}-${word}`,
    type: "english",
    level,
    term: word,
    word,
    meaning,
    example: cardExample,
    exampleKo: exampleKo || makeFallbackExampleKo(word)
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

const extendedHanjaWords = Object.entries(HANJA_LEVEL_PACKS).flatMap(([level, words]) =>
  words.map(([character, reading, meaning, example], index) => ({
    id: `hanja-pack-${level}-${index}-${character}`,
    type: "hanja",
    level,
    term: character,
    word: character,
    reading,
    meaning: `${reading} / ${meaning}`,
    example
  }))
);

const hanjaExamWords = HANJA_EXAM_WORDS_RAW.split("\n").map((line, index) => {
  const [level, word, reading, meaning, example] = line.split("|");
  return {
    id: `hanja-exam-${level}-${index}-${word}`,
    type: "hanja",
    level,
    term: word,
    word,
    reading,
    meaning: `${reading} / ${meaning}`,
    example
  };
});

const extraEnglishWords = EXTRA_WORD_BANK_RAW.split("\n").map((line, index) => {
  const [level, word, meaning, example, exampleKo] = line.split("|");
  const cardExample = exampleKo ? example : makeFallbackExample(word);
  return {
    id: `english-extra-${level}-${index}-${word}`,
    type: "english",
    level,
    term: word,
    word,
    meaning,
    example: cardExample,
    exampleKo: exampleKo || makeFallbackExampleKo(word)
  };
});

const ENGLISH_TARGET_PER_LEVEL = 1000;

const ENGLISH_SUPPLEMENT_PARTS = {
  elementary: {
    colors: [
      ["red", "빨간"], ["blue", "파란"], ["green", "초록색"], ["yellow", "노란"], ["black", "검은"],
      ["white", "하얀"], ["brown", "갈색"], ["pink", "분홍색"], ["purple", "보라색"], ["orange", "주황색"]
    ],
    adjectives: [
      ["big", "큰"], ["small", "작은"], ["long", "긴"], ["short", "짧은"], ["new", "새로운"],
      ["old", "오래된"], ["clean", "깨끗한"], ["warm", "따뜻한"], ["cold", "차가운"], ["happy", "행복한"]
    ],
    nouns: [
      ["apple", "사과"], ["bag", "가방"], ["ball", "공"], ["bed", "침대"], ["bike", "자전거"],
      ["bird", "새"], ["book", "책"], ["box", "상자"], ["bus", "버스"], ["cake", "케이크"],
      ["car", "자동차"], ["cat", "고양이"], ["chair", "의자"], ["clock", "시계"], ["cup", "컵"],
      ["desk", "책상"], ["dog", "개"], ["door", "문"], ["egg", "달걀"], ["fish", "물고기"],
      ["flower", "꽃"], ["friend", "친구"], ["game", "게임"], ["house", "집"], ["key", "열쇠"],
      ["kite", "연"], ["lamp", "등"], ["map", "지도"], ["milk", "우유"], ["notebook", "공책"],
      ["pencil", "연필"], ["phone", "전화기"], ["picture", "그림"], ["rabbit", "토끼"], ["river", "강"],
      ["road", "길"], ["school", "학교"], ["shirt", "셔츠"], ["shoe", "신발"], ["spoon", "숟가락"],
      ["star", "별"], ["table", "탁자"], ["teacher", "선생님"], ["toy", "장난감"], ["tree", "나무"],
      ["umbrella", "우산"], ["window", "창문"], ["zoo", "동물원"]
    ],
    verbs: [
      ["read", "읽다"], ["write", "쓰다"], ["open", "열다"], ["close", "닫다"], ["draw", "그리다"],
      ["make", "만들다"], ["find", "찾다"], ["wash", "씻다"], ["carry", "나르다"], ["watch", "보다"],
      ["touch", "만지다"], ["clean", "청소하다"], ["help", "돕다"], ["count", "세다"], ["color", "색칠하다"]
    ]
  },
  middle: {
    adjectives: [
      ["active", "활동적인"], ["basic", "기본적인"], ["careful", "조심스러운"], ["clear", "명확한"],
      ["common", "흔한"], ["correct", "올바른"], ["difficult", "어려운"], ["direct", "직접적인"],
      ["effective", "효과적인"], ["equal", "동등한"], ["exact", "정확한"], ["fair", "공정한"],
      ["familiar", "익숙한"], ["general", "일반적인"], ["healthy", "건강한"], ["honest", "정직한"],
      ["important", "중요한"], ["local", "지역의"], ["natural", "자연스러운"], ["necessary", "필요한"],
      ["ordinary", "보통의"], ["personal", "개인의"], ["popular", "인기 있는"], ["proper", "적절한"],
      ["public", "공공의"], ["recent", "최근의"], ["regular", "규칙적인"], ["serious", "심각한"],
      ["simple", "간단한"], ["social", "사회적인"], ["special", "특별한"], ["useful", "유용한"]
    ],
    nouns: [
      ["ability", "능력"], ["accident", "사고"], ["activity", "활동"], ["advice", "조언"], ["area", "지역"],
      ["attention", "주의"], ["balance", "균형"], ["behavior", "행동"], ["choice", "선택"], ["community", "공동체"],
      ["condition", "상태"], ["culture", "문화"], ["decision", "결정"], ["detail", "세부 사항"], ["difference", "차이"],
      ["direction", "방향"], ["education", "교육"], ["effect", "효과"], ["effort", "노력"], ["environment", "환경"],
      ["event", "사건"], ["experience", "경험"], ["fact", "사실"], ["field", "분야"], ["habit", "습관"],
      ["health", "건강"], ["history", "역사"], ["information", "정보"], ["interest", "관심"], ["knowledge", "지식"],
      ["language", "언어"], ["material", "재료"], ["method", "방법"], ["nation", "국가"], ["opinion", "의견"],
      ["period", "기간"], ["problem", "문제"], ["purpose", "목적"], ["reason", "이유"], ["record", "기록"],
      ["relationship", "관계"], ["resource", "자원"], ["result", "결과"], ["science", "과학"], ["solution", "해결책"],
      ["standard", "기준"], ["symbol", "상징"], ["technology", "기술"], ["tradition", "전통"], ["vehicle", "탈것"]
    ],
    verbs: [
      ["accept", "받아들이다"], ["achieve", "이루다"], ["allow", "허락하다"], ["avoid", "피하다"],
      ["borrow", "빌리다"], ["compare", "비교하다"], ["complete", "완성하다"], ["connect", "연결하다"],
      ["consider", "고려하다"], ["continue", "계속하다"], ["create", "창조하다"], ["decide", "결정하다"],
      ["describe", "묘사하다"], ["develop", "발달시키다"], ["discover", "발견하다"], ["discuss", "토론하다"],
      ["explain", "설명하다"], ["express", "표현하다"], ["improve", "향상시키다"], ["include", "포함하다"],
      ["increase", "증가시키다"], ["invite", "초대하다"], ["measure", "측정하다"], ["prepare", "준비하다"],
      ["protect", "보호하다"], ["receive", "받다"], ["reduce", "줄이다"], ["remember", "기억하다"],
      ["respect", "존중하다"], ["support", "지원하다"]
    ]
  },
  high: {
    adjectives: [
      ["abstract", "추상적인"], ["accurate", "정확한"], ["adequate", "충분한"], ["ambiguous", "애매한"],
      ["annual", "매년의"], ["apparent", "명백한"], ["arbitrary", "임의의"], ["available", "이용 가능한"],
      ["civil", "시민의"], ["coherent", "일관성 있는"], ["compatible", "양립 가능한"], ["complex", "복잡한"],
      ["comprehensive", "포괄적인"], ["considerable", "상당한"], ["contemporary", "현대의"], ["conventional", "전통적인"],
      ["crucial", "중대한"], ["diverse", "다양한"], ["dominant", "지배적인"], ["ethical", "윤리적인"],
      ["explicit", "명시적인"], ["external", "외부의"], ["flexible", "유연한"], ["fundamental", "근본적인"],
      ["identical", "동일한"], ["implicit", "암시적인"], ["inevitable", "불가피한"], ["initial", "초기의"],
      ["intrinsic", "본질적인"], ["logical", "논리적인"], ["mental", "정신적인"], ["mutual", "상호의"],
      ["neutral", "중립적인"], ["objective", "객관적인"], ["parallel", "평행한"], ["potential", "잠재적인"],
      ["precise", "정밀한"], ["rational", "합리적인"], ["relevant", "관련 있는"], ["reliable", "신뢰할 수 있는"],
      ["significant", "중요한"], ["stable", "안정적인"], ["temporary", "일시적인"], ["unique", "독특한"],
      ["valid", "타당한"], ["virtual", "가상의"]
    ],
    nouns: [
      ["access", "접근"], ["approach", "접근법"], ["aspect", "측면"], ["attribute", "속성"], ["authority", "권위"],
      ["bias", "편견"], ["capacity", "능력"], ["category", "범주"], ["circumstance", "상황"], ["concept", "개념"],
      ["conflict", "갈등"], ["consent", "동의"], ["consequence", "결과"], ["context", "맥락"], ["controversy", "논란"],
      ["core", "핵심"], ["criteria", "기준"], ["crisis", "위기"], ["dimension", "차원"], ["discipline", "학문 분야"],
      ["evidence", "증거"], ["factor", "요인"], ["feature", "특징"], ["function", "기능"], ["hierarchy", "계층"],
      ["hypothesis", "가설"], ["ideology", "이념"], ["impact", "영향"], ["incentive", "동기"], ["infrastructure", "기반 시설"],
      ["insight", "통찰"], ["interval", "간격"], ["logic", "논리"], ["mechanism", "구조"], ["outcome", "결과"],
      ["perspective", "관점"], ["phase", "단계"], ["policy", "정책"], ["priority", "우선순위"], ["proportion", "비율"],
      ["protocol", "절차"], ["resource", "자원"], ["scheme", "계획"], ["sequence", "순서"], ["strategy", "전략"],
      ["survey", "조사"], ["tension", "긴장"], ["theory", "이론"], ["transition", "전환"], ["welfare", "복지"]
    ],
    verbs: [
      ["abandon", "버리다"], ["absorb", "흡수하다"], ["accompany", "동행하다"], ["accumulate", "축적하다"],
      ["acknowledge", "인정하다"], ["acquire", "얻다"], ["advocate", "옹호하다"], ["allocate", "배분하다"],
      ["anticipate", "예상하다"], ["assemble", "조립하다"], ["assess", "평가하다"], ["assign", "배정하다"],
      ["clarify", "명확히 하다"], ["compensate", "보상하다"], ["comprise", "구성하다"], ["concentrate", "집중하다"],
      ["contradict", "모순되다"], ["coordinate", "조정하다"], ["demonstrate", "보여주다"], ["derive", "얻다"],
      ["detect", "감지하다"], ["determine", "결정하다"], ["eliminate", "제거하다"], ["establish", "설립하다"],
      ["evaluate", "평가하다"], ["exclude", "제외하다"], ["facilitate", "촉진하다"], ["generate", "생성하다"],
      ["identify", "식별하다"], ["implement", "실행하다"], ["imply", "암시하다"], ["indicate", "나타내다"],
      ["integrate", "통합하다"], ["interpret", "해석하다"], ["investigate", "조사하다"], ["justify", "정당화하다"],
      ["maintain", "유지하다"], ["modify", "수정하다"], ["obtain", "얻다"], ["occupy", "차지하다"],
      ["preserve", "보존하다"], ["proceed", "진행하다"], ["regulate", "규제하다"], ["reinforce", "강화하다"],
      ["resolve", "해결하다"], ["restrict", "제한하다"], ["simulate", "모의 실험하다"], ["sustain", "유지하다"],
      ["transform", "변형시키다"], ["undergo", "겪다"], ["utilize", "활용하다"], ["violate", "위반하다"]
    ]
  }
};

const ENGLISH_SINGLE_WORD_SUPPLEMENTS_RAW = `
elementary|noun|baby|아기
elementary|noun|boy|소년
elementary|noun|girl|소녀
elementary|noun|child|아이
elementary|noun|kid|아이
elementary|noun|man|남자
elementary|noun|woman|여자
elementary|noun|people|사람들
elementary|noun|person|사람
elementary|noun|name|이름
elementary|noun|age|나이
elementary|noun|face|얼굴
elementary|noun|head|머리
elementary|noun|hair|머리카락
elementary|noun|eye|눈
elementary|noun|ear|귀
elementary|noun|nose|코
elementary|noun|mouth|입
elementary|noun|hand|손
elementary|noun|arm|팔
elementary|noun|leg|다리
elementary|noun|foot|발
elementary|noun|body|몸
elementary|noun|food|음식
elementary|noun|fruit|과일
elementary|noun|meat|고기
elementary|noun|soup|수프
elementary|noun|juice|주스
elementary|noun|cookie|쿠키
elementary|noun|candy|사탕
elementary|noun|breakfast|아침 식사
elementary|noun|lunch|점심
elementary|noun|dinner|저녁 식사
elementary|noun|park|공원
elementary|noun|store|가게
elementary|noun|market|시장
elementary|noun|farm|농장
elementary|noun|beach|해변
elementary|noun|mountain|산
elementary|noun|lake|호수
elementary|noun|sea|바다
elementary|noun|town|마을
elementary|noun|city|도시
elementary|noun|street|거리
elementary|noun|garden|정원
elementary|noun|class|수업
elementary|noun|lesson|수업
elementary|noun|test|시험
elementary|noun|paper|종이
elementary|noun|ruler|자
elementary|noun|eraser|지우개
elementary|noun|crayon|크레용
elementary|noun|paint|물감
elementary|noun|music|음악
elementary|noun|song|노래
elementary|noun|dance|춤
elementary|noun|soccer|축구
elementary|noun|baseball|야구
elementary|noun|basketball|농구
elementary|noun|tennis|테니스
elementary|noun|photo|사진
elementary|noun|computer|컴퓨터
elementary|noun|robot|로봇
elementary|noun|plane|비행기
elementary|noun|train|기차
elementary|noun|ship|배
elementary|noun|boat|보트
elementary|noun|taxi|택시
elementary|noun|subway|지하철
elementary|noun|ticket|표
elementary|noun|money|돈
elementary|noun|gift|선물
elementary|noun|party|파티
elementary|noun|birthday|생일
elementary|noun|holiday|휴일
elementary|noun|week|주
elementary|noun|month|달
elementary|noun|year|해
elementary|noun|morning|아침
elementary|noun|afternoon|오후
elementary|noun|evening|저녁
elementary|noun|night|밤
elementary|noun|today|오늘
elementary|noun|tomorrow|내일
elementary|noun|yesterday|어제
elementary|noun|weather|날씨
elementary|noun|rain|비
elementary|noun|snow|눈
elementary|noun|wind|바람
elementary|noun|cloud|구름
elementary|noun|air|공기
elementary|noun|animal|동물
elementary|noun|ant|개미
elementary|noun|bear|곰
elementary|noun|bee|벌
elementary|noun|butterfly|나비
elementary|noun|camel|낙타
elementary|noun|chicken|닭
elementary|noun|deer|사슴
elementary|noun|duck|오리
elementary|noun|elephant|코끼리
elementary|noun|frog|개구리
elementary|noun|goat|염소
elementary|noun|lion|사자
elementary|noun|monkey|원숭이
elementary|noun|mouse|쥐
elementary|noun|pig|돼지
elementary|noun|sheep|양
elementary|noun|snake|뱀
elementary|noun|tiger|호랑이
elementary|noun|whale|고래
elementary|noun|bear|곰
elementary|noun|cheese|치즈
elementary|noun|chocolate|초콜릿
elementary|noun|coffee|커피
elementary|noun|corn|옥수수
elementary|noun|grape|포도
elementary|noun|honey|꿀
elementary|noun|lemon|레몬
elementary|noun|orange|오렌지
elementary|noun|peach|복숭아
elementary|noun|potato|감자
elementary|noun|salt|소금
elementary|noun|sugar|설탕
elementary|noun|tomato|토마토
elementary|noun|vegetable|채소
elementary|noun|wallet|지갑
elementary|noun|watch|손목시계
elementary|noun|cap|모자
elementary|noun|coat|외투
elementary|noun|dress|드레스
elementary|noun|glove|장갑
elementary|noun|hat|모자
elementary|noun|jacket|재킷
elementary|noun|pants|바지
elementary|noun|skirt|치마
elementary|noun|sock|양말
elementary|noun|sweater|스웨터
elementary|noun|camera|카메라
elementary|noun|radio|라디오
elementary|noun|television|텔레비전
elementary|noun|video|동영상
elementary|noun|piano|피아노
elementary|noun|guitar|기타
elementary|noun|drum|북
elementary|noun|violin|바이올린
elementary|noun|bridge|다리
elementary|noun|castle|성
elementary|noun|church|교회
elementary|noun|hospital|병원
elementary|noun|library|도서관
elementary|noun|museum|박물관
elementary|noun|office|사무실
elementary|noun|restaurant|식당
elementary|noun|station|역
elementary|noun|bank|은행
elementary|noun|corner|모퉁이
elementary|noun|floor|바닥
elementary|noun|gate|문
elementary|noun|ground|땅
elementary|noun|hole|구멍
elementary|noun|line|선
elementary|noun|page|쪽
elementary|noun|side|쪽
elementary|noun|top|꼭대기
elementary|noun|bottom|바닥
elementary|noun|center|중심
elementary|noun|circle|원
elementary|noun|square|정사각형
elementary|noun|triangle|삼각형
elementary|noun|number|숫자
elementary|noun|letter|글자
elementary|noun|word|단어
elementary|noun|story|이야기
elementary|noun|question|질문
elementary|noun|answer|대답
elementary|noun|dream|꿈
elementary|noun|idea|생각
elementary|noun|job|일
elementary|noun|problem|문제
elementary|noun|secret|비밀
elementary|noun|team|팀
elementary|noun|world|세계
elementary|noun|hope|희망
elementary|noun|luck|행운
elementary|noun|peace|평화
elementary|noun|health|건강
elementary|noun|sound|소리
elementary|noun|light|빛
elementary|verb|go|가다
elementary|verb|come|오다
elementary|verb|run|달리다
elementary|verb|walk|걷다
elementary|verb|jump|뛰다
elementary|verb|sit|앉다
elementary|verb|stand|서다
elementary|verb|eat|먹다
elementary|verb|drink|마시다
elementary|verb|sleep|자다
elementary|verb|wake|깨다
elementary|verb|smile|웃다
elementary|verb|laugh|웃다
elementary|verb|cry|울다
elementary|verb|listen|듣다
elementary|verb|speak|말하다
elementary|verb|say|말하다
elementary|verb|tell|말하다
elementary|verb|ask|묻다
elementary|verb|answer|대답하다
elementary|verb|learn|배우다
elementary|verb|study|공부하다
elementary|verb|teach|가르치다
elementary|verb|play|놀다
elementary|verb|sing|노래하다
elementary|verb|dance|춤추다
elementary|verb|cook|요리하다
elementary|verb|buy|사다
elementary|verb|sell|팔다
elementary|verb|give|주다
elementary|verb|get|얻다
elementary|verb|take|가져가다
elementary|verb|bring|가져오다
elementary|verb|use|사용하다
elementary|verb|need|필요하다
elementary|verb|like|좋아하다
elementary|verb|love|사랑하다
elementary|verb|want|원하다
elementary|verb|live|살다
elementary|verb|visit|방문하다
elementary|verb|travel|여행하다
elementary|verb|turn|돌다
elementary|verb|move|움직이다
elementary|verb|stop|멈추다
elementary|verb|start|시작하다
elementary|verb|finish|끝내다
elementary|verb|wait|기다리다
elementary|verb|try|시도하다
elementary|verb|call|부르다
elementary|verb|show|보여주다
elementary|verb|break|깨다
elementary|verb|catch|잡다
elementary|verb|climb|오르다
elementary|verb|cut|자르다
elementary|verb|drop|떨어뜨리다
elementary|verb|fly|날다
elementary|verb|forget|잊다
elementary|verb|grow|자라다
elementary|verb|hear|듣다
elementary|verb|hide|숨다
elementary|verb|hit|치다
elementary|verb|hope|바라다
elementary|verb|keep|유지하다
elementary|verb|kick|차다
elementary|verb|meet|만나다
elementary|verb|miss|놓치다
elementary|verb|paint|칠하다
elementary|verb|pick|고르다
elementary|verb|push|밀다
elementary|verb|pull|당기다
elementary|verb|put|놓다
elementary|verb|ride|타다
elementary|verb|send|보내다
elementary|verb|share|나누다
elementary|verb|skate|스케이트를 타다
elementary|verb|ski|스키를 타다
elementary|verb|swim|수영하다
elementary|verb|throw|던지다
elementary|verb|wear|입다
elementary|verb|win|이기다
elementary|adjective|fast|빠른
elementary|adjective|slow|느린
elementary|adjective|easy|쉬운
elementary|adjective|hard|어려운
elementary|adjective|good|좋은
elementary|adjective|bad|나쁜
elementary|adjective|nice|멋진
elementary|adjective|kind|친절한
elementary|adjective|funny|재미있는
elementary|adjective|quiet|조용한
elementary|adjective|loud|시끄러운
elementary|adjective|bright|밝은
elementary|adjective|dark|어두운
elementary|adjective|sweet|달콤한
elementary|adjective|hot|뜨거운
elementary|adjective|cool|시원한
elementary|adjective|young|어린
elementary|adjective|tall|키가 큰
elementary|adjective|strong|강한
elementary|adjective|weak|약한
middle|noun|account|계정
middle|noun|advantage|장점
middle|noun|agreement|동의
middle|noun|amount|양
middle|noun|argument|논쟁
middle|noun|article|기사
middle|noun|audience|청중
middle|noun|background|배경
middle|noun|border|경계
middle|noun|brain|뇌
middle|noun|career|직업
middle|noun|cause|원인
middle|noun|challenge|도전
middle|noun|chance|기회
middle|noun|character|성격
middle|noun|climate|기후
middle|noun|conversation|대화
middle|noun|custom|관습
middle|noun|damage|손상
middle|noun|degree|정도
middle|noun|disease|질병
middle|noun|distance|거리
middle|noun|energy|에너지
middle|noun|engine|엔진
middle|noun|entrance|입구
middle|noun|example|예
middle|noun|exercise|운동
middle|noun|figure|인물
middle|noun|future|미래
middle|noun|goal|목표
middle|noun|government|정부
middle|noun|growth|성장
middle|noun|guide|안내자
middle|noun|industry|산업
middle|noun|instrument|도구
middle|noun|memory|기억
middle|noun|mind|마음
middle|noun|moment|순간
middle|noun|nature|자연
middle|noun|noise|소음
middle|noun|notice|공지
middle|noun|object|물건
middle|noun|order|순서
middle|noun|planet|행성
middle|noun|population|인구
middle|noun|price|가격
middle|noun|project|과제
middle|noun|quality|질
middle|noun|rule|규칙
middle|noun|safety|안전
middle|noun|section|부분
middle|noun|shape|모양
middle|noun|signal|신호
middle|noun|skill|기술
middle|noun|society|사회
middle|noun|speech|연설
middle|noun|surface|표면
middle|noun|system|체계
middle|noun|task|일
middle|noun|value|가치
middle|noun|waste|낭비
middle|verb|advise|조언하다
middle|verb|agree|동의하다
middle|verb|arrive|도착하다
middle|verb|believe|믿다
middle|verb|belong|속하다
middle|verb|build|짓다
middle|verb|change|변하다
middle|verb|choose|고르다
middle|verb|collect|모으다
middle|verb|control|통제하다
middle|verb|cross|건너다
middle|verb|depend|의존하다
middle|verb|design|설계하다
middle|verb|divide|나누다
middle|verb|enter|들어가다
middle|verb|fail|실패하다
middle|verb|follow|따르다
middle|verb|happen|일어나다
middle|verb|hold|잡다
middle|verb|imagine|상상하다
middle|verb|join|참여하다
middle|verb|lead|이끌다
middle|verb|leave|떠나다
middle|verb|lose|잃다
middle|verb|manage|관리하다
middle|verb|mean|의미하다
middle|verb|offer|제공하다
middle|verb|pass|지나가다
middle|verb|produce|생산하다
middle|verb|provide|제공하다
middle|verb|raise|올리다
middle|verb|reach|도달하다
middle|verb|remain|남다
middle|verb|return|돌아오다
middle|verb|save|구하다
middle|verb|seem|보이다
middle|verb|share|나누다
middle|verb|solve|풀다
middle|verb|spend|쓰다
middle|verb|suggest|제안하다
middle|verb|train|훈련하다
middle|verb|understand|이해하다
middle|verb|win|이기다
middle|verb|add|더하다
middle|verb|admit|인정하다
middle|verb|appear|나타나다
middle|verb|argue|주장하다
middle|verb|attack|공격하다
middle|verb|belong|속하다
middle|verb|care|돌보다
middle|verb|compare|비교하다
middle|verb|complain|불평하다
middle|verb|continue|계속하다
middle|verb|cover|덮다
middle|verb|deliver|배달하다
middle|verb|describe|묘사하다
middle|verb|develop|발달하다
middle|verb|discuss|토론하다
middle|verb|explain|설명하다
middle|verb|express|표현하다
middle|verb|guess|추측하다
middle|verb|improve|향상시키다
middle|verb|include|포함하다
middle|verb|increase|증가하다
middle|verb|invent|발명하다
middle|verb|invite|초대하다
middle|verb|measure|측정하다
middle|verb|notice|알아차리다
middle|verb|prefer|선호하다
middle|verb|prepare|준비하다
middle|verb|protect|보호하다
middle|verb|realize|깨닫다
middle|verb|receive|받다
middle|verb|reduce|줄이다
middle|verb|remember|기억하다
middle|verb|repair|수리하다
middle|verb|repeat|반복하다
middle|verb|report|보고하다
middle|verb|respect|존중하다
middle|verb|review|복습하다
middle|verb|search|찾다
middle|verb|select|선택하다
middle|verb|separate|분리하다
middle|verb|serve|제공하다
middle|verb|support|지원하다
middle|verb|surprise|놀라게 하다
middle|verb|trust|신뢰하다
middle|verb|worry|걱정하다
middle|verb|achieve|이루다
middle|verb|allow|허락하다
middle|verb|avoid|피하다
middle|verb|borrow|빌리다
middle|verb|celebrate|기념하다
middle|verb|communicate|소통하다
middle|verb|complete|완성하다
middle|verb|connect|연결하다
middle|verb|consider|고려하다
middle|verb|create|창조하다
middle|verb|decide|결정하다
middle|verb|discover|발견하다
middle|verb|encourage|격려하다
middle|verb|enjoy|즐기다
middle|verb|enter|들어가다
middle|verb|expect|기대하다
middle|verb|experience|경험하다
middle|verb|explore|탐험하다
middle|verb|gather|모으다
middle|verb|imagine|상상하다
middle|verb|introduce|소개하다
middle|verb|invent|발명하다
middle|verb|mention|언급하다
middle|verb|observe|관찰하다
middle|verb|organize|정리하다
middle|verb|perform|수행하다
middle|verb|practice|연습하다
middle|verb|present|발표하다
middle|verb|prevent|막다
middle|verb|promise|약속하다
middle|verb|recognize|알아보다
middle|verb|record|기록하다
middle|verb|refuse|거절하다
middle|verb|relax|쉬다
middle|verb|reply|대답하다
middle|verb|require|요구하다
middle|verb|satisfy|만족시키다
middle|verb|succeed|성공하다
middle|verb|suppose|가정하다
middle|verb|survive|살아남다
middle|verb|translate|번역하다
middle|verb|transport|수송하다
middle|verb|unite|통합하다
middle|verb|volunteer|자원하다
middle|verb|wonder|궁금해하다
middle|verb|accept|받아들이다
middle|verb|admire|존경하다
middle|verb|arrange|정리하다
middle|verb|attend|참석하다
middle|verb|behave|행동하다
middle|verb|breathe|숨쉬다
middle|verb|cheer|응원하다
middle|verb|compare|비교하다
middle|verb|count|세다
middle|verb|disappear|사라지다
middle|verb|educate|교육하다
middle|verb|escape|탈출하다
middle|verb|exercise|운동하다
middle|verb|explain|설명하다
middle|verb|graduate|졸업하다
middle|verb|handle|다루다
middle|verb|impress|감명을 주다
middle|verb|balance|균형을 잡다
middle|verb|capture|붙잡다
middle|verb|decorate|장식하다
middle|verb|exchange|교환하다
middle|noun|addition|추가
middle|noun|address|주소
middle|noun|adult|어른
middle|noun|adventure|모험
middle|noun|capital|수도
middle|noun|century|세기
middle|noun|company|회사
middle|noun|danger|위험
middle|noun|effort|노력
middle|noun|forest|숲
middle|noun|grade|학년
middle|noun|hero|영웅
middle|noun|island|섬
middle|noun|magazine|잡지
middle|noun|message|메시지
middle|noun|neighbor|이웃
middle|noun|ocean|대양
middle|noun|owner|주인
middle|noun|passenger|승객
middle|noun|pollution|오염
middle|noun|president|대통령
middle|noun|promise|약속
middle|noun|science|과학
middle|noun|season|계절
middle|noun|temperature|온도
middle|noun|village|마을
middle|noun|visitor|방문객
middle|noun|volunteer|자원봉사자
middle|noun|writer|작가
middle|adjective|able|할 수 있는
middle|adjective|afraid|두려워하는
middle|adjective|ancient|고대의
middle|adjective|brave|용감한
middle|adjective|busy|바쁜
middle|adjective|certain|확실한
middle|adjective|cheap|값싼
middle|adjective|comfortable|편안한
middle|adjective|dangerous|위험한
middle|adjective|deep|깊은
middle|adjective|different|다른
middle|adjective|empty|빈
middle|adjective|enough|충분한
middle|adjective|expensive|비싼
middle|adjective|famous|유명한
middle|adjective|foreign|외국의
middle|adjective|free|자유로운
middle|adjective|fresh|신선한
middle|adjective|full|가득 찬
middle|adjective|heavy|무거운
middle|adjective|huge|거대한
middle|adjective|main|주된
middle|adjective|modern|현대의
middle|adjective|nervous|긴장한
middle|adjective|private|사적인
middle|adjective|rich|부유한
middle|adjective|safe|안전한
middle|adjective|several|몇몇의
middle|adjective|similar|비슷한
middle|adjective|strange|이상한
high|noun|achievement|성취
high|noun|analysis|분석
high|noun|application|적용
high|noun|assumption|가정
high|noun|awareness|인식
high|noun|benefit|이익
high|noun|chapter|장
high|noun|component|구성 요소
high|noun|conclusion|결론
high|noun|constraint|제약
high|noun|contrast|대조
high|noun|contribution|기여
high|noun|debate|토론
high|noun|definition|정의
high|noun|demand|수요
high|noun|distribution|분포
high|noun|emphasis|강조
high|noun|framework|틀
high|noun|income|소득
high|noun|interpretation|해석
high|noun|investment|투자
high|noun|issue|쟁점
high|noun|journal|학술지
high|noun|medium|매체
high|noun|minority|소수
high|noun|notion|개념
high|noun|paragraph|문단
high|noun|phenomenon|현상
high|noun|principle|원리
high|noun|publication|출판
high|noun|reaction|반응
high|noun|region|지역
high|noun|requirement|요구 조건
high|noun|response|반응
high|noun|role|역할
high|noun|scope|범위
high|noun|shift|변화
high|noun|source|출처
high|noun|structure|구조
high|noun|summary|요약
high|noun|trend|경향
high|noun|variable|변수
high|verb|adapt|적응하다
high|verb|analyze|분석하다
high|verb|apply|적용하다
high|verb|assume|가정하다
high|verb|attribute|속하다
high|verb|benefit|이익을 얻다
high|verb|challenge|이의를 제기하다
high|verb|cite|인용하다
high|verb|conclude|결론짓다
high|verb|conduct|수행하다
high|verb|confirm|확인하다
high|verb|construct|구성하다
high|verb|consume|소비하다
high|verb|contribute|기여하다
high|verb|convert|전환하다
high|verb|define|정의하다
high|verb|distribute|분배하다
high|verb|emerge|나타나다
high|verb|emphasize|강조하다
high|verb|ensure|보장하다
high|verb|estimate|추정하다
high|verb|expand|확장하다
high|verb|expose|노출하다
high|verb|illustrate|설명하다
high|verb|involve|포함하다
high|verb|isolate|분리하다
high|verb|justify|정당화하다
high|verb|locate|위치시키다
high|verb|occur|발생하다
high|verb|participate|참여하다
high|verb|perceive|인식하다
high|verb|predict|예측하다
high|verb|publish|출판하다
high|verb|recover|회복하다
high|verb|refine|정제하다
high|verb|require|요구하다
high|verb|respond|반응하다
high|verb|retain|유지하다
high|verb|reveal|드러내다
high|verb|specify|명시하다
high|verb|submit|제출하다
high|verb|transfer|이전하다
high|verb|vary|다르다
high|verb|accelerate|가속하다
high|verb|accommodate|수용하다
high|verb|accompany|동반하다
high|verb|accumulate|축적하다
high|verb|acknowledge|인정하다
high|verb|allocate|배분하다
high|verb|anticipate|예상하다
high|verb|assemble|조립하다
high|verb|assess|평가하다
high|verb|assign|배정하다
high|verb|clarify|명확히 하다
high|verb|compensate|보상하다
high|verb|concentrate|집중하다
high|verb|coordinate|조정하다
high|verb|demonstrate|보여주다
high|verb|derive|얻다
high|verb|detect|감지하다
high|verb|determine|결정하다
high|verb|eliminate|제거하다
high|verb|establish|설립하다
high|verb|evaluate|평가하다
high|verb|exclude|제외하다
high|verb|facilitate|촉진하다
high|verb|generate|생성하다
high|verb|identify|식별하다
high|verb|implement|실행하다
high|verb|imply|암시하다
high|verb|indicate|나타내다
high|verb|integrate|통합하다
high|verb|interpret|해석하다
high|verb|investigate|조사하다
high|verb|maintain|유지하다
high|verb|modify|수정하다
high|verb|obtain|얻다
high|verb|occupy|차지하다
high|verb|preserve|보존하다
high|verb|proceed|진행하다
high|verb|regulate|규제하다
high|verb|reinforce|강화하다
high|verb|resolve|해결하다
high|verb|restrict|제한하다
high|verb|simulate|모의 실험하다
high|verb|sustain|유지하다
high|verb|transform|변형시키다
high|verb|utilize|활용하다
high|verb|violate|위반하다
high|verb|abandon|버리다
high|verb|absorb|흡수하다
high|verb|abstract|추상화하다
high|verb|access|접근하다
high|verb|account|설명하다
high|verb|adjust|조정하다
high|verb|advocate|옹호하다
high|verb|alter|바꾸다
high|verb|approve|승인하다
high|verb|arise|발생하다
high|verb|attain|달성하다
high|verb|authorize|승인하다
high|verb|cease|중단하다
high|verb|coincide|일치하다
high|verb|collapse|붕괴하다
high|verb|compile|엮다
high|verb|comprise|구성하다
high|verb|conceive|상상하다
high|verb|confine|제한하다
high|verb|confront|직면하다
high|verb|consist|이루어지다
high|verb|constitute|구성하다
high|verb|consult|상담하다
high|verb|contradict|모순되다
high|verb|convey|전달하다
high|verb|convince|납득시키다
high|verb|deduce|추론하다
high|verb|deem|여기다
high|verb|differentiate|구별하다
high|verb|validate|검증하다
high|verb|diminish|줄어들다
high|verb|displace|대체하다
high|verb|dominate|지배하다
high|verb|enhance|향상시키다
high|verb|equate|동일시하다
high|verb|evolve|진화하다
high|verb|exceed|초과하다
high|verb|exploit|활용하다
high|verb|formulate|공식화하다
high|verb|highlight|강조하다
high|verb|impose|부과하다
high|verb|incline|기울다
high|verb|induce|유발하다
high|verb|infer|추론하다
high|verb|inhibit|억제하다
high|verb|inspect|검사하다
high|verb|instruct|지시하다
high|verb|interact|상호작용하다
high|verb|intervene|개입하다
high|verb|manipulate|조작하다
high|verb|mediate|중재하다
high|verb|neglect|무시하다
high|verb|orient|향하게 하다
high|verb|persist|지속하다
high|verb|presume|추정하다
high|verb|prioritize|우선시하다
high|verb|quote|인용하다
high|verb|restore|복구하다
high|verb|speculate|추측하다
high|verb|substitute|대체하다
high|verb|trigger|유발하다
high|verb|underlie|기초가 되다
high|verb|undertake|착수하다
high|verb|approximate|근사치를 내다
high|verb|articulate|분명히 표현하다
high|verb|calculate|계산하다
high|verb|collaborate|협력하다
high|verb|complement|보완하다
high|verb|comprehend|이해하다
high|verb|consolidate|통합하다
high|verb|differentiate|구별하다
high|noun|acquisition|습득
high|noun|adaptation|적응
high|noun|allocation|배분
high|noun|anticipation|예상
high|noun|assessment|평가
high|noun|clarification|명확화
high|noun|compensation|보상
high|noun|coordination|조정
high|noun|demonstration|시연
high|noun|detection|감지
high|noun|elimination|제거
high|noun|evaluation|평가
high|noun|exclusion|제외
high|noun|generation|생성
high|noun|identification|식별
high|noun|implementation|실행
high|noun|indication|표시
high|noun|integration|통합
high|noun|investigation|조사
high|noun|modification|수정
high|noun|preservation|보존
high|noun|regulation|규제
high|noun|restriction|제한
high|noun|simulation|모의 실험
high|noun|transformation|변형
high|adjective|academic|학업의
high|adjective|alternative|대안의
high|adjective|appropriate|적절한
high|adjective|complex|복잡한
high|adjective|constant|끊임없는
high|adjective|critical|중대한
high|adjective|domestic|국내의
high|adjective|economic|경제의
high|adjective|efficient|효율적인
high|adjective|environmental|환경의
high|adjective|essential|필수적인
high|adjective|eventual|최종적인
high|adjective|financial|재정의
high|adjective|global|세계적인
high|adjective|legal|법적인
high|adjective|major|주요한
high|adjective|minor|사소한
high|adjective|overall|전반적인
high|adjective|previous|이전의
high|adjective|primary|주요한
high|adjective|regional|지역의
high|adjective|specific|구체적인
high|adjective|sufficient|충분한
high|adjective|typical|전형적인
`.trim();

function makeEnglishSupplements(level, existingWords) {
  const used = new Set(existingWords.map((item) => item.word.toLowerCase()));
  const rows = [];
  const add = (word, meaning, example, exampleKo) => {
    const key = word.toLowerCase();
    if (/[^a-z]/.test(key)) return;
    if (used.has(key) || rows.some((item) => item.word.toLowerCase() === key)) return;
    rows.push({
      id: `english-supplement-${level}-${rows.length}-${key.replace(/[^a-z0-9]+/g, "-")}`,
      type: "english",
      level,
      term: word,
      word,
      meaning,
      example,
      exampleKo
    });
  };

  const seeds = getSingleWordSeeds(level);
  seeds.forEach(({ kind, word, meaning }) => {
    add(word, meaning, makeSingleWordExample(kind, word), makeSingleWordExampleKo(kind, word, meaning));
    makeSingleWordForms(kind, word, meaning, level).forEach((item) => {
      add(
        item.word,
        item.meaning,
        item.example || makeSingleWordExample(item.kind, item.word),
        item.exampleKo || makeSingleWordExampleKo(item.kind, item.word, item.meaning)
      );
    });
  });

  return rows.slice(0, Math.max(0, ENGLISH_TARGET_PER_LEVEL - existingWords.length));
}

function getSingleWordSeeds(level) {
  const parts = ENGLISH_SUPPLEMENT_PARTS[level];
  const seeds = [];
  if (parts.colors) parts.colors.forEach(([word, meaning]) => seeds.push({ kind: "adjective", word, meaning }));
  if (parts.adjectives) parts.adjectives.forEach(([word, meaning]) => seeds.push({ kind: "adjective", word, meaning }));
  if (parts.nouns) parts.nouns.forEach(([word, meaning]) => seeds.push({ kind: "noun", word, meaning }));
  if (parts.verbs) parts.verbs.forEach(([word, meaning]) => seeds.push({ kind: "verb", word, meaning }));
  ENGLISH_SINGLE_WORD_SUPPLEMENTS_RAW.split("\n").forEach((line) => {
    const [rawLevel, kind, word, meaning] = line.split("|");
    if (rawLevel === level) seeds.push({ kind, word, meaning });
  });
  return seeds.filter((item) => item.word && /^[a-z]+$/.test(item.word));
}

const IRREGULAR_FORMS = {
  be: { third: "is", past: "was", ing: "being" },
  arise: { third: "arises", past: "arose", ing: "arising" },
  buy: { third: "buys", past: "bought", ing: "buying" },
  come: { third: "comes", past: "came", ing: "coming" },
  do: { third: "does", past: "did", ing: "doing" },
  draw: { third: "draws", past: "drew", ing: "drawing" },
  drink: { third: "drinks", past: "drank", ing: "drinking" },
  eat: { third: "eats", past: "ate", ing: "eating" },
  find: { third: "finds", past: "found", ing: "finding" },
  get: { third: "gets", past: "got", ing: "getting" },
  give: { third: "gives", past: "gave", ing: "giving" },
  go: { third: "goes", past: "went", ing: "going" },
  have: { third: "has", past: "had", ing: "having" },
  hold: { third: "holds", past: "held", ing: "holding" },
  know: { third: "knows", past: "knew", ing: "knowing" },
  lead: { third: "leads", past: "led", ing: "leading" },
  leave: { third: "leaves", past: "left", ing: "leaving" },
  lose: { third: "loses", past: "lost", ing: "losing" },
  make: { third: "makes", past: "made", ing: "making" },
  mean: { third: "means", past: "meant", ing: "meaning" },
  read: { third: "reads", past: "read", ing: "reading" },
  run: { third: "runs", past: "ran", ing: "running" },
  say: { third: "says", past: "said", ing: "saying" },
  sell: { third: "sells", past: "sold", ing: "selling" },
  sing: { third: "sings", past: "sang", ing: "singing" },
  sit: { third: "sits", past: "sat", ing: "sitting" },
  sleep: { third: "sleeps", past: "slept", ing: "sleeping" },
  speak: { third: "speaks", past: "spoke", ing: "speaking" },
  stand: { third: "stands", past: "stood", ing: "standing" },
  take: { third: "takes", past: "took", ing: "taking" },
  teach: { third: "teaches", past: "taught", ing: "teaching" },
  tell: { third: "tells", past: "told", ing: "telling" },
  underlie: { third: "underlies", past: "underlay", ing: "underlying" },
  undertake: { third: "undertakes", past: "undertook", ing: "undertaking" },
  understand: { third: "understands", past: "understood", ing: "understanding" },
  wake: { third: "wakes", past: "woke", ing: "waking" },
  break: { third: "breaks", past: "broke", ing: "breaking" },
  catch: { third: "catches", past: "caught", ing: "catching" },
  cut: { third: "cuts", past: "cut", ing: "cutting" },
  fly: { third: "flies", past: "flew", ing: "flying" },
  forget: { third: "forgets", past: "forgot", ing: "forgetting" },
  grow: { third: "grows", past: "grew", ing: "growing" },
  hear: { third: "hears", past: "heard", ing: "hearing" },
  hide: { third: "hides", past: "hid", ing: "hiding" },
  hit: { third: "hits", past: "hit", ing: "hitting" },
  keep: { third: "keeps", past: "kept", ing: "keeping" },
  meet: { third: "meets", past: "met", ing: "meeting" },
  put: { third: "puts", past: "put", ing: "putting" },
  ride: { third: "rides", past: "rode", ing: "riding" },
  send: { third: "sends", past: "sent", ing: "sending" },
  swim: { third: "swims", past: "swam", ing: "swimming" },
  throw: { third: "throws", past: "threw", ing: "throwing" },
  wear: { third: "wears", past: "wore", ing: "wearing" },
  win: { third: "wins", past: "won", ing: "winning" },
  write: { third: "writes", past: "wrote", ing: "writing" }
};

const KOREAN_VERB_FORM_HINTS = {
  open: { third: "연다", past: "열었다", ing: "여는 것" },
  close: { third: "닫는다", past: "닫았다", ing: "닫는 것" },
  read: { third: "읽는다", past: "읽었다", ing: "읽는 것" },
  write: { third: "쓴다", past: "썼다", ing: "쓰는 것" },
  draw: { third: "그린다", past: "그렸다", ing: "그리는 것" },
  make: { third: "만든다", past: "만들었다", ing: "만드는 것" },
  find: { third: "찾는다", past: "찾았다", ing: "찾는 것" },
  watch: { third: "본다", past: "보았다", ing: "보는 것" },
  help: { third: "돕는다", past: "도왔다", ing: "돕는 것" },
  go: { third: "간다", past: "갔다", ing: "가는 것" },
  come: { third: "온다", past: "왔다", ing: "오는 것" },
  run: { third: "달린다", past: "달렸다", ing: "달리는 것" },
  eat: { third: "먹는다", past: "먹었다", ing: "먹는 것" },
  drink: { third: "마신다", past: "마셨다", ing: "마시는 것" },
  speak: { third: "말한다", past: "말했다", ing: "말하는 것" },
  learn: { third: "배운다", past: "배웠다", ing: "배우는 것" },
  teach: { third: "가르친다", past: "가르쳤다", ing: "가르치는 것" },
  buy: { third: "산다", past: "샀다", ing: "사는 것" },
  sell: { third: "판다", past: "팔았다", ing: "파는 것" },
  give: { third: "준다", past: "주었다", ing: "주는 것" },
  take: { third: "가져간다", past: "가져갔다", ing: "가져가는 것" },
  use: { third: "사용한다", past: "사용했다", ing: "사용하는 것" }
};

function makeSingleWordForms(kind, word, meaning, level) {
  if (kind === "noun") return [{ kind: "noun", word: pluralizeEnglish(word), meaning: `${meaning}들` }];
  if (kind === "verb") {
    const forms = IRREGULAR_FORMS[word] || {
      third: makeThirdPerson(word),
      past: makePastTense(word),
      ing: makeIngForm(word)
    };
    return [
      makeVerbFormItem(word, meaning, forms.third, "third"),
      makeVerbFormItem(word, meaning, forms.past, "past"),
      makeVerbFormItem(word, meaning, forms.ing, "ing")
    ];
  }
  if (kind === "adjective" && level === "elementary") {
    const rows = [];
    const comparative = makeComparative(word);
    const superlative = makeSuperlative(word);
    if (comparative) rows.push({ kind: "adjective", word: comparative, meaning: `더 ${meaning}` });
    if (superlative) rows.push({ kind: "adjective", word: superlative, meaning: `가장 ${meaning}` });
    const adverb = makeAdverb(word);
    if (adverb) rows.push({ kind: "adverb", word: adverb, meaning: `${meaning}하게` });
    return rows;
  }
  return [];
}

function makeVerbFormItem(baseWord, baseMeaning, formWord, formType) {
  const labels = {
    third: "3인칭 단수 현재형",
    past: "과거형",
    ing: "현재분사/동명사"
  };
  const hint = KOREAN_VERB_FORM_HINTS[baseWord]?.[formType] || makeKoreanVerbFallback(baseMeaning, formType);
  const label = labels[formType];
  return {
    kind: "verb",
    word: formWord,
    meaning: `${baseWord}의 ${label} (${hint})`,
    example: `"${formWord}" is the ${formType === "third" ? "third-person present" : formType === "past" ? "past" : "ing"} form of "${baseWord}".`,
    exampleKo: `"${formWord}"는 "${baseWord}"의 ${label}입니다.`
  };
}

function makeKoreanVerbFallback(baseMeaning, formType) {
  if (formType === "past") return `${baseMeaning}의 과거형`;
  if (formType === "ing") return `${baseMeaning.replace(/다$/, "")}는 것`;
  return `${baseMeaning}의 현재형`;
}

function pluralizeEnglish(word) {
  if (word === "child") return "children";
  if (word === "person") return "people";
  if (word === "man") return "men";
  if (word === "woman") return "women";
  if (word.endsWith("y") && !/[aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`;
  if (/(s|x|z|ch|sh)$/.test(word)) return `${word}es`;
  return `${word}s`;
}

function makeThirdPerson(word) {
  if (word.endsWith("y") && !/[aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`;
  if (/(s|x|z|ch|sh|o)$/.test(word)) return `${word}es`;
  return `${word}s`;
}

function makePastTense(word) {
  if (word.endsWith("e")) return `${word}d`;
  if (word.endsWith("y") && !/[aeiou]y$/.test(word)) return `${word.slice(0, -1)}ied`;
  return `${word}ed`;
}

function makeIngForm(word) {
  if (word.endsWith("ie")) return `${word.slice(0, -2)}ying`;
  if (word.endsWith("e") && word !== "see") return `${word.slice(0, -1)}ing`;
  return `${word}ing`;
}

function makeComparative(word) {
  if (word.length > 7) return "";
  if (word.endsWith("y")) return `${word.slice(0, -1)}ier`;
  if (word.endsWith("e")) return `${word}r`;
  return `${word}er`;
}

function makeSuperlative(word) {
  if (word.length > 7) return "";
  if (word.endsWith("y")) return `${word.slice(0, -1)}iest`;
  if (word.endsWith("e")) return `${word}st`;
  return `${word}est`;
}

function makeAdverb(word) {
  if (word.endsWith("y")) return `${word.slice(0, -1)}ily`;
  if (word.endsWith("ic")) return `${word}ally`;
  if (word.endsWith("le")) return `${word.slice(0, -1)}y`;
  if (word.length > 9) return "";
  return `${word}ly`;
}

function makeSingleWordExample(kind, word) {
  if (kind === "verb") return `"${word}" is a verb form.`;
  if (kind === "adverb") return `"${word}" appears in many sentences.`;
  return `"${word}" is an important word.`;
}

function makeSingleWordExampleKo(kind, word, meaning) {
  if (kind === "verb") return `"${word}"는 "${meaning}"라는 동작을 나타냅니다.`;
  if (kind === "adverb") return `"${word}"는 "${meaning}"라는 방식으로 쓰입니다.`;
  return `"${word}"는 "${meaning}"라는 뜻입니다.`;
}

function normalizeEnglishLevel(level, words) {
  const levelWords = words.filter((item) => item.level === level);
  return makeEnglishSupplements(level, levelWords);
}

const englishBaseWords = [...englishWords, ...extraEnglishWords];
const englishSupplementWords = ["elementary", "middle", "high"].flatMap((level) => normalizeEnglishLevel(level, englishBaseWords));

window.STUDY_WORD_BANK = [...englishBaseWords, ...englishSupplementWords, ...hanjaWords, ...extendedHanjaWords, ...hanjaExamWords];
