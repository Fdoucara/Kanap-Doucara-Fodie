// On récupere les éléments importants de notre HTML
let imgContainer = document.querySelector('.item__img');
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let description = document.querySelector('#description');
let colors = document.querySelector('select');
let button = document.querySelector('#addToCart');
let quantity = document.querySelector('#quantity');
let reponse;
let titrePage = document.querySelector('title');


// Récuperer l'id de l'URL a l'aide de l'objet URL.
const newUrl = new URL(window.location.href);
let id = newUrl.searchParams.get("id");


// On injecte l'id récuperer dans l'url qu'on va utiliser pour interagir avec notre API
const url = `http://localhost:3000/api/products/${id}`;


// Fonction asynchrone nous permettant de prendre et inserer les informations du produit selectionné uniquement.
async function recupProduit() {
  let requete = await fetch(url, {
    method: 'GET'
  });

  if (!requete.ok) {
    alert("Une erreur s'est produite. Revenez plus tard !");
  } else {
    reponse = await requete.json();

    let img = document.createElement('img');
    img.src = `${reponse.imageUrl}`;
    img.alt = `${reponse.altTxt}`;
    imgContainer.append(img);

    titrePage.textContent = `${reponse.name}`;

    title.textContent = `${reponse.name}`;

    price.textContent = `${reponse.price}`;

    description.textContent = `${reponse.description}`;

    for (let i = 0; i < reponse.colors.length; i++) {
      let color = document.createElement('option');
      color.value = `${reponse.colors[i]}`;
      color.textContent = `${reponse.colors[i]}`
      colors.append(color);
    }
  }
}


// Fonction nous permettant d' ajouter un produit au panier.
function ajouterProduitPanier() {
  // Memorisation des données dans le LocalStorage
  button.addEventListener('click', () => {
    let produit = {
      id: id,
      color: colors.value,
      quantite: quantity.value,
    }

    let produitTab;
    let local = JSON.parse(localStorage.getItem('tableauProduit'));

    // On verifie si local est different de nulle. Si oui on realise ce qu'il y a dans le if
    if (local !== null) {
      produitTab = JSON.parse(localStorage.getItem('tableauProduit'));
      // On cherche dans produitTab si le produit existe deja et si il a la meme couleur egalement
      let foundProduit = produitTab.find(a => a.id == produit.id && a.color == produit.color);
      // si FoundProduit est different de undefined c'est que le produit existe
      if (foundProduit != undefined) {
        // on additionne seulement les quantites
        foundProduit.quantite = parseInt(foundProduit.quantite) + parseInt(produit.quantite);
        localStorage.setItem('tableauProduit', JSON.stringify(produitTab));
        alert('Quantité ajoutée.');
      }
      // Sinon on ajoute le nouveau produit dans le tableau produitTab et on sauvegarde le nouveau tableau en localeStorage
      else {
        if(quantity.value > 0 && colors.value != 0){
          produitTab.push(produit);
          localStorage.setItem('tableauProduit', JSON.stringify(produitTab));
          alert('Produit bien ajouté au panier.');
        } else {
          alert('Vous devez choisir un couleur et une quantité supérieur à 0 !');
        }
        
      }
    }
    // Sinon dans le else
    else {
      if(quantity.value > 0 && colors.value != 0){
      // on ajoute un tableau vide comme valeur a produitTab
      produitTab = [];
      // Dans ce tableau vide nous ajoutons notre nouvel objet contenant les proprietes du nouveau produit
      produitTab.push(produit);
      // Nous sauvegardons ce nouveau tableau
      localStorage.setItem('tableauProduit', JSON.stringify(produitTab));
      alert('Produit bien ajouté au panier.');
      // Nous retournons le nouveau tableau avec ses nouvelles valeurs
      return produitTab;
      } else {
        alert('Vous devez choisir un couleur et une quantité supérieur à 0 !');
      }
    }
  })
}

// On appelle les fonctions
recupProduit();
ajouterProduitPanier();