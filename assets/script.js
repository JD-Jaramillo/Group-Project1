// Global variables selecting recipe and drink value input by the user, as well as the search history for the search buttons 
var recipeCardWrapperBlock = document.querySelector('.card-wrapper-block');
var drinksCardWrapperBlock = document.querySelector('.card__wrapper-block');
var searchHistoryWrapper = document.querySelector('.search_history');

// This gets the search results that were stored in local storage, and creates a button with the content into the inner HTML of the button and appends the buttons to the other search buttons already on the page 
var searchHistoryArray = JSON.parse(localStorage.getItem('IngSearched')) || [];
function createSearchHistoryButtons() {
    searchHistoryWrapper.innerHTML = '';
    // Uses the for each loop to add a button for each variable that was taken out of local storage 
    searchHistoryArray.forEach((search) => {
        var searchEl = document.createElement("button");
        searchEl.classList.add('button');
        searchEl.classList.add('is-primary');
        searchEl.classList.add('is-rounded');
        searchEl.classList.add(':hover');
        searchEl.innerHTML = search;
        searchHistoryWrapper.appendChild(searchEl);
    })
}
// calls the funcion above at the start of page 
createSearchHistoryButtons();

// Function calling the Edamam API  and also removing the hidden class from the recipe Options title on the page 
function edamamUrl(recipeInput) {
    console.log(" recipe function working");
    var edamamUrl = 'https://edamamproxy.herokuapp.com/to=6&q=' + recipeInput;
    var recipeTitle = document.querySelector('.description-recipe');
    recipeTitle.classList.remove('is-hidden');

    fetch(edamamUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // crestes an array of the data that we need to target from the API results, and if there are no results then it shows "No results found"
            var apiArray = data.hits;
            if (!apiArray.length) {
                recipeCardWrapperBlock.innerHTML = '<h2>No Results Found</h2>';
                return;
            }
            // For each loop created to get the data (name, image and ingredients) from each of the 6 indexes out of the API results and inssets the results into the innerHTML as a link 
            apiArray.forEach((data) => {
                var recipeName = data.recipe.label;
                var recipeImg = data.recipe.image;
                var recipeIngr = data.recipe.ingredientLines;
                var recipeUrl = data.recipe.url;

                var recipeCardWrapper = document.createElement("a");
                recipeCardWrapper.classList.add('card__link-tag');
                recipeCardWrapper.target = "_blank";
                recipeCardWrapper.href = recipeUrl;
                recipeCardWrapper.innerHTML =
                    `<div class="card"> <div class="card-image">
                <figure class="image is-4by3">
                <img src="${recipeImg}" alt="Placeholder image">
                </figure>
                </div>
                <div class="card-content">
                <div class="media">
                <div class="media-content">
                <p class="title is-4">${recipeName}</p>
                </div>
                </div>
                
                <div class="content">
                ${recipeIngr}
                </div>
                </div></div>`
                recipeCardWrapperBlock.appendChild(recipeCardWrapper);
            });

        })
};

// This function clears out the recipe cards every time a search button for recipes is clicked or a new search value is put in
function clearCards() {
    recipeCardWrapperBlock.innerHTML = ' ';
}

// This function clears out the drinks cards every time a new search value from the dropdown options is selected
function clearDrinks() {
    drinksCardWrapperBlock.innerHTML = ' ';
}

// Function calling the API for Cocktails and removing the hidden class from the drink options title 
function cocktailDBUrl(drinkChoice) {
    console.log("cocktail function working");
    var cocktailDBUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + drinkChoice;
    var drinkSearchTitle = document.querySelector('.drink_options');
    drinkSearchTitle.classList.remove('is-hidden');
    var drinkTitle = document.querySelector('.description-drinks');
    drinkTitle.classList.remove('is-hidden');

    fetch(cocktailDBUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // For loop which is making sure that we only get the data from the first 6 indexes of the API array 
            for (var i = 0; i < 6; i++) {

                var drinksApiArray1 = data.drinks[i];
                if (!drinksApiArray1) {
                    drinksCardWrapperBlock.innerHTML = '<h2>No Results Found</h2>';
                    return;
                }
                // local variables gettting the data we need for the name, image and ID of the drink, these variables are then used below to create a new card in innerHTML with the data 
                var drinkName = drinksApiArray1.strDrink;
                var drinkImage = drinksApiArray1.strDrinkThumb;
                var drinkId = drinksApiArray1.idDrink;

                var drinksCardWrapper = document.createElement("a");
                drinksCardWrapper.classList.add('card__link-tag');
                drinksCardWrapper.target = "_blank";
                drinksCardWrapper.innerHTML =
                    `<div class="card"> <div class="card-image">
                <figure class="image is-4by3">
                <img src="${drinkImage}" alt="Placeholder image">
                </figure>
                </div>
                <div class="card-content">
                <div class="media">
                <div class="media-content">
                <p class="title is-4">${drinkName}</p>
                </div>
                </div>

                <div id="id-${i}" class="content drink__ingr-content">
                ${drinkId}
                </div>
                </div></div>`
                drinksCardWrapperBlock.appendChild(drinksCardWrapper);

                // fetching the same API again below this and passig through the drink ID and the i from the for loop 
                fetchDrinkIngredients(drinkId, i);

            }
        });
}
// Fetches the cocktail API a second time in order to get the ingredientsList for each drink using the Drink ID 
function fetchDrinkIngredients(drinkId, i) {
    var drinkIngrUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId;

    fetch(drinkIngrUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // THese IF's are making sure that the ingredients for each drink do not come back null or undefined or esle we simply leave the space blank 
            if (data.drinks[0].strIngredient1 !== null && data.drinks[0].strIngredient1 !== undefined) {
                var ingr1 = data.drinks[0].strIngredient1;
            } else {
                var ingr1 = '';
            }
            if (data.drinks[0].strIngredient2 !== null && data.drinks[0].strIngredient2 !== undefined) {
                var ingr2 = data.drinks[0].strIngredient2;
            } else {
                var ingr2 = '';
            }
            if (data.drinks[0].strIngredient3 !== null && data.drinks[0].strIngredient3 !== undefined) {
                var ingr3 = data.drinks[0].strIngredient3;
            } else {
                var ingr3 = '';
            }

            if (data.drinks[0].strIngredient4 !== null && data.drinks[0].strIngredient4 !== undefined) {
                var ingr4 = data.drinks[0].strIngredient4;
            } else {
                var ingr4 = '';
            }

            if (data.drinks[0].strIngredient5 !== null && data.drinks[0].strIngredient5 !== undefined) {
                var ingr5 = data.drinks[0].strIngredient5;
            } else {
                var ingr5 = '';
            }
            // This inserts the drink ingredients gathered above as innerHTML into the drinks card 
            var drinkWrapper = document.getElementById('id-' + i);
            drinkWrapper.innerHTML =
                `<span>${ingr1} </span><br> <span>${ingr2} </span><br> <span>${ingr3} </span><br> <span>${ingr4} </span> <br> <span>${ingr5} </span>`
        })
}
// This click event is listening for data to be input into the search bar, then getting that value (making sure it's not empty), storing it into local storage, and passing it to the Edamam API 
$("#recipeBtn").on("click", function () {
    clearCards();
    var recipeInput = $('#search_input').val().trim();

    if (recipeInput !== "") {
        searchHistoryArray.push(recipeInput);
        localStorage.setItem('IngSearched', JSON.stringify(searchHistoryArray));
        edamamUrl(recipeInput);
        createSearchHistoryButtons();
    }
})
// This event is listening for the dropdown, making sure to clear the drink cards first, and then passing on the value selected in the dropdown to the cocktail API 
$('.drink__select').change(function (e) {
    clearDrinks();
    $drink = $(".drink__select option:selected").val();
    cocktailDBUrl($drink);
});

// This click event is listening for the search buttons below the search bar to be clicked and then passingng on the value of that button to the Edamam API (making sure to clear the cards every time)
$(".button_searches").on("click", ".button", function () {
    clearCards();
    edamamUrl($(this).text());
});





