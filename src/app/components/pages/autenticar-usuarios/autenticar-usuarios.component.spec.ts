import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticarUsuariosComponent } from './autenticar-usuarios.component';

describe('AutenticarUsuariosComponent', () => {
  let component: AutenticarUsuariosComponent;
  let fixture: ComponentFixture<AutenticarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutenticarUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutenticarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
