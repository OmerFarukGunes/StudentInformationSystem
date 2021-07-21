import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsOfStudentsComponent } from './statistics-of-students.component';

describe('StatisticsOfStudentsComponent', () => {
  let component: StatisticsOfStudentsComponent;
  let fixture: ComponentFixture<StatisticsOfStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsOfStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsOfStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
