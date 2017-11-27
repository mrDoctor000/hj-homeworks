'use strict';

document.addEventListener('DOMContentLoaded', event => {

    fetch('https://neto-api.herokuapp.com/twitter/jsonp')
    .then(res => {
        console.log(res.headers.get('Content-Type'));
        console.log(res.status);

        return res.json();
    })
    .then(content => {
        document.querySelector('[data-username]').innerHTML = `${content.username}`;
        document.querySelector('[data-description]').innerHTML = `${content.description}`;
        document.querySelector('[data-tweets]').innerHTML = `${content.tweets}`;
        document.querySelector('[data-followers]').innerHTML = `${content.followers}`;
        document.querySelector('[data-following]').innerHTML = `${content.following}`;

        document.querySelector('[data-wallpaper]').src = content.wallpaper;
        document.querySelector('[data-pic]').src = content.pic;
    })

})

