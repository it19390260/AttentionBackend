const speech = require('@google-cloud/speech');

require('dotenv').config();

async function main(payload) {

    const client = new speech.SpeechClient();

    const audio = {
        content: payload.audio
    };
    console.log(`payload.audio: ${payload.audio}`)

    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
        speechContexts: [{
            "phrases": ["pink brown orange yellow blue green red"]
        }]
    };

    const request = {
        audio: audio,
        config: config
    }

    const [response] = await client.recognize(request);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: ${transcription}`)

    return transcription;
}

module.exports = { main };