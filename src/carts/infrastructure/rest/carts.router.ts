import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import CartsUseCases from "../../application/carts.usecases";
//repository
import CartsRepository from "../../domain/carts.repository";
import CartsRepositoryPostgres from "../db/carts.repository.postgres";
//domain
import User from "../../../users/domain/User";
import Message from "../../../context/responses/Message";
import { isAuth } from "../../../context/security/auth";
import Cart from "../../domain/Cart";
import Game from "../../../games/domain/Game";
import Sale from "../../../sales/domain/Sale";

//implementation
const cartsRepository: CartsRepository = new CartsRepositoryPostgres();
const cartsUseCases: CartsUseCases = new CartsUseCases(cartsRepository);

router.post("/create", isAuth, async (req: Request, res: Response) => {
  try {
    const user: User = req.body.auth;
    const cart: Cart = {
      user: user
    };
    const result: Cart | Message = await cartsUseCases.create(cart);
    res.json(result);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});
router.put("/add", isAuth, async (req: Request, res: Response) => {
  try {
    const user: User = req.body.auth;
    const sale: Sale = req.body.sale;
    const cart: Cart = {
      user: user
    };
    const result: Sale | Cart | Message = await cartsUseCases.add(cart,sale, user);

    res.json(result);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

router.get("/", isAuth, async (req: Request, res: Response) => {
  try {
    const user: User = req.body.auth;
    const userResponse: Sale | Cart | Message = await cartsUseCases.findByUser(user);
    res.send(userResponse);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

export { router as routerCarts };
