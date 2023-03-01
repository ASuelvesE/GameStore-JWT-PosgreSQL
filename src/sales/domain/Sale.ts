import Cart from "../../carts/domain/Cart";
import Game from "../../games/domain/Game";

export default interface Sale {
  game: Game;
  cart?: Cart;
  count: Number;
  price: Number;
}
