import Cart from "../../carts/domain/Cart";

export default interface User{
    id?: Number,
    name: String,
    password?: String,
    carts?: Cart[]
}