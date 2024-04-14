const inputElement = document.getElementById('mealNameInput');

inputElement.addEventListener('input', function (event) {
    getMealData(this.value);
});


function getMealData(refrenceText) {
    let mealData = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${refrenceText}`);
    mealData.then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
            // console.log(data.meals[0]);
            mealCardContainerEl.textContent = "";
            data.meals.forEach(meal => {
                createMealCard(meal)
            });

        })
}

let mealCardContainerEl = document.getElementById('mealCardContainer');

function createMealCard(mealData) {
    let mealCardEl = document.createElement('div');
    // mealCardEl.style.backgroundImage = `url(${mealData.strMealThumb})`;
    mealCardEl.classList.add('mealCard');
    let mealThumbEl = document.createElement('img');
    console.log(mealData.strMealThumb);
    mealThumbEl.setAttribute('src', `${mealData.strMealThumb}`);
    mealThumbEl.classList.add('mealThumb');
    let mealDescEl = document.createElement('div');

    let mealNameEl = document.createElement('p');
    mealNameEl.textContent = `${mealData.strMeal}`;
    let favBtnEl = document.createElement('input')
    favBtnEl.setAttribute('type', 'button');
    mealDescEl.append(mealNameEl, favBtnEl);
    mealCardEl.append(mealThumbEl, mealDescEl);
    mealCardContainerEl.appendChild(mealCardEl);
}   
