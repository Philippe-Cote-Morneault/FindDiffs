import { Container } from "inversify";
import Types from "./types";
import { Server } from "./server";
import { Application } from "./app";
import { Route } from "./routes/index";
import { Routes } from "./routes";
import { UsernameValidation } from "./routes/verifyUsername";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.Routes).to(Routes);

container.bind(Types.Index).to(Route.Index);
container.bind(Types.UsernameValidation).to(UsernameValidation);
export { container };
