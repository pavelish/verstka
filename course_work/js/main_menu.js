function make_player_greeting() {
    let greeting;
    if (localStorage.getItem("user") !== null) {
        greeting = `Приветствую тебя, ${localStorage.getItem("user")}`;
    }
    else {
        greeting = "Пожалуйста, зарегистрируйся";
    }
    let el = document.getElementById("nickname-place");
    el.innerHTML = "";
    el.appendChild(document.createTextNode(greeting));
}

function make_rating() {
    let rating = JSON.parse(localStorage.getItem('rating'));
    let el = document.getElementById('rnk');
    el.innerHTML = "";
    if (rating !== null) {
        rating = rating.sort((a, b) => {
            return a['scores'] < b['scores'];
        });

        for (let i = 0; i < rating.length; i++) {
            let tmp_text = `${i + 1}. ${rating[i]['name']} - ${rating[i]['scores']}`;
            let tmp_el = document.createElement('div');
            tmp_el.appendChild(document.createTextNode(tmp_text));
            el.appendChild(tmp_el);
        }


    }
}
function registration() {
    let login_window = document.getElementById("registration");
    login_window.style.display = "flex";
}

function check_registration() {
    if (localStorage.getItem('user') == null) {
        registration();
        return false;
    }
    return true;
}


let login_btn = document.getElementById("login-btn");
login_btn.addEventListener('click', registration);
make_rating();

let l1_btn = document.getElementById("l1-btn");
l1_btn.addEventListener('click', () => {
    if (check_registration()) {
        window.location.href = "levels/first/index.html";
    }
});

let l2_btn = document.getElementById("l2-btn");
l2_btn.addEventListener('click', () => {
    if (!check_registration()) {
        return;
    }
    user_lvl = JSON.parse(localStorage.getItem('rating')).find((item) => item.name == localStorage.getItem('user'))['level'];
    if (user_lvl > 1) {
        window.location.href = "levels/second/index.html";
    }
    else {
        alert("Не торопись, сначала пройди предыдущий уровень");
    }

});

let l3_btn = document.getElementById("l3-btn");
l3_btn.addEventListener('click', () => {
    if (!check_registration()) {
        return;
    };
    user_lvl = JSON.parse(localStorage.getItem('rating')).find((item) => item.name == localStorage.getItem('user'))['level'];
    if (user_lvl > 2) {
        window.location.href = "levels/third/index.html";
    }
    else {
        alert("Не торопись, сначала пройди предыдущий уровень");
    }
});

function get_name() {
    let name = document.getElementById('lgn-inpt').value;
    if (name === "") {
        return;
    }
    localStorage.setItem('user', name);
    let tmp_rating = localStorage.getItem('rating') != null ? JSON.parse(localStorage.getItem('rating')) : [];
    if (tmp_rating.find((item) => (item['name'] == name)) == undefined) {
        if (name !== "root") {
            tmp_rating.push({ 'name': name, 'level': 1, 'scores': 0 });
        }
        else {
            tmp_rating.push({ 'name': name, 'level': 3, 'scores': 0 });
        }
        localStorage.setItem('rating', JSON.stringify(tmp_rating))
    }
    let reg_wnd = document.getElementById('registration');
    reg_wnd.style.display = 'none';
    make_player_greeting();
    make_rating();
}

let reg_btn = document.getElementById('reg-btn');
let inpt_el = document.getElementById('lgn-inpt');
reg_btn.addEventListener('click', get_name);
inpt_el.addEventListener('change', get_name);

let back_btn = document.getElementById('back-btn');
back_btn.addEventListener('click', () =>
    (document.getElementById('registration').style.display = 'none')
);

make_player_greeting();


