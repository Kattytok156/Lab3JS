let PRODUCTS = [
  {
    name: "Помідори",
    count: 1,
    isBought: false,
    isEditing: false,
  },
  {
    name: "Печиво",
    count: 1,
    isBought: false,
    isEditing: false,
  },
  {
    name: "Сир",
    count: 1,
    isBought: false,
    isEditing: false,
  },
];

// Таблиця продуктів
function renderProducts() {
  const list = document.getElementById("list");

  list.innerHTML = "";

  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];

    if (currentProduct.isBought) {
      list.innerHTML += `
    <div class="add-row">
      <div class="iteam-name" id="crossed">${currentProduct.name}</div>
      <div class="plus-amount-minus">
      <span class="amount-add">${currentProduct.count}</span>
      </div>
      <div class="bought-cross">
      <button class="bought" value="не купувати" data-tooltip="Not yet" onclick="unBuy('${currentProduct.name}')">Не купувати
      </button>
      </div>
    </div>
          <hr />`;
    } else {
      if (currentProduct.isEditing) {
        list.innerHTML += `
  <div class="add-row">
      <div class="iteam-name"><input class="adding-input" id="newName" type="text" value="${currentProduct.name}"/> 
      <button id="newElemBtn" onclick="saveNewProductName('${currentProduct.name}')">✓</button></div>
      <div class="plus-amount-minus">
      <button class="minus" id="minus-one" data-tooltip="Want less?" onclick="removeOne('${currentProduct.name}')">—</button><span class="amount-add">${currentProduct.count}</span><button class="plus" data-tooltip="Want more?" onclick="addOne('${currentProduct.name}')">+</button></div>
      <div class="bought-cross"> <button class="bought" data-tooltip="Bought" onclick="letsBuy('${currentProduct.name}')">Купити</button><button class="cross" data-tooltip="Delete?" onclick="deleteProduct('${currentProduct.name}')">x</button></div>
    </div>
    <hr />
  `;
      } else {
        list.innerHTML += `
    <div class="add-row">
      <div class="iteam-name" onclick="replace('${currentProduct.name}')">${currentProduct.name}</div>
      <div class="plus-amount-minus">
      <button class="minus" id="minus-one" data-tooltip="Want less?" onclick="removeOne('${currentProduct.name}')">—</button><span class="amount-add">${currentProduct.count}</span><button class="plus" data-tooltip="Want more?" onclick="addOne('${currentProduct.name}')">+</button></div>
      <div class="bought-cross"> <button class="bought" data-tooltip="Bought" onclick="letsBuy('${currentProduct.name}')">Купити</button><button class="cross" data-tooltip="Delete?" onclick="deleteProduct('${currentProduct.name}')">x</button></div>
    </div>
    <hr />
  `;
      }
    }
  }
  updateStatistics();
}

renderProducts();

//Реакція на клік "Додати"

const addButton = document.getElementById("addbtn");

addButton.addEventListener("click", function () {
  const input = document.getElementById("product-name");
  const productName = input.value;
  const count = 1;
  PRODUCTS.push({
    name: productName,
    count: count,
    isBought: false,
    isEditing: false,
  });
  renderProducts();
  input.value = "";
  input.focus();
});

//Видалення продукта при натисненні на хрестик

function deleteProduct(name) {
  for (let i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].name === name) {
      PRODUCTS.splice([i], 1);
    }
  }

  renderProducts();
}

//Купівля продукта

function letsBuy(name) {
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    if (currentProduct.name === name) {
      currentProduct.isBought = true;
    }
  }
  renderProducts();
}

//Не купувати продукт

function unBuy(name) {
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    if (currentProduct.name === name) {
      currentProduct.isBought = false;
    }
  }
  renderProducts();
}

//Додати одиницю товару

function addOne(name) {
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    if (currentProduct.name === name) {
      currentProduct.count += 1;
    }
  }
  renderProducts();
}

//Відняти одиницю товару

function removeOne(name) {
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    if (currentProduct.name === name) {
      if (currentProduct.count > 1) {
        currentProduct.count -= 1;
      }
    }
  }
  renderProducts();
}

//Вписання нового продукту на місце старого

function replace(name) {
  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];
    if (currentProduct.name === name) {
      currentProduct.isEditing = true;
    }
  }
  renderProducts();
}

//збереження нового продукту

function saveNewProductName(name) {
  const saveNewProductNameButton = event.target;
  const newProductNameInput = saveNewProductNameButton.previousElementSibling;
  const newProductName = newProductNameInput.value;

  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];

    if (currentProduct.name === name) {
      currentProduct.name = newProductName;
      currentProduct.isEditing = false;
    }
  }

  renderProducts();
}

//Оновлення статистики

function updateStatistics() {
  const stillInProgress = document.getElementById("still-in-progress");
  const inBasket = document.getElementById("in-basket");
  stillInProgress.innerHTML = "";
  inBasket.innerHTML = "";

  for (let i = 0; i < PRODUCTS.length; i++) {
    const currentProduct = PRODUCTS[i];

    if (currentProduct.isBought) {
      inBasket.innerHTML += `
        <span class="product-item">${currentProduct.name}
<span class="amount-result">${currentProduct.count}</span></span>`;
    } else {
      stillInProgress.innerHTML += `
        <span class="product-item">${currentProduct.name}
        <span class="amount-result">${currentProduct.count}</span></span>
      `;
    }
  }
}
