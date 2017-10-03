const ajax = new XMLHttpRequest();

const createForm = document.querySelector('#create-form');
const createState = document.querySelector('.create-state');
const alertState = document.querySelector('#alertState');

createForm.addEventListener('submit', function (e) { // no arrow function because i need this (not lexical)
  e.preventDefault();
  let encodedText = '';
  Array.from(this.elements).forEach(elem => {
    if (elem.attributes[0].nodeValue !== 'submit')
      encodedText += `${elem.name}=${elem.value}&`;
  });
  ajax.open('POST', '/add');
  ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  alertState.style.visibility = 'visible';
  ajax.onload = function () {
    if (this.status == 200) {
      createState.textContent = this.responseText;
      setTimeout(() => {location.href='/'; }, 1000);
    } else {
      createState.textContent = `Error ${this.status} ${this.statusText}`;
      alertState.classList.remove('alert-success');
      alertState.classList.add('alert-danger');
    }
  }
 ajax.send(encodedText);

});

const changeStatus = document.querySelectorAll('.changeStatus');

Array.from(changeStatus).forEach(elem => {
  elem.addEventListener('click', e => {
    e.preventDefault();
    ajax.open('PUT', `/status/${e.target.dataset.id}`);
    ajax.send();
    setTimeout(() => {location.href='/'; }, 500);
  });
});

const deleteTask = document.querySelectorAll('.deleteBtn');

Array.from(deleteTask).forEach(elem => {
  elem.addEventListener('click', e => {
    e.preventDefault();
    ajax.open('DELETE', `/delete/${e.target.dataset.id}`);
    ajax.send();
    setTimeout(() => {location.href='/'; }, 500);
  })
});
