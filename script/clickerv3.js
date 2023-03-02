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
    clickCountEl.textContent = clickCount;

    // Mise à jour du taux de clics par seconde
    clickRateEl.textContent = clickRate.toFixed(2);

    // Mise à jour des boutons de niveau
    levels.forEach((level) => {
        const levelBtn = document.getElementById(`level-${level.id}`);

        if (clickCount >= level.costInClick) {
            levelBtn.disabled = false;
            levelBtn.classList.remove("opacity-50");
            levelBtn.classList.add("bg-blue-500", "p-2", "text-white", "rounded-lg");
        } else {
            levelBtn.disabled = true;
            levelBtn.classList.remove("bg-blue-500", "p-2");
            levelBtn.classList.add("opacity-50", "text-white", "rounded-lg", "bg-blue-500", "p-2");
        }
    });
}

// Fonction pour ajouter un clic
function addClick() {
    clickCount++;
    updateDisplay();
}

// Fonction pour acheter un niveau
function buyLevel(level) {
    if (clickCount >= level.costInClick) {
        clickCount -= level.costInClick;
        clickRate += level.ratepersecond;
        level.count++; // incrémenter le nombre de fois que le niveau a été acheté
        level.costInClick *= 2; // doubler le coût en clic
        const levelBtn = document.getElementById(`level-${level.id}`);
        levelBtn.textContent = `${level.label} (${level.ratepersecond}/s) - ${level.costInClick} clicks`; // mettre à jour le texte du bouton avec le nouveau coût en clic
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
                const levelBtn = document.createElement("button");
                levelBtn.textContent = `${level.label} (${level.ratepersecond}/s) - ${level.costInClick} clicks`;
                levelBtn.disabled = true;
                levelBtn.id = `level-${level.id}`;
                levelBtn.addEventListener("click", () => buyLevel(level));
                levelBtn.classList.add("opacity-50");
                levelsContainer.appendChild(levelBtn);
            });
        });

    // Écouteur d'événement pour le bouton de clic
    clickerBtn.addEventListener("click", addClick);

    // Écouteur d'événement pour le bouton de réinitialisation
    resetBtn.addEventListener("click", () => {
        clickCount = 0;
        clickRate = 0;
        levels.forEach((level) => {
            level.costInClick = level.costInClick / 2;
        });
        updateDisplay();
    });

    // Boucle pour mettre à jour les clics par seconde
    clickInterval = setInterval(() => {
        clickCount += clickRate;
        updateDisplay();
    }, 1000);

    updateDisplay();
}

// Lancement du jeu
init();
