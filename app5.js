const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

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


let win =0;
let total = 0;
app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
 // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
let judgement = '';
if
  ( hand==cpu ){
  judgement='引き分け';
}else if 
  (  hand == 'パー' && cpu == 'グー' ||
  hand == 'チョキ' && cpu == 'パー' ||
  hand == 'グー' && cpu == 'チョキ' ){
  judgement='勝ち';
  win += 1;
}else{
    judgement='負け';

}total += 1;  
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/ga", (req, res) => {
  let hand = req.query.hand;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 15 + 1 );
  let ga = '○';
  if( num==1 ) ga = '☓';
  else if( num==2 ) ga = '△';
  else if( num==3 ) ga = '□';
 // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
let judgement = '';
if
  ( hand==ga ){
  judgement='星☆ スライム';
}else if 
  (  hand == '○' && ga == '☓' ||
  hand == '☓' && ga == '□' ||
  hand == '△' && ga == '○' ||
  hand == '□' && ga == '△' ){
  judgement='星☆☆☆☆ 中級魔術師';
}else if 
 (  hand == '○' && ga == '□' ||
  hand == '☓' && ga == '△' ||
  hand == '□' && ga == '○' ||
  hand == '△' && ga == '☓' ){
  judgement='星☆☆☆ 上級ゴブリン';
}else{
    judgement='星☆☆☆☆☆☆☆☆☆ ミラボレアス';

}
  const display = {
    your: hand,
    ga: ga,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'ga', display );
});



app.get("/ppap", (req, res) => {
  let hand = req.query.hand;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'Apple';
  else if( num==2 ) cpu = 'Pineapple';
  else cpu = 'pen';
 // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
let judgement = '';
if 
  (  hand == 'pen' && cpu == 'pineapple' ||
  hand == 'Apple' && cpu == 'pen' ||
  hand == 'Pineapple' && cpu == 'pen' ){
  judgement= hand+ ' ' +cpu;
}else if
( hand==cpu ){
judgement= 'pen-pineapple-Apple-pen';

}else{
    judgement='Apple-pen-Pineapple-pen';

}
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'ppap', display );
});

// app.get("/noo", (req, res) => {
//   const num = Math.floor( Math.random() * 5 + 1 );
//   let me = '醤油ラーメン';
//   if( num==1 ) me = '塩ラーメン';
//   else if( num==2 ) me = '豚骨ラーメン';
//   else if( num==3 ) me = '味噌ラーメン';
//   else if( num==4 ) me = '魚介系ラーメン';
//   else  me = '担々麺';
//   console.log( 'あなたが求めているラーメンは' + noo + 'です！' );
//   res.render( 'noo', {number:num, noo:noo} );
// });

// let win =0;
// let total = 0;
// const express = require('express');
// const app = express();

// let win = 0; // 勝利数
// let total = 0;

app.get("/noo", (req, res) => {
  let hand = req.query.hand;
  console.log( {hand, win, total});

  const num = Math.floor( Math.random() * 5 + 1 );
  let me = '普通';
  if( num==1 ) me = 'あんまり';
  else if( num==3 ) me = 'いい感じ';
  else if( num==4 ) me = 'やばい';
  else if( num==2 ) me = '最高';
  else  me = '物足りない';
 //ここに勝敗の判定を入れる
  //今はダミーで人間の勝ちにしておく
let judgement = '';
if
  ( hand==me ){
  judgement='醤油ラーメン';
}else if 
  (  hand == 'あんまり' && me == '普通' ||
  hand == 'あんまり' && me == 'やばい' ||
  hand == 'あんまり' && me == 'いい感じ' ||
  hand == 'あんまり' && me == '最高' ||
  hand == 'あんまり' && me == '物足りない' ||
  hand == 'あんまり' && me == '微妙' ){
  judgement='塩ラーメン';
}else if
(  hand == 'やばい' && me == '普通' ||
hand == 'やばい' && me == 'あんまり' ||
hand == 'やばい' && me == 'いい感じ' ||
hand == 'やばい' && me == '最高' ||
hand == 'やばい' && me == '物足りない' ||
hand == 'やばい' && me == '微妙' ){
judgement='魚介系ラーメン';
}else if 
(  hand == 'いい感じ' && me == '普通' ||
hand == 'いい感じ' && me == 'やばい' ||
hand == 'いい感じ' && me == 'いい感じ' ||
hand == 'いい感じ' && me == '最高' ||
hand == 'いい感じ' && me == '物足りない' ||
hand == 'いい感じ' && me == '微妙' ){
judgement='味噌ラーメン';
}else if 
(  hand == '最高' && me == '普通' ||
hand == '最高' && me == 'やばい' ||
hand == '最高' && me == 'いい感じ' ||
hand == '最高' && me == 'あんまり' ||
hand == '最高' && me == '物足りない' ||
hand == '最高' && me == '微妙' ){
judgement='豚骨ラーメン';
}else{
    judgement='担々麺';

}
total++;
win++;

  const display = {
    your: hand,
    me: me,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'noo', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

// const express = require('express');
// const app = express();

// let win = 0; // 勝利数
// let total = 0; // 試合数

// app.get("/noo", (req, res) => {
//   let hand = req.query.hand;
//   console.log({ hand, win, total });

//   // ランダムでCPUの手を決定
//   const num = Math.floor(Math.random() * 5 + 1);
//   let me; // CPUの手（`me`に変更されていたため）
//   switch (num) {
//     case 1:
//       me = 'あんまり';
//       break;
//     case 2:
//       me = '最高';
//       break;
//     case 3:
//       me = 'いい感じ';
//       break;
//     case 4:
//       me = 'やばい';
//       break;
//     default:
//       me = '普通';
//   }

//   // 勝敗の判定
//   let judgement = '';
//   if (hand === me) {
//     judgement = '醤油ラーメン';
//   } else if (
//     hand === 'あんまり' && ['普通', 'やばい', 'いい感じ', '最高', '物足りない', '微妙'].includes(me)
//   ) {
//     judgement = '塩ラーメン';
//   } else if (
//     hand === 'やばい' && ['普通', 'あんまり', 'いい感じ', '最高', '物足りない', '微妙'].includes(me)
//   ) {
//     judgement = '魚介系ラーメン';
//   } else if (
//     hand === 'いい感じ' && ['普通', 'やばい', 'いい感じ', '最高', '物足りない', '微妙'].includes(me)
//   ) {
//     judgement = '味噌ラーメン';
//   } else if (
//     hand === '最高' && ['普通', 'やばい', 'いい感じ', 'あんまり', '物足りない', '微妙'].includes(me)
//   ) {
//     judgement = '豚骨ラーメン';
//   } else {
//     judgement = '担々麺';
//   }

//   // 勝敗結果（ダミーで人間の勝ちとして処理）
//   total++;
//   win++; // 現在は常に人間の勝ちとしてカウント

//   // レンダリング用データ作成
//   const display = {
//     your: hand,
//     me: me,
//     judgement: judgement,
//     win: win,
//     total: total,
//   };

//   res.render('noo', display);
// });

// app.listen(8080, () => console.log("Example app listening on port 8080!"));
// const http = require('http');
// const url = require('url');

// let win = 0; // 勝利数
// let total = 0; // 試合数

// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);
  
//   // `/noo` エンドポイント以外は404
//   if (parsedUrl.pathname !== '/noo') {
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('Not Found');
//     return;
//   }

//   // クエリパラメータから `hand` を取得
//   const hand = parsedUrl.query.hand;

//   if (!hand) {
//     res.writeHead(400, { 'Content-Type': 'text/plain' });
//     res.end('Bad Request: hand parameter is required');
//     return;
//   }

//   console.log({ hand, win, total });

//   // CPU の手をランダムに決定
//   const num = Math.floor(Math.random() * 5 + 1);
//   let me;
//   switch (num) {
//     case 1:
//       me = 'あんまり';
//       break;
//     case 2:
//       me = '最高';
//       break;
//     case 3:
//       me = 'いい感じ';
//       break;
//     case 4:
//       me = 'やばい';
//       break;
//     default:
//       me = '普通';
//   }

//   // 勝敗の判定
//   let judgement = '';
//   if (hand === me) {
//     judgement = '醤油ラーメン';
//   } else if (
//     hand === 'あんまり' && ['普通', 'やばい', 'いい感じ', '最高', '物足りない', '微妙'].includes(me)
//   ) {
//     judgement = '塩ラーメン';
//   } else if (
//     hand === 'やばい' && ['普通', 'あんまり', 'いい感じ', '最高', '物足りない', '微妙'].includes(me)
//   ) {
//     judgement = '魚介系ラーメン';
//   } else if (
//     hand === 'いい感じ' && ['普通', 'やばい', 'いい感じ', '最高', '物足りない', '微妙'].includes(me)
//   ) {
//     judgement = '味噌ラーメン';
//   } else if (
//     hand === '最高' && ['普通', 'やばい', 'いい感じ', 'あんまり', '物足りない', '微妙'].includes(me)
//   ) {
//     judgement = '豚骨ラーメン';
//   } else {
//     judgement = '担々麺';
//   }

//   // 勝敗結果（ダミーで人間の勝ちとして処理）
//   total++;
//   win++; // 現在は常に人間の勝ちとしてカウント

//   // レスポンスデータ
//   const display = {
//     your: hand,
//     me: me,
//     judgement: judgement,
//     win: win,
//     total: total,
//   };

//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify(display));
// });

// server.listen(8080, () => {
//   console.log("Server listening on port 8080!");
// });
