import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortBooksComponent } from './sort-books.component';

describe('SortBooksComponent', () => {
  let component: SortBooksComponent;
  let fixture: ComponentFixture<SortBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
