
Frontend App Name:
"Stockpot"
"Recipe Compendium"
"Pap-Eurika, for all your great recipe ideas"
"Chefs Choice"
"Recipe Vault"

Email Address is not unique since you can have multiple accounts.


Todos:


try removing requires
- Do some more designing of database resources and plan out needs.
- mark a way to show who has or has not voted on a variant

- add user id when creating a recipe 
- or variant
- Make GET /recipes/me, break into system so no repeating logic


- Make sub-routes for editing Steps
- Make sub-routes for editing ingredients
- Make endpoints for ratings and various statistics. (Top recipes, my top recipes, etc.)

Overall Plan:
  - Differentiate between public ratings and author ratings.
  - Model some more frontend stuff
    - Full page recipe
      - Recipe name at top
      - description
      - recipes are created with one variant marked as "primary variant". Validate this. Other than labeling it "primary" don't do anything yet.
      - duplicate button that copies the first variant and puts it in the last slot as "_ Copy"
      - variants bar across the bottom showing all ratings on the unopened ones
        - Probably want to show number of favorites
        - number of ratings
        - cost of ingredients?
        - show a ratio dial where you can go to .25, .5, 1.25, 1.5, 1.75, 2, anything.
        - average rating
        - Tags (more than small version?)
        - edit icon for author
    - Small page variant
      - Title
      - Author and link to their recipes page ordered by rating
      - Specific important tags DECIDE WHAT THESE ARE. Link to home page filtering by that tag.
      - Star rating
      - Cook time and icon
      - picture as entire background or cusine tag default image as backup
    - Home page
      - featured recipes
        - slidebar with arrows showing idk like 6 variants
      - Filters




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


Authorization: this app is simple so I don't think it's needed yet since everyone can manage their own shit.
either it's public, or they can use /me endpoints to manage their own stuff, or I can do it in the admin.