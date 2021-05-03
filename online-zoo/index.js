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

const GORILLA_TEXT = 'The broadcast comes from the Democratic Republic of the Congo in a forest area. Watch their life and life together';
const EAGLE_TEXT = 'The broadcast is from an island near Los Angeles. Watch their real life.';
const ALLIGATOR_TEXT = 'The broadcast is from St. Augustine\'s Alligator Farm in Florida. Watch their real life.'
const PANDA_TEXT = 'The broadcast is from Shenshuping Gengda Panda Center in China\'s Wolong Valley. Watch their real life.'
let carousel_caret=[];
let slide_scroll;

console.log(slides_top)
console.log(slides_bottom)
const changeCard = (ev) => {
    const current_btn = ev.currentTarget;
    const animal = current_btn.classList[1].split('-')[0];
    current_btn.classList.add('icon-active');
    active_btn.classList.remove('icon-active');
    active_btn = ev.currentTarget;
    geo_card_img.src =`assets/images/${animal}-watch.png`;
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
        if(!input.validity.valid){
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

function createCaret() {
    for (let i=0;i<slide_scroll;i++){
        carousel_caret[i]=i;
    }
}
function calcScroll() {
    if(window.innerWidth<=320 || (window.innerWidth>=1200 && window.innerWidth<1920))
        slide_scroll = 2;
    else  slide_scroll = 3;
}

// Next/previous controls
const  showNextSlides= () => {
    for (let i = 0; i < slides_top.length; i++) {
        slides_top[i].style.display = "none";
        slides_bottom[i].style.display = "none";
    }

    for(let i =0;i<slide_scroll;i++){
        carousel_caret[i]= carousel_caret[i]-1 === -1?slides_top.length-1:carousel_caret[i]-1
        slides_top[carousel_caret[i]].style.display = "block";
        slides_bottom[carousel_caret[i]].style.display = "block";
        slides_top[carousel_caret[i]].style.gridColumnStart =`${i+1}`
        slides_top[carousel_caret[i]].style.gridRowStart =`${1}`
        slides_bottom[carousel_caret[i]].style.gridColumnStart =`${i+1}`
        slides_bottom[carousel_caret[i]].style.gridRowStart =`${1}`
        console.log(slides_top[carousel_caret[i]])
        console.log(slides_top[carousel_caret[i]].style.gridColumnStart)
    }
    console.log(carousel_caret)
}
const  showPrevSlides= () => {
    for (let i = 0; i < slides_top.length; i++) {
        slides_top[i].style.display = "none";
        slides_bottom[i].style.display = "none";
    }
    for (let i =0;i<slide_scroll;i++){
        carousel_caret[i]= carousel_caret[i]+1 === slides_top.length ?0: carousel_caret[i]+1
        slides_top[carousel_caret[i]].style.display = "block";
        slides_bottom[carousel_caret[i]].style.display = "block";
        slides_top[carousel_caret[i]].style.gridColumnStart =`${i+1}`
        slides_top[carousel_caret[i]].style.gridRowStart =`${1}`
        slides_bottom[carousel_caret[i]].style.gridColumnStart =`${i+1}`
        slides_bottom[carousel_caret[i]].style.gridRowStart =`${1}`
    }
    console.log(carousel_caret)
}

inputs.forEach(input => input.addEventListener('input',checkValidate))
icons.forEach(icon => icon.addEventListener('click',changeCard))

feedback_btn.addEventListener('click',leaveFeedback)
side_arrow.addEventListener('click', hideSidebar)
fam_pet_next.addEventListener('click',showNextSlides )
fam_pet_prev.addEventListener('click',showPrevSlides)
calcScroll()
createCaret()

/*function Ant(crslId) {

    let id = document.getElementById(crslId);
    if(id) {
        this.crslRoot = id
    }
    else {
        this.crslRoot = document.querySelector('.ant-carousel')
    };

    // Carousel objects
    this.crslList = this.crslRoot.querySelector('.ant-carousel-list');
    this.crslElements = this.crslList.querySelectorAll('.ant-carousel-element');
    this.crslElemFirst = this.crslList.querySelector('.ant-carousel-element');
    this.leftArrow = this.crslRoot.querySelector('div.ant-carousel-arrow-left');
    this.rightArrow = this.crslRoot.querySelector('div.ant-carousel-arrow-right');
    this.indicatorDots = this.crslRoot.querySelector('div.ant-carousel-dots');

    // Initialization
    this.options = Ant.defaults;
    Ant.initialize(this)
};

Ant.defaults = {

    // Default options for the carousel
    elemVisible: 3, // Кол-во отображаемых элементов в карусели
    loop: true,     // Бесконечное зацикливание карусели
    auto: true,     // Автоматическая прокрутка
    interval: 5000, // Интервал между прокруткой элементов (мс)
    speed: 750,     // Скорость анимации (мс)
    touch: true,    // Прокрутка  прикосновением
    arrows: true,   // Прокрутка стрелками
    dots: true      // Индикаторные точки
};

Ant.prototype.elemPrev = function(num) {
    num = num || 1;

    if(this.options.dots) this.dotOn(this.currentElement);
    this.currentElement -= num;
    if(this.currentElement < 0) this.currentElement = this.dotsVisible-1;
    if(this.options.dots) this.dotOff(this.currentElement);

    if(!this.options.loop) {  // сдвиг вправо без цикла
        this.currentOffset += this.elemWidth*num;
        this.crslList.style.marginLeft = this.currentOffset + 'px';
        if(this.currentElement == 0) {
            this.leftArrow.style.display = 'none'; this.touchPrev = false
        }
        this.rightArrow.style.display = 'block'; this.touchNext = true
    }
    else {                    // сдвиг вправо с циклом
        let elm, buf, this$ = this;
        for(let i=0; i<num; i++) {
            elm = this.crslList.lastElementChild;
            buf = elm.cloneNode(true);
            this.crslList.insertBefore(buf, this.crslList.firstElementChild);
            this.crslList.removeChild(elm)
        };
        this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
        let compStyle = window.getComputedStyle(this.crslList).marginLeft;
        this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
        this.crslList.style.marginLeft = '0px';
        setTimeout(function() {
            this$.crslList.style.cssText = 'transition:none;'
        }, this.options.speed)
    }
};

Ant.prototype.elemNext = function(num) {
    num = num || 1;

    if(this.options.dots) this.dotOn(this.currentElement);
    this.currentElement += num;
    if(this.currentElement >= this.dotsVisible) this.currentElement = 0;
    if(this.options.dots) this.dotOff(this.currentElement);

    if(!this.options.loop) {  // сдвиг влево без цикла
        this.currentOffset -= this.elemWidth*num;
        this.crslList.style.marginLeft = this.currentOffset + 'px';
        if(this.currentElement == this.dotsVisible-1) {
            this.rightArrow.style.display = 'none'; this.touchNext = false
        }
        this.leftArrow.style.display = 'block'; this.touchPrev = true
    }
    else {                    // сдвиг влево с циклом
        let elm, buf, this$ = this;
        this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
        this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
        setTimeout(function() {
            this$.crslList.style.cssText = 'transition:none;';
            for(let i=0; i<num; i++) {
                elm = this$.crslList.firstElementChild;
                buf = elm.cloneNode(true); this$.crslList.appendChild(buf);
                this$.crslList.removeChild(elm)
            };
            this$.crslList.style.marginLeft = '0px'
        }, this.options.speed)
    }
};

Ant.prototype.dotOn = function(num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
};

Ant.prototype.dotOff = function(num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
};

Ant.initialize = function(that) {

    // Constants
    that.elemCount = that.crslElements.length; // Количество элементов
    that.dotsVisible = that.elemCount;         // Число видимых точек
    let elemStyle = window.getComputedStyle(that.crslElemFirst);
    that.elemWidth = that.crslElemFirst.offsetWidth +  // Ширина элемента (без margin)
        parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);

    // Variables
    that.currentElement = 0; that.currentOffset = 0;
    that.touchPrev = true; that.touchNext = true;
    let xTouch, yTouch, xDiff, yDiff, stTime, mvTime;
    let bgTime = getTime();

    // Functions
    function getTime() {
        return new Date().getTime();
    };
    function setAutoScroll() {
        that.autoScroll = setInterval(function() {
            let fnTime = getTime();
            if(fnTime - bgTime + 10 > that.options.interval) {
                bgTime = fnTime; that.elemNext()
            }
        }, that.options.interval)
    };

    // Start initialization
    if(that.elemCount <= that.options.elemVisible) {   // Отключить навигацию
        that.options.auto = false; that.options.touch = false;
        that.options.arrows = false; that.options.dots = false;
        that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
    };

    if(!that.options.loop) {       // если нет цикла - уточнить количество точек
        that.dotsVisible = that.elemCount - that.options.elemVisible + 1;
        that.leftArrow.style.display = 'none';  // отключить левую стрелку
        that.touchPrev = false;    // отключить прокрутку прикосновением вправо
        that.options.auto = false; // отключить автопркрутку
    }
    else if(that.options.auto) {   // инициализация автопрокруки
        setAutoScroll();
        // Остановка прокрутки при наведении мыши на элемент
        that.crslList.addEventListener('mouseenter', function() {
            clearInterval(that.autoScroll)
        }, false);
        that.crslList.addEventListener('mouseleave', setAutoScroll, false)
    };

    if(that.options.touch) {   // инициализация прокрутки прикосновением
        that.crslList.addEventListener('touchstart', function(e) {
            xTouch = parseInt(e.touches[0].clientX);
            yTouch = parseInt(e.touches[0].clientY);
            stTime = getTime()
        }, false);
        that.crslList.addEventListener('touchmove', function(e) {
            if(!xTouch || !yTouch) return;
            xDiff = xTouch - parseInt(e.touches[0].clientX);
            yDiff = yTouch - parseInt(e.touches[0].clientY);
            mvTime = getTime();
            if(Math.abs(xDiff) > 15 && Math.abs(xDiff) > Math.abs(yDiff) && mvTime - stTime < 75) {
                stTime = 0;
                if(that.touchNext && xDiff > 0) {
                    bgTime = mvTime; that.elemNext()
                }
                else if(that.touchPrev && xDiff < 0) {
                    bgTime = mvTime; that.elemPrev()
                }
            }
        }, false)
    };

    if(that.options.arrows) {  // инициализация стрелок
        if(!that.options.loop) that.crslList.style.cssText =
            'transition:margin '+that.options.speed+'ms ease;';
        that.leftArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > that.options.speed) {
                bgTime = fnTime; that.elemPrev()
            }
        }, false);
        that.rightArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > that.options.speed) {
                bgTime = fnTime; that.elemNext()
            }
        }, false)
    }
    else {
        that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none'
    };

    if(that.options.dots) {  // инициализация индикаторных точек
        let sum = '', diffNum;
        for(let i=0; i<that.dotsVisible; i++) {
            sum += '<span class="ant-dot"></span>'
        };
        that.indicatorDots.innerHTML = sum;
        that.indicatorDotsAll = that.crslRoot.querySelectorAll('span.ant-dot');
        // Назначаем точкам обработчик события 'click'
        for(let n=0; n<that.dotsVisible; n++) {
            that.indicatorDotsAll[n].addEventListener('click', function() {
                diffNum = Math.abs(n - that.currentElement);
                if(n < that.currentElement) {
                    bgTime = getTime(); that.elemPrev(diffNum)
                }
                else if(n > that.currentElement) {
                    bgTime = getTime(); that.elemNext(diffNum)
                }
                // Если n == that.currentElement ничего не делаем
            }, false)
        };
        that.dotOff(0);  // точка[0] выключена, остальные включены
        for(let i=1; i<that.dotsVisible; i++) {
            that.dotOn(i)
        }
    }
};

new Ant();*/