// var recipeInput = 'chicken';
var drinkChoice = 'gin';



function edamamUrl(recipeInput) {
    console.log(" recipe function working");
    var edamamUrl = 'https://edamamproxy.herokuapp.com/to=6&q=' + recipeInput;

    fetch(edamamUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("recipe API", edamamUrl);
            var recipeName1 = data.hits[0].recipe.label;
            console.log('name', recipeName1);
            var recipeName1 = data.hits[1].recipe.label;
            console.log('name', recipeName1);
            var recipeName1 = data.hits[2].recipe.label;
            console.log('name', recipeName1);
            var recipeName1 = data.hits[3].recipe.label;
            console.log('name', recipeName1);
            var recipeName1 = data.hits[4].recipe.label;
            console.log('name', recipeName1);
            var recipeName1 = data.hits[5].recipe.label;
            console.log('name', recipeName1);
            var recipeImage1 = data.hits[0].recipe.image;
            console.log('image', recipeImage1);
            var recipeImage2 = data.hits[1].recipe.image;
            console.log('image', recipeImage2);
            var recipeImage3 = data.hits[2].recipe.image;
            console.log('image', recipeImage3);
            var recipeImage4 = data.hits[3].recipe.image;
            console.log('image', recipeImage4);
            var recipeImage5 = data.hits[4].recipe.image;
            console.log('image', recipeImage5);
            var recipeImage6 = data.hits[5].recipe.image;
            console.log('image', recipeImage6);
            var ingredientLines1 = data.hits[0].recipe.ingredientLines;
            console.log('ingredients', ingredientLines1);
            var ingredientLines2 = data.hits[1].recipe.ingredientLines;
            console.log('ingredients', ingredientLines2);
            var ingredientLines3 = data.hits[2].recipe.ingredientLines;
            console.log('ingredients', ingredientLines3);
            var ingredientLines4 = data.hits[3].recipe.ingredientLines;
            console.log('ingredients', ingredientLines4);
            var ingredientLines5 = data.hits[4].recipe.ingredientLines;
            console.log('ingredients', ingredientLines5);
            var ingredientLines6 = data.hits[5].recipe.ingredientLines;
            console.log('ingredients', ingredientLines6);

            cocktailDBUrl();
        })
};

function cocktailDBUrl() {
    console.log("cocktail function working");
    var cocktailDBUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + drinkChoice;

    fetch(cocktailDBUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("cocktail API", cocktailDBUrl);
            var drinkName1 = data.drinks[0].strDrink;
            console.log('name', drinkName1);
            var drinkName1 = data.drinks[1].strDrink;
            console.log('name', drinkName1);
            var drinkName1 = data.drinks[2].strDrink;
            console.log('name', drinkName1);
            var drinkName1 = data.drinks[3].strDrink;
            console.log('name', drinkName1);
            var drinkName1 = data.drinks[4].strDrink;
            console.log('name', drinkName1);
            var drinkName1 = data.drinks[5].strDrink;
            console.log('name', drinkName1);
            var drinkImage1 = data.drinks[0].strDrinkThumb;
            console.log('image', drinkImage1);
            var drinkImage2 = data.drinks[1].strDrinkThumb;
            console.log('image', drinkImage2);
            var drinkImage3 = data.drinks[2].strDrinkThumb;
            console.log('image', drinkImage3);
            var drinkImage4 = data.drinks[3].strDrinkThumb;
            console.log('image', drinkImage4);
            var drinkImage5 = data.drinks[4].strDrinkThumb;
            console.log('image', drinkImage5);
            var drinkImage6 = data.drinks[5].strDrinkThumb;
            console.log('ID', drinkImage6);
            var drinkId1 = parseInt(data.drinks[0].idDrink);
            console.log('ID', drinkId1);
            var drinkId2 = parseInt(data.drinks[1].idDrink);
            console.log('ID', drinkId2);
            var drinkId3 = parseInt(data.drinks[2].idDrink);
            console.log('ID', drinkId3);
            var drinkId4 = parseInt(data.drinks[3].idDrink);
            console.log('ID', drinkId4);
            var drinkId5 = parseInt(data.drinks[4].idDrink);
            console.log('ID', drinkId5);
            var drinkId6 = parseInt(data.drinks[5].idDrink);
            console.log('ID', drinkId6);

        })
};

$("#recipeBtn").on("click", function () {
    // capture the value in citySearched and trim it to get rid of white spaces
    var recipeInput = $('#search_input').val().trim();

    // IF value of cityInput is not equal to "" then create an Li element, add a classs, add the city input and append it to the ul
    if (recipeInput !== "") {
        console.log('recipe button working');
        edamamUrl(recipeInput);
        // citiesListUl.innerHTML = ' ';
        // // pushing the cities onto the cities list array
        // citiesList.push(cityInput);
        // adding the cities array to local storage

        // for every city in the array create an li and append to the ul
        // citiesList.forEach((city) => {
        //     var li = document.createElement('li');
        //     li.classList.add('cityList__item');
        //     li.innerHTML = city;
        //     citiesListUl.appendChild(li);
    }
})

