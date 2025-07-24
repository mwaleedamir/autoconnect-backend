// controllers/chatController.js
import openai from '../config/openai.js';

export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }]
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ response: reply });
    res.then((result) => console.log(result.output_text));
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
};
