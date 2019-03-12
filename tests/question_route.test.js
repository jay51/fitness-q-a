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

// http://localhost:3000/questions/5c7c4035e8b4311568dcbd4d
// this is a new questions
const aQuestionId = "5c7c4035e8b4311568dcbd4d";
const aQuestionTitle = /Testing/;

test("GET /", done => {
	server.get("/").expect(404, done);
});

// not authorized
test("GET /questions/new", done => {
	server.get("/questions/new").expect(401, done);
});

// not aauthorized unless you uncomment the free-post route
test("POST /questions", done => {
	const question = "question=Testing world";
	const description = "description=A only Nigerian Nobel Laureate";

	server
		.post("/questions")
		.send(`${question}&${description}`)
		// Doesn't work because post route creates question but breaks before returning response back
		.expect(res => {
			aQuestionId = res._id;
			aQuestionTitle = res.question;
		})
		.expect(401, done);
});

test("GET /questions", done => {
	server
		.get("/questions")
		.expect(200)
		.expect(aQuestionTitle, done);
});

test("GET /questions/:qID", done => {
	server
		.get(`/questions/${aQuestionId}`)
		.expect(200)
		.expect(aQuestionTitle, done);
});

// +++++++++++++++ It's working +++++++++++++++++
test("PUT /questions/:qID", done => {
	const question = "question=Testing world";
	const description = "description=A only Nigerian Nobel Laureate";

	server
		.put(`/questions/${aQuestionId}`)
		.type("application/json")
		.send(`${question}&${description}`)
		.expect(200, done);
});

// +++++++++++++++ It's working +++++++++++++++++
// test("DELETE /questions/:qID", done => {
// 	// jest.setTimeout(10000); if need jest to wait for response longer
// 	server
// 		.delete(`/questions/${aQuestionId}`)
// 		.type("application/x-www-form-urlencoded")
// 		.expect(200, done);
// });

// will return 404 if question not found otherwise 401
test("POST /questions/:qID/vote-up ", done => {
	server.post(`/questions/${aQuestionId}/vote-up`).expect(401, done);
});
