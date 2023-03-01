import Cart from "../../carts/domain/Cart";
import Message from "../../context/responses/Message";
import User from "../../users/domain/User";
import Sale from "./Sale";

export default interface SalesRepository {
  create(user: User): Promise<Sale[] | Message>;
  findByUser(user: User): Promise<Sale[]>;
}
