import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInOutComponent } from './login-in-out.component';

describe('LoginInOutComponent', () => {
  let component: LoginInOutComponent;
  let fixture: ComponentFixture<LoginInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginInOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
