'use strict';

document.addEventListener('DOMContentLoaded', event => {
    function loadProfile(url) {
        return new Promise((done, fail) => {
            window.parseBook = done;
            const script = document.createElement('script');
            script.src = `${url}?jsonp=loadProfile`;
            document.body.appendChild(script);

        })
    }

    function loadTech(url) {
        return new Promise((done, fail) => {
            window.parseBook = done;
            const script = document.createElement('script');
            script.src = `${url}?jsonp=loadTech`;
            document.body.appendChild(script);

        })
    }

    loadProfile('https://neto-api.herokuapp.com/profile/me')
        .then(res => {
            return res.json();
        })
        .then(res => {
            loadTech(`https://neto-api.herokuapp.com/profile/${res.id}/technologies`)
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