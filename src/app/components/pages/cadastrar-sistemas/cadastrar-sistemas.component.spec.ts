import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarSistemasComponent } from './cadastrar-sistemas.component';

describe('CadastrarSistemasComponent', () => {
  let component: CadastrarSistemasComponent;
  let fixture: ComponentFixture<CadastrarSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarSistemasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
