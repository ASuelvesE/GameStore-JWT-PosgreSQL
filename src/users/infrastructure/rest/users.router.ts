import express, { Request, Response } from "express";
const router = express.Router();

//usecases
import UsersUseCases from "../../application/users.usecases";
//repository
import UsersRepository from "../../domain/users.repository";
import UsersRepositoryPostgres from "../db/users.repository.postgres";
//domain
import User from "../../domain/User";
import Auth from "../../domain/Auth";
import Message from "../../../context/responses/Message";
//implementation
const usersRepository: UsersRepository = new UsersRepositoryPostgres();
const usersUseCases: UsersUseCases = new UsersUseCases(usersRepository);

router.post("/create", async (req: Request, res: Response) => {
  try {
    const user: User = {
      name: req.body.name,
      password: req.body.password,
    };
    const result: Auth | Message = await usersUseCases.create(user);
    res.json(result);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user: User = {
      name: req.body.name,
      password: req.body.password,
    };
    const userLogin: User = await usersUseCases.login(user);
    if (userLogin.id) {
      const auth: Auth = usersUseCases.createToken(userLogin);
      res.json(auth);
    } else {
      const message: Message = {
        text: `Credenciales incorrectas`,
      };
      res.status(404).send(message);
    }
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

export { router as routerUsers };
