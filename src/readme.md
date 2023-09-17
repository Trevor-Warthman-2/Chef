Frontend App Name: "Stockpot" "Dish Compendium" "Pap-Eurika, for all your great dish ideas" "Chefs Choice" "Dish Vault"

Email Address is not unique since you can have multiple accounts.

Todos:
- Make a /users/{id}/dishes route and /users/{id}/recipes route (can copy mostly) because these are the main ones we'll use.
- first goal: make a page listing all the logged in user's recipes. then edit them so I can start using this damn app.

 - Dishes and recipes can be all but /dishes/me and /recipes/me maybe.
-   implement authorization on create, update, delete recipes: make sure they're yours OR you have an admin permission.
-   change author to chef
-   add chef userid to each dish and recipe
-   clean up
-   create a service for getting recipes from /recipes or /dish/{id}/recipes
-   implement search filters on /recipes and /dish/{id}/recipes
-   revisit diagram and plan what lives on where embedded or referenced
-   then create the recipe rotues
-   move all dish and recipe things to one schema and need a seperate one for /recipes. /dish/{id}/recipes is a valid thing.

-   Move swagger docs to seperate openapi files

-   Write a 404 + other error catcher wrapper around controllers. https://scoutapm.com/blog/express-error-handling

-   figure out why create recipe isn't working
-   check delete recipe
-   make new Recipe require dishId??? idk what this means
-   edit create recipe endpont to do the something
-   Remove recipe from dish when delete recipe
-   Get Recipe creation and deleter working
-   get recipe endpoint

Now that I have a proof of concept, start the frontend. First make a create recipe page. What's a generic name for this dish? (Ex: if you're making a southwestern burger, this might be your
"Cheeseburger" dish.) ...Recipe stuff... Then make the home page with the filters

-   Do some more designing of database resources and plan out needs.
-   mark a way to show who has or has not voted on a recipe

design how saved links fit in to the schema create the save link endpoint. (Maybe there are “draft recipes”). But yeah posting a /dish/draftDish will look different based on the body. Maybe there’s
just a normal one, maybe there’s one with only a link to the original that says “fill in to finalize dish”, maybe finalized might have both. Also obviously posting dishes creates the dish.

-   add user id when creating a dish
-   or recipe
-   Make GET /dishes/me, break into system so no repeating logic

-   Make sub-routes for editing Steps
-   Make sub-routes for editing ingredients
-   Make endpoints for ratings and various statistics. (Top dishes, my top dishes, etc.)

Make an error handler wrapper so I can throw errors and it responds gracefully

Overall Plan:

-   Differentiate between public ratings and author ratings.
-   Model some more frontend stuff
    -   Full page dish
        -   Dish name at top
        -   description
        -   dishes are created with one recipe marked as "primary recipe". Validate this. Other than labeling it "primary" don't do anything yet.
        -   duplicate button that copies the first recipe and puts it in the last slot as "\_ Copy"
        -   recipes bar across the bottom showing all ratings on the unopened ones
            -   Probably want to show number of favorites
            -   number of ratings
            -   cost of ingredients?
            -   show a ratio dial where you can go to .25, .5, 1.25, 1.5, 1.75, 2, anything.
            -   average rating
            -   Tags (more than small version?)
            -   edit icon for author
    -   Full Page Recipe will be the same component used for recipes above. This one will be used more often by iteself tho, and have a link to the "fullPageDish" component
    -   Small page recipe
        -   Title
        -   Author and link to their dishes page ordered by rating
        -   Specific important tags DECIDE WHAT THESE ARE. Link to home page filtering by that tag.
        -   Star rating
        -   Cook time and icon
        -   picture as entire background or cusine tag default image as backup
    -   Home page
        -   featured dishes
            -   slidebar with arrows showing idk like 6 recipes
        -   Filters

## User Experience

-   Looking for recipe
    -   Can be logged in or out, either way you use the homepage to filter or search
        -   Filtering
            -   Dish or Recipe name
            -   Recipe Tags
        -   See list of Recipes. Those take you to individual recipe page.
        -   Search
            -   Shows lists of dishes and recipes. Sort top rated dish, top rated recipe. Eventually I can allow Dish linking, requiring the same name, to show Dish groups. Dishes being specific to
                each cook.
    -   Featured DISHES.
-   Saving/Collecting recipes
    -   Find one on the site through search or filter and hit favorite. I'll think of a better way to do this later.
    -   My recipes page for all the ones you've created
        -   manually create through form
        -   save link through chrome extension or save link on site somewhere
            -   show up as draftRecipe

## Later Todos

Consider renaming dish to dish and recipe to dish again.

-   looks like you start it by just running `nodemon` used to set up swagger:
    https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do#:~:text=To%20create%20a%20Swagger%20UI%20page%20for%20your%20Express%20API,%2F%2F%20app.

Soureces:

error hadnling: https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/ ` Auth: https://www.youtube.com/watch?v=QQwo4E_B0y8

Add authentication later.

ER Chart: https://lucid.app/lucidchart/c8563c04-4f41-452d-91db-89c07687cfb0/edit?beaconFlowId=8994F184A6C13AFC&invitationId=inv_6cac2c9d-72d2-4aea-a020-03ea1407351f&page=0_0#

https://www.youtube.com/watch?v=smMsWpxrrVE

Auth0 Management API I'm setting up a test Management API. If i get the token manually from that then I can test. How to set token in docs:
https://manage.auth0.com/dashboard/us/dev-v2nw2exkg42g10ks/apis/management/explorer Find and test api endpoints after getting that token: https://auth0.com/docs/api/management/v2

For example, I can check what permissions a certain role has and what roles a certain user has.

Chef API:

-   Defining Permissions that users can take.

I could set user metadata to return from the profile: https://auth0.com/docs/get-started/apis/scopes/sample-use-cases-scopes-and-claims#add-custom-claims-to-a-token

ManagementClient: // https://auth0.github.io/node-auth0/ManagementClient.html comes configured to grab token if you provide creds so its easy.

Authorization: this app is simple so I don't think it's needed yet since everyone can manage their own shit. either it's public, or they can use /me endpoints to manage their own stuff, or I can do it
in the admin.

Remember exec is important when you want a promise from mongoose https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do


## Startup

### If it's been awhile
- go to https://cloud.mongodb.com/v2/63d44197a2c76c1255524ac8#/clusters and resume your mongodb cluster
- go sign in to github (Trevor-Warthman-2) or Trevor-Warthman has access as contributor: https://github.com/Trevor-Warthman-2/Chef 
- you can start node with 'nodemon' in the chef dir
- 

