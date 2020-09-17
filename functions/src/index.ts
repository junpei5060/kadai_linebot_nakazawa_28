import * as functions from 'firebase-functions';
import * as express from 'express'
import * as line from '@line/bot-sdk'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// LINE bot
const config = {
 channelSecret: "a22018b40a7bbbaaa91e65e1b63b1daf" ,//チャンネルシークレット
 channelAccessToken: "0uFIjciPXpJukfrFVu7XxOszEdZYlc3wJ6KSbdpsZdod0mKjuQGVBh+DuMbhTPoIlmf11euszE3aaMuX6KnXqhxXxZEI9F6I8g8xNFo1CFBeKPuJKrhggZXOoUWcYYT/0scfdh60j1aE2y5ii668QAdB04t89/1O/w1cDnyilFU=" //アクセストークン
};
const client = new line.Client(config);
const app = express();
app.post('/', line.middleware(config), (req, res) => {
 Promise.all(req.body.events.map(handleEvent))
     .then(() => res.status(200).end())
     .catch((err) => {
      console.error(err);
      res.status(500).end()
     })
});


async function handleEvent(event: any) {
    if (event.type === "message" && event.message.type === "text") {
        const replyMessage: string[] = ["いつもお疲れ様", "本当に頑張ってますね！", "すごいですね！！", "最&高！！！", "めっちゃわかりますそれ！", "いや、ほんとその通り！！","頑張ってくださいね！","皆さんのおかげで私も頑張れます！","世界を変えるぞ！","ゆっくり休んでください！","もっとがんばりましょう！","そんなんじゃダメ","コードに集中しろ！"];
        const randNum: number = Math.floor(Math.random() * Math.floor(replyMessage.length));
        return client.replyMessage(event.replyToken, {type: "text", text: replyMessage[randNum]});
    } else {
        return
    }
}
export const lineBot = functions.https.onRequest(app);