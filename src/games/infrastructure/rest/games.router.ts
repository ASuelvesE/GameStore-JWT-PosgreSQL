import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import GamesUseCases from "../../application/games.usecases";
//repository
import GamesRepositoryPostgres from "../db/games.repository.postgres";
import GamesRepository from "../../domain/games.repository";
//domain
import User from "../../../users/domain/User";
import Message from "../../../context/responses/Message";
import { isAuth } from "../../../context/security/auth";
import Game from "../../domain/Game";



//implementation
const gamesRepository: GamesRepository = new GamesRepositoryPostgres();
const gamesUseCases: GamesUseCases = new GamesUseCases(gamesRepository);

router.post("/create",  async (req: Request, res: Response) => {
  try {
    const game: Game = {
      name: req.body.name
    };
    const result: Game | Message = await gamesUseCases.create(game);
    res.json(result);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

router.get("/",  async (req: Request, res: Response) => {
  try {
    const games: Game[] = await gamesUseCases.findAll();
    res.send(games);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

router.put(`/update`,async (req:Request, res: Response) => {
  try {
    const game: Game = {
      name: req.body.name,
      id: req.body.id
    };
    const result: Game | Message = await gamesUseCases.update(game);
    res.json(result);
  }  catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

router.delete(`/delete`,async (req:Request, res: Response) => {
  try{
    const game: Game = {
      name: req.body.name
    };
    const result : Game[] = await gamesUseCases.delete(game);
    res.json(result);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message)
  }
});

export { router as routerGames };
