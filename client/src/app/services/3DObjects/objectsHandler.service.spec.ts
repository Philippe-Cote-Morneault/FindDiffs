import { TestBed } from "@angular/core/testing";

import { ObjectHandler } from "./objectsHandler.service";

describe("RestoreObjectsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ObjectHandler = TestBed.get(ObjectHandler);
    expect(service).toBeTruthy();
  });
});
