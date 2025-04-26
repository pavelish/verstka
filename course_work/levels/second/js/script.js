let zones = [document.getElementById("blue-zone"), document.getElementById("red-zone"), document.getElementById('green-zone')];
function makeRandomPosition() {
    let parts = [];
    for (let i = 0; i < 9; i++) {
        parts.push(document.getElementById(`prt_${i + 1}`))
    }
    frame_rect = window.document.getElementById('l2-container').getBoundingClientRect();
    for (let i = 0; i < parts.length; i++) {
        parts[i].style.left = `${getRandomInt(frame_rect.width - 80, 0)}px`;
        parts[i].style.top = `${getRandomInt(frame_rect.height - 180, 0)}px`;
    }
}


class drag_and_drop {
    selectors = {
        root: '[data-js-dnd]',
    }
    stateClasses = {
        isDragging: 'is-dragging',
    }
    initialState = {
        offsetX: null,
        offsetY: null,
        isDragging: false,
        currentElement: null,
    }
    drug_frame = window.document.getElementById('l2-container');
    constructor() {
        this.state = { ...this.initialState };
        this.bindEvents();
    }

    bindEvents() {
        window.document.addEventListener('pointerdown', (event) => this.onPointerDown(event));
        window.document.addEventListener('pointermove', (event) => this.onPointerMove(event));
        window.document.addEventListener('pointerup', () => this.onPointerUp());
    }

    onPointerDown(event) {
        if (!event.target.matches(this.selectors.root)) {
            return;
        }
        this.state = {
            isDragging: true,
            currentElement: event.target,
            offsetX: event.clientX - event.target.getBoundingClientRect().left + this.drug_frame.getBoundingClientRect().left,
            offsetY: event.clientY - event.target.getBoundingClientRect().top + this.drug_frame.getBoundingClientRect().top,
        };
    }
    onPointerMove(event) {
        if (!this.state.isDragging) {
            return;
        }
        let x_tmp = event.pageX - this.state.offsetX;
        let y_tmp = event.pageY - this.state.offsetY;

        let drugged_elem_rect = this.state.currentElement.getBoundingClientRect();
        let drug_frame_rect = this.drug_frame.getBoundingClientRect();

        if (!((drug_frame_rect.left > drugged_elem_rect.left && x_tmp + drugged_elem_rect.left < drug_frame_rect.left) ||
            (drug_frame_rect.width < drugged_elem_rect.right && x_tmp + drugged_elem_rect.width > drug_frame_rect.width))) {
            this.state.currentElement.style.left = `${x_tmp}px`;
        }
        if (!((drug_frame_rect.top > drugged_elem_rect.top && y_tmp + drugged_elem_rect.top < drug_frame_rect.top) ||
            (drug_frame_rect.height < drugged_elem_rect.bottom && y_tmp + drugged_elem_rect.height > drug_frame_rect.height))) {
            this.state.currentElement.style.top = `${y_tmp}px`;
        }
        if (y_tmp > 350) {
            this.state.currentElement.classList.add('min-size');
        }
        else {
            this.state.currentElement.classList.remove('min-size');
        }

    }
    onPointerUp() {
        this.state = { ...this.initialState };
    }
}


function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}


function make_timer() {
    if (time <= -1) {
        return;
    }
    if (time <= 0) {
        on_end();
    }
    let txt = document.createTextNode(`${parseInt(time / 60)}:${(time % 60).toString().padStart(2, '0')}`);
    let timer_el = document.getElementById('l2-timer');
    timer_el.textContent = '';
    timer_el.appendChild(txt);
    time--;
}
function check_result() {
    let tmp;
    for (let i = 0; i < 3; i++) {
        tmp_zone = zones[i].getBoundingClientRect();
        for (let j = 0; j < 3; j++) {
            tmp = document.getElementById(`prt_${i * 3 + j + 1}`).getBoundingClientRect();
            if (!(tmp.left > tmp_zone.left && tmp.right < tmp_zone.right && tmp.top > tmp_zone.top)) {
                return false;
            }
        }
    }
    return true;
}

function start_func() {
    let cnt = document.getElementById('l2-container');
    cnt.classList.remove('selected-green');
    cnt.classList.remove('selected-red');
    checkButton.disabled = false;
    let tmp_mtr;
    for (let i = 0; i < 9; i++) {
        tmp_mtr = document.getElementById(`prt_${i + 1}`);
        tmp_mtr.classList.remove('min-size');
    }
    let el = document.getElementById('l2-result');
    el.innerHTML = "";
    makeRandomPosition();
    time = 17 - level * 5 > 0 ? 12 - level * 5 : 2;
}

function on_end() {
    checkButton.disabled = true;
    let result_msg = document.getElementById('l2-result');
    let txt;
    let cnt = document.getElementById('l2-container');
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
        txt = document.createTextNode('R сожалению, ты проиграл, давай попробуем сначала');
    }
    result_msg.appendChild(txt);
    setTimeout(start_func, 4000);
}

function finish() {
    document.location = '../../index.html';
}

dnd = new drag_and_drop();


let level = 0;
let time;
let checkButton = document.getElementById('checkLevel2Btn');
checkButton.addEventListener('click', on_end);
let deleteButton = document.getElementById('endLevel2Btn');
deleteButton.addEventListener('click', finish);
setInterval(make_timer, 1000);

start_func();

