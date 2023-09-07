import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPessoaComponent } from './pessoas.component';

describe('PessoasComponent', () => {
  let component: CadastroPessoaComponent;
  let fixture: ComponentFixture<CadastroPessoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroPessoaComponent]
    });
    fixture = TestBed.createComponent(CadastroPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
