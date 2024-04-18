
interface Options {
    prompt: string;
    voice?: string;
}

export const textToAudioUseCase = async (openai: any, { prompt, voice }: Options) => {

    const voices = {
        'nova': 'nova',
        'alloy': 'alloy',
    };

    const selectedvoice = voices[voice] || 'nova';

    return {
        prompt,
        selectedvoice,
    }

}