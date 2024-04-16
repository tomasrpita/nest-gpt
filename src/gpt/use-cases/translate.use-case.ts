import OpenAI from 'openai';

interface Options {
  prompt: string;
    lang: string;
}

export const translateUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, lang } = options;
  console.log('prompt', prompt);


  const translation =  await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Eres un traductor ${lang}!`,
      },
      {
        role: 'user',
        content: `Traduce el siguiente texto al idioma ${lang}:${ prompt }`,
      },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.2,
  });

    return {message: translation.choices[0].message.content};
};
