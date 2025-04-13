function makeRandomPosition() {
    prt_1 = window.document.getElementById('prt_1');
    prt_2 = window.document.getElementById('prt_2');
    prt_3 = window.document.getElementById('prt_3');
    prt_4 = window.document.getElementById('prt_4');
    frame_rect = window.document.getElementById('box_to_drug').getBoundingClientRect();
    let parts = [prt_1, prt_2, prt_3, prt_4];
    for (let i = 0; i < 4; i++) {
        parts[i].style.left = `${getRandomInt(frame_rect.width + frame_rect.left - 144, frame_rect.left)}px`;
        parts[i].style.top = `${getRandomInt(frame_rect.height + frame_rect.top - 144, frame_rect.top)}px`;
        parts[i].style.transform = `rotate(${getRandomInt(3, 0) * 90}deg)`;
    }


}
function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}

makeRandomPosition();



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
        home_element: window.document.getElementById('box_to_drug'),
    }
    drug_frame = window.document.getElementById('box_to_drug')
    constructor() {
        this.state = { ...this.initialState };
        this.bindEvents();
    }

    bindEvents() {
        window.document.addEventListener('pointerdown', (event) => this.onPointerDown(event));
        window.document.addEventListener('pointermove', (event) => this.onPointerMove(event));
        window.document.addEventListener('pointerup', () => this.onPointerUp());
        window.document.addEventListener('dblclick', (event) => this.onClickRotate(event));
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
        }
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
            this.state.currentElement.style.left = `${x_tmp}px`;
        }
        if (!((drug_frame_rect.top > drugged_elem_rect.top && y_tmp < drug_frame_rect.top + window.scrollY) ||
            (drug_frame_rect.bottom < drugged_elem_rect.bottom && y_tmp + drugged_elem_rect.height > drug_frame_rect.bottom + window.scrollY))) {
            this.state.currentElement.style.top = `${y_tmp}px`;
        }

    }
    onPointerUp() {
        this.state = { ...this.initialState };
        this.checkResult();
    }

    onClickRotate(event) {
        if (!event.target.matches(this.selectors.root)) {
            return;
        }
        let tmp_rot = event.target.style.transform;
        if (tmp_rot) {
            tmp_rot = parseInt(tmp_rot.split('(')[1].split('d')[0]);
        }
        else {
            tmp_rot = 0;
        }
        tmp_rot = (tmp_rot + 90) % 360;
        event.target.style.transform = `rotate(${tmp_rot}deg)`;
    }

    checkResult() {
        let prt1_rect = document.getElementById('prt_1').getBoundingClientRect();
        let prt2_rect = document.getElementById('prt_2').getBoundingClientRect();
        let prt3_rect = document.getElementById('prt_3').getBoundingClientRect();
        let prt4_rect = document.getElementById('prt_4').getBoundingClientRect();
        let check = Math.abs(prt2_rect.left - prt1_rect.right) < 5 &&
            Math.abs(prt2_rect.bottom - prt4_rect.top) < 5 &&
            Math.abs(prt1_rect.bottom - prt3_rect.top) < 5;
        let win_mas = window.document.getElementById('win-massege');
        let sunny = window.document.getElementById('sun');
        if (check) {
            win_mas.style.display = 'block';
            win_mas.style.color = 'green';
            win_mas.textContent = "Поздравляем, вы победили!";
            sunny.classList.remove('win-massege');
            sunny.classList.add('win-animation');
        }
        else {
            win_mas.style.display = 'none';
            sunny.classList.remove('win-animation');
        }
    }

}

dnd = new drag_and_drop();


