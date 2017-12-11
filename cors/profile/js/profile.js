'use strict';

document.addEventListener('DOMContentLoaded', event => {
  function randName() {
    var result = '';
    var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    var max_position = words.length - 1;
    for (var i = 0; i < 5; ++i) {
      var position = Math.floor(Math.random() * max_position);
      result = result + words.substring(position, position + 1);
    }
    return result;
  }

  function loadProfile(url) {
    const funcName = randName();
    return new Promise((done, fail) => {
      window[funcName] = done;

      const script = document.scripts[0].cloneNode();
      script.src = `${url}?jsonp=${funcName}`;
      document.body.appendChild(script);
    })
  }

  loadProfile('https://neto-api.herokuapp.com/profile/me')
    .then(res => {
      return res.json();
    })
    .then(res => {
      loadProfile(`https://neto-api.herokuapp.com/profile/${res.id}/technologies`)
        .then(tech => {
          return tech.json();
        })
        .then(tech => {
          res.technologies = tech;
        });

      return res;
    })
    .then(user => {
      document.querySelector('[data-name]').textContent = user.name;
      document.querySelector('[data-description]').textContent = user.description;
      document.querySelector('[data-pic]').setAttribute('src', user.pic);
      document.querySelector('[data-position]').textContent = user.position;
      user.tech.forEach(el => {
        const span = document.createElement('span');
        span.className = `devicons devicons-${el}`;
        document.querySelector('[data-technologies]').appendChild(span);
      });
    })
    .then(() => {
      document.querySelector('.content').style.display = 'initial';
    })
    .catch(err => {
      console.error(err);
    });

});