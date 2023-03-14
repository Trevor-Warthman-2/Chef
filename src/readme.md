
Frontend App Name:
"Stockpot"
"Recipe Compendium"
"Pap-Eurika, for all your great recipe ideas"
"Chefs Choice"
"Recipe Vault"

Example Google User:
{"given_name":"Trevor","family_name":"Warthman","nickname":"t.dubs371","name":"Trevor Warthman","picture":"https://lh3.googleusercontent.com/a/AGNmyxZZnMbj1Iy2_0LR5VkYXzqy7uQrinXBPMs_hwvS9Ks=s96-c","locale":"en","updated_at":"2023-03-12T21:57:12.417Z","email":"t.dubs371@gmail.com","email_verified":true,"sub":"google-oauth2|107103313821607268576","sid":"kXnQHsWCLq6EoV7xjaHHg1nm9ohzcTX3"}

{"nickname":"t.dubs371","name":"t.dubs371@gmail.com","picture":"https://s.gravatar.com/avatar/bbbdecb169d2c93094121a753b95c86a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ft.png","updated_at":"2023-03-12T22:23:12.776Z","email":"t.dubs371@gmail.com","email_verified":false,"sub":"auth0|640e50d06a9492c5251963f9","sid":"stbTWApB1EDxjAKwaqH3M6tUlRbZIl9o"}

Email Address is not unique since you can have multiple accounts.


Todos:
NOte: /user/me doesn't need authorization. So copy it and remove it after testing.

try /favoriteVariants to see if I'm allowed to use it.
then implement it.

try removing requires
I can get the authenticated user and their Id through /profile. 
Write a few endpoints to:
1. Set user metadata in /user/me/favoriteVariant (recipes are favorited if a variant is).
User API: https://auth0.com/docs/api/management/v2#!/Users/get_users
GET Endpoint:
  a. Authenticate 
  b. they hit the "favoriteVariant" endpoint at somepoint and get kicked if not authenticated
  d. we get the Auth0 Management Token
  c. we Authorize /api/v2/users/{id}/permissions
  e. then the endpoint is allowed to keep going and GET /user/meta-data
  The user meta data just stores a array of variant ids.



- ok you made the auth good job
- make srure yuo can log out
- document the login and logout endpoints


- Make user model, routes, a fake login and logout endpoint. Integrate user with recipes.
- Make /recipes/me

- Make sub-routes for editing Steps
- Make sub-routes for editing ingredients
- Make endpoints for ratings and various statistics. (Top recipes, my top recipes, etc.)

Auth:
- Set up to automatically grab the Management API token somehow.






- looks like you start it by just running `nodemon`
used to set up swagger: https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do#:~:text=To%20create%20a%20Swagger%20UI%20page%20for%20your%20Express%20API,%2F%2F%20app.






Soureces:

error hadnling:
https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/
`
Auth: https://www.youtube.com/watch?v=QQwo4E_B0y8



Add authentication later.

ER Chart:
https://lucid.app/lucidchart/c8563c04-4f41-452d-91db-89c07687cfb0/edit?beaconFlowId=8994F184A6C13AFC&invitationId=inv_6cac2c9d-72d2-4aea-a020-03ea1407351f&page=0_0#



https://www.youtube.com/watch?v=smMsWpxrrVE





Auth0 Management API
I'm setting up a test Management API. If i get the token manually from that then I can test.
How to set token in docs:
https://manage.auth0.com/dashboard/us/dev-v2nw2exkg42g10ks/apis/management/explorer
Find and test api endpoints after getting that token:
https://auth0.com/docs/api/management/v2

For example, I can check what permissions a certain role has and what roles a certain user has.

Chef API:
- Defining Permissions that users can take.



I could set user metadata to return from the profile: https://auth0.com/docs/get-started/apis/scopes/sample-use-cases-scopes-and-claims#add-custom-claims-to-a-token


ManagementClient: // https://auth0.github.io/node-auth0/ManagementClient.html
comes configured to grab token if you provide creds so its easy.