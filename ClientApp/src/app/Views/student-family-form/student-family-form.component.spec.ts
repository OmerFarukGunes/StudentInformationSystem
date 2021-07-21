import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFamilyFormComponent } from './student-family-form.component';

describe('StudentFamilyFormComponent', () => {
  let component: StudentFamilyFormComponent;
  let fixture: ComponentFixture<StudentFamilyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFamilyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFamilyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
