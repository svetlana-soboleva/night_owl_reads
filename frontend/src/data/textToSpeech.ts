import * as PlayHT from 'playht';
import fs from 'fs';

const USER_ID = import.meta.env.VITE_PLAYHT_USER;
const PLAYHT_API = import.meta.env.VITE_PLAYHT_API;

PlayHT.init({
  userId: USER_ID,
  apiKey: PLAYHT_API ,
});

async function streamAudio(text: string) {
  const stream = await PlayHT.stream(text, { voiceEngine: 'Play3.0-mini' });
  stream.on('data', (chunk) => {
    fs.appendFileSync('output.mp3', chunk);
  });
  return stream;
}