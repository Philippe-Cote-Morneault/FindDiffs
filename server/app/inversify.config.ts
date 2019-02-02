import { Container } from "inversify";
import { Application } from "./app";
import { Server } from "./server";
import TYPES from "./types";

import {ApplicationInterface, ServerInterface } from "./interfaces";

const container: Container = new Container();

container.bind<ServerInterface>(TYPES.ServerInterface).to(Server);
container.bind<ApplicationInterface>(TYPES.ApplicationInterface).to(Application);

export { container };
