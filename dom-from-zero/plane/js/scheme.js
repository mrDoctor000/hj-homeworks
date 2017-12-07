'use strict'

document.addEventListener('DOMContentLoaded', (event) => {
  const btnSetFull = document.querySelector('#btnSetFull');
  const btnSetEmpty = document.querySelector('#btnSetEmpty');
  const btnSeatMap = document.querySelector('#btnSeatMap');
  const acSelect = document.querySelector('#acSelect')

  btnSetFull.disabled = true;
  btnSetEmpty.disabled = true;

  btnSeatMap.addEventListener('click', e => {

    fetch(`https://neto-api.herokuapp.com/plane/${acSelect.value}`)
      .then(response => {
        return response.json();
      })
      .then(plane => {
        btnSetFull.disabled = false;
        btnSetEmpty.disabled = false;

        document.querySelector('#seatMapTitle').textContent = `${plane.title} (${plane.passengers} пассажиров)`;
        console.log(plane.scheme)
      })
    e.preventDefault();
  })

  function setSeatingRow(plane) {
    for (i = 0; i < plane.scheme.length; i++) {

    }
  }

})