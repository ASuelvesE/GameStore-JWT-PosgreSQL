import User from "../../users/domain/User";
import Game from "./Game";

export default interface GamesRepository {
  create(task: Game): Promise<Game>;
  findAll(): Promise<Game[]>;
  update(task: Game): Promise<Game>;
  delete(task: Game): Promise<Game[]>;
}
