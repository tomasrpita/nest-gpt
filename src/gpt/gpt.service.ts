import { Injectable } from '@nestjs/common';

import { OpenAI } from 'openai';

import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENIA_API_KEY,
    });

    // solo va a llamar casos de uso
    async ortographyCheck(orthographyDto: OrthographyDto) {
        // Also we can use the dto to validate the input
        return await orthographyCheckUseCase(this.openai, {
            prompt: orthographyDto.prompt,
        });
    }
}
