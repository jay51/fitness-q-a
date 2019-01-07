[X] Create simple server
[X] Make simple GET routes and views
[X] Connect BootStrap  
[X] Connect DB
[X] Designe DB
1.[] Create users
2.[] Create questions
3.[] Edit questions
4.[] Delete questions
5.[] Create answers
6.[] Edit questions
7.[] Delete answers
[] Add AUTH
-[] Render a register form
-[] Encrypt Password
-[] Create a user
-[] Set session & Redirect to Home page -[X] Render a login form
-[] Validate Date coming from login form
-[] Pull user from DB and set session
[] check for input (Cross Site Scpripting)
[] Create view Templates
[] Make simple POST routes and forms
[] Create helper methods to handle voting / a method to handle timeupdating when user edit question
[] implement methodOverride
[] Loged out users can see questions
[ ] Remove bodyParser because new express comes with bodyParser

## REST ROUTE for questions METHOD

questions GET
questions POST
questions/new GET
questions/:qID GET
questions/:qID DELETE
questions/:qID PUT

## ROUTE for questions METHOD

questions/:qID/answers POST
questions/:qID/answers DELETE
questions/:qID/answers PUT
questions/:qID/:vote-up answers POST
questions/:qID/:vote-down answers POST

<!-- just Some ideas -->

Make a express applecations for asking questions
use cooke/session auth for authintication
create users and question and comment DB relationship
Use pug for the server side view engine
Use client-session or express-session
Build error handler and a page for all errors to display to user, with connect-flash
Use some of the good security practices such as using Helmet, bcrypt, cross-site-security-forgery

Note: node-gyp only works with stable/released versions of node. Since the bcrypt module uses node-gyp to build and install 
you'll need a stable version of node to use bcrypt. If you do not you'll likely see an error that starts with:
