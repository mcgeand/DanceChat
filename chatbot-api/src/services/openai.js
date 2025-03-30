const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are a helpful dance studio assistant. Your role is to:
1. Answer questions about dance classes, schedules, and services
2. Help with booking and scheduling
3. Provide information about different dance styles
4. Identify when someone is interested in classes (potential lead)
5. Be friendly and professional

When you identify a potential lead, include lead information in your response object.`;

const openAIService = {
  async createChatCompletion(userMessage) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const response = completion.choices[0].message;
      
      // Check for potential lead information in the message
      const leadInfo = this.extractLeadInfo(userMessage);

      return {
        content: response.content,
        leadInfo: leadInfo
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate response');
    }
  },

  extractLeadInfo(message) {
    // Simple check for keywords that might indicate interest
    const interestKeywords = ['book', 'schedule', 'interested', 'sign up', 'join', 'cost', 'price'];
    const hasInterest = interestKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    if (hasInterest) {
      // Extract email if present (basic regex)
      const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
      const emailMatch = message.match(emailRegex);
      
      return emailMatch ? {
        email: emailMatch[0],
        serviceRequested: 'private_lessons' // Default value, can be refined based on message content
      } : null;
    }

    return null;
  }
};

module.exports = { openAIService }; 