// On récupere les elements HTML importants
let span = document.querySelector("#orderId");

// On récupere l'id présent dans l'URL
const newUrl = new URL(window.location.href);
let orderId = newUrl.searchParams.get("id");

span.textContent = `${orderId}`;
span.style.color = "blue";

// On vide le localStorage
localStorage.clear();