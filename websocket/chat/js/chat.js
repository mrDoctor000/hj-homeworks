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

    const message = document.createElement('div');
    message.className = 'message loading';
    const avatar = document.createElement('figure');
    avatar.className = 'avatar';
    const span = document.createElement('span');
    const img = document.createElement('img');
    img.setAttribute('src', './i/profile-80.jpg');

    message.appendChild(avatar);
    message.appendChild(span);
    avatar.appendChild(img);

    chat.querySelector('.message-content').appendChild(message);
  }

  function deletoLoad() {
    chat.querySelector('.message-content').removeChild(chat.querySelector('.loading'));
  }

  function getMessage(data) {
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();

    const message = document.createElement('div');
    message.className = 'message';
    const avatar = document.createElement('figure');
    avatar.className = 'avatar';
    const img = document.createElement('img');
    img.setAttribute('src', './i/profile-80.jpg');
    const span = document.createElement('span');
    span.className = 'message-text';
    span.textContent = data.message;
    const time = document.activeElement.createElement('div');
    time.className = 'timestamp';
    time.textContent = time;

    message.appendChild(avatar);
    message.appendChild(span);
    message.appendChild(time);
    avatar.appendChild(img);
  }

  function sendMessage() {
    const message = chat.querySelector('message-input').value;

    const data = {
      'message': message
    };
    connection.send(JSON.stringify());
    getMessage(data)
  }


  const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

  connection.addEventListener('open', event => {
    chat.querySelector('.chat-status').textContent = chat.querySelector('.chat-status').dataset.online;
    chat.querySelector('.message-submit').removeAttribute('disabled');

    const userIn = messageStatus('Пользователь появился в сети');
    chat.querySelector('.messages-content').appendChild(userIn);
  });

  chat.querySelector('.message-submit').addEventListener('click', sendMessage);
  chat.querySelector('.message-input').addEventListener('keydown', event => {
    if (event.keyCode === 13) {
      sendMessage(event);
    }
  })

  connection.addEventListener('message', event => {
    var message = JSON.parse(event.data);
    if (message.message === '...') {
      loading();
    } else {
      deletoLoad();

      chat.querySelector('.message-content').appendChild(message(message));
    }
  });

  window.addEventListener('beforeunload', event => {
    connection.addEventListener('close', event => {
      chat.querySelector('.chat-status').textContent = chat.querySelector('.chat-status').dataset.offline;
      chat.querySelector('.message-submit').setAttribute('disabled', );

      const userOut = messageStatus('Пользователь не в сети');
      chat.querySelector('.messages-content').appendChild(userOut);
    });
    connection.close()
  });

  connection.addEventListener('error', error => {
    console.error(error.message);
  })

})