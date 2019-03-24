import { TestBed } from "@angular/core/testing";

import { ObjectHandler } from "./objects-handler.service";

describe("ObjectHandler", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ObjectHandler = TestBed.get(ObjectHandler);
    expect(service).toBeTruthy();
  });
});
