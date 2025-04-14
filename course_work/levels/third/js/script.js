function getRandomQuestion() {
    const red = parseInt(Math.random() * 6);
    const blue = parseInt(Math.random() * 6);
    return [red, blue];
}
function getRandomTextQuestion() {
    let el = document.getElementById('l3-question');
    txt = `выбирете ${blue} синих матрешек и ${red} красных`;
    el.appendChild(document.createTextNode(txt));
}

function generator() {
    let number = parseInt(Math.random() * 6);
    let container = window.document.getElementById('l3-container');
    let frame_rect = container.getBoundingClientRect();
    let mtr = document.createElement('div');
    mtr.classList.add('mtr-container');
    if (number > 2) {
        mtr.classList.add('blue');
    }
    else {
        mtr.classList.add('red');
    }
    mtr.style.left = `${getRandomInt(frame_rect.width + frame_rect.left - 250, frame_rect.left)}px`;
    mtr.style.top = `${getRandomInt(frame_rect.height + frame_rect.top - 250, frame_rect.top)}px`;
    mtr.addEventListener('click', (event) => count(event));
    let img = document.createElement('img');
    img.setAttribute('src', matryoshkalist[number]['img']);
    img.classList.add('blink');
    mtr.appendChild(img);
    container.appendChild(mtr);
    setTimeout(() => mtr.remove(), 5000 - level * 1000);
}

function count(event) {
    if (event.target.classList.contains('blue')) {
        blue--;
    }
    else {
        red--;
    }
}

function check_result() {
    if (blue == 0 && red == 0) {
        return true;
    }
    else {
        return false;
    }
}
function make_timer() {
    if (time <= -1) {
        return;
    }
    if (time <= 0) {
        on_end();
    }
    let txt = document.createTextNode(`${parseInt(time / 60)}:${(time % 60).toString().padStart(2, '0')}`);
    let timer_el = document.getElementById('l3-timer');
    timer_el.textContent = '';
    timer_el.appendChild(txt);
    time--;
}

function start_func() {

    checkButton.disabled = false;
    let tmp = getRandomQuestion();
    let el_q = document.getElementById('l3-question');
    el_q.innerHTML = '';
    el_q = document.getElementById('l3-result');
    el_q.innerHTML = '';
    blue = tmp[0];
    red = tmp[1];
    getRandomTextQuestion();
    time = 38 - level * 5 > 0 ? 38 - level * 5 : 8;
    setInterval(generator, 3000 - level * 1000);
}

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}
function on_end() {
    checkButton.disabled = true;
    let result_msg = document.getElementById('l3-result');
    let txt;
    if (check_result()) {
        txt = document.createTextNode('Молодец, ты победил');
        let rating = JSON.parse(localStorage.getItem('rating'));
        rating.find((item) => item.name == localStorage.getItem('user'))['scores'] += 3 * (level + 1);
        level++;
        localStorage.setItem('rating', JSON.stringify(rating));
        if (level > 2) {
            txt = document.createTextNode('Игра пройдена, теперь ты можешь пройти на следующий уровень');
            rating.find((item) => item.name == localStorage.getItem('user'))['level']++;
            localStorage.setItem('rating', JSON.stringify(rating));
        }
    }
    else {
        txt = document.createTextNode('К сожалению, ты проиграл, давай попробуем сначала');
    }
    result_msg.appendChild(txt);
    setTimeout(start_func, 4000);
}
function finish() {
    document.location = '../../index.html';
}

let level = 0;
let time;
let blue;
let red;

let checkButton = document.getElementById('checkLevel3Btn');
checkButton.addEventListener('click', on_end);
let deleteButton = document.getElementById('endLevel3Btn');
deleteButton.addEventListener('click', finish);
setInterval(make_timer, 1000);

start_func();
