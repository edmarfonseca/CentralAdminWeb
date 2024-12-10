import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSistemasComponent } from './editar-sistemas.component';

describe('EditarSistemasComponent', () => {
  let component: EditarSistemasComponent;
  let fixture: ComponentFixture<EditarSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSistemasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
