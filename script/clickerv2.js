// Sélectionne les éléments HTML
const clickerBtn = document.getElementById('clicker-btn');
const clickCountEl = document.getElementById('click-count');
const clickRateEl = document.getElementById('click-rate');
const levelsContainer = document.getElementById('levels-container');

// Variables globales
let clickCount = 0;
let clickRate = 0;
let levelsData = [];

// Charge les données des niveaux depuis le fichier JSON
fetch('level.json')
    .then(response => response.json())
    .then(data => {
        levelsData = data;
        displayLevels();
    });

// Affiche les niveaux dans le DOM
function displayLevels() {
    levelsContainer.innerHTML = '';

    levelsData.forEach(level => {
        const levelBtn = document.createElement('button');
        levelBtn.innerText = `${level.label} (Coût: ${level.costInClick})`;
        levelBtn.classList.add('level-btn');

        levelBtn.addEventListener('click', () => {
            if (clickCount >= level.costInClick) {
                clickCount -= level.costInClick;
                clickCountEl.innerText = clickCount;

                clickRate += level.ratepersecond;
                clickRateEl.innerText = clickRate;

                level.costInClick = Math.ceil(level.costInClick * 1.5);
                levelBtn.innerText = `${level.label} (Coût: ${level.costInClick})`;

                setInterval(() => {
                    clickCount += clickRate;
                    clickCountEl.innerText = clickCount;
                }, 1000);
            }
        });

        levelsContainer.appendChild(levelBtn);
    });
}

// Incrémente le compteur de clics et met à jour le DOM
clickerBtn.addEventListener('click', () => {
    clickCount++;
    clickCountEl.innerText = clickCount;
});

// Vérifie si des données sont stockées en local storage et les utilise si c'est le cas
if (localStorage.getItem('clickCount')) {
    clickCount = parseInt(localStorage.getItem('clickCount'));
    clickCountEl.innerText = clickCount;
}

if (localStorage.getItem('clickRate')) {
    clickRate = parseInt(localStorage.getItem('clickRate'));
    clickRateEl.innerText = clickRate;
}

// Sauvegarde les données en local storage à chaque seconde
setInterval(() => {
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('clickRate', clickRate);
}, 1000);
