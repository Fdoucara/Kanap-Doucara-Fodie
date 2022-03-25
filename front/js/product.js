// On récupere les éléments importants de notre HTML
let imgContainer = document.querySelector('.item__img');
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let description = document.querySelector('#description');
let colors = document.querySelector('select');
let button = document.querySelector('#addToCart');
let quantity = document.querySelector('#quantity');
let reponse;

// Récuperer l'id de l'URL a l'aide de l'objet URL.
const newUrl = new URL(window.location.href);
let id = newUrl.searchParams.get("id");


// On injecte l'id récuperer dans l'url qu'on va utiliser pour interagir avec notre API
const url = `http://localhost:3000/api/products/${id}`;


// Fonction asynchrone nous permettant de prendre et inserer les informations du produit selectionné uniquement.
async function recupProduit(){
  let requete = await fetch(url, {
    method: 'GET'
  });

  if(!requete.ok){
    alert("Une erreur s'est produite. Revenez plus tard !"); 
  } else {
      reponse = await requete.json();

      let img = document.createElement('img');
      img.src = `${reponse.imageUrl}`;
      img.alt = `${reponse.altTxt}`;
      imgContainer.append(img);

      title.textContent = `${reponse.name}`;

      price.textContent = `${reponse.price}`;

      description.textContent = `${reponse.description}`;

      for(let i = 0; i < reponse.colors.length; i++){
        let color = document.createElement('option');
        color.value = `${reponse.colors[i]}`;
        color.textContent = `${reponse.colors[i]}`
        colors.append(color);
      }
  }
}


// On appelle la fonction
recupProduit();


// Memorisation des données dans le LocalStorage
button.addEventListener('click', () => {

  let produit = {
    id : id,
    name : reponse.name,
    color : colors.value,
    quantite : quantity.value,
    description : reponse.description,
    price : reponse.price,
    image : reponse.imageUrl,
    altTxt : reponse.altTxt
  }

  let produitTab;

  let local = JSON.parse(localStorage.getItem('tableauProduit'));

  // On verifie si local est different de nulle. Si oui on realise ce qu'il y a dans le if
  if(local !== null) { 
    produitTab = JSON.parse(localStorage.getItem('tableauProduit'));

    // On cherche dans produitTab si le produit existe deja et si il a la meme couleur egalement
    let foundProduit = produitTab.find(a => a.id == produit.id && a.color == produit.color);

    // si FoundProduit est different de undefined c'est que le produit existe
    if(foundProduit != undefined) {

      // on additionne seulement les quantites
      foundProduit.quantite = parseInt(foundProduit.quantite) + parseInt(produit.quantite);
      localStorage.setItem('tableauProduit', JSON.stringify(produitTab)); 
    } 

    // Sinon on ajoute le nouveau produit dans le tableau produitTab et on sauvegarde le nouveau tableau en localeStorage
    else {
      produitTab.push(produit);
      localStorage.setItem('tableauProduit', JSON.stringify(produitTab));
    }
  } 
  // Sinon dans le else
  else {
    // on ajoute un tableau vide comme valeur a produitTab
    produitTab = [];
    
    // Dans ce tableau vide nous ajoutons notre nouvel objet contenant les proprietes du nouveau produit
    produitTab.push(produit);

    // Nous sauvegardons ce nouveau tableau
    localStorage.setItem('tableauProduit', JSON.stringify(produitTab));

    // Nous retournons le nouveau tableau avec ses nouvelles valeurs
    return produitTab;
  }
   
})
