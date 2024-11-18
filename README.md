# report06

## １．じゃんけん機能について

### 実装手順

1. `app5.js` を起動する
1. Web ブラウザで `localhost:8080/public/janken.html` にアクセスする
1. 自分の手を入力する

### このプログラムについて

```mermaid
flowchart TD;

start["開始"];
node1[グーチョキパーのどれかを入力]
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]
draw["あいこ"]

start --> node1 --> if
if -->|yes| win
win --> end1
if -->|yes|draw["あいこ"]
draw --> end1
if -->|no| loose
loose --> end1
```

### ファイル一覧

| ファイル名         | 説明                             |
| ------------------ | -------------------------------- |
| app5.js            | プログラム本体                   |
| public/janken.html | じゃんけんの開始画面             |
| janken.ejs         | じゃんけんのテンプレートファイル |

10/29

## ２．ガチャガチャ機能について

### 実装手順

1. `app5.js` を起動する
1. Web ブラウザで `localhost:8080/public/ga.html` にアクセスする
1. 指定された文字を入力する

### このプログラムについて

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
node1[△, ○, □, ☓のどれかを選ぶ]
if{"条件に合うか"}
win["星四までのモンスターを排出"]
loose["ミラボレアスを排出"]

start --> node1 --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```

### ファイル一覧

| ファイル名     | 説明                               |
| -------------- | ---------------------------------- |
| app5.js        | プログラム本体                     |
| public/ga.html | ガチャガチャの開始画面             |
| ga.ejs         | ガチャガチャのテンプレートファイル |

11/18

## 2．ppap 機能について

### 実装手順

1. `app5.js` を起動する
1. Web ブラウザで `localhost:8080/public/ppap.html` にアクセスする
1. 指定された文字を入力する

### このプログラムについて

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
node1[pen, Pineapple, appleのどれかを入力]
if{"条件に合うか"}
win["入力した言葉をつなげるpen-pineapple-Apple-penがでる"]
loose["Apple-pen-Pineapple-penと出る"]

start --> node1 --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```

### ファイル一覧

| ファイル名       | 説明                        |
| ---------------- | --------------------------- |
| app5.js          | プログラム本体              |
| public/ppap.html | ppap の開始画面             |
| ppap.ejs         | ppap のテンプレートファイル |

11/18
