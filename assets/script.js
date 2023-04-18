var recipeAPIKey = "28f5ba5611764f66ba074c700ab302b3";
//This is an array of the meal categories that WE define. Each index in the array contains recipe tags. The API works by filtering through recipes that must have these tags.
var recipeCategories = ["french,dinner", "italian,dinner", "mexican,dinner", "bbq,grilled", "baked,dessert", "indian,dinner", "thai,dinner", "mediterranian,dinner"];
//This is a placeholder value of 0. The variable will represent how long it takes to make the meal after the callRecipeAPI function has been called.
var prepTime = 0;
//This array will contain the recipe ingredients and its quantity in the format "2 green cardamom seeds" per index
var recipeIngredients = []
//This array will contain the recipe steps.
var recipeSteps = [];

//This is a simple random number generator
function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

//This function will output the API URL for the fetch call
function getRandomMealCategory () {
    //This picks one of the meal categories randomly and saves it into a variable
    var recipeType = recipeCategories[randomNumberGenerator(0,recipeCategories.length - 1)];
    console.log(recipeType)
    //This inserts the variable into the query parameter to search for a recipe in the given meal category
    var getRecipe = "https://api.spoonacular.com/recipes/random?tags=" + recipeType + "&number=2" + "&apiKey=" + recipeAPIKey;
    return getRecipe;
};

//This function will take information from the API and output the meal preparation time, ingredients, and instructions into their corresponsing variables.
function callRecipeAPI () {
    fetch(getRandomMealCategory())
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
            prepTime = data.recipes[0].readyInMinutes;
            
            ingredientObjArray = data.recipes[0].extendedIngredients;
            for (let i = 0; i < ingredientObjArray.length; i++) {
                recipeIngredients[i] = ingredientObjArray[i].original;    
            }

            stepObjArray = data.recipes[0].analyzedInstructions[0].steps;
            for (let i = 0; i < stepObjArray.length; i++) {
                recipeSteps[i] = stepObjArray[i].step;
            }
        })
    };






