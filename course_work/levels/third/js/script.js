const colors = ['red', 'green', 'blue'];
function getRandomTextQuestion() {
    let el = document.getElementById('l3-question');
    let color = colors[getRandomInt(3)];
    let num_clk = getRandomInt(20, 5);
    el.appendChild(document.createTextNode(`Поймайте ${num_clk} матрешек`));
    console.log(color);
    el.style.color = color;
    return [color, num_clk];
}
function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generator() {
    let number = getRandomInt(9);
    let container = window.document.getElementById('l3-container');
    let frame_rect = container.getBoundingClientRect();
    let mtr = document.createElement('div');
    mtr.classList.add('mtr-container');
    if (number > 5) {
        mtr.classList.add('green');
    }
    else if (number > 2) {
        mtr.classList.add('blue');
    }
    else {
        mtr.classList.add('red');
    }
    mtr.style.left = `${getRandomInt(frame_rect.width - 80, 0)}px`;
    mtr.style.top = `${getRandomInt(frame_rect.height - 80, 0)}px`;
    mtr.addEventListener('dblclick', (event) => count(event));
    let img = document.createElement('img');
    img.setAttribute('src', matryoshkalist[number]['img']);
    img.classList.add('blink');
    mtr.appendChild(img);
    container.appendChild(mtr);
    setTimeout(() => mtr.remove(), 5000 - level * 1000);
}

function count(event) {
    if (event.target.classList.contains(color)) {
        num_clk--;
        event.target.style.display = 'none';
        if (num_clk === 0) {
            on_end();
        }
    }
    else {
        num_clk += 3;
        event.target.classList.add('wrong-clicked');

    }
    let el = document.getElementById('l3-question')
    el.innerHTML = '';
    el.appendChild(document.createTextNode(`Поймайте ${num_clk} матрешек`))
}

function check_result() {
    if (num_clk === 0) {
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
    let cnt = document.getElementById('l3-container');
    cnt.classList.remove('selected-green');
    cnt.classList.remove('selected-red');
    checkButton.disabled = false;
    let el_q = document.getElementById('l3-question');
    el_q.innerHTML = '';
    let tmp = getRandomTextQuestion();
    el_q = document.getElementById('l3-result');
    el_q.innerHTML = '';
    color = tmp[0];
    num_clk = tmp[1];
    time = 38 - level * 5 > 0 ? 38 - level * 5 : 8;
    console.log(color);
    intrv = setInterval(generator, 1000);
}

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}
function on_end() {
    checkButton.disabled = true;
    let result_msg = document.getElementById('l3-result');
    let txt;
    let cnt = document.getElementById('l3-container');
    if (check_result()) {
        cnt.classList.add('selected-green');
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
        cnt.classList.add('selected-red');
        txt = document.createTextNode('К сожалению, ты проиграл, давай попробуем сначала');
    }
    cnt.innerHTML = '';
    clearInterval(intrv);
    result_msg.appendChild(txt);
    setTimeout(start_func, 4000);
}
function finish() {
    document.location = '../../index.html';
}

let intrv
let level = 0;
let time;
let color;
let num_clk;

let checkButton = document.getElementById('checkLevel3Btn');
checkButton.addEventListener('click', on_end);
let deleteButton = document.getElementById('endLevel3Btn');
deleteButton.addEventListener('click', finish);
setInterval(make_timer, 1000);

start_func();
