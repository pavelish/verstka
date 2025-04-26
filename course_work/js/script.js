const matryoshkalist = [
    { name: "Матрешка R1", img: "../../img/red_1.png", color: "red" },
    { name: "Матрешка R2", img: "../../img/red_2.png", color: "red" },
    { name: "Матрешка R3", img: "../../img/red_3.png", color: "red" },
    { name: "Матрешка B1", img: "../../img/blue_1.png", color: "blue" },
    { name: "Матрешка B2", img: "../../img/blue_2.png", color: "blue" },
    { name: "Матрешка B3", img: "../../img/blue_3.png", color: "blue" },
    { name: "Матрешка G1", img: "../../img/green_1.png", color: "green" },
    { name: "Матрешка G2", img: "../../img/green_2.png", color: "green" },
    { name: "Матрешка G3", img: "../../img/green_3.png", color: "green" }
];

function getRandomSubset(arr, count) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
}

function arraysAreEqual(a, b) {
    if (a.length !== b.length) return false;
    const sA = a.slice().sort();
    const sB = b.slice().sort();
    for (let i = 0; i < sA.length; i++) {
        if (sA[i] !== sB[i]) return false;
    }
    return true;
}



