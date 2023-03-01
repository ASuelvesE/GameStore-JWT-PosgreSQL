import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
const allowedOrigins = ["*"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

//routers
import { routerUsers } from "./users/infrastructure/rest/users.router";
import { routerSales } from "./sales/infrastructure/rest/sales.router";
import { routerGames } from "./games/infrastructure/rest/games.router";
import { routerCarts } from "./carts/infrastructure/rest/carts.router";

app.use("/users/", routerUsers);
app.use("/sales/", routerSales);
app.use("/games/", routerGames);
app.use("/carts/", routerCarts);

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});
