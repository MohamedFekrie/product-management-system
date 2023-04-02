let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.getElementById("create");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("by-title");
let searchBycategory = document.getElementById("by-category");

let mood = "create";
let tmp;
// get total price

function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#17991f"
    } else {
        total.style.background = "#f03450";
        total.innerHTML = "";
    }
}







// Create Product

let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = [];
}

createBtn.onclick = () => {
    let newData = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    // clean Data
    if (title.value != "" && price.value != "" && count.value <= 100 && category.value != "") {
        if (mood === "create") {
            if (newData.count > 1) {
                for (let i = 0; i < newData.count; i++) {
                    dataProduct.push(newData);
                }
            } else {
                dataProduct.push(newData);
            }

        } else {
            dataProduct[tmp] = newData;
            mood = "create";
            createBtn.innerHTML = "Create";
            count.style.display = "block";
        }
        clearInput();
    }



    // Save Data To Local Storage
    localStorage.setItem("product", JSON.stringify(dataProduct));
    // clear inputs
    showData();
}





// Clear Inputs
function clearInput() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}



// Read Data On The Page
function showData() {
    let product = "";
    for (let i = 0; i < dataProduct.length; i++) {
        product += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td style="color: #f03450;">${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td onclick="updateData(${i})" id="btn">Update</td>
                <td onclick="deleteData(${i})" id="btn">Delete</td>
            </tr>
            `;
    }

    document.getElementById("tbody").innerHTML = product;
    // count
    let deleAll = document.getElementById("del-all");
    if (dataProduct.length > 0) {
        deleAll.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
            `
    } else {
        deleAll.innerHTML = ""
    }
    getTotal();
}
showData();





// Delete
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

// Delete All
function deleteAll() {
    dataProduct.splice(0);
    localStorage.clear();
    showData();
}




// Update
function updateData(i) {
    getTotal();
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataProduct[i].category;
    createBtn.innerHTML = "Updata";
    mood = "update";
    tmp = i;
    scroll(0)
}


// Search
let searchMood = "Title";

function getSearchMood(id) {
    if (id === "by-title") {
        searchMood = "Title";
        search.value = "";
    } else {
        searchMood = "Category";
        search.value = "";
    }
    search.placeholder = `Search By ${searchMood}`
    search.focus()
    showData()

}

function searchData(value) {
    let product = "";
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood == "Title") {
            if (dataProduct[i].title.includes(value)) {
                product += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td style="color: #f03450;">${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td onclick="updateData(${i})" id="btn">Update</td>
                <td onclick="deleteData(${i})" id="btn">Delete</td>
            </tr>
            `;
            }
        } else {
            if (dataProduct[i].category.includes(value)) {
                product += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td style="color: #f03450;">${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td onclick="updateData(${i})" id="btn">Update</td>
                <td onclick="deleteData(${i})" id="btn">Delete</td>
            </tr>
            `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = product;
}
