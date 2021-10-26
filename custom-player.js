/* PLAYER */
const playListMedia = document.querySelector('.play-list');
const songTitle = document.querySelector('.song-title');

const play = document.querySelector('.play');
const audio = new Audio();
let isPlay = false;
let playNum = 0;
let playNumPrevNextStopMusic = 0


function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    tracks[playNum].classList.toggle('active-track');
    songTitle.textContent = playList[playNum].title;
    playNumPrevNextStopMusic = 1
    if (isPlay == false) {
        audio.play();
        isPlay = true;
        toggleBtn();
    } else {
        audio.pause();
        isPlay = false;
        toggleBtn();
        playNumPrevNextStopMusic = 0
    }
}

function playAudioPrevNext() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    tracks[playNum].classList.toggle('active-track');
    songTitle.textContent = playList[playNum].title;
    if (isPlay == false) {
        audio.play();
        isPlay = true;
    } else {
        audio.pause();
        isPlay = false;

    }
}

function toggleBtn() {
    play.classList.toggle('pause');
}

play.addEventListener('click', playAudio);

document.querySelector('.play-prev').addEventListener('click', function() {
    if (playNumPrevNextStopMusic == 1) {
        pauseAudio();
        --playNum;
        if (playNum < 0) {
            playNum = 3
        }
        playAudioPrevNext();
    }
})

document.querySelector('.play-next').addEventListener('click', function() {
    if (playNumPrevNextStopMusic == 1) {
        pauseAudio();
        playNum++;
        if (playNum > 3) {
            playNum = 0;
        }
        playAudioPrevNext();
    }
})

/* PLAYLIST AUDIO */


for (let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    playListMedia.append(li);
    li.classList.add('play-item');
    li.textContent = playList[i].title;

}

const tracks = document.querySelectorAll('.play-item')
let playMusic = 0
for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('click', () => {
        if (playMusic == 0) {
            pauseAudio()
            playNum = i
            playAudio()
            playMusic = 1
        } else {
            pauseAudio()
            playMusic = 0
            toggleBtn()
        }
    })
}
console.log(tracks.length)

function pauseAudio() {
    audio.pause();
    isPlay = false;
    // toggleBtn();
    for (let track of tracks) {
        track.classList.remove('active-track')
    }
}
const progressBar = document.querySelector('#progress-bar');

function updateProgressValue() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));
    document.querySelector('.durationTime').innerHTML = playList[playNum].duration;;
};

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};
setInterval(updateProgressValue, 500);

function changeProgressBar() {
    audio.currentTime = progressBar.value;
};

let onOffVolume = 0

const iconVolume = document.querySelector('.icon-volume');
iconVolume.addEventListener('click', function() {
    iconVolume.classList.toggle('mute');
    if (onOffVolume == 0) {
        audio.muted = true
        onOffVolume = 1
    } else {
        audio.muted = false
        onOffVolume = 0
    }
})


/* Volume */
const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener(
    "click",
    (e) => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        document.querySelector(".volume-percentage").style.width =
            newVolume * 100 + "%";
    },
    false
);

progressBar.addEventListener(
    "click",
    (e) => {
        const timelineWidth = window.getComputedStyle(progressBar).width;
        const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
        audio.currentTime = timeToSeek;
    },
    false
);

import playList from './playList.js';