import { Container } from "inversify";
import { Application } from "./app";
import { Server } from "./server";
import TYPES from "./types";

import { DifferenceController } from "./controllers/difference.controller";
import { GameCardController } from "./controllers/gameCard.controller";
import { ImagePairController } from "./controllers/imagePair.controller";
import { UserController } from "./controllers/user.controller";

import { IDifferenceController, IGameCardController, IImagePairController, IUserController } from "./controllers/interfaces";
import {IApplication, IServer } from "./interfaces";
import { IDifferenceService, IGameCardService, IImagePairService, IUserService } from "./services/interfaces";

import { DifferenceService } from "./services/difference/difference.service";
import { GameCardService } from "./services/gameCard/gameCard.service";
import { ImagePairService } from "./services/imagePair/imagePair.service";
import { UserService } from "./services/user/user.service";

const container: Container = new Container();

container.bind<IServer>(TYPES.IServer).to(Server);
container.bind<IApplication>(TYPES.IApplication).to(Application);

container.bind<IGameCardController>(TYPES.IGameCardController).to(GameCardController);
container.bind<IImagePairController>(TYPES.IImagePairController).to(ImagePairController);
container.bind<IDifferenceController>(TYPES.IDifferenceController).to(DifferenceController);
container.bind<IUserController>(TYPES.IUserController).to(UserController);

container.bind<IGameCardService>(TYPES.IGameCardService).to(GameCardService);
container.bind<IImagePairService>(TYPES.IImagePairService).to(ImagePairService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IDifferenceService>(TYPES.IDifferenceService).to(DifferenceService);

export { container };
