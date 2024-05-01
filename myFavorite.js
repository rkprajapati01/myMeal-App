// Variable declaration area
let favoriteList;
let currentMeal;

// DOM link Area
const favoriteMealsContainerEl = document.getElementById('favoriteMealsContainer');
const totalFavoriteEl = document.getElementById('totalFavorite');
const hamburgerEl = document.querySelector('.hamburger');
const navTabsEl = document.getElementById('navTabs');


// Event Listners Area
window.addEventListener('resize', () => {
    if (window.innerWidth > 1040) {
        navTabsEl.style.display = 'none';
    }
});
window.addEventListener('beforeunload', updateLocalStorage);
// Getting favorite list data from local storage initially
document.addEventListener('DOMContentLoaded', () => {
    favoriteList = JSON.parse(localStorage.getItem('favoriteList'));
    updateTotalFavMealCount();
    renderFavMealFromList();
});

hamburgerEl.addEventListener('click', () => {
    if (navTabsEl.style.display === "flex") {
        navTabsEl.style.display = 'none';
    } else {
        navTabsEl.style.display = 'flex';
    }
})

// Updating Toatal count of fav meal present in list into Nav bar
function updateTotalFavMealCount() {
    if (favoriteList.length !== 0) {
        totalFavoriteEl.textContent = favoriteList.length;
    } else {
        totalFavoriteEl.textContent = 0;
    }
}
// creating and appending meal card from favorite list
function renderFavMealFromList() {
    favoriteList.forEach((meal) => {
        let newFavMealCard = createFavMealCard(meal);
        favoriteMealsContainerEl.appendChild(newFavMealCard);
    })

}
// function to create single mealCard
function createFavMealCard(meal) {
    let mealCardEl = document.createElement('div');
    mealCardEl.classList.add('favMealCard');

    let mealNameEl = document.createElement('h2');
    mealNameEl.textContent = meal.strMeal;

    let mealThumbAndDescContainerEl = document.createElement('div');
    mealThumbAndDescContainerEl.classList.add('mealThumbAndDescContainer');

    let mealThumbContainerEl = document.createElement('div');
    mealThumbContainerEl.classList.add('mealThumbContainer');
    let mealThumbEl = document.createElement('img');
    mealThumbEl.setAttribute('src', `${meal.strMealThumb}`);
    mealThumbEl.classList.add('mealThumb');
    mealThumbEl.classList.add('fullHeight');
    mealThumbContainerEl.appendChild(mealThumbEl);
    // Event listner for opening meal Detail page
    mealThumbContainerEl.addEventListener('click', () => {
        currentMeal = meal;
        window.location.href = './mealDetail.html';
    })

    let mealDescEl = document.createElement('div');
    mealDescEl.classList.add('mealDescContainer');


    let mealInstructionEl = document.createElement('p');
    mealInstructionEl.textContent = meal.strInstructions;
    let removeFavBtnEl = document.createElement('button');
    removeFavBtnEl.textContent = 'Remove from Favorite';
    // Event listner for removing meal from favorite list
    removeFavBtnEl.addEventListener('click', () => {
        favoriteList = favoriteList.filter((oneMeal) => oneMeal !== meal);
        favoriteMealsContainerEl.removeChild(mealCardEl);
        updateTotalFavMealCount();
    })
    mealDescEl.append(mealInstructionEl, removeFavBtnEl);
    mealThumbAndDescContainerEl.append(mealThumbContainerEl, mealDescEl);
    mealCardEl.append(mealNameEl, mealThumbAndDescContainerEl);
    return mealCardEl;
}
// function for updating favorite list and current meal into local storage before reloding the page
function updateLocalStorage() {
    localStorage.clear();
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal))
}
