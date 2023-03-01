import User from "../../../users/domain/User";
import Cart from "../../domain/Cart";
import executeQuery from "../../../context/db/postgres.connector";
import CartsRepository from "../../domain/carts.repository";
import Message from "../../../context/responses/Message";
import Game from "../../../games/domain/Game";
import Sale from "../../../sales/domain/Sale";

/*
¡¡¡LA COLUMNA USER LLEVA COMILLAS POR SER UNA PALABRA RESERVADA Y DISTINGUIRLA DE LA COLUMNA!!!
*/
export default class CartsRepositoryPostgres implements CartsRepository {

  async create(cart: Cart): Promise<Cart | Message> {
    try {
      if (cart.user) {
        const insertCart = `insert into carritos (id_usuario,finalizado) values (${cart.user.id},false) RETURNING id`;
        const resultDB: any[] = await executeQuery(insertCart);
        cart.id = resultDB[0].id;
        return cart;
      }
    } catch (error) {
      console.error(error);
    }
    return cart;
  }
  async add(cart: Cart, sale: Sale, user: User): Promise<Sale | Cart | Message> {
    try {
      if (cart.user) {
        const insertCart = `select * from carritos where id_usuario = ${user.id} order by id desc`;
        const resultDB: any[] = await executeQuery(insertCart);
        cart.id = resultDB[0].id;

        const addShopping = `insert into compras values(${cart.id},${sale.count},${sale.price},${sale.game.id})`;
        await executeQuery(addShopping);
        return await this.findByUser(user);
      }
    } catch (error) {
      console.error(error);
    }
    return cart;
  }


  async findByUser(user: User): Promise<Sale | Cart | Message> {
    try {
      const sql = `select co.id_carrito,co.cantidad,co.precio,co.id_videojuego 
      from compras co
      join carritos ca on ca.id = co.id_carrito
      where ca.finalizado = false and ca.id_usuario = ${user.id}
      order by co.id_carrito desc`;

      const salesFromDB: any[] = await executeQuery(sql);

      if (salesFromDB.length !== 0) {
        const games: Sale[] = []
        for(let saleFromDB of salesFromDB){
          const game: Game = {
            id: saleFromDB.id_videojuego,
            name: undefined
          }
          const sale: Sale = {
            game: game,
            count: saleFromDB.cantidad,
            price: saleFromDB.precio
          }
          games.push(sale);
        }
        const cart: Cart = {
          id: salesFromDB[0].id_carrito,
          user: user,
          sales: games
        }
        return cart;
      }
      const sql2 = `select * from carritos where id_usuario = ${user.id} order by id desc`;
      const cartsFromDB: Cart[] = await executeQuery(sql2);
      return cartsFromDB[0];
    } catch (error) {
      const message: Message = {
        text: `${error}`,
      };
      return message;
    }
  }
}
