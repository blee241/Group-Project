var recipeAPIKey = "28f5ba5611764f66ba074c700ab302b3";
var getRecipeItalian = "https://api.spoonacular.com/recipes/random?tags=italian,dinner&number=3" + "&appid=" + recipeAPIKey;

function getAPI () {console.log("getAPI ok")
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
                console.log(data)

                
            });
        }
    
getAPI();




