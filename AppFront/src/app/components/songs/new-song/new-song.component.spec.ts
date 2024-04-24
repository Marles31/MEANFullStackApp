import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSongComponent } from './new-song.component';

describe('NewSongComponent', () => {
  let component: NewSongComponent;
  let fixture: ComponentFixture<NewSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSongComponent]
    });
    fixture = TestBed.createComponent(NewSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});