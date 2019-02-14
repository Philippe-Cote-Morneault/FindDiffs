import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSimplePovComponent } from './game-simple-pov.component';

describe('GameSimplePovComponent', () => {
  let component: GameSimplePovComponent;
  let fixture: ComponentFixture<GameSimplePovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSimplePovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSimplePovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
