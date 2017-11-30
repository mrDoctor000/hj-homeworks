'use strict';

document.addEventListener('DOMContentLoaded', event => {
    function starField() {
        this.num = function () {
            var num = Math.round(199.5 + Math.random() * (201));
            return num;
        },
            this.backgr = 'black';
        Object.defineProperty(this, 'size', {
            get: function () {
                var size = Math.random() * 1.1;
                return size;
            }
        });
        Object.defineProperty(this, 'color', {
            get: function () {
                var colors = ['#ffffff', '#ffe9c4', '#d4fbff'];
                var color = Math.floor(Math.random() * 3);
                return colors[color];
            }
        });
        Object.defineProperty(this, 'intensity', {
            get: function () {
                var intensity = 0.8 + (Math.random() * 0.2);
                return intensity;
            }
        });
        Object.defineProperty(this, 'coord', {
            get: function () {
                var coord = [Math.floor(Math.random() * 801), Math.floor(Math.random() * 401)]
                return coord
            }
        });
    }
    function generateStar() {

        const stars = new starField();

        for (var i = 0; i < stars.num; i++) {
            ctx.beginPath();
            ctx.arc(...stars.coord, stars.size / 2, 0, 2 * Math.PI);
            ctx.fill(star.color);
            ctx.globalAlpha(star.intensity);
        }
    }

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d');

    canvas.addEventListener(click, generateStar);
    generateStar();
})