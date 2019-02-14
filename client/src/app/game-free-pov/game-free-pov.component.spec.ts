import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFreePovComponent } from './game-free-pov.component';

describe('GameFreePovComponent', () => {
  let component: GameFreePovComponent;
  let fixture: ComponentFixture<GameFreePovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFreePovComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFreePovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
