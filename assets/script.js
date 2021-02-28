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
            console.log("recipe API", edamamUrl);

            var apiArray = data.hits;
            console.log('apiArray', apiArray);

            apiArray.forEach((data) => {
                console.log('data', data);
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
            console.log("cocktail API", cocktailDBUrl);


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
            console.log(data);
            console.log('ingr1', data.drinks[0].strIngredient1);
            console.log('ing2', data.drinks[0].strIngredient2);
            console.log('ing3', data.drinks[0].strIngredient3);
            console.log('ing4', data.drinks[0].strIngredient4);

            var ingr1 = data.drinks[0].strIngredient1;
            var ingr2 = data.drinks[0].strIngredient2;
            var ingr3 = data.drinks[0].strIngredient3;
            if (data.drinks[0].strIngredient4 !== null && data.drinks[0].strIngredient4 !== undefined) {
                console.log('this this is not null')
                var ingr4 = data.drinks[0].strIngredient4;
            } else {
                console.log('this thing is null');
            }

            console.log('i', i);

            var drinkWrapper = document.getElementById('id-' + i);
            console.log(drinkWrapper, 'drinkWrapper');
            drinkWrapper.innerHTML =
                `<span>${ingr1} </span><br> <span>${ingr2} </span><br> <span>${ingr3} </span><br> <span>${ingr4} </span>`

            // var drinkIngrWrappers = document.querySelectorAll('#id-${i}');
            // for (var i=0; i<6; i++) {
            //     drinkIngrWrappers[i].innerHTML = 
            // }
        })
}

$("#recipeBtn").on("click", function () {
    clearCards();
    var recipeInput = $('#search_input').val().trim();

    if (recipeInput !== "") {
        console.log('recipe button working');
        edamamUrl(recipeInput);
    }
})

$('.drink__select').change(function (e) {
    console.log('e', e);
    $drink = $(".drink__select option:selected").val();
    console.log('$drink', $drink);
    // console.log('$drink', typeOf($drink));
    cocktailDBUrl($drink);
});
// $('.selector').on("click", function (event) {
//     clearCards();
//     console.log('selector click working', event);
//     function drinkFinder(choice) {
//         console.log(choice, 'drink choice');
//         var drinkDropdown = document.querySelectorAll(".drink__choices");
//         console.log(drinkDropdown, 'dropdown function working');


//         var drinkChoice = event.target.innerText;
//         cocktailDBUrl(drinkChoice);
//     }
// })

// drinkFinder();


