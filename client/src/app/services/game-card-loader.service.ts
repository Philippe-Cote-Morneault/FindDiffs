import {
    ComponentFactory,
    ComponentFactoryResolver,
    Inject,
    Injectable,
    ViewContainerRef
  } from "@angular/core";
import { ICommonGameCard } from "../../../../common/model/gameCard";
import { GamesCardViewComponent } from "../games-card-view/games-card-view.component";

@Injectable()
  export class GameCardLoaderService {
      private factoryResolver: ComponentFactoryResolver;
      private rootViewContainer: ViewContainerRef;

      public constructor(@Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver) {
        this.factoryResolver = factoryResolver;
        }

      public setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.rootViewContainer = viewContainerRef;
        }

      public addDynamicComponent(gameCard: ICommonGameCard): void {
        const factory: ComponentFactory<GamesCardViewComponent> = this.factoryResolver
                          .resolveComponentFactory(GamesCardViewComponent);
    
        const component: GamesCardViewComponent = this.rootViewContainer.createComponent(factory).instance;
        component.gameCard = gameCard;
    }
  }
