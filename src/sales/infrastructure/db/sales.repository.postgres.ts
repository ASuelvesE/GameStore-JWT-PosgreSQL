import User from "../../../users/domain/User";
import Cart from "../../../carts/domain/Cart";
import executeQuery from "../../../context/db/postgres.connector";
import Sale from "../../domain/Sale";
import SalesRepository from "../../domain/sales.repository";
import Message from "../../../context/responses/Message";

/*
¡¡¡LA COLUMNA USER LLEVA COMILLAS POR SER UNA PALABRA RESERVADA Y DISTINGUIRLA DE LA COLUMNA!!!
*/
export default class SalesRepositoryPostgres implements SalesRepository {
  async create(user: User): Promise<Sale[] | Message> {
    try {
      const sql = `select * from carritos where id_usuario = ${user.id} order by id desc`;
      const cartsFromDB: any[] = await executeQuery(sql);

      const sql2 = `update carritos set finalizado = true where id = ${cartsFromDB[0].id}`;
      await executeQuery(sql2);

      const sales: Sale[] | Message = await this.findByUser(user);
      return sales;

    } catch (error) {
      console.error(error);
    }
    const message: Message = {
      text: `No se ha podido realizar la compra`,
    };
    return message;
  }
  async findByUser(user: User): Promise<Sale[]> {
    let salesDB: Sale[] = [];
    try {
      const sql = `select co.id_carrito,co.cantidad,co.precio,co.id_videojuego 
        from compras co
        join carritos ca on ca.id = co.id_carrito
        where ca.finalizado = true and ca.id_usuario = ${user.id}
        order by co.id_carrito desc`;
      salesDB = await executeQuery(sql);

    } catch (error) {
      console.error(error);
    }
    return salesDB;
  }
}
