const STUDIO_DEFAULT_KEY = 'AQ.Ab8RN6LB88GU4hbvOO42p3aocwN7d7WtJOIXTbsfoUlK9T8IeQ';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Gemini_API_Key 우선 확인, 없으면 AI_API_KEY, 그 외 기본값 순서로 읽음
  const apiKey = (
    process.env.Gemini_API_Key ||
    process.env.AI_API_KEY ||
    STUDIO_DEFAULT_KEY
  ).trim();

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini_API_Key가 설정되지 않았습니다.' });
  }

  try {
    const {
      storyTitle,
      playerName,
      fairyName,
      sceneNumber,
      isFinalScene,
      selectedChoice,
      stats,
      previousSummary,
    } = req.body || {};

    const systemInstruction = `
당신은 초등학교 1~6학년 학생을 위한 따뜻하고 몽환적인 인터랙티브 동화 작가입니다.
반드시 아래 규칙을 지키세요:
1. 문체: 초등학생이 읽기 쉬운 다정하고 포근한 '해요체'를 사용하세요.
2. 길이: storyText는 공백 포함 120~220자(2~4문장)로 작성하세요.
3. 안전: 공포, 폭력, 비속어, 슬프거나 무서운 결말은 절대 쓰지 말고 항상 희망적이고 긍정적인 성장을 담으세요.
4. 출력: 반드시 아래 JSON 형식으로만 응답하세요.
${
  isFinalScene
    ? `{
  "emoji": "결말에 어울리는 이모지 3개",
  "chapter": "제5장 · 멋진 동화 제목",
  "storyText": "감동적이고 따뜻한 마지막 장면 이야기 (2~4문장)",
  "reviewText": "주인공의 선택을 칭찬하는 한 줄 동화 평 (1문장)"
}`
    : `{
  "emoji": "장면에 어울리는 이모지 3개",
  "chapter": "제\${sceneNumber}장 · 동화 소제목",
  "storyText": "이전 선택을 자연스럽게 이어받은 다음 장면 이야기 (2~4문장)",
  "choices": [
    { "type": "단어 카드 또는 행동 카드", "text": "초등학생용 선택지 1", "stat": "kindness", "delta": 15 },
    { "type": "단어 카드 또는 행동 카드", "text": "초등학생용 선택지 2", "stat": "courage", "delta": 15 },
    { "type": "단어 카드 또는 행동 카드", "text": "초등학생용 선택지 3", "stat": "imagination", "delta": 15 }
  ]
}`
}`;

    const userPrompt = `
- 동화 제목: ${storyTitle}
- 주인공 이름: ${playerName}
- 함께하는 요정: ${fairyName}
- 현재 장면 번호: ${sceneNumber} / 5 (최종 결말 여부: ${isFinalScene ? '예' : '아니오'})
- 직전 이야기 요약: ${previousSummary || '동화의 시작'}
- 방금 주인공이 고른 선택: "${selectedChoice}"
- 현재 마음 지수: 다정함 ${stats?.kindness ?? 10}, 용기 ${stats?.courage ?? 10}, 상상력 ${stats?.imagination ?? 10}

위 내용을 이어받아 다음 장면을 JSON으로 만들어 주세요.
`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const apiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.85,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!apiResponse.ok) {
      const errorDetail = await apiResponse.text();
      return res.status(502).json({ error: 'Gemini API 호출 실패', detail: errorDetail });
    }

    const result = await apiResponse.json();
    const rawText = (result?.candidates?.[0]?.content?.parts?.[0]?.text || '{}')
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(rawText);
    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({ error: '서버 처리 중 오류 발생', message: error.message });
  }
}
