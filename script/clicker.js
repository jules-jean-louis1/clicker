// Récupérer les éléments du DOM
const clickButton = document.getElementById("clicker-btn");
const score = document.getElementById("click-count");
const clickRateDisplay = document.getElementById("click-rate");
const levelButtonsContainer = document.getElementById("levels-container");
const resetBtn = document.getElementById('reset-btn');

// Initialiser les variables de clics et de vitesse de clics
let clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
let clickRate = parseInt(localStorage.getItem("clickRate")) || 1;

// Mettre à jour le texte affiché dans l'élément de score et de clics par seconde
score.textContent = clickCount.toString();
clickRateDisplay.textContent = clickRate.toString();


// Définir une fonction pour mettre à jour l'état de chaque bouton en fonction du nombre de clics actuel
function updateButtonState() {
    levelButtons.forEach((btn) => {
        const cost = parseInt(btn.innerText.match(/\d+/)[0]);
        btn.disabled = (clickCount < cost);
        btn.style.opacity = (clickCount < cost) ? 0.5 : 1; // mettre l'opacité à 50% si le bouton est désactivé
    });
}

// Charger les niveaux depuis le fichier JSON
fetch("level.json")
    .then((response) => response.json())
    .then((levels) => {
        // Parcourir le tableau des niveaux et créer un élément de bouton pour chaque niveau
        levels.forEach((level) => {
            // Créer l'élément de bouton
            const button = document.createElement("button");
            button.innerText = `${level.label} (${level.costInClick} clics)`;
            button.classList.add("p-2", "m-2", "bg-blue-500", "text-white", "rounded");
            button.disabled = (clickCount < level.costInClick); // désactiver le bouton si le nombre de clics est insuffisant
            button.style.opacity = (clickCount < level.costInClick) ? 0.5 : 1; // mettre l'opacité à 50% si le bouton est désactivé
            button.addEventListener("click", () => {
                // Vérifier si le nombre de clics est suffisant pour acheter le niveau
                if (clickCount >= level.costInClick) {
                    clickCount -= level.costInClick;
                    score.textContent = clickCount.toString();
                    clickRate += level.ratepersecond;
                    localStorage.setItem("clickCount", clickCount.toString());
                    localStorage.setItem("clickRate", clickRate.toString());
                    clickRateDisplay.textContent = clickRate.toString(); // mettre à jour le nombre de clics par seconde dans l'affichage
                    updateButtonState(); // mettre à jour l'état de chaque bouton
                }
            });
            // Ajouter le bouton à l'élément de conteneur
            levelButtonsContainer.appendChild(button);
        });
    });

// Ajouter un gestionnaire d'événements de clic pour le bouton de clic principal
clickButton.addEventListener("click", () => {
    clickCount += 1;
    score.textContent = clickCount.toString();
    localStorage.setItem("clickCount", clickCount.toString());
});

// Ajouter une fonction de mise à jour des clics par seconde toutes les secondes
setInterval(() => {
    if (clickRate > 1) {
        clickCount += clickRate * clickMultiplier; // ajouter le multiplicateur de clics
        score.textContent = clickCount.toString();
        localStorage.setItem("clickCount", clickCount.toString());
        clickRateDisplay.textContent = clickRate.toString(); // mettre à jour le nombre de clics par seconde dans l'affichage
    }
}, 1000);

// Ajouter un gestionnaire d'événements de clic pour le bouton de reset
resetBtn.addEventListener('click', () => {
    clickCount = 0;
    clickRate = 1;
    clickMultiplier = 1; // remettre le multiplicateur à 1
    score.textContent = "0";
    localStorage.setItem("clickCount", "0");
    localStorage.setItem("clickRate", "1");
    clickRateDisplay.textContent = "0"; // remettre à zéro le nombre de clics par seconde dans l'affichage
});


// Ajouter un gestionnaire d'événements pour empêcher la sélection de texte dans le bouton de clic
clickButton.addEventListener('mousedown', (event) => {
    event.preventDefault();
});

// Ajouter un gestionnaire d'événements pour empêcher la sélection de texte dans les boutons de niveau
const levelButtons = document.querySelectorAll("#levels-container button");
levelButtons.forEach((button) => {
    button.addEventListener('mousedown', (event) => {
        event.preventDefault();
    });
});