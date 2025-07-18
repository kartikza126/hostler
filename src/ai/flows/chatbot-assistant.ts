// This file uses server-side code.
'use server';

/**
 * @fileOverview A chatbot assistant to guide students through the app and answer FAQs.
 *
 * - chatbotAssistant - A function that handles the chatbot assistant process.
 * - ChatbotAssistantInput - The input type for the chatbotAssistant function.
 * - ChatbotAssistantOutput - The return type for the chatbotAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAssistantInputSchema = z.object({
  query: z.string().describe('The query from the user.'),
});
export type ChatbotAssistantInput = z.infer<typeof ChatbotAssistantInputSchema>;

const ChatbotAssistantOutputSchema = z.object({
  response: z.string().describe('The response from the chatbot.'),
});
export type ChatbotAssistantOutput = z.infer<typeof ChatbotAssistantOutputSchema>;

export async function chatbotAssistant(input: ChatbotAssistantInput): Promise<ChatbotAssistantOutput> {
  return chatbotAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAssistantPrompt',
  input: {schema: ChatbotAssistantInputSchema},
  output: {schema: ChatbotAssistantOutputSchema},
  prompt: `You are a chatbot assistant for the KotaStay app, designed to help students find hostels in Kota. Answer the following question:

  {{query}}
  `,
});

const chatbotAssistantFlow = ai.defineFlow(
  {
    name: 'chatbotAssistantFlow',
    inputSchema: ChatbotAssistantInputSchema,
    outputSchema: ChatbotAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
