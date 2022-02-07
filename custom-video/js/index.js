
const player = document.querySelector('.player'); 
const video = player.querySelector('.player__video');
const controls = player.querySelector('.player__controls');

const volume = controls.querySelector('.controls__volume');
const progress = controls.querySelector('.controls__progress');

const play = controls.querySelector('.controls__play');
const bigPlay = player.querySelector('.palyer__play-btn');

const currentTime = controls.querySelector('.controls__current-time');
const durationTime = controls.querySelector('.controls__duration-time');
const remainingTime = controls.querySelector('.controls__remaining-time');

const sound = controls.querySelector('.controls__sound');
const fullscreen = controls.querySelector('.controls__fullscreen');

let mouseTimer = null;

video.removeAttribute('controls');
controls.classList.remove("controls--hidden");



function getFormattedTime(time){
  let minutes = Math.floor( time / 60 );
  let seconds = Math.floor( time - 60 * minutes );

  return `${("0"+minutes).slice(-2)}:${("0"+seconds).slice(-2)}`;
}

function hideControls(){
  clearTimeout(mouseTimer);
  controls.classList.remove("controls--hidden");
  hideCursor(false);
  if(!video.paused) {
    mouseTimer = setTimeout(() => {
        controls.classList.add("controls--hidden");
        hideCursor(true);
    }, 3000);
  }
}
function hideCursor(hide){
  if(hide){
    player.classList.add("player--nocursor");
  }else{
    player.classList.remove("player--nocursor");
  }
}

video.addEventListener('loadeddata', function() {

  if(video.readyState >= 2) {
    durationTime.innerText=getFormattedTime(video.duration);

    let currentPlayProgress = progress.querySelector(".controls__current-progress");
    currentPlayProgress.style.width = video.currentTime+"px";

    let currentVolume = volume.querySelector(".controls__current-volume");
    currentVolume.style.width = video.volume * volume.getBoundingClientRect().width +"px";

  }

});

player.addEventListener('mousemove', hideControls);

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
bigPlay.addEventListener('click', playPauseMedia);
video.addEventListener('click', playPauseMedia);
function playPauseMedia() {
  if(video.paused) {
    play.classList.add("controls__play--pause");
    bigPlay.classList.add("palyer__play-btn--hidden");
    video.play();
  } else {
    play.classList.remove("controls__play--pause");
    bigPlay.classList.remove("palyer__play-btn--hidden");
    video.pause();
    hideCursor(false);
  }
  hideControls();
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


sound.addEventListener('click', function(e) {
  video.muted = !video.muted;
  if(video.muted){
    sound.classList.add("controls__sound--mute");    
  }else{
    sound.classList.remove("controls__sound--mute");      
  }
});

fullscreen.addEventListener('click', function(e){
  if(player.requestFullscreen){
    fullscreen.classList.add("controls__fullscreen--exit");     
    player.requestFullscreen();

  }
  if (document.fullscreenElement || 
      document.webkitFullscreenElement || 
      document.mozFullScreenElement) {
    document.exitFullscreen();
    fullscreen.classList.remove("controls__fullscreen--exit");
    
  }

});


volume.addEventListener("change", function(event) {
  video.volume=event.detail.volume/100;
  if(video.volume>0){
    video.muted=false;
    sound.classList.remove("controls__sound--mute");
    
  }else{
    video.muted=true;
    sound.classList.add("controls__sound--mute");
  }
});


progress.addEventListener("change", function(event) {
  video.currentTime=video.duration*(event.detail.currentTime/100);
});