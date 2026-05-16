'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askMathQuestion(question: string) {
  if (!question) return { error: '질문을 입력해주세요.' };

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-3.5-turbo'
      messages: [
        {
          role: 'system',
          content: '너는 친절하고 전문적인 고등학교 수학 교사야. 학생의 질문에 단계별로 차근차근 설명해주고, 정답뿐만 아니라 풀이 과정과 핵심 개념을 명확하게 짚어줘. 필요하다면 LaTeX 형식을 사용하여 수식을 표현해줘.'
        },
        {
          role: 'user',
          content: question
        }
      ],
      temperature: 0.7,
    });

    return { answer: response.choices[0].message.content };
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return { error: '챗봇 응답 중 오류가 발생했습니다. API 키 설정을 확인해주세요.' };
  }
}
