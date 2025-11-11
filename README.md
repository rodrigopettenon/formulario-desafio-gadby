**Formulário Multi-Etapas - Desafio Técnico Angular - Gadby Tecnologia**

Um formulário em Angular desenvolvido como resposta a um desafio técnico, implementando um fluxo completo de cadastro com validações e navegação entre etapas.

---

## **O que foi construído**

Criei um sistema de formulário com 3 etapas sequenciais onde o usuário preenche suas informações de forma organizada e validada.

### **Fluxo do formulário**

**Etapa 1 - Dados Pessoais**
- Nome completo (obrigatório, mínimo 5 caracteres)
- E-mail (obrigatório, formato válido, máximo 80 caracteres)  
- Telefone (obrigatório, aceita vários formatos brasileiros)

**Etapa 2 - Informações Profissionais**
- Cargo pretendido (obrigatório, 3-50 caracteres)
- Pretensão salarial (obrigatório, valor positivo)
- Experiência na área (obrigatório, Sim/Não)

**Etapa 3 - Endereço**
- CEP (obrigatório, formato 00000-000)
- Logradouro (obrigatório, 5-100 caracteres)
- Cidade (obrigatório, 2-50 caracteres)
- UF (obrigatório, exatamente 2 letras)

---

## **Instalação e Execução**

# Clonar o repositório
git clone [url-do-repositorio]

# Entrar na pasta do projeto
cd formulario-desafio-gadby

# Instalar dependências
npm install

# Executar em modo desenvolvimento
ng serve

# Acessar no navegador
http://localhost:4200

---