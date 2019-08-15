const buildUrl = require('build-url');
const axios = require('axios');
const XLSX = require('xlsx')
const workbook = XLSX.readFile('./test/testdata/TestData.xlsx');
const xlVAServer = XLSX.utils.sheet_to_json(workbook.Sheets['VAServer']);
const delay = require('delay');
const fs = require("fs");
const AudioContext = require('web-audio-api').AudioContext, 
      audioCtx = new AudioContext,
      Speaker = require('speaker');
audioCtx.outStream = new Speaker({
  channels: audioCtx.format.numberOfChannels,
  bitDepth: audioCtx.format.bitDepth,
  sampleRate: audioCtx.sampleRate
})

let data;
let count;
let startTime;


function readVAServerUrl() {
  try {
    let buf = fs.readFileSync('va.log', 'utf8');  
    let lines = buf.split("\n"); // each line in an array
    let line = lines.filter(line =>
        /Voice Automation server started at/.test(line));
    let urlpath = line[0].split(" ")[line[0].split(" ").length - 1];
    return urlpath;
  } catch(err) {
    if(err.code == 'ENOENT') {
      console.log('va.log not found!');
    } else throw err;
  }
}

export async function playAudio(text, wav_file, start_delay, end_delay) {
  switch(xlVAServer[0].useTL_TTS) {
    case 'yes':
      return perform_tts(text);
    default:
      switch (xlVAServer[0].useTTS) {
        case 'yes':
          return load(text, start_delay, end_delay);
        default:
          let voiceFile= xlVAServer[0].audioFilePath + '/' + wav_file + '.wav';
          await delay(start_delay);
          switch(xlVAServer[0].useVAServer) {
            case 'yes':
              play(voiceFile);
              break;
            default:
              playWithoutVAServer(voiceFile); 
              break;
          }
          await delay(end_delay);
          break;
      }
      break;
  }
}

async function load(text, start_delay, end_delay)
{
  const TTSFilePath = buildUrl(xlVAServer[0].TTS_BaseURL, {
    path: '',
    queryParams: {
      key: xlVAServer[0].TTS_APIKEY,
      src: text,
      hl: xlVAServer[0].Language_Codes,
      c: 'wav'
    }
  })
  console.log('Load File');
  const payload = {
    "voiceFilePath": TTSFilePath
  }

  const serverUrl = readVAServerUrl() + "load";
  const loadResponse = await axios.post(serverUrl, payload, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    
    }).catch(function(loadResponse) {
      console.log(loadResponse);
  })

  if (loadResponse.status === 200)
  {
    await delay(start_delay);
    await play(loadResponse.data.voiceFilePath);
    await delay(end_delay);
  }
}

async function play(voiceFilePath)
{
  const serverUrl = readVAServerUrl() + "play";
  console.log('VA Server URL: ' + serverUrl);
  const payload = {
      "voiceFilePath": voiceFilePath
  }
  
  return await axios.post(serverUrl, payload, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
  }).catch(function(playResponse) {
    console.log(playResponse);
  })
}

function playWithoutVAServer(voiceFilePath) {
    const player = require('node-wav-player');
    player.play({
      path: voiceFilePath
    }).then(() => {
      console.log('The wav file started to be played successfully.');
    }).catch((error) => {
      console.error(error);
    });
}

var WebSocket = require('ws');
var wsUri = "ws://" + xlVAServer[0].wsURI;
if (xlVAServer[0].useTL_TTS == 'yes') {
  console.log("Connecting to " + wsUri);
  var ws = new WebSocket(wsUri);
  ws.onopen = function(evt) { onOpen(evt) };
  ws.onclose = function(evt) { onClose(evt) };
  ws.onmessage = function(evt) { onMessage(evt) };
  ws.onerror = function(evt) { onError(evt) };
}

// Event Handlers to websocket connection
function onOpen(evt) {
  console.log("Connected to server");
}

function onClose(evt) {
  console.log("Disconnected from server");
}

function onError(evt) {
  console.log("Communication error");
}

function onMessage(evt) {
  console.log("Receiving data on websocket ...");
  
  if (evt.data instanceof ArrayBuffer) 
  {
    if (count == 0) {
      startTime = audioCtx.currentTime;
    }
    
    audioCtx.decodeAudioData(evt.data, function(data) {
      count++;
      startTime = startTime + 0.3;
      let duration = playSound(data, startTime);
      startTime = startTime + duration;
    });
    
  }
}

function playSound(buffer, playTime)
{
  let source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.start(playTime);
 
  source.connect(audioCtx.destination);
  console.log('connect destination ');
  let duration = buffer.duration;
  return duration;
}

function perform_tts(text)
{
  data = new ArrayBuffer(0);
  count = 0;
  ws.binaryType = "arraybuffer";
  console.log('Sending text ' + text);
  ws.send(text);
}




