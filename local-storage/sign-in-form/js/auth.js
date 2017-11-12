'use strict';

document.addEventListener('DOMContentLoaded', event => {
  const xhr = new XMLHttpRequest();
  
  const signIn = document.querySelector('.sign-in-htm');
  const signUp = document.querySelector('.sign-up-htm');

  signIn.querySelector('.button').addEventListener('click', event => {
    xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhr.setRequestHeader('Content-Type', 'application/json');


    xhr.send();

    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        alert(xhr.responseText);
    }
  });

  signUp.querySelector('.button').addEventListener('click', event => {
    xhr.open('POST', ' https://neto-api.herokuapp.com/signup');
    xhr.setRequestHeader('Content-Type', 'application/json');
    
        
    xhr.send();

    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        alert(xhr.responseText);
    }
  });
  
})