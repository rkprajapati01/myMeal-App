// getting current meal data from local storage
let currentMeal = JSON.parse(localStorage.getItem('currentMeal'));

// DOM linking area
let mealDetailContainerEl = document.getElementById('mealDetailContainer');
const hamburgerEl = document.querySelector('.hamburger');
const navTabsEl = document.getElementById('navTabs');

// Event listners area
window.addEventListener('resize', () => {
    if (window.innerWidth > 1040) {
        navTabsEl.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderMealDetail(currentMeal);
    let ingredientsContainer = createIngredientsWithContainer();
    document.querySelector('.ingredientContainer').appendChild(ingredientsContainer); // adding listners here so that innerHTML DOM has loaded
})

hamburgerEl.addEventListener('click', () => {
    if (navTabsEl.style.display === "flex") {
        navTabsEl.style.display = 'none';
    } else {
        navTabsEl.style.display = 'flex';
    }
})

// function for creating ingredients with container
function createIngredientsWithContainer() {

    let ingredientContainerEl = document.createElement('div');
    ingredientContainerEl.classList.add('ingredients');

    for (let index = 1; index <= 20; index++) {
        const ingredient = currentMeal[`strIngredient${index}`];
        const measure = currentMeal[`strMeasure${index}`];
        if (ingredient !== "" && ingredient !== null) {
            let newIngredient = createIngredientElement(ingredient, measure);
            ingredientContainerEl.appendChild(newIngredient);
        }
    }
    return ingredientContainerEl;
}
// function for creating single ingredient element
function createIngredientElement(ingredient, measure) {
    let divEl = document.createElement('div');
    let ingredientEl = document.createElement('p');
    ingredientEl.textContent = ingredient;
    let measureEl = document.createElement('p');
    measureEl.textContent = measure;
    divEl.append(ingredientEl, measureEl);
    return divEl;
}

// function for rendering non dynamic element to DOM with appropriate text content
function renderMealDetail(currentMeal) {
    let text = `<h2 class="mealName">${currentMeal.strMeal}</h2>
    <div class="thumbAndIngredientContainer">
    <div class="mealPreview">
    <img src=${currentMeal.strMealThumb} alt="">
    </div>
    <div class="ingredientContainer">
    <h3>Ingredients</h3>
    </div>
    </div>
    <div class="instructionContainer">
    <h3>Instructions</h3>
    <p class="instructions">${currentMeal.strInstructions}</p>
    </div>
    `;
    mealDetailContainerEl.innerHTML = text;
}



