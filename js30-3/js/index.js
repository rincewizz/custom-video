
const player = document.querySelector('.player'); 
const video = player.querySelector('.player__video');
const controls = player.querySelector('.player__controls');

const volume = controls.querySelector('.controls__volume');
const progress = controls.querySelector('.controls__progress');

const play = controls.querySelector('.controls__play');

const currentTime = controls.querySelector('.controls__current-time');
const durationTime = controls.querySelector('.controls__duration-time');
const remainingTime = controls.querySelector('.controls__remaining-time');


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
  }

});


volume.addEventListener('mousedown', function(event){

  event.preventDefault(); // предотвратить запуск выделения (действие браузера по умолчанию) 

  let currentPosX = event.pageX;
  let currentValue = volume.querySelector(".controls__current-volume");
  
  currentValue.style.width = (currentPosX - volume.getBoundingClientRect().left) + "px";

  let currentValueWidth = currentValue.clientWidth;

  function onMouseMove(event){
    // console.log(event.pageX);
    let fullWidth = volume.getBoundingClientRect().width;
    let newCurrentValueWidth = currentValueWidth + (event.pageX - currentPosX);

    if (newCurrentValueWidth<0) currentValue.style.width=0;
    currentValue.style.width = (newCurrentValueWidth <= fullWidth ? newCurrentValueWidth : fullWidth) + "px";
  }

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', function(event){
    document.removeEventListener('mousemove', onMouseMove);

  }, {once : true});



} );


progress.addEventListener('mousedown', function(event){

  event.preventDefault(); // предотвратить запуск выделения (действие браузера по умолчанию) 

  let currentPosX = event.pageX;
  let currentValue = progress.querySelector(".controls__current-progress");
  
  currentValue.style.width = (currentPosX - progress.getBoundingClientRect().left) + "px";

  let currentValueWidth = currentValue.clientWidth;

  function onMouseMove(event){

    let fullWidth = progress.getBoundingClientRect().width;
    let newCurrentValueWidth = currentValueWidth + (event.pageX - currentPosX);

    if (newCurrentValueWidth<0) currentValue.style.width=0;
    currentValue.style.width = (newCurrentValueWidth <= fullWidth ? newCurrentValueWidth : fullWidth) + "px";
  }

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', function(event){
    document.removeEventListener('mousemove', onMouseMove);

  }, {once : true});



} );


play.addEventListener('click', playPauseMedia);

function playPauseMedia() {
  if(video.paused) {
    // play.setAttribute('data-icon','u');
    video.play();
  } else {
    // play.setAttribute('data-icon','P');
    video.pause();
  }
}

video.addEventListener('timeupdate', (event) => {
  // console.log(video.currentTime);

  currentTime.innerText=getFormattedTime(video.currentTime);
  remainingTime.innerText=getFormattedTime(Math.ceil(video.duration-video.currentTime));

});