import Cart from "../../carts/domain/Cart";
import Message from "../../context/responses/Message";

import User from "../../users/domain/User";
import Sale from "../domain/Sale";
import SalesRepository from "../domain/sales.repository";

export default class SalesUseCases {
  salesRepository: SalesRepository;

  constructor(salesRepository: SalesRepository) {
    this.salesRepository = salesRepository;
  }

  async create(user: User): Promise<Sale[] | Message> {
    const saleDB: any = await this.salesRepository.create(user);
    if (saleDB) {
      return saleDB;
    } else {
      const message: Message = {
        text: "No se ha creado la tarea",
      };
      return message;
    }
  }

  async findByUser(user: User): Promise<Sale[]> {
    return await this.salesRepository.findByUser(user);
  }
}
