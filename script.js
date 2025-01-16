/* */

const shoppingList = document.querySelector(".shopping-list");
const shoppingForm = document.querySelector(".shopping-form");

document.addEventListener("DOMContentLoaded", function() {
  loadItems();
  shoppingForm.addEventListener("submit", handleFormSubmit); 
});
function loadItems() {
  const items = [
    { id: 1, name: "Yumurta", completed: false },
    { id: 2, name: "Un", completed: true },
    { id: 3, name: "Süt", completed: true },
    { id: 4, name: "Kahve", completed: false },
    { id: 5, name: "Gazoz", completed: false },
  ];
  shoppingList.innerHTML = "";
  for (let item of items) {
    const li = createListItem(item);
    shoppingList.appendChild(li);
  }
}
function addItem(input) {
  const id = generateId();
  console.log(id);
  
  const newItem = createListItem({
    id: generateId(),
    name: input.value,
    completed: false,
  });
  shoppingList.prepend(newItem);
  input.value = "";
}
function generateId() {
  return Date.now().toString();
}
function handleFormSubmit(e) {
  e.preventDefault();

  const input = document.getElementById("item_name");

  if (input.value.trim().length === 0) {
    alert("Lütfen bir ürün adı giriniz");
    return;
  }
  addItem(input);
}
function toggleCompleted(e) {
  const li = e.target.parentElement;
  li.toggleAttribute("item-completed" , e.target.checked);

  
}
function createListItem(item) {
  //item
  const div = document.createElement("div");
  div.textContent = item.name;
  div.className = "item-name";

  //checkbox
  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "form-check-input";
  input.checked = item.completed;
  input.addEventListener("change", toggleCompleted); 

  //delete icon
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fs-3 bi bi-trash text-danger delete-icon";
  deleteIcon.addEventListener("click", removeItem);

  //li
  const li = document.createElement("li");
  li.className = "border rounded p-2 mb-1";
  li.toggleAttribute("item-completed", item.completed);

  li.appendChild(input);
  li.appendChild(div);
  li.appendChild(deleteIcon);

  return li;
}

function removeItem(e) {
  const li = e.target.parentElement;
  shoppingList.removeChild(li);
}