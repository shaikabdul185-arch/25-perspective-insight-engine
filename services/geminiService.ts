
import { GoogleGenAI, Content } from "@google/genai";
import { Message, AgentDefinition } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const chatWithAgent = async (
  agent: AgentDefinition,
  history: Message[],
  newMessage: string,
  onChunk: (text: string) => void
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  // Construct a conversational, adaptive system instruction
  let systemInstruction = `
    ROLE: You are ${agent.name}, a world-class expert in ${agent.expertise}.
    
    TONE & STYLE:
    - Be CHEERFUL, ADAPTIVE, and CONVERSATIONAL. 
    - You are a helpful, smart colleague, not a dry textbook or a stern professor.
    - Use natural language, clear analogies, and an encouraging tone.
    - It is okay to use greetings (e.g., "Hello!", "That's a great question!") and act like a human.
    - If the user's idea is good, validate it. If it has flaws, gently point them out using your expertise.
    
    CONTEXTUAL CONTINUITY:
    You are part of a team. If other experts (e.g., Economist, Engineer) have spoken previously in this chat history, acknowledge them! 
    Say things like "Building on what the Engineer said..." or "I see the Economist's point, but from my perspective..."
    Synthesize the previous context into your unique perspective naturally.
    
    YOUR EXPERTISE:
    ${agent.instructions || 'Assist the user within your domain of expertise.'}
    
    GOAL:
    Make the user feel smarter and more capable. Give them actionable, expert advice without drowning them in jargon unless necessary.
  `;

  if (agent.allowedFiles && agent.allowedFiles.length > 0) {
    systemInstruction += `
    
    REFERENCE KNOWLEDGE:
    You have access to the following internal strategic documents:
    ${agent.allowedFiles.join(', ')}
    
    Use insights from these files to help the user, but weave them into the conversation naturally. 
    Don't just quote the text—apply the concepts to the user's specific problem.
    `;
  }

  // Transform history for Gemini API
  const apiHistory: Content[] = history
    .filter(msg => msg.content.trim() !== "") 
    .map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Slightly higher for more natural, creative conversation
      },
      history: apiHistory
    });

    const result = await chat.sendMessageStream({ message: newMessage });
    
    let fullResponse = "";
    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        fullResponse += text;
        onChunk(fullResponse);
      }
    }
    
    return fullResponse;

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};
