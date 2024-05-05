import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
} from './use-cases';
import { QuestionDto } from './dtos';

@Injectable()
export class SamAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENIA_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { threadId, question } = questionDto;

    const message = await createMessageUseCase(this.openai, {
      threadId,
      question,
    });

    const run = await createRunUseCase(this.openai, { threadId });
  }
}
