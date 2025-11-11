import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  etapaAtual: number = 1;
  formularioEnviado: boolean = false;

  formulario!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.inicializarFormulario();
  }
  

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nomeCompleto: ['', [
      Validators.required,
      Validators.minLength(5)
    ]],
      email: ['', [
      Validators.required, 
      Validators.maxLength(80),
      Validators.pattern(/^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})(?<!\.con|\.invalid|\.example|\.test)$/)
    ]],
    telefone: ['', [
      Validators.required,
      Validators.pattern(/^(?:(?:\()?\d{2}(?:\))?\s?)?\d{4,5}-?\d{4}$/)
    ]],

      cargoPretendido: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[A-Za-zÀ-ÿ\s\-\.\/&]+$/)
      ]],
      pretensaoSalarial: ['', [Validators.required, Validators.min(1)]],
      experienciaArea: ['', Validators.required],

      cep: ['', [
        Validators.required, 
        Validators.pattern(/^\d{5}-?\d{3}$/)
      ]],
      logradouro: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      cidade: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
    });
  }

  aplicarMascaraTelefone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length === 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length === 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/(\d{4,5})(\d{4})/, '$1-$2');
    }
    
    this.formulario.get('telefone')?.setValue(value, { emitEvent: false });
  }

  aplicarMascaraCEP(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 5) {
      value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }
    
    this.formulario.get('cep')?.setValue(value, { emitEvent: false });
  }

  avancarEtapa(): void {
    if (this.validarEtapaAtual()) {
      this.desabilitarEtapa(this.etapaAtual);
      this.etapaAtual++;
    }
  }

  voltarEtapa(): void {
    if (this.etapaAtual > 1) {
      this.etapaAtual--;
      this.habilitarEtapa(this.etapaAtual);
    }
  }

  enviarFormulario(): void {
    if (this.validarEtapaAtual()) {
      this.formularioEnviado = true;
    }
  }

  reiniciarFormulario(): void {
    this.formulario.reset();
    this.formulario.enable();
    this.etapaAtual = 1;
    this.formularioEnviado = false;
  }

  confirmarEnvio(): void {
    alert('Formulário enviado com sucesso!');
    this.reiniciarFormulario();
  }

  editarDados(): void {
    this.formularioEnviado = false;
  }

  validarEtapaAtual(): boolean {
    const controles = this.obterControlesEtapaAtual();
    
    controles.forEach(controle => {
      this.formulario.get(controle)?.markAsTouched();
    });

    return controles.every(controle => 
      this.formulario.get(controle)?.valid
    );
  }

  obterControlesEtapaAtual(): string[] {
    switch (this.etapaAtual) {
      case 1:
        return ['nomeCompleto', 'email', 'telefone'];
      case 2:
        return ['cargoPretendido', 'pretensaoSalarial', 'experienciaArea'];
      case 3:
        return ['cep', 'logradouro', 'cidade', 'uf'];
      default:
        return [];
    }
  }

  desabilitarEtapa(etapa: number): void {
    const controles = this.obterControlesPorEtapa(etapa);
    controles.forEach(controle => {
      this.formulario.get(controle)?.disable({ onlySelf: true });
    });
  }

  habilitarEtapa(etapa: number): void {
    const controles = this.obterControlesPorEtapa(etapa);
    controles.forEach(controle => {
      this.formulario.get(controle)?.enable({ onlySelf: true });
    });
  }

  obterControlesPorEtapa(etapa: number): string[] {
    switch (etapa) {
      case 1:
        return ['nomeCompleto', 'email', 'telefone'];
      case 2:
        return ['cargoPretendido', 'pretensaoSalarial', 'experienciaArea'];
      case 3:
        return ['cep', 'logradouro', 'cidade', 'uf'];
      default:
        return [];
    }
  }

  campoInvalido(campo: string): boolean {
    const controle = this.formulario.get(campo);
    return !!controle && controle.invalid && controle.touched;
  }
}