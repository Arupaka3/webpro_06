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

app.listen(8080, () => console.log("Example app listening on port 8080!"));
