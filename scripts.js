const Clickbutton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody');
let carrito = [];

// Crear el objeto de sonido
const clickSound = new Audio('click.mp3'); // Asegúrate de que la ruta del archivo de sonido sea correcta

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem);
});

function addToCarritoItem(e) {
  // Reproducir el sonido cuando se hace clic en el botón
  clickSound.play();

  const button = e.target;
  const item = button.closest('.card');
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  };

  addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
  const alert = document.querySelector('.alert');

  setTimeout(function() {
    alert.classList.add('hide');
  }, 2000);
  alert.classList.remove('hide');

  const InputElemnto = tbody.getElementsByClassName('input__elemento');
  if (InputElemnto.length > 0) {
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].title.trim() === newItem.title.trim()) {
        carrito[i].cantidad++;
        const inputValue = InputElemnto[i];
        inputValue.value++;
        CarritoTotal();
        return null;
      }
    }
  }
  
  carrito.push(newItem);
  renderCarrito();
}

function renderCarrito() {
  tbody.innerHTML = '';
  carrito.map(item => {
    const tr = document.createElement('tr');
    tr.classList.add('ItemCarrito');
    const Content = `
      <th scope="row">1</th>
      <td class="table__productos">
        <img src=${item.img} alt="">
        <h6 class="title">${item.title}</h6>
      </td>
      <td class="table__price"><p>${item.precio}</p></td>
      <td class="table__cantidad">
        <input type="number" min="1" value=${item.cantidad} class="input__elemento text-dark">
        <button class="delete btn btn-danger">x</button>
      </td>
    `;
    tr.innerHTML = Content;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito);
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad);
  });
  CarritoTotal();
}

function CarritoTotal() {
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal');
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''));
    Total = Total + precio * item.cantidad;
  });

  itemCartTotal.innerHTML = `Total $${Total}`;
  addLocalStorage();
}

function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  const alert = document.querySelector('.remove');
  setTimeout(function() {
    alert.classList.add('remove');
  }, 2000);
  alert.classList.remove('remove');

  tr.remove();
  CarritoTotal();
}

function sumaCantidad(e) {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal();
    }
  });
}

function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function() {
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if (storage && storage.length > 0) {
    carrito = storage;
    renderCarrito();
  }
}

// Filtro de categorías
document.addEventListener('DOMContentLoaded', function () {
  // Selecciona todos los botones de filtrado
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Añade un event listener a cada botón
  filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
          // Obtiene el valor del filtro
          const filterValue = this.getAttribute('data-filter');
          
          // Selecciona todas las tarjetas de vehículos
          const cardContainers = document.querySelectorAll('.card-container');

          // Recorre todas las tarjetas y muestra u oculta según el filtro
          cardContainers.forEach(function (card) {
              // Si el filtro es 'todos', muestra todas las tarjetas
              if (filterValue === 'todos') {
                  card.style.display = 'block';
              } else {
                  // Si la tarjeta tiene la clase del filtro, la muestra
                  if (card.classList.contains(filterValue)) {
                      card.style.display = 'block';
                  } else {
                      // Si no tiene la clase del filtro, la oculta
                      card.style.display = 'none';
                  }
              }
          });
      });
  });
});
