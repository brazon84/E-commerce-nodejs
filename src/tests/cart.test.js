const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require('../models')

let token;
let cartId;

beforeAll(async () => {
    const credentials = {
      email: "brazon@gmail.com",
      password: "jose12345",
    };
    const res = await request(app).post("/users/login").send(credentials);
    token = res.body.token;
  });

test('POST /cart', async () => {
    const products = await Product.create( {
        title: "sansumg",
        description: "hbsdskdjashkjjkhahjaschjsjdf",
        brand: "kdnfdsjnfjndnn",
        price: 5000,
      });
      const cart = {
        ProductId: products.id,
        quantity: 4
      }
      const res = await request(app)
      .post("/cart")
      .send(cart)
      .set("Authorization", `Bearer ${token}`);
    await products.destroy();
    cartId= res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test("GET /cart", async () => {
    const res = await request(app)
    .get("/cart")
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test("PUT /cart/:id", async () => {
    const update = {
      quantity: 6
    };
    const res = await request(app)
    .put(`/cart/${cartId}`)
    .send(update)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(update.quantity);
  });
  test("DELETE /cart/:id", async () => {
    const res = await request(app)
    .delete(`/cart/${cartId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });