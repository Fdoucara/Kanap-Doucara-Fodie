let items = document.querySelector('#items');
const urlProductAll = 'http://localhost:3000/api/products';


async function recupLesProduit(){
  let requete = await fetch(urlProductAll, {
    method: 'GET'
  });

  if(!requete.ok){
    alert("Une erreur s'est produite. Revenez plus tard !"); 
  } else {
      reponse = await requete.json();

      for(let i = 0; i < reponse.length; i++){
        createElement(i);
      }
  }
}


function createElement(i) {
  let a = document.createElement('a');
        a.href = `./product.html?id=${reponse[i]._id}`
        items.append(a);

        let article = document.createElement('article');
        a.appendChild(article);

        let img = document.createElement('img');
        img.src = `${reponse[i].imageUrl}`;
        img.alt = `${reponse[i].name}`
        article.appendChild(img);

        let h3 = document.createElement('h3');
        h3.className = 'productName';
        h3.textContent = `${reponse[i].name}`
        article.appendChild(h3);

        let p = document.createElement('p');
        p.className = 'productDescription';
        p.textContent = `${reponse[i].description}`
        article.appendChild(p);
}


recupLesProduit();