"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const params = {
        method: "POST",
        body: 'name=' + name + '&message=' + message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            console.log( response );
            document.querySelector('#message').value = "";
        });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            let value = response.number;
            console.log( value );
            
            console.log( number );
            if (number != value) {
                const params = {
                    method: "POST",
                    body: 'start=' + number,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
                const url = "/read";
                fetch( url, params )
                .then( (response) => {
                        if (!response.ok) {
                            throw new Error('Error');
                        }
                        return response.json();
                    })
                    .then((response) => {
                        number += response.messages.length;
                        for (let mes of response.messages) {
                            console.log( mes ); 
                            
                            let cover = document.createElement('div');
                            cover.className = 'cover';

                            let time_area = document.createElement('span');
                            time_area.className = 'time';
                            time_area.innerText = `[${mes.timestamp}]`;
                            
                            let name_area = document.createElement('span');
                            name_area.className = 'name';
                            name_area.innerText = mes.name;
                            
                            let mes_area = document.createElement('span');
                            mes_area.className = 'mes';
                            mes_area.innerText = mes.message;
                            
                            let reply_button = document.createElement('button');
                            reply_button.className = 'reply';
                            reply_button.innerText = '返信';
                            reply_button.addEventListener('click', () => showReplyInput(mes.id));

                            cover.appendChild(time_area);
                            cover.appendChild(name_area);
                            cover.appendChild(mes_area);
                            cover.appendChild(reply_button); 
                            bbs.appendChild(cover);
                        }
                    })
            }
        });
});
function showReplyInput(parentId) {
    let oldInput = document.querySelector('#reply-container');
    if (oldInput) {
        oldInput.remove();
    }

    let replyContainer = document.createElement('div');
    replyContainer.id = 'reply-container';

    let replyInput = document.createElement('input');
    replyInput.type = 'text';
    replyInput.placeholder = '返信を入力';
    replyInput.id = 'reply-message';

    let replySubmit = document.createElement('button');
    replySubmit.innerText = '送信';
    replySubmit.addEventListener('click', () => sendReply(parentId));

    replyContainer.appendChild(replyInput);
    replyContainer.appendChild(replySubmit);

    bbs.appendChild(replyContainer);
}

// 返信を送信
function sendReply(parentId) {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#reply-message').value;
    
    if (!message) return; // 空メッセージを防ぐ
    const params = {
        method: "POST",
        body: 'name=' + name + '&message=' + message + '&parentId=' + parentId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    
    fetch("/post", params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            document.querySelector('#reply-container').remove(); // 返信フォームを削除
        });
}

setInterval(() => {
    document.querySelector('#check').click();
}, 1000);


