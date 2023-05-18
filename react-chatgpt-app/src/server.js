const PORT = process.env.PORT || 8000
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const API_KEY = ''

app.post('./completions', async (req, res) => {

  const options = {
    method:"POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", content: req.body.message}],
    max_tokens: 100,
    })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completion', options)
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
  }

} )

app.listen(PORT, () => console.log('your server is running on PORT' + PORT))
