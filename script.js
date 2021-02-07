const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event handler
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let mealListInfo = "";
        if(data.meals){
            data.meals.forEach(meal => {
                mealListInfo += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" class = "recipe-btn" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            mealListInfo = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = mealListInfo;
    });
}


// get recipe of the meal
function getMealRecipe(event){
    event.preventDefault();
    if(event.target.classList.contains('recipe-btn')){
        let mealItem = event.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal){
    meal = meal[0];
    let recipeMealModel = `
        <h1 class = "recipe-title">${meal.strMeal}</h1>
        <div class = "recipe-instruct">
            <h3>Ingredients :</h3>
            <p>${meal.strInstructions}</p>
        </div>
        
    `;
    mealDetailsContent.innerHTML = recipeMealModel;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}