"use strict";
//selecciono la lista del html
const ul = document.querySelector("ul");

console.log(ul);
//recuperar los datos del archivo .json
async function getData() {
  const response = await fetch("./zelda-timeline.json");
  //console.log(response);
  //await indica que la constante response tiene que esperar a que fetch resuelva su promesa('')
  //await necesita la funcion sea async para poder funcionar

  const data = await response.json();
  //console.log(data);
  //respuesta al servidor con .json quedarme con los datos tambien hay que esperar

  return data;
  //devolver los datos
}

//encargada de recuperar los datos y printarlos en el documento html
async function printData() {
  const data = await getData();
  //tambien necesita ser asincrona y llevar el await

  const dataOrd = data.sort((a, b) => a.date - b.date);
  //guarda los datos y los ordena por fecha

  console.log(dataOrd);

  const frag = document.createDocumentFragment();
  //crear un fragmento para añadir todos los li uno a uno y despues usar este fragmento para solamente tocar el html una vez

  for (const game of dataOrd) {
    //dataord es un array de objetos para acceder a cada uno de los objetos recorres el array con un bucle
    const li = document.createElement("li");
    //crear el elemento o etiqueta li

    //con innerHTML le das el contenido a el li
    li.innerHTML = `
    <div class="timeline-content">
              <h2 class="date">${game.date}</h2>
              <h1>${game.title}</h1>
              <p>
                ${game.text}
              </p>
              <img
                src="${game.image}"
                alt=""
                class="foto"
              />
            </div>`;

    frag.append(li);
    //añadir el li al fragemento para no tener que ir al html de uno en uno
  }
  console.log(frag);

  ul.append(frag);
  //añadir el html en el fragmento
}

printData();
//ejecutas la funcion printdata
