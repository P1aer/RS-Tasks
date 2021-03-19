const fullscr=document.querySelector(".fullscreen")
const piano = document.querySelector('.piano');
const btnNotes=document.querySelector('.btn-notes')
const btnLetters=document.querySelector('.btn-letters')
const keys=piano.querySelectorAll('.piano-key')

function keySound(e) {
    if(e.repeat)return;
    const audio=document.querySelector(`audio[data-letter="${e.code.substr(e.code.indexOf("Key")+3)}"]`)
    const key=piano.querySelector(`.piano-key[data-letter="${e.code.substr(e.code.indexOf("Key")+3)}"]`)
     if(!audio)return;
    audio.currentTime=0;
    audio.play();
    key.classList.add('piano-key-active')

}
function mouseSound(e) {
    const audio=document.querySelector(`audio[data-letter="${e.target.dataset.letter}"]`)
    const key=piano.querySelector(`.piano-key[data-letter="${e.target.dataset.letter}"]`)
    if(!audio) return
    audio.currentTime=0;
    audio.play();
    key.classList.add('piano-key-active')
    key.classList.add('piano-key-active-pseudo')
    key.addEventListener('mouseleave',Disable,{once:true})
    piano.addEventListener('mouseover',mouseSound)

}
function Disable(e){
    const key=piano.querySelector(`.piano-key[data-letter="${e.target.dataset.letter||e.code.substr(e.code.indexOf("Key")+3)}"]`)
    key.classList.remove('piano-key-active');
    key.classList.remove('piano-key-active-pseudo');
}
function mouseDisable(e){
    try{
        const key=piano.querySelector(`.piano-key[data-letter="${e.target.dataset.letter}"]`)
        key.classList.remove('piano-key-active-pseudo');
        key.classList.remove('piano-key-active');
    }
catch {}

    piano.removeEventListener('mouseover',mouseSound)

}

btnLetters.addEventListener('click',()=>{
    keys.forEach(key=>key.classList.add("piano-key-letter"))
    btnLetters.classList.add('btn-active')
    btnNotes.classList.remove('btn-active')
})
btnNotes.addEventListener('click',()=>{
    keys.forEach(key=>key.classList.remove("piano-key-letter"))
    btnNotes.classList.add('btn-active')
    btnLetters.classList.remove('btn-active')
})
fullscr.addEventListener('click',()=>{
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
})
document.addEventListener('keyup',Disable)
window.addEventListener('keydown',keySound);
piano.addEventListener('mousedown', mouseSound);
window.addEventListener('mouseup',mouseDisable)



