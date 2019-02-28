process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let server = request(app);

// close the server after each test (not working)
// afterEach(done => server.end(done));

it("should return 404", done => {
	server
		.get("/")
		.expect(404)
		.end(done);
});
