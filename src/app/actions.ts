'use server';

import { chatbotAssistant } from '@/ai/flows/chatbot-assistant';
import { z } from 'zod';

const ChatSchema = z.object({
  query: z.string().min(1),
});

export async function handleChat(formData: FormData) {
  try {
    const validatedData = ChatSchema.parse({
      query: formData.get('query'),
    });

    const result = await chatbotAssistant({ query: validatedData.query });
    return { success: true, response: result.response };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input.' };
    }
    console.error('Error in chat handler:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
