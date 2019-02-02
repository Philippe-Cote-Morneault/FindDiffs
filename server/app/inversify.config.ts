import { Container } from "inversify";
import { Application } from "./app";
import { Server } from "./server";
import TYPES from "./types";

import {IApplication, IServer } from "./interfaces";
import { ImagePairService } from "./services/imagePair/imagePair.service";

const container: Container = new Container();

container.bind<IServer>(TYPES.IServer).to(Server);
container.bind<IApplication>(TYPES.IApplication).to(Application);

export { container };
