
const lat = ['Consuetudo est altera natura', 'Nota bene', 'Nulla calamitas sola', 'Per aspera ad astra', 'Ab extra', 'Ad futuram memoriam', 'Ad hoc'];
const translate = ['Привычка - вторая натура', 'Заметьте хорошо!', 'Беда не приходит одна', 'Через тернии к звёздам', 'Снаружи', 'На долгую память', 'Для данного случая'];
phrase_num = 0;
list_num = 0;
phrase_gen_button = window.document.getElementById('phrase_button_id');
phrase_gen_button.addEventListener('click', phrase_generator);
phrase_repainter_button = window.document.getElementById('repaint_button_id');
phrase_repainter_button.addEventListener('click', phrase_repainter);
phrase_list_generator = window.document.getElementById('make_list_button_id');
phrase_list_generator.addEventListener('click', make_list);

function phrase_generator() {
    if (phrase_num >= lat.length) {
        alert('Фразы закончились');
    }
    else {
        txt = window.document.createTextNode(lat[phrase_num] + ' - ' + translate[phrase_num]);
        phrase_num += 1;
        elem = window.document.createElement('div');
        elem.appendChild(txt);
        if (phrase_num % 2) {
            cls = 'phrase_class1 phrase_class';
        }
        else {
            cls = 'phrase_class2 phrase_class';
        }
        elem.className = cls;
        parent_el = window.document.getElementsByClassName('phrase_container')[0];
        parent_el.appendChild(elem);
    }
}

function phrase_repainter() {
    elem = window.document.getElementsByClassName('phrase_class2');
    for (item of elem) {
        item.classList.add('bold_text')
    }
}

function make_list() {
    aside_el = window.document.getElementById('asd');
    if (list_num == 0) {
        main_list = window.document.createElement('ol');
    }
    else {
        main_list = aside_el.children[0];
    }
    for (i = list_num; i < phrase_num; i++) {
        num_elem = window.document.createElement('li');
        num_elem.appendChild(window.document.createTextNode(lat[i]));
        sublist = window.document.createElement('ul');
        sublist_elem = window.document.createElement('li');
        sublist_elem.appendChild(window.document.createTextNode(translate[i]));
        sublist.appendChild(sublist_elem);
        if (i % 2) {
            num_elem.className = 'phrase_class1_list';
            sublist.className = 'phrase_class1_list';
        }
        else {
            num_elem.className = 'phrase_class2_list';
            sublist.className = 'phrase_class2_list';
        }
        console.log(sublist);
        main_list.appendChild(num_elem);
        main_list.appendChild(sublist);
    }
    if (list_num == 0) {
        aside_el.appendChild(main_list);
    }
    list_num = phrase_num;
}