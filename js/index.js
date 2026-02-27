let dataNameInput = document.getElementById("data");
let searchNameInput = document.getElementById("search");

let toDoList = [];

let Submit = document.getElementById("Submit");
let UpDate = document.getElementById("UpDate");

let currentIndex = 0;

if (localStorage.getItem("cardList") !== null) {
  toDoList = JSON.parse(localStorage.getItem("cardList"));
  disPlayDate();
}

dataNameInput.addEventListener("input", validationData);

function addProduct() {
  if (validationData()) {
    let list = {
      data: dataNameInput.value,
    };

    toDoList.push(list);

    localStorage.setItem("cardList", JSON.stringify(toDoList));

    disPlayDate();

    console.log(toDoList);

    clearForm();
  }
}

function disPlayDate() {
  let cartona = "";

  for (let i = 0; i < toDoList.length; i++) {
    cartona += `
    <div class="w-100 d-flex justify-content-between align-items-center bg-transparent output p-2 rounded-3 mb-3">
        <div>
            <p>Task ${i + 1}</p> 
            <p>${toDoList[i].data}</p>
        </div>
        <div class="d-flex buttons">
            <button type="button" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can po"></i></button>            
            <button type="button" onclick="upDate(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
    </div>
    `;
  }

  document.getElementById("rowData").innerHTML = cartona;
}

function clearForm() {
  dataNameInput.value = null;
}

function deleteItem(index) {
  toDoList.splice(index, 1);

  disPlayDate();

  localStorage.setItem("cardList", JSON.stringify(toDoList));
}

function searchData() {
  let term = searchNameInput.value;

  let cartona = "";

  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].data.toLowerCase().includes(term.toLowerCase())) {
      cartona += `
        <div class="w-100 d-flex justify-content-between align-items-center bg-transparent output p-2 rounded-3 mb-3">
            <div>
                <p>Task ${i + 1}</p> 
                <p>${toDoList[i].data}</p>
            </div>
            <div class="d-flex buttons">
                <button type="button" onclick="deleteItem(${i})"><i class="fa-solid fa-trash-can po"></i></button>            
                <button type="button" onclick="upDate(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>
        </div>
    `;
    }
  }

  document.getElementById("rowData").innerHTML = cartona;
}

function upDate(index) {
  currentIndex = index;

  dataNameInput.value = toDoList[index].data;

  Submit.classList.add("d-none");
  UpDate.classList.remove("d-none");
}

function upDateProduct() {
  if (validationData()) {
    let list = {
      data: dataNameInput.value,
    };

    toDoList.splice(currentIndex, 1, list);

    localStorage.setItem("cardList", JSON.stringify(toDoList));

    disPlayDate();
    Submit.classList.remove("d-none");
    UpDate.classList.add("d-none");

    clearForm();
  }
}

function validationData() {
  let regex = /^[A-Za-z0-9 ]{3,50}$/;

  let text = dataNameInput.value;

  let msgData = document.getElementById("msgData");

  if (regex.test(text)) {
    dataNameInput.classList.add("is-valid");
    dataNameInput.classList.remove("is-invalid");
    msgData.classList.add("d-none");
    return true;
  } else {
    dataNameInput.classList.add("is-invalid");
    dataNameInput.classList.remove("is-valid");
    msgData.classList.remove("d-none");
    return false;
  }
}
