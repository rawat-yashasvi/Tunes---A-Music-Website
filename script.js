// Variables
var songIndex=0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let timestamp = Array.from(document.getElementsByClassName('timeStamp'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: 'Baarishien - Anuv Jain', filePath: '1.mp3', coverPath: '1.jpg'},
    {songName: 'Alag Aasman - Anuv Jain', filePath: '2.mp3', coverPath: '2.jpg'},
    {songName: 'Sang Rahiyo - Jasleen Royal', filePath: '3.mp3', coverPath: '3.jpg'},
    {songName: 'Maula - Anuv Jain', filePath: '4.mp3', coverPath: '4.jpg'},
    {songName: 'Mishri - Anuv Jain', filePath: '5.mp3', coverPath: '5.jpg'},
    {songName: 'Aise Kyun - Rekha Bharadwaj', filePath: '6.mp3', coverPath: '6.jpg'},
    {songName: 'Kho gaye - Taaruk Raina', filePath: '7.mp3', coverPath: '7.jpg'},
    {songName: 'Mazaak - Anuv Jain', filePath: '8.mp3', coverPath: '8.jpg'},
    {songName: 'Kasoor - Prateek Kuhad', filePath: '9.mp3', coverPath: '9.jpg'},
    {songName: 'Riha - Anuv Jain', filePath: '10.mp3', coverPath: '10.jpg'},
]

songItems.forEach(function(element, i){
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    
})




//Play pause click
masterPlay.addEventListener('click', function(){
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', function(){
    //update seek
    progress=parseFloat((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', function(){
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays= function(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(element){
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(element){
    element.addEventListener('click', function(e){
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=(songIndex+1)+".mp3";
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})

const change=function(element){
    element.classList.remove('fa-play');
    element.classList.add('fa-pause');
}

document.getElementById("next").addEventListener('click', function(){
    if(songIndex>=9){
        songIndex=0
    }
    else{
        songIndex+=1;
    }
    audioElement.src=(songIndex+1)+".mp3";
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    makeAllPlays();
    let text=songIndex.toString();
    
    let c1=document.getElementById(text);
    change(c1);

    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById("previous").addEventListener('click', function(){
    if(songIndex<=0){
        songIndex=9
    }
    else{
        songIndex-=1;
    }
        audioElement.src=(songIndex+1)+".mp3";
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        makeAllPlays();

        let text=songIndex.toString();
    
    let c1=document.getElementById(text);
    change(c1);

        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
})