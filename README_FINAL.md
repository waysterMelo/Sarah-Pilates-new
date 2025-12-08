# Sarah Pilates System - Final Deliverable

## 1. Visão Geral
Este sistema foi unificado para conectar o Frontend (React/Vite) ao Backend (Java/Spring Boot/MySQL), cobrindo todos os fluxos de cadastro, agendamento e avaliação.

## 2. Entidades & Funcionalidades
| Entidade | Funcionalidades Implementadas | Observação |
| :--- | :--- | :--- |
| **Alunos** | CRUD Completo, Upload de Documentos, Anamnese | Integrado |
| **Instrutores** | CRUD Completo, Especialidades | Integrado |
| **Agendamentos** | Calendário, Criação/Edição, Conflitos | Integrado |
| **Avaliação Física** | Ficha Completa (FMS, Medidas, Fotos), Histórico | Backend ajustado para JSON complexo |
| **Evolução** | Registro Diário, Controle de Sessões | DTOs alinhados |
| **Financeiro** | **Desativado/Oculto** | Conforme solicitado (Stubbed) |

## 3. Arquitetura Técnica
*   **Frontend**: React + Vite + TailwindCSS.
    *   *Ajuste*: Gráficos financeiros removidos.
    *   *API*: `src/services/api.ts` aponta para `VITE_API_BASE_URL`.
*   **Backend**: Java 21 + Spring Boot 3.3.
    *   *DB*: MySQL 8.0 (via Docker).
    *   *Migrations*: Flyway (V1 a V10).
    *   *Docs*: Swagger UI em `/swagger-ui.html`.
*   **Infra**: Docker Compose.

## 4. Como Rodar

### Opção A: Docker (Recomendada)
Na raiz do projeto:
```bash
docker-compose up --build
```
*   Frontend: `http://localhost:5173`
*   Backend: `http://localhost:8080`
*   Swagger: `http://localhost:8080/swagger-ui.html`

### Opção B: Local (Desenvolvimento)
1.  Suba o banco: `docker-compose up mysql`
2.  Backend:
    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```
3.  Frontend:
    ```bash
    npm install
    npm run dev
    ```

## 5. Dados de Exemplo (Seeds)
O sistema inicia com dados pré-carregados (Migration V10):
*   **Admin**: `admin@sarahpilates.com` / (senha no DB, padrão bcrypt)
*   **Instrutor**: `instrutor@sarahpilates.com`
*   **Alunos**: Ana Souza, Carlos Pereira.

## 6. Decisões de Design
*   **Anamnese**: Dividida em "Histórico de Saúde" (Aluno) e "Contexto Clínico" (Avaliação).
*   **Arquivos**: Salvos localmente em `uploads_alunos` (volume persistente Docker).
*   **Financeiro**: Mantido no banco, mas oculto na interface.
