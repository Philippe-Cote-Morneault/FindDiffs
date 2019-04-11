export default  {
        IServer: Symbol.for("IServer"),
        IApplication: Symbol.for("IApplication"),

        IImagePairController: Symbol.for("IImagePairController"),
        IUserController: Symbol.for("IUserController"),
        IGameCardController: Symbol.for("IGameCardController"),
        IDifferenceController: Symbol.for("IDifferenceController"),
        ISceneController: Symbol.for("ISceneController"),
        IScoreController: Symbol.for("IScoreController"),

        IImagePairService: Symbol.for("IImagePairService"),
        IDifferenceService: Symbol.for("IDifferenceService"),
        IGameCardService: Symbol.for("IGameCardService"),
        IUserService: Symbol.for("IUserService"),
        ISceneService: Symbol.for("ISceneService"),
        IScoreService: Symbol.for("IScoreService"),
        IScenePositionService: Symbol.for("IScenePositionService"),
};
