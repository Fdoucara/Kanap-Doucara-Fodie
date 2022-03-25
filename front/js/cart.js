// ------------------------------------------------- Affichage /Suppresion/ Modification du panier -------------------------------------------------


// On recupere les elements de notre HMTL
let cart__items = document.querySelector('#cart__items');
let orderId = "";
// Declaration des variables en global pour creation d'elements
let article;
let cart__item__img;
let img;
let cart__item__content;
let cart__item__content__description;
let h2;
let pColor;
let pPrix;
let cart__item__content__settings;
let cart__item__content__settings__quantity;
let pQuantite;
let input;
let cart__item__content__settings__delete;
let pDelete;

// On declare les variables quantite et total en global en leur attribuant la valeur 0
let quantiteArticle = 0;
let total = 0;


// Recuperation du tableau contenant les produits
let donnees = JSON.parse(localStorage.getItem('tableauProduit'));
let products = [];

// On verifie si le tableau qui est dans le localStorage qu'on a nommé ici donnees est different de null
if (donnees != null) {
  for (let i = 0; i < donnees.length; i++) {

    // Appel des fonctions creerElementHtml, modifierQuantite et supprimerPorduit en leur attribuant (i) comme arguement.
    creerElementHtml(i);
    supprimerProduit(i);

    // Calcule de la quantité d'articles dans le panier.
    quantiteArticle += parseInt(donnees[i].quantite);

    // Ajout de la quantité totale dans le HTML.
    document.querySelector('#totalQuantity').textContent = `${quantiteArticle}`;

    // Calcule du prix total du panier.
    total = total + parseInt(donnees[i].quantite) * parseInt(donnees[i].price);

    // Ajout du prix total dans le HTML.
    document.querySelector('#totalPrice').textContent = `${total}`;

    products.push(donnees[i].id);
  }
}


// Création et configurations des élements HTML via Javascript.
function creerElementHtml(i) {

  article = document.createElement('article');
  article.className = 'cart__item';
  article.dataset.id = `${donnees[i].id}`;
  article.dataset.color = `${donnees[i].color}`;
  cart__items.appendChild(article);

  cart__item__img = document.createElement('div');
  cart__item__img.className = 'cart__item__img';
  article.appendChild(cart__item__img);

  img = document.createElement('img');
  img.src = `${donnees[i].image}`;
  img.alt = `${donnees[i].altTxt}`;
  cart__item__img.appendChild(img);

  cart__item__content = document.createElement('div');
  cart__item__content.className = 'cart__item__content';
  article.append(cart__item__content);

  cart__item__content__description = document.createElement('div');
  cart__item__content__description.className = 'cart__item__content__description';
  cart__item__content.appendChild(cart__item__content__description);

  h2 = document.createElement('h2');
  h2.textContent = `${donnees[i].name}`;
  cart__item__content__description.appendChild(h2);

  pColor = document.createElement('p');
  pColor.textContent = `${donnees[i].color}`;
  cart__item__content__description.appendChild(pColor);

  pPrix = document.createElement('p');
  pPrix.textContent = `${donnees[i].price} €`;
  cart__item__content__description.appendChild(pPrix);

  cart__item__content__settings = document.createElement('div');
  cart__item__content__settings.className = 'cart__item__content__settings';
  cart__item__content.append(cart__item__content__settings);

  cart__item__content__settings__quantity = document.createElement('div');
  cart__item__content__settings__quantity.className = 'cart__item__content__settings__quantity';
  cart__item__content__settings.appendChild(cart__item__content__settings__quantity);

  pQuantite = document.createElement('p');
  pQuantite.textContent = `Qté : ${donnees[i].quantite}`;
  cart__item__content__settings__quantity.appendChild(pQuantite);

  input = document.createElement('input');
  input.type = 'number';
  input.className = 'itemQuantity';
  input.name = 'itemQuantity';
  input.min = '1';
  input.max = '100';
  input.value = `${donnees[i].quantite}`;
  cart__item__content__settings__quantity.appendChild(input);

  cart__item__content__settings__delete = document.createElement('div');
  cart__item__content__settings__delete.className = 'cart__item__content__settings__delete';
  cart__item__content__settings.append(cart__item__content__settings__delete);

  pDelete = document.createElement('p');
  pDelete.className = 'deleteItem';
  pDelete.textContent = 'Supprimer';
  cart__item__content__settings__delete.appendChild(pDelete);
}


// Modification de la quantité des produits
function modifierQuantite(quantite, i) {
  quantite.addEventListener('change', () => {
    donnees[i].quantite = quantite.value;
    localStorage.setItem('tableauProduit', JSON.stringify(donnees));
    location.reload();  

    if(donnees[i].quantite == 0){
      produitTab = donnees.filter(e => e.quantite != donnees[i].quantite);
      localStorage.setItem('tableauProduit', JSON.stringify(produitTab));
      article.remove();
      if (produitTab.length == 0) {
        localStorage.clear();
      }
      location.reload();
    }
  })
}

// Recuperer tout les input sous forme de tableau
let inputAll = Array.from(document.querySelectorAll('.itemQuantity'));

// On réalise un forEach sur le tableau des inputs et on met en parametre la fonction modifierQuantite
inputAll.forEach(modifierQuantite);


// Suppression d'un article du panier
function supprimerProduit(i) {
  produitTab = JSON.parse(localStorage.getItem('tableauProduit'));
  pDelete.addEventListener('click', () => {

    produitTab = donnees.filter(e => e.id != donnees[i].id || e.color != donnees[i].color);
    localStorage.setItem('tableauProduit', JSON.stringify(produitTab));
    article.remove();
    if (produitTab.length == 0) {
      localStorage.clear();
    }
    location.reload();
  })
}


// ------------------------------------------------- Fin Affichage /Suppresion/ Modification du panier ----------------


// ------------------------------------------------- Formulaire Panier ------------------------------------------------


// On recupere le formulaire present dans le HTML
let form = document.querySelector(".cart__order__form");


// Création des expressiosn régulieres
let nameRegExp = /^[A-ZÀÂÇÉÈÊËÎÏÔÙÛÜŸÆŒ]{1}[a-zàâæçéèêëîïôœùûüÿ]+([-'\s][A-ZÀÂÇÉÈÊËÎÏÔÙÛÜŸÆŒ][a-zàâæçéèêëîïôœùûüÿ]+)?$/;
let addressRegExp = /^[A-Za-z0-9àâæçéèêëîïôœùûüÿ.,-_'\s]+/i;
let cityRegExp = /^[A-Za-z0-9àâæçéèêëîïôœùûüÿ\-_.,'\s]+/i;
let emailRegExp = /^[A-Za-z0-9.\-+%_]+[@]{1}[A-Za-z0-9.\-+%_]+\.[A-Za-z]{2,}/i;


// Déclaration des variables qui vont contenir les boolean issue du test des regEx
let testFirstName;
let testLastName;
let testAddress;
let testCity;
let testEmail;


// Controle input firstName
function checkFristName(){
  // On recupere l'element p contenant le message d'erreur
  let errorFirstName = document.querySelector('#firstNameErrorMsg');
  testFirstName = nameRegExp.test(form.firstName.value);

  // Test de l'expression réguliere
  if (testFirstName){
    errorFirstName.textContent = "Prénom Valide";
  } else {
    errorFirstName.textContent = "Prénom Non Valide";
  }
}


// Controle input lastName
function checkLastName() {
  // On recupere l'element p contenant le message d'erreur
  let errorLastName = document.querySelector('#lastNameErrorMsg');
  testLastName = nameRegExp.test(form.lastName.value);

  // Test de l'expression réguliere
  if (testLastName) {
    errorLastName.textContent = "Le format du nom est correct !";
  } else {
    errorLastName.textContent = "Le format du nom est incorrect !";
  }
}


// Controle input address
function checkAddress() {
  // On recupere l'element p contenant le message d'erreur
  let errorAddress = document.querySelector('#addressErrorMsg');
  testAddress = addressRegExp.test(form.address.value);

  // Test de l'expression réguliere
  if (testAddress) {
    errorAddress.textContent = "Le format de l'adresse est correct !";
  } else {
    errorAddress.textContent = "Le format de l'adresse est incorrect !";
  }
}


// Controle input city
function checkCity() {
  // On recupere l'element p contenant le message d'erreur
  let errorCity = document.querySelector('#cityErrorMsg');
  testCity = cityRegExp.test(form.city.value);

  // Test de l'expression réguliere
  if (testCity) {
    errorCity.textContent = "Le format de la ville est correct !";
  } else {
    errorCity.textContent = "Le format de la ville est incorrect !";
  }
}


// Controle input email
function checkEmail() {
  // On recupere l'element p contenant le message d'erreur
  let errorEmail = document.querySelector('#emailErrorMsg');
  testEmail = emailRegExp.test(form.email.value)

  // Test de l'expression réguliere
  if (testEmail) {
    errorEmail.textContent = "Le format du mail est correct !";
  } else {
    errorEmail.textContent = "Le format du mail est incorrect !";
  }
}


// Écoute des changements au niveau de l'input FirstName
form.firstName.addEventListener('change', checkFristName);


// Écoute des changements au niveau de l'input LastName
form.lastName.addEventListener('change', checkLastName);


// Écoute des changements au niveau de l'input Address
form.address.addEventListener('change', checkAddress);


// Écoute des changements au niveau de l'input City
form.city.addEventListener('change', checkCity);


// Écoute des changements au niveau de l'input Email
form.email.addEventListener('change', checkEmail);


// Écoute du bouton Valider au click 
let buttonForm = document.querySelector('#order');

let contact = {};

buttonForm.addEventListener('click', (event) => {
  event.preventDefault();

  contact = {
    firstName : document.querySelector("#firstName").value,
    lastName : document.querySelector("#lastName").value,
    address : document.querySelector("#address").value,
    city : document.querySelector("#city").value,
    email : document.querySelector("#email").value,
  };

  if(testFirstName && testLastName && testAddress && testCity && testEmail){
    localStorage.setItem('contact', JSON.stringify(contact));

    console.log(contact);
    console.log(products);

    sendToServer();

  } else {
    alert('Erreur dans la saisie des informations au niveau du formulaire !');
  }

})


// ------------------------------------------------- Fin Formulaire Panier -------------------------------------------------


// ------------------------------------------------- Requete POST ----------------------------------------------------------

const url = "http://localhost:3000/api/products/order";

async function sendToServer(){
  const requete = await fetch(url, {
    method: "POST",
    body: JSON.stringify({contact, products}),
    headers: {
      "Content-Type": "application/json",
    }
  })
  if(!requete.ok){
    alert("Une erreur s'est produite !");
  } else {
    let reponse = await requete.json();
    console.log(reponse);

    orderId = reponse.orderId;
    console.log(orderId);

    if(orderId != ""){
      location.assign('confirmation.html?id=' + orderId)
    }
  }

}


// ------------------------------------------------- Fin Requete POST ------------------------------------------------------