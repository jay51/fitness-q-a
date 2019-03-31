## 🌱Fitness Q/A

Simple fitness questions and answer app similare to stackoverflow but for health and fitness.
The motivation behind this project is to help peoplel find answers to simple questions that otherwise you would have to pay
unccessry money just to hear it form a Doctor.

### contribute
- Clone or Fork repo
- `cd` into repo and install dependencies `npm i`
- start mongo if you have it installed, otherwise use docker
  - First install docker for your system [install Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-getting-started) 
  - Second build an image out of the docker file in the repo -> `cd` into the rep folder and type `docker build .`
  - Start a container out of the new built image -> type `docker run -d  -p 27017:27017 --name mongoDB mongo`
  - Next time you need to start the mongo container just type `docker start mongoDB` and type `docker stope mongoDB` to shut it down
- To start the app type `npm start`
- Start hacking!

> **Note**: To access mongoDB shell, type `docker exec -it mongoDB /bin/bash`. This will put you inside the docker container and then type `mongo` to run the mongo shell.

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

#### ROUTES for Questions

| Route          | Method |
| :------------- | -----: |
| questions      |    GET |
| questions/new  |    GET |
| questions      |   POST |
| questions/:qID |    GET |
| questions/:qID | DELETE |
| questions/:qID |    PUT |
| questions/:qID/vote-up  |   POST |


#### ROUTES for Answers

| Route                              | Method |
| :--------------------------------- | -----: |
| questions/:qID/answers             |   GET  |
| questions/:qID/answers             |   POST |
| questions/:qID/answers             | DELETE |
| questions/:qID/answers             |    PUT |
| questions/:qID/answers/:aID/vote-up(ANSWERS)   |   POST |


<!-- just Some ideas -->

Note: node-gyp only works with stable/released versions of node. Since the bcrypt module uses node-gyp to build and install you'll need a stable version of node to use bcrypt. If you do not you'll likely see an error that starts with:
