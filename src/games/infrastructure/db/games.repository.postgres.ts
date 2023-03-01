import User from "../../../users/domain/User";
import Cart from "../../domain/Game";
import executeQuery from "../../../context/db/postgres.connector";
import GamesRepository from "../../domain/games.repository";
import Game from "../../domain/Game";


export default class GamesRepositoryPostgres implements GamesRepository {
  async create(game: Game): Promise<Game> {
    try {
      if (game) {
        const sqlInsert = `insert into videojuegos (nombre) values ('${game.name}')`;
        await executeQuery(sqlInsert);

        const sqlSelect = `select * from videojuegos where nombre = '${game.name}'`;
        const result = await executeQuery(sqlSelect);
        return result[0];
      }
    } catch (error) {
      console.error(error);
    }
    return game;
  }
  async update(game: Game): Promise<Game> {
    try{
      if(game) {
        const sqlInsert = `update videojuegos set nombre = '${game.name}' where id = ${game.id}`
        await executeQuery(sqlInsert)

        const sqlSelect = `select * from videojuegos where nombre = '${game.name}' and id = ${game.id} `
        const result = await executeQuery(sqlSelect)
        return result[0]
      }
    }catch (error){
      console.error(error)
    }
    return game;
  }
 async delete(game: Game): Promise<Game[]> {
  const result: Game[] = []
  try{
    if(game){
      const sqlInsert = `delete from videojuegos where nombre = '${game.name}'`
      await executeQuery(sqlInsert)

      const sqlSelect = `select * from videojuegos`
      const result = await executeQuery(sqlSelect)
      return result;
    }
    }catch (error){
      console.error(error)
    }
    return result;
  }
  
 
  async findAll(): Promise<Game[]> {
    const games: Game[] = [];
    const sql = `select * from videojuegos`;
    const gamesFromDB: any[] = await executeQuery(sql);
    for(let gameFromDB of gamesFromDB){
      const game: Game = {
        id: gameFromDB.id,
        name: gameFromDB.nombre
      }
      games.push(game);
    }
    return games;
  }
}
