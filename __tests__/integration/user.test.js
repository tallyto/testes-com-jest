const app = require("../../src/app");
const request = require("supertest");
const truncate = require("../util/truncate");
const bcrypt = require("bcryptjs");
const factory = require("../factory");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Verifica se a senha do usuario é criptografada", async () => {
    const user = await factory.create("User", {
      password: "123456",
    });

    const compareHash = await bcrypt.compare("123456", user.password_hash);

    expect(compareHash).toBe(true);
  });

  it("Deve cadastrar um usuário no banco de dados", async () => {
    const user = await factory.attrs("User");
    const response = await request(app).post("/users").send(user);

    expect(response.body).toHaveProperty("id");
  });

  it("Deve testar se o email cadastrado já existe", async () => {
    const user = await factory.attrs("User");

    await request(app).post("/users").send(user);

    const response = await request(app).post("/users").send(user);

    expect(response.status).toBe(400);
  });
});
