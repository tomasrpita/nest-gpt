import OpenAI from 'openai';
import * as fs from 'fs';

interface Options {
  prompt?: string;
  audioFile?: Express.Multer.File;
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, audioFile } = options;

  console.log('audioToTextUseCase', { prompt, audioFile });

  const response = await openai.audio.translations.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFile.path),
    prompt: prompt, // tiene que ser en el mismo idioma que el audio
    // language: 'es',
    // response_format: 'vtt', // 'srt' | 'vtt'
    response_format: 'verbose_json',
  });

  console.log('audioToTextUseCase', response);

  return response;
};
