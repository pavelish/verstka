function makeRandomPosition() {
    prt_1 = window.document.getElementById('prt_1');
    prt_2 = window.document.getElementById('prt_2');
    prt_3 = window.document.getElementById('prt_3');
    prt_4 = window.document.getElementById('prt_4');
    prt_5 = window.document.getElementById('prt_5');
    prt_6 = window.document.getElementById('prt_6');
    frame_rect = window.document.getElementById('l2-container').getBoundingClientRect();
    let parts = [prt_1, prt_2, prt_3, prt_4, prt_5, prt_6];
    for (let i = 0; i < 6; i++) {
        parts[i].style.left = `${getRandomInt(frame_rect.width + frame_rect.left - 350, frame_rect.left)}px`;
        parts[i].style.top = `${getRandomInt(frame_rect.height + frame_rect.top - 350, frame_rect.top)}px`;
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
    drug_frame = window.document.getElementById('l2-container')
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
            offsetX: event.clientX - event.target.getBoundingClientRect().left,
            offsetY: event.clientY - event.target.getBoundingClientRect().top,
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

        if (!((drug_frame_rect.left > drugged_elem_rect.left && x_tmp < drug_frame_rect.left) ||
            (drug_frame_rect.right < drugged_elem_rect.right && x_tmp + drugged_elem_rect.width > drug_frame_rect.right))) {
            this.state.currentElement.style.left = `${x_tmp - 150}px`;
        }
        if (!((drug_frame_rect.top > drugged_elem_rect.top && y_tmp < drug_frame_rect.top + window.scrollY) ||
            (drug_frame_rect.bottom < drugged_elem_rect.bottom && y_tmp + drugged_elem_rect.height > drug_frame_rect.bottom + window.scrollY))) {
            this.state.currentElement.style.top = `${y_tmp - 150}px`;
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
    prt_1 = window.document.getElementById('prt_1');
    prt_2 = window.document.getElementById('prt_2');
    prt_3 = window.document.getElementById('prt_3');
    prt_4 = window.document.getElementById('prt_4');
    prt_5 = window.document.getElementById('prt_5');
    prt_6 = window.document.getElementById('prt_6');
    let blue = [prt_1, prt_2, prt_3];
    let red = [prt_4, prt_5, prt_6];
    for (let i = 0; i < blue.length; i++) {
        let left = parseInt(blue[i].style.left.split('p')[0]);
        let top = parseInt(blue[i].style.top.split('p')[0]);
        if (!(left > 600 && left < 700 && top > 700 && top < 800)) {
            return false;
        }
    }
    for (let i = 0; i < red.length; i++) {
        let left = parseInt(red[i].style.left.split('p')[0]);
        let top = parseInt(red[i].style.top.split('p')[0]);
        if (!(left > 0 && left < 100 && top > 700 && top < 800)) {
            return false;
        }
    }
    return true;

}

function start_func() {
    checkButton.disabled = false;
    makeRandomPosition();
    time = 17 - level * 5 > 0 ? 12 - level * 5 : 2;
}

function on_end() {
    checkButton.disabled = true;
    let result_msg = document.getElementById('l2-result');
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

