
const player = document.querySelector('.player'); 
const video = player.querySelector('.player__video');
const controls = player.querySelector('.player__controls');

const volume = controls.querySelector('.controls__volume');
const progress = controls.querySelector('.controls__progress');

const play = player.querySelector('.player__play');

video.removeAttribute('controls');
controls.style.visibility = 'visible';


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


