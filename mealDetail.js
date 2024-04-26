let currentMeal = JSON.parse(localStorage.getItem('currentMeal'));
console.log(currentMeal);

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

function createIngredientElement(ingredient, measure) {
    let divEl = document.createElement('div');
    let ingredientEl = document.createElement('p');
    ingredientEl.textContent = ingredient;
    let measureEl = document.createElement('p');
    measureEl.textContent = measure;
    divEl.append(ingredientEl, measureEl);
    return divEl;
}

let mealDetailContainerEl = document.getElementById('mealDetailContainer');



let a = `<h2 class="mealName">${currentMeal.strMeal}</h2>
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

mealDetailContainerEl.innerHTML = a;
console.log(ingredientContainerEl);
console.log(JSON.stringify(ingredientContainerEl));

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.ingredientContainer').appendChild(ingredientContainerEl);
})

