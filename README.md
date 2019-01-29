## Fitness Q/A

Simple fitness questions and answer app similare to stackoverflow but for health and fitness.
The motivation behind this project is to help peoplel find answers to simple questions that otherwise you would have to pay
unccessry money just to hear it form a Doctor.

### Progress

- [x] Create simple server
- [x] Make simple GET routes and views
- [x] Connect BootStrap
- [x] Connect DB
- [x] Designe DB

1. - [x] Create users
2. - [x] Create questions
3. - [ ] Edit questions
4. - [X] Delete questions
5. - [X] Create answers(route is not done)
6. - [ ] Edit questions
7. - [ ] Delete answers

- [X] Add AUTH

* - [x] Render a register form
* - [x] Encrypt Password
* - [x] Create a user
* - [x] Set session & Redirect to Home page
* - [x] Render a login form
* - [x] Validate Date coming from login form
* - [x] Pull user from DB and compare password and set session

- [ ] Implement user deletion feature
- [ ] check for input (Cross Site Scpripting)
- [ ] Create view Templates
- [ ] Make simple POST routes and forms
- [ ] Create helper methods to handle voting / a method to handle timeupdating when user edit question
- [X] implement methodOverride
- [ ] Implement Search feature
- [ ] Loged out users can see questions

#### REST ROUTE for questions

| Route          | Method |
| :------------- | -----: |
| questions      |    GET |
| questions/new  |    GET |
| questions      |   POST |
| questions/:qID |    GET |
| questions/:qID | DELETE |
| questions/:qID |    PUT |
| questions/:qID/:vote-up(ANSWERS)   |   POST |
| questions/:qID/:vote-down(ANSWERS) |   POST |

#### ROUTE for questions

| Route                              | Method |
| :--------------------------------- | -----: |
| questions/:qID/answers             |   GET  |
| questions/:qID/answers             |   POST |
| questions/:qID/answers             | DELETE |
| questions/:qID/answers             |    PUT |
| questions/:qID/answers/:aID/:vote-up(ANSWERS)   |   POST |
| questions/:qID/answers/:aID/:vote-down(ANSWERS) |   POST |

<!-- just Some ideas -->

Make a express applecations for asking questions
use cooke/session auth for authintication
create users and question and comment DB relationship
Use pug for the server side view engine
Use client-session or express-session
Build error handler and a page for all errors to display to user, with connect-flash
Use some of the good security practices such as using Helmet, bcrypt, cross-site-security-forgery

Note: node-gyp only works with stable/released versions of node. Since the bcrypt module uses node-gyp to build and install you'll need a stable version of node to use bcrypt. If you do not you'll likely see an error that starts with:
