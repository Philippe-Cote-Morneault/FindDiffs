import { Container } from "inversify";
import { Application } from "./app";
import { Server } from "./server";
import TYPES from "./types";

import { ImagePairController } from "./controllers/imagePair.controller";
import { IController } from "./controllers/interfaces";
import {IApplication, IServer } from "./interfaces";
import { ImagePairService } from "./services/imagePair/imagePair.service";
import { IImagePairService } from "./services/interfaces";

const container: Container = new Container();

container.bind<IServer>(TYPES.IServer).to(Server);
container.bind<IApplication>(TYPES.IApplication).to(Application);
container.bind<IController>(TYPES.IController).to(ImagePairController);
container.bind<IImagePairService>(TYPES.IImagePairService).to(ImagePairService);

export { container };
