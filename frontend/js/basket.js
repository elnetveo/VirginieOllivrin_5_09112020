// Récupération des produits dans le localStorage

let productsStorage = JSON.parse(localStorage.getItem("basketOrinoco"))
console.log(productsStorage)

let total = 0;

//Tableau qui sera envoyé au serveur avec les infos des caméras
let products = [];

// Structure html du panier d'après les produits choisis
function createBasket() {
    for (let i = 0; i < productsStorage.length; i++) {
        console.log(productsStorage.length)

        let productsdiv = document.createElement("div");
        let basketProducts = document.getElementById("basket-content");
        basketProducts.appendChild(productsdiv);
        productsdiv.classList.add("basket-cards");

        let photoCamera = document.createElement("img");
        productsdiv.appendChild(photoCamera);
        photoCamera.setAttribute("alt", "Image appareil photo");
        photoCamera.src = productsStorage[i].imageUrl;

        let titleCamera = document.createElement("h3");
        productsdiv.appendChild(titleCamera);
        titleCamera.classList.add("product-name");
        titleCamera.textContent = productsStorage[i].name;

        let priceCamera = document.createElement("p");
        productsdiv.appendChild(priceCamera);
        priceCamera.classList.add("product-price");
        priceCamera.innerText = productsStorage[i].price / 100 + "€";

        let numberProducts = document.createElement("div");
        productsdiv.appendChild(numberProducts);
        numberProducts.classList.add("product-price");
        numberProducts.innerText = "Quantité : " + productsStorage[i].quantity;

        let subTotal = (productsStorage[i].price / 100 * productsStorage[i].quantity);
        total += subTotal //
        let totalPrice = document.createElement("div");
        totalPrice.classList.add("subtotal");
        productsdiv.appendChild(totalPrice);
        totalPrice.innerText = "Sous-total : " + subTotal + "€";

        // Récupération des id produits dans le tableau products
        products.push(productsStorage[i]._id)
        //console.log(products)
    }
}
createBasket();

// Affichage du montant total de la commande
let contentPrice = document.createElement("div")
let content = document.getElementById("basket-content");
content.appendChild(contentPrice);
contentPrice.classList.add("montant-total");
contentPrice.innerText = "TOTAL DE VOTRE COMMANDE : " + total + "€";

// Suppression des articles du panier
let deleteBasket = document.createElement("button");
content.appendChild(deleteBasket);
deleteBasket.classList.add("btn-delete");
deleteBasket.innerText = "Vider le panier";

deleteBasket.addEventListener("click", function () {
    localStorage.removeItem("basketOrinoco");
    location.reload();
});

// Stockage données utilisateur dans un constructor
class userInfos {
    constructor(lastname, firstname, email, address, city) {
        this.lastName = lastname,
            this.firstName = firstname,
            this.email = email,
            this.address = address,
            this.city = city
    }
}
console.log(userInfos)

// Vérification des données du formulaire
document.getElementById("command").addEventListener("submit", function (e) {
    let lastname = document.getElementById("lastname");
    let firstname = document.getElementById("firstname");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    let city = document.getElementById("city");

    if (!lastname.value) {
        alert("Veuillez renseigner votre nom");
    }
    if (!firstname.value) {
        alert("Veuillez renseigner votre prénom");
    }
    if (!email.value) {
        alert("Veuillez renseigner votre email");
    }
    if (!address.value) {
        alert("Veuillez renseigner votre adresse");
    }
    if (!city.value) {
        alert("Veuillez renseigner votre ville");
    } else {
        e.preventDefault();
        //return false;
    }

    // Récupération des données utilisateur dans l'objet contact
    let contact = {
        firstName: firstname.value,
        lastName: lastname.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };

    // Requête POST pour envoyer les données à l'API
    const infos = { contact, products };

    const reqType = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(infos),
    };
    console.log(infos);

    fetch("http://localhost:3000/api/cameras/order", reqType)

        .then(function (response) {
            response.json().then(function (result) {
                localStorage.clear();
                window.location.href = `confirm.html?orderId=${result.orderId}`
            });
        })
});