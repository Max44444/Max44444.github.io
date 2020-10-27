window.addEventListener('load', function() {
  'use strict';

  function taskOne() {
    let three = document.querySelector('.three'),
        six = document.querySelector('.six');
    [three.innerHTML, six.innerHTML] = [six.innerHTML, three.innerHTML];
  }
  taskOne();

  function taskTwo() {
    let a = 2, b = 5;
    
    document.querySelector('.five')
    .getElementsByTagName('p')[0].innerHTML += 
    `<br/><br/><b/> square of trapezoid is : ${(a + b) / 2}`;
  }
  taskTwo();

  function createForm(labelText, inputType, inputNumber, isButton) {
    let form = document.createElement("form"),
        label = document.createElement('label'),
        inputs = [];
    
    form.setAttribute('action', '#');
    form.classList.add('five-form');

    label.setAttribute('for', 'inputTag');
    label.textContent = labelText;
    form.appendChild(label);
    
    for (let i = 0; i < inputNumber; ++i) {
      let input = document.createElement('input');

      input.setAttribute('name', 'inputTag');
      input.setAttribute('type', inputType);
      input.setAttribute('required', '');

      inputs.push(input);
      form.appendChild(input);
    }

    if(isButton){
      let button = document.createElement('button');
      button.textContent = 'Calculate';
      form.appendChild(button);
    }

    return {form, inputs};
  }

  function taskThree() {
    return new Promise(function (resolve, reject) {
      if (!sessionStorage.getItem('confirmCookieStatus')) {
        if(document.cookie.match(/divisors=+;{0,1}/)){
          resolve();
        } else {
          reject();
        }
      }
      taskFour();
    });
  }

  function findDivisors(n) {
    let divisors = [];
    for (let i = 1; i <= n; ++i) {
      if (n % i == 0) {
        divisors.push(i);
      }
    }
    return divisors;
  }

  taskThree()
    .then(confirmCookie)
    .catch(initForm);

  function deleteCookie (cookieName) {
    var cookieDate = new Date ();
    cookieDate.setTime (cookieDate.getTime() - 1);
    document.cookie = cookieName += "=; expires=" + cookieDate.toGMTString();
  }

  function confirmCookie() {
    if (confirm(`Your cookie :\n\n${document.cookie}\n\nSave cookie?`)) {
      alert('Cookie was safed. Please reload the page');
      sessionStorage.setItem('confirmCookieStatus', 'true');
    } else {
      deleteCookie('divisors');
      window.location.reload();
    }
  }

  function initForm() {
    let {form, inputs} = createForm('Enter a number: ', 'number', 1, true);

    document.querySelector('.five').appendChild(form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let divisors = findDivisors(inputs[0].value);
      inputs[0].value = '';

      alert(divisors);
      document.cookie = `divisors=${divisors}`;
    });
  }

  function taskFour() {
    let four = document.querySelector('.four'),
        fourContent = four.getElementsByTagName('p')[0];

    let {form, inputs} = createForm('Transform to upper case Yes/No: ', 'radio', 2, false);

    four.appendChild(form);

    inputs[0].addEventListener('click', ()=>{
      fourContent.textContent = toUpperCaseFirstLetters(fourContent.textContent);
      localStorage.setItem('isUpperCaseInForthBlock', 'true');
    });

    inputs[1].addEventListener('click', ()=>{
      fourContent.textContent = toLowerCaseFirstLetters(fourContent.textContent);
      localStorage.setItem('isUpperCaseInForthBlock', 'false');
    });

    taskFive(inputs[0]);
    taskFive(inputs[1]);

    if (localStorage.getItem('isUpperCaseInForthBlock') == 'true') {
      inputs[0].dispatchEvent(new Event('click'));
      inputs[0].checked = true;
    } else {
      inputs[1].dispatchEvent(new Event('click'));
      inputs[1].checked = true;
    }

    taskSix();
  }

  function toUpperCaseFirstLetters(str) {
    return str.split(' ').map((i) => {
      return i ? i[0].toUpperCase() + i.slice(1) : '';
    }).join(' ');
  }

  function toLowerCaseFirstLetters(str) {
    return str.split(' ').map((i) => {
      return i ? i[0].toLowerCase() + i.slice(1) : '';
    }).join(' ');
  }

  function taskFive(obj) {
    obj.addEventListener('change', () => {
      alert('task five');
    });
  }

  function createTextArea(container) {
    let textArea = document.createElement('textarea');

    textArea.classList.add('transform-area');

    textArea.textContent = container.innerHTML;

    textArea.addEventListener('input', function () {
      localStorage.setItem('block' + container.id, this.value);
    });

    container.appendChild(textArea);
  }

  function loadChanges(container) {
    let content = localStorage.getItem('block' + container.id);

    if (content) {
      let backup = container.innerHTML;
      container.innerHTML = content;

      let button = document.createElement('button');
      button.textContent = 'submit';
      button.classList.add('submit-button');

      button.addEventListener('click', function () {
        container.innerHTML = backup;
        this.style.display = 'none';
        localStorage.removeItem('block' + container.id);
        createTextArea(container);
      });

      container.appendChild(button);
    }
  }

  function taskSix() {
    let blocks = [document.querySelector('.white_title'),
        document.querySelector('.two'),
        document.querySelector('.three'),
        document.querySelector('.four'),
        document.querySelector('.five'),
        document.querySelector('.six')];

    blocks.forEach((i) => {
      if (localStorage.getItem('block' + i.id)) {
        loadChanges(i);
      } else {
        createTextArea(i);
      }
    });
  }
});