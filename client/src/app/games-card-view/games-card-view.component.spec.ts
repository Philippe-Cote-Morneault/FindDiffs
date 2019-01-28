import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GamesCardViewComponent } from "./games-card-view.component";

describe("GamesCardViewComponent", () => {
  let component: GamesCardViewComponent;
  let fixture: ComponentFixture<GamesCardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesCardViewComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
