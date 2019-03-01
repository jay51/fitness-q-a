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

// // POST /questions/:qID/vote-up only
// router.post(
// 	"/questions/:qID/vote-up",
// 	auth.requiresLogin,
// 	question.voteQuestion
// );
const aQuestionId = "5c78b8906c20cc5d22360a87";
const aQuestionTitle = / /; ///Testing like and unlike/;

test("GET /", done => {
	server.get("/").expect(404, done);
});

test("GET /questions", done => {
	server
		.get("/questions")
		.expect(200)
		.expect(aQuestionTitle, done);
});

// not authorized
test("GET /questions/new", done => {
	server.get("/questions/new").expect(401, done);
});

// not aauthorized
test("POST /questions", done => {
	server
		.post("/questions")
		.send({
			question: "Testing this route with jest and supertest",
			description: "No description"
		})
		.expect(401, done);
});

test("GET /questions/:qID", done => {
	server
		.get(`/questions/${aQuestionId}`)
		.expect(200)
		.expect(aQuestionTitle, done);
});

// will return 404 if question not found
test("POST /questions/:qID/vote-up ", done => {
	server.post(`/questions/${aQuestionId}/vote-up`).expect(401, done);
});

// ---------------------NOT WORKING------------------
// test("DELETE /questions/:qID", done => {
// jest.setTimeout(10000);
// server
// /questions/5c7899a24552624a5b9c7f35?_method=DELETE
// .delete(`/questions/${aQuestionId}`)
// .type("application/x-www-form-urlencoded")
// .expect(200);
// });

// test("PUT /questions/:qID", done => {
// 	// jest.setTimeout(10000);
// 	server
// 		.put(`/questions/5c78b07cf0ea5957d1607b72`)
// 		.type("application/x-www-form-urlencoded")
// 		.expect(200);
// });
