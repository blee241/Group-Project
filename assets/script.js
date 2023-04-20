var recipeAPIKey = "51e2cbe6072d4a7dbdae7ff2152eaa67";
//This determines the cuisines of each of our meal categories 
var recipeCuisines = ["Korean", "French", "American", "Thai", "Italian", "Mediterranean", "Indian", "Mexican"];
//The chosen cuisine.
var recipeCuisine;
//This determines how each meal is cooked/prepared i.e. baked or grilled
var recipeTypes = ["dessert", "main course", "main course", "main course", "main course", "main course", "main course", "main course"]
//This variable will hold the recipe name
var recipeName = "";
//This is a placeholder value of 0. The variable will represent how long it takes to make the meal after the callRecipeAPI function has been called.
var prepTime = 0;
//This array will contain the recipe ingredients and its quantity in the format "2 green cardamom seeds" per index
var recipeIngredients = [];
//This array will contain the recipe steps.
var recipeSteps = [];
//This is the output from the random number generator
var randomNumber;
//each index in the array will contain the recipe moods
var generateBtnEl = document.getElementById("generate")
var userTimeInputEl = document.getElementById('userTimeInput')
//This variable will hold the user's input in minutes.
var userTimeVal = 20;

var recNameEl = document.getElementById("recName");
var recIngrEl = document.getElementById("recIngr");
var recInstrEl = document.getElementById("recInstr");
var recMoodDispEl = document.getElementById("mood-display");
var saveBtnEl = document.getElementById("save-btn");
var loadBtnEl = document.getElementById("load-btn");


 var happy = {
    music: "KPop",
    food: "Dessert/Baking",
    image: "./images/BTSbread.webp",
 }
var confident = {
    music: "Disco",
    food: "French",
    image: "./images/discoball",
 }
var angry = {
    music: "Metal",
    food: "BBQ/Grilling",
    image: "./images/openfire.webp",
 }
var excited = {
    music: "Pop",
    food: "Thai",
    image: "./images/openfire.webp",
  }
var tired = {
    music: "Punk",
    food:"Italian",
    image: "./images/openfire.webp",
 }
var bad = {
    music: "Blues",
    food: "Mediterranean",
    image: "./images/openfire.webp",
  }
var brave = {
    music: "Indie",
    food: "Indian",
    image: "./images/openfire.webp",
  }
var romantic = {
    music: "Latin",
    food: "Mexican/Latin",
    image: "./images/openfire.webp",
};
var moods = [happy, confident, angry, excited, tired, bad, brave, romantic]
//An array of strings is needed to display the mood as text. The above object returns a key-value pair when used to set the text content of an element.
var stringMoods = ['happy', 'confident', 'angry', 'excited', 'tired', 'bad', 'brave', 'romantic'];

//This is a simple random number generator that will return an integer between min and max.
function randomNumberGenerator(min, max) {
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
};

//This function will output the API URL for the fetch call
function getRecipeAPIURL () {
    //This picks one of the meal categories at the index determined by randomNumberGenerator() and saves the meal category into a variable
    recipeCuisine = recipeCuisines[randomNumber];
    var recipeType = recipeTypes[randomNumber];
    //This inserts the variable into the query parameter to search for a recipe in the given meal category
    var getRecipe = "https://api.spoonacular.com/recipes/complexSearch?maxReadyTime=" + userTimeVal + "&cuisine=" + recipeCuisine + "&type=" + recipeType + "&number=1&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true" + "&apiKey=" + recipeAPIKey;
    return getRecipe;
};

//This function will take information from the API and output the meal preparation time, ingredients, and instructions into their corresponsing variables.
function callRecipeAPI () {
    fetch(getRecipeAPIURL())
        .then(function (response) {
            if (response.status != 200) {
                console.log("Fetch error. Try using another API key.");
                return;
            } else {
                return response.json();
            }
        })
        .then(function(data) { 
            console.log(data)
            recipeName = data.results[0].title;
            
            prepTime = data.results[0].readyInMinutes;

            ingredientObjArray = data.results[0].extendedIngredients;
            for (let i = 0; i < ingredientObjArray.length; i++) {
                recipeIngredients[i] = ingredientObjArray[i].original;    
            }

            stepObjArray = data.results[0].analyzedInstructions[0].steps;
            for (let i = 0; i < stepObjArray.length; i++) {
                recipeSteps[i] = stepObjArray[i].step;
            }
        })
};

//This function will add data from the recipe api to elements on the page
function displayRecipeInfo () {
    recNameEl.textContent = recipeName;
    displayIngredientsList(recipeIngredients);
    recInstrEl.textContent = recipeSteps;
    recMoodDispEl.textContent = "Here's some " + recipeCuisine + " food to make you feel a little more " + stringMoods[randomNumber] + "!";
}

function displayIngredientsList(ingredientsArray) {
    for (let i = 0; i < ingredientsArray.length; i++) {
        var ingListItemEl = document.createElement("li");
        ingListItemEl.textContent = ingredientsArray[i]
        recIngrEl.appendChild(ingListItemEl)
    }
}

//The generate button will call the recipe API and update recipeName, prepTime, recipeIngredients, and recipeSteps. The variables need a little bit of time to update, so setTimeout is used to allow the computer to update them before logging them in the console.
generateBtnEl.addEventListener('click', function() {
    userTimeVal = userTimeInputEl.value;
    if (userTimeVal == "") {
        userTimeVal = 30;
    }
    randomNumberGenerator(0,7);
    callRecipeAPI();
    setTimeout(()=>{displayRecipeInfo ()}, 3000);
});

saveBtnEl.addEventListener('click', function() {
    localStorage.setItem("storedCuisine", recipeCuisine)
    localStorage.setItem("storedMood", stringMoods[randomNumber])
    localStorage.setItem("storedRecipeName", recipeName)
    localStorage.setItem("storedRecipeIngredients", JSON.stringify(recipeIngredients))
    localStorage.setItem("storedRecipeSteps", recipeSteps)
});

loadBtnEl.addEventListener('click', function() {
    recNameEl.textContent = localStorage.getItem("storedRecipeName");
    displayIngredientsList(JSON.parse(localStorage.getItem("storedRecipeIngredients")))
    recInstrEl.textContent = localStorage.getItem("storedRecipeSteps");
    recMoodDispEl.textContent = "Here's some " + localStorage.getItem("storedCuisine") + " food to make you feel a little more " + localStorage.getItem("storedMood") + "!";
});

