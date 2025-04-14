const matryoshkalist = [
    { name: "Матрешка R1", img: "../../img/red_1.jpeg", color: "red" },
    { name: "Матрешка R2", img: "../../img/red_2.jpeg", color: "red" },
    { name: "Матрешка R3", img: "../../img/red_3.jpeg", color: "red" },
    { name: "Матрешка B1", img: "../../img/blue_1.jpeg", color: "blue" },
    { name: "Матрешка B2", img: "../../img/blue_2.jpeg", color: "blue" },
    { name: "Матрешка B3", img: "../../img/blue_3.jpeg", color: "blue" }
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



