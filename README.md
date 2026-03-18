# GreenSense 🌿
**AI-Based Smart Plant Placement & Recommendation System**

Built with **Java Spring Boot** (backend) + **React** (frontend).

## Project Structure
| Folder | Description |
|--------|-------------|
| `greensense_java/` | Java Spring Boot backend — all OOP logic |
| `greensense_clean/` | React frontend — UI only |

## How to Run

### 1. Start the Java Backend (Terminal 1)
```bash
cd greensense_java
mvn spring-boot:run
```
Backend runs at `http://localhost:8080`

### 2. Start the React Frontend (Terminal 2)
```bash
cd greensense_clean
npm install       # first time only
npm run dev
```
Frontend runs at `http://localhost:5173`

## Tech Stack
- **Backend:** Java 17, Spring Boot 3.2, Maven
- **Frontend:** React 18, Vite, JavaScript
- **API:** REST (JSON)

## OOP Concepts Demonstrated
- Encapsulation — all model fields private with getters
- Abstraction — `EngineStage<I,O>` interface
- Polymorphism — 3 engines via same interface
- Composition — Has-A relationships throughout
- Comparable — `ScoredPlant` for natural ordering

## Pipeline
`User Input → FilterEngine → ScoringEngine → ExplanationEngine → Results`
```

---

### Step 4 — Create a `.gitignore`

Create `GreenSense/.gitignore`:
```
# Java
greensense_java/target/
*.class
*.jar

# Node
greensense_clean/node_modules/
greensense_clean/dist/

# OS
.DS_Store
Thumbs.db

# IDE
.idea/
*.iml
.vscode/