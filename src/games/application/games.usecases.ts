import Message from "../../context/responses/Message";

import User from "../../users/domain/User";
import Game from "../domain/Game";
import GamesRepository from "../domain/games.repository";


export default class GamesUseCases {
  gamesRepository: GamesRepository;

  constructor(gamesRepository: GamesRepository) {
    this.gamesRepository = gamesRepository;
  }

  async create(game: Game): Promise<Game | Message> {
    const gameDB: Game = await this.gamesRepository.create(game);
    if (gameDB.id) {
      return gameDB;
    } else {
      const message: Message = {
        text: "No se ha creado la tarea",
      };
      return message;
    }
  }

  async findAll(): Promise<Game[]> {
    return await this.gamesRepository.findAll();
  }
  async update(game: Game): Promise<Game | Message> {
    const gameDB: Game = await this.gamesRepository.update(game);
    if (gameDB.id) {
      return gameDB
    } else {
      const message: Message = {
        text: "No se ha completado la tarea",
      };
      return message;
    }
  }
  async delete(game: Game): Promise<Game[]> {
    return await this.gamesRepository.delete(game);
  }
}
