let orderUrl = location.href;                           
console.log(orderUrl);


const url2 = new URL(orderUrl);                          
console.log(url2);
const params = new URLSearchParams(url2.search);         
console.log(params);
const orderId = params.get("orderId");              
console.log(orderId);

let content = document.getElementById("confirm-page-content");
function displayCommandNumber () {
    let commandNumber = document.createElement("div");
    content.appendChild(commandNumber);
    commandNumber.classList.add("command-number");
    commandNumber.innerText = orderId;
}
displayCommandNumber()

function createBackHomeButton () {
    let btnBackHome = document.createElement("button");
    content.appendChild(btnBackHome);
    btnBackHome.classList.add("btn-back");
    btnBackHome.innerText = ("Retourner à l'accueil");
    btnBackHome.addEventListener("click", function () {
        window.location.href = "../index.html";
    })
}
createBackHomeButton()