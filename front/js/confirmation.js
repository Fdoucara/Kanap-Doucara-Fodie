let span = document.querySelector("#orderId");

const newUrl = new URL(window.location.href);
let orderId = newUrl.searchParams.get("id");
console.log(orderId);

span.textContent = `${orderId}`;
span.style.color = "blue";

localStorage.clear();