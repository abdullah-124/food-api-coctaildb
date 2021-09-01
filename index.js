// console.log('hello');
const defaultBox = document.getElementById('default-box');
const infoBox = document.getElementById('infoBox')
const search = document.getElementById('searchField')


const contentBox = document.getElementById('contentBox')
contentBox.classList.add('d-none')
function remove(){
    contentBox.classList.add('d-none')
}
// const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`
const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`
fetch(url)
    .then(res => res.json())
    .then(data => showData(data.drinks))

const showData = (dataBase) => {
    // console.log(data);
    let count = 0
    for (const data of dataBase) {
        // console.log(data); 
        const div = document.createElement('div');
        div.classList.add('col-lg-2');
        div.classList.add('col-md-4');
        div.classList.add('col-12');
        if(count < 18){
            count = count + 1;
            div.innerHTML = `
            <div class="card-shadow card bg-dark border-0 text-white mt-4">
                <img src="${data.strDrinkThumb}" class="card-img img-fluid" alt="...">
                <div class="card-img-overlay pt-5 text-center info">
                    <h4 class="card-title">${data.strDrink}</h4>
                    <a class="text-warning" onclick="addDetaiels(${data.idDrink})">Click To See More</a>
                </div>
            </div>
        `
        defaultBox.appendChild(div)
        }
    }
}

function addDetaiels(food){
    // infoBox.style.display = ''
    contentBox.classList.remove('d-none')
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${food}`)
    .then(res => res.json())
    .then(data => showDetaels(data.drinks[0]))
    // console.log(food.strDrink);
}
const showDetaels = (food) =>{
    infoBox.innerHTML = ''
    const div = document.createElement('div')
    div.innerHTML = `
        <h4 class="text-success">${food.strDrink}</h4>
        <img class="img-fluid" src="${food.strDrinkThumb}" alt="">
        <p class="text-secondary">Category : ${food.strCategory}</p>
        <p class="text-secondary">Type: ${food.strAlcoholic}</p>
        <p class="text-secondary">Ingrdient: ${food.strIngredient1}, ${food.strIngredient2}, ${food.strIngredient3}, ${food.strIngredient4}, ${food.strIngredient5} etc</p>
        <p class="text-secondary">Instruction: ${food.strInstructions}</p>
        <p class="text-secondary">Last Modified: ${food.dateModified}</p>
    `
    infoBox.appendChild(div)
    
}

// search 
function seeSearch(){
    defaultBox.innerHTML = ''
    const searchTag = search.value;
    // console.log(searchTag);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTag}`)
    .then(res=> res.json())
    .then(data => showData(data.drinks))
    search.value = ''
}