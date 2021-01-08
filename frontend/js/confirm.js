let orderUrl = location.href;                           
console.log(orderUrl);

const url2 = new URL(orderUrl);                          
console.log(url2);
const params = new URLSearchParams(url2.search);         
console.log(params);
const orderId = params.get("orderId");              
console.log(orderId);   

let commandNumber = document.createElement("div");
let content = document.getElementById("confirm-page-content");
content.appendChild(commandNumber);
commandNumber.classList.add("command-number");
commandNumber.innerText = orderId;

let backHome = document.createElement("button");
content.appendChild(backHome);
backHome.classList.add("btn-back");
backHome.innerText = ("Retourner à l'accueil");
backHome.addEventListener("click", function () {
    window.location.href = "../index.html";
})