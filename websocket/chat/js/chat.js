'use strict'

const chat = document.querySelector('.chat');
const content = chat.querySelector('.messages-content');

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

    const message = document.createElement('div');
    message.className = 'message loading';
    const avatar = document.createElement('figure');
    avatar.className = 'avatar';
    const span = document.createElement('span');
    const img = document.createElement('img');
    img.setAttribute('src', 'https://netology-code.github.io/hj-homeworks/websocket/chat/i/profile-80.jpg');

    message.appendChild(avatar);
    message.appendChild(span);
    avatar.appendChild(img);

    chat.querySelector('.message-content').appendChild(message);
  }

  function getMessage(data) {
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();

    const message = document.createElement('div');
    message.className = 'message';
    const avatar = document.createElement('figure');
    avatar.className = 'avatar';
    const img = document.createElement('img');
    img.setAttribute('src', 'https://netology-code.github.io/hj-homeworks/websocket/chat/i/profile-80.jpg');
    const span = document.createElement('span');
    span.className = 'message-text';
    span.textContent = data;
    const timeMes = document.createElement('div');
    timeMes.className = 'timestamp';
    timeMes.textContent = time;

    message.appendChild(avatar);
    message.appendChild(span);
    message.appendChild(timeMes);
    avatar.appendChild(img);

    return message;
  }

  function sendMessage() {
    const message = chat.querySelector('message-input').value;

    const data = {
      'message': message
    };
    connection.send(data);
    getMessage(data)
  }


  const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

  connection.addEventListener('open', event => {
    chat.querySelector('.chat-status').textContent = chat.querySelector('.chat-status').dataset.online;
    chat.querySelector('.message-submit').removeAttribute('disabled');

    const userIn = messageStatus('Пользователь появился в сети');
    content.appendChild(userIn);
  });

  chat.querySelector('.message-submit').addEventListener('submit', sendMessage);


  connection.addEventListener('message', event => {
    var message = event.data;

    if (message.message === '...') {
      loading();
    } else {
      if(content.querySelector('.loading')) {
        content.removeChild(content.querySelector('.loading'));
      }
      content.appendChild(getMessage(message));
    }
  });

  window.addEventListener('beforeunload', event => {
    connection.addEventListener('close', event => {
      chat.querySelector('.chat-status').textContent = chat.querySelector('.chat-status').dataset.offline;
      chat.querySelector('.message-submit').setAttribute('disabled', );

      const userOut = messageStatus('Пользователь не в сети');
      content.appendChild(userOut);
    });
    connection.close()
  });

  connection.addEventListener('error', error => {
    console.error(error.message);
  })

})