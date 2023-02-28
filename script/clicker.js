// Récupérer les éléments du DOM
const clickButton = document.getElementById("clickButton");
const score = document.getElementById("score");
const levelButtonsContainer = document.getElementById("levelButtonsContainer");

// Initialiser les variables de clics et de vitesse de clics
let clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
let clickRate = parseInt(localStorage.getItem("clickRate")) || 1;

// Mettre à jour le texte affiché dans l'élément de score
score.textContent = clickCount.toString();

// Charger les niveaux depuis le fichier JSON
fetch("level.json")
    .then((response) => response.json())
    .then((levels) => {
        // Parcourir le tableau des niveaux et créer un élément de bouton pour chaque niveau
        levels.forEach((level) => {
            // Créer l'élément de bouton
            const button = document.createElement("button");
            button.innerText = `${level.label} (${level.costInClick} clics)`;
            button.addEventListener("click", () => {
                if (clickCount >= level.costInClick) {
                    clickCount -= level.costInClick;
                    score.textContent = clickCount.toString();
                    clickRate += level.ratepersecond;
                    localStorage.setItem("clickCount", clickCount.toString());
                    localStorage.setItem("clickRate", clickRate.toString());
                }
            });
            // Ajouter le bouton à l'élément de conteneur
            levelButtonsContainer.appendChild(button);
        });
    });

// Ajouter un gestionnaire d'événements de clic pour le bouton de clic principal
clickButton.addEventListener("click", () => {
    clickCount += clickRate;
    score.textContent = clickCount.toString();
    localStorage.setItem("clickCount", clickCount.toString());
});

// Ajouter une fonction de mise à jour des clics par seconde toutes les secondes
setInterval(() => {
    clickCount += clickRate;
    score.textContent = clickCount.toString();
    localStorage.setItem("clickCount", clickCount.toString());
}, 1000);
