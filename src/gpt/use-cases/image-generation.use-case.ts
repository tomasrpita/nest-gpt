import * as fs from 'fs';
import * as path from 'path';

import OpenAI from 'openai';
import { downloadBase64ImageAsPng, downloadImageAsPng } from 'src/helpers';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, originalImage, maskImage } = options;

  // verificar originalImage e maskImage
  if (!originalImage || !maskImage) {
    const response = await openai.images.generate({
      prompt: prompt,
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });

    // Guardar la imagen en FS.
    const url = downloadImageAsPng(response.data[0].url);

    // console.log(response);

    return {
      url: url, //TODO: http://localhost:3000/gpt/image-generation/1703770602518,png
      OpenAIUrl: response.data[0].url,
      revised_prompt: response.data[0].revised_prompt,
    };
  }

  // originalImage = http://localhost:3000/gpt/image-generation/1703770602518,png
  // maskImage=Base64;klsañlkrwelifnmasdklñjfasdkjflñkasdjflkñasdjflkasdjfasdjf
  const pngImagePath = await downloadImageAsPng(originalImage);
  const maskPath = await downloadBase64ImageAsPng(maskImage);

  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt: prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskPath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const localImagePath = await downloadImageAsPng(response.data[0].url);
  const fileName = path.basename(localImagePath);

  const publicUrl = `localhost:3000/${fileName}`;

  return {
    url: publicUrl, //TODO: http://localhost:3000/gpt/image-generation/1703770602518,png
    OpenAIUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
