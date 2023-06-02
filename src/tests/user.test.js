const request = require("supertest");
const app = require("../app");

let userId;
let token;

test("POST /users", async () => {
  const user = {
    firstName: "jose",
    lastName: "brazon",
    email: "abg.brazon@gmail.com",
    password: "jose1234",
    phone: "1234567890",
  };
  const res = await request(app)
  .post("/users")
  .send(user);
  userId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});
test("POST /users/login user login", async () => {
    const credentials = {
      email: "abg.brazon@gmail.com",
      password: "jose1234",
    }
    const res = await request(app)
    .post('/users/login')
    .send(credentials)
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
test("GET /users", async () => {
  const res = await request(app)
  .get("/users")
  .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(2);
});
test("PUT /users/:id", async () => {
  const update = {
    firstName: "jose actualizado",
  };
  const res = await request(app)
  .put(`/users/${userId}`)
  .send(update)
  .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(update.name);
});

test("POST /users/login user login invalid", async () => {
    const credentials = {
      email: "abg.brazongg@gmail.com",
      password: "jose1234fff",
    }
    const res = await request(app)
    .post('/users/login')
    .send(credentials)
    expect(res.status).toBe(401);
  });
test("DELETE /users/:id", async () => {
  const res = await request(app)
  .delete(`/users/${userId}`)
  .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});
