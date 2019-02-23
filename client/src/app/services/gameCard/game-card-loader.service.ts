import {
    ComponentFactory,
    ComponentFactoryResolver,
    Inject,
    Injectable,
    ViewContainerRef
  } from "@angular/core";
import { ICommonGameCard, POVType } from "../../../../../common/model/gameCard";
import { GamesCardViewComponent } from "../../games-card-view/games-card-view.component";

@Injectable()
export class GameCardLoaderService {
    private factoryResolver: ComponentFactoryResolver;
    private simplePOVContainer: ViewContainerRef;
    private freePOVContainer: ViewContainerRef;

    public constructor(@Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver) {
        this.factoryResolver = factoryResolver;
    }

    public setContainer(viewContainerRef: ViewContainerRef, pov: POVType): void {
        pov === POVType.Simple ?
            this.simplePOVContainer = viewContainerRef :
            this.freePOVContainer = viewContainerRef;
    }

    public addDynamicComponent(gameCard: ICommonGameCard, isInAdminView: boolean): void {
        const factory: ComponentFactory<GamesCardViewComponent> = this.factoryResolver
            .resolveComponentFactory(GamesCardViewComponent);

        const component: GamesCardViewComponent = +POVType[gameCard.pov] === POVType.Simple ?
            this.simplePOVContainer.createComponent(factory).instance :
            this.freePOVContainer.createComponent(factory).instance;

        component.gameCard = gameCard;
        component.isInAdminView = isInAdminView;
    }
  }
