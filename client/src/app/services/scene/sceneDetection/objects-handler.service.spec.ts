import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ObjectHandler } from "./objects-handler.service";

describe("ObjectHandler", () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
  });

  it("should be created", () => {
    const service: ObjectHandler = TestBed.get(ObjectHandler);
    expect(service).toBeTruthy();
  });
});
