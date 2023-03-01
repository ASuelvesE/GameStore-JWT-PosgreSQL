import express, { Request, Response } from "express";
const router = express.Router();

//usescases
import SalesUseCases from "../../application/sales.usecases";
//repository
import SalesRepository from "../../domain/sales.repository";
import SalesRepositoryPostgres from "../db/sales.repository.postgres";
//domaink";
import User from "../../../users/domain/User";
import Message from "../../../context/responses/Message";
import { isAuth } from "../../../context/security/auth";
import Sale from "../../domain/Sale";
import Cart from "../../../carts/domain/Cart";


//implementation
const salesRepository: SalesRepository = new SalesRepositoryPostgres();
const salesUseCases: SalesUseCases = new SalesUseCases(salesRepository);

router.post("/pay", isAuth, async (req: Request, res: Response) => {
  try {
    const user: User = req.body.auth;
    const result: Sale[] | Message = await salesUseCases.create(user);
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
    const sales: Sale[] = await salesUseCases.findByUser(user)
    res.send(sales);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    res.status(500).send(message);
  }
});

export { router as routerSales };
