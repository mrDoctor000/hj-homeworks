'use strict';

document.addEventListener('DOMContentLoaded', event => {
    fetch('https://neto-api.herokuapp.com/profile/me')
        .then(res => {
            console.log(res.headers.get('Content-Type'));
            console.log(res.status);

            return res.json();
        })
        .then(userId => {
            fetch(`https://neto-api.herokuapp.com/profile/${user.id}/technologies`)
                .then(res => {
                    console.log(res.headers.get('Content-Type'));
                    console.log(res.status);

                    return res.json();
                })
                .then(tech => {
                    var user = {
                        'name': userId.name,
                        'description': userId.description,
                        'pic': userId.pic,
                        'position': userId.position,
                        'tech': tech
                    }
                })
            return user;
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
})