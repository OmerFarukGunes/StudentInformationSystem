import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParentsComponent } from './list-parents.component';

describe('ListParentsComponent', () => {
  let component: ListParentsComponent;
  let fixture: ComponentFixture<ListParentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
