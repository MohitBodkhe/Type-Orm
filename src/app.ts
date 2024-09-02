import express from "express";
import { DataSource } from "typeorm";
import { User } from "./entities/user";

const app = express();
app.use(express.json());
const port = 8080;

const database = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "mohit",
  password: "password",
  database: "typeorm",
  port: 5432,
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});

database
  .initialize()
  .then(() => {
    app.listen(port);
    console.log("Database initialized");
  })
  .catch((err) => console.log(err.message));

const userRepo = database.getRepository(User);

app.get("/user/", async function (req, res) {
  const alluser = await userRepo.find();
  console.log(alluser);
  res.send(alluser).status(200);
});

app.post("/user/", async function (req, res) {
  const user = req.params;
  console.log(user, "user param");
  const insert = await userRepo.save(user);
  res.send(insert);
});
