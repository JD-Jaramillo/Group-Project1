var recipeCardWrapperBlock = document.querySelector('.card-wrapper-block');
var drinksCardWrapperBlock = document.querySelector('.card__wrapper-block');


function edamamUrl(recipeInput) {
    console.log(" recipe function working");
    var edamamUrl = 'https://edamamproxy.herokuapp.com/to=6&q=' + recipeInput;

    fetch(edamamUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var apiArray = data.hits;

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

function clearCards() {
    recipeCardWrapperBlock.innerHTML = ' ';
}

function clearDrinks() {
    drinksCardWrapperBlock.innerHTML = ' ';
}

function cocktailDBUrl(drinkChoice) {
    console.log("cocktail function working");
    var cocktailDBUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + drinkChoice;

    fetch(cocktailDBUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (var i = 0; i < 6; i++) {

                var drinksApiArray1 = data.drinks[i];

                console.log("drinksApiArray1 for each ", drinksApiArray1);

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

                fetchDrinkIngredients(drinkId, i);

            }
        });
}

function fetchDrinkIngredients(drinkId, i) {
    var drinkIngrUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId;

    fetch(drinkIngrUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

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

            var drinkWrapper = document.getElementById('id-' + i);
            drinkWrapper.innerHTML =
                `<span>${ingr1} </span><br> <span>${ingr2} </span><br> <span>${ingr3} </span><br> <span>${ingr4} </span> <br> <span>${ingr5} </span>`
        })
}

$("#recipeBtn").on("click", function () {
    clearCards();
    var recipeInput = $('#search_input').val().trim();
    console.log('recipeInput', recipeInput)

    if (recipeInput !== "") {
        edamamUrl(recipeInput);
    }
})

$('.drink__select').change(function (e) {
    clearDrinks();
    $drink = $(".drink__select option:selected").val();
    cocktailDBUrl($drink);
});

function buttonFinder() {
    var ingredientBtns = document.querySelectorAll(".button");

    $(ingredientBtns).on("click", function (event) {
        clearCards();
        var foodFind = event.target.innerText;
        edamamUrl(foodFind);
    });

}
buttonFinder();




