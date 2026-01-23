const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Your ElevenLabs Agent ID
const AGENT_ID = 'agent_5001ke958d2qfngvsavg213h3nq1';

// Main webhook endpoint that Jambonz will call when a call comes in
app.post('/webhook', (req, res) => {
  console.log('Incoming call webhook triggered');
  
  // Return Jambonz instructions to connect to ElevenLabs Conversational AI
  const response = [
    {
      "verb": "config",
      "synthesizer": {
        "vendor": "elevenlabs",
        "language": "en-US"
      },
      "recognizer": {
        "vendor": "elevenlabs", 
        "language": "en-US"
      }
    },
    {
      "verb": "say",
      "text": "Connecting you to our AI assistant. Please wait a moment."
    },
    {
      "verb": "conversationAI",
      "vendor": "elevenlabs",
      "agentId": AGENT_ID,
      "maxDuration": 600
    }
  ];
  
  res.json(response);
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('ElevenLabs Jambonz Webhook is running! Agent ID: ' + AGENT_ID);
});

// Call status webhook (optional, for logging)
app.post('/status', (req, res) => {
  console.log('Call status update:', req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
  console.log(`Webhook URL: http://localhost:${PORT}/webhook`);
});
