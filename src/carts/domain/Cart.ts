import Game from "../../games/domain/Game";
import Sale from "../../sales/domain/Sale";
import User from "../../users/domain/User";

export default interface Cart {
  id?: Number,
  user?: User;
  sales?: Sale[]
}
