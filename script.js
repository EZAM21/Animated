// API : https://api.jikan.moe/v4/anime

// 1. Fonctionnalité de recherche d'anime :
//    - Un champ de recherche qui permet de rechercher des anime par leur titre.
//    - Lorsqu'un titre est saisi dans le champ de recherche, l'application doit filtrer les résultats en fonction de ce terme.
//    - Les résultats doivent être mis à jour en temps réel lorsque l'utilisateur saisit un terme.

// 2. Affichage du nombre de résultats :
//    - Un curseur est présent, accompagné d'un élément qui affiche le nombre de résultats actuellement affichés.
//    - Lorsque l'utilisateur déplace le curseur, l'application doit mettre à jour le nombre de résultats affichés en temps réel.

// 3. Tri des résultats :
//    - Un bouton "Tri" permet de trier les résultats par ordre décroissant ou croissant en fonction du score (score attribué à l'anime).
//    - Lorsque l'utilisateur clique sur le bouton, les résultats doivent être triés en conséquence, et l'intitulé du bouton doit être modifié pour refléter l'ordre actuel (Descendant/Ascendant).

// 4. Affichage des anime sous forme de cartes :
//    - Chaque carte doit contenir le titre de l'anime, une image de l'anime, une brève description, le score, et un lien pour regarder la bande-annonce (s'il existe).
//    - La description doit être tronquée à un maximum de 4 lignes en utilisant CSS.
//    - L'image de l'anime doit être affichée avec une largeur fixe de 250px.

// 5. Récupération des données :
//    - Les données doivent être récupérées à partir de l'API "https://api.jikan.moe/v4/anime&quot;.

// Rendu attendu :
//    - Un lien vers un dépôt GitHub contenant le code source de l'application.
//    - Un lien vers le site en ligne où l'application est hébergée et accessible pour une utilisation.
const cardContainer = document.querySelector(".card-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeDisplay = document.getElementById("rangeDisplay");
const sortBtn = document.getElementById("sortBtn");


let data = [];
let sortMethod = true;

const url = "https://api.jikan.moe/v4/anime?q=";

async function fetchData() {
        const request = await fetch("url+ inputSearch.value);
        data = await request.json();
        data = data.data;

displayData();
};

fetchData("Cobra");

function displayData() {
        cardContainer.innerHTML = "";
        data
        .sort((a, b) => {
                if(sortMethod){
                        return a.score - b.score
                } else {
                        return b.score - a.score
                }
        })
        .slice(0, inputRange.value)
        .map((d) => {
            cardContainer.innerHTML += `
            <div class="card">
                                <span id="name">${d.title}</span>
                                <img src="${d.images.jpg.image_url}" alt="IMAGE${d.title}" width="250px">

                                <div class="resume">${d.synopsis}</div>
                                <h3>Score: ${d.score}</h3>
                                <span><a href="${d.trailer.url}">Watch trailer</a></span>

                        </div>`    
        });
};

inputSearch.addEventListener("change", (e) => {
        fetchData(inputSearch.value);
})

inputRange.addEventListener("input", (e) => {
        rangeDisplay.innerHTML = e.target.value;

        displayData();
});

sortBtn.addEventListener("click", (e) => {
        sortMethod = !sortMethod
        sortBtn.innerHTML = !sortMethod ? "Croissant" : "Décroissant"; 

        displayData();

});

