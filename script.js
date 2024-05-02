// Variable Declaration Area
let favoriteList;
let currentMeal;

// DOM link Area
const searchTextEl = document.querySelector('.searchText');
const resultCountEl = document.querySelector('.resultCount');
const inputElement = document.getElementById('mealNameInput');
const mealCardContainerEl = document.getElementById('mealCardContainer');
const hamburgerEl = document.querySelector('.hamburger');
const navTabsEl = document.getElementById('navTabs');

// Event Listners Area
window.addEventListener('resize', () => {
    if (window.innerWidth > 1040) {
        navTabsEl.style.display = 'none';
    }
});

window.addEventListener('beforeunload', updateLocalStorage);
document.addEventListener('DOMContentLoaded', () => {
    renderFavMealFromLocalStorage();
    getResponse();
});
const debouncedFun = debounce(getResponse, 1000);

inputElement.addEventListener('input', debouncedFun);

function debounce(func, delay) {
    let timeout = null
    return (...args) => {
        if (timeout) clearTimeout(timeout)

        timeout = setTimeout(() => {
            func(...args)
            timeout = null
        }, delay)
    }
}

hamburgerEl.addEventListener('click', () => {
    if (navTabsEl.style.display === "flex") {
        navTabsEl.style.display = 'none';
    } else {
        navTabsEl.style.display = 'flex';
    }
})

// fetching saved favorite meals detail from local storage
function renderFavMealFromLocalStorage() {
    let tempList = localStorage.getItem('favoriteList');
    if (tempList !== undefined && tempList !== 'undefined' && tempList !== null) {
        favoriteList = JSON.parse(tempList);
    } else {
        favoriteList = [];
    }
}
// Calling fetchMealData as per text entered into Input
function getResponse() {
    let value = inputElement.value;
    mealCardContainerEl.textContent = "";
    searchTextEl.textContent = value;
    if (value !== "") {
        fetchMealData(value);
    } else {
        resultCountEl.textContent = 0;
    }
}

function fetchMealData(refrenceText) {
    let mealData = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${refrenceText}`);
    mealData.then(response => {
        if (!response.ok) {
            mealCardContainerEl.innerHTML = `<p style="font-style: italic; text-align: center;">Slow Internet Connection, Unable to get the data from API</p>`;

        }
        return response.json();
    })
        .then(data => {
            if (data.meals !== null) {
                resultCountEl.textContent = data.meals.length;
                data.meals.forEach(meal => {
                    createMealCard(meal)
                });
            } else {
                resultCountEl.textContent = 0;
                mealCardContainerEl.innerHTML = `<p style="font-style: italic; text-align: center;">No Meals Found</p>`;
            }
        })
    // .catch(err => {
    //     mealCardContainerEl.innerHTML = `<p style="font-style: italic; text-align: center;">${err}</p>`;
    // })
}

function createMealCard(mealData) {
    let mealCardEl = document.createElement('div');
    mealCardEl.classList.add('mealCard');
    let mealThumbEl = document.createElement('img');
    mealThumbEl.setAttribute('src', `${mealData.strMealThumb}`);
    mealThumbEl.classList.add('mealThumb');
    mealThumbEl.classList.add('smallHeight');


    // Event listner for opening meal Detail page
    mealThumbEl.addEventListener('click', () => {
        currentMeal = mealData;
        window.location.href = './mealDetail.html';
    })
    let mealDescEl = document.createElement('div');
    mealDescEl.classList.add('mealDesc');

    let mealNameEl = document.createElement('p');
    mealNameEl.textContent = mealData.strMeal;
    let favoriteButtonContainerEl = createFavButton(mealData);
    mealDescEl.append(mealNameEl, favoriteButtonContainerEl);

    mealCardEl.append(mealThumbEl, mealDescEl);
    mealCardContainerEl.appendChild(mealCardEl);
}

function createFavButton(mealData) {
    let favoriteButtonContainerEl = document.createElement('label');
    favoriteButtonContainerEl.classList.add('favoriteButtonContainer');
    let heartIconEl = document.createElement('i');
    heartIconEl.classList.add('material-icons');
    heartIconEl.textContent = 'favorite';
    let favInputEl = document.createElement('input');
    favInputEl.setAttribute('type', 'checkbox');

    // checking already present meals in favorite list
    if (favoriteList.some((meal) => meal.idMeal == mealData.idMeal)) {
        favInputEl.checked = true;
        heartIconEl.style.color = 'red';
        favInputEl.disabled = true;
    }

    favoriteButtonContainerEl.append(favInputEl, heartIconEl);
    // adding meals into favorite list
    favInputEl.addEventListener('change', (event) => {
        if (event.target.checked) {
            heartIconEl.style.color = 'red';
            favoriteList.push(mealData);

        }
        event.target.disabled = true;
    });
    return favoriteButtonContainerEl;
}


// function for storing favorite list and currently selected meal before reloding the page
function updateLocalStorage() {
    localStorage.clear();
    localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
    localStorage.setItem('currentMeal', JSON.stringify(currentMeal));
}






