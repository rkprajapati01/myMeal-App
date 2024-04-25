let currentMeal = JSON.parse(localStorage.getItem('currentMeal'));
console.log(currentMeal);

let previewUrl = currentMeal.strMealThumb;

document.querySelector('.mealPreview').setAttribute('src', `${previewUrl}`);