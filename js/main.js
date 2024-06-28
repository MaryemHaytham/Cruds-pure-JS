var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var searchInput = document.getElementById('searchInput');
var addBtn = document.getElementById('add')
var editBtn = document.getElementById('edit')



var ProductContainer = [];
var currentIndex = -1;


if(localStorage.getItem('products') != null){
   ProductContainer = JSON.parse( localStorage.getItem('products'));
   displayProducts(ProductContainer)
}

function addProduct(){
    if(validation()==true){
        var product = {
            productname:productName.value,
            Price:productPrice.value,
            category:productCategory.value,
            desc:productDescription.value
        }
        ProductContainer.push(product);
        localStorage.setItem('products',JSON.stringify(ProductContainer))
        displayProducts(ProductContainer);
        clearForm(); 
    }
    else{
        alert('Duplicate product name')
    }
    

}

function clearForm(){
    productName.value = '';
    productCategory.value = '';
    productDescription.value = '';
    productPrice.value = '';
}

function displayProducts(arr){
    var productList = ``
    for(var i = 0; i < arr.length;i++){
        productList += ` <tr>
                    <td>${arr[i].productname}</td>
                    <td>${arr[i].Price}</td>
                    <td>${arr[i].category}</td>
                    <td>${arr[i].desc}</td>
                    <td> <button onClick="setEditForm(${i})" class="btn btn-success">Update</button></td>
                    <td> <button onClick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                </tr>`
    }
    document.getElementById('tableBody').innerHTML = productList;
}


function deleteProduct(productIndex){
    ProductContainer.splice(productIndex,1)
    localStorage.setItem("products", JSON.stringify(ProductContainer))
    displayProducts(ProductContainer);
}

function searchProduct(term){
    var searchMatch = [];
    for(var i =0 ;i<ProductContainer.length;i++){
        if(ProductContainer[i].productname.toLowerCase().includes(term.toLowerCase())===true){
            searchMatch.push(ProductContainer[i])
            
        }
    }
    console.log(searchMatch)
    displayProducts(searchMatch)
}
searchProduct(searchInput);

function setEditForm(i){
    currentIndex = i
    addBtn.classList.replace('d-block', 'd-none');
    editBtn.classList.replace('d-none','d-block');
    productName.value = ProductContainer[i].productname;
    productCategory.value = ProductContainer[i].category;
    productPrice.value = ProductContainer[i].Price;
    productDescription.value = ProductContainer[i].desc;
}

function editProduct(){
    var product = {
        productname: productName.value,
        Price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value
    }
    ProductContainer[currentIndex] = product;
    localStorage.setItem('products', JSON.stringify(ProductContainer));
    displayProducts(ProductContainer);
    clearForm();
    addBtn.classList.replace('d-none', 'd-block');
    editBtn.classList.replace('d-block', 'd-none');
}

function validation(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    if(regex.test(productName.value)==true){
        return true;
    }
    else{
        return false;
    }

}