const dictionary = [
  {
    word: "apple",
    pronunciation: "AE-puhl",
    korean: "사과",
    part: "명사",
    category: "음식",
    level: 1,
    definition: "둥글고 달콤한 과일이에요.",
    keywords: ["사과", "과일"],
    examples: [
      ["I eat an apple.", "나는 사과를 먹어요."],
      ["This apple is red.", "이 사과는 빨간색이에요."],
    ],
  },
  {
    word: "book",
    pronunciation: "book",
    korean: "책",
    part: "명사",
    category: "학교",
    level: 1,
    definition: "글이나 그림을 읽을 수 있게 묶은 것이에요.",
    keywords: ["책", "도서"],
    examples: [
      ["I read a book.", "나는 책을 읽어요."],
      ["This book is fun.", "이 책은 재미있어요."],
    ],
  },
  {
    word: "friend",
    pronunciation: "frend",
    korean: "친구",
    part: "명사",
    category: "사람",
    level: 1,
    definition: "함께 놀거나 도와주는 가까운 사람이에요.",
    keywords: ["친구", "벗"],
    examples: [
      ["She is my friend.", "그녀는 내 친구예요."],
      ["I play with my friend.", "나는 친구와 놀아요."],
    ],
  },
  {
    word: "school",
    pronunciation: "skool",
    korean: "학교",
    part: "명사",
    category: "학교",
    level: 1,
    definition: "공부하고 친구들을 만나는 곳이에요.",
    keywords: ["학교", "교실"],
    examples: [
      ["I go to school.", "나는 학교에 가요."],
      ["My school is big.", "우리 학교는 커요."],
    ],
  },
  {
    word: "happy",
    pronunciation: "HA-pee",
    korean: "행복한, 기쁜",
    part: "형용사",
    category: "감정",
    level: 1,
    definition: "기분이 좋고 즐거운 상태예요.",
    keywords: ["행복", "기쁜", "즐거운"],
    examples: [
      ["I am happy today.", "나는 오늘 기뻐요."],
      ["The happy child smiles.", "행복한 아이가 웃어요."],
    ],
  },
  {
    word: "run",
    pronunciation: "ruhn",
    korean: "달리다",
    part: "동사",
    category: "동작",
    level: 1,
    definition: "빠르게 움직이는 행동이에요.",
    senses: [
      { part: "동사", meaning: "(사람·동물이) 달리다[뛰다]" },
      { part: "동사", meaning: "(얼마의 거리를) 달리다[뛰다]", reference: "mile" },
      { part: "동사", meaning: "(운동으로) 달리기를 하다" },
      { part: "명사", meaning: "달리기, 뛰기; 달리는 시간[거리]", reference: "fun run" },
      { part: "명사", meaning: "배달, 운행, 운항", reference: "milk run, rat run, school run" },
    ],
    inflections: {
      title: "동사형",
      items: [
        ["3인칭 단수 현재", "runs"],
        ["과거형", "ran"],
        ["과거 분사", "run"],
        ["현재 분사", "running"],
      ],
    },
    keywords: ["달리다", "뛰다"],
    examples: [
      ["I run in the park.", "나는 공원에서 달려요."],
      ["The dog can run fast.", "그 개는 빨리 달릴 수 있어요."],
    ],
  },
  {
    word: "water",
    pronunciation: "WAH-ter",
    korean: "물",
    part: "명사",
    category: "자연",
    level: 1,
    definition: "사람, 동물, 식물이 살아가는 데 필요한 투명한 액체예요.",
    keywords: ["물", "마시다"],
    examples: [
      ["I drink water.", "나는 물을 마셔요."],
      ["Water is cold.", "물이 차가워요."],
    ],
  },
  {
    word: "sun",
    pronunciation: "suhn",
    korean: "해, 태양",
    part: "명사",
    category: "자연",
    level: 1,
    definition: "낮에 밝은 빛과 따뜻함을 주는 별이에요.",
    keywords: ["해", "태양", "햇빛"],
    examples: [
      ["The sun is bright.", "해가 밝아요."],
      ["I see the sun.", "나는 해를 봐요."],
    ],
  },
  {
    word: "cat",
    pronunciation: "kat",
    korean: "고양이",
    part: "명사",
    category: "동물",
    level: 1,
    definition: "작고 귀여운 반려동물이에요.",
    keywords: ["고양이"],
    examples: [
      ["The cat is small.", "그 고양이는 작아요."],
      ["My cat sleeps.", "내 고양이는 자요."],
    ],
  },
  {
    word: "dog",
    pronunciation: "dawg",
    korean: "강아지, 개",
    part: "명사",
    category: "동물",
    level: 1,
    definition: "사람과 친하게 지내는 반려동물이에요.",
    keywords: ["강아지", "개"],
    examples: [
      ["The dog is cute.", "그 강아지는 귀여워요."],
      ["I walk my dog.", "나는 강아지를 산책시켜요."],
    ],
  },
  {
    word: "eat",
    pronunciation: "eet",
    korean: "먹다",
    part: "동사",
    category: "동작",
    level: 1,
    definition: "음식을 입으로 넣어 몸에 필요한 힘을 얻는 행동이에요.",
    keywords: ["먹다", "음식"],
    examples: [
      ["I eat rice.", "나는 밥을 먹어요."],
      ["We eat lunch.", "우리는 점심을 먹어요."],
    ],
  },
  {
    word: "big",
    pronunciation: "big",
    korean: "큰",
    part: "형용사",
    category: "모양",
    level: 1,
    definition: "크기가 보통보다 큰 것을 말해요.",
    keywords: ["큰", "크다"],
    examples: [
      ["This box is big.", "이 상자는 커요."],
      ["I have a big bag.", "나는 큰 가방이 있어요."],
    ],
  },
  {
    word: "small",
    pronunciation: "smawl",
    korean: "작은",
    part: "형용사",
    category: "모양",
    level: 1,
    definition: "크기가 보통보다 작은 것을 말해요.",
    keywords: ["작은", "작다"],
    examples: [
      ["The cup is small.", "그 컵은 작아요."],
      ["A small bird sings.", "작은 새가 노래해요."],
    ],
  },
  {
    word: "red",
    pronunciation: "red",
    korean: "빨간색",
    part: "명사, 형용사",
    category: "색깔",
    level: 1,
    definition: "사과나 딸기에서 볼 수 있는 색이에요.",
    keywords: ["빨간색", "빨강"],
    examples: [
      ["My bag is red.", "내 가방은 빨간색이에요."],
      ["I like red flowers.", "나는 빨간 꽃을 좋아해요."],
    ],
  },
  {
    word: "blue",
    pronunciation: "bloo",
    korean: "파란색",
    part: "명사, 형용사",
    category: "색깔",
    level: 1,
    definition: "하늘이나 바다에서 볼 수 있는 색이에요.",
    keywords: ["파란색", "파랑"],
    examples: [
      ["The sky is blue.", "하늘은 파란색이에요."],
      ["I have a blue pen.", "나는 파란 펜이 있어요."],
    ],
  },
  {
    word: "teacher",
    pronunciation: "TEE-cher",
    korean: "교사, 선생님",
    part: "명사",
    category: "학교",
    level: 1,
    definition: "학생을 가르치는 교사나 선생님이에요.",
    keywords: ["교사", "선생님"],
    examples: [
      ["My teacher is kind.", "우리 선생님은 친절해요."],
      ["The teacher helps me.", "선생님이 나를 도와주세요."],
    ],
  },
  {
    word: "family",
    pronunciation: "FA-muh-lee",
    korean: "가족",
    part: "명사",
    category: "사람",
    level: 1,
    definition: "함께 살거나 서로 사랑하는 가까운 사람들이에요.",
    keywords: ["가족", "식구"],
    examples: [
      ["I love my family.", "나는 우리 가족을 사랑해요."],
      ["My family eats dinner.", "우리 가족은 저녁을 먹어요."],
    ],
  },
  {
    word: "play",
    pronunciation: "play",
    korean: "놀다, 연주하다",
    part: "동사",
    category: "동작",
    level: 1,
    definition: "재미있게 시간을 보내거나 악기를 치는 행동이에요.",
    keywords: ["놀다", "연주하다"],
    examples: [
      ["We play soccer.", "우리는 축구를 해요."],
      ["I play the piano.", "나는 피아노를 연주해요."],
    ],
  },
  {
    word: "green",
    pronunciation: "green",
    korean: "초록색, 녹색의",
    part: "명사, 형용사",
    category: "색깔",
    level: 1,
    definition: "풀잎처럼 초록빛이 도는 색이거나 그런 색을 띤 상태예요.",
    keywords: ["초록색", "녹색", "초록빛"],
    examples: [
      ["The leaf is green.", "그 잎은 초록색이에요."],
      ["I see a green frog.", "나는 초록색 개구리를 봐요."],
    ],
  },
  {
    word: "morning",
    pronunciation: "MOR-ning",
    korean: "아침",
    part: "명사",
    category: "시간",
    level: 1,
    definition: "하루가 시작되는 이른 시간이에요.",
    keywords: ["아침", "오전"],
    examples: [
      ["Good morning!", "좋은 아침이에요!"],
      ["I eat breakfast in the morning.", "나는 아침에 아침밥을 먹어요."],
    ],
  },
  {
    word: "night",
    pronunciation: "nait",
    korean: "밤",
    part: "명사",
    category: "시간",
    level: 1,
    definition: "해가 지고 어두워지는 시간이에요.",
    keywords: ["밤", "저녁"],
    examples: [
      ["The moon is bright at night.", "밤에는 달이 밝아요."],
      ["I sleep at night.", "나는 밤에 자요."],
    ],
  },
  {
    word: "home",
    pronunciation: "hohm",
    korean: "집",
    part: "명사",
    category: "장소",
    level: 1,
    definition: "가족과 함께 살거나 편히 쉬는 곳이에요.",
    keywords: ["집", "가정"],
    examples: [
      ["I go home.", "나는 집에 가요."],
      ["My home is warm.", "우리 집은 따뜻해요."],
    ],
  },
  {
    word: "chair",
    pronunciation: "chair",
    korean: "의자",
    part: "명사",
    category: "물건",
    level: 1,
    definition: "앉을 때 쓰는 물건이에요.",
    keywords: ["의자", "앉다"],
    examples: [
      ["I sit on a chair.", "나는 의자에 앉아요."],
      ["The chair is brown.", "그 의자는 갈색이에요."],
    ],
  },
  {
    word: "pencil",
    pronunciation: "PEN-suhl",
    korean: "연필",
    part: "명사",
    category: "학교",
    level: 1,
    definition: "글씨나 그림을 그릴 때 쓰는 도구예요.",
    keywords: ["연필", "필기구"],
    examples: [
      ["I write with a pencil.", "나는 연필로 써요."],
      ["My pencil is short.", "내 연필은 짧아요."],
    ],
  },
  {
    word: "rain",
    pronunciation: "rayn",
    korean: "비",
    part: "명사, 동사",
    category: "날씨",
    level: 2,
    definition: "하늘에서 물방울이 떨어지는 날씨예요.",
    keywords: ["비", "비가 오다"],
    examples: [
      ["Rain falls from the sky.", "비가 하늘에서 내려요."],
      ["I need an umbrella in the rain.", "비 올 때 나는 우산이 필요해요."],
    ],
  },
  {
    word: "snow",
    pronunciation: "snoh",
    korean: "눈",
    part: "명사, 동사",
    category: "날씨",
    level: 2,
    definition: "추운 날 하늘에서 하얗게 내리는 얼음 알갱이예요.",
    keywords: ["눈", "눈이 오다"],
    examples: [
      ["Snow is white.", "눈은 하얘요."],
      ["We play in the snow.", "우리는 눈 속에서 놀아요."],
    ],
  },
  {
    word: "kind",
    pronunciation: "kaind",
    korean: "친절한",
    part: "형용사",
    category: "성격",
    level: 2,
    definition: "다른 사람에게 따뜻하고 좋게 대해 주는 모습이에요.",
    keywords: ["친절한", "상냥한"],
    examples: [
      ["My friend is kind.", "내 친구는 친절해요."],
      ["Be kind to others.", "다른 사람에게 친절하게 대해요."],
    ],
  },
  {
    word: "brave",
    pronunciation: "brayv",
    korean: "용감한",
    part: "형용사",
    category: "성격",
    level: 2,
    definition: "무섭거나 어려운 일도 씩씩하게 하는 모습이에요.",
    keywords: ["용감한", "씩씩한"],
    examples: [
      ["The brave girl helps her friend.", "용감한 소녀가 친구를 도와요."],
      ["I can be brave.", "나는 용감할 수 있어요."],
    ],
  },
  {
    word: "garden",
    pronunciation: "GAR-duhn",
    korean: "정원",
    part: "명사",
    category: "장소",
    level: 2,
    definition: "꽃이나 나무를 가꾸는 작은 공간이에요.",
    keywords: ["정원", "마당"],
    examples: [
      ["Flowers grow in the garden.", "정원에서 꽃이 자라요."],
      ["I water the garden.", "나는 정원에 물을 줘요."],
    ],
  },
  {
    word: "listen",
    pronunciation: "LIS-uhn",
    korean: "듣다",
    part: "동사",
    category: "동작",
    level: 2,
    definition: "소리나 말을 귀로 잘 받아들이는 행동이에요.",
    keywords: ["듣다", "귀"],
    examples: [
      ["I listen to music.", "나는 음악을 들어요."],
      ["Listen to your teacher.", "선생님 말씀을 들어요."],
    ],
  },
  {
    word: "share",
    pronunciation: "shair",
    korean: "나누다, 공유하다",
    part: "동사",
    category: "동작",
    level: 2,
    definition: "내가 가진 것을 다른 사람과 함께 쓰는 행동이에요.",
    keywords: ["나누다", "공유하다"],
    examples: [
      ["I share my snack.", "나는 간식을 나눠요."],
      ["We share the crayons.", "우리는 크레파스를 함께 써요."],
    ],
  },
];

const extraWords = [
  ["air", "air", "공기", "명사", "자연", 1, "우리가 숨 쉴 때 필요한 보이지 않는 것이에요.", ["공기", "숨"], [["We need air.", "우리는 공기가 필요해요."], ["The air is fresh.", "공기가 상쾌해요."]]],
  ["animal", "A-nuh-muhl", "동물", "명사", "동물", 1, "움직이고 먹이를 먹으며 살아가는 생명이에요.", ["동물"], [["A dog is an animal.", "개는 동물이에요."], ["I like animals.", "나는 동물을 좋아해요."]]],
  ["baby", "BAY-bee", "아기", "명사", "사람", 1, "아주 어린 아이예요.", ["아기", "아이"], [["The baby sleeps.", "아기가 자요."], ["The baby is cute.", "그 아기는 귀여워요."]]],
  ["bag", "bag", "가방", "명사", "물건", 1, "물건을 넣어 들고 다니는 것이에요.", ["가방"], [["My bag is heavy.", "내 가방은 무거워요."], ["I have a school bag.", "나는 책가방이 있어요."]]],
  ["ball", "bawl", "공", "명사", "운동", 1, "던지거나 차며 노는 둥근 물건이에요.", ["공", "운동"], [["I kick the ball.", "나는 공을 차요."], ["The ball is round.", "공은 둥글어요."]]],
  ["banana", "buh-NA-nuh", "바나나", "명사", "음식", 1, "길고 노란 달콤한 과일이에요.", ["바나나", "과일"], [["I eat a banana.", "나는 바나나를 먹어요."], ["The banana is yellow.", "바나나는 노란색이에요."]]],
  ["bed", "bed", "침대", "명사", "집", 1, "누워서 자는 가구예요.", ["침대", "잠"], [["I sleep in my bed.", "나는 침대에서 자요."], ["The bed is soft.", "침대는 푹신해요."]]],
  ["bird", "burd", "새", "명사", "동물", 1, "날개가 있어 하늘을 날 수 있는 동물이에요.", ["새", "동물"], [["A bird can fly.", "새는 날 수 있어요."], ["The bird sings.", "새가 노래해요."]]],
  ["black", "blak", "검은색", "명사, 형용사", "색깔", 1, "밤하늘처럼 어두운 색이에요.", ["검은색", "검정"], [["My shoes are black.", "내 신발은 검은색이에요."], ["I see a black cat.", "나는 검은 고양이를 봐요."]]],
  ["box", "boks", "상자", "명사", "물건", 1, "물건을 담는 네모난 것이에요.", ["상자"], [["The box is big.", "상자가 커요."], ["Open the box.", "상자를 열어요."]]],
  ["boy", "boy", "소년, 남자아이", "명사", "사람", 1, "어린 남자아이예요.", ["소년", "남자아이"], [["The boy runs.", "그 소년이 달려요."], ["He is a kind boy.", "그는 친절한 남자아이예요."]]],
  ["bread", "bred", "빵", "명사", "음식", 1, "밀가루로 만들어 먹는 음식이에요.", ["빵", "음식"], [["I eat bread.", "나는 빵을 먹어요."], ["This bread is warm.", "이 빵은 따뜻해요."]]],
  ["bus", "bus", "버스", "명사", "교통", 1, "많은 사람이 함께 타는 큰 차예요.", ["버스", "차"], [["I ride the bus.", "나는 버스를 타요."], ["The bus is yellow.", "그 버스는 노란색이에요."]]],
  ["cake", "kayk", "케이크", "명사", "음식", 1, "생일이나 축하할 때 먹는 달콤한 음식이에요.", ["케이크", "빵"], [["I like cake.", "나는 케이크를 좋아해요."], ["The cake is sweet.", "케이크는 달콤해요."]]],
  ["car", "kar", "자동차", "명사", "교통", 1, "사람이 타고 이동하는 탈것이에요.", ["자동차", "차"], [["My dad has a car.", "우리 아빠는 자동차가 있어요."], ["The car is fast.", "자동차는 빨라요."]]],
  ["city", "SI-tee", "도시", "명사", "장소", 2, "사람과 건물이 많은 큰 곳이에요.", ["도시"], [["I live in a city.", "나는 도시에 살아요."], ["The city is busy.", "도시는 바빠요."]]],
  ["class", "klas", "수업, 반", "명사", "학교", 1, "학교에서 함께 공부하는 시간이나 모임이에요.", ["수업", "반"], [["I have English class.", "나는 영어 수업이 있어요."], ["Our class is fun.", "우리 반은 재미있어요."]]],
  ["clean", "kleen", "깨끗한, 청소하다", "형용사, 동사", "생활", 1, "더럽지 않거나 더러운 것을 없애는 것이에요.", ["깨끗한", "청소하다"], [["My room is clean.", "내 방은 깨끗해요."], ["I clean my desk.", "나는 책상을 청소해요."]]],
  ["cloud", "kloud", "구름", "명사", "날씨", 1, "하늘에 떠 있는 하얗거나 회색인 덩어리예요.", ["구름", "날씨"], [["The cloud is white.", "구름은 하얘요."], ["I see a cloud.", "나는 구름을 봐요."]]],
  ["cold", "kohld", "추운, 차가운", "형용사", "날씨", 1, "온도가 낮아 시원하거나 춥게 느껴지는 상태예요.", ["추운", "차가운"], [["The water is cold.", "물이 차가워요."], ["It is cold today.", "오늘은 추워요."]]],
  ["come", "kuhm", "오다", "동사", "동작", 1, "말하는 사람 쪽으로 움직이는 행동이에요.", ["오다"], [["Come here, please.", "여기로 와 주세요."], ["My friend comes to my house.", "친구가 우리 집에 와요."]]],
  ["cook", "kook", "요리하다", "동사", "생활", 1, "음식을 만드는 행동이에요.", ["요리하다"], [["I cook eggs.", "나는 달걀을 요리해요."], ["My mom can cook well.", "엄마는 요리를 잘해요."]]],
  ["cup", "kuhp", "컵", "명사", "물건", 1, "물을 마실 때 쓰는 물건이에요.", ["컵", "잔"], [["This is my cup.", "이것은 내 컵이에요."], ["The cup is small.", "컵은 작아요."]]],
  ["dance", "dans", "춤추다", "동사", "동작", 1, "음악에 맞춰 몸을 움직이는 행동이에요.", ["춤추다", "춤"], [["I dance with my friend.", "나는 친구와 춤춰요."], ["She can dance well.", "그녀는 춤을 잘 춰요."]]],
  ["desk", "desk", "책상", "명사", "학교", 1, "공부하거나 글씨를 쓸 때 쓰는 가구예요.", ["책상"], [["My book is on the desk.", "내 책은 책상 위에 있어요."], ["I clean my desk.", "나는 책상을 청소해요."]]],
  ["door", "dor", "문", "명사", "집", 1, "방이나 집에 들어가고 나올 때 여닫는 것이에요.", ["문"], [["Open the door.", "문을 여세요."], ["The door is brown.", "문은 갈색이에요."]]],
  ["draw", "draw", "그리다", "동사", "동작", 1, "연필이나 색연필로 그림을 만드는 행동이에요.", ["그리다", "그림"], [["I draw a cat.", "나는 고양이를 그려요."], ["Draw a big circle.", "큰 동그라미를 그려요."]]],
  ["ear", "eer", "귀", "명사", "몸", 1, "소리를 듣는 몸의 부분이에요.", ["귀", "몸"], [["I hear with my ears.", "나는 귀로 들어요."], ["My ears are small.", "내 귀는 작아요."]]],
  ["egg", "eg", "달걀", "명사", "음식", 1, "닭이 낳고 우리가 먹을 수 있는 음식이에요.", ["달걀", "계란"], [["I eat an egg.", "나는 달걀을 먹어요."], ["The egg is white.", "달걀은 하얘요."]]],
  ["eye", "ai", "눈", "명사", "몸", 1, "무엇을 볼 때 쓰는 몸의 부분이에요.", ["눈", "몸"], [["I see with my eyes.", "나는 눈으로 봐요."], ["My eyes are big.", "내 눈은 커요."]]],
  ["face", "fays", "얼굴", "명사", "몸", 1, "눈, 코, 입이 있는 머리 앞부분이에요.", ["얼굴"], [["Wash your face.", "얼굴을 씻어요."], ["Her face is happy.", "그녀의 얼굴은 행복해 보여요."]]],
  ["farm", "farm", "농장", "명사", "장소", 2, "동물이나 식물을 기르는 곳이에요.", ["농장"], [["I visit a farm.", "나는 농장에 가요."], ["Cows live on a farm.", "소들은 농장에서 살아요."]]],
  ["fish", "fish", "물고기", "명사", "동물", 1, "물속에서 사는 동물이에요.", ["물고기", "생선"], [["A fish swims.", "물고기가 헤엄쳐요."], ["I see a fish.", "나는 물고기를 봐요."]]],
  ["flower", "FLOU-er", "꽃", "명사", "자연", 1, "예쁜 색과 향기가 있는 식물의 부분이에요.", ["꽃"], [["The flower is pretty.", "꽃이 예뻐요."], ["I like red flowers.", "나는 빨간 꽃을 좋아해요."]]],
  ["food", "food", "음식", "명사", "음식", 1, "사람이나 동물이 먹는 것이에요.", ["음식", "먹다"], [["I like Korean food.", "나는 한국 음식을 좋아해요."], ["Food gives us energy.", "음식은 우리에게 힘을 줘요."]]],
  ["game", "gaym", "게임", "명사", "놀이", 1, "규칙에 맞춰 재미있게 하는 놀이예요.", ["게임", "놀이"], [["I play a game.", "나는 게임을 해요."], ["This game is fun.", "이 게임은 재미있어요."]]],
  ["girl", "gurl", "소녀, 여자아이", "명사", "사람", 1, "어린 여자아이예요.", ["소녀", "여자아이"], [["The girl smiles.", "그 소녀가 웃어요."], ["She is a brave girl.", "그녀는 용감한 소녀예요."]]],
  ["go", "goh", "가다", "동사", "동작", 1, "다른 곳으로 움직이는 행동이에요.", ["가다"], [["I go to school.", "나는 학교에 가요."], ["Let’s go home.", "집에 가요."]]],
  ["good", "good", "좋은", "형용사", "표현", 1, "마음에 들거나 바른 상태를 말해요.", ["좋은", "잘"], [["This is good.", "이것은 좋아요."], ["Have a good day.", "좋은 하루 보내요."]]],
  ["hand", "hand", "손", "명사", "몸", 1, "물건을 잡거나 만질 때 쓰는 몸의 부분이에요.", ["손"], [["Wash your hands.", "손을 씻어요."], ["I hold a pencil in my hand.", "나는 손에 연필을 잡아요."]]],
  ["hat", "hat", "모자", "명사", "옷", 1, "머리에 쓰는 물건이에요.", ["모자"], [["I wear a hat.", "나는 모자를 써요."], ["The hat is blue.", "모자는 파란색이에요."]]],
  ["head", "hed", "머리", "명사", "몸", 1, "눈, 코, 입이 있고 생각하는 몸의 부분이에요.", ["머리"], [["Touch your head.", "머리를 만져요."], ["My head hurts.", "머리가 아파요."]]],
  ["help", "help", "돕다", "동사", "동작", 1, "다른 사람이 일을 잘할 수 있게 해 주는 행동이에요.", ["돕다", "도움"], [["I help my mom.", "나는 엄마를 도와요."], ["Can you help me?", "나를 도와줄 수 있나요?"]]],
  ["hot", "hot", "뜨거운, 더운", "형용사", "날씨", 1, "온도가 높아 따뜻하거나 덥게 느껴지는 상태예요.", ["뜨거운", "더운"], [["The soup is hot.", "수프가 뜨거워요."], ["It is hot today.", "오늘은 더워요."]]],
  ["house", "hous", "집", "명사", "장소", 1, "사람이 사는 건물이에요.", ["집"], [["This is my house.", "이것은 우리 집이에요."], ["The house is big.", "그 집은 커요."]]],
  ["jump", "juhmp", "뛰다, 점프하다", "동사", "동작", 1, "발로 바닥을 차고 몸을 뛰어오르게 하는 행동이에요.", ["뛰다", "점프하다", "뛰어오르다"], [["I jump high.", "나는 높이 뛰어요."], ["The child jumps.", "아이가 뛰어올라요."]]],
  ["juice", "joos", "주스", "명사", "음식", 1, "과일이나 채소로 만든 음료예요.", ["주스", "음료"], [["I drink orange juice.", "나는 오렌지 주스를 마셔요."], ["The juice is sweet.", "주스는 달콤해요."]]],
  ["key", "kee", "열쇠", "명사", "물건", 1, "문이나 자물쇠를 여는 물건이에요.", ["열쇠", "키"], [["I have a key.", "나는 열쇠가 있어요."], ["The key is small.", "열쇠는 작아요."]]],
  ["king", "king", "왕", "명사", "사람", 2, "나라를 다스리는 남자예요.", ["왕"], [["The king is kind.", "그 왕은 친절해요."], ["The king has a crown.", "왕은 왕관이 있어요."]]],
  ["kite", "kait", "연", "명사", "놀이", 1, "바람을 이용해 하늘에 띄우는 장난감이에요.", ["연", "장난감"], [["I fly a kite.", "나는 연을 날려요."], ["The kite is high.", "연이 높이 떠 있어요."]]],
  ["leg", "leg", "다리", "명사", "몸", 1, "걷거나 뛰는 데 쓰는 몸의 부분이에요.", ["다리", "몸"], [["My legs are strong.", "내 다리는 튼튼해요."], ["I run with my legs.", "나는 다리로 달려요."]]],
  ["light", "lait", "빛, 가벼운", "명사, 형용사", "자연", 2, "밝게 보이게 해 주는 것이거나 무겁지 않은 상태예요.", ["빛", "가벼운"], [["The light is bright.", "빛이 밝아요."], ["This bag is light.", "이 가방은 가벼워요."]]],
  ["lion", "LAI-uhn", "사자", "명사", "동물", 1, "갈기가 있는 크고 힘센 동물이에요.", ["사자", "동물"], [["The lion is strong.", "사자는 힘이 세요."], ["I see a lion at the zoo.", "나는 동물원에서 사자를 봐요."]]],
  ["milk", "milk", "우유", "명사", "음식", 1, "소에게서 얻는 하얀 음료예요.", ["우유"], [["I drink milk.", "나는 우유를 마셔요."], ["Milk is white.", "우유는 하얘요."]]],
  ["moon", "moon", "달", "명사", "자연", 1, "밤하늘에서 볼 수 있는 밝은 천체예요.", ["달"], [["The moon is bright.", "달이 밝아요."], ["I see the moon.", "나는 달을 봐요."]]],
  ["mother", "MUH-ther", "어머니", "명사", "가족", 1, "나를 낳거나 돌봐 주는 여자 부모예요.", ["엄마", "어머니"], [["My mother is kind.", "우리 엄마는 친절해요."], ["I love my mother.", "나는 엄마를 사랑해요."]]],
  ["music", "MYOO-zik", "음악", "명사", "예술", 1, "노래나 악기 소리로 듣는 예술이에요.", ["음악", "노래"], [["I listen to music.", "나는 음악을 들어요."], ["Music makes me happy.", "음악은 나를 행복하게 해요."]]],
  ["name", "naym", "이름", "명사", "표현", 1, "사람이나 물건을 부르는 말이에요.", ["이름"], [["My name is Mina.", "내 이름은 미나예요."], ["What is your name?", "네 이름은 무엇이니?"]]],
  ["nose", "nohz", "코", "명사", "몸", 1, "냄새를 맡고 숨을 쉬는 몸의 부분이에요.", ["코", "몸"], [["I smell with my nose.", "나는 코로 냄새를 맡아요."], ["My nose is cold.", "내 코가 차가워요."]]],
  ["orange", "OR-inj", "오렌지, 주황색", "명사, 형용사", "음식", 1, "동그랗고 상큼한 과일이거나 주황색을 말해요.", ["오렌지", "주황색"], [["I eat an orange.", "나는 오렌지를 먹어요."], ["The orange is sweet.", "오렌지는 달콤해요."]]],
  ["paper", "PAY-per", "종이", "명사", "학교", 1, "글씨를 쓰거나 그림을 그리는 얇은 물건이에요.", ["종이"], [["I draw on paper.", "나는 종이에 그림을 그려요."], ["This paper is white.", "이 종이는 하얘요."]]],
  ["park", "park", "공원", "명사", "장소", 1, "사람들이 산책하거나 노는 넓은 곳이에요.", ["공원"], [["I play in the park.", "나는 공원에서 놀아요."], ["The park is green.", "공원은 초록빛이에요."]]],
  ["queen", "kween", "여왕", "명사", "사람", 2, "나라를 다스리는 여자예요.", ["여왕"], [["The queen is brave.", "여왕은 용감해요."], ["The queen has a crown.", "여왕은 왕관이 있어요."]]],
  ["read", "reed", "읽다", "동사", "학교", 1, "글자를 보고 뜻을 아는 행동이에요.", ["읽다"], [["I read a book.", "나는 책을 읽어요."], ["Read this word.", "이 단어를 읽어요."]]],
  ["rice", "rais", "밥, 쌀", "명사", "음식", 1, "우리가 자주 먹는 곡식이나 음식이에요.", ["밥", "쌀"], [["I eat rice.", "나는 밥을 먹어요."], ["Rice is warm.", "밥이 따뜻해요."]]],
  ["room", "room", "방", "명사", "집", 1, "집이나 건물 안의 한 공간이에요.", ["방"], [["My room is clean.", "내 방은 깨끗해요."], ["I sleep in my room.", "나는 내 방에서 자요."]]],
  ["sad", "sad", "슬픈", "형용사", "감정", 1, "기분이 좋지 않고 울고 싶은 상태예요.", ["슬픈", "슬프다"], [["I feel sad.", "나는 슬퍼요."], ["The sad boy cries.", "슬픈 소년이 울어요."]]],
  ["shoe", "shoo", "신발", "명사", "옷", 1, "발에 신고 걷는 물건이에요.", ["신발"], [["I wear shoes.", "나는 신발을 신어요."], ["My shoes are new.", "내 신발은 새것이에요."]]],
  ["sing", "sing", "노래하다", "동사", "예술", 1, "목소리로 가락을 내는 행동이에요.", ["노래하다", "노래"], [["I sing a song.", "나는 노래를 불러요."], ["She can sing well.", "그녀는 노래를 잘해요."]]],
  ["sister", "SIS-ter", "자매, 언니, 누나, 여동생", "명사", "가족", 1, "같은 부모를 둔 여자 형제예요.", ["자매", "언니", "누나", "여동생"], [["My sister is kind.", "내 여동생은 친절해요."], ["I play with my sister.", "나는 언니와 놀아요."]]],
  ["soccer", "SAH-ker", "축구", "명사", "운동", 1, "발로 공을 차서 하는 운동이에요.", ["축구", "운동"], [["We play soccer.", "우리는 축구를 해요."], ["I like soccer.", "나는 축구를 좋아해요."]]],
  ["star", "star", "별", "명사", "자연", 1, "밤하늘에서 반짝이는 빛나는 천체예요.", ["별"], [["The star is bright.", "별이 밝아요."], ["I see many stars.", "나는 많은 별을 봐요."]]],
  ["table", "TAY-buhl", "탁자, 식탁", "명사", "물건", 1, "물건을 올려놓거나 밥을 먹는 가구예요.", ["탁자", "식탁"], [["The book is on the table.", "책이 탁자 위에 있어요."], ["We eat at the table.", "우리는 식탁에서 먹어요."]]],
  ["tall", "tawl", "키가 큰", "형용사", "모양", 1, "높이나 키가 큰 상태예요.", ["키가 큰", "높은"], [["My brother is tall.", "내 형은 키가 커요."], ["The tree is tall.", "그 나무는 높아요."]]],
  ["toy", "toy", "장난감", "명사", "놀이", 1, "가지고 노는 물건이에요.", ["장난감"], [["I have a toy.", "나는 장난감이 있어요."], ["This toy is fun.", "이 장난감은 재미있어요."]]],
  ["tree", "tree", "나무", "명사", "자연", 1, "줄기와 가지, 잎이 있는 큰 식물이에요.", ["나무"], [["The tree is tall.", "그 나무는 높아요."], ["Birds sit in the tree.", "새들이 나무에 앉아요."]]],
  ["walk", "wawk", "걷다", "동사", "동작", 1, "두 발로 천천히 움직이는 행동이에요.", ["걷다", "산책"], [["I walk to school.", "나는 학교까지 걸어가요."], ["We walk in the park.", "우리는 공원에서 걸어요."]]],
  ["white", "wait", "흰색, 하얀색", "명사, 형용사", "색깔", 1, "눈이나 우유처럼 아주 밝고 흰 색이에요.", ["흰색", "하얀색", "흰"], [["Snow is white.", "눈은 하얘요."], ["I have a white shirt.", "나는 하얀 셔츠가 있어요."]]],
  ["window", "WIN-doh", "창문", "명사", "집", 1, "밖을 보거나 빛이 들어오는 유리문이에요.", ["창문"], [["Open the window.", "창문을 열어요."], ["I see the sky through the window.", "나는 창문으로 하늘을 봐요."]]],
  ["write", "rait", "쓰다", "동사", "학교", 1, "글자나 말을 종이에 적는 행동이에요.", ["쓰다", "적다"], [["I write my name.", "나는 내 이름을 써요."], ["Write the word.", "그 단어를 쓰세요."]]],
  ["yellow", "YEH-loh", "노란색", "명사, 형용사", "색깔", 1, "바나나나 해바라기에서 볼 수 있는 밝은 색이에요.", ["노란색", "노랑"], [["The sun is yellow.", "해는 노란색이에요."], ["I have a yellow pencil.", "나는 노란 연필이 있어요."]]],
];

dictionary.push(
  ...extraWords.map(([word, pronunciation, korean, part, category, level, definition, keywords, examples]) => ({
    word,
    pronunciation,
    korean,
    part,
    category,
    level,
    definition,
    keywords,
    examples,
  }))
);

const highSchoolWords = [
  ["abandon", "버리다, 포기하다", "동사"], ["ability", "능력", "명사"], ["absolute", "절대적인", "형용사"], ["absorb", "흡수하다", "동사"], ["abstract", "추상적인", "형용사"],
  ["abundant", "풍부한", "형용사"], ["academic", "학업의, 학문의", "형용사"], ["accelerate", "가속하다", "동사"], ["access", "접근, 접근하다", "명사, 동사"], ["accompany", "동반하다", "동사"],
  ["accomplish", "성취하다", "동사"], ["accurate", "정확한", "형용사"], ["achieve", "달성하다", "동사"], ["acknowledge", "인정하다", "동사"], ["acquire", "얻다, 습득하다", "동사"],
  ["adapt", "적응하다, 맞추다", "동사"], ["adequate", "충분한, 적절한", "형용사"], ["adjust", "조정하다, 적응하다", "동사"], ["administration", "관리, 행정", "명사"], ["admire", "존경하다, 감탄하다", "동사"],
  ["admit", "인정하다, 입장을 허락하다", "동사"], ["adopt", "채택하다, 입양하다", "동사"], ["advance", "진보, 발전하다", "명사, 동사"], ["advantage", "이점", "명사"], ["advertise", "광고하다", "동사"],
  ["advocate", "옹호하다, 지지자", "동사, 명사"], ["affect", "영향을 미치다", "동사"], ["afford", "여유가 있다, 제공하다", "동사"], ["agency", "기관, 대행사", "명사"], ["aggressive", "공격적인, 적극적인", "형용사"],
  ["agriculture", "농업", "명사"], ["alter", "바꾸다", "동사"], ["alternative", "대안, 대체의", "명사, 형용사"], ["ambiguous", "애매한", "형용사"], ["ambition", "야망, 포부", "명사"],
  ["analyze", "분석하다", "동사"], ["ancestor", "조상", "명사"], ["annual", "매년의", "형용사"], ["anticipate", "예상하다, 기대하다", "동사"], ["anxiety", "불안", "명사"],
  ["appear", "나타나다, ~처럼 보이다", "동사"], ["apparent", "분명한, 외관상의", "형용사"], ["appeal", "호소하다, 매력", "동사, 명사"], ["appetite", "식욕", "명사"], ["apply", "지원하다, 적용하다", "동사"], ["appreciate", "감사하다, 진가를 알다", "동사"],
  ["approach", "접근하다, 접근법", "동사, 명사"], ["appropriate", "적절한", "형용사"], ["approve", "승인하다", "동사"], ["approximately", "대략", "부사"], ["arise", "발생하다", "동사"],
  ["arrange", "정리하다, 준비하다", "동사"], ["artificial", "인공의", "형용사"], ["aspect", "측면", "명사"], ["assemble", "모으다, 조립하다", "동사"], ["assess", "평가하다", "동사"],
  ["assign", "배정하다, 할당하다", "동사"], ["assist", "돕다", "동사"], ["assume", "가정하다", "동사"], ["astonish", "놀라게 하다", "동사"], ["atmosphere", "분위기, 대기", "명사"],
  ["attach", "붙이다, 첨부하다", "동사"], ["attempt", "시도하다, 시도", "동사, 명사"], ["attitude", "태도", "명사"], ["attract", "끌다", "동사"], ["authority", "권위, 당국", "명사"],
  ["available", "이용 가능한", "형용사"], ["average", "평균, 평균의", "명사, 형용사"], ["avoid", "피하다", "동사"], ["aware", "알고 있는", "형용사"], ["benefit", "이익, 혜택", "명사"],
  ["bias", "편견", "명사"], ["biological", "생물학적인", "형용사"], ["brief", "간단한, 짧은", "형용사"], ["capable", "할 수 있는", "형용사"], ["capacity", "능력, 용량", "명사"],
  ["capture", "붙잡다, 포착하다", "동사"], ["career", "직업, 경력", "명사"], ["category", "범주", "명사"], ["cause", "원인, 야기하다", "명사, 동사"], ["celebrate", "축하하다", "동사"],
  ["challenge", "도전, 도전하다", "명사, 동사"], ["characteristic", "특징, 특징적인", "명사, 형용사"], ["circumstance", "상황, 환경", "명사"], ["civilization", "문명", "명사"], ["claim", "주장하다, 주장", "동사, 명사"],
  ["clarify", "명확히 하다", "동사"], ["collapse", "무너지다, 붕괴", "동사, 명사"], ["combine", "결합하다", "동사"], ["comfort", "편안함, 위로하다", "명사, 동사"], ["commit", "저지르다, 전념하다", "동사"],
  ["communicate", "의사소통하다", "동사"], ["community", "공동체", "명사"], ["compare", "비교하다", "동사"], ["compete", "경쟁하다", "동사"], ["complex", "복잡한", "형용사"],
  ["component", "구성 요소", "명사"], ["concentrate", "집중하다", "동사"], ["concept", "개념", "명사"], ["concern", "걱정, 관련되다", "명사, 동사"], ["conclude", "결론짓다", "동사"],
  ["condition", "상태, 조건", "명사"], ["conduct", "수행하다, 행동", "동사, 명사"], ["confident", "자신감 있는", "형용사"], ["conflict", "갈등, 충돌", "명사"], ["consequence", "결과", "명사"],
  ["consider", "고려하다", "동사"], ["consistent", "일관된", "형용사"], ["constant", "끊임없는", "형용사"], ["construct", "건설하다", "동사"], ["consume", "소비하다", "동사"],
  ["contact", "접촉, 연락하다", "명사, 동사"], ["contain", "포함하다", "동사"], ["context", "문맥, 상황", "명사"], ["contribute", "기여하다", "동사"], ["controversy", "논란", "명사"],
  ["convenient", "편리한", "형용사"], ["convince", "확신시키다", "동사"], ["cooperate", "협력하다", "동사"], ["crucial", "중대한", "형용사"], ["curious", "호기심 많은", "형용사"],
  ["debate", "토론, 토론하다", "명사, 동사"], ["decade", "10년", "명사"], ["declare", "선언하다", "동사"], ["decline", "감소하다, 거절하다", "동사"], ["define", "정의하다", "동사"],
  ["definite", "명확한", "형용사"], ["demonstrate", "증명하다, 보여주다", "동사"], ["deny", "부인하다", "동사"], ["depend", "의존하다, 달려 있다", "동사"], ["depress", "우울하게 하다", "동사"],
  ["derive", "얻다, 유래하다", "동사"], ["describe", "묘사하다", "동사"], ["deserve", "받을 만하다", "동사"], ["desire", "욕구, 바라다", "명사, 동사"], ["determine", "결정하다", "동사"],
  ["develop", "발달하다, 개발하다", "동사"], ["device", "장치", "명사"], ["devote", "바치다", "동사"], ["differ", "다르다", "동사"], ["dimension", "차원, 규모", "명사"],
  ["disappear", "사라지다", "동사"], ["disaster", "재난", "명사"], ["discipline", "규율, 학문 분야", "명사"], ["discover", "발견하다", "동사"], ["distinguish", "구별하다", "동사"],
  ["distribute", "분배하다", "동사"], ["diverse", "다양한", "형용사"], ["domestic", "국내의, 가정의", "형용사"], ["economy", "경제", "명사"], ["educate", "교육하다", "동사"],
  ["effective", "효과적인", "형용사"], ["efficient", "효율적인", "형용사"], ["eliminate", "제거하다", "동사"], ["emerge", "나타나다", "동사"], ["emphasize", "강조하다", "동사"],
  ["enable", "가능하게 하다", "동사"], ["encounter", "마주치다", "동사"], ["encourage", "격려하다", "동사"], ["engage", "참여하다, 관여하다", "동사"], ["enhance", "향상시키다", "동사"],
  ["enormous", "거대한", "형용사"], ["ensure", "보장하다", "동사"], ["environment", "환경", "명사"], ["establish", "설립하다, 확립하다", "동사"], ["estimate", "추정하다, 추정", "동사, 명사"],
  ["evaluate", "평가하다", "동사"], ["evidence", "증거", "명사"], ["evolve", "진화하다", "동사"], ["examine", "조사하다", "동사"], ["exceed", "초과하다", "동사"],
  ["exclude", "제외하다", "동사"], ["expand", "확장하다", "동사"], ["expect", "기대하다, 예상하다", "동사"], ["experiment", "실험", "명사"], ["explain", "설명하다", "동사"],
  ["explore", "탐험하다, 탐구하다", "동사"], ["expose", "노출시키다", "동사"], ["extend", "연장하다, 확장하다", "동사"], ["factor", "요인", "명사"], ["feature", "특징", "명사"],
  ["federal", "연방의", "형용사"], ["flexible", "유연한", "형용사"], ["focus", "집중하다, 초점", "동사, 명사"], ["frequent", "빈번한", "형용사"], ["function", "기능, 작동하다", "명사, 동사"],
  ["fundamental", "근본적인", "형용사"], ["generate", "발생시키다", "동사"], ["global", "세계적인", "형용사"], ["gradual", "점진적인", "형용사"], ["guarantee", "보장하다, 보증", "동사, 명사"],
  ["hesitate", "망설이다", "동사"], ["identify", "확인하다, 식별하다", "동사"], ["ignore", "무시하다", "동사"], ["illustrate", "설명하다, 보여주다", "동사"], ["impact", "영향, 충격", "명사"],
  ["implement", "실행하다", "동사"], ["imply", "암시하다", "동사"], ["improve", "향상시키다", "동사"], ["include", "포함하다", "동사"], ["income", "소득", "명사"],
  ["increase", "증가하다, 증가", "동사, 명사"], ["indicate", "나타내다", "동사"], ["individual", "개인, 개인의", "명사, 형용사"], ["industry", "산업", "명사"], ["influence", "영향, 영향을 미치다", "명사, 동사"],
  ["inform", "알리다", "동사"], ["initial", "처음의", "형용사"], ["innovation", "혁신", "명사"], ["insight", "통찰", "명사"], ["inspect", "검사하다", "동사"],
  ["inspire", "영감을 주다", "동사"], ["instance", "사례", "명사"], ["institute", "기관", "명사"], ["instruct", "가르치다, 지시하다", "동사"], ["intend", "의도하다", "동사"],
  ["interact", "상호작용하다", "동사"], ["interpret", "해석하다", "동사"], ["interrupt", "방해하다", "동사"], ["involve", "포함하다, 관련시키다", "동사"], ["issue", "문제, 쟁점", "명사"],
  ["justify", "정당화하다", "동사"], ["labor", "노동", "명사"], ["lack", "부족, 부족하다", "명사, 동사"], ["maintain", "유지하다", "동사"], ["major", "주요한, 전공", "형용사, 명사"],
  ["manufacture", "제조하다", "동사"], ["material", "재료, 물질", "명사"], ["measure", "측정하다, 조치", "동사, 명사"], ["media", "매체", "명사"], ["method", "방법", "명사"],
  ["minor", "사소한, 미성년자", "형용사, 명사"], ["motivate", "동기를 부여하다", "동사"], ["negative", "부정적인", "형용사"], ["obtain", "얻다", "동사"], ["obvious", "명백한", "형용사"],
  ["occur", "발생하다", "동사"], ["opportunity", "기회", "명사"], ["oppose", "반대하다", "동사"], ["ordinary", "평범한", "형용사"], ["organize", "조직하다, 정리하다", "동사"],
  ["participate", "참여하다", "동사"], ["particular", "특정한", "형용사"], ["perceive", "인지하다", "동사"], ["perform", "수행하다, 공연하다", "동사"], ["period", "기간, 시기", "명사"],
  ["permit", "허락하다", "동사"], ["perspective", "관점", "명사"], ["phenomenon", "현상", "명사"], ["policy", "정책", "명사"], ["positive", "긍정적인", "형용사"],
  ["potential", "잠재적인, 잠재력", "형용사, 명사"], ["predict", "예측하다", "동사"], ["prefer", "선호하다", "동사"], ["preserve", "보존하다", "동사"], ["prevent", "막다, 예방하다", "동사"],
  ["previous", "이전의", "형용사"], ["principle", "원칙", "명사"], ["priority", "우선순위", "명사"], ["process", "과정, 처리하다", "명사, 동사"], ["produce", "생산하다", "동사"],
  ["profit", "이익", "명사"], ["promote", "촉진하다, 승진시키다", "동사"], ["proper", "적절한", "형용사"], ["property", "재산, 특성", "명사"], ["proportion", "비율", "명사"],
  ["prove", "증명하다", "동사"], ["provide", "제공하다", "동사"], ["purpose", "목적", "명사"], ["pursue", "추구하다", "동사"], ["quality", "질, 품질", "명사"],
  ["quantity", "양", "명사"], ["rare", "드문", "형용사"], ["react", "반응하다", "동사"], ["recognize", "알아보다, 인정하다", "동사"], ["recommend", "추천하다", "동사"],
  ["recover", "회복하다", "동사"], ["reduce", "줄이다", "동사"], ["refer", "언급하다, 참조하다", "동사"], ["reflect", "반영하다, 반사하다", "동사"], ["region", "지역", "명사"],
  ["reject", "거절하다", "동사"], ["relate", "관련시키다", "동사"], ["release", "풀어주다, 발표하다", "동사"], ["relevant", "관련 있는", "형용사"], ["rely", "의존하다", "동사"],
  ["remain", "남아 있다", "동사"], ["remarkable", "주목할 만한", "형용사"], ["represent", "대표하다, 나타내다", "동사"], ["require", "요구하다", "동사"], ["research", "연구, 연구하다", "명사, 동사"],
  ["resource", "자원", "명사"], ["respond", "응답하다", "동사"], ["restrict", "제한하다", "동사"], ["result", "결과", "명사"], ["retain", "유지하다", "동사"],
  ["reveal", "드러내다", "동사"], ["risk", "위험", "명사"], ["significant", "중요한", "형용사"], ["similar", "비슷한", "형용사"], ["society", "사회", "명사"],
  ["source", "원천, 출처", "명사"], ["specific", "구체적인", "형용사"], ["strategy", "전략", "명사"], ["structure", "구조", "명사"], ["sufficient", "충분한", "형용사"],
  ["suggest", "제안하다, 암시하다", "동사"], ["supply", "공급하다, 공급", "동사, 명사"], ["support", "지원하다, 지지", "동사, 명사"], ["survey", "조사", "명사"], ["survive", "살아남다", "동사"],
  ["technology", "기술", "명사"], ["temporary", "일시적인", "형용사"], ["tend", "경향이 있다", "동사"], ["theory", "이론", "명사"], ["threat", "위협", "명사"],
  ["transfer", "옮기다, 이동", "동사, 명사"], ["transform", "변형시키다", "동사"], ["translate", "번역하다", "동사"], ["transport", "수송하다, 교통", "동사, 명사"], ["trend", "경향", "명사"],
  ["typical", "전형적인", "형용사"], ["unique", "독특한", "형용사"], ["urban", "도시의", "형용사"], ["vary", "다양하다, 달라지다", "동사"], ["vehicle", "차량", "명사"],
  ["version", "판, 버전", "명사"], ["violent", "폭력적인", "형용사"], ["vision", "시야, 비전", "명사"], ["vital", "필수적인", "형용사"], ["volunteer", "자원봉사자, 자원하다", "명사, 동사"],
  ["welfare", "복지", "명사"], ["willing", "기꺼이 하는", "형용사"], ["witness", "목격자, 목격하다", "명사, 동사"], ["worth", "가치가 있는", "형용사"], ["yield", "생산하다, 양보하다", "동사"],
];

const wordStructureNotes = {
  disappear: {
    formula: "dis + appear",
    parts: [
      ["dis-", "반대, 부정, 떨어져 나감을 나타내는 접두어"],
      ["appear", "나타나다, 보이다"],
    ],
    meaning: "appear가 '나타나다'이고 dis-가 반대 느낌을 더해서 disappear는 '나타나지 않다', 즉 '사라지다'라는 뜻이 돼요.",
  },
  discover: {
    formula: "dis + cover",
    parts: [
      ["dis-", "덮인 것을 벗겨 내거나 반대로 만드는 느낌"],
      ["cover", "덮다"],
    ],
    meaning: "cover가 '덮다'라면 discover는 덮인 것을 걷어 내어 '발견하다'라는 뜻으로 이어져요.",
  },
  viewer: {
    formula: "view + -er",
    parts: [
      ["view", "보다, 보기"],
      ["-er", "~하는 사람을 만드는 말"],
    ],
    meaning: "view가 '보다'이고 -er가 사람을 나타내서 viewer는 '보는 사람', 즉 시청자나 관람자라는 뜻이 돼요.",
  },
  viewers: {
    formula: "viewer + -s",
    parts: [
      ["viewer", "시청자, 관람자"],
      ["-s", "둘 이상을 나타내는 복수 표시"],
    ],
    meaning: "viewer에 복수형 -s가 붙어서 viewers는 '시청자들, 관람자들'이라는 뜻이에요.",
  },
  comforting: {
    formula: "comfort + -ing",
    parts: [
      ["comfort", "위로하다, 편안하게 하다"],
      ["-ing", "상태나 느낌을 나타내는 말"],
    ],
    meaning: "comforting은 comfort에 -ing가 붙어서 '위로가 되는, 마음을 편안하게 하는' 뜻으로 쓰여요.",
  },
  locally: {
    formula: "local + -ly",
    parts: [
      ["local", "지역의, 현지의"],
      ["-ly", "형용사를 부사로 바꾸는 말"],
    ],
    meaning: "locally는 local에 -ly가 붙어서 '지역적으로, 현지에서'라는 뜻의 부사가 돼요.",
  },
};

dictionary.push(
  ...highSchoolWords.map(([word, korean, part]) => ({
    word,
    pronunciation: word,
    korean,
    part,
    category: "고등 필수",
    level: 4,
    definition: `고등 영어 독해와 내신, 수능 지문에서 자주 쓰이는 단어예요. 뜻은 '${korean}'입니다.`,
    keywords: korean.split(/, |,| /).filter(Boolean),
    examples: [
      [`I learned the word "${word}" today.`, `나는 오늘 '${word}'라는 단어를 배웠어요.`],
      [`This word is useful in English reading.`, `이 단어는 영어 독해에 유용해요.`],
    ],
    structure: wordStructureNotes[word] ?? null,
  }))
);

const businessWords = [
  ["meeting", "회의", "명사", "회의"], ["agenda", "회의 안건", "명사", "회의"], ["alignment", "방향 일치, 조율", "명사", "회의"], ["approval", "승인", "명사", "결재"], ["authorize", "승인하다, 권한을 주다", "동사", "결재"], ["briefing", "보고, 브리핑", "명사", "보고"],
  ["deadline", "마감일", "명사", "프로젝트"], ["deliverable", "산출물", "명사", "프로젝트"], ["milestone", "중요 일정, 이정표", "명사", "프로젝트"], ["timeline", "일정표", "명사", "프로젝트"], ["roadmap", "로드맵, 추진 계획", "명사", "프로젝트"],
  ["workflow", "업무 흐름", "명사", "업무"], ["handover", "인수인계", "명사", "업무"], ["onboarding", "신규 입사자 적응 과정", "명사", "인사"], ["offboarding", "퇴사 절차", "명사", "인사"], ["stakeholder", "이해관계자", "명사", "프로젝트"],
  ["accountable", "책임이 있는", "형용사", "업무"], ["responsible", "담당하는, 책임 있는", "형용사", "업무"], ["ownership", "책임 의식, 소유권", "명사", "업무"], ["initiative", "계획, 주도권", "명사", "업무"], ["proactive", "주도적인", "형용사", "업무"],
  ["followup", "후속 조치", "명사", "메일"], ["recap", "요약, 정리", "명사", "메일"], ["attachment", "첨부 파일", "명사", "메일"], ["recipient", "수신자", "명사", "메일"], ["sender", "발신자", "명사", "메일"],
  ["inbox", "받은 편지함", "명사", "메일"], ["draft", "초안", "명사", "문서"], ["template", "서식, 템플릿", "명사", "문서"], ["document", "문서", "명사", "문서"], ["revise", "수정하다", "동사", "문서"],
  ["finalize", "최종 확정하다", "동사", "문서"], ["circulate", "공유하다, 회람하다", "동사", "문서"], ["reference", "참조, 참고 자료", "명사", "문서"], ["appendix", "부록", "명사", "문서"], ["summary", "요약", "명사", "보고"],
  ["overview", "개요", "명사", "보고"], ["insight", "통찰, 시사점", "명사", "보고"], ["finding", "발견 사항, 조사 결과", "명사", "보고"], ["recommendation", "권고안, 추천", "명사", "보고"], ["proposal", "제안서, 제안", "명사", "제안"],
  ["quotation", "견적서, 인용", "명사", "영업"], ["estimate", "견적, 추정하다", "명사, 동사", "영업"], ["invoice", "청구서, 송장", "명사", "재무"], ["receipt", "영수증", "명사", "재무"], ["payment", "지불, 결제", "명사", "재무"],
  ["expense", "비용, 경비", "명사", "재무"], ["reimbursement", "비용 환급", "명사", "재무"], ["budget", "예산", "명사", "재무"], ["forecast", "예측, 전망", "명사, 동사", "재무"], ["revenue", "매출", "명사", "재무"],
  ["profit", "이익", "명사", "재무"], ["margin", "마진, 수익률", "명사", "재무"], ["cost", "비용", "명사", "재무"], ["asset", "자산", "명사", "재무"], ["liability", "부채, 책임", "명사", "재무"],
  ["audit", "감사, 검토하다", "명사, 동사", "재무"], ["compliance", "규정 준수", "명사", "법무"], ["regulation", "규정, 규제", "명사", "법무"], ["policy", "정책, 방침", "명사", "법무"], ["procedure", "절차", "명사", "업무"],
  ["contract", "계약, 계약서", "명사", "계약"], ["agreement", "합의, 계약", "명사", "계약"], ["clause", "조항", "명사", "계약"], ["term", "조건, 기간", "명사", "계약"], ["condition", "조건", "명사", "계약"],
  ["negotiate", "협상하다", "동사", "계약"], ["renewal", "갱신", "명사", "계약"], ["termination", "종료, 해지", "명사", "계약"], ["confidential", "기밀의", "형용사", "법무"], ["disclosure", "공개, 공개 사항", "명사", "법무"],
  ["vendor", "공급업체", "명사", "구매"], ["supplier", "공급자", "명사", "구매"], ["procurement", "조달, 구매", "명사", "구매"], ["purchase", "구매, 구매하다", "명사, 동사", "구매"], ["inventory", "재고", "명사", "구매"],
  ["shipment", "배송, 선적", "명사", "물류"], ["delivery", "배송, 납품", "명사", "물류"], ["logistics", "물류", "명사", "물류"], ["warehouse", "창고", "명사", "물류"], ["tracking", "추적", "명사", "물류"],
  ["customer", "고객", "명사", "영업"], ["client", "고객, 의뢰인", "명사", "영업"], ["prospect", "잠재 고객", "명사", "영업"], ["lead", "영업 단서, 잠재 고객", "명사", "영업"], ["pipeline", "영업 파이프라인", "명사", "영업"],
  ["conversion", "전환", "명사", "마케팅"], ["retention", "유지, 고객 유지", "명사", "마케팅"], ["acquisition", "획득, 인수", "명사", "마케팅"], ["campaign", "캠페인", "명사", "마케팅"], ["promotion", "홍보, 판촉", "명사", "마케팅"],
  ["branding", "브랜딩", "명사", "마케팅"], ["positioning", "포지셔닝", "명사", "마케팅"], ["segment", "고객군, 부문", "명사", "마케팅"], ["target", "목표, 대상", "명사", "마케팅"], ["audience", "대상 청중", "명사", "마케팅"],
  ["analytics", "분석 데이터", "명사", "데이터"], ["dashboard", "대시보드", "명사", "데이터"], ["metric", "지표", "명사", "데이터"], ["indicator", "지표", "명사", "데이터"], ["benchmark", "기준점, 벤치마크", "명사", "데이터"],
  ["performance", "성과, 실적", "명사", "성과"], ["productivity", "생산성", "명사", "성과"], ["efficiency", "효율성", "명사", "성과"], ["effectiveness", "효과성", "명사", "성과"], ["outcome", "결과", "명사", "성과"],
  ["objective", "목표", "명사", "성과"], ["goal", "목표", "명사", "성과"], ["priority", "우선순위", "명사", "업무"], ["constraint", "제약 조건", "명사", "프로젝트"], ["dependency", "의존 관계", "명사", "프로젝트"],
  ["blocker", "진행을 막는 문제", "명사", "프로젝트"], ["issue", "문제, 이슈", "명사", "프로젝트"], ["risk", "위험, 리스크", "명사", "프로젝트"], ["mitigation", "완화, 대응책", "명사", "프로젝트"], ["contingency", "비상 대책", "명사", "프로젝트"],
  ["escalate", "상급자에게 올리다, 확대하다", "동사", "업무"], ["delegate", "위임하다", "동사", "업무"], ["coordinate", "조율하다", "동사", "업무"], ["collaborate", "협업하다", "동사", "업무"], ["facilitate", "촉진하다, 진행을 돕다", "동사", "회의"],
  ["schedule", "일정을 잡다, 일정", "명사, 동사", "일정"], ["reschedule", "일정을 변경하다", "동사", "일정"], ["postpone", "연기하다", "동사", "일정"], ["cancel", "취소하다", "동사", "일정"], ["availability", "가능 시간, 이용 가능성", "명사", "일정"],
  ["appointment", "약속, 일정", "명사", "일정"], ["conference", "회의, 컨퍼런스", "명사", "회의"], ["workshop", "워크숍", "명사", "회의"], ["seminar", "세미나", "명사", "회의"], ["minutes", "회의록", "명사", "회의"],
  ["action", "조치", "명사", "업무"], ["actionable", "실행 가능한", "형용사", "업무"], ["decision", "결정", "명사", "업무"], ["consensus", "합의", "명사", "회의"], ["feedback", "피드백", "명사", "업무"],
  ["review", "검토, 검토하다", "명사, 동사", "업무"], ["approve", "승인하다", "동사", "결재"], ["reject", "거절하다, 반려하다", "동사", "결재"], ["submit", "제출하다", "동사", "결재"], ["request", "요청, 요청하다", "명사, 동사", "업무"],
  ["confirm", "확인하다", "동사", "업무"], ["clarify", "명확히 하다", "동사", "업무"], ["address", "다루다, 해결하다", "동사", "업무"], ["resolve", "해결하다", "동사", "업무"], ["investigate", "조사하다", "동사", "업무"],
  ["troubleshoot", "문제를 해결하다", "동사", "IT"], ["deploy", "배포하다", "동사", "IT"], ["release", "출시, 배포하다", "명사, 동사", "IT"], ["rollback", "되돌리기", "명사", "IT"], ["backup", "백업", "명사", "IT"],
  ["database", "데이터베이스", "명사", "IT"], ["server", "서버", "명사", "IT"], ["network", "네트워크", "명사", "IT"], ["security", "보안", "명사", "IT"], ["permission", "권한", "명사", "IT"],
  ["access", "접근 권한, 접근하다", "명사, 동사", "IT"], ["credential", "인증 정보", "명사", "IT"], ["authentication", "인증", "명사", "IT"], ["authorization", "권한 부여", "명사", "IT"], ["encryption", "암호화", "명사", "IT"],
  ["integration", "연동, 통합", "명사", "IT"], ["automation", "자동화", "명사", "IT"], ["configuration", "설정", "명사", "IT"], ["infrastructure", "인프라", "명사", "IT"], ["maintenance", "유지보수", "명사", "IT"],
  ["recruit", "채용하다", "동사", "인사"], ["candidate", "지원자, 후보자", "명사", "인사"], ["interview", "면접, 인터뷰", "명사", "인사"], ["hire", "고용하다", "동사", "인사"], ["resign", "퇴사하다, 사임하다", "동사", "인사"],
  ["promotion", "승진, 판촉", "명사", "인사"], ["compensation", "보상, 급여", "명사", "인사"], ["benefit", "복리후생, 혜택", "명사", "인사"], ["payroll", "급여 지급 명부", "명사", "인사"], ["attendance", "근태, 출석", "명사", "인사"],
  ["remote", "원격의", "형용사", "근무"], ["hybrid", "혼합형의", "형용사", "근무"], ["commute", "통근하다", "동사", "근무"], ["overtime", "초과 근무", "명사", "근무"], ["leave", "휴가, 떠나다", "명사, 동사", "근무"],
  ["vacation", "휴가", "명사", "근무"], ["absence", "부재, 결근", "명사", "근무"], ["shift", "교대 근무", "명사", "근무"], ["workload", "업무량", "명사", "근무"], ["burnout", "번아웃, 소진", "명사", "근무"],
  ["executive", "임원", "명사", "조직"], ["manager", "관리자", "명사", "조직"], ["director", "이사, 책임자", "명사", "조직"], ["department", "부서", "명사", "조직"], ["division", "부문, 사업부", "명사", "조직"],
  ["headquarters", "본사", "명사", "조직"], ["branch", "지점", "명사", "조직"], ["subsidiary", "자회사", "명사", "조직"], ["affiliate", "계열사", "명사", "조직"], ["partnership", "파트너십, 제휴", "명사", "조직"],
  ["strategy", "전략", "명사", "전략"], ["tactic", "전술", "명사", "전략"], ["execution", "실행", "명사", "전략"], ["operation", "운영", "명사", "전략"], ["growth", "성장", "명사", "전략"],
  ["scalable", "확장 가능한", "형용사", "전략"], ["sustainable", "지속 가능한", "형용사", "전략"], ["competitive", "경쟁력 있는", "형용사", "전략"], ["advantage", "이점, 우위", "명사", "전략"], ["innovation", "혁신", "명사", "전략"],
  ["conflict", "갈등, 충돌", "명사", "소통"], ["complaint", "불만, 항의", "명사", "소통"], ["apology", "사과", "명사", "소통"], ["appreciation", "감사", "명사", "소통"], ["courtesy", "예의", "명사", "소통"],
  ["negotiate", "협상하다", "동사", "소통"], ["persuade", "설득하다", "동사", "소통"], ["explain", "설명하다", "동사", "소통"], ["summarize", "요약하다", "동사", "소통"], ["emphasize", "강조하다", "동사", "소통"],
  ["confidentiality", "기밀 유지", "명사", "법무"], ["liability", "책임, 부채", "명사", "법무"], ["warranty", "보증", "명사", "법무"], ["patent", "특허", "명사", "법무"], ["trademark", "상표", "명사", "법무"],
  ["copyright", "저작권", "명사", "법무"], ["license", "라이선스, 허가", "명사", "법무"], ["ownership", "소유권", "명사", "법무"], ["dispute", "분쟁", "명사", "법무"], ["settlement", "합의, 정산", "명사", "법무"],
];

const knownBusinessWords = new Set(dictionary.map((entry) => entry.word.toLowerCase()));
dictionary.push(
  ...businessWords
    .filter(([word]) => !knownBusinessWords.has(word.toLowerCase()))
    .map(([word, korean, part, topic]) => ({
      word,
      pronunciation: word,
      korean,
      part,
      category: `업무 영어 · ${topic}`,
      level: 5,
      definition: `직장 업무, 회의, 이메일, 보고, 계약, 실무 커뮤니케이션에서 자주 쓰이는 표현이에요. 뜻은 '${korean}'입니다.`,
      keywords: korean.split(/, |,| /).filter(Boolean),
      examples: [
        [`Please review the ${word} before the meeting.`, `회의 전에 ${korean}을/를 검토해 주세요.`],
        [`This ${word} is important for our work.`, `이 ${korean}은/는 우리 업무에 중요해요.`],
      ],
      structure: wordStructureNotes[word] ?? null,
    }))
);

const koreanCoreWords = [
  {
    word: "person",
    pronunciation: "PUR-suhn",
    korean: "사람, 개인",
    part: "명사",
    category: "기본 한영",
    level: 2,
    definition: "한 명의 사람이나 개인을 뜻해요. 한국어로 '사람'을 검색하면 가장 먼저 나와야 하는 기본 단어예요.",
    keywords: ["사람", "개인", "인물"],
    examples: [
      ["She is a kind person.", "그녀는 친절한 사람이에요."],
      ["One person is waiting.", "한 사람이 기다리고 있어요."],
    ],
  },
  {
    word: "human",
    pronunciation: "HYOO-muhn",
    korean: "인간, 사람",
    part: "명사, 형용사",
    category: "기본 한영",
    level: 3,
    definition: "동물이나 기계와 구별되는 인간, 사람을 뜻해요.",
    keywords: ["인간", "사람", "인류"],
    examples: [
      ["Humans need water.", "인간은 물이 필요해요."],
      ["This is a human problem.", "이것은 인간의 문제예요."],
    ],
  },
  {
    word: "people",
    pronunciation: "PEE-puhl",
    korean: "사람들, 국민",
    part: "명사",
    category: "기본 한영",
    level: 2,
    definition: "여러 명의 사람들을 뜻해요. person의 복수 의미로 자주 써요.",
    keywords: ["사람들", "사람", "국민"],
    examples: [
      ["Many people use English at work.", "많은 사람들이 직장에서 영어를 사용해요."],
      ["People are waiting outside.", "사람들이 밖에서 기다리고 있어요."],
    ],
  },
  {
    word: "adult",
    pronunciation: "uh-DUHLT",
    korean: "성인, 어른",
    part: "명사",
    category: "기본 한영",
    level: 2,
    definition: "다 자란 사람, 즉 어른을 뜻해요.",
    keywords: ["성인", "어른", "사람"],
    examples: [
      ["An adult can join the program.", "성인은 그 프로그램에 참여할 수 있어요."],
      ["This class is for adults.", "이 수업은 어른들을 위한 것이에요."],
    ],
  },
  {
    word: "employee",
    pronunciation: "em-PLOY-ee",
    korean: "직원, 근로자",
    part: "명사",
    category: "업무 영어 · 인사",
    level: 5,
    definition: "회사나 기관에 고용되어 일하는 사람을 뜻해요.",
    keywords: ["직원", "근로자", "회사원", "사람"],
    examples: [
      ["Each employee has an email account.", "각 직원은 이메일 계정을 가지고 있어요."],
      ["The company hired a new employee.", "회사가 새 직원을 고용했어요."],
    ],
  },
];

const knownKoreanCoreWords = new Set(dictionary.map((entry) => entry.word.toLowerCase()));
dictionary.push(...koreanCoreWords.filter((entry) => !knownKoreanCoreWords.has(entry.word.toLowerCase())));

const coreDictionaryWords = [
  {
    word: "world",
    pronunciation: "wurld",
    korean: "세계, 세상, 지구",
    part: "명사",
    category: "기본 영한",
    level: 2,
    definition: "우리가 사는 지구나 지구에 사는 사람들, 또는 어떤 분야 전체를 뜻해요.",
    senses: [
      { part: "명사", meaning: "세계, 세상" },
      { part: "명사", meaning: "지구" },
      { part: "명사", meaning: "특정한 분야나 집단", reference: "the business world" },
    ],
    keywords: ["세계", "세상", "지구", "분야"],
    examples: [
      ["The world is very large.", "세계는 아주 넓어요."],
      ["People around the world use English.", "전 세계 사람들이 영어를 사용해요."],
    ],
  },
  {
    word: "time",
    pronunciation: "taim",
    korean: "시간, 때, 번",
    part: "명사",
    category: "기본 영한",
    level: 1,
    definition: "시계로 재는 시간, 어떤 일이 일어나는 때, 또는 횟수를 뜻해요.",
    keywords: ["시간", "때", "번", "시각"],
    examples: [
      ["What time is it?", "지금 몇 시예요?"],
      ["I need more time.", "나는 시간이 더 필요해요."],
    ],
  },
  {
    word: "year",
    pronunciation: "yeer",
    korean: "해, 년, 1년",
    part: "명사",
    category: "기본 영한",
    level: 1,
    definition: "1월부터 12월까지의 기간, 또는 365일 정도의 시간을 뜻해요.",
    keywords: ["해", "년", "1년", "연도"],
    examples: [
      ["This year is important.", "올해는 중요해요."],
      ["A year has twelve months.", "1년은 열두 달이에요."],
    ],
  },
  {
    word: "day",
    pronunciation: "day",
    korean: "날, 하루, 낮",
    part: "명사",
    category: "기본 영한",
    level: 1,
    definition: "하루 또는 아침부터 밤까지의 시간을 뜻해요.",
    keywords: ["날", "하루", "낮"],
    examples: [
      ["Have a good day.", "좋은 하루 보내세요."],
      ["It is a sunny day.", "화창한 날이에요."],
    ],
  },
  {
    word: "work",
    pronunciation: "wurk",
    korean: "일, 업무, 일하다",
    part: "명사, 동사",
    category: "기본 영한",
    level: 2,
    definition: "해야 하는 일이나 직장에서 하는 업무, 또는 일하는 행동을 뜻해요.",
    keywords: ["일", "업무", "일하다", "직장"],
    examples: [
      ["I have work today.", "나는 오늘 일이 있어요."],
      ["She works at a company.", "그녀는 회사에서 일해요."],
    ],
  },
  {
    word: "company",
    pronunciation: "KUHM-puh-nee",
    korean: "회사, 함께 있음",
    part: "명사",
    category: "기본 영한",
    level: 2,
    definition: "물건이나 서비스를 만들고 파는 조직, 또는 누군가와 함께 있는 상태를 뜻해요.",
    keywords: ["회사", "기업", "함께"],
    examples: [
      ["He works for a company.", "그는 회사에서 일해요."],
      ["This company makes software.", "이 회사는 소프트웨어를 만들어요."],
    ],
  },
  {
    word: "business",
    pronunciation: "BIZ-nis",
    korean: "사업, 업무, 거래",
    part: "명사",
    category: "기본 영한",
    level: 3,
    definition: "돈을 벌기 위한 사업이나 회사 업무, 거래 활동을 뜻해요.",
    keywords: ["사업", "업무", "거래", "비즈니스"],
    examples: [
      ["She started a small business.", "그녀는 작은 사업을 시작했어요."],
      ["Business English is useful at work.", "비즈니스 영어는 직장에서 유용해요."],
    ],
  },
  {
    word: "life",
    pronunciation: "laif",
    korean: "삶, 생명, 생활",
    part: "명사",
    category: "기본 영한",
    level: 2,
    definition: "사람이나 동물이 살아 있는 상태, 또는 살아가는 방식을 뜻해요.",
    keywords: ["삶", "생명", "생활"],
    examples: [
      ["Life is precious.", "생명은 소중해요."],
      ["School life can be fun.", "학교생활은 즐거울 수 있어요."],
    ],
  },
  {
    word: "place",
    pronunciation: "plays",
    korean: "장소, 곳, 놓다",
    part: "명사, 동사",
    category: "기본 영한",
    level: 2,
    definition: "어떤 위치나 장소, 또는 물건을 어디에 두는 행동을 뜻해요.",
    keywords: ["장소", "곳", "위치", "놓다"],
    examples: [
      ["This is a quiet place.", "이곳은 조용한 장소예요."],
      ["Place the book on the desk.", "책을 책상 위에 놓으세요."],
    ],
  },
  {
    word: "case",
    pronunciation: "kays",
    korean: "경우, 사건, 사례, 상자",
    part: "명사",
    category: "기본 영한",
    level: 3,
    definition: "어떤 상황이나 사건, 예시가 되는 사례, 또는 물건을 담는 상자를 뜻해요.",
    keywords: ["경우", "사건", "사례", "상자"],
    examples: [
      ["In this case, we should wait.", "이 경우에는 기다려야 해요."],
      ["This is an important case.", "이것은 중요한 사례예요."],
    ],
  },
  {
    word: "government",
    pronunciation: "GUHV-ern-muhnt",
    korean: "정부",
    part: "명사",
    category: "기본 영한",
    level: 3,
    definition: "나라나 지역을 운영하고 법과 정책을 정하는 기관을 뜻해요.",
    keywords: ["정부", "국가 기관", "정책"],
    examples: [
      ["The government made a new rule.", "정부가 새 규칙을 만들었어요."],
      ["People choose the government by voting.", "사람들은 투표로 정부를 선택해요."],
    ],
  },
  {
    word: "computer",
    pronunciation: "kuhm-PYOO-ter",
    korean: "컴퓨터",
    part: "명사",
    category: "기본 영한",
    level: 2,
    definition: "정보를 저장하고 계산하며 여러 프로그램을 실행하는 전자 기기예요.",
    keywords: ["컴퓨터", "전자 기기", "프로그램"],
    examples: [
      ["I use a computer for homework.", "나는 숙제할 때 컴퓨터를 사용해요."],
      ["The computer is fast.", "그 컴퓨터는 빨라요."],
    ],
  },
  {
    word: "gold",
    pronunciation: "gohld",
    korean: "금, 금색, 황금",
    part: "명사, 형용사",
    category: "기본 영한",
    level: 2,
    definition: "귀금속인 금, 또는 금처럼 노란 빛이 나는 색을 뜻해요.",
    senses: [
      { part: "명사", meaning: "귀금속인 금, 황금" },
      { part: "명사", meaning: "금색" },
      { part: "형용사", meaning: "금으로 된, 금색의" },
    ],
    keywords: ["금", "금색", "황금", "귀금속", "노란색"],
    examples: [
      ["Gold is a precious metal.", "금은 귀한 금속이에요."],
      ["She has a gold ring.", "그녀는 금반지를 가지고 있어요."],
    ],
  },
  {
    word: "golden",
    pronunciation: "GOHL-duhn",
    korean: "금빛의, 황금색의, 귀중한",
    part: "형용사",
    category: "기본 영한",
    level: 2,
    definition: "금처럼 빛나는 색이나 매우 좋고 귀중한 것을 뜻해요.",
    senses: [
      { part: "형용사", meaning: "금빛의, 황금색의" },
      { part: "형용사", meaning: "아주 좋은, 귀중한", reference: "a golden opportunity" },
    ],
    keywords: ["금빛", "황금빛", "황금색", "금색", "귀중한", "좋은"],
    examples: [
      ["The sun made the sky golden.", "해가 하늘을 금빛으로 만들었어요."],
      ["This is a golden opportunity.", "이것은 아주 좋은 기회예요."],
    ],
  },
  {
    word: "neighbor",
    pronunciation: "NAY-ber",
    korean: "이웃, 근처 사람",
    part: "명사",
    category: "기본 영한",
    level: 2,
    definition: "가까운 집이나 주변에 사는 사람을 뜻해요.",
    senses: [
      { part: "명사", meaning: "이웃, 근처에 사는 사람" },
      { part: "명사", meaning: "옆자리나 가까운 곳에 있는 사람" },
    ],
    keywords: ["이웃", "근처 사람", "주변 사람", "옆집 사람"],
    examples: [
      ["My neighbor is kind.", "내 이웃은 친절해요."],
      ["We helped our new neighbor.", "우리는 새 이웃을 도왔어요."],
    ],
  },
  {
    word: "neighbors",
    pronunciation: "NAY-berz",
    korean: "이웃들",
    part: "명사",
    category: "기본 영한",
    level: 2,
    definition: "neighbor의 복수형으로, 여러 명의 이웃을 뜻해요.",
    keywords: ["이웃들", "주변 사람들", "옆집 사람들"],
    examples: [
      ["Our neighbors are friendly.", "우리 이웃들은 친절해요."],
      ["The neighbors talked outside.", "이웃들이 밖에서 이야기했어요."],
    ],
  },
  {
    word: "neighbour",
    pronunciation: "NAY-ber",
    korean: "이웃, 근처 사람",
    part: "명사",
    category: "기본 영한",
    level: 2,
    definition: "neighbor의 영국식 철자예요.",
    keywords: ["이웃", "근처 사람", "영국식 철자"],
    examples: [
      ["My neighbour lives next door.", "내 이웃은 옆집에 살아요."],
      ["She greeted her neighbour.", "그녀는 이웃에게 인사했어요."],
    ],
  },
  {
    word: "neighborhood",
    pronunciation: "NAY-ber-hood",
    korean: "동네, 근처, 이웃 지역",
    part: "명사",
    category: "기본 영한",
    level: 2,
    definition: "집이나 학교 가까이에 있는 동네나 주변 지역을 뜻해요.",
    structure: {
      formula: "neighbor + hood",
      parts: [
        ["neighbor", "이웃"],
        ["hood", "상태나 집단을 나타내는 말"],
      ],
      meaning: "이웃들이 함께 사는 지역이라는 뜻에서 '동네, 근처, 이웃 지역'이 돼요.",
    },
    keywords: ["동네", "근처", "이웃 지역", "주변 지역", "지역"],
    examples: [
      ["This neighborhood is quiet.", "이 동네는 조용해요."],
      ["There is a park in our neighborhood.", "우리 동네에는 공원이 있어요."],
    ],
  },
];

const knownCoreDictionaryWords = new Set(dictionary.map((entry) => entry.word.toLowerCase()));
dictionary.push(...coreDictionaryWords.filter((entry) => !knownCoreDictionaryWords.has(entry.word.toLowerCase())));

const manualSearchFixWords = [
  {
    word: "comforting",
    pronunciation: "KUHM-fer-ting",
    korean: "위로가 되는, 마음을 편안하게 하는",
    part: "형용사",
    category: "중학 기본",
    level: 2,
    definition: "사람의 마음을 달래 주거나 편안하게 해 주는 상태를 나타내는 말이에요.",
    keywords: ["위로가 되는", "마음을 편안하게 하는", "안심되는"],
    examples: [
      ["Her voice was comforting.", "그녀의 목소리는 위로가 되었어요."],
      ["The teacher gave comforting words.", "선생님은 위로가 되는 말을 해 주셨어요."],
    ],
    structure: wordStructureNotes.comforting,
  },
  {
    word: "locally",
    pronunciation: "LOH-kuh-lee",
    korean: "지역적으로, 현지에서, 가까운 곳에서",
    part: "부사",
    category: "중학 기본",
    level: 2,
    definition: "어떤 일이 한 지역 안에서 일어나거나 가까운 곳에서 이루어짐을 나타내는 말이에요.",
    keywords: ["지역적으로", "현지에서", "가까운 곳에서"],
    examples: [
      ["The food is produced locally.", "그 음식은 현지에서 생산돼요."],
      ["We buy fruit locally.", "우리는 과일을 가까운 곳에서 사요."],
    ],
    structure: wordStructureNotes.locally,
  },
];

const knownManualSearchFixWords = new Set(dictionary.map((entry) => entry.word.toLowerCase()));
dictionary.push(...manualSearchFixWords.filter((entry) => !knownManualSearchFixWords.has(entry.word.toLowerCase())));

const commonTopEnglishWords = [
  ["the", "그, 바로 그; 정관사", "관사", ["그", "바로 그", "정관사"]],
  ["of", "~의, ~로 된", "전치사", ["의", "~의"]],
  ["and", "그리고, 및", "접속사", ["그리고", "및"]],
  ["to", "~로, ~에게, ~하기 위해", "전치사, 부정사", ["로", "에게", "위해"]],
  ["a", "하나의, 어떤; 부정관사", "관사", ["하나의", "어떤", "부정관사"]],
  ["in", "~안에, ~에서", "전치사", ["안에", "에서"]],
  ["for", "~을 위해, ~동안", "전치사", ["위해", "동안"]],
  ["is", "~이다, 있다", "동사", ["이다", "있다"]],
  ["on", "~위에, 켜진", "전치사, 부사", ["위에", "켜진"]],
  ["that", "저것, 그, ~라는 것", "대명사, 접속사", ["저것", "그"]],
  ["by", "~에 의해, ~옆에", "전치사", ["에 의해", "옆에"]],
  ["this", "이것, 이", "대명사, 형용사", ["이것", "이"]],
  ["with", "~와 함께, ~을 가지고", "전치사", ["함께", "가지고"]],
  ["i", "나", "대명사", ["나", "저"]],
  ["you", "너, 당신, 여러분", "대명사", ["너", "당신", "여러분"]],
  ["it", "그것", "대명사", ["그것"]],
  ["not", "~아니다, ~하지 않다", "부사", ["아니다", "않다"]],
  ["or", "또는, 혹은", "접속사", ["또는", "혹은"]],
  ["be", "~이다, 있다, 되다", "동사", ["이다", "있다", "되다"]],
  ["are", "~이다, 있다", "동사", ["이다", "있다"]],
  ["from", "~에서, ~부터", "전치사", ["에서", "부터"]],
  ["at", "~에, ~에서", "전치사", ["에", "에서"]],
  ["as", "~처럼, ~로서", "접속사, 전치사", ["처럼", "로서"]],
  ["your", "너의, 당신의", "소유격", ["너의", "당신의"]],
  ["all", "모든, 모두", "형용사, 대명사", ["모든", "모두"]],
  ["have", "가지다, 있다", "동사", ["가지다", "있다"]],
  ["new", "새로운, 새", "형용사", ["새로운", "새"]],
  ["more", "더 많은, 더", "형용사, 부사", ["더", "더 많은"]],
  ["an", "하나의, 어떤; 부정관사", "관사", ["하나의", "어떤", "부정관사"]],
  ["was", "~이었다, 있었다", "동사", ["이었다", "있었다"]],
  ["we", "우리", "대명사", ["우리"]],
  ["will", "~할 것이다, 의지", "조동사, 명사", ["할 것이다", "의지"]],
  ["can", "~할 수 있다, 캔", "조동사, 명사", ["할 수 있다", "캔"]],
  ["us", "우리에게, 우리를", "대명사", ["우리에게", "우리를"]],
  ["about", "~에 대해, 약", "전치사, 부사", ["대해", "약"]],
  ["if", "만약 ~라면", "접속사", ["만약"]],
  ["page", "쪽, 페이지", "명사", ["쪽", "페이지"]],
  ["my", "나의", "소유격", ["나의", "내"]],
  ["has", "가지고 있다", "동사", ["가지고 있다"]],
  ["search", "검색, 검색하다", "명사, 동사", ["검색", "검색하다"]],
  ["free", "무료의, 자유로운", "형용사", ["무료", "자유로운"]],
  ["but", "그러나, 하지만", "접속사", ["그러나", "하지만"]],
  ["our", "우리의", "소유격", ["우리의"]],
  ["one", "하나, 한 사람", "수사, 대명사", ["하나", "한 사람"]],
  ["other", "다른, 다른 사람", "형용사, 명사", ["다른"]],
  ["do", "하다", "동사", ["하다"]],
  ["no", "아니오, 없는", "부사, 형용사", ["아니오", "없는"]],
  ["information", "정보", "명사", ["정보"]],
  ["they", "그들, 그것들", "대명사", ["그들", "그것들"]],
  ["site", "장소, 웹사이트", "명사", ["장소", "웹사이트"]],
  ["he", "그", "대명사", ["그"]],
  ["up", "위로, 올라간", "부사, 전치사", ["위로", "올라간"]],
  ["may", "~일지도 모른다, 5월", "조동사, 명사", ["일지도 모른다", "5월"]],
  ["what", "무엇, 어떤", "대명사, 형용사", ["무엇", "어떤"]],
  ["which", "어느 것, 어떤", "대명사, 형용사", ["어느 것", "어떤"]],
  ["their", "그들의", "소유격", ["그들의"]],
  ["news", "뉴스, 소식", "명사", ["뉴스", "소식"]],
  ["out", "밖으로, 밖에", "부사", ["밖으로", "밖에"]],
  ["use", "사용하다, 사용", "동사, 명사", ["사용하다", "사용"]],
  ["any", "어떤, 아무", "형용사, 대명사", ["어떤", "아무"]],
  ["there", "거기에, 거기", "부사", ["거기에", "거기"]],
  ["see", "보다, 알다", "동사", ["보다", "알다"]],
  ["only", "오직, 유일한", "부사, 형용사", ["오직", "유일한"]],
  ["so", "그래서, 매우", "부사, 접속사", ["그래서", "매우"]],
  ["his", "그의", "소유격", ["그의"]],
  ["when", "언제, ~할 때", "부사, 접속사", ["언제", "때"]],
  ["here", "여기에, 여기", "부사", ["여기에", "여기"]],
  ["who", "누구", "대명사", ["누구"]],
  ["web", "웹, 거미줄", "명사", ["웹", "거미줄"]],
  ["also", "또한", "부사", ["또한"]],
  ["now", "지금, 이제", "부사", ["지금", "이제"]],
  ["help", "돕다, 도움", "동사, 명사", ["돕다", "도움"]],
  ["get", "얻다, 받다, 되다", "동사", ["얻다", "받다", "되다"]],
  ["pm", "오후", "명사", ["오후"]],
  ["view", "견해, 전망, 보기", "명사, 동사", ["견해", "전망", "보기", "보다"]],
  ["online", "온라인의, 온라인으로", "형용사, 부사", ["온라인"]],
  ["c", "문자 C", "명사", ["문자 c"]],
  ["e", "문자 E", "명사", ["문자 e"]],
  ["first", "첫 번째의, 먼저", "형용사, 부사", ["첫 번째", "먼저"]],
  ["am", "~이다, 오전", "동사, 명사", ["이다", "오전"]],
  ["been", "있었다, 된", "동사", ["있었다", "된"]],
  ["would", "~일 것이다, ~하곤 했다", "조동사", ["일 것이다", "하곤 했다"]],
  ["how", "어떻게, 얼마나", "부사", ["어떻게", "얼마나"]],
  ["were", "~이었다, 있었다", "동사", ["이었다", "있었다"]],
  ["me", "나를, 나에게", "대명사", ["나를", "나에게"]],
  ["s", "문자 S", "명사", ["문자 s"]],
  ["services", "서비스들", "명사", ["서비스들", "서비스"]],
  ["some", "몇몇의, 약간의", "형용사", ["몇몇", "약간"]],
  ["these", "이것들, 이", "대명사, 형용사", ["이것들", "이"]],
  ["click", "클릭하다, 클릭", "동사, 명사", ["클릭", "클릭하다"]],
  ["its", "그것의", "소유격", ["그것의"]],
  ["like", "좋아하다, ~같은", "동사, 전치사", ["좋아하다", "같은"]],
  ["service", "서비스, 봉사", "명사", ["서비스", "봉사"]],
  ["x", "문자 X", "명사", ["문자 x"]],
  ["than", "~보다", "접속사, 전치사", ["보다"]],
  ["find", "찾다, 발견하다", "동사", ["찾다", "발견하다"]],
  ["price", "가격, 값", "명사", ["가격", "값"]],
  ["date", "날짜, 데이트", "명사", ["날짜", "데이트"]],
  ["back", "뒤, 등, 돌아가다", "명사, 부사, 동사", ["뒤", "등", "돌아가다"]],
  ["top", "꼭대기, 최고의", "명사, 형용사", ["꼭대기", "최고"]],
  ["had", "가지고 있었다", "동사", ["가지고 있었다"]],
  ["list", "목록, 명단", "명사", ["목록", "명단"]],
  ["name", "이름, 이름을 붙이다", "명사, 동사", ["이름"]],
  ["just", "단지, 방금, 공정한", "부사, 형용사", ["단지", "방금", "공정한"]],
  ["over", "~위에, 끝난, 넘어서", "전치사, 부사", ["위에", "끝난", "넘어서"]],
  ["state", "상태, 주, 말하다", "명사, 동사", ["상태", "주", "말하다"]],
  ["into", "~안으로", "전치사", ["안으로"]],
  ["email", "이메일", "명사", ["이메일"]],
  ["two", "둘, 두 개", "수사", ["둘", "두"]],
  ["health", "건강", "명사", ["건강"]],
  ["n", "문자 N", "명사", ["문자 n"]],
  ["re", "답장, ~에 관하여", "명사, 전치사", ["답장", "관하여"]],
  ["next", "다음의, 다음", "형용사, 부사", ["다음"]],
  ["used", "사용된, 중고의", "형용사", ["사용된", "중고"]],
  ["go", "가다", "동사", ["가다"]],
  ["b", "문자 B", "명사", ["문자 b"]],
  ["last", "마지막의, 지속되다", "형용사, 동사", ["마지막", "지속되다"]],
  ["most", "가장 많은, 대부분", "형용사, 대명사", ["가장 많은", "대부분"]],
  ["products", "제품들", "명사", ["제품들", "제품"]],
  ["music", "음악", "명사", ["음악"]],
  ["buy", "사다, 구매하다", "동사", ["사다", "구매하다"]],
  ["data", "데이터, 자료", "명사", ["데이터", "자료"]],
  ["make", "만들다, 하게 하다", "동사", ["만들다"]],
  ["them", "그들을, 그것들을", "대명사", ["그들을", "그것들을"]],
  ["should", "~해야 한다", "조동사", ["해야 한다"]],
  ["product", "제품, 생산물", "명사", ["제품", "생산물"]],
  ["system", "시스템, 체계", "명사", ["시스템", "체계"]],
  ["post", "게시물, 우편, 게시하다", "명사, 동사", ["게시물", "우편"]],
  ["her", "그녀의, 그녀를", "대명사, 소유격", ["그녀의", "그녀를"]],
  ["city", "도시", "명사", ["도시"]],
  ["t", "문자 T", "명사", ["문자 t"]],
  ["add", "더하다, 추가하다", "동사", ["더하다", "추가하다"]],
  ["number", "숫자, 번호", "명사", ["숫자", "번호"]],
  ["such", "그러한", "형용사", ["그러한"]],
  ["please", "제발, 기쁘게 하다", "부사, 동사", ["제발", "기쁘게 하다"]],
  ["message", "메시지", "명사", ["메시지"]],
  ["after", "~후에", "전치사, 접속사", ["후에"]],
  ["best", "최고의, 가장 잘", "형용사, 부사", ["최고", "가장 잘"]],
  ["software", "소프트웨어", "명사", ["소프트웨어"]],
  ["then", "그때, 그러면", "부사", ["그때", "그러면"]],
  ["jan", "1월", "명사", ["1월"]],
  ["good", "좋은", "형용사", ["좋은"]],
  ["video", "비디오, 영상", "명사", ["비디오", "영상"]],
  ["well", "잘, 건강한", "부사, 형용사", ["잘", "건강한"]],
  ["d", "문자 D", "명사", ["문자 d"]],
  ["where", "어디에, 어디서", "부사", ["어디", "어디에"]],
  ["info", "정보", "명사", ["정보"]],
  ["rights", "권리들, 저작권", "명사", ["권리", "저작권"]],
  ["public", "공공의, 대중", "형용사, 명사", ["공공의", "대중"]],
  ["books", "책들", "명사", ["책들", "책"]],
  ["high", "높은, 높은 곳", "형용사, 명사", ["높은", "높다"]],
  ["through", "~을 통해, 지나서", "전치사", ["통해", "지나서"]],
  ["m", "문자 M", "명사", ["문자 m"]],
  ["each", "각각의, 각자", "형용사, 대명사", ["각각", "각자"]],
  ["links", "링크들, 연결", "명사", ["링크", "연결"]],
  ["she", "그녀", "대명사", ["그녀"]],
  ["years", "해들, 여러 해", "명사", ["해들", "여러 해"]],
  ["order", "주문, 순서, 명령", "명사, 동사", ["주문", "순서", "명령"]],
  ["very", "매우", "부사", ["매우"]],
  ["privacy", "사생활, 개인정보 보호", "명사", ["사생활", "개인정보 보호"]],
  ["items", "항목들, 물건들", "명사", ["항목", "물건"]],
  ["r", "문자 R", "명사", ["문자 r"]],
  ["read", "읽다", "동사", ["읽다"]],
  ["group", "그룹, 무리", "명사", ["그룹", "무리"]],
  ["need", "필요하다, 필요", "동사, 명사", ["필요하다", "필요"]],
  ["many", "많은", "형용사", ["많은"]],
  ["user", "사용자", "명사", ["사용자"]],
  ["said", "말했다", "동사", ["말했다"]],
  ["de", "de, 외국어 접두 표현", "단어", ["de"]],
  ["does", "한다", "동사", ["한다"]],
  ["set", "놓다, 세트, 정하다", "동사, 명사", ["놓다", "세트", "정하다"]],
  ["under", "~아래에", "전치사", ["아래"]],
  ["general", "일반적인, 장군", "형용사, 명사", ["일반적인", "장군"]],
  ["january", "1월", "명사", ["1월"]],
  ["mail", "우편, 메일", "명사", ["우편", "메일"]],
  ["full", "가득 찬, 완전한", "형용사", ["가득 찬", "완전한"]],
  ["map", "지도", "명사", ["지도"]],
  ["reviews", "검토들, 후기들", "명사", ["검토", "후기"]],
  ["program", "프로그램", "명사", ["프로그램"]],
  ["know", "알다", "동사", ["알다"]],
];

const knownCommonTopWords = new Set(dictionary.map((entry) => entry.word.toLowerCase()));
dictionary.push(
  ...commonTopEnglishWords
    .filter(([word]) => !knownCommonTopWords.has(word.toLowerCase()))
    .map(([word, korean, part, keywords]) => ({
      word,
      pronunciation: word,
      korean,
      part,
      category: "상위 빈도 영한",
      level: 2,
      definition: `영어에서 자주 쓰이는 기본 단어예요. 뜻은 '${korean}'입니다.`,
      keywords,
      examples: [
        [`I checked the word "${word}".`, `나는 '${word}'라는 단어를 확인했어요.`],
        [`This word is common in English.`, `이 단어는 영어에서 자주 쓰여요.`],
      ],
      structure: wordStructureNotes[word] ?? null,
    }))
);

const baselineKoreanSearchWords = [
  ["say", "말하다, 말", "동사", ["말하다", "말"]],
  ["come", "오다", "동사", ["오다"]],
  ["think", "생각하다", "동사", ["생각하다", "생각"]],
  ["give", "주다", "동사", ["주다"]],
  ["receive", "받다", "동사", ["받다"]],
  ["want", "원하다", "동사", ["원하다"]],
  ["study", "공부하다, 공부", "동사, 명사", ["공부하다", "공부"]],
  ["learn", "배우다", "동사", ["배우다"]],
  ["teach", "가르치다", "동사", ["가르치다"]],
  ["start", "시작하다, 시작", "동사, 명사", ["시작하다", "시작"]],
  ["end", "끝나다, 끝", "동사, 명사", ["끝나다", "끝"]],
  ["open", "열다, 열린", "동사, 형용사", ["열다", "열린"]],
  ["close", "닫다, 가까운", "동사, 형용사", ["닫다", "가까운"]],
  ["bad", "나쁜, 좋지 않은", "형용사", ["나쁜", "좋지 않은"]],
  ["old", "오래된, 나이 든", "형용사", ["오래된", "나이 든"]],
  ["fast", "빠른, 빨리", "형용사, 부사", ["빠른", "빨리"]],
  ["slow", "느린, 천천히", "형용사, 부사", ["느린", "천천히"]],
  ["long", "긴, 오래", "형용사, 부사", ["긴", "오래"]],
  ["short", "짧은, 키가 작은", "형용사", ["짧은"]],
  ["low", "낮은", "형용사", ["낮은"]],
  ["important", "중요한", "형용사", ["중요한"]],
  ["difficult", "어려운", "형용사", ["어려운"]],
  ["easy", "쉬운", "형용사", ["쉬운"]],
  ["eye", "눈", "명사", ["눈"]],
  ["word", "단어", "명사", ["단어"]],
  ["sentence", "문장", "명사", ["문장"]],
  ["problem", "문제", "명사", ["문제"]],
  ["question", "질문", "명사", ["질문"]],
  ["answer", "답, 대답", "명사, 동사", ["답", "대답"]],
  ["country", "나라, 국가", "명사", ["나라", "국가"]],
  ["university", "대학교, 대학", "명사", ["대학교", "대학"]],
  ["room", "방, 공간", "명사", ["방", "공간"]],
  ["door", "문", "명사", ["문"]],
  ["head", "머리, 책임자", "명사", ["머리", "책임자"]],
  ["house", "집, 주택", "명사", ["집", "주택"]],
  ["environment", "환경", "명사", ["환경"]],
  ["ownership", "책임 의식, 소유권", "명사", ["책임", "책임 의식", "소유권"]],
  ["summary", "요약", "명사", ["요약"]],
  ["profit", "이익", "명사", ["이익"]],
  ["confidential", "기밀의", "형용사", ["기밀", "기밀의"]],
  ["purchase", "구매, 구매하다", "명사, 동사", ["구매", "구매하다"]],
];

const knownBaselineKoreanWords = new Set(dictionary.map((entry) => entry.word.toLowerCase()));
dictionary.push(
  ...baselineKoreanSearchWords
    .filter(([word]) => !knownBaselineKoreanWords.has(word.toLowerCase()))
    .map(([word, korean, part, keywords]) => ({
      word,
      pronunciation: word,
      korean,
      part,
      category: "기본 한영 보강",
      level: 2,
      definition: `한국어 검색에서 자주 찾는 기본 단어예요. 뜻은 '${korean}'입니다.`,
      keywords,
      examples: [
        [`I searched for "${word}".`, `나는 '${word}'를 찾아봤어요.`],
        [`This is a useful basic word.`, `이것은 유용한 기본 단어예요.`],
      ],
      structure: wordStructureNotes[word] ?? null,
    }))
);

const priorityLevel4Words = [
  [
    "appearance",
    "uh-PEER-uhns",
    "외모, 모습, 등장, 출현",
    "명사",
    "학생 3000+",
    4,
    "사람이나 사물이 보이는 모습, 또는 어떤 것이 나타나거나 등장하는 일을 뜻해요.",
    ["외모", "모습", "등장", "출현"],
    [
      ["Her appearance changed a lot.", "그녀의 모습은 많이 달라졌어요."],
      ["The actor made an appearance on TV.", "그 배우는 TV에 등장했어요."],
    ],
  ],
  [
    "appears",
    "uh-PEERZ",
    "나타난다, ~처럼 보인다",
    "동사",
    "학생 3000+",
    4,
    "appear의 3인칭 단수 현재형으로, 나타나거나 그렇게 보인다는 뜻이에요.",
    ["나타난다", "보인다"],
    [
      ["The word appears in the book.", "그 단어는 책에 나와요."],
      ["She appears happy.", "그녀는 행복해 보여요."],
    ],
  ],
  [
    "appeared",
    "uh-PEERD",
    "나타났다, ~처럼 보였다",
    "동사",
    "학생 3000+",
    4,
    "appear의 과거형으로, 나타났거나 그렇게 보였다는 뜻이에요.",
    ["나타났다", "보였다"],
    [
      ["A rainbow appeared after the rain.", "비가 온 뒤 무지개가 나타났어요."],
      ["He appeared calm.", "그는 차분해 보였어요."],
    ],
  ],
  [
    "appearing",
    "uh-PEER-ing",
    "나타나는, 출연하는",
    "동사",
    "학생 3000+",
    4,
    "appear의 현재분사형으로, 나타나고 있거나 출연한다는 뜻이에요.",
    ["나타나는", "출연하는"],
    [
      ["New words are appearing on the screen.", "새 단어들이 화면에 나타나고 있어요."],
      ["She is appearing in a school play.", "그녀는 학교 연극에 출연하고 있어요."],
    ],
  ],
  [
    "viewer",
    "VYOO-er",
    "시청자, 관람자, 보는 사람",
    "명사",
    "학생 3000+",
    4,
    "텔레비전이나 영상, 전시물 등을 보는 사람을 뜻해요.",
    ["시청자", "관람자", "보는 사람"],
    [
      ["The video has many viewers.", "그 영상에는 시청자가 많아요."],
      ["The viewer looked at the picture carefully.", "관람자는 그림을 자세히 보았어요."],
    ],
  ],
  [
    "viewers",
    "VYOO-erz",
    "시청자들, 관람자들",
    "명사",
    "학생 3000+",
    4,
    "viewer의 복수형으로, 영상이나 전시물 등을 보는 사람들을 뜻해요.",
    ["시청자들", "관람자들", "시청자", "관람자"],
    [
      ["Many viewers watched the show.", "많은 시청자들이 그 프로그램을 보았어요."],
      ["The museum welcomed young viewers.", "박물관은 어린 관람자들을 맞이했어요."],
    ],
  ],
];

dictionary.push(
  ...priorityLevel4Words.map(([word, pronunciation, korean, part, category, level, definition, keywords, examples]) => ({
    word,
    pronunciation,
    korean,
    part,
    category,
    level,
    definition,
    keywords,
    examples,
    structure: wordStructureNotes[word] ?? null,
  }))
);

const bankWords = Array.isArray(window.studentVocabularyBank) ? window.studentVocabularyBank : [];
const top1000SupplementMeanings = window.top1000SupplementMeanings ?? {};
const ministry3000Supplement = window.ministry3000Supplement ?? {};
const verifiedBankSupplement = window.verifiedBankSupplement ?? {};
const verifiedMeaningOverrides = window.verifiedMeaningOverrides ?? {};
const manualDictionaryAdditions = Array.isArray(window.manualDictionaryAdditions) ? window.manualDictionaryAdditions : [];
const knownTop1000SupplementWords = new Set(dictionary.map((entry) => entry.word.toLowerCase()));

const remainingBankPriorityMeanings = {
  dental: ["치아의, 치과의", "형용사"],
  arms: ["팔들; 무기", "명사"],
  alabama: ["앨라배마주", "고유명사"],
  tea: ["차, 홍차", "명사"],
  avg: ["평균", "약어"],
  dress: ["드레스, 옷; 옷을 입다", "명사, 동사"],
  subscription: ["구독, 가입", "명사"],
  dealer: ["판매업자, 거래상", "명사"],
  contemporary: ["현대의, 동시대의", "형용사"],
  sky: ["하늘", "명사"],
  utah: ["유타주", "고유명사"],
  nearby: ["근처의, 가까이에", "형용사, 부사"],
  rom: ["읽기 전용 메모리", "약어"],
  happen: ["일어나다, 발생하다", "동사"],
  exposure: ["노출, 접함", "명사"],
  panasonic: ["파나소닉, 회사명", "고유명사"],
  hide: ["숨다, 숨기다", "동사"],
};

function getEntryByWord(word) {
  return dictionary.find((entry) => entry.word.toLowerCase() === word.toLowerCase());
}

function buildKeywordsFromKorean(korean) {
  const normalizedKorean = String(korean || "").trim();
  const baseTokens = String(korean || "")
    .split(/, |,|;|\/| /)
    .map((item) => item.trim())
    .filter((item) => /[가-힣]/.test(item));

  const compactWhole = normalizedKorean.replace(/[,\s;/]+/g, "");
  const expandedTokens = baseTokens.flatMap((item) => {
    const compact = item.replace(/\s+/g, "");
    return compact && compact !== item ? [item, compact] : [item];
  });

  const mergedTokens = compactWhole && /[가-힣]/.test(compactWhole)
    ? [compactWhole, ...expandedTokens]
    : expandedTokens;

  return [...new Set(mergedTokens)].slice(0, 8);
}

function normalizeManualPart(part) {
  switch (String(part || "").trim().toLowerCase()) {
    case "n":
      return "\uBA85\uC0AC";
    case "v":
      return "\uB3D9\uC0AC";
    case "adj":
      return "\uD615\uC6A9\uC0AC";
    case "adv":
      return "\uBD80\uC0AC";
    case "prep":
      return "\uC804\uCE58\uC0AC";
    case "propn":
      return "\uACE0\uC720\uBA85\uC0AC";
    default:
      return String(part || "\uC5B4\uD718");
  }
}

function getBaseMeaning(word) {
  const exact = getEntryByWord(word);
  if (exact && exact.korean !== "어휘 뱅크 단어") {
    return exact;
  }
  return null;
}

function splitMeaningTokens(korean) {
  return Array.from(
    new Set(
      String(korean || "")
        .split(/, |,|;|\/|·/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function dedupeMeaningTokens(tokens) {
  return Array.from(
    new Set(
      tokens
        .map((item) => String(item || "").trim())
        .filter(Boolean)
    )
  );
}

function isVerbMeaningToken(token) {
  return /다$/.test(String(token || "").trim());
}

function isNounLikeMeaningToken(token) {
  return !/(의|한|적인|스럽다|스러운|같은)$/.test(String(token || "").trim());
}

function normalizePluralMeaningToken(token) {
  const normalized = String(token || "").trim();
  if (normalized.endsWith("의") && normalized.length > 1) {
    return normalized.slice(0, -1);
  }
  return normalized;
}

function toGerundMeaningToken(token) {
  const normalized = String(token || "").trim();
  if (!normalized) return "";
  if (normalized.endsWith("하다")) {
    return `${normalized.slice(0, -2)}하기`;
  }
  if (normalized.endsWith("다")) {
    return `${normalized.slice(0, -1)}기`;
  }
  return normalized;
}

function toActorMeaningToken(token) {
  const normalized = String(token || "").trim();
  if (!normalized) return "";
  if (normalized.endsWith("하다")) {
    return `${normalized.slice(0, -2)}하는 사람`;
  }
  if (normalized.endsWith("다")) {
    return `${normalized.slice(0, -1)}는 사람`;
  }
  return `${normalized} 관련 사람`;
}

function buildDerivedSupplement(word, baseEntry, suffix) {
  const baseWord = String(baseEntry.word || word || "").trim();
  const basePart = String(baseEntry.part || "단어").trim();
  const rawTokens = splitMeaningTokens(baseEntry.korean);
  const verbTokens = rawTokens.filter(isVerbMeaningToken);
  const normalizedPluralTokens = rawTokens.map(normalizePluralMeaningToken).filter(Boolean);
  const nounLikeTokens = normalizedPluralTokens.filter(isNounLikeMeaningToken);
  const hasNounPart = basePart.includes("명사");
  const hasVerbPart = basePart.includes("동사");
  const hasMixedPart = /명사|동사|형용사|부사/.test(basePart) && basePart.includes(",");

  if (suffix === "plural") {
    let meanings;
    if (hasVerbPart && !hasNounPart) {
      meanings = verbTokens.length ? verbTokens : rawTokens;
    } else if (hasNounPart) {
      const preferred = nounLikeTokens.length ? nounLikeTokens : normalizedPluralTokens;
      meanings = hasMixedPart ? preferred.slice(0, 2) : preferred;
    } else {
      meanings = nounLikeTokens.length ? nounLikeTokens : normalizedPluralTokens;
    }

    const finalMeanings = dedupeMeaningTokens(meanings).slice(0, 3);
    const pluralKeywords = finalMeanings
      .filter((item) => !isVerbMeaningToken(item))
      .map((item) => `${item}들`);
    const note = hasVerbPart && !hasNounPart
      ? `${baseWord}의 3인칭 단수 현재형 표현이에요.`
      : hasNounPart && hasVerbPart
        ? `${baseWord}의 복수형 또는 3인칭 단수 현재형으로 쓰일 수 있는 표현이에요.`
        : `${baseWord}의 복수형 표현이에요.`;

    return {
      korean: finalMeanings.join(", "),
      part: hasNounPart ? "명사" : basePart,
      note,
      keywords: dedupeMeaningTokens([...finalMeanings, ...pluralKeywords]),
    };
  }

  if (suffix === "past") {
    const source = verbTokens.length ? verbTokens : rawTokens;
    const finalMeanings = dedupeMeaningTokens(source).slice(0, 3);
    return {
      korean: finalMeanings.join(", "),
      part: basePart,
      note: `${baseWord}의 과거형 또는 과거분사형 표현이에요.`,
      keywords: dedupeMeaningTokens([...finalMeanings, ...rawTokens]),
    };
  }

  if (suffix === "ing") {
    const source = verbTokens.length ? verbTokens : rawTokens;
    const converted = verbTokens.length ? source.map(toGerundMeaningToken) : source;
    const finalMeanings = dedupeMeaningTokens(converted).slice(0, 3);
    return {
      korean: finalMeanings.join(", "),
      part: basePart,
      note: `${baseWord}의 동명사 또는 현재분사형 표현이에요.`,
      keywords: dedupeMeaningTokens([...finalMeanings, ...rawTokens]),
    };
  }

  if (suffix === "superlative") {
    const source = rawTokens.length ? rawTokens : [baseEntry.korean].filter(Boolean);
    const finalMeanings = dedupeMeaningTokens(source).slice(0, 3);
    const emphasized = finalMeanings.map((item) => (item.startsWith("가장 ") ? item : `가장 ${item}`));
    return {
      korean: emphasized.join(", "),
      part: basePart,
      note: `${baseWord}의 최상급 표현이에요.`,
      keywords: dedupeMeaningTokens([...emphasized, ...finalMeanings, ...rawTokens]),
    };
  }

  if (suffix === "person") {
    const source = verbTokens.length ? verbTokens : rawTokens.slice(0, 2);
    const converted = verbTokens.length ? source.map(toActorMeaningToken) : source.map((item) => `${item} 관련 사람`);
    const finalMeanings = dedupeMeaningTokens(converted).slice(0, 3);
    return {
      korean: finalMeanings.join(", "),
      part: "명사",
      note: `${baseWord}와 관련된 사람을 가리키는 표현이에요.`,
      keywords: dedupeMeaningTokens([...finalMeanings, ...rawTokens]),
    };
  }

  return null;
}

function buildDerivedWordCandidates(word) {
  const lower = word.toLowerCase();
  const candidates = [];
  const seen = new Set();

  function pushCandidate(base, suffix) {
    const normalizedBase = String(base || "").trim().toLowerCase();
    if (!normalizedBase) return;
    const key = `${normalizedBase}|${suffix}`;
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push({ base: normalizedBase, suffix });
  }

  if (lower.endsWith("ies") && lower.length > 4) {
    pushCandidate(`${lower.slice(0, -3)}y`, "plural");
  }
  if (lower.endsWith("es") && lower.length > 4) {
    pushCandidate(lower.slice(0, -2), "plural");
  }
  if (lower.endsWith("s") && lower.length > 3) {
    pushCandidate(lower.slice(0, -1), "plural");
  }
  if (lower.endsWith("ied") && lower.length > 4) {
    pushCandidate(`${lower.slice(0, -3)}y`, "past");
  }
  if (lower.endsWith("ed") && lower.length > 4) {
    const clipped = lower.slice(0, -2);
    pushCandidate(`${clipped}e`, "past");
    pushCandidate(clipped, "past");
    if (/(bb|dd|ff|gg|ll|mm|nn|pp|rr|tt)$/.test(clipped)) {
      pushCandidate(clipped.slice(0, -1), "past");
    }
  }
  if (lower.endsWith("ying") && lower.length > 6) {
    pushCandidate(`${lower.slice(0, -4)}ie`, "ing");
  }
  if (lower.endsWith("ing") && lower.length > 4) {
    const clipped = lower.slice(0, -3);
    pushCandidate(`${clipped}e`, "ing");
    pushCandidate(clipped, "ing");
    if (/(bb|dd|ff|gg|ll|mm|nn|pp|rr|tt)$/.test(clipped)) {
      pushCandidate(clipped.slice(0, -1), "ing");
    }
  }
  if (lower.endsWith("iest") && lower.length > 6) {
    pushCandidate(`${lower.slice(0, -4)}y`, "superlative");
  }
  if (lower.endsWith("est") && lower.length > 5) {
    const clipped = lower.slice(0, -3);
    pushCandidate(`${clipped}e`, "superlative");
    pushCandidate(clipped, "superlative");
    if (/(bb|dd|ff|gg|ll|mm|nn|pp|rr|tt)$/.test(clipped)) {
      pushCandidate(clipped.slice(0, -1), "superlative");
    }
  }
  if (lower.endsWith("er") && lower.length > 4) {
    pushCandidate(lower.slice(0, -2), "person");
  }

  return candidates;
}

function deriveSupplementFromKnownWord(word) {
  const lower = word.toLowerCase();
  const candidates = buildDerivedWordCandidates(lower);

  for (const candidate of candidates) {
    const baseEntry = getBaseMeaning(candidate.base);
    if (!baseEntry) continue;
    const derived = buildDerivedSupplement(lower, baseEntry, candidate.suffix);
    if (derived) {
      return derived;
    }
  }

  return null;
}

function getBankSupplement(word) {
  const lower = word.toLowerCase();
  if (Array.isArray(verifiedBankSupplement[lower])) {
    return verifiedBankSupplement[lower];
  }
  if (Array.isArray(ministry3000Supplement[lower])) {
    return ministry3000Supplement[lower];
  }
  if (Array.isArray(remainingBankPriorityMeanings[lower])) {
    return remainingBankPriorityMeanings[lower];
  }
  const derived = deriveSupplementFromKnownWord(lower);
  if (derived) {
    return derived;
  }
  return [`${word} 관련 추가 영어 어휘`, "단어"];
}

dictionary.push(
  ...bankWords
    .slice(0, 2200)
    .filter((word) => !knownTop1000SupplementWords.has(word.toLowerCase()))
    .map((word) => {
      const verifiedSupplement = Array.isArray(verifiedBankSupplement[word.toLowerCase()])
        ? verifiedBankSupplement[word.toLowerCase()]
        : null;
      const korean = verifiedSupplement?.[0] ?? top1000SupplementMeanings[word] ?? "고빈도 영어 보강어";
      const keywords = korean
        .split(/, |,| /)
        .map((item) => item.trim())
        .filter((item) => /[가-힣]/.test(item));

        return {
          word,
          pronunciation: word,
          korean,
          part: verifiedSupplement?.[1] ?? "단어",
          category: "상위 2200 보강",
          level: 3,
          definition: `상위 빈도 영어 2200개 품질 검사용으로 보강한 단어예요. 뜻은 '${korean}'입니다.`,
        keywords: keywords.length ? keywords : [korean],
        examples: [
          [`I searched for "${word}" in the dictionary.`, `나는 사전에서 '${word}'를 검색했어요.`],
          [`This word appears often in English.`, `이 단어는 영어에서 자주 나와요.`],
        ],
        structure: wordStructureNotes[word] ?? null,
      };
    })
);

const existingWords = new Set(dictionary.map((entry) => entry.word.toLowerCase()));

dictionary.push(
  ...bankWords
    .filter((word) => !existingWords.has(word.toLowerCase()))
    .map((word) => {
      const supplement = getBankSupplement(word);
      const supplementInfo =
        supplement && !Array.isArray(supplement)
          ? supplement
          : { korean: supplement[0], part: supplement[1], note: "", keywords: [] };
      const isPrioritySupplement = Array.isArray(ministry3000Supplement[word.toLowerCase()]);
      const isFallbackSupplement = !isPrioritySupplement;
      const korean = supplementInfo.korean;
      const part = supplementInfo.part;
      const keywords = [...splitMeaningTokens(korean), ...(supplementInfo.keywords ?? [])]
        .map((item) => item.trim())
        .filter((item) => /[가-힣]/.test(item));
      const defaultDefinition = isPrioritySupplement
        ? `고등학생까지 사용할 3000개 우선 보강 단어예요. 뜻은 '${korean}'입니다.`
        : isFallbackSupplement
          ? `어휘 뱅크의 추가 단어를 자동 보강한 항목이에요. 뜻은 '${korean}'입니다.`
          : `어휘 뱅크의 추가 단어예요. 뜻은 '${korean}'입니다.`;
      const definition = supplementInfo.note
        ? `${supplementInfo.note} 뜻은 '${korean}'입니다.`
        : defaultDefinition;

      return {
        word,
        pronunciation: word,
        korean,
        part,
        category: isPrioritySupplement ? "고등 3000 보강" : "어휘 뱅크 자동 보강",
        level: 4,
        definition,
        keywords: keywords.length ? keywords : [korean],
        examples: [
          [`I looked up "${word}" in the dictionary.`, `나는 사전에서 '${word}'를 찾아봤어요.`],
          [`This word can appear in English reading.`, `이 단어는 영어 독해에 나올 수 있어요.`],
        ],
        structure: wordStructureNotes[word] ?? null,
      };
    })
);

if (manualDictionaryAdditions.length) {
  const existingManualWords = new Set(dictionary.map((entry) => entry.word.toLowerCase()));
  const normalizedManualEntries = manualDictionaryAdditions
    .filter((item) => Array.isArray(item) && item.length >= 3)
    .map(([word, korean, part]) => {
      const normalizedWord = String(word || "").trim();
      const normalizedKorean = String(korean || "").trim();
      if (!normalizedWord || !normalizedKorean) {
        return null;
      }

      return {
        word: normalizedWord,
        pronunciation: normalizedWord,
        korean: normalizedKorean,
        part: normalizeManualPart(part),
        category: "\uC911\uB4F1 1500 \uBCF4\uAC15",
        level: 2,
        definition: `\uC911\uB4F1 \uD544\uC218 \uB2E8\uC5B4 \uBCF4\uAC15 \uD56D\uBAA9\uC774\uC5D0\uC694. \uB73B\uC740 '${normalizedKorean}'\uC785\uB2C8\uB2E4.`,
        keywords: buildKeywordsFromKorean(normalizedKorean),
        examples: [
          [`I studied the word "${normalizedWord}".`, `\uB098\uB294 '${normalizedWord}' \uB2E8\uC5B4\uB97C \uACF5\uBD80\uD588\uC5B4\uC694.`],
          [`"${normalizedWord}" is in the middle school list.`, `'${normalizedWord}'\uB294 \uC911\uB4F1 \uB2E8\uC5B4 \uBAA9\uB85D\uC5D0 \uB4E4\uC5B4 \uC788\uC5B4\uC694.`],
        ],
        structure: wordStructureNotes[normalizedWord] ?? null,
      };
    })
    .filter(Boolean)
    .filter((entry) => {
      const lowerWord = entry.word.toLowerCase();
      if (existingManualWords.has(lowerWord)) {
        return false;
      }
      existingManualWords.add(lowerWord);
      return true;
    });

  dictionary.push(...normalizedManualEntries);
}

const VERIFIED_MEANING_PREFIX = "\uAC80\uC99D \uBC18\uC601 \uB73B\uC740 '";
const VERIFIED_MEANING_SUFFIX = "'\uC785\uB2C8\uB2E4.";

dictionary.forEach((entry) => {
  const override = verifiedMeaningOverrides[entry.word.toLowerCase()];
  if (!override) return;
  entry.korean = override;
  const overrideKeywords = buildKeywordsFromKorean(override);
  if (overrideKeywords.length) {
    entry.keywords = overrideKeywords;
  }
  if (entry.category === "어휘 뱅크 자동 보강") {
    entry.category = "검증 완료 단어";
  }
  if (Number(entry.level || 0) >= 3) {
    entry.definition = `${VERIFIED_MEANING_PREFIX}${override}${VERIFIED_MEANING_SUFFIX}`;
  }
});

const excludedDictionaryWords = new Set(
  (window.excludedDictionaryWords ?? [])
    .map((word) => String(word).trim().toLowerCase())
    .filter(Boolean)
);

if (excludedDictionaryWords.size) {
  const filteredDictionary = dictionary.filter((entry) => !excludedDictionaryWords.has(entry.word.toLowerCase()));
  dictionary.length = 0;
  dictionary.push(...filteredDictionary);
}

const properNounOverrides = Object.fromEntries(
  Object.entries(window.properNounOverrides ?? {})
    .map(([word, info]) => [String(word).trim().toLowerCase(), info])
    .filter(([word]) => Boolean(word))
);

function getProperNounCategory(type) {
  if (type === "brand") return "고유명사 · 브랜드";
  if (type === "place") return "고유명사 · 지명";
  if (type === "name") return "고유명사 · 이름";
  if (type === "service") return "고유명사 · 서비스";
  return "고유명사";
}

if (Object.keys(properNounOverrides).length) {
  dictionary.forEach((entry) => {
    const override = properNounOverrides[entry.word.toLowerCase()];
    if (!override) return;
    entry.separateGroup = "proper-noun";
    entry.properNounType = override.type ?? "general";
    entry.category = getProperNounCategory(entry.properNounType);
    if (override.korean) {
      entry.korean = override.korean;
    }
    const properKeywords = buildKeywordsFromKorean(entry.korean);
    if (properKeywords.length) {
      entry.keywords = uniqueItems([...(entry.keywords ?? []), ...properKeywords]);
    }
    entry.definition =
      override.note ??
      `${entry.word}는 일반 학습 단어와 분리해서 관리하는 고유명사예요. 뜻은 '${entry.korean}'입니다.`;
  });
}

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const resultPanel = document.querySelector("#resultPanel");
const wordList = document.querySelector("#wordList");
const tabs = document.querySelectorAll(".tab");
const propertiesButton = document.querySelector("#propertiesButton");
const clearAllButton = document.querySelector("#clearAllButton");
const suggestions = document.querySelector("#suggestions");
const nextQuizButton = document.querySelector("#nextQuizButton");
const quizQuestion = document.querySelector("#quizQuestion");
const quizOptions = document.querySelector("#quizOptions");
const quizFeedback = document.querySelector("#quizFeedback");
const propertiesModal = document.querySelector("#propertiesModal");
const propertiesCloseButton = document.querySelector("#propertiesCloseButton");
const propertiesBody = document.querySelector("#propertiesBody");
const APP_RELEASE_VERSION = "v71";

let activeTab = "recent";
let selectedWord = getTodayWord();
let quizWord = null;
let recentWords = sanitizeStoredWords(loadList("kidsDictionaryRecent"));
let favoriteWords = sanitizeStoredWords(loadList("kidsDictionaryFavorites"));
saveList("kidsDictionaryRecent", recentWords);
saveList("kidsDictionaryFavorites", favoriteWords);
const pronunciationAudioCache = new Map();
const externalWordInfoCache = new Map();
const preferredKoreanSearchMap = {
  "말하다": "say",
  "보다": "see",
  "만들다": "make",
  "알다": "know",
  "생각하다": "think",
  "주다": "give",
  "받다": "receive",
  "찾다": "find",
  "사용하다": "use",
  "필요하다": "need",
  "원하다": "want",
  "좋아하다": "like",
  "공부하다": "study",
  "배우다": "learn",
  "가르치다": "teach",
  "시작하다": "start",
  "끝나다": "end",
  "열다": "open",
  "닫다": "close",
  "나쁜": "bad",
  "새로운": "new",
  "오래된": "old",
  "빠른": "fast",
  "느린": "slow",
  "긴": "long",
  "짧은": "short",
  "높은": "high",
  "낮은": "low",
  "중요한": "important",
  "어려운": "difficult",
  "쉬운": "easy",
  "눈": "eye",
  "단어": "word",
  "문장": "sentence",
  "문제": "problem",
  "질문": "question",
  "답": "answer",
  "나라": "country",
  "환경": "environment",
  "책임": "ownership",
  "요약": "summary",
  "이익": "profit",
  "기밀": "confidential",
  "구매": "purchase",
  "회의": "meeting",
  "일정": "schedule",
  "위험": "risk",
  "배포": "deploy",
  "배포하다": "deploy",
  "확인하다": "confirm",
  "해결하다": "resolve",
  "인증": "authentication",
  "\ub054\ucc0d\ud55c": "terrible",
  "\ud615\ud3b8\uc5c6\ub294": "terrible",
  "\uc54c\ud30c\ubcb3": "alphabet",
  "\uc601\ub9ac\ud55c": "clever",
  "\ucf54\ub07c\ub9ac": "elephant",
};
const localSynonyms = {
  appear: ["emerge", "show up", "seem"],
  disappear: ["vanish", "fade", "go away"],
  world: ["earth", "globe"],
  time: ["period", "moment"],
  work: ["job", "task"],
  company: ["business", "firm"],
  business: ["trade", "commerce"],
  gold: ["metal", "treasure"],
  golden: ["shining", "valuable"],
  meeting: ["conference", "session", "discussion"],
  agenda: ["schedule", "plan", "program"],
  deadline: ["due date", "time limit"],
  invoice: ["bill", "statement"],
  customer: ["client", "buyer"],
  employee: ["worker", "staff member"],
  strategy: ["plan", "approach"],
  confirm: ["verify", "check"],
  resolve: ["solve", "settle"],
  terrible: ["awful", "horrible", "bad"],
  comforting: ["soothing", "reassuring", "encouraging"],
  locally: ["nearby", "in the area", "regionally"],
};
const commonMisspellingMap = {
  sawllow: "swallow",
};
const priorityAutocompleteWords = ["deadline", "invoice"];
const pronunciationDisplayOverrides = {
  run: {
    display: "미국∙영국 [rʌn]",
    phonetics: ["rʌn"],
  },
  setup: {
    display: "미국∙영국 [sétʌ̀p]",
    phonetics: ["sétʌ̀p"],
  },
  world: {
    display: "미국 [wɝld] · 영국 [wɜːld]",
    phonetics: ["wɝld", "wɜːld"],
  },
  gold: {
    display: "미국 [goʊld] · 영국 [gəʊld]",
    phonetics: ["goʊld", "gəʊld"],
  },
  golden: {
    display: "미국 [ˈgoʊldən] · 영국 [ˈgəʊldən]",
    phonetics: ["ˈgoʊldən", "ˈgəʊldən"],
  },
  comforting: {
    display: "미국 [kʌmfərtɪŋ] · 영국 [kʌmfətɪŋ]",
    phonetics: ["kʌmfərtɪŋ", "kʌmfətɪŋ"],
  },
  locally: {
    display: "미국·영국 [lóukəli]",
    phonetics: ["lóukəli"],
  },
};
Object.assign(pronunciationDisplayOverrides, window.pronunciationDisplayOverrides || {});

function trimIpaEnding(ipa) {
  return String(ipa || "").replace(/[ˈˌ.\s]+$/g, "");
}

function endsWithAny(text, suffixes) {
  return suffixes.some((suffix) => text.endsWith(suffix));
}

function getIpaEndingClass(ipa) {
  const normalized = trimIpaEnding(ipa);
  if (!normalized) return "other";
  if (endsWithAny(normalized, ["tʃ", "dʒ", "ʧ", "ʤ", "s", "z", "ʃ", "ʒ"])) return "sibilant";
  if (endsWithAny(normalized, ["t", "d"])) return "alveolar-stop";
  if (endsWithAny(normalized, ["p", "k", "f", "θ"])) return "voiceless";
  return "voiced";
}

function appendIpaSuffix(ipa, suffix) {
  const base = trimIpaEnding(ipa);
  if (!base) return "";
  if (suffix === "plural") {
    const endingClass = getIpaEndingClass(base);
    if (endingClass === "sibilant") return `${base}ɪz`;
    if (endingClass === "voiceless") return `${base}s`;
    return `${base}z`;
  }
  if (suffix === "past") {
    const endingClass = getIpaEndingClass(base);
    if (endingClass === "alveolar-stop") return `${base}ɪd`;
    if (endingClass === "voiceless") return `${base}t`;
    return `${base}d`;
  }
  if (suffix === "ing") {
    return `${base}ɪŋ`;
  }
  if (suffix === "person") {
    return `${base}ər`;
  }
  return base;
}

function buildDerivedPronunciationDisplay(baseDisplay, phonetics) {
  if (!phonetics.length) return null;
  if (!baseDisplay) return null;
  if (baseDisplay.startsWith("미국∙영국 [")) {
    return `미국∙영국 [${phonetics[0]}]`;
  }
  if (baseDisplay.startsWith("미국 [") && baseDisplay.includes("· 영국 [") && phonetics.length >= 2) {
    return `미국 [${phonetics[0]}] · 영국 [${phonetics[1]}]`;
  }
  if (baseDisplay.startsWith("미국 [")) {
    return `미국 [${phonetics[0]}]`;
  }
  if (baseDisplay.startsWith("영국 [")) {
    return `영국 [${phonetics[0]}]`;
  }
  return null;
}

function derivePronunciationFromBaseInfo(baseInfo, suffix) {
  const basePhonetics = uniqueItems((baseInfo?.phonetics ?? []).map(normalizeIpaForDisplay));
  if (!basePhonetics.length) return null;
  const phonetics = uniqueItems(basePhonetics.map((ipa) => appendIpaSuffix(ipa, suffix)).filter(Boolean));
  if (!phonetics.length) return null;
  return {
    phonetics,
    display: buildDerivedPronunciationDisplay(baseInfo?.display ?? null, phonetics),
  };
}

function getDerivedPronunciationInfo(word) {
  const lower = normalize(word);
  for (const candidate of buildDerivedWordCandidates(lower)) {
    const baseInfo = pronunciationDisplayOverrides[candidate.base];
    if (!baseInfo) continue;
    const derived = derivePronunciationFromBaseInfo(baseInfo, candidate.suffix);
    if (derived) {
      return derived;
    }
  }
  return null;
}

function loadList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch {
    return [];
  }
}

function saveList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

function normalize(text) {
  return text.trim().toLowerCase();
}

function sanitizeStoredWords(words) {
  return words.filter((word) => !excludedDictionaryWords.has(normalize(String(word))));
}

function getTodayWord() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dateKey = `${now.getFullYear()}${month}${day}`;
  const index = Number(dateKey) % dictionary.length;
  return dictionary[index];
}

function getSuggestedWords() {
  const recentSet = new Set(recentWords);
  const freshWords = dictionary.filter((entry) => !recentSet.has(entry.word));
  return freshWords.slice(0, 6);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getAutocompleteWords(query) {
  const rawQuery = String(query ?? "").trim();
  const cleanQuery = normalize(query);
  const correctedQuery = commonMisspellingMap[cleanQuery] ?? cleanQuery;
  if (!correctedQuery || !/^[a-z]+$/.test(correctedQuery)) {
    return [];
  }

  return dictionary
    .filter((entry) => {
      const word = entry.word.toLowerCase();
      return word.startsWith(correctedQuery) || (rawQuery && word === correctedQuery);
    })
    .sort((left, right) => {
      const leftPriority = priorityAutocompleteWords.includes(left.word) ? 1 : 0;
      const rightPriority = priorityAutocompleteWords.includes(right.word) ? 1 : 0;
      if (leftPriority !== rightPriority) {
        return rightPriority - leftPriority;
      }
      const leftIsBank = left.category === "학생 3000+";
      const rightIsBank = right.category === "학생 3000+";
      if (leftIsBank !== rightIsBank) {
        return leftIsBank ? 1 : -1;
      }
      const levelDiff = left.level - right.level;
      if (levelDiff !== 0) {
        return levelDiff;
      }
      return left.word.length - right.word.length || left.word.localeCompare(right.word);
    })
    .slice(0, 10);
}

function highlightAutocomplete(word, query) {
  const cleanQuery = normalize(query);
  const prefix = escapeHtml(word.slice(0, cleanQuery.length));
  const rest = escapeHtml(word.slice(cleanQuery.length));
  return `<mark>${prefix}</mark>${rest}`;
}

function hasKoreanText(text) {
  return /[\u3131-\u318e\uac00-\ud7a3]/.test(text);
}

function getKoreanMeaningParts(entry) {
  return entry.korean.split(/,|\u00b7|\//).map((meaning) => meaning.trim()).filter(Boolean);
}

function entryMatchesKoreanQuery(entry, rawQuery) {
  return (
    getKoreanMeaningParts(entry).includes(rawQuery) ||
    entry.keywords.some((keyword) => keyword === rawQuery) ||
    entry.korean.includes(rawQuery) ||
    entry.keywords.some((keyword) => keyword.includes(rawQuery) || rawQuery.includes(keyword))
  );
}

function scoreKoreanCandidate(entry, rawQuery) {
  const exactMeaning = getKoreanMeaningParts(entry).includes(rawQuery) ? 40 : 0;
  const exactKeyword = entry.keywords.some((keyword) => keyword === rawQuery) ? 30 : 0;
  const partialKeyword = entry.keywords.some((keyword) => keyword.includes(rawQuery) || rawQuery.includes(keyword)) ? 15 : 0;
  const partialMeaning = entry.korean.includes(rawQuery) ? 10 : 0;
  return exactMeaning + exactKeyword + partialKeyword + partialMeaning - entry.level;
}

function getRelatedEntries(query, selectedEntry, limit = 5) {
  const rawQuery = String(query ?? "").trim();
  if (!rawQuery || !selectedEntry || !hasKoreanText(rawQuery)) {
    return [];
  }

  return dictionary
    .filter((entry) => entry.word !== selectedEntry.word)
    .filter((entry) => entry.category !== "학생 3000+")
    .filter((entry) => entryMatchesKoreanQuery(entry, rawQuery))
    .sort((left, right) => {
      const scoreDiff = scoreKoreanCandidate(right, rawQuery) - scoreKoreanCandidate(left, rawQuery);
      if (scoreDiff !== 0) {
        return scoreDiff;
      }
      return left.level - right.level || left.word.localeCompare(right.word);
    })
    .slice(0, limit);
}

function findWord(query) {
  const cleanQuery = normalize(query);
  const correctedQuery = commonMisspellingMap[cleanQuery] ?? cleanQuery;
  const rawQuery = query.trim();
  if (!correctedQuery) {
    return null;
  }
  if (excludedDictionaryWords.has(correctedQuery)) {
    return null;
  }

  const isKoreanQuery = hasKoreanText(rawQuery);
  const hasExactKoreanMeaning = (entry) => getKoreanMeaningParts(entry).includes(rawQuery);
  const hasExactKoreanKeyword = (entry) => entry.keywords.some((keyword) => keyword === rawQuery);
  const hasPartialKorean = (entry) => {
    const koreanMatch = entry.korean.includes(rawQuery);
    const keywordMatch = entry.keywords.some((keyword) => keyword.includes(rawQuery) || rawQuery.includes(keyword));
    return koreanMatch || keywordMatch;
  };

  if (isKoreanQuery) {
    const preferredWord = preferredKoreanSearchMap[rawQuery];
    if (preferredWord) {
      const preferredMatch = dictionary.find((entry) => entry.word === preferredWord);
      if (preferredMatch) {
        return preferredMatch;
      }
    }

    const exactKoreanMatch = dictionary.find(hasExactKoreanMeaning);
    if (exactKoreanMatch) {
      return exactKoreanMatch;
    }

    const exactKeywordMatch = dictionary.find(hasExactKoreanKeyword);
    if (exactKeywordMatch) {
      return exactKeywordMatch;
    }

    const partialKoreanMatch = dictionary.find(hasPartialKorean);
    if (partialKoreanMatch) {
      return partialKoreanMatch;
    }

    return dictionary.find((entry) => entry.category === rawQuery || entry.category.endsWith(`· ${rawQuery}`));
  }

  const exactEnglishMatch = dictionary.find((entry) => entry.word.toLowerCase() === correctedQuery);
  if (exactEnglishMatch) {
    return exactEnglishMatch;
  }

  return null;
}

function rememberWord(word) {
  recentWords = [word, ...recentWords.filter((item) => item !== word)].slice(0, 12);
  saveList("kidsDictionaryRecent", recentWords);
  refreshPropertiesModalIfOpen();
}

function isFavorite(word) {
  return favoriteWords.includes(word);
}

function toggleFavorite(word) {
  if (isFavorite(word)) {
    favoriteWords = favoriteWords.filter((item) => item !== word);
  } else {
    favoriteWords = [word, ...favoriteWords];
  }

  saveList("kidsDictionaryFavorites", favoriteWords);
  renderResult(selectedWord);
  renderWordList();
  refreshPropertiesModalIfOpen();
}

function isSingleEnglishWord(text) {
  return /^[a-z]+$/i.test(text.trim());
}

function uniqueItems(items) {
  return [...new Set(items.filter(Boolean))];
}

function normalizeIpaForDisplay(text) {
  return text
    .trim()
    .replace(/^\/|\/$/g, "")
    .replace(/^\[|\]$/g, "")
    .replaceAll("ɹ", "r");
}

async function getExternalWordInfo(word) {
  const cleanWord = normalize(word);
  const override = pronunciationDisplayOverrides[cleanWord];
  const derived = override ? null : getDerivedPronunciationInfo(cleanWord);
  if (!isSingleEnglishWord(cleanWord)) {
    return {
      audioUrl: override?.audioUrl ?? null,
      phonetics: override?.phonetics ?? derived?.phonetics ?? [],
      synonyms: localSynonyms[cleanWord] ?? [],
      pronunciationDisplay: override?.display ?? derived?.display ?? null,
    };
  }

  if (externalWordInfoCache.has(cleanWord)) {
    return externalWordInfoCache.get(cleanWord);
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`);
    if (!response.ok) {
      const emptyInfo = {
        audioUrl: override?.audioUrl ?? null,
        phonetics: override?.phonetics ?? derived?.phonetics ?? [],
        synonyms: localSynonyms[cleanWord] ?? [],
        pronunciationDisplay: override?.display ?? derived?.display ?? null,
      };
      externalWordInfoCache.set(cleanWord, emptyInfo);
      return emptyInfo;
    }

    const entries = await response.json();
    const phonetics = entries.flatMap((entry) => entry.phonetics ?? []);
    const ipaList = uniqueItems(
      phonetics
        .map((phonetic) => phonetic.text)
        .filter((text) => typeof text === "string" && text.trim())
        .map(normalizeIpaForDisplay)
    );
    const audioUrl = phonetics
      .map((phonetic) => phonetic.audio)
      .find((audio) => typeof audio === "string" && audio.startsWith("https://"));
    const apiSynonyms = entries.flatMap((entry) =>
      (entry.meanings ?? []).flatMap((meaning) =>
        (meaning.definitions ?? []).flatMap((definition) => definition.synonyms ?? [])
      )
    );
    const meaningSynonyms = entries.flatMap((entry) => (entry.meanings ?? []).flatMap((meaning) => meaning.synonyms ?? []));
    const synonyms = uniqueItems([...(localSynonyms[cleanWord] ?? []), ...meaningSynonyms, ...apiSynonyms])
      .filter((synonym) => synonym.toLowerCase() !== cleanWord)
      .slice(0, 8);

    const info = {
      audioUrl: override?.audioUrl ?? audioUrl ?? null,
      phonetics: override?.phonetics ?? (ipaList.length ? ipaList : derived?.phonetics ?? []),
      synonyms,
      pronunciationDisplay: override?.display ?? (ipaList.length ? null : derived?.display ?? null),
    };
    externalWordInfoCache.set(cleanWord, info);
    pronunciationAudioCache.set(cleanWord, info.audioUrl);
    return info;
  } catch {
    const fallbackInfo = {
      audioUrl: override?.audioUrl ?? null,
      phonetics: override?.phonetics ?? derived?.phonetics ?? [],
      synonyms: localSynonyms[cleanWord] ?? [],
      pronunciationDisplay: override?.display ?? derived?.display ?? null,
    };
    externalWordInfoCache.set(cleanWord, fallbackInfo);
    pronunciationAudioCache.set(cleanWord, null);
    return fallbackInfo;
  }
}

async function getRecordedPronunciation(word) {
  const cleanWord = normalize(word);
  if (pronunciationAudioCache.has(cleanWord)) {
    return pronunciationAudioCache.get(cleanWord);
  }

  const info = await getExternalWordInfo(word);
  return info.audioUrl;
}

function speakWithDeviceVoice(text) {
  if (!("speechSynthesis" in window)) {
    alert("이 브라우저에서는 발음 기능을 사용할 수 없어요.");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find((voice) => voice.lang === "en-US" && /google|samantha|natural|premium/i.test(voice.name)) ??
    voices.find((voice) => voice.lang === "en-US") ??
    voices.find((voice) => voice.lang.startsWith("en"));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.lang = preferredVoice?.lang ?? "en-US";
  utterance.rate = 0.78;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

async function speak(text) {
  const recordedAudioUrl = await getRecordedPronunciation(text);
  if (recordedAudioUrl) {
    window.speechSynthesis?.cancel();
    const audio = new Audio(recordedAudioUrl);
    audio.preload = "auto";
    try {
      await audio.play();
      return;
    } catch {
      speakWithDeviceVoice(text);
      return;
    }
  }

  speakWithDeviceVoice(text);
}

function formatPronunciationText(word, phonetics, pronunciationDisplay = null) {
  if (pronunciationDisplay) {
    return pronunciationDisplay;
  }
  return phonetics.length ? `발음기호 ${phonetics.map((phonetic) => `[${phonetic}]`).join(" ")}` : "발음기호: 확인 중...";
}

function renderFallbackPronunciation(entry) {
  const helper = entry.pronunciation && entry.pronunciation !== entry.word ? `읽기 도움: ${entry.pronunciation}` : "읽기 도움 표기 없음";
  return `
    <p class="pronunciation" data-ipa-for="${entry.word}">
      <span class="ipa-status">발음기호: 불러오는 중...</span>
      <span class="pron-help">${helper}</span>
    </p>
  `;
}

function renderSynonymSection(entry) {
  const fallbackSynonyms = localSynonyms[entry.word] ?? [];
  const chips = fallbackSynonyms.map((synonym) => `<span class="synonym-chip">${synonym}</span>`).join("");
  return `
    <section class="synonym-card" data-synonyms-for="${entry.word}" aria-label="유의어">
      <strong>유의어</strong>
      <div class="synonym-list">${chips || '<span class="muted-note">불러오는 중...</span>'}</div>
    </section>
  `;
}

function renderRelatedEntries(query, entry) {
  const relatedEntries = getRelatedEntries(query, entry);
  if (!relatedEntries.length) {
    return "";
  }

  return `
    <section class="related-card" aria-label="관련 검색 후보">
      <strong>관련 후보</strong>
      <div class="related-list">
        ${relatedEntries
          .map(
            (related) => `
              <button class="related-word" type="button" data-related-word="${escapeHtml(related.word)}">
                <span>${escapeHtml(related.word)}</span>
                <small>${escapeHtml(related.korean)}</small>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

async function enrichWordDetails(entry) {
  const wordAtRequestTime = entry.word;
  const info = await getExternalWordInfo(entry.word);
  if (!selectedWord || selectedWord.word !== wordAtRequestTime) {
    return;
  }
  if (typeof resultPanel.querySelector !== "function") {
    return;
  }

  const ipaElement = resultPanel.querySelector(`[data-ipa-for="${wordAtRequestTime}"] .ipa-status`);
  if (ipaElement) {
    ipaElement.textContent = info.phonetics.length || info.pronunciationDisplay
      ? formatPronunciationText(entry.word, info.phonetics, info.pronunciationDisplay)
      : "발음기호: 사전 데이터 없음";
  }

  const synonymList = resultPanel.querySelector(`[data-synonyms-for="${wordAtRequestTime}"] .synonym-list`);
  if (synonymList) {
    synonymList.innerHTML = info.synonyms.length
      ? info.synonyms.map((synonym) => `<span class="synonym-chip">${synonym}</span>`).join("")
      : '<span class="muted-note">등록된 유의어가 아직 없어요.</span>';
  }
}

function renderSuggestions() {
  const query = searchInput.value.trim();
  const autocompleteWords = getAutocompleteWords(query);
  const words = autocompleteWords.length ? autocompleteWords : getSuggestedWords();
  const modeClass = autocompleteWords.length ? "is-autocomplete" : "";

  suggestions.classList.toggle("is-autocomplete", autocompleteWords.length > 0);
  suggestions.innerHTML = words
    .map(
      (entry) => `
        <button class="suggestion-chip ${modeClass}" type="button" data-word="${entry.word}">
          <span class="suggestion-word">${autocompleteWords.length ? highlightAutocomplete(entry.word, query) : escapeHtml(entry.word)}</span>
          <span class="suggestion-meaning">${escapeHtml(entry.korean)}</span>
        </button>
      `
    )
    .join("");
}

function renderSenseList(entry) {
  if (!entry.senses?.length) {
    return `<p class="definition">${entry.definition}</p>`;
  }

  return `
    <section class="sense-card" aria-label="뜻 목록">
      <h3>뜻</h3>
      <ol class="sense-list">
        ${entry.senses
          .map(
            (sense) => `
              <li>
                <span class="sense-part">${escapeHtml(sense.part)}</span>
                <span class="sense-meaning">${escapeHtml(sense.meaning)}</span>
                ${sense.reference ? `<span class="sense-reference">(→${escapeHtml(sense.reference)})</span>` : ""}
              </li>
            `
          )
          .join("")}
      </ol>
    </section>
  `;
}

function renderInflectionDetails(entry) {
  if (!entry.inflections?.items?.length) {
    return "";
  }

  return `
    <section class="inflection-card" aria-label="${escapeHtml(entry.inflections.title)}">
      <h3>${escapeHtml(entry.inflections.title)}</h3>
      <dl class="inflection-list">
        ${entry.inflections.items
          .map(
            ([label, value]) => `
              <div>
                <dt>${escapeHtml(label)}</dt>
                <dd>${escapeHtml(value)}</dd>
              </div>
            `
          )
          .join("")}
      </dl>
    </section>
  `;
}

function renderResult(entry, query = "") {
  if (!entry) {
    resultPanel.innerHTML = `
      <div class="empty-state">
        <strong>검색 결과가 없어요.</strong>
        <span>다른 단어를 입력해 보세요.</span>
      </div>
    `;
    return;
  }

  const favoriteClass = isFavorite(entry.word) ? "favorite-on" : "";
  const favoriteLabel = isFavorite(entry.word) ? "★ 저장됨" : "☆ 저장";
  const escapedWord = escapeHtml(entry.word);
  const structureHtml = entry.structure
    ? `
      <section class="structure-card" aria-label="단어 구조 설명">
        <strong>${entry.structure.formula}</strong>
        <div class="structure-parts">
          ${entry.structure.parts
            .map(([piece, meaning]) => `<span><b>${piece}</b> ${meaning}</span>`)
            .join("")}
        </div>
        <p>${entry.structure.meaning}</p>
      </section>
    `
    : "";
  const relatedHtml = renderRelatedEntries(query, entry);

  resultPanel.innerHTML = `
    <div class="word-heading">
      <div>
        <h2 class="word-title">${escapedWord}</h2>
        ${renderFallbackPronunciation(entry)}
      </div>
      <button class="icon-button" type="button" data-speak="${escapedWord}" title="실제 발음 듣기" aria-label="${escapedWord} 실제 발음 듣기">
        <span aria-hidden="true">▶</span>
      </button>
    </div>
    <div class="badge-row">
      <span class="badge">${escapeHtml(entry.part)}</span>
      <span class="badge category">${escapeHtml(entry.category)}</span>
      <span class="badge level">Level ${entry.level}</span>
    </div>
    <p class="meaning">${escapeHtml(entry.korean)}</p>
    ${renderSenseList(entry)}
    ${renderInflectionDetails(entry)}
    ${renderSynonymSection(entry)}
    ${relatedHtml}
    ${structureHtml}
    <div class="actions">
      <button class="primary-action" type="button" data-speak="${escapedWord}">실제 발음 듣기</button>
      <button class="primary-action ${favoriteClass}" type="button" data-favorite="${escapedWord}">${favoriteLabel}</button>
    </div>
    <h3 class="examples-title">쉬운 예문</h3>
    <ul class="examples">
      ${entry.examples
        .map(
          ([english, korean]) => `
            <li class="example-card">
              <strong>${escapeHtml(english)}</strong>
              <span>${escapeHtml(korean)}</span>
              <div class="example-actions">
                <button class="example-speak" type="button" data-speak="${escapeHtml(english)}">예문 듣기</button>
              </div>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

function renderWordList() {
  let words;
  if (activeTab === "recent") {
    words = recentWords;
  } else if (activeTab === "favorites") {
    words = favoriteWords;
  } else {
    words = dictionary.map((entry) => entry.word);
  }

  const entries = words.map((word) => dictionary.find((entry) => entry.word === word)).filter(Boolean);

  if (entries.length === 0) {
    const message = activeTab === "favorites" ? "저장한 단어가 아직 없어요." : "검색한 단어가 여기에 보여요.";
    wordList.innerHTML = `<div class="empty-state"><strong>${message}</strong></div>`;
    return;
  }

  wordList.innerHTML = entries
    .map(
      (entry) => `
        <button class="word-item" type="button" data-word="${entry.word}">
          <span>
            <strong>${entry.word}</strong><br />
            <span>${entry.korean} · ${entry.category}</span>
          </span>
          <span class="mini-star">${isFavorite(entry.word) ? "★" : ""}</span>
        </button>
      `
    )
    .join("");
}

function formatCount(value) {
  return new Intl.NumberFormat("ko-KR").format(Number(value) || 0);
}

function getEditionLabel() {
  const eyebrowText = document.querySelector(".top-bar .eyebrow")?.textContent ?? "";
  return eyebrowText.match(/V\d+/i)?.[0] ?? "V4";
}

function buildAppStats() {
  const byLevel = new Map([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
  ]);
  const byCategory = new Map();
  let exampleCount = 0;
  let pronunciationGuideCount = 0;
  let structureCount = 0;
  let properNounCount = 0;

  dictionary.forEach((entry) => {
    if (entry.separateGroup === "proper-noun") {
      properNounCount += 1;
    } else {
      const level = Number(entry.level || 0);
      byLevel.set(level, (byLevel.get(level) ?? 0) + 1);
      byCategory.set(entry.category, (byCategory.get(entry.category) ?? 0) + 1);
    }

    if (Array.isArray(entry.examples) && entry.examples.length) {
      exampleCount += 1;
    }
    if (entry.pronunciation) {
      pronunciationGuideCount += 1;
    }
    if (entry.structure) {
      structureCount += 1;
    }
  });

  const elementaryCount = (byLevel.get(1) ?? 0) + (byLevel.get(2) ?? 0);
  const middleCount = byLevel.get(3) ?? 0;
  const highCount = byLevel.get(4) ?? 0;
  const workCount = byLevel.get(5) ?? 0;
  const countCategoriesByPrefix = (prefix) =>
    [...byCategory.entries()].reduce(
      (sum, [category, count]) => (category.startsWith(prefix) ? sum + count : sum),
      0
    );
  const verifiedOverrideCount = Object.keys(verifiedMeaningOverrides).length;
  const verifiedCategoryCount = byCategory.get("\uAC80\uC99D \uC644\uB8CC \uB2E8\uC5B4") ?? 0;
  const autoSupplementCount = byCategory.get("\uC5B4\uD718 \uBC45\uD06C \uC790\uB3D9 \uBCF4\uAC15") ?? 0;
  const top2200Count = byCategory.get("\uC0C1\uC704 2200 \uBCF4\uAC15") ?? 0;
  const middleSchoolSupplementCount = byCategory.get("\uC911\uB4F1 1500 \uBCF4\uAC15") ?? 0;
  const highSchoolSupplementCount = byCategory.get("\uACE0\uB4F1 3000 \uBCF4\uAC15") ?? 0;
  const workEnglishCount = countCategoriesByPrefix("\uC5C5\uBB34 \uC601\uC5B4");

  return {
    totalWords: dictionary.length,
    verifiedOverrideCount,
    verifiedCategoryCount,
    excludedCount: excludedDictionaryWords.size,
    exampleCount,
    pronunciationGuideCount,
    structureCount,
    recentCount: recentWords.length,
    favoriteCount: favoriteWords.length,
    properNounCount,
    selectedWord: selectedWord?.word ?? "-",
    levelRows: [
      ["\uCD08\uB4F1 \uAD8C\uC7A5", elementaryCount, "Level 1-2"],
      ["\uC911\uB4F1 \uAD8C\uC7A5", middleCount, "Level 3"],
      ["\uACE0\uB4F1 \uAD8C\uC7A5", highCount, "Level 4"],
      ["\uC9C1\uC7A5\uC778 \uD655\uC7A5", workCount, "Level 5"],
      ["\uACE0\uC720\uBA85\uC0AC \uBCC4\uB3C4", properNounCount, "\uBE0C\uB79C\uB4DC\u00B7\uC9C0\uBA85\u00B7\uC774\uB984"],
    ],
    categoryRows: [
      ["\uB124\uC774\uBC84 \uB73B \uAC80\uC218 \uBC18\uC601", verifiedOverrideCount],
      ["\uAC80\uC99D \uC644\uB8CC \uB2E8\uC5B4", verifiedCategoryCount],
      ["\uC5B4\uD718 \uBC45\uD06C \uC790\uB3D9 \uBCF4\uAC15", autoSupplementCount],
      ["\uC0C1\uC704 2200 \uBCF4\uAC15", top2200Count],
      ["\uC911\uB4F1 1500 \uBCF4\uAC15", middleSchoolSupplementCount],
      ["\uACE0\uB4F1 3000 \uBCF4\uAC15", highSchoolSupplementCount],
      ["\uC5C5\uBB34 \uC601\uC5B4", workEnglishCount],
      ["\uACE0\uC720\uBA85\uC0AC \uBCC4\uB3C4", properNounCount],
    ],
    appRows: [
      ["\uC571 \uC774\uB984", "\uC720\uB2C8\uC720\uB2C8 \uC601\uC5B4\uC0AC\uC804"],
      ["\uC5D0\uB514\uC158", getEditionLabel()],
      ["\uBC30\uD3EC \uBC84\uC804", APP_RELEASE_VERSION],
      ["\uC81C\uC678 \uB2E8\uC5B4", `${formatCount(excludedDictionaryWords.size)}\uAC1C`],
      [
        "\uC624\uD504\uB77C\uC778 \uC0AC\uC6A9",
        typeof navigator !== "undefined" && "serviceWorker" in navigator ? "\uC9C0\uC6D0" : "\uBBF8\uC9C0\uC6D0",
      ],
    ],
  };
}
function renderSummaryRows(rows) {
  return rows
    .map(
      ([name, count, helper = ""]) => `
        <div class="summary-row">
          <div class="summary-name">
            ${escapeHtml(name)}
            ${helper ? `<div class="stat-helper">${escapeHtml(helper)}</div>` : ""}
          </div>
          <div class="summary-count">${formatCount(count)}</div>
        </div>
      `
    )
    .join("");
}

function renderMetaRows(rows) {
  return rows
    .map(
      ([label, value]) => `
        <div class="meta-row">
          <div class="meta-label">${escapeHtml(label)}</div>
          <div class="meta-value">${escapeHtml(value)}</div>
        </div>
      `
    )
    .join("");
}

function renderPropertiesModal() {
  if (!propertiesBody) {
    return;
  }

  const stats = buildAppStats();
  propertiesBody.innerHTML = `
    <section class="properties-section" aria-label="요약 통계">
      <h3>요약 통계</h3>
      <div class="stats-grid">
        <article class="stat-card">
          <p class="stat-label">전체 등록 단어</p>
          <p class="stat-value">${formatCount(stats.totalWords)}</p>
          <p class="stat-helper">현재 앱에 바로 검색 가능한 단어 수</p>
        </article>
        <article class="stat-card">
          <p class="stat-label">네이버 검수 반영</p>
          <p class="stat-value">${formatCount(stats.verifiedOverrideCount)}</p>
          <p class="stat-helper">전체 등록 단어 중 검수 뜻 보정이 연결된 수</p>
        </article>
        <article class="stat-card">
          <p class="stat-label">최근 찾아본 단어</p>
          <p class="stat-value">${formatCount(stats.recentCount)}</p>
          <p class="stat-helper">최근 검색 기록 저장 개수</p>
        </article>
        <article class="stat-card">
          <p class="stat-label">즐겨찾기 단어</p>
          <p class="stat-value">${formatCount(stats.favoriteCount)}</p>
          <p class="stat-helper">다시 보고 싶은 단어 저장 개수</p>
        </article>
      </div>
    </section>

    <section class="properties-section" aria-label="레벨별 단어 수">
      <h3>레벨별 단어 수</h3>
      <div class="stats-grid">
        ${stats.levelRows
          .map(
            ([name, count, helper]) => `
              <article class="stat-card level-card">
                <p class="stat-label">${escapeHtml(name)}</p>
                <p class="stat-value">${formatCount(count)}</p>
                <p class="stat-helper">${escapeHtml(helper)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="properties-section" aria-label="단어 출처와 상태">
      <h3>단어 출처와 상태</h3>
      <div class="summary-list">
        ${renderSummaryRows(stats.categoryRows)}
      </div>
    </section>

    <section class="properties-section" aria-label="학습 기능 지원">
      <h3>학습 기능 지원</h3>
      <div class="summary-list">
        ${renderSummaryRows([
          ["예문 제공 단어", stats.exampleCount],
          ["발음 안내 단어", stats.pronunciationGuideCount],
          ["어근 설명 단어", stats.structureCount],
        ])}
      </div>
    </section>

    <section class="properties-section" aria-label="현재 사용 상태">
      <h3>현재 사용 상태</h3>
      <div class="meta-list">
        ${renderMetaRows([
          ["현재 선택 단어", stats.selectedWord],
          ["최근 기록 저장", `${formatCount(stats.recentCount)}개`],
          ["즐겨찾기 저장", `${formatCount(stats.favoriteCount)}개`],
        ])}
      </div>
    </section>

    <section class="properties-section" aria-label="앱 정보">
      <h3>앱 정보</h3>
      <div class="meta-list">
        ${renderMetaRows(stats.appRows)}
      </div>
    </section>

    <section class="properties-section" aria-label="기록 관리">
      <h3>기록 관리</h3>
      <div class="properties-actions">
        <button class="secondary-action" type="button" data-properties-action="clear-recent">최근 기록 지우기</button>
        <button class="secondary-action" type="button" data-properties-action="clear-favorites">즐겨찾기 지우기</button>
      </div>
    </section>
  `;
}

function openPropertiesModal() {
  if (!propertiesModal) {
    return;
  }

  renderPropertiesModal();
  propertiesModal.hidden = false;
  document.body.classList.add("modal-open");
  propertiesCloseButton?.focus();
}

function closePropertiesModal() {
  if (!propertiesModal) {
    return;
  }

  propertiesModal.hidden = true;
  document.body.classList.remove("modal-open");
  propertiesButton?.focus();
}

function refreshPropertiesModalIfOpen() {
  if (propertiesModal && propertiesModal.hidden === false) {
    renderPropertiesModal();
  }
}

function clearRecentHistory() {
  recentWords = [];
  saveList("kidsDictionaryRecent", recentWords);
  renderWordList();
  renderSuggestions();
  refreshPropertiesModalIfOpen();
}

function clearFavoriteWords() {
  favoriteWords = [];
  saveList("kidsDictionaryFavorites", favoriteWords);
  renderResult(selectedWord, searchInput.value || selectedWord?.word || "");
  renderWordList();
  enrichWordDetails(selectedWord);
  refreshPropertiesModalIfOpen();
}

function clearAllUsageData() {
  recentWords = [];
  favoriteWords = [];
  saveList("kidsDictionaryRecent", recentWords);
  saveList("kidsDictionaryFavorites", favoriteWords);
  renderResult(selectedWord, searchInput.value || selectedWord?.word || "");
  renderWordList();
  renderSuggestions();
  enrichWordDetails(selectedWord);
  refreshPropertiesModalIfOpen();
}

function selectWord(entry, shouldRemember = true, sourceQuery = null) {
  if (!entry) {
    return;
  }

  const resultQuery = sourceQuery ?? searchInput.value ?? entry.word;
  selectedWord = entry;
  if (shouldRemember) {
    rememberWord(entry.word);
  }
  searchInput.value = entry.word;
  renderResult(entry, resultQuery);
  renderWordList();
  renderSuggestions();
  enrichWordDetails(entry);
  refreshPropertiesModalIfOpen();
}

function handleSearch() {
  const entry = findWord(searchInput.value);
  if (!entry) {
    renderResult(null);
    return;
  }
  selectWord(entry, true, searchInput.value);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildQuizOptions(answer) {
  const wrongAnswers = dictionary
    .filter((entry) => entry.word !== answer.word)
    .map((entry) => entry.korean)
    .filter((meaning, index, array) => array.indexOf(meaning) === index);

  return shuffle([answer.korean, ...shuffle(wrongAnswers).slice(0, 2)]);
}

function renderQuiz() {
  quizWord = shuffle(dictionary)[0];
  quizQuestion.textContent = `"${quizWord.word}"의 뜻은 무엇일까요?`;
  quizFeedback.textContent = "";
  quizOptions.innerHTML = buildQuizOptions(quizWord)
    .map(
      (meaning) => `
        <button class="quiz-option" type="button" data-answer="${meaning}">
          ${meaning}
        </button>
      `
    )
    .join("");
}

function handleQuizAnswer(button) {
  const buttons = quizOptions.querySelectorAll(".quiz-option");
  buttons.forEach((item) => {
    item.disabled = true;
    if (item.dataset.answer === quizWord.korean) {
      item.classList.add("correct");
    }
  });

  if (button.dataset.answer === quizWord.korean) {
    quizFeedback.textContent = "정답이에요. 바로 단어도 열어볼게요.";
    selectWord(quizWord);
  } else {
    button.classList.add("wrong");
    quizFeedback.textContent = `정답은 ${quizWord.korean}예요.`;
  }
}

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("input", renderSuggestions);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

suggestions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-word]");
  if (!button) {
    return;
  }
  const entry = dictionary.find((item) => item.word === button.dataset.word);
  selectWord(entry);
});

nextQuizButton.addEventListener("click", renderQuiz);

quizOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-answer]");
  if (button) {
    handleQuizAnswer(button);
  }
});

resultPanel.addEventListener("click", (event) => {
  const speakButton = event.target.closest("[data-speak]");
  const favoriteButton = event.target.closest("[data-favorite]");
  const relatedButton = event.target.closest("[data-related-word]");

  if (speakButton) {
    speak(speakButton.dataset.speak);
  }

  if (favoriteButton) {
    toggleFavorite(favoriteButton.dataset.favorite);
  }

  if (relatedButton) {
    const entry = dictionary.find((item) => item.word === relatedButton.dataset.relatedWord);
    selectWord(entry, true, relatedButton.dataset.relatedWord);
  }
});

wordList.addEventListener("click", (event) => {
  const wordButton = event.target.closest("[data-word]");
  if (!wordButton) {
    return;
  }
  const entry = dictionary.find((item) => item.word === wordButton.dataset.word);
  selectWord(entry);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    activeTab = tab.dataset.tab;
    renderWordList();
  });
});

propertiesButton?.addEventListener("click", openPropertiesModal);
propertiesCloseButton?.addEventListener("click", closePropertiesModal);

propertiesModal?.addEventListener("click", (event) => {
  if (event.target === propertiesModal) {
    closePropertiesModal();
    return;
  }

  const actionButton = event.target.closest("[data-properties-action]");
  if (!actionButton) {
    return;
  }

  if (actionButton.dataset.propertiesAction === "clear-recent") {
    clearRecentHistory();
  }

  if (actionButton.dataset.propertiesAction === "clear-favorites") {
    clearFavoriteWords();
  }
});

if (typeof document.addEventListener === "function") {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && propertiesModal && !propertiesModal.hidden) {
      closePropertiesModal();
    }
  });
}

clearAllButton.addEventListener("click", clearAllUsageData);

selectWord(selectedWord, false);
renderSuggestions();
renderQuiz();
