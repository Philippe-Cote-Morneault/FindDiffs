import "reflect-metadata";
import { IServer } from "./interfaces";
import { container } from "./inversify.config";
import TYPES from "./types";

const server: IServer = container.get<IServer>(TYPES.IServer);

server.init();
