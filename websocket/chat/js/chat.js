'use strict'

const chat = document.querySelector('.chat');

document.addEventListener('DOMContentLoaded', event => {

    function messageStatus(event) {
        const message = document.createElement('div');
        message.className = 'message message-status';
        const span = document.createElement('span');
        span.className = 'message-text';
        span.textContent = event;
        message.appendChild(span);
        return message;
    }

    function loading() {
        <div class="message loading">
        <figure class="avatar"><img src="./i/profile-80.jpg" /></figure>
        <span></span>
      </div>

      const message = document.createElement('div');
      message.className = 'message loading';
      const avatar = document.createElement()
    }
    

    const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

    connection.addEventListener('open', event => {
        chat.querySelector('.chat-status').textContent = chat.querySelector('.chat-status').dataset.online;
        chat.querySelector('.message-submit').removeAttribute('disabled');

        const userIn = messageStatus('Пользователь появился в сети');
        chat.querySelector('messages-content').appendChild(userIn);
    });

    connection.addEventListener('message', event => {
        var message = JSON.parse(event.data);
        if(message.message === '...') {

        }
    })

    window.addEventListener('beforeunload', event => {
        connection.addEventListener('close', event => {
            if (event.wasClean) {
                alert('Соединение закрыто чисто');
              } else {
                alert('Обрыв соединения'); // например, "убит" процесс сервера
              }
              alert('Код: ' + event.code + ' причина: ' + event.reason);

        });
        connection.close()
    });

    connection.addEventListener('error', error => {
        console.error(error.message);
    })

})