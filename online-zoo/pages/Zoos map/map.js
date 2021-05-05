let active_btn = document.querySelector('.Gorilla-icon');
const icons = document.querySelectorAll('.map-icon');
const geo_card = document.querySelector(".geo-card");
const geo_card_img = geo_card.querySelector(".geo-card-img");
const geo_card_h3 = geo_card.querySelector('.geo-h3');
const geo_card_btn = geo_card.querySelector('.geo-link');
const geo_card_text = geo_card.querySelector('.geo-card-text');
const GORILLA_TEXT = 'The broadcast comes from the Democratic Republic of the Congo in a forest area. Watch their life and life together';
const EAGLE_TEXT = 'The broadcast is from an island near Los Angeles. Watch their real life.';
const ALLIGATOR_TEXT = 'The broadcast is from St. Augustine\'s Alligator Farm in Florida. Watch their real life.'
const PANDA_TEXT = 'The broadcast is from Shenshuping Gengda Panda Center in China\'s Wolong Valley. Watch their real life.'

const changeCard = (ev) => {
    const current_btn = ev.currentTarget;
    let animal = current_btn.classList[1].split('-')[0].toLowerCase();
    current_btn.classList.add('icon-active');
    try {
        active_btn.classList.remove('icon-active');
    }
  catch (e) {}
    geo_card.classList.remove('visual-hidden')
    active_btn = ev.currentTarget;
    geo_card_img.src =`../../assets/images/${animal}-watch.png`;
    let splitted =  animal.split('')
    splitted[0] = splitted[0].toUpperCase()
    animal = splitted.join('')
    geo_card_btn.href = `../../pages/Zoos%20Translation/${animal}.html`
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
    try {
        geo_card.classList.remove('visual-hidden')
    }
    catch (e) {}
}
window.onclick = function(event) {
    let flag = true
    try{
       if(event.target.parentElement.parentElement.classList.contains('main')
           ||event.target.parentElement.parentElement.classList.contains('map-icon'))
           flag=false
    }
    catch (e) {}

    if (event.target!==active_btn  && event.target !==geo_card && flag) {
       active_btn.classList.remove('icon-active');
       geo_card.classList.add('visual-hidden')
    }
}
icons.forEach(icon => icon.addEventListener('click',changeCard))