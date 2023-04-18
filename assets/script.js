var recipeAPIKey = "28f5ba5611764f66ba074c700ab302b3";
var getRecipeItalian = "https://api.spoonacular.com/recipes/random?tags=italian,dinner&number=3" + "&appid=" + recipeAPIKey;

function callRecipeAPI () {
    fetch(getRecipeItalian)
        .then(function (response) {
            if (response.status != 200) {
                console.log("fetch error");
                return;
            } else {
                console.log("fetch response ok")
                return response.json();
            }
        })
        .then(function(data) {
            console.log(data);
        });
    }

callRecipeAPI();
//This is a simple random number generator
function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};
//This is an array of the meal categories that WE define
var recipeCategories = ["french,dinner", "italian,dinner", "mexican,dinner", "bbq,grilled", "baked,dessert", "indian,dinner", "thai,dinner", "mediterranian,dinner"];
//This picks one of the meal categories randomly and saves it into a variable
var recipeType = recipeCategories[randomNumberGenerator(0,7)];
//This inserts the variable into the query parameter to search for a recipe in the given meal category
var getRecipe = "https://api.spoonacular.com/recipes/random?tags=" + recipeType + "&number=1" + "&appid=" + recipeAPIKey;




