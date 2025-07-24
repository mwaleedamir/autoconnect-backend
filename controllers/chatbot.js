// controllers/chatbot.js
import openai from '../config/openai.js';

export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
      max_tokens: 150, // Add token limit to prevent excessive usage
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;
    res.json({ response: reply });
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    
    // Handle specific error types
    if (error.status === 401) {
      return res.status(401).json({ 
        error: 'OpenAI API authentication failed. Please check your API key permissions.',
        details: 'Your API key may be missing the required scopes or you may not have the correct role in your organization.'
      });
    } else if (error.status === 429) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    } else if (error.status === 403) {
      return res.status(403).json({ 
        error: 'Access denied. Check your API key permissions and organization role.' 
      });
    } else {
      return res.status(500).json({ 
        error: 'Failed to get response from AI',
        message: error.message 
      });
    }
  }
};

// Test function to verify API key
export const testAPIKey = async (req, res) => {
  try {
    const models = await openai.models.list();
    res.json({ 
      success: true, 
      message: 'API key is working correctly',
      availableModels: models.data.slice(0, 5).map(model => model.id)
    });
  } catch (error) {
    console.error('API Key Test Error:', error.message);
    res.status(401).json({ 
      success: false, 
      error: 'API key test failed', 
      message: error.message 
    });
  }
};