// Sélectionne les éléments HTML
const clickerBtn = document.getElementById('clicker-btn');
const clickCountEl = document.getElementById('click-count');
const clickRateEl = document.getElementById('click-rate');
const levelsContainer = document.getElementById('levels-container');
const resetBtn = document.getElementById('reset-btn');

// Variables globales
let clickCount = 0;
let clickRate = 0;
let levelsData = [];
let totalCost = 0;

// Affiche les niveaux dans le DOM
function displayLevels() {
    levelsContainer.innerHTML = '';

    levelsData.forEach(level => {
        const levelBtn = document.createElement('button');
        levelBtn.innerText = `${level.label} (Coût: ${level.costInClick})`;
        levelBtn.classList.add('bg-blue-500', 'text-white', 'p-2', 'm-2', 'rounded');

        // Vérifie si le joueur a suffisamment de points pour acheter le niveau
        if (clickCount < level.costInClick) {
            levelBtn.setAttribute('disabled', true);
            levelBtn.classList.add('opacity-50');
        } else {
            // Ajoute un événement de clic au bouton pour acheter le niveau
            levelBtn.addEventListener('click', () => {
                clickCount -= level.costInClick;
                clickCountEl.innerText = clickCount;

                clickRate += level.ratepersecond;
                clickRateEl.innerText = clickRate;

                level.costInClick = Math.ceil(level.costInClick * 1.2);
                levelBtn.innerText = `${level.label} (Coût: ${level.costInClick})`;

                // Désactive les boutons pour les niveaux que le joueur ne peut pas acheter
                levelsData.forEach(otherLevel => {
                    const otherLevelBtn = document.getElementById(`level-${otherLevel.id}`);
                    if (clickCount < otherLevel.costInClick) {
                        otherLevelBtn.setAttribute('disabled', true);
                        otherLevelBtn.classList.add('opacity-50');
                    } else {
                        otherLevelBtn.removeAttribute('disabled');
                        otherLevelBtn.classList.remove('opacity-50');
                    }
                });
            });
        }

        levelBtn.id = `level-${level.id}`;
        levelsContainer.appendChild(levelBtn);

    });
}

// Charge les données des niveaux depuis le fichier JSON
fetch('level.json')
    .then(response => response.json())
    .then(data => {
        levelsData = data;
        displayLevels();
    });

// Incrémente le compteur de clics et met à jour le DOM
clickerBtn.addEventListener('click', () => {
    clickCount++;
    clickCountEl.innerText = clickCount;
});

// Reset le compteur de clics et de clics par seconde
resetBtn.addEventListener('click', () => {
    clickCount = 0;
    clickRate = 0;
    clickCountEl.innerText = clickCount;
    clickRateEl.innerText = clickRate;

    // Réinitialise les coûts des niveaux
    levelsData.forEach(level => {
        level.costInClick = level.initialCostInClick;
        const levelBtn = document.getElementById(`level-${level.id}`);
        levelBtn.innerText = `${level.label} (Coût: ${level.costInClick})`;
        levelBtn.removeAttribute('disabled');
        levelBtn.classList.remove('opacity-50');
    });

    // Réaffiche les niveaux dans le DOM
    displayLevels();
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