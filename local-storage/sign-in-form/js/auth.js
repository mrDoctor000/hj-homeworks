'use strict';

document.addEventListener('DOMContentLoaded', event => {
  const xhr = new XMLHttpRequest();

  const signIn = document.querySelector('.sign-in-htm');
  const signUp = document.querySelector('.sign-up-htm');

  signIn.querySelector('.button').addEventListener('click', event => {
    xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhr.setRequestHeader('Content-Type', 'application/json');

    var user = {
      'email': signIn.querySelector('#email').value,
      'password': sihnIn.querySelector('#pass').value
    };

    xhr.send(JSON.stringify(user));

    xhr.addEventListener('load', event => {
      var data = JSON.parse(xhr.responseText);

      var mess = signIn.querySelector('.error-message')
      if (data.error) {
        return mess.textContent = data.message;
      } else {
        return mess.textContent = `Пользователь ${data.name} успешно авторизован`;
      }
    })


  });

  signUp.querySelector('.button').addEventListener('click', event => {
    xhr.open('POST', ' https://neto-api.herokuapp.com/signup');
    xhr.setRequestHeader('Content-Type', 'application/json');

    if (signUp.querySelector('[name="password"]').value === signUp.querySelector('[name="passwordcopy"]')) {
      var user = {
        'email': signUp.querySelector('#email').value,
        'password': signUp.querySelector('#pass').value,
        'name': signUp.querySelector('[name="name"]').value
      };
    } else {
      return mess.textContent = 'Пароль не совпадает';
    }

    xhr.send(JSON.stringify(user));

    xhr.addEventListener('load', event => {
      var data = JSON.parse(xhr.responseText);

      var mess = signIn.querySelector('.error-message')
      if (data.error) {
        mess.textContent = data.message;
      } else {
        mess.textContent = `Пользователь ${data.name} успешно зарегистрирован`;
      }
    })

  });

})