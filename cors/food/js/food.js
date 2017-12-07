'use strict';

'use strict';

document.addEventListener('DOMContentLoaded', event => {
    function loadFood(url) {
        return new Promise((done, fail) => {
            window.parseBook = done;
            const script = document.createElement('script');
            script.src = `${url}?jsonp=loadFood`;
            document.body.appendChild(script);

        })
    }

    function loadRating(url) {
        return new Promise((done, fail) => {
            window.parseBook = done;
            const script = document.createElement('script');
            script.src = `${url}?loadRating`;
            document.body.appendChild(script);

        })
    }

    function loadConsumers(url) {
        return new Promise((done, fail) => {
            window.parseBook = done;
            const script = document.createElement('script');
            script.src = `${url}?jsonp=loadConsumers`;
            document.body.appendChild(script);

        })
    }

    loadFood('https://neto-api.herokuapp.com/food/42')
        .then(res => {
            return res.json();
        })
        .then(res => {
            fetch('https://neto-api.herokuapp.com/food/42/rating')
                .then(rat => {
                    console.log(rat.headers.get('Content-Type'));
                    console.log(rat.status);

                    return rat.json();
                })
                .then(rat => {
                    res.rating = rat;
                })

            return res;
        })
        .then(res => {
            fetch('https://neto-api.herokuapp.com/food/42/consumers')
                .then(users => {
                    console.log(users.headers.get('Content-Type'));
                    console.log(users.status);

                    return users.json();
                })
                .then(users => {
                    res.users = users;
                })
            return res;
        })
        .then(res => {
            document.querySelector('[data-pic]').style.backgroundImage = `url(${res.pic})`;
            document.querySelector('[data-title]').textContent = res.title;
            res.ingredients.forEach((el, i) => {
                if (i === (res.ingredients.length - 1)) {
                    document.querySelector('[data-ingredients]').textContent += `${el}.`;
                } else {
                    document.querySelector('[data-ingredients]').textContent += `${el}, `;
                }
            });
            document.querySelector('[data-rating]').textContent = res.rating.rating.toFixed(2);
            document.querySelector('[data-star]').width = `${res.rating * 10}%`;
            document.querySelector('[data-votes]').textContent = `(${res.rating.votes} оценок)`;
            res.users.list.forEach((el, i) => {
                const img = document.createElement('img');
                img.src = el.pic;
                img.title = el.name;
                document.querySelector('[data-consumers]').appendChild(img);
                if(i === (res.users.list.length - 1)) {
                    const span = document.createElement('span');
                    span.textContent = `(+${res.users.total})`;
                    document.querySelector('[data-consumers]').appendChild(span);
                }
            })
        })

});