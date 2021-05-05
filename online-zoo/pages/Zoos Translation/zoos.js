const card_btns = document.querySelectorAll(".facts-card-btn");
let main_cam = document.querySelector('.cam-main')
const other_cam_grid = document.querySelector('.other-cam-grid')
const other_cam_next = document.querySelector('.other-cam-next')
const other_cam_prev = document.querySelector('.other-cam-prev')
const videos = other_cam_grid.querySelectorAll('.grid-cam')
let  carousel_caret = [];
let  slide_scroll;

function createCaret() {
    for (let i = 0;i<slide_scroll;i++){
        carousel_caret[i] = i;
    }
}
function calcScroll() {
    if(window.outerWidth >= 1880){
        slide_scroll = 4
    }
    else if(window.outerWidth >=1200 && window.outerWidth < 1880){
        slide_scroll = 3
    }
    else if(window.outerWidth < 1200){
        slide_scroll = 2
    }

}


const btnClick = (ev) => {
    const btn = ev.target;
    const card = btn.parentElement;
    const text = card.children[1];
    const img =  btn.children[0];
    if(text.classList.contains('visual-hidden')){
        text.classList.remove('visual-hidden');
        btn.classList.add('active-btn');
        card.classList.add('card-active');
        img.src = '../../assets/images/minus_btn.svg';
    }
    else {
        text.classList.add('visual-hidden');
        btn.classList.remove('active-btn');
        card.classList.remove('card-active');
        img.src = '../../assets/images/plus_btn.svg';
    }
}
const showNextSlides = (e) => {
    for (let i = 0; i < videos.length; i++) {
       videos[i].style.display = "none";
    }
    for (let i =0;i<slide_scroll;i++){
        if( e.currentTarget.classList.contains('other-cam-next')){
            carousel_caret[i]= carousel_caret[i]-1 === -1?videos.length-1:carousel_caret[i]-1
        }
        else {
            carousel_caret[i]= carousel_caret[i]+1 === videos.length ?0: carousel_caret[i]+1
        }
        videos[carousel_caret[i]].style.display = "block";
        videos[carousel_caret[i]].style.gridColumnStart =`${i+1}`
       videos[carousel_caret[i]].style.gridRowStart =`${1}`
    }
}
const changeVideo = (e) =>{
    const parent= e.currentTarget;
    const wr_inv = parent.children[1];
    let link = wr_inv.children[0];
    const temp = link.href;
    link.href = main_cam.src;
    main_cam.src = temp;
}
card_btns.forEach(btn => btn.addEventListener('click',btnClick))
videos.forEach(video => video.addEventListener('click',changeVideo))
other_cam_next.addEventListener('click',showNextSlides)
other_cam_prev.addEventListener('click',showNextSlides)
calcScroll()
createCaret()