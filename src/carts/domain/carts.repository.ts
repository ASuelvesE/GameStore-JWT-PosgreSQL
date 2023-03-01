import Message from "../../context/responses/Message";
import Game from "../../games/domain/Game";
import Sale from "../../sales/domain/Sale";
import User from "../../users/domain/User";
import Cart from "./Cart";


export default interface CartsRepository {
  create(cart: Cart): Promise<Cart | Message>;
  add(cart: Cart, sale: Sale, user: User): Promise<Sale | Cart | Message>;
  findByUser(user: User): Promise<Sale | Cart | Message>;
}
