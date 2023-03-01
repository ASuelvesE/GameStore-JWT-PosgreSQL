import Message from "../../context/responses/Message";
import Auth from "./Auth";
import User from "./User";

export default interface UsersRepository {
  create(user: User): Promise<Message>;
  login(user: User): Promise<User>;
}
