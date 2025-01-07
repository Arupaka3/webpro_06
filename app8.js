"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: bbs.length });
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {messages: bbs });
  else res.json( {messages: bbs.slice( start )});
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  console.log( [name, message] );
  // 本来はここでDBMSに保存する
  bbs.push( { name: name, message: message } );
  res.json( {number: bbs.length } );
});

app.get("/bbs", (req,res) => {
    console.log("GET /BBS");
    res.json( {test: "GET /BBS" });
});

app.post("/bbs", (req,res) => {
    console.log("POST /BBS");
    res.json( {test: "POST /BBS"});
})

app.get("/bbs/:id", (req,res) => {
    console.log( "GET /BBS/" + req.params.id );
    res.json( {test: "GET /BBS/" + req.params.id });
});

app.put("/bbs/:id", (req,res) => {
    console.log( "PUT /BBS/" + req.params.id );
    res.json( {test: "PUT /BBS/" + req.params.id });
});

app.delete("/bbs/:id", (req,res) => {
    console.log( "DELETE /BBS/" + req.params.id );
    res.json( {test: "DELETE /BBS/" + req.params.id });
});


/*const bodyParser = require('body-parser');



// メモリ内でメッセージを管理
let messages = [];
let messageIdCounter = 1;

app.use(express.static('public')); // publicフォルダ内の静的ファイルを提供
app.use(bodyParser.urlencoded({ extended: true }));

// メッセージの投稿
app.post('/post', (req, res) => {
    const { name, message } = req.body;
    if (name && message) {
        const newMessage = {
            id: messageIdCounter++,
            name: name,
            message: message,
        };
        messages.push(newMessage);
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// メッセージの検索
app.post('/search', (req, res) => {
    const { name } = req.body;
    if (name) {
        const filteredMessages = messages.filter(msg => msg.name.includes(name));
        res.json({ messages: filteredMessages });
    } else {
        res.status(400).json({ error: 'Name required' });
    }
});

// メッセージの確認
app.post('/check', (req, res) => {
    res.json({ number: messages.length });
});

// メッセージの読み取り
app.post('/read', (req, res) => {
    const { start } = req.body;
    const startIndex = parseInt(start, 10);
    const newMessages = messages.slice(startIndex);
    res.json({ messages: newMessages });
});

// メッセージの削除
app.post('/delete', (req, res) => {
    const { id } = req.body;
    const index = messages.findIndex(msg => msg.id == id);
    if (index !== -1) {
        messages.splice(index, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
});*/

const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/delete', (req, res) => {
    const messageId = req.body.id;  
    console.log('Deleting message with ID:', messageId);

    const success = true; 

    if (success) {
        res.status(200).json({ message: 'Message deleted successfully' });
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
});

let messages = [
  // メッセージの例
  { id: 1, name: "User1", message: "Hello", highRating: 0, lowRating: 0 },
  { id: 2, name: "User2", message: "Hi there", highRating: 0, lowRating: 0 }
];

// メッセージに評価を追加
app.post('/rate', (req, res) => {
  const { id, type } = req.body;

  const message = messages.find(msg => msg.id == id);
  if (message) {
      if (type === 'high') {
          message.highRating += 1;
      } else if (type === 'low') {
          message.lowRating += 1;
      }
      res.json({ success: true });
  } else {
      res.status(404).json({ error: 'Message not found' });
  }
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
