document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  const blockFive = document.getElementById('five');
  const play = document.getElementById('play');


  class Animation {
    constructor (wrapper, speed, isCanvas) {
      this.space      = document.createElement('div');
      this.anim       = document.createElement(`${isCanvas ? 'canvas': 'div'}`);
      this.controls   = document.createElement('div');
      this.square     = document.createElement('div');
      this.textMsg    = document.createElement('div');
      this.close      = document.createElement('button');
      this.controlBtn = document.createElement('button');
      this.coord      = { x: 0, y: 0 };
      this.speed      = speed;
      this.angle      = 0;
      this.isAnimate  = false;
      this.interval   = undefined;
      this.isCanvas = isCanvas;

      this.space.classList       += 'work-space';
      this.anim.classList        += 'anim';
      this.controls.classList    += 'controls';
      this.textMsg.classList     += 'text-msg';
      this.close.textContent      = 'close';
      this.controlBtn.textContent = 'start';
      this.square.classList      += 'square';

      if (!isCanvas) {
        this.anim.appendChild(this.square);
      } else {
        this.canvas = this.anim.getContext('2d');
      }

      this.controls.appendChild(this.close);
      this.controls.appendChild(this.controlBtn);
      this.controls.appendChild(this.textMsg);
      this.space.appendChild(this.controls);
      this.space.appendChild(this.anim);

      this.controlBtn.addEventListener('click', () => {
        this.writeMsg(`-- on button click ${this.controlBtn.textContent}`);
      })

      this.close.addEventListener('click', () => {
        wrapper.removeChild(this.space);
        this.textMsg.textContent = '';
        if (this.isAnimate) {
          this.controlAnimate();
        }
        this.writeInLocalStorage('-- close work space');
        blockFive.appendChild(this.getInfoFromLocalStorage());
        delete localStorage.animationStatus
      });

      play.addEventListener('click', () => {
        wrapper.appendChild(this.space);
        this.writeInLocalStorage('-- show work space');
      });

      this.space.addEventListener('DOMNodeInsertedIntoDocument', this.initAnimate);
    }

    writeMsg = msg => {
      this.writeInLocalStorage(msg);
      this.textMsg.textContent = msg;
    }

    writeInLocalStorage = msg => {
      const date = new Date();
      localStorage.animationStatus = `${localStorage.animationStatus || ''}${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}:
      :${date.getSeconds()}:${date.getMinutes()}:${date.getHours()} : ${msg}%`;
    }

    getInfoFromLocalStorage = () => {
      const block = document.getElementById('anim-info');
      localStorage.animationStatus.split('%').forEach(item => {
        if(item) {
          block.appendChild(document.createElement('br'));
          block.appendChild(document.createTextNode(item));
        }
      });
      return block
    }

    controlAnimate = () => {
      if(this.isAnimate) {
        clearInterval(this.interval);
        this.controlBtn.textContent = 'start';
        this.isAnimate = false;
      } else {
        this.interval = setInterval(this.animate, 1);
        this.controlBtn.textContent = 'stop';
        this.isAnimate = true;
      }
    };

    animate = () => {
      const {canvas, coord} = this;
      const animWidth = this.anim.offsetWidth;
      const animHeigh = this.anim.offsetHeight;
      coord.x += Math.cos(this.angle) * this.speed;
      coord.y += Math.sin(this.angle) * this.speed;
      if((coord.x <= 0 && Math.cos(this.angle) < 0) || (coord.x >= animWidth - 10 && Math.cos(this.angle) > 0)) {
        this.writeMsg(`-- touch ${Math.cos(this.angle) < 0 ? 'left' : 'right'} wall`)
        coord.x -= Math.cos(this.angle) * this.speed;
        this.angle = Math.acos(-Math.cos(this.angle));
      } 

      if (this.isCanvas) {
        canvas.clearRect(0, 0, animWidth, animHeigh);
        canvas.fillRect(Math.floor(coord.x), Math.floor(this.coord.y), 10, 10);
      } else {
        this.square.style.left = `${Math.floor(coord.x)}px`;
        this.square.style.top  = `${Math.floor(coord.y)}px`;
      }

      if (coord.y >= animHeigh && this.isAnimate) {
        this.writeMsg('-- square go out')
        this.controlAnimate();
        this.controlBtn.textContent = 'reload';
        this.controlBtn.onclick = this.initAnimate;
      }
    };

    initAnimate = () => {
      const {anim, square, coord, controlBtn, controlAnimate, canvas} = this;
      coord.x = Math.random() * (anim.clientWidth - 10);
      coord.y = 0;
      this.angle = Math.random() * Math.PI;
      
      if(this.isCanvas) {
        anim.width = anim.offsetWidth;
        anim.height = anim.offsetHeight;
        canvas.clearRect(0, 0, anim.offsetWidth, anim.offsetHeight);
        canvas.fillStyle = 'red';
        canvas.fillRect(Math.floor(coord.x), 0, 10, 10);
      } else {
        square.style.left = `${Math.floor(coord.x)}px`;
        square.style.top  = `${coord.y}px`;
      }

      controlBtn.textContent = 'start';
      controlBtn.onclick = controlAnimate;
    }
  }

  const a = new Animation(document.body, 2, true);
});