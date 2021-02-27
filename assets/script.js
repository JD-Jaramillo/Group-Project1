var appKey = '0c2c9a2d506328c76e2b631a68071672';
var appId = 'cb983ada';
var recipeInput = 'chicken';
var drinkChoice = 'gin';



function theMealDBUrl() {
    console.log(" meal function working");
    var theMealDBUrl = 'https://edamamproxy.herokuapp.com/to=6&q=' + recipeInput;

    fetch(theMealDBUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("recipe API", theMealDBUrl);
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

        })
};

// $("#searchBtn").on("click", function () {


theMealDBUrl();