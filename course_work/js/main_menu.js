function make_rating() {
    let rating = JSON.parse(localStorage.getItem('rating'));
    let el = document.getElementById('rnk')
    if(rating != null){
    rating = rating.sort((a, b) => {
        return a['scores'] < b['scores'];
    });
    for (let i = 0; i < rating.length; i++) {
        let tmp_text = `${rating[i]['name']} - ${rating[i]['scores']}`;
        let tmp_el = document.createElement('div');
        tmp_el.appendChild(document.createTextNode(tmp_text));
        el.appendChild(tmp_el);

    }
    }
}
function registration() {
    let name = prompt("введите свое имя", "example_name");
    if (name != null) {
        localStorage.setItem('user', name);
    }
    let user_mp = localStorage.getItem('rating') != null ? JSON.parse(localStorage.getItem('rating')) : [];
    if (user_mp.find((item) => item.name == name) == undefined) {
        if (name != "root") {
            user_mp.push({ 'name': name, 'level': 1, 'scores': 0 });
        }
        else {
            user_mp.push({ 'name': name, 'level': 3, 'scores': 0 });
        }
    }
    localStorage.setItem('rating', JSON.stringify(user_mp));
}
function check_registration() {
    if (localStorage.getItem('user') === null) {
        registration();
    }
}

let login_btn = document.getElementById("login-btn");
login_btn.addEventListener('click', registration);
make_rating();

let l1_btn = document.getElementById("l1-btn");
l1_btn.addEventListener('click', () => {
    check_registration();
    window.location.href = "levels/first/index.html";
});

let l2_btn = document.getElementById("l2-btn");
l2_btn.addEventListener('click', () => {
    check_registration();
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
    check_registration();
    user_lvl = JSON.parse(localStorage.getItem('rating')).find((item) => item.name == localStorage.getItem('user'))['level'];
    if (user_lvl > 2) {
        window.location.href = "levels/third/index.html";
    }
    else {
        alert("Не торопись, сначала пройди предыдущий уровень");
    }
});


