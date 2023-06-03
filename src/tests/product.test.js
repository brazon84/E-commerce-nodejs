const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");
require("../models");

let token;
let productsId;

beforeAll(async () => {
  const credentials = {
    email: "brazon@gmail.com",
    password: "jose12345",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /products", async () => {
  const category = await Category.create({ name: "tech" });
  const products = {
    title: "sansumg",
    description: "hbsdskdjashkjjkhahjaschjsjdf",
    brand: "kdnfdsjnfjndnn",
    price: 5000,
    categoryId: category.id,
  };
  const res = await request(app)
    .post("/products")
    .send(products)
    .set("Authorization", `Bearer ${token}`);
  productsId = res.body.id;
  await category.destroy();
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("POST /products/:id/images ", async () => {
  const image = await ProductImg.create({
    url: "http://imgenes.jpg.com",
    publicId: "1",
  });
  const res = await request(app)
    .post(`/products/${productsId}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET /products", async () => {
  const res = await request(app)
    .get("/products")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /products/:id", async () => {
  const update = {
    title: "Motorola",
  };
  const res = await request(app)
    .put(`/products/${productsId}`)
    .send(update)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(update.title);
});

test("DELETE /products/:id", async () => {
  const res = await request(app)
    .delete(`/products/${productsId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
