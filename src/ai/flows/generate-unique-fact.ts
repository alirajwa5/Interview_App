'use server';

/**
 * @fileOverview Generates a unique and interesting fact based on user data.
 *
 * - generateUniqueFact - A function that generates a unique fact.
 * - GenerateUniqueFactInput - The input type for the generateUniqueFact function.
 * - GenerateUniqueFactOutput - The return type for the generateUniqueFact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUniqueFactInputSchema = z.object({
  email: z.string().describe('The user email address.'),
  userId: z.string().describe('The unique user ID.'),
  accountCreationDate: z.string().describe('The date the account was created.'),
});
export type GenerateUniqueFactInput = z.infer<typeof GenerateUniqueFactInputSchema>;

const GenerateUniqueFactOutputSchema = z.object({
  fact: z.string().describe('A unique and interesting fact derived from the user data.'),
});
export type GenerateUniqueFactOutput = z.infer<typeof GenerateUniqueFactOutputSchema>;

export async function generateUniqueFact(input: GenerateUniqueFactInput): Promise<GenerateUniqueFactOutput> {
  return generateUniqueFactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUniqueFactPrompt',
  input: {schema: GenerateUniqueFactInputSchema},
  output: {schema: GenerateUniqueFactOutputSchema},
  prompt: `You are an AI assistant tasked with generating unique and interesting facts based on user data.

  Here is the user data:
  Email: {{{email}}}
  User ID: {{{userId}}}
  Account Creation Date: {{{accountCreationDate}}}

  Generate a single, surprising and personalized fact that combines these pieces of information in a creative way. The fact should be no more than two sentences long.
  The fact should be suitable for display on a user dashboard to enhance their experience.
  Remember to make the fact interesting and unique.
  `,
});

const generateUniqueFactFlow = ai.defineFlow(
  {
    name: 'generateUniqueFactFlow',
    inputSchema: GenerateUniqueFactInputSchema,
    outputSchema: GenerateUniqueFactOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
