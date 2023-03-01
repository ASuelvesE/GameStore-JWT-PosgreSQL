import Message from "../../context/responses/Message";
import { createToken } from "../../context/security/auth";
import Auth from "../domain/Auth";
import User from "../domain/User";
import UsersRepository from "../domain/users.repository";

export default class UsersUseCases {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  create(user: User): Promise<Message> {
    return this.usersRepository.create(user);
  }

  login(user: User): Promise<User> {
    return this.usersRepository.login(user);
  }

  createToken(user: User): Auth {
    const auth: Auth = {
      user: {
        id: user.id,
        name: user.name,
      },
      token: createToken(user),
    };
    return auth;
  }
}
