function getRandomColorQuestion() {
    const arr = ["red", "blue"];
    const chosen = arr[Math.floor(Math.random() * arr.length)];
    const text = (chosen === "red")
        ? "Выберите все КРАСНЫЕ матрёшки"
        : "Выберите все СИНИЕ матрёшки";
    return { color: chosen, text };
}

function generate_mtr_elements(lst) {
    let container = document.getElementById('l1-container');
    for (let i = 0; i < lst.length; i++) {
        let tmp_el = document.createElement('div');
        tmp_el.classList.add('mtr-container');
        let img = document.createElement('img');
        img.setAttribute('src', lst[i]['img']);
        tmp_el.addEventListener('click', (event) => {
            event.target.classList.toggle('selected');
        })
        tmp_el.appendChild(img);
        container.appendChild(tmp_el);
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
    let timer_el = document.getElementById('l1-timer');
    timer_el.textContent = '';
    timer_el.appendChild(txt);
    time--;
}

function check_result() {
    matreshka_list = document.getElementsByClassName('mtr-container');
    let count = 0;
    for (let i = 0; i < matreshka_list.length; i++) {
        if (matreshka_list[i].classList.contains('selected')) {
            if (set[i]['color'] != color) {
                return false;
            }
            else {
                count++;
            }
        }
    }
    if (count == 3) {
        return true;
    }
    return false;
}

function start_func() {
    checkButton.disabled = false;
    document.getElementById('l1-container').innerHTML = '';
    document.getElementById('l1-result').innerHTML = '';
    let question = getRandomColorQuestion();
    color = question["color"];
    let qst_el = window.document.getElementById('l1-question');
    qst_el.innerHTML = '';
    qst_el.appendChild(document.createTextNode(question['text']));
    qst_el.style.color = color;
    set = getRandomSubset(matryoshkalist, matryoshkalist.length);
    generate_mtr_elements(set);
    time = 12 - level * 5 > 0 ? 12 - level * 5 : 2;
}

function on_end() {
    checkButton.disabled = true;
    let result_msg = document.getElementById('l1-result');
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

let level = 0;
let time;
let set;
let color;


let checkButton = document.getElementById('checkLevel1Btn');
checkButton.addEventListener('click', on_end);
let deleteButton = document.getElementById('endLevel1Btn');
deleteButton.addEventListener('click', finish);
setInterval(make_timer, 1000);

start_func();




