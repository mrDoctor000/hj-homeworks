'use strict';

document.addEventListener('DOMContentLoaded', event => {
    function loadTwitter(url) {
        return new Promise((done, fail) => {
            window.parseBook = done;

            const script = document.scripts[0].cloneNode();
            script.src = `${url}?jsonp=readTwitter`
            document.body.appendChild(script);

        })
    }

    function readTwitter(content) {
        document.querySelector('[data-username]').innerHTML = `${content.username}`;
        document.querySelector('[data-description]').innerHTML = `${content.description}`;
        document.querySelector('[data-tweets]').innerHTML = `${content.tweets}`;
        document.querySelector('[data-followers]').innerHTML = `${content.followers}`;
        document.querySelector('[data-following]').innerHTML = `${content.following}`;

        document.querySelector('[data-wallpaper]').src = content.wallpaper;
        document.querySelector('[data-pic]').src = content.pic;
    }

    loadTwitter('https://neto-api.herokuapp.com/twitter/jsonp')
        .then(readTwitter);

});