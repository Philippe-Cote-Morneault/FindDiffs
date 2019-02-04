import { HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { expect } from "chai";
import { GamesCardService } from "./games-card.service";
import { POVType, ICommonGameCard } from "../../../../common/model/gameCard";

describe("GamesCardService", () => {
    let service: GamesCardService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GamesCardService],
        });

        // inject the service
        service = TestBed.get(GamesCardService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it("Posting an imagePair should return a new GameCard", () => {
        const mockGameCard: ICommonGameCard = {
            "id": "432423423423ef",
            "pov": POVType.Simple,
            "title": "The name of the gamecard",
            "image_pair":
            {
            "id": "438943af323ed43",
            "url_difference": "http://localhost:3000/image-pair/438943af323ed43/difference",
            "url_modified": "http://localhost:3000/image-pair/438943af323ed43/modified",
            "url_original": "http://localhost:3000/image-pair/438943af323ed43/original",
            "name": "The name of the pair",
            "creation_date": new Date(),
            "differences_count": 7,
            },
            "best_time_solo": [1254512,1282445,544512],
            "best_time_online": [1254512,1282445,544512],
        };
        service.addGameCard("game1", "12345678", POVType.Simple).subscribe((gameCard: ICommonGameCard) => {
            expect(gameCard).to.equal(mockGameCard);
        });

        const testRequest: TestRequest = httpMock.expectOne("http://localhost:3000/gamecard/");
        expect(testRequest.request.method).to.equal("POST");

        testRequest.flush(mockGameCard);

        httpMock.verify();
    });
});
