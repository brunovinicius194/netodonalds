var infoFood = {};
var infoFillings = [];

async function getFood(idFood) {
  const response = await fetch("http://localhost:8080/food/" + idFood);
  const data = await response.json();

  console.log(data);
  infoFood = data.food[0];
  infoFillings = data.fillings;

  document.querySelector("#price").innerHTML = infoFood.price;
  renderFillings();
}

function renderFillings() {
  document.querySelector(".fillings").innerHTML = "";
  let id = 0;
  for (let filling of infoFillings) {
    let div = document.createElement("div");
    div.innerHTML = `<input type="checkbox" id="${id}"/> ${filling.name} (R$ ${filling.price})`;
    div.addEventListener("change", setprice);
    document.querySelector(".fillings").appendChild(div);
    id++
  }
}

async function historic() {
  var cpf = document.querySelector("#cpf").value;
  const data = await fetch("http://localhost:8080/historic/" + cpf);
  const historic = await data.json();
  const div = document.createElement("div");
  div.innerHTML = `<div>${historic
    .map((item) => (
      <p>
        ${item.descricao}: R$ ${item.preco}
      </p>
    ))
    .join("")}</div>`;
  document.querySelector("#historic").innerHTML = div.innerHTML;
}

function setprice(event) {
  let id = event.target.id;
  let price = infoFillings[id].price
  if (event.target.checked) {
    infoFood.price += price;
  } else {
    infoFood.price -= price;
  }
  document.querySelector("#price").innerHTML = food.price.toFixed(2);
}

async function historic(){
  var cpf = document.querySelector("#cpf").value;
  const data = await fetch('http://localhost:8080/historic/' + cpf);
  const historic = await data.json();
  const div = document.createElement("div");
  div.innerHTML = `<div>${historic.map(item => `<p>${item.descricao}: R$ ${item.preco}</p>`).join("")}</div>`;
  document.querySelector("#historic").innerHTML = div.innerHTML;
}
getfood(1);

/* Pegando as informações da tapioca */
getFood(1);