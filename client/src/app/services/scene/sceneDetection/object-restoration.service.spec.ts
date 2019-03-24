import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ObjectRestorationService } from "./object-restoration.service";

describe("ObjectRestorationService", () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
  });

  it("should be created", () => {
    const service: ObjectRestorationService = TestBed.get(ObjectRestorationService);
    expect(service).toBeTruthy();
  });
});
