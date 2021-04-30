const card_btns = document.querySelectorAll(".facts-card-btn");

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

card_btns.forEach(btn => btn.addEventListener('click',btnClick))