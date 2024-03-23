import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {

    // solo va a llamar casos de uso
    async ortographyCheck(orthographyDto: OrthographyDto) {
        // Also we can use the dto to validate the input
        return await orthographyCheckUseCase({
            prompt: orthographyDto.prompt,
        });
    }
}
