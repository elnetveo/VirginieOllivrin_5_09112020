// Récupération des produits dans le localStorage
let productsStorage = JSON.parse(localStorage.getItem("basketOrinoco"))

let total = 0;

//Tableau qui sera envoyé au serveur avec les infos des caméras
let productIds = [];

// Structure html du panier d'après les produits choisis
let basketProducts = document.getElementById("basket-content");
function createBasket(products, content) {
    if (!products || products.length == 0) {
        let intialBasket = document.createElement("h3");
        content.appendChild(intialBasket);
        intialBasket.classList.add("basket-start");
        intialBasket.innerText = "Aucun article sélectionné";
        return;
    }
    for (let i = 0; i < products.length; i++) {
        console.log(products.length)

        let productsdiv = document.createElement("div");
        content.appendChild(productsdiv);
        productsdiv.classList.add("basket-cards");

        let photoCamera = document.createElement("img");
        productsdiv.appendChild(photoCamera);
        photoCamera.setAttribute("alt", "Image appareil photo");
        photoCamera.src = products[i].imageUrl;

        let titleCamera = document.createElement("h3");
        productsdiv.appendChild(titleCamera);
        titleCamera.classList.add("product-name");
        titleCamera.textContent = products[i].name;

        let priceCamera = document.createElement("p");
        productsdiv.appendChild(priceCamera);
        priceCamera.classList.add("product-price");
        priceCamera.innerText = products[i].price / 100 + "€";

        let numberProducts = document.createElement("div");
        productsdiv.appendChild(numberProducts);
        numberProducts.classList.add("product-price");
        numberProducts.innerText = "Quantité : " + products[i].quantity;

        let subTotal = (products[i].price / 100 * products[i].quantity);
        total += subTotal //
        let totalPrice = document.createElement("div");
        totalPrice.classList.add("subtotal");
        productsdiv.appendChild(totalPrice);
        totalPrice.innerText = "Sous-total : " + subTotal + "€";

        // Récupération des ids produits dans le tableau products
        productIds.push(products[i]._id)
        //console.log(products)
    }
        // Affichage du montant total de la commande
        let contentPrice = document.createElement("div")
        content.appendChild(contentPrice);
        contentPrice.classList.add("montant-total");
        contentPrice.innerText = "TOTAL DE VOTRE COMMANDE : " + total + "€";

        // Suppression des articles du panier
        function clearBasket (content) {
            let deleteBasket = document.createElement("button");
            content.appendChild(deleteBasket);
            deleteBasket.classList.add("btn-delete");
            deleteBasket.innerText = "Vider le panier";
            
                deleteBasket.addEventListener("click", function () {
                    localStorage.removeItem("basketOrinoco");
                    location.reload();
                });
        }
        clearBasket(basketProducts);
}
createBasket(productsStorage, basketProducts);

// Vérification des données du formulaire
function checkUserInfos () {
    let lastname = document.getElementById("lastname");
    let firstname = document.getElementById("firstname");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    let city = document.getElementById("city");

    if (lastname.value.trim().length<1) {
        alert("Veuillez renseigner votre nom");
        return false;
    }
    if (firstname.value.trim().length<1) {
        alert("Veuillez renseigner votre prénom");
        return false;
    }
    if (!/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/.test(email.value)) {
        alert("Veuillez renseigner votre email");
        return false;
    }
    //console.log(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/.test(email.value))
    if (address.value.trim().length<1) {
        alert("Veuillez renseigner votre adresse");
        return false;
    }
    if (city.value.trim().length<1) {
        alert("Veuillez renseigner votre ville");
        return false;
    }
    sendUserInfos(firstname, lastname, address, city, email)
}

document.getElementById("command").addEventListener("submit", function (e) {
    e.preventDefault()
    checkUserInfos()
})

function sendUserInfos (firstname, lastname, address, city, email) {
    // Récupération des données utilisateur dans l'objet contact
    let contact = {
        firstName: firstname.value,
        lastName: lastname.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };
    
    // Requête POST pour envoyer les données à l'API
    const infos = { contact:contact, products:productIds };

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
                localStorage.removeItem("basketOrinoco");
                window.location.href = `confirm.html?orderId=${result.orderId}`
                console.log(result)
            });
        })
        .catch(function(error) {
            console.log(error)
        })
}