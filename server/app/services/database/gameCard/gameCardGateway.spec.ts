import { expect } from "chai";
import { gameCard } from "../schemas/gameCardSchema";
import { DatabaseConnectionHandler } from "../databaseConnectionHandler";

describe("testing123213123", () => {
    it("Should hello", () => {
        new DatabaseConnectionHandler(() => {
            let card = new gameCard({
                guid: "123213fssf",
                pov: "Simple",
                title: "this is the title",
                images: {
                    id: "12fdsfds",
                    url_difference: "urlDif",
                    url_modified: "urlMod",
                    url_original: "urlOg",
                    name: "name",
                    creation_date: new Date(),
                    differences_count: 7,
                },
                bestTimesSolo: [1, 2, 3],
                bestTimesOnline: [4, 5, 6],
            });
            card.save((err) => {
                if (err) {
                    console.error("error");
                    console.log(err);
                }
            });
        });
        expect("blala").to.equal("hello");
    });
});