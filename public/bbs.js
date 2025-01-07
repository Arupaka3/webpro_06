"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');
const updateInterval = 5000; // リアルタイム更新間隔（ミリ秒）

document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: 'name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/post";
    fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(response => {
            console.log(response);
            document.querySelector('#message').value = "";
        });
});

document.querySelector('#check').addEventListener('click', updateMessages);



function updateMessages() {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(response => {
            let value = response.number;
            if (number !== value) {
                const params = {
                    method: "POST",
                    body: 'start=' + number,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const url = "/read";
                fetch(url, params)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error');
                        }
                        return response.json();
                    })
                    .then(response => {
                        number += response.messages.length;
                        for (let mes of response.messages) {
                            createPostElement(mes);
                        }
                    });
            }
        });
}
function rateMessage(id, type) {
    const params = {
        method: "POST",
        body: 'id=' + encodeURIComponent(id) + '&type=' + encodeURIComponent(type),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/rate";
    fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(response => {
            if (response.success) {
                alert('評価を送信しました');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('評価送信に失敗しました');
        });
}


function createPostElement(mes) {
    let cover = document.createElement('div');
    cover.className = 'cover';

    let nameArea = document.createElement('span');
    nameArea.className = 'name';
    nameArea.innerText = mes.name;

    let mesArea = document.createElement('span');
    mesArea.className = 'mes';
    mesArea.innerText = mes.message;

    let ratingArea = document.createElement('span');
    ratingArea.className = 'rating';
    ratingArea.innerText = `👍 ${mes.highRating} / 👎 ${mes.lowRating}`;

    let highRatingButton = document.createElement('button');
    highRatingButton.className = 'high-rating';
    highRatingButton.innerText = '👍';
   
    
    let lowRatingButton = document.createElement('button');
    lowRatingButton.className = 'low-rating';
    lowRatingButton.innerText = '👎';

    let deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerText = '削除';
    deleteButton.addEventListener('click', () => deletePost(mes.id));

    cover.appendChild(nameArea);
    cover.appendChild(mesArea);
    cover.appendChild(ratingArea);
    cover.appendChild(highRatingButton);
    cover.appendChild(lowRatingButton);
    cover.appendChild(deleteButton);

    bbs.appendChild(cover);
}

function deletePost(id) {
    const params = {
        method: "POST",
        body: 'id=' + encodeURIComponent(id),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/delete";
    fetch(url, params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(response => {
            if (response.success) {
                alert('削除しました');
                updateMessages(); // 更新して削除を反映
            }
        });
}

// リアルタイム更新機能
setInterval(updateMessages, updateInterval);




