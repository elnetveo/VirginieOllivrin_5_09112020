// Affichage dans le DOM des produits récupérés du tableau de l'API
function addNewCard(result) {
  // Boucle pour ajouter des cards tant qu'il y a des articles
  for (let i = 0; i < result.length; i++) {
    //console.log(result.length)
    let divCards = document.createElement("div");
    let content = document.getElementById("home-content");  
    content.appendChild(divCards);                          
    divCards.classList.add("home-cards");                   
    //console.log(divCards)
    //console.log(content)

    let photoCamera = document.createElement("img");
    divCards.appendChild(photoCamera);
    photoCamera.setAttribute("alt", "Image appareil photo");
    photoCamera.src = result[i].imageUrl;
    //console.log(result[i].imageUrl)

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
    // récup infos produit vers la page product.html
    linkProduct.href = `pages/product.html?productId=${result[i]._id}`;
  }
}

// Requête API pour récupérer les données du tableau
function getInfosProducts() {
    fetch("http://localhost:3000/api/cameras")
        .then(function (response) {
            //console.log(response)
            response.json()
              .then(function (result) {
                //console.log(result)
                addNewCard(result) // Exécution de la fonction
            })
        })
        .catch(function(error) {
            console.log(error)
        })
}
getInfosProducts()