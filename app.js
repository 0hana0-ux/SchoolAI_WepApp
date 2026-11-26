// ==========================================
// 1. 오리지널 창작 동화 3종 및 Fallback 데이터
// ==========================================
const STORIES = [
  {
    id: 'cloud-garden',
    icon: '☁️',
    title: '구름 정원의 견습 마법사',
    summary: '잠든 하늘 정원의 꽃을 피우기 위해 작은 지팡이를 든 견습생 이야기',
    openingEmoji: '☁️🌸🪄',
    openingChapter: '제1장 · 하얀 솜사탕 문 앞에서',
    openingText:
      '몽글몽글 구름 정원에 아침 종소리가 울렸어요. 잠든 무지개 꽃밭을 깨우려면 첫 번째 마법 재료를 골라야 해요. 어떤 반짝임을 손에 쥘까요?',
    openingChoices: [
      { type: '단어 카드', text: '🌈 무지개 이슬병', stat: 'imagination', delta: 15 },
      { type: '행동 카드', text: '울고 있는 아기 구름을 꼭 안아 준다', stat: 'kindness', delta: 15 },
      { type: '행동 카드', text: '안개 낀 하늘 다리 위로 성큼 걸어간다', stat: 'courage', delta: 15 },
    ],
  },
  {
    id: 'starlight-post',
    icon: '💌',
    title: '별빛 우체국의 작은 배달부',
    summary: '밤하늘에 흩어진 소원 편지를 주인에게 전해 주는 배달부 이야기',
    openingEmoji: '🌠📮🕊️',
    openingChapter: '제1장 · 반짝이는 소원 우체통',
    openingText:
      '은하수 우체국 창문으로 이름표가 떨어진 황금 편지 한 통이 날아들었어요. 밤하늘 미로를 지나 주인을 찾아 주려면 어떻게 출발할까요?',
    openingChoices: [
      { type: '단어 카드', text: '🕯️ 작은 별빛 등불', stat: 'courage', delta: 15 },
      { type: '단어 카드', text: '🍪 달콤한 별가루 쿠키', stat: 'kindness', delta: 15 },
      { type: '행동 카드', text: '종이비행기를 접어 바람의 노래를 듣는다', stat: 'imagination', delta: 15 },
    ],
  },
  {
    id: 'sweet-clocktower',
    icon: '🕰️',
    title: '달콤 시계탑의 비밀 열쇠',
    summary: '멈춰 버린 꿈나라 시계를 다시 움직이게 하는 모험 이야기',
    openingEmoji: '🕰️🔑🍬',
    openingChapter: '제1장 · 똑딱임이 멈춘 꿈의 광장',
    openingText:
      '꿈나라 한가운데 커다란 시계탑이 자정 5분 전에 멈춰 섰어요. 톱니바퀴 사이에서 작은 요정이 손짓하고 있네요. 무엇부터 해 볼까요?',
    openingChoices: [
      { type: '단어 카드', text: '🔑 별사탕 태엽 열쇠', stat: 'imagination', delta: 15 },
      { type: '행동 카드', text: '겁먹은 태엽 다람쥐에게 다정히 말을 건넨다', stat: 'kindness', delta: 15 },
      { type: '행동 카드', text: '높은 나선 계단을 끝까지 올라가 본다', stat: 'courage', delta: 15 },
    ],
  },
];

// 6종 멀티 엔딩 정의
const ENDINGS = [
  {
    id: 'kind-gardener',
    icon: '🌸',
    title: '다정한 구름 정원사',
    conditionDesc: '다정함 지수가 가장 높을 때 달성',
    defaultReview: '작은 친구들의 마음까지 따뜻하게 보듬어 온 세상에 꽃을 피웠어요!',
  },
  {
    id: 'brave-explorer',
    icon: '🌟',
    title: '용감한 별빛 탐험가',
    conditionDesc: '용기 지수가 가장 높을 때 달성',
    defaultReview: '두근거리는 길 앞에서도 한 걸음 내딛는 멋진 용기를 보여 주었어요!',
  },
  {
    id: 'dream-inventor',
    icon: '🎨',
    title: '기발한 꿈의 발명가',
    conditionDesc: '상상력 지수가 가장 높을 때 달성',
    defaultReview: '반짝이는 아이디어로 아무도 생각하지 못한 마법의 길을 열었어요!',
  },
  {
    id: 'rainbow-guardian',
    icon: '🌈',
    title: '조화로운 무지개 수호자',
    conditionDesc: '다정함·용기·상상력이 고르게 자랐을 때 달성',
    defaultReview: '다정함과 용기, 상상력이 아름답게 어우러져 가장 빛나는 수호자가 되었어요!',
  },
  {
    id: 'warm-traveler',
    icon: '🕊️',
    title: '따뜻한 별빛 여행자',
    conditionDesc: '다정함과 용기가 함께 높게 자랐을 때 달성',
    defaultReview: '친구 곁을 지키는 따뜻한 마음과 씩씩한 발걸음이 멋진 기적을 만들었어요!',
  },
  {
    id: 'fantasy-writer',
    icon: '📖',
    title: '환상 동화 작가',
    conditionDesc: '다정함과 상상력이 함께 높게 자랐을 때 달성',
    defaultReview: '상냥한 시선과 꿈꾸는 마음으로 세상에서 가장 포근한 이야기를 완성했어요!',
  },
];

// API 지연/오류 시 동작할 예비 동화 분기
const FALLBACK_SCENES = {
  2: {
    emoji: '🦋✨🌿',
    chapter: '제2장 · 반짝이는 비밀 오솔길',
    storyText:
      '선택한 반짝임이 포근한 빛을 내며 앞길을 밝혀 주었어요. 길가에서는 수줍은 별꽃들이 고개를 내밀고, 멀리서 작은 도움의 소리가 들려와요.',
    choices: [
      { type: '행동 카드', text: '길 잃은 반딧불이에게 길을 안내해 준다', stat: 'kindness', delta: 15 },
      { type: '단어 카드', text: '🪄 반짝이는 마법 나침반', stat: 'courage', delta: 15 },
      { type: '단어 카드', text: '🫧 무지개 비눗방울 망토', stat: 'imagination', delta: 15 },
    ],
  },
  3: {
    emoji: '🌙🎶💫',
    chapter: '제3장 · 은빛 바람이 부는 언덕',
    storyText:
      '한 걸음씩 나아갈 때마다 주인공의 마음속 별빛도 더욱 또렷해졌어요. 언덕 꼭대기에는 잠긴 유리 문과 노래하는 바람개비가 기다리고 있네요.',
    choices: [
      { type: '행동 카드', text: '바람개비와 함께 신나는 노래를 부른다', stat: 'imagination', delta: 15 },
      { type: '행동 카드', text: '망설이지 않고 유리 문의 손잡이를 돌린다', stat: 'courage', delta: 15 },
      { type: '단어 카드', text: '🧣 포근한 햇살 목도리', stat: 'kindness', delta: 15 },
    ],
  },
  4: {
    emoji: '🏰🌠🌸',
    chapter: '제4장 · 마지막 별빛의 문턱',
    storyText:
      '드디어 이야기의 가장 중요한 순간이 찾아왔어요! 지금까지 모은 따뜻한 마음과 반짝이는 지혜를 모아 마지막 선택을 할 시간이에요.',
    choices: [
      { type: '행동 카드', text: '모두의 손을 잡고 함께 소원을 빈다', stat: 'kindness', delta: 20 },
      { type: '행동 카드', text: '가장 밝게 빛나는 별을 향해 뛰어오른다', stat: 'courage', delta: 20 },
      { type: '단어 카드', text: '🎨 꿈을 그리는 별빛 붓', stat: 'imagination', delta: 20 },
    ],
  },
  5: {
    emoji: '🌈👑✨',
    chapter: '제5장 · 반짝이는 동화의 완성',
    storyText:
      '와아! 하늘 가득 파스텔빛 무지개가 펼쳐지며 동화 속 세상이 환하게 깨어났어요. 모두가 주인공의 다정하고 멋진 활약을 축하해 주었답니다!',
    reviewText: '네가 고른 반짝이는 선택들이 모여 세상에서 가장 따뜻한 동화를 완성했어요!',
  },
};

const DEFAULT_NAMES = ['하느리', '별이', '루비', '다솜이', '라온이'];
const STORAGE_KEY = 'mongle_star_endings_v1';

// ==========================================
// 2. 게임 상태 관리
// ==========================================
const state = {
  selectedStoryId: STORIES[0].id,
  selectedFairy: '🧚‍♀️ 별빛 요정 루나',
  playerName: '',
  scene: 1,
  maxScenes: 5,
  stats: {
    kindness: 10,
    courage: 10,
    imagination: 10,
  },
  history: [],
  isLoading: false,
};

// ==========================================
// 3. DOM 요소 참조
// ==========================================
const startScreen = document.getElementById('startScreen');
const playScreen = document.getElementById('playScreen');
const endingScreen = document.getElementById('endingScreen');

const storyCardsEl = document.getElementById('storyCards');
const fairySelectorEl = document.getElementById('fairySelector');
const playerNameInput = document.getElementById('playerNameInput');
const startGameBtn = document.getElementById('startGameBtn');

const sceneBadge = document.getElementById('sceneBadge');
const displayPlayerInfo = document.getElementById('displayPlayerInfo');
const kindnessVal = document.getElementById('kindnessVal');
const courageVal = document.getElementById('courageVal');
const imaginationVal = document.getElementById('imaginationVal');
const kindnessBar = document.getElementById('kindnessBar');
const courageBar = document.getElementById('courageBar');
const imaginationBar = document.getElementById('imaginationBar');

const sceneEmoji = document.getElementById('sceneEmoji');
const sceneTitle = document.getElementById('sceneTitle');
const storyText = document.getElementById('storyText');
const statToast = document.getElementById('statToast');
const loadingBox = document.getElementById('loadingBox');
const choicesContainer = document.getElementById('choicesContainer');

const endingIcon = document.getElementById('endingIcon');
const endingTitle = document.getElementById('endingTitle');
const endingSubtitle = document.getElementById('endingSubtitle');
const endingStatsSummary = document.getElementById('endingStatsSummary');
const endingReviewText = document.getElementById('endingReviewText');

const replayBtn = document.getElementById('replayBtn');
const openCollectionBtn = document.getElementById('openCollectionBtn');
const endingToCollectionBtn = document.getElementById('endingToCollectionBtn');
const collectionModal = document.getElementById('collectionModal');
const closeCollectionBtn = document.getElementById('closeCollectionBtn');
const collectionGrid = document.getElementById('collectionGrid');
const collectionCount = document.getElementById('collectionCount');

// ==========================================
// 4. 초기화 및 시작 화면 렌더링
// ==========================================
function init() {
  renderStoryOptions();
  updateCollectionBadge();

  fairySelectorEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.fairy-btn');
    if (!btn) return;
    document.querySelectorAll('.fairy-btn').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.selectedFairy = btn.dataset.fairy;
  });

  startGameBtn.addEventListener('click', startNewGame);
  replayBtn.addEventListener('click', () => switchScreen('start'));
  openCollectionBtn.addEventListener('click', openCollectionModal);
  endingToCollectionBtn.addEventListener('click', openCollectionModal);
  closeCollectionBtn.addEventListener('click', () => collectionModal.classList.add('hidden'));
  collectionModal.addEventListener('click', (e) => {
    if (e.target === collectionModal) collectionModal.classList.add('hidden');
  });
}

function renderStoryOptions() {
  storyCardsEl.innerHTML = STORIES.map(
    (story) => `
      <div class="story-option-card ${story.id === state.selectedStoryId ? 'selected' : ''}" data-id="${story.id}">
        <div class="story-option-icon">${story.icon}</div>
        <h3>${story.title}</h3>
        <p>${story.summary}</p>
      </div>
    `
  ).join('');

  storyCardsEl.querySelectorAll('.story-option-card').forEach((card) => {
    card.addEventListener('click', () => {
      state.selectedStoryId = card.dataset.id;
      renderStoryOptions();
    });
  });
}

function switchScreen(name) {
  [startScreen, playScreen, endingScreen].forEach((el) => el.classList.remove('active'));
  if (name === 'start') startScreen.classList.add('active');
  if (name === 'play') playScreen.classList.add('active');
  if (name === 'ending') endingScreen.classList.add('active');
}

// ==========================================
// 5. 게임 진행 로직
// ==========================================
function startNewGame() {
  const rawName = playerNameInput.value.trim();
  state.playerName = rawName || DEFAULT_NAMES[Math.floor(Math.random() * DEFAULT_NAMES.length)];
  state.scene = 1;
  state.stats = { kindness: 10, courage: 10, imagination: 10 };
  state.history = [];

  const story = STORIES.find((s) => s.id === state.selectedStoryId) || STORIES[0];
  displayPlayerInfo.textContent = `${state.playerName} · ${state.selectedFairy}`;
  statToast.classList.add('hidden');

  updateStatsUI();
  renderScene({
    emoji: story.openingEmoji,
    chapter: story.openingChapter,
    storyText: story.openingText,
    choices: story.openingChoices,
  });

  switchScreen('play');
}

function updateStatsUI() {
  const { kindness, courage, imagination } = state.stats;
  kindnessVal.textContent = kindness;
  courageVal.textContent = courage;
  imaginationVal.textContent = imagination;

  kindnessBar.style.width = `${Math.min(100, Math.round((kindness / 80) * 100))}%`;
  courageBar.style.width = `${Math.min(100, Math.round((courage / 80) * 100))}%`;
  imaginationBar.style.width = `${Math.min(100, Math.round((imagination / 80) * 100))}%`;
}

function renderScene({ emoji, chapter, storyText: text, choices }) {
  sceneBadge.textContent = `장면 ${state.scene} / ${state.maxScenes}`;
  sceneEmoji.textContent = emoji || '✨🌙☁️';
  sceneTitle.textContent = chapter || `제${state.scene}장 · 반짝이는 이야기`;
  storyText.textContent = text;

  choicesContainer.innerHTML = (choices || [])
    .map(
      (choice, idx) => `
      <button type="button" class="choice-card" data-index="${idx}">
        <span class="choice-type-tag">${choice.type || '선택 카드'}</span>
        <span class="choice-label">${choice.text}</span>
      </button>
    `
    )
    .join('');

  choicesContainer.querySelectorAll('.choice-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (state.isLoading) return;
      const chosen = choices[Number(btn.dataset.index)];
      handleChoiceSelection(chosen);
    });
  });
}

async function handleChoiceSelection(choice) {
  const statKey = ['kindness', 'courage', 'imagination'].includes(choice.stat)
    ? choice.stat
    : 'kindness';
  const delta = Number(choice.delta) || 15;
  state.stats[statKey] += delta;
  updateStatsUI();

  const statNameMap = {
    kindness: '💖 다정함',
    courage: '🌟 용기',
    imagination: '🎨 상상력',
  };
  statToast.textContent = `${statNameMap[statKey]} +${delta} 반짝임이 자랐어요!`;
  statToast.classList.remove('hidden');

  state.history.push({
    scene: state.scene,
    choice: choice.text,
    story: storyText.textContent,
  });

  state.scene += 1;
  const isFinalScene = state.scene === state.maxScenes;

  setLoading(true);
  const nextData = await fetchNextSceneFromAPI(choice.text, isFinalScene);
  setLoading(false);

  if (isFinalScene) {
    showEnding(nextData);
  } else {
    renderScene(nextData);
  }
}

function setLoading(loading) {
  state.isLoading = loading;
  if (loading) {
    loadingBox.classList.remove('hidden');
    choicesContainer.classList.add('hidden');
  } else {
    loadingBox.classList.add('hidden');
    choicesContainer.classList.remove('hidden');
  }
}

// ==========================================
// 6. Vercel Serverless API 호출 + 5초 타임아웃 Fallback (수정됨)
// ==========================================
async function fetchNextSceneFromAPI(selectedChoiceText, isFinalScene) {
  const story = STORIES.find((s) => s.id === state.selectedStoryId) || STORIES[0];
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        storyTitle: story.title,
        playerName: state.playerName,
        fairyName: state.selectedFairy,
        sceneNumber: state.scene,
        isFinalScene,
        selectedChoice: selectedChoiceText,
        stats: state.stats,
        previousSummary: state.history.slice(-2).map((h) => h.story).join(' '),
      }),
    });

    clearTimeout(timeoutId);

    const data = await response.json();
    if (!response.ok || !data || !data.storyText) {
      throw new Error(data?.error || '유효하지 않은 API 응답');
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[Fallback 전환] API 연결이 원활하지 않아 기본 동화 분기로 이어집니다:', err.message);
    return FALLBACK_SCENES[state.scene] || FALLBACK_SCENES[5];
  }
}

// ==========================================
// 7. 6종 엔딩 판정 및 도감 저장
// ==========================================
function determineEnding() {
  const { kindness, courage, imagination } = state.stats;
  const entries = [
    { key: 'kindness', val: kindness },
    { key: 'courage', val: courage },
    { key: 'imagination', val: imagination },
  ].sort((a, b) => b.val - a.val);

  const [first, second, third] = entries;

  if (first.val - third.val <= 10) {
    return ENDINGS.find((e) => e.id === 'rainbow-guardian');
  }

  if (first.val - second.val <= 5) {
    const pair = new Set([first.key, second.key]);
    if (pair.has('kindness') && pair.has('courage')) {
      return ENDINGS.find((e) => e.id === 'warm-traveler');
    }
    if (pair.has('kindness') && pair.has('imagination')) {
      return ENDINGS.find((e) => e.id === 'fantasy-writer');
    }
  }

  if (first.key === 'kindness') return ENDINGS.find((e) => e.id === 'kind-gardener');
  if (first.key === 'courage') return ENDINGS.find((e) => e.id === 'brave-explorer');
  return ENDINGS.find((e) => e.id === 'dream-inventor');
}

function showEnding(finalSceneData) {
  const ending = determineEnding();
  saveEndingToCollection(ending.id);

  endingIcon.textContent = ending.icon;
  endingTitle.textContent = ending.title;
  endingSubtitle.textContent = `${state.playerName}와(과) ${state.selectedFairy}의 반짝임 결말`;

  endingStatsSummary.innerHTML = `
    <span class="ending-stat-pill">💖 다정함 ${state.stats.kindness}</span>
    <span class="ending-stat-pill">🌟 용기 ${state.stats.courage}</span>
    <span class="ending-stat-pill">🎨 상상력 ${state.stats.imagination}</span>
  `;

  const combinedReview = finalSceneData.reviewText
    ? `${finalSceneData.storyText} ${finalSceneData.reviewText}`
    : `${finalSceneData.storyText} ${ending.defaultReview}`;

  endingReviewText.textContent = combinedReview;
  switchScreen('ending');
}

function getUnlockedEndings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveEndingToCollection(endingId) {
  const unlocked = getUnlockedEndings();
  if (!unlocked.includes(endingId)) {
    unlocked.push(endingId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
  }
  updateCollectionBadge();
}

function updateCollectionBadge() {
  const unlocked = getUnlockedEndings();
  collectionCount.textContent = unlocked.length;
}

function openCollectionModal() {
  const unlocked = getUnlockedEndings();
  collectionGrid.innerHTML = ENDINGS.map((end) => {
    const isUnlocked = unlocked.includes(end.id);
    return `
      <div class="collection-item ${isUnlocked ? '' : 'locked'}">
        <div class="collection-item-head">
          <span>${isUnlocked ? end.icon : '🔒'}</span>
          <span>${isUnlocked ? end.title : '아직 잠긴 수호자 카드'}</span>
        </div>
        <p>${isUnlocked ? end.defaultReview : end.conditionDesc}</p>
      </div>
    `;
  }).join('');

  collectionModal.classList.remove('hidden');
}

init();
