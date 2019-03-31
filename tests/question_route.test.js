/* global test process */
process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let server = request(app);

// close the server after each test (not working)
// afterEach(done => server.end(done));

// test("GET /", done => {
// 	server
// 		.get("/")
// 		.expect(404)
// 		.end(done);
// });

let aQuestion;
// for routes that require auth just set the cookie in the request
let cookie;

test("GET /", done => {
  server.get("/").expect(404, done);
});

// not authorized
test("GET /questions/new", done => {
  server.get("/questions/new").expect(401, done);
});

test("GET /login", done => {
  const user = "email=jay@gmail.com";
  const pass = "password=pass";

  server
    .post("/login")
    .send(`${user}&${pass}`)
    .set("Accept", "application/json")
    .expect(res => {
      cookie = res.headers["set-cookie"];
      console.log(cookie);
    })
    .expect(302, done);
});

// not aauthorized unless you uncomment the free-post route
test("POST /questions", done => {
  const question = "question=Testing world";
  const description = "description=A only Nigerian Nobel Laureate";

  server
    .post("/questions")
    .send(`${question}&${description}`)
    .set("cookie", cookie)
    .expect(res => {
      console.log(res.body);
      aQuestion = res.body;
    })
    .expect(200, done);
});

test("GET /questions", done => {
  server.get("/questions").expect(200, done);
  // .expect(aQuestion._id, done);
});

test("GET /questions/:qID", done => {
  server.get(`/questions/${aQuestion._id}`).expect(200, done);
  // .expect(aQuestion.question, done);
});

// +++++++++++++++ It's working +++++++++++++++++
test("PUT /questions/:qID", done => {
  const question = "question=Testing world";
  const description = "description=A only Nigerian Nobel Laureate";

  server
    .put(`/questions/${aQuestion._id}`)
    .type("application/json")
    .set("cookie", cookie)
    .send(`${question}&${description}`)
    .expect(200, done);
});

// will return 404 if question not found otherwise 401
test("POST /questions/:qID/vote-up ", done => {
  server.post(`/questions/${aQuestion._id}/vote-up`).expect(401, done);
});

// +++++++++++++++ It's working +++++++++++++++++
test("DELETE /questions/:qID", done => {
  // jest.setTimeout(10000); if need jest to wait for response longer
  server
    .delete(`/questions/${aQuestion._id}`)
    .type("application/x-www-form-urlencoded")
    .expect(200, done);
});
