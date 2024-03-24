import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
                Te serán proveidos textos en españool  con posibles errores ortográficos y gramaticales,
                las palabras usadas deben existir en el diccionario de la RAE,
                Debes de responder en formato JSON,
                tu tarea es corregirlos y retornar información soluciones,
                también debes de dar un porcentaje de acierto por el usuario,
                
                Si no hay errores, debes de retornar un mensaje de felicitaciones.

                Ejemplo de salida:
                {
                    userScore: number,
                    errors: string[], // ['error -> solución']
                    message: string // Usa emojis y texto para felicitar al usuario
                }
                
                `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 150,
    temperature: 0.3,
    response_format: {
      type: 'json_object',
    },
  });

  const jsonParse = JSON.parse(completion.choices[0].message.content);

  return jsonParse;
};
