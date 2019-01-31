import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SoloGameCreatorComponent } from "./solo-game-creator.component";

describe("SoloGameCreatorComponent", () => {
  let component: SoloGameCreatorComponent;
  let fixture: ComponentFixture<SoloGameCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloGameCreatorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloGameCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
