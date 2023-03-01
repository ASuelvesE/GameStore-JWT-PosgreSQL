
import Message from "../../context/responses/Message";
import Game from "../../games/domain/Game";
import Sale from "../../sales/domain/Sale";

import User from "../../users/domain/User";
import Cart from "../domain/Cart";
import CartsRepository from "../domain/carts.repository";


export default class CartsUseCases {
  cartsRepository: CartsRepository;

  constructor(cartsRepository: CartsRepository) {
    this.cartsRepository = cartsRepository;
  }

  async create(cart: Cart): Promise<Cart | Message> {
    const cartDB: any = await this.cartsRepository.create(cart);
    if (cartDB.id) {
      return cart;
    }
    const message: Message = {
      text: "No se ha creado la tarea",
    };
    return message;
  }
  async add(cart: Cart, sale: Sale, user: User): Promise<Sale | Cart | Message> {
    const cartDB: any = await this.cartsRepository.add(cart, sale, user);
    if (cartDB.id) {
      return cartDB;
    }
    const message: Message = {
      text: "No se ha creado la tarea",
    };
    return message;
  }

  async findByUser(user: User): Promise<Sale | Cart | Message> {
    return await this.cartsRepository.findByUser(user);
  }
}
