// Affichage dans le DOM des produits récupérés du tableau de l'API
function addNewCard(result) {
  // Boucle pour ajouter des cards tant qu'il y a des articles
  for (let i = 0; i < result.length; i++) {
    let divCards = document.createElement("div");           // création de l'élément div
    let content = document.getElementById("home-content");  // récup id parent des nouveaux éléments (dans index.html)
    content.appendChild(divCards);                          // ajout du nouvel élément en tant qu'enfant
    divCards.classList.add("home-cards");                   // ajout de la classe

    let photoCamera = document.createElement("img");
    divCards.appendChild(photoCamera);
    photoCamera.setAttribute("alt", "Image appareil photo");
    photoCamera.src = result[i].imageUrl;                   // Récup infos API 

    let titleCamera = document.createElement("h3");
    divCards.appendChild(titleCamera);
    titleCamera.classList.add("product-name");
    titleCamera.innerText = result[i].name;

    let descriptionCamera = document.createElement("p");
    divCards.appendChild(descriptionCamera);
    descriptionCamera.classList.add("product-description");
    descriptionCamera.innerText = result[i].description;

    let priceCamera = document.createElement("p");
    divCards.appendChild(priceCamera);
    priceCamera.classList.add("product-price");
    priceCamera.innerText = result[i].price / 100 + "€";

    let linkProduct = document.createElement("a");
    divCards.appendChild(linkProduct);
    linkProduct.classList.add("product-link");
    linkProduct.innerText = "voir plus";
    linkProduct.href = `pages/product.html?productId=${result[i]._id}`; // récup infos produit vers la page product.html
  }
}

// Requête API pour récupérer les données du tableau
function getInfosProducts() {
  fetch("http://localhost:3000/api/cameras")
    .then(function (response) {
      response.json()
        .then(function (result) {
          //console.log(response)
          //console.log(result)
          addNewCard(result) // Exécution de la fonction
        })
    })
}
getInfosProducts()