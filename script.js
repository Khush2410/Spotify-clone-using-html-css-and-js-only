
//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Cheap Thrills", filepath: "songs/1.mp3",coverpath: "covers/1.jpg"},
    {songName: "Unstoppable", filepath: "songs/2.mp3",coverpath:"covers/2.jpg" },
    {songName: "No love", filepath: "songs/3.mp3",coverpath:"covers/3.jpg" },
    {songName: "Do You Know", filepath: "songs/4.mp3",coverpath:"covers/4.jpg" },
    {songName: "295", filepath: "songs/5.mp3",coverpath:"covers/5.jpg" },
    {songName: "Tum se hi", filepath: "songs/6.mp3",coverpath:"covers/6.jpg" },
    {songName: "Untouchable", filepath: "songs/7.mp3",coverpath:"covers/7.jpg" }
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})


//audioelement.play();
//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }

    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=> {
   //update seekbar
   progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
   myprogressbar.value = progress;

})

myprogressbar.addEventListener('change' , ()=>{
    audioElement.currentTime = (myprogressbar.value * audioElement.duration/100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.classList.remove('fa-pause');
    element.classList.add('fa-play');
})

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})