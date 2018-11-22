[X] Create simple server
[X] Make simple GET routes and views
[X] Connect BootStrap  
[X] Connect DB
[X] Designe DB
[] Create view Templates
[] Create helper methods to handle voting maybe a method to handle timeupdating when user edit question
1.[] Create users
2.[] Create questions
3.[] Edit questions
4.[] Delete questions
5.[] Create answers
6.[] Edit questions
7.[] Delete answers
[] Make simple POST routes and forms
[] implement methodOverride
[] Add AUTH
[] Loged out users can see questions

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
