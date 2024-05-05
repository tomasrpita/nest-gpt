import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  // asistente por defecto, podría estar en variables de entorno
  const { threadId, assistantId = 'asst_Q1nHrNZFqnWJs3YIwkD6Ark1' } = options;

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    // instructions OJO! sobreescribe el asistente
  });

  console.log(run);

  return run;
};
