const http = require("http")
const fsP = require("fs/promises")
const url =require("url")
const PORT = process.env.PORT || 5002
const server = http.createServer(async (req,res)=>{
    const recipesData = await fsP.readFile("./data/recipes.json","utf-8")
    let recipes = JSON.parse(recipesData).recipes
    const requestURL = url.parse(req.url,true)
    try {
    if(requestURL.pathname==="/") {

    }
    else if(requestURL.pathname==="/api/movies") {
        if(requestURL.query.id) {
            const id = +requestURL.query.id

            if(req.method==="GET") {
                const recipeObject = recipes.filter(movie=>movie.id===id)[0]
                if (!recipeObject) {
                    res.statusCode=404
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ error: "Recipe not found" }));
                }
                res.setHeader("Content-type","application/json")
                res.end(JSON.stringify({ movie: recipeObject }))

            }
            else if(req.method==="POST") {

            }
            else if(req.method==="PUT") {

            }
            else if(req.method==="DELETE") {
                if(recipes.length===0) {
                    res.statusCode=404
                    res.setHeader("Content-Type", "application/json")
                    res.end(JSON.stringify({ message: "No recipes found!" }))
                }
                let recipeIndex= recipes.findIndex(movie=>movie?.id===id)
                if(recipeIndex!==-1) {
                    recipes.splice(recipeIndex,1)
                    res.statusCode=200
                    res.setHeader("Content-Type", "application/json")
                    await fsP.writeFile("./data/recipes.json",JSON.stringify({recipes:recipes}, null, 2),(err)=>{
                        if(err) {
                            console.log("write error",err)
                        }
                        else {
                            console.log("OVERWRITTEN!")
                        }
                    })
                    res.end(JSON.stringify({ message: "Recipe deleted successfully" }))

                }
                else {
                    res.statusCode=404
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ error: "Recipe not found" }));
                }
            }
        }
        else {
            res.statusCode=200
            res.setHeader("Content-type","application/json")
            res.end(recipesData)
        }
    }
    else {
        res.statusCode=404
        res.setHeader("Content-type","application/json")
        res.end(JSON.stringify({"message":"You are on the wrong route!!!"}))
    }
}
catch(err) {
    console.log(err)
}
})

server.listen(PORT,()=>{
    console.log(`listening on port: ${PORT}`)
})













/**
 * {
    "recipes": [
      {
        "id": 1,
        "name": "Classic Margherita Pizza",
        "prepTimeMinutes": 20,
        "cookTimeMinutes": 15,
        "servings": 4,
        "difficulty": "Easy",
        "cuisine": "Italian",
        "caloriesPerServing": 300,
        "tags": [
          "Pizza",
          "Italian"
        ],
        "userId": 166,
        "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
        "rating": 4.6,
        "reviewCount": 98,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 2,
        "name": "Vegetarian Stir-Fry",
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 20,
        "servings": 3,
        "difficulty": "Medium",
        "cuisine": "Asian",
        "caloriesPerServing": 250,
        "tags": [
          "Vegetarian",
          "Stir-fry",
          "Asian"
        ],
        "userId": 143,
        "image": "https://cdn.dummyjson.com/recipe-images/2.webp",
        "rating": 4.7,
        "reviewCount": 26,
        "mealType": [
          "Lunch"
        ]
      },
      {
        "id": 3,
        "name": "Chocolate Chip Cookies",
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 10,
        "servings": 24,
        "difficulty": "Easy",
        "cuisine": "American",
        "caloriesPerServing": 150,
        "tags": [
          "Cookies",
          "Dessert",
          "Baking"
        ],
        "userId": 34,
        "image": "https://cdn.dummyjson.com/recipe-images/3.webp",
        "rating": 4.9,
        "reviewCount": 13,
        "mealType": [
          "Snack",
          "Dessert"
        ]
      },
      {
        "id": 4,
        "name": "Chicken Alfredo Pasta",
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 20,
        "servings": 4,
        "difficulty": "Medium",
        "cuisine": "Italian",
        "caloriesPerServing": 500,
        "tags": [
          "Pasta",
          "Chicken"
        ],
        "userId": 136,
        "image": "https://cdn.dummyjson.com/recipe-images/4.webp",
        "rating": 4.9,
        "reviewCount": 82,
        "mealType": [
          "Lunch",
          "Dinner"
        ]
      },
      {
        "id": 5,
        "name": "Mango Salsa Chicken",
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 25,
        "servings": 3,
        "difficulty": "Easy",
        "cuisine": "Mexican",
        "caloriesPerServing": 380,
        "tags": [
          "Chicken",
          "Salsa"
        ],
        "userId": 26,
        "image": "https://cdn.dummyjson.com/recipe-images/5.webp",
        "rating": 4.9,
        "reviewCount": 63,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 6,
        "name": "Quinoa Salad with Avocado",
        "prepTimeMinutes": 20,
        "cookTimeMinutes": 15,
        "servings": 4,
        "difficulty": "Easy",
        "cuisine": "Mediterranean",
        "caloriesPerServing": 280,
        "tags": [
          "Salad",
          "Quinoa"
        ],
        "userId": 197,
        "image": "https://cdn.dummyjson.com/recipe-images/6.webp",
        "rating": 4.4,
        "reviewCount": 59,
        "mealType": [
          "Lunch",
          "Side Dish"
        ]
      },
      {
        "id": 7,
        "name": "Tomato Basil Bruschetta",
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 10,
        "servings": 6,
        "difficulty": "Easy",
        "cuisine": "Italian",
        "caloriesPerServing": 120,
        "tags": [
          "Bruschetta",
          "Italian"
        ],
        "userId": 137,
        "image": "https://cdn.dummyjson.com/recipe-images/7.webp",
        "rating": 4.7,
        "reviewCount": 95,
        "mealType": [
          "Appetizer"
        ]
      },
      {
        "id": 8,
        "name": "Beef and Broccoli Stir-Fry",
        "prepTimeMinutes": 20,
        "cookTimeMinutes": 15,
        "servings": 4,
        "difficulty": "Medium",
        "cuisine": "Asian",
        "caloriesPerServing": 380,
        "tags": [
          "Beef",
          "Stir-fry",
          "Asian"
        ],
        "userId": 18,
        "image": "https://cdn.dummyjson.com/recipe-images/8.webp",
        "rating": 4.7,
        "reviewCount": 58,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 9,
        "name": "Caprese Salad",
        "prepTimeMinutes": 10,
        "cookTimeMinutes": 0,
        "servings": 2,
        "difficulty": "Easy",
        "cuisine": "Italian",
        "caloriesPerServing": 200,
        "tags": [
          "Salad",
          "Caprese"
        ],
        "userId": 128,
        "image": "https://cdn.dummyjson.com/recipe-images/9.webp",
        "rating": 4.6,
        "reviewCount": 82,
        "mealType": [
          "Lunch"
        ]
      },
      {
        "id": 10,
        "name": "Shrimp Scampi Pasta",
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 20,
        "servings": 3,
        "difficulty": "Medium",
        "cuisine": "Italian",
        "caloriesPerServing": 400,
        "tags": [
          "Pasta",
          "Shrimp"
        ],
        "userId": 114,
        "image": "https://cdn.dummyjson.com/recipe-images/10.webp",
        "rating": 4.3,
        "reviewCount": 5,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 11,
        "name": "Chicken Biryani",
        "prepTimeMinutes": 30,
        "cookTimeMinutes": 45,
        "servings": 6,
        "difficulty": "Medium",
        "cuisine": "Pakistani",
        "caloriesPerServing": 550,
        "tags": [
          "Biryani",
          "Chicken",
          "Main course",
          "Indian",
          "Pakistani",
          "Asian"
        ],
        "userId": 133,
        "image": "https://cdn.dummyjson.com/recipe-images/11.webp",
        "rating": 5,
        "reviewCount": 32,
        "mealType": [
          "Lunch",
          "Dinner"
        ]
      },
      {
        "id": 12,
        "name": "Chicken Karahi",
        "prepTimeMinutes": 20,
        "cookTimeMinutes": 30,
        "servings": 4,
        "difficulty": "Easy",
        "cuisine": "Pakistani",
        "caloriesPerServing": 420,
        "tags": [
          "Chicken",
          "Karahi",
          "Main course",
          "Indian",
          "Pakistani",
          "Asian"
        ],
        "userId": 49,
        "image": "https://cdn.dummyjson.com/recipe-images/12.webp",
        "rating": 4.8,
        "reviewCount": 68,
        "mealType": [
          "Lunch",
          "Dinner"
        ]
      },
      {
        "id": 13,
        "name": "Aloo Keema",
        "prepTimeMinutes": 25,
        "cookTimeMinutes": 35,
        "servings": 5,
        "difficulty": "Medium",
        "cuisine": "Pakistani",
        "caloriesPerServing": 380,
        "tags": [
          "Keema",
          "Potatoes",
          "Main course",
          "Pakistani",
          "Asian"
        ],
        "userId": 152,
        "image": "https://cdn.dummyjson.com/recipe-images/13.webp",
        "rating": 4.6,
        "reviewCount": 53,
        "mealType": [
          "Lunch",
          "Dinner"
        ]
      },
      {
        "id": 14,
        "name": "Chapli Kebabs",
        "prepTimeMinutes": 30,
        "cookTimeMinutes": 20,
        "servings": 4,
        "difficulty": "Medium",
        "cuisine": "Pakistani",
        "caloriesPerServing": 320,
        "tags": [
          "Kebabs",
          "Beef",
          "Indian",
          "Pakistani",
          "Asian"
        ],
        "userId": 152,
        "image": "https://cdn.dummyjson.com/recipe-images/14.webp",
        "rating": 4.7,
        "reviewCount": 98,
        "mealType": [
          "Lunch",
          "Dinner",
          "Snacks"
        ]
      },
      {
        "id": 15,
        "name": "Saag (Spinach) with Makki di Roti",
        "prepTimeMinutes": 40,
        "cookTimeMinutes": 30,
        "servings": 3,
        "difficulty": "Medium",
        "cuisine": "Pakistani",
        "caloriesPerServing": 280,
        "tags": [
          "Saag",
          "Roti",
          "Main course",
          "Indian",
          "Pakistani",
          "Asian"
        ],
        "userId": 43,
        "image": "https://cdn.dummyjson.com/recipe-images/15.webp",
        "rating": 4.3,
        "reviewCount": 86,
        "mealType": [
          "Breakfast",
          "Lunch",
          "Dinner"
        ]
      },
      {
        "id": 16,
        "name": "Japanese Ramen Soup",
        "prepTimeMinutes": 20,
        "cookTimeMinutes": 25,
        "servings": 2,
        "difficulty": "Medium",
        "cuisine": "Japanese",
        "caloriesPerServing": 480,
        "tags": [
          "Ramen",
          "Japanese",
          "Soup",
          "Asian"
        ],
        "userId": 85,
        "image": "https://cdn.dummyjson.com/recipe-images/16.webp",
        "rating": 4.9,
        "reviewCount": 38,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 17,
        "name": "Moroccan Chickpea Tagine",
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 30,
        "servings": 4,
        "difficulty": "Easy",
        "cuisine": "Moroccan",
        "caloriesPerServing": 320,
        "tags": [
          "Tagine",
          "Chickpea",
          "Moroccan"
        ],
        "userId": 207,
        "image": "https://cdn.dummyjson.com/recipe-images/17.webp",
        "rating": 4.5,
        "reviewCount": 50,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 18,
        "name": "Korean Bibimbap",
        "prepTimeMinutes": 30,
        "cookTimeMinutes": 20,
        "servings": 2,
        "difficulty": "Medium",
        "cuisine": "Korean",
        "caloriesPerServing": 550,
        "tags": [
          "Bibimbap",
          "Korean",
          "Rice"
        ],
        "userId": 121,
        "image": "https://cdn.dummyjson.com/recipe-images/18.webp",
        "rating": 4.9,
        "reviewCount": 56,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 19,
        "name": "Greek Moussaka",
        "prepTimeMinutes": 45,
        "cookTimeMinutes": 45,
        "servings": 6,
        "difficulty": "Medium",
        "cuisine": "Greek",
        "caloriesPerServing": 420,
        "tags": [
          "Moussaka",
          "Greek"
        ],
        "userId": 173,
        "image": "https://cdn.dummyjson.com/recipe-images/19.webp",
        "rating": 4.3,
        "reviewCount": 26,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 20,
        "name": "Butter Chicken (Murgh Makhani)",
        "prepTimeMinutes": 30,
        "cookTimeMinutes": 25,
        "servings": 4,
        "difficulty": "Medium",
        "cuisine": "Pakistani",
        "caloriesPerServing": 480,
        "tags": [
          "Butter chicken",
          "Curry",
          "Indian",
          "Pakistani",
          "Asian"
        ],
        "userId": 138,
        "image": "https://cdn.dummyjson.com/recipe-images/20.webp",
        "rating": 4.5,
        "reviewCount": 44,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 21,
        "name": "Thai Green Curry",
        "prepTimeMinutes": 20,
        "cookTimeMinutes": 30,
        "servings": 4,
        "difficulty": "Medium",
        "cuisine": "Thai",
        "caloriesPerServing": 480,
        "tags": [
          "Curry",
          "Thai"
        ],
        "userId": 153,
        "image": "https://cdn.dummyjson.com/recipe-images/21.webp",
        "rating": 4.2,
        "reviewCount": 18,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 22,
        "name": "Mango Lassi",
        "prepTimeMinutes": 10,
        "cookTimeMinutes": 0,
        "servings": 2,
        "difficulty": "Easy",
        "cuisine": "Indian",
        "caloriesPerServing": 180,
        "tags": [
          "Lassi",
          "Mango",
          "Indian",
          "Pakistani",
          "Asian"
        ],
        "userId": 76,
        "image": "https://cdn.dummyjson.com/recipe-images/22.webp",
        "rating": 4.7,
        "reviewCount": 15,
        "mealType": [
          "Beverage"
        ]
      },
      {
        "id": 23,
        "name": "Italian Tiramisu",
        "prepTimeMinutes": 30,
        "cookTimeMinutes": 0,
        "servings": 6,
        "difficulty": "Medium",
        "cuisine": "Italian",
        "caloriesPerServing": 350,
        "tags": [
          "Tiramisu",
          "Italian"
        ],
        "userId": 130,
        "image": "https://cdn.dummyjson.com/recipe-images/23.webp",
        "rating": 4.6,
        "reviewCount": 0,
        "mealType": [
          "Dessert"
        ]
      },
      {
        "id": 24,
        "name": "Turkish Kebabs",
        "prepTimeMinutes": 25,
        "cookTimeMinutes": 15,
        "servings": 4,
        "difficulty": "Easy",
        "cuisine": "Turkish",
        "caloriesPerServing": 280,
        "tags": [
          "Kebabs",
          "Turkish",
          "Grilling"
        ],
        "userId": 26,
        "image": "https://cdn.dummyjson.com/recipe-images/24.webp",
        "rating": 4.6,
        "reviewCount": 78,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 25,
        "name": "Blueberry Banana Smoothie",
        "prepTimeMinutes": 10,
        "cookTimeMinutes": 0,
        "servings": 1,
        "difficulty": "Easy",
        "cuisine": "Smoothie",
        "caloriesPerServing": 220,
        "tags": [
          "Smoothie",
          "Blueberry",
          "Banana"
        ],
        "userId": 16,
        "image": "https://cdn.dummyjson.com/recipe-images/25.webp",
        "rating": 4.8,
        "reviewCount": 30,
        "mealType": [
          "Breakfast",
          "Beverage"
        ]
      },
      {
        "id": 26,
        "name": "Mexican Street Corn (Elote)",
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 15,
        "servings": 4,
        "difficulty": "Easy",
        "cuisine": "Mexican",
        "caloriesPerServing": 180,
        "tags": [
          "Elote",
          "Mexican",
          "Street food"
        ],
        "userId": 93,
        "image": "https://cdn.dummyjson.com/recipe-images/26.webp",
        "rating": 4.6,
        "reviewCount": 2,
        "mealType": [
          "Snack",
          "Side Dish"
        ]
      },
      {
        "id": 27,
        "name": "Russian Borscht",
        "prepTimeMinutes": 30,
        "cookTimeMinutes": 40,
        "servings": 6,
        "difficulty": "Medium",
        "cuisine": "Russian",
        "caloriesPerServing": 220,
        "tags": [
          "Borscht",
          "Russian",
          "Soup"
        ],
        "userId": 1,
        "image": "https://cdn.dummyjson.com/recipe-images/27.webp",
        "rating": 4.3,
        "reviewCount": 39,
        "mealType": [
          "Dinner"
        ]
      },
      {
        "id": 28,
        "name": "South Indian Masala Dosa",
        "prepTimeMinutes": 40,
        "cookTimeMinutes": 20,
        "servings": 4,
        "difficulty": "Medium",
        "cuisine": "Indian",
        "caloriesPerServing": 320,
        "tags": [
          "Dosa",
          "Indian",
          "Asian"
        ],
        "userId": 138,
        "image": "https://cdn.dummyjson.com/recipe-images/28.webp",
        "rating": 4.4,
        "reviewCount": 96,
        "mealType": [
          "Breakfast"
        ]
      },
      {
        "id": 29,
        "name": "Lebanese Falafel Wrap",
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 10,
        "servings": 2,
        "difficulty": "Easy",
        "cuisine": "Lebanese",
        "caloriesPerServing": 400,
        "tags": [
          "Falafel",
          "Lebanese",
          "Wrap"
        ],
        "userId": 110,
        "image": "https://cdn.dummyjson.com/recipe-images/29.webp",
        "rating": 4.7,
        "reviewCount": 84,
        "mealType": [
          "Lunch"
        ]
      },
      {
        "id": 30,
        "name": "Brazilian Caipirinha",

        "prepTimeMinutes": 5,
        "cookTimeMinutes": 0,
        "servings": 1,
        "difficulty": "Easy",
        "cuisine": "Brazilian",
        "caloriesPerServing": 150,
        "tags": [
          "Caipirinha",
          "Brazilian",
          "Cocktail"
        ],
        "userId": 134,
        "image": "https://cdn.dummyjson.com/recipe-images/30.webp",
        "rating": 4.4,
        "reviewCount": 55,
        "mealType": [
          "Beverage"
        ]
      }
    ],
    "total": 50,
    "skip": 0,
    "limit": 30
  }
  
 */