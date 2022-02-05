
const player = document.querySelector('.player'); 
const video = player.querySelector('.player__video');
const controls = player.querySelector('.player__controls');

const volume = controls.querySelector('.controls__volume');
const progress = controls.querySelector('.controls__progress');

const play = controls.querySelector('.controls__play');

const currentTime = controls.querySelector('.controls__current-time');
const durationTime = controls.querySelector('.controls__duration-time');
const remainingTime = controls.querySelector('.controls__remaining-time');

const mute = controls.querySelector('.controls__mute');
const fullscreen = controls.querySelector('.controls__fullscreen');

video.removeAttribute('controls');
controls.style.visibility = 'visible';



function getFormattedTime(time){
  let minutes = Math.floor( time / 60 );
  let seconds = Math.floor( time - 60 * minutes );

  return `${("0"+minutes).slice(-2)}:${("0"+seconds).slice(-2)}`;
}

video.addEventListener('loadeddata', function() {

  if(video.readyState >= 2) {
    durationTime.innerText=getFormattedTime(video.duration);

    let currentValue = progress.querySelector(".controls__current-progress");
    currentValue.style.width = video.currentTime+"px";
  }

});


volume.addEventListener('mousedown', function(event){

  event.preventDefault(); // предотвратить запуск выделения (действие браузера по умолчанию) 

  let changeEvent = new CustomEvent("change", {
    detail: { volume: 100 }
  })

  let startCursorPosX = event.pageX;
  let fullWidth = volume.getBoundingClientRect().width;

  let currentValue = volume.querySelector(".controls__current-volume");

  function getPosition(){
    return currentValue.clientWidth;
  }
  function setPosition(pos){

    if(pos<0) pos=0;
    if(pos>fullWidth) pos=fullWidth;

    currentValue.style.width = pos+"px";

    let valuePercent = getPosition() /(fullWidth*0.01);

    changeEvent.detail.volume = valuePercent;
    volume.dispatchEvent(changeEvent);
    console.log(valuePercent);
  }

  
  setPosition(startCursorPosX - (volume.getBoundingClientRect().left + window.scrollX) );
  
  let currentValueWidth = getPosition();

  function onMouseMove(event){

    setPosition(currentValueWidth + (event.pageX - startCursorPosX));

  }

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', function(event){

    document.removeEventListener('mousemove', onMouseMove);

  }, {once : true});



} );



progress.addEventListener('mousedown', function(event){

  event.preventDefault(); // предотвратить запуск выделения (действие браузера по умолчанию) 

  let changeEvent = new CustomEvent("change", {
    detail: { currentTime: 0 }
  })

  let startCursorPosX = event.pageX;
  let fullWidth = progress.getBoundingClientRect().width;

  let currentValue = progress.querySelector(".controls__current-progress");

  function getPosition(){
    return currentValue.clientWidth;
  }
  function setPosition(pos){

    if(pos<0) pos=0;
    if(pos>fullWidth) pos=fullWidth;

    currentValue.style.width = pos+"px";

    let valuePercent = getPosition() /(fullWidth*0.01);

    // video.duration
    changeEvent.detail.currentTime = valuePercent;
    progress.dispatchEvent(changeEvent);
    console.log(valuePercent);
  }

  
  setPosition(startCursorPosX - (progress.getBoundingClientRect().left + window.scrollX) );
  
  let currentValueWidth = getPosition();

  function onMouseMove(event){

    setPosition(currentValueWidth + (event.pageX - startCursorPosX));

  }

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', function(event){

    document.removeEventListener('mousemove', onMouseMove);

  }, {once : true});



} );



play.addEventListener('click', playPauseMedia);

function playPauseMedia() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

video.addEventListener('timeupdate', (event) => {
  // console.log(video.currentTime);

  currentTime.innerText=getFormattedTime(video.currentTime);
  remainingTime.innerText=getFormattedTime(Math.ceil(video.duration-video.currentTime));

  let fullWidth = progress.getBoundingClientRect().width;
  let currentValue = progress.querySelector(".controls__current-progress");
  let valuePercent =video.currentTime / video.duration;

  currentValue.style.width = fullWidth*valuePercent + "px";

});


mute.addEventListener('click', function(e) {
   video.muted = !video.muted;
});

fullscreen.addEventListener('click', function(e){
  player.requestFullscreen();
});


volume.addEventListener("change", function(event) {
  video.volume=event.detail.volume/100;
});


progress.addEventListener("change", function(event) {
  video.currentTime=video.duration*(event.detail.currentTime/100);
});