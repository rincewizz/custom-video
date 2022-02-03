
const video = document.querySelector('.player__video');
const controls = document.querySelector('.player__controls');

const play = document.querySelector('.player__play');

video.removeAttribute('controls');
controls.style.visibility = 'visible';