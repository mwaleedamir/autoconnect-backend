const openai = require('../config/openai');

const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ response: reply });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
};

module.exports = { chatWithAI };
