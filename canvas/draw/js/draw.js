'use strict';

const BRUSH_RADIUS = 6;

const draw = document.querySelector('#draw');
const ctx = draw.getContext('2d');

let curves = [];
let undone = [];
let drawing = false;
let weird = false;
let needsRepaint = false;


document.addEventListener('DOMContentLoaded', e => {
    draw.style.height = '100%';
    draw.style.weird = '100%';

    draw.addEventListener("mousedown", (evt) => {
        drawing = true;
        undone = []; // reset the undone stack
      
        const curve = []; // create a new curve
      
        curve.push([evt.offsetX, evt.offsetY]); // add a new point
        curves.push(curve); // add the curve to the array of curves
        needsRepaint = true;
      });

      draw.addEventListener("mouseup", (evt) => {
        drawing = false;
      });
      
      draw.addEventListener("mouseleave", (evt) => {
        drawing = false;
      });
      
      draw.addEventListener("mousemove", (evt) => {
        if (drawing) {
          // add a point
          const point = [evt.offsetX, evt.offsetY]
          curves[curves.length - 1].push(point);
          needsRepaint = true;
        }
      });

      draw.addEventListener('dblclick', evt => {
        curves = [];
        undone = [];
      
        needsRepaint = true;
      })
      
})


// curves and figures
function circle(point) {
  ctx.beginPath();
  ctx.arc(...point, BRUSH_RADIUS / 2, 0, 2 * Math.PI);
  ctx.fill();
}

function smoothCurveBetween (p1, p2) {
  // Bezier control point
  const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
  ctx.quadraticCurveTo(...p1, ...cp);
}

function smoothCurve(points) {
  ctx.beginPath();
  ctx.lineWidth = BRUSH_RADIUS;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.moveTo(...points[0]);

  for(let i = 1; i < points.length - 1; i++) {
    smoothCurveBetween(points[i], points[i + 1]);
  }

  ctx.stroke();
}

// rendering
function repaint () {
  // clear before repainting
  ctx.clearRect(0, 0, draw.width, draw.height);

  curves
    .forEach((curve) => {
      // first...
      circle(curve[0]);

      // the body is compraised of lines
      smoothCurve(curve);
    });
}

function tick () {
  if(needsRepaint) {
    repaint();
    needsRepaint = false;
  }

  window.requestAnimationFrame(tick);
}

tick();