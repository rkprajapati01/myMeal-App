let favoriteList = [];


const searchTextEl = document.querySelector('.searchText');
const resultCountEl = document.querySelector('.resultCount');
const inputElement = document.getElementById('mealNameInput');

function debounce(fn, delay) {
    let timer;
    return (...arg) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...arg);
        }, delay);
    }
}

function getResponse(event) {
    let value = event.target.value;
    mealCardContainerEl.textContent = "";
    searchTextEl.textContent = value;
    if (value !== "") {
        getMealData(value);
    }
}

const debounced = debounce(getResponse, 1000);

inputElement.addEventListener('input', debounced);



function getMealData(refrenceText) {
    let mealData = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${refrenceText}`);
    mealData.then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
        .then(data => {
            console.log(data);

            if (data.meals !== null) {
                resultCountEl.textContent = data.meals.length;
                data.meals.forEach(meal => {
                    createMealCard(meal)
                });
            } else {
                resultCountEl.textContent = 0;
            }

        })
}

let mealCardContainerEl = document.getElementById('mealCardContainer');

function createMealCard(mealData) {
    let mealCardEl = document.createElement('div');
    mealCardEl.classList.add('mealCard');
    let mealThumbEl = document.createElement('img');
    mealThumbEl.setAttribute('src', `${mealData.strMealThumb}`);
    mealThumbEl.classList.add('mealThumb');
    let mealDescEl = document.createElement('div');
    mealDescEl.classList.add('mealDesc');

    let mealNameEl = document.createElement('p');
    mealNameEl.textContent = mealData.strMeal;
    let favoriteButtonContainerEl = createFavButton();
    mealDescEl.append(mealNameEl, favoriteButtonContainerEl);

    mealCardEl.append(mealThumbEl, mealDescEl);
    mealCardContainerEl.appendChild(mealCardEl);
}

function createFavButton() {
    let favoriteButtonContainerEl = document.createElement('label');
    favoriteButtonContainerEl.classList.add('favoriteButtonContainer');
    let heartIconEl = document.createElement('i');
    heartIconEl.classList.add('material-icons');
    heartIconEl.textContent = 'favorite';
    let favInputEl = document.createElement('input');
    favInputEl.setAttribute('type', 'checkbox');
    favoriteButtonContainerEl.append(favInputEl, heartIconEl);

    favInputEl.addEventListener('change', (event) => {
        if (event.target.checked) {
            heartIconEl.style.color = 'red';
        }
        event.target.disabled = true;
    });
    return favoriteButtonContainerEl;
}



