import { Container } from "inversify";
import { Application } from "./app";
import { Server } from "./server";
import TYPES from "./types";

import { ImagePairController } from "./controllers/imagePair.controller";
import { IImagePairController, IUserController } from "./controllers/interfaces";
import { UserController } from "./controllers/user.controller";
import {IApplication, IServer } from "./interfaces";
import { ImagePairService } from "./services/imagePair/imagePair.service";
import { IImagePairService, IUserService } from "./services/interfaces";
import { UserService } from "./services/user/user.service";

const container: Container = new Container();

container.bind<IServer>(TYPES.IServer).to(Server);
container.bind<IApplication>(TYPES.IApplication).to(Application);

container.bind<IImagePairController>(TYPES.IImagePairController).to(ImagePairController);
container.bind<IUserController>(TYPES.IUserController).to(UserController);

container.bind<IImagePairService>(TYPES.IImagePairService).to(ImagePairService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);

export { container };
