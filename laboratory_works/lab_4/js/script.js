window.addEventListener('load', function() {
  'use strict';
  let numBlocks = [
      document.getElementById('one'),
      document.getElementById('two'),
      document.getElementById('three'),
      document.getElementById('four'),
      document.getElementById('five'),
      document.getElementById('six'),
      document.getElementById('seven')
    ];


  function createForm(labelText, inputType, inputNumber, isButton, buttonName='calculate') {
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
      button.textContent = buttonName;
      form.appendChild(button);
    }

    return {form, inputs};
  }
  

  function taskFourLabThree() {
    let fourContent = numBlocks[3].getElementsByTagName('p')[0];

    let {form, inputs} = createForm('Transform to upper case Yes/No: ', 'radio', 2, false);

    numBlocks[3].appendChild(form);

    inputs[0].addEventListener('click', ()=>{
      fourContent.textContent = toUpperCaseFirstLetters(fourContent.textContent);
      localStorage.setItem('isUpperCaseInForthBlock', 'true');
    });

    inputs[1].addEventListener('click', ()=>{
      fourContent.textContent = toLowerCaseFirstLetters(fourContent.textContent);
      localStorage.setItem('isUpperCaseInForthBlock', 'false');
    });

    taskFiveLabThree(inputs[0]);
    taskFiveLabThree(inputs[1]);

    if (localStorage.getItem('isUpperCaseInForthBlock') == 'true') {
      inputs[0].dispatchEvent(new Event('click'));
      inputs[0].checked = true;
    } else {
      inputs[1].dispatchEvent(new Event('click'));
      inputs[1].checked = true;
    }
    taskThree();
    taskFive();
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
  
  function taskFiveLabThree(obj) {
    obj.addEventListener('change', () => {
      alert('task five');
      setTimeout(() => {
        document.querySelectorAll('.blue_row')[0].style.paddingLeft = 0;
        document.querySelectorAll('.blue_row')[1].style.paddingLeft = 0;
      }, 5000);
    });
  }

  function taskOne() {
    let delay = 100,
    swapContent = (index) => {
      [numBlocks[index].innerHTML, numBlocks[(index+1)%7].innerHTML] = 
      [numBlocks[(index+1)%7].innerHTML, numBlocks[index].innerHTML];
      if (index < 5) {
        delay += 100;
        setTimeout(swapContent, delay, ++index);
      } else {
        taskFourLabThree();
      }
    };

    setTimeout(swapContent, delay, 0);
  }
  taskOne();

  function taskTwo() {
    setInterval(()=>{
      if (numBlocks[4].style.fontStyle == 'italic') {
        numBlocks[4].style.fontStyle = '';
      } else {
        numBlocks[4].style.fontStyle = 'italic';
      }
    }, 5000);
  }
  taskTwo();

  function taskThree() {
    let {form, inputs} = createForm('enter account name', 'text', 2, true, 'get commits');
    numBlocks[4].appendChild(form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let url = "https://api.github.com/repos/"+inputs[0].value+"/"+inputs[1].value+"/commits";
      
      
      fetch(url)
            .then(response => {
              if (!response.ok) {
                let e = document.getElementById('error'),
                    button = document.createElement('button');
                button.textContent = 'close';
                button.classList.add('close');

                button.addEventListener('click', () => {
                  e.style.display = 'none';
                });
                e.textContent = response.status+"("+response.statusText+")";
                e.appendChild(button);

                e.style.display = 'flex';
                throw new Error(response.message);
              }
              return response.json();
            })
            .then(contents => {
              console.log(contents);
              let msg = '';
              contents.forEach(i => {
                msg += `${i.commit.author.name} : ${i.commit.message}\n`;
              });
              alert(msg);
            })
            .catch((e) => {});

      inputs[0].value = '';
      inputs[1].value = '';
    });
  }

  function y(callback){
    console.log("first func");
    callback();
  }

  function z(){
    console.log('second func');
  }

  function x(callback1, callback2){
    console.log("start task four");
    callback1(callback2);
  }

  function taskFour(callback1, callback2, callback3){
    callback1(callback2, callback3);
  }

  taskFour(x, y, z);

  function quickSort(origArray) {
	if (origArray.length <= 1) { 
		return origArray;
	} else {

		let left = [],
        right = [],
        newArray = [],
		    pivot = origArray.pop(),
		    length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] <= pivot) {
				left.push(origArray[i]);
			} else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(quickSort(left), pivot, quickSort(right));
	}
}

  function taskFive() {
    let {form, inputs} = createForm('enter numbers', 'text', 1, true);

    numBlocks[4].appendChild(form);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let arr = Array.from(inputs[0].value.matchAll(/-?\d+\.?\d*/g)).map(i=>+i);
      alert(quickSort(arr));
      inputs[0].value = '';
    });
  }

});