const express = require('express')
const cors = require('cors')
const textToSpeech = require('@google-cloud/text-to-speech')
const path = require('path')

const app = express()
const port = 5050

app.use(cors())
app.use(express.json())

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: path.join(__dirname, 'google-key.json'),
})

app.post('/speak', async (req, res) => {
  const text = req.body.text

  const trickyCombos = [
    'EY',
    'AY',
    'OY',
    'ÜF',
    'AH',
    'OH',
    'ET',
    'OT',
    'EK',
    'SU',
    'UN',
  ]

  let input

  if (trickyCombos.includes(text)) {
    // ✅ use SSML + <break> tags between letters
    const letters = text.split('')
    const ssmlText = `<speak>${letters
      .map(
        (l) =>
          `<say-as interpret-as="characters">${l}</say-as><break time="300ms"/>`
      )
      .join('')}</speak>`

    input = { ssml: ssmlText }
  } else {
    input = { text }
  }

  const request = {
    input,
    voice: {
      languageCode: 'tr-TR',
      ssmlGender: 'FEMALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 0.85,
    },
  }

  try {
    const [response] = await client.synthesizeSpeech(request)
    res.set('Content-Type', 'audio/mpeg')
    res.send(response.audioContent)
  } catch (error) {
    console.error('Speech synthesis error:', error)
    res.status(500).send('Error generating speech')
  }
})

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`)
})
