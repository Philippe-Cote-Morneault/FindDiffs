import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-game-view",
    templateUrl: "./game-view.component.html",
    styleUrls: ["./game-view.component.css"],
})
export class GameViewComponent implements OnInit {
    // public imagePair: ICommonImagePair;
    private id: string;
    private differenceCounterUser: number;
    private differenceCounterOpponent: number;
    private isSolo: boolean;

    public constructor(
        private route: ActivatedRoute,
        ) {
        this.isSolo = true;
        this.differenceCounterOpponent = 0;
        this.differenceCounterUser = 0;
    }

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params["id"];
        });

        //this.getImagePairById();
    }
}
