import {
    ComponentFactory,
    ComponentFactoryResolver,
    Inject,
    Injectable,
    ViewContainerRef
  } from "@angular/core";
import { ICommonGameCard, POVType } from "../../../../common/model/gameCard";
import { GamesCardViewComponent } from "../games-card-view/games-card-view.component";

@Injectable()
export class GameCardLoaderService {
    private factoryResolver: ComponentFactoryResolver;
    private simplePOVContainer: ViewContainerRef;
    private freePOVContainer: ViewContainerRef;

    public constructor(@Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver) {
        this.factoryResolver = factoryResolver;
    }

    public setContainer(viewContainerRef: ViewContainerRef, pov: POVType): void {
        console.log("set container with " + pov.toString());
        pov === POVType.Simple ?
            this.simplePOVContainer = viewContainerRef :
            this.freePOVContainer = viewContainerRef;
        console.log(this.simplePOVContainer);
        console.log(this.freePOVContainer);
        console.log( pov === POVType.Simple);
    }

    public addDynamicComponent(gameCard: ICommonGameCard): void {
        const factory: ComponentFactory<GamesCardViewComponent> = this.factoryResolver
            .resolveComponentFactory(GamesCardViewComponent);

        const component: GamesCardViewComponent = gameCard.pov === POVType.Simple ?
            this.simplePOVContainer.createComponent(factory).instance :
            this.freePOVContainer.createComponent(factory).instance;

        component.gameCard = gameCard;
    }
  }
