'use strict'

const chat = document.querySelector('.chat');
const content = chat.querySelector('.messages-content');
const loading = content.querySelector('.loading')
const box = chat.querySelector('.message-box');
const input = box.querySelector('.message-input')
const submit = box.querySelector('.message-submit');
const status = chat.querySelector('.message-status');


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

    content.appendChild(message);
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

  function sendMessage(event) {
    event.preventDefault();

    const message = input.value;
    connection.send(message);
    input.value = '';

    getMessage(message)
  }


  const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

  connection.addEventListener('open', event => {
    status.textContent = status.dataset.online;
    submit.setAttribute('disabled', false);
    input.setAttribute('autofocus', true);

    const userIn = messageStatus('Пользователь появился в сети');
    content.appendChild(userIn);
  });

  connection.addEventListener('close', event => {
    status.textContent = status.dataset.offline;
    submit.setAttribute('disabled', true);
    if (status.textContent === 'Пользователь появился в сети') {
      content.removeChild(status);
    }

    const userOut = messageStatus('Пользователь не в сети');
    content.appendChild(userOut);
  });

  box.addEventListener('submit', sendMessage);



  connection.addEventListener('message', event => {
    var message = event.data;

    if (message.message === '...') {
      loading();
    } else {
      if (loading) {
        content.removeChild(loading);
      }
      content.appendChild(getMessage(message));
    }
  });

  window.addEventListener('beforeunload', event => {
    connection.close()
  });

  connection.addEventListener('error', error => {
    console.error(error.message);
  })
})