import { fastify } from "fastify";

import dotenv from "dotenv";
import nanoid from "nanoid";
import jwt from "fastify-jwt";

import { FoodEntry, FoodEntryCreateOptions } from "./schema/FoodEntryTypes";
import { IdBodyParams, IdParam } from "./schema/HelperTypes";
import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";

const main = async (): Promise<void> => {
  dotenv.config();

  const port = process.env.PORT || 3000;

  const apiConfig: FastifyServerOptions = {
    logger: {
      level: "info",
    },
  };

  const foodsApi: FastifyInstance = fastify(apiConfig);

  foodsApi.register(jwt, {
    secret: process.env.CLIENT_SECRET ?? "",
  });

  foodsApi.register(require("fastify-cors"), {
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
  });

  foodsApi.addHook(
    "onRequest",
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        if (!req.url.includes("login")) {
          await req.jwtVerify();
        }
      } catch (error) {
        res.code(401).send({ error: "invalid login credential" });
      }
    }
  );
  const userValid = (username: string, password: string) => {
    return (
      username === process.env.VALID_USERNAME &&
      password === process.env.VALID_PASSWORD
    );
  };

  const foods: FoodEntry[] = [];

  foodsApi.post("/login", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { username, password } = req.body as IdBodyParams;
      if (username && password) {
        if (userValid(username, password)) {
          const options = { expiresIn: "1d" };
          console.log(`user: ${username}, password: ${password}`);
          const token = foodsApi.jwt.sign(
            { name: username, isPotato: false },
            options
          );
          res.code(200).send({
            token,
          });
        } else {
          res.code(401).send({ error: "invalid login credentials" });
        }
      } else {
        res.code(406).send({ error: "unaccaptable parameters" });
      }
    } catch (error) {
      res.code(500).send({ error: "internal server error" });
    }
  });

  foodsApi.get("/food", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      foods.length > 0
        ? res.send(foods)
        : res.code(404).send({ error: "not found" });
    } catch (error) {
      res.code(500).send({ error: "internal server error" });
    }
  });

  foodsApi.get<{ Querystring: IdParam }>(
    "/food/:id",
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        const { id } = req.query as IdParam;

        if (id) {
          const requestedFood = foods.find((food) => {
            return food.id === id;
          });
          requestedFood
            ? res.send(requestedFood)
            : res.code(404).send({ error: "not found" });
        } else {
          res.code(406).send({ error: "unaccaptable parameters" });
        }
      } catch (error) {
        res.code(500).send({ error: "internal server error" });
      }
    }
  );

  foodsApi.post<{ Body: FoodEntryCreateOptions }>("/food", async (req, res) => {
    try {
      const { name } = req.body as FoodEntryCreateOptions;
      if (name) {
        const requestedFood: FoodEntry = {
          name,
          id: nanoid.nanoid(),
          createdAt: new Date(),
        };
        foods.push(requestedFood);
        res.code(201).send();
      } else {
        res.code(406).send({ error: "unaccaptable parameters" });
      }
    } catch (error) {
      console.error(error);
      res.code(500).send({ error: "internal server error" });
    }
  });

  foodsApi.put<{ Querystring: IdParam }>(
    "/food/:id",
    (req: FastifyRequest, res: FastifyReply) => {
      try {
        const { name, details } = req.body as FoodEntryCreateOptions;
        const { id } = req.query as IdParam;

        if (id && name) {
          const requestedFood = foods.find((food) => {
            return food.id === id;
          });

          if (requestedFood) {
            requestedFood.name = name;
            requestedFood.details = details;
            res.send(requestedFood);
          } else {
            res.code(404).send({ error: "not found" });
          }
        } else {
          res.code(406).send({ error: "unaccaptable parameters" });
        }
      } catch (error) {
        res.code(500).send({ error: "internal server error" });
      }
    }
  );
  foodsApi.delete<{ Querystring: IdParam }>(
    "/food/:id",
    (req: FastifyRequest, res: FastifyReply) => {
      try {
        const { id } = req.query as IdParam;

        if (id) {
          const requestedFood = foods.find((food) => {
            return food.id === id;
          });
          if (requestedFood) {
            const foodIndex = foods.indexOf(requestedFood);
            foods.splice(foodIndex, 1);
            res.code(204).send();
          } else {
            res.code(204).send();
          }
        } else {
          res.code(406).send({ error: "unaccaptable parameters" });
        }
      } catch (error) {
        res.code(500).send({ error: "internal server error" });
      }
    }
  );

  foodsApi.listen(port, () => {
    console.log(`fastify listening on: ${port}`);
  });
};

main().catch(console.error);
