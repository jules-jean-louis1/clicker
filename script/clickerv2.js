// Récupération des éléments du DOM
const clickCountEl = document.getElementById("click-count");
const clickerBtn = document.getElementById("clicker-btn");
const resetBtn = document.getElementById("reset-btn");
const clickRateEl = document.getElementById("click-rate");
const levelsContainer = document.getElementById("levels-container");

// Variables de jeu
let clickCount = 0;
let clickRate = 0;
let clickInterval;
let levels = [];

// Fonction pour mettre à jour l'affichage
function updateDisplay() {
// Mise à jour du nombre de clics
    clickCountEl.textContent = Math.floor(clickCount);

// Mise à jour du taux de clics par seconde
    clickRateEl.textContent = Math.floor(clickRate);

// Mise à jour des boutons de niveau
    levels.forEach((level) => {
        const levelBtn = document.getElementById(`level-${level.id}`);
        if (clickCount >= level.costInClick) {
            levelBtn.disabled = false;
            levelBtn.classList.remove("opacity-50");
        } else {
            levelBtn.disabled = true;
            levelBtn.classList.add("opacity-50");
        }
        // Enregistrement du prix du niveau dans le localStorage
        localStorage.setItem(`level-${level.id}-cost`, level.costInClick);
    });

// Sauvegarde des valeurs dans localStorage
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('clickRate', clickRate);



}
function updateTitle() {
    document.title = `Clics: ${Math.floor(clickCount)}`;
}
// Fonction pour ajouter un clic
function addClick() {
    clickCount++;
    updateTitle();
    updateDisplay();
}

// Fonction pour acheter un niveau
function buyLevel(level) {
    if (clickCount >= level.costInClick) {
        clickCount -= level.costInClick;
        clickRate += level.ratepersecond;
        level.count++; // incrémenter le nombre de fois que le niveau a été acheté
        level.costInClick = Math.round(level.costInClick * 1.2);// doubler le coût en clic
        const levelBtn = document.getElementById(`level-${level.id}`);
        levelBtn.textContent = `${level.label} (${level.ratepersecond}/s) - ${level.costInClick} clicks`;
        // mettre à jour le texte du bouton avec le nouveau coût en clic
        updateDisplay();
    }
}

// Fonction pour initialiser le jeu
function init() {
// Chargement des niveaux à partir du fichier JSON
    fetch("level.json")
        .then((response) => response.json())
        .then((data) => {
            levels = data;
            // Création des boutons de niveau
            levels.forEach((level) => {
                const divBtn =document.createElement("div");
                const levelBtn = document.createElement("button");
                const levelBtnLabel = document.createElement("h2");
                const levelBtnCost = document.createElement("p");

                divBtn.classList.add("w-1/4", "px-2", "mb-4");
                levelBtn.classList.add("text-white", "py-2", "px-4", "rounded", "w-full");
                levelBtnLabel.textContent = level.label;
                levelBtnCost.textContent = `${level.costInClick}`;
                levelBtn.textContent = `(${level.ratepersecond}/s)`;
                levelBtn.disabled = true;
                levelBtn.id = `level-${level.id}`;
                levelBtn.addEventListener("click", () => buyLevel(level));
                levelBtn.classList.add("opacity-50");
                levelsContainer.appendChild(divBtn);
                divBtn.appendChild(levelBtn);
                levelBtn.appendChild(levelBtnLabel);
                levelBtn.appendChild(levelBtnCost);
            });
        });
// Écouteur d'événement pour le bouton de clic
    clickerBtn.addEventListener("click", addClick);
    // Écouteur d'événement pour le bouton de réinitialisation
    resetBtn.addEventListener("click", () => {
        // Réinitialiser les variables de jeu
        clickCount = 0;
        clickRate = 0;
        levels.forEach((level) => {
            level.count = 0;
            level.costInClick = level.initialCost;
            const levelBtn = document.getElementById(`level-${level.id}`);
            levelBtn.textContent = `${level.label} (${level.ratepersecond}/s) - ${level.costInClick} clicks`;
            localStorage.setItem(`level-${level.id}-cost`, level.costInClick); // Réinitialiser les coûts des niveaux dans le localStorage
        });

        // Réinitialiser l'affichage
        updateDisplay();
    });

    // Chargement des données depuis localStorage s'il y en a
    if (localStorage.getItem("clickCount")) {
        clickCount = parseInt(localStorage.getItem("clickCount"));
    }
    if (localStorage.getItem("clickRate")) {
        clickRate = parseInt(localStorage.getItem("clickRate"));
    }

    // Début de la boucle de jeu
    setInterval(() => {
        clickCount += clickRate * 0.1; // multiplier le taux de clics par seconde par 0.1 pour un intervalle de 100 millisecondes
        updateDisplay();
    }, 100);

    // Mise à jour de l'affichage initial
    updateDisplay();
}

// Initialisation du jeu lorsque la page est chargée
document.addEventListener("DOMContentLoaded", init);
