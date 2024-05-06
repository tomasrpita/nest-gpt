import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  checkRunStatusUseCase,
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessageListUserCase,
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

    await createMessageUseCase(this.openai, {
      threadId,
      question,
    });

    const run = await createRunUseCase(this.openai, { threadId });

    await checkRunStatusUseCase(this.openai, {
      runId: run.id,
      threadId: threadId,
    });

    const messages = await getMessageListUserCase(this.openai, { threadId });

    return messages;
  }
}
