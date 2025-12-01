# Exec-Connect Setup Guide

## Quick Start

### Backend Setup

1. **Create virtual environment:**

   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Create `.env` file:**

   ```bash
   cat > .env << EOF
   DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/exec_connect
   OPENAI_API_KEY=your_key_here
   LLM_MODEL=gpt-5.1
   RAG_ENABLED=true
   RAG_TOP_K=4
   EOF
   ```

4. **Setup database:**

   ```bash
   # Create database
   createdb exec_connect

   # Initialize Alembic (run once)
   alembic init alembic  # Only if not already initialized

   # Create initial migration
   alembic revision --autogenerate -m "Initial unified schema"

   # Run migrations
   alembic upgrade head
   ```

5. **Run backend:**

   ```bash
   uvicorn app.main:app --reload
   ```

   Backend will be available at: http://localhost:8000
   API docs: http://localhost:8000/docs

### Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Create `.env.local`:**

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Run frontend:**

   ```bash
   npm run dev
   ```

   Frontend will be available at: http://localhost:3000

## Copying Components

The frontend pages are placeholder stubs. To complete the frontend:

1. **Copy components from source projects:**

   ```bash
   # CFO components
   cp -r /home/alim/Desktop/ai-cfo/frontend/src/components/cfo frontend/src/components/
   cp -r /home/alim/Desktop/ai-cfo/frontend/src/app/cfo/* frontend/src/app/cfo/

   # CMO components
   cp -r /home/alim/Desktop/ai-cmo/frontend/src/components/cmo frontend/src/components/
   cp -r /home/alim/Desktop/ai-cmo/frontend/src/app/cmo/* frontend/src/app/cmo/

   # COO components
   cp -r /home/alim/Desktop/ai-coo/frontend/src/components/coo frontend/src/components/
   cp -r /home/alim/Desktop/ai-coo/frontend/src/app/coo/* frontend/src/app/coo/

   # CTO components
   cp -r /home/alim/Desktop/ai-cto/frontend/src/components/cto frontend/src/components/
   cp -r /home/alim/Desktop/ai-cto/frontend/src/app/cto/* frontend/src/app/cto/
   ```

2. **Copy shared UI components:**

   ```bash
   cp -r /home/alim/Desktop/ai-cfo/frontend/src/components/ui frontend/src/components/
   cp -r /home/alim/Desktop/ai-cfo/frontend/src/components/layout frontend/src/components/
   ```

3. **Update imports in copied files:**
   - Update API imports to use `@/lib/api` instead of project-specific paths
   - Update type imports if needed

## Database Models

All models are unified in `backend/app/db/models.py`:

- `User` - Shared user model
- `CFOAnalysis`, `CFOAnalysis`, `COOAnalysis`, `CTOAnalysis` - Agent-specific analyses
- `FinanceDocument`, `MarketingDocument`, `OpsDocument`, `TechDocument` - RAG documents
- `CFOChatMessage`, `COOChatMessage`, `CTOChatMessage` - Agent-specific chat messages

## Notes

- All agents share the same database instance
- Each agent has its own namespace in the API (`/api/cfo`, `/api/cmo`, etc.)
- RAG functionality is unified but uses separate document tables
- Authentication is stubbed out - implement as needed

## Troubleshooting

1. **Database connection errors:** Ensure PostgreSQL is running and DATABASE_URL is correct
2. **Import errors:** Check that all schema imports use the new unified paths
3. **RAG not working:** Ensure pgvector extension is installed in PostgreSQL
