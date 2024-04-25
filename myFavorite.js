let favoriteList = [];
let currentMeal;

// Linking to the DOM
const favoriteMealsContainerEl = document.getElementById('favoriteMealsContainer');
const totalFavoriteEl = document.getElementById('totalFavorite');

favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
totalFavoriteEl.textContent = favoriteList.length;

window.addEventListener('beforeunload', updateLocalStorage);

document.addEventListener('DOMContentLoaded', () => {
    favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    totalFavoriteEl.textContent = favoriteList.length;
});

document.addEventListener('DOMContentLoaded', renderFavMealFromList);


function renderFavMealFromList() {
    favoriteList.forEach((meal) => {
        let newFavMealCard = createFavMealCard(meal);
        favoriteMealsContainerEl.appendChild(newFavMealCard);
    })

}

function createFavMealCard(meal) {
    let mealCardEl = document.createElement('div');
    mealCardEl.classList.add('favMealCard');

    let mealThumbContainerEl = document.createElement('div');
    mealThumbContainerEl.classList.add('mealThumbContainer');
    let mealThumbEl = document.createElement('img');
    mealThumbEl.setAttribute('src', `${meal.strMealThumb}`);
    mealThumbEl.classList.add('mealThumb');
    mealThumbContainerEl.appendChild(mealThumbEl);
    mealThumbContainerEl.addEventListener('click', () => {
        currentMeal = meal;
        window.location.href = '/mealDetail.html';
        console.log(currentMeal);
    })

    let mealDescEl = document.createElement('div');
    mealDescEl.classList.add('mealDescContainer');

    let mealNameEl = document.createElement('h2');
    mealNameEl.textContent = meal.strMeal;
    let mealInstructionEl = document.createElement('p');
    mealInstructionEl.textContent = meal.strInstructions;
    let removeFavBtnEl = document.createElement('button');
    removeFavBtnEl.textContent = 'Remove from Favorite';
    removeFavBtnEl.addEventListener('click', () => {
        favoriteList = favoriteList.filter((oneMeal) => oneMeal !== meal);
        favoriteMealsContainerEl.removeChild(mealCardEl);
    })
    mealDescEl.append(mealNameEl, mealInstructionEl, removeFavBtnEl);

    mealCardEl.append(mealThumbContainerEl, mealDescEl);
    return mealCardEl;
}


function updateLocalStorage() {
    localStorage.clear();
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    console.log(currentMeal);
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal))
}
