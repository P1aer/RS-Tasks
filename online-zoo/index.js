const form_container = document.querySelector('.form-container');
const feedback_btn = document.querySelector(".testim-article-btn");
let active_btn = document.querySelector('.Eagle-icon');
const icons = document.querySelectorAll('.zoo-geo-map-icons');
const geo_card = document.querySelector(".zoo-geo-card");
const geo_card_img = geo_card.querySelector(".zoo-geo-card-img");
const geo_card_h3 = geo_card.querySelector('.zoo-geo-h3');
const geo_card_btn = geo_card.querySelector('.zoo-geo-link');
const geo_card_text = geo_card.querySelector('.zoo-geo-card-text');
const side_bar = document.querySelector('.aside-section');
const side_nav = side_bar.querySelector('.aside-socials')
const side_arrow = side_bar.querySelector('.aside-arrow');
const inputs = form_container.querySelectorAll('input');
const send_btn = form_container.querySelector('.feedback-send-btn')
const fam_pet_next = document.querySelector(".fam-pet-next");
const fam_pet_prev = document.querySelector(".fam-pet-prev");
const fam_pet_grid_top = document.querySelector('.fam-pet-grid-top')
const fam_pet_grid_bottom = document.querySelector('.fam-pet-grid-bottom')
const slides_top = fam_pet_grid_top.getElementsByClassName("fam-pet-card");
const slides_bottom = fam_pet_grid_bottom.getElementsByClassName("fam-pet-card");
const testim_grid = document.querySelector('.testim-section-grid');
const testim_comments = testim_grid.querySelectorAll('.testim-comment')
const testim_next = document.querySelector(".testim-next");
const testim_prev = document.querySelector(".testim-prev");
let testim_timer

const GORILLA_TEXT = 'The broadcast comes from the Democratic Republic of the Congo in a forest area. Watch their life and life together';
const EAGLE_TEXT = 'The broadcast is from an island near Los Angeles. Watch their real life.';
const ALLIGATOR_TEXT = 'The broadcast is from St. Augustine\'s Alligator Farm in Florida. Watch their real life.'
const PANDA_TEXT = 'The broadcast is from Shenshuping Gengda Panda Center in China\'s Wolong Valley. Watch their real life.'
const TIMER_INTERVAL = 10000;
const TIMER_SLEEP= 20000;
let carousel_caret = [];
let testim_caret = [];
let testim_scroll;
let slide_scroll;

const changeCard = (ev) => {
    const current_btn = ev.currentTarget;
    let animal = current_btn.classList[1].split('-')[0].toLowerCase();
    current_btn.classList.add('icon-active');
    active_btn.classList.remove('icon-active');
    active_btn = ev.currentTarget;
    geo_card_img.src =`assets/images/${animal}-watch.png`;
    let splitted =  animal.split('')
    splitted[0] = splitted[0].toUpperCase()
    animal = splitted.join('')
    geo_card_btn.href = `pages/Zoos%20Translation/${animal}.html`
    geo_card_h3.textContent = animal;
    switch (animal) {
        case 'Gorilla':
            geo_card_text.textContent = GORILLA_TEXT;
            break
        case 'Eagle':
            geo_card_text.textContent = EAGLE_TEXT;
            break
        case 'Alligator':
            geo_card_text.textContent = ALLIGATOR_TEXT;
            break
        case 'Panda':
            geo_card_text.textContent = PANDA_TEXT;
            break
    }
}
const hideSidebar = (ev) => {
    if(window.getComputedStyle(side_bar).height === '760px'){
        ev.currentTarget.classList.add('aside-arrow-hide');
        side_bar.classList.add('aside-section-hide');
        side_nav.classList.add('visual-hidden')
    }
    else{
        ev.currentTarget.classList.remove('aside-arrow-hide');
        side_bar.classList.remove('aside-section-hide');
        side_nav.classList.remove('visual-hidden')
    }
}
const leaveFeedback = (ev) => {
    form_container.classList.remove('visual-hidden')
}
const checkValidate = () => {
    let flag = true;
    inputs.forEach(input => {
        if (!input.validity.valid){
            flag = false
        }
    })
    if(flag){
       send_btn.classList.add('feedback-send-btn-active')
    }
    else {
        try {
        send_btn.classList.remove('feedback-send-btn-active')
    }
    catch (e) {

        }
    }
}
window.onclick = function(event) {
    if (event.target === form_container) {
        form_container.classList.add('visual-hidden');
    }
}

function setTimer() {
    testim_timer = setInterval(() => showNextComments('timeout'),TIMER_INTERVAL)
}
function createCaret() {
    for (let i=0;i<slide_scroll;i++){
        carousel_caret[i]=i;
    }
    for (let i=0;i<testim_scroll;i++){
        testim_caret[i]=i;
    }
}
function calcScroll() {
    if ((window.outerWidth<=320) || (window.outerWidth>=1200 && window.outerWidth<1920))
        slide_scroll = 2;
    else  slide_scroll = 3;
    if (window.outerWidth<1820){
        testim_scroll = 1;
    }
    else testim_scroll = 2
}

// Next/previous controls
const  showNextSlides = (e) => {
    for (let i = 0; i < slides_top.length; i++) {
        slides_top[i].style.display = "none";
        slides_bottom[i].style.display = "none";
    }
    for (let i =0;i<slide_scroll;i++){
        if( e.currentTarget.classList.contains('fam-pet-next')){
            carousel_caret[i]= carousel_caret[i]-1 === -1?slides_top.length-1:carousel_caret[i]-1
        }
        else {
            carousel_caret[i]= carousel_caret[i]+1 === slides_top.length ?0: carousel_caret[i]+1
        }
        slides_top[carousel_caret[i]].style.display = "block";
        slides_bottom[carousel_caret[i]].style.display = "block";
        slides_top[carousel_caret[i]].style.gridColumnStart =`${i+1}`
        slides_top[carousel_caret[i]].style.gridRowStart =`${1}`
        slides_bottom[carousel_caret[i]].style.gridColumnStart =`${i+1}`
        slides_bottom[carousel_caret[i]].style.gridRowStart =`${1}`
    }
}
const  showNextComments = (e) => {
    if(e!=='timeout'){
        clearInterval(testim_timer)
        setTimeout(setTimer,TIMER_SLEEP-TIMER_INTERVAL)
    }
    for (let i = 0; i < testim_comments.length; i++) {
        testim_comments[i].style.display = "none";
    }
    for (let i =0;i<testim_scroll;i++){
        if(e ==='timeout'|| e.currentTarget.classList.contains('testim-next')){
            testim_caret[i]= testim_caret[i]-1 === -1?testim_comments.length-1:testim_caret[i]-1
        }
        else {
            testim_caret[i]= testim_caret[i]+1 === testim_comments.length ?0: testim_caret[i]+1
        }
        testim_comments[testim_caret[i]].style.display = "block";
        testim_comments[testim_caret[i]].style.gridColumnStart =`${i+1}`
        testim_comments[testim_caret[i]].style.gridRowStart =`${1}`
    }
}


inputs.forEach(input => input.addEventListener('input',checkValidate))
icons.forEach(icon => icon.addEventListener('click',changeCard))

feedback_btn.addEventListener('click',leaveFeedback)
side_arrow.addEventListener('click', hideSidebar)
fam_pet_next.addEventListener('click',showNextSlides)
fam_pet_prev.addEventListener('click',showNextSlides)
testim_next.addEventListener('click',showNextComments)
testim_prev.addEventListener('click',showNextComments)

calcScroll()
createCaret()
setTimer()
