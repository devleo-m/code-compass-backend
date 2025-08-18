# Code Compass Backend - Guia de Desenvolvimento

## 1. Contexto e Objetivo Geral

O **Code Compass Backend** é a API REST que fornece dados e funcionalidades para a plataforma educacional Code Compass. Este projeto substitui o sistema de LocalStorage do frontend por uma solução robusta, escalável e segura com autenticação real, persistência de dados e analytics avançados.

### Objetivos Principais:
- Fornecer API REST completa para o frontend
- Implementar autenticação e autorização real
- Gerenciar persistência de dados com PostgreSQL
- Criar sistema de cache inteligente com Redis
- Implementar analytics e métricas detalhadas
- Permitir escalabilidade horizontal
- Garantir segurança e performance
- **NOVO**: Sistema de backup e recuperação automática
- **NOVO**: Monitoramento e observabilidade completa

## 2. Arquitetura e Tecnologias

### Stack Principal:
- **Runtime**: Node.js 22.16 (LTS)
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **ORM**: Sequelize com PostgreSQL
- **Cache**: Redis
- **Autenticação**: JWT + bcrypt
- **Validação**: Zod
- **Linting/Formatting**: Biome
- **Testes**: Jest + Supertest
- **Documentação**: Swagger/OpenAPI 3.0
- **Monitoramento**: Winston + Morgan
- ✅ **Docker Compose** para desenvolvimento
- ✅ **PostgreSQL** como banco principal
- ✅ **Redis** para cache e sessões
- ✅ **Upload de arquivos** para PDFs de conteúdo
- ✅ **Swagger** para documentação
- ⏳ **Deploy** (decidir após API 100% pronta)
- ⏳ **Sistema de email** (implementação futura)

### Estrutura de Pastas (Clean Architecture + DDD):
1. siga o padrao DDD rigorosamente
2. codigo limpo sempre em primeiro lugar
3. arquitetura limpa
4. estabelecer sempre um padrao e seguir ela rigorosamente
5. nao permitir que o usuario crie algo sem respeitar essas regras

## 3. Detalhamento Completo das Funcionalidades

### 🔐 **MÓDULO 1: AUTENTICAÇÃO E USUÁRIOS**

#### **Branch**: `feature/auth-users`

#### **Tabelas do Banco:**
1. **users** - CRUD completo (create, read, update, soft delete)
2. **user_preferences** - CRUD completo 
3. **user_sessions** - Create, read, delete (sem update)

#### **Endpoints Detalhados:**

##### **POST /api/auth/register**
```typescript
// Input
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "MinhaSenh@123",
  "confirmPassword": "MinhaSenh@123"
}

// Output (Success)
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "user": {
      "id": "uuid-here",
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "userType": "student",
      "isActive": true,
      "emailVerified": false,
      "createdAt": "2024-12-20T10:30:00Z"
    },
    "tokens": {
      "accessToken": "jwt-token-here",
      "refreshToken": "refresh-token-here",
      "expiresIn": "24h"
    }
  }
}

// Output (Error)
{
  "success": false,
  "message": "Email já está em uso",
  "errors": [
    {
      "field": "email",
      "message": "Este email já está cadastrado"
    }
  ]
}
```

##### **POST /api/auth/login**
```typescript
// Input
{
  "email": "joao@exemplo.com",
  "password": "MinhaSenh@123"
}

// Output (Success)
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": "uuid-here",
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "userType": "student",
      "lastLogin": "2024-12-20T10:30:00Z"
    },
    "tokens": {
      "accessToken": "jwt-token-here",
      "refreshToken": "refresh-token-here",
      "expiresIn": "24h"
    }
  }
}
```

##### **POST /api/auth/logout**
```typescript
// Input (Headers)
Authorization: Bearer jwt-token-here

// Output
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

##### **POST /api/auth/refresh-token**
```typescript
// Input
{
  "refreshToken": "refresh-token-here"
}

// Output
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-token",
    "expiresIn": "24h"
  }
}
```

##### **GET /api/users/profile**
```typescript
// Input (Headers)
Authorization: Bearer jwt-token-here

// Output
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "name": "João Silva",
      "email": "joao@exemplo.com",
      "userType": "student",
      "profilePictureUrl": null,
      "isActive": true,
      "emailVerified": false,
      "lastLogin": "2024-12-20T10:30:00Z",
      "createdAt": "2024-12-19T08:00:00Z"
    },
    "preferences": {
      "theme": "light",
      "language": "pt-BR",
      "notificationsEnabled": true,
      "timezone": "America/Sao_Paulo"
    }
  }
}
```

##### **PUT /api/users/profile**
```typescript
// Input
{
  "name": "João Santos Silva",
  "profilePictureUrl": "https://example.com/photo.jpg"
}

// Output
{
  "success": true,
  "message": "Perfil atualizado com sucesso",
  "data": {
    "user": {
      "id": "uuid-here",
      "name": "João Santos Silva",
      "email": "joao@exemplo.com",
      "profilePictureUrl": "https://example.com/photo.jpg",
      "updatedAt": "2024-12-20T10:30:00Z"
    }
  }
}
```

##### **PUT /api/users/preferences**
```typescript
// Input
{
  "theme": "dark",
  "notificationsEnabled": false,
  "timezone": "America/Sao_Paulo"
}

// Output
{
  "success": true,
  "message": "Preferências atualizadas com sucesso",
  "data": {
    "preferences": {
      "theme": "dark",
      "language": "pt-BR",
      "notificationsEnabled": false,
      "emailNotifications": true,
      "timezone": "America/Sao_Paulo"
    }
  }
}
```

---

### 📚 **MÓDULO 2: CONTEÚDO EDUCACIONAL**

#### **Branch**: `feature/content-management`

#### **Tabelas do Banco:**
1. **learning_paths** - CRUD completo (admin), Read (student)
2. **technologies** - CRUD completo (admin), Read (student)
3. **modules** - CRUD completo (admin), Read (student)
4. **lessons** - CRUD completo (admin), Read (student)
5. **lesson_tags** - Create, delete (sem update)

#### **Endpoints Detalhados:**

##### **GET /api/learning-paths**
```typescript
// Input (Query params)
?page=1&limit=10&difficulty=beginner&search=javascript

// Output
{
  "success": true,
  "data": {
    "learningPaths": [
      {
        "id": "uuid-here",
        "slug": "javascript",
        "name": "JavaScript",
        "description": "Aprenda JavaScript do básico ao avançado",
        "icon": "🟨",
        "color": "yellow",
        "difficulty": "beginner",
        "estimatedHours": 80,
        "isActive": true,
        "technologies": ["ES6+", "DOM", "Async/Await"],
        "modulesCount": 12,
        "lessonsCount": 48,
        "createdAt": "2024-12-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 3,
      "pages": 1
    }
  }
}
```

##### **GET /api/learning-paths/:slug**
```typescript
// Input (URL)
/api/v1/learning-paths/javascript

// Output
{
  "success": true,
  "data": {
    "learningPath": {
      "id": "uuid-here",
      "slug": "javascript",
      "name": "JavaScript",
      "description": "Aprenda JavaScript do básico ao avançado",
      "icon": "🟨",
      "color": "yellow",
      "difficulty": "beginner",
      "estimatedHours": 80,
      "technologies": ["ES6+", "DOM", "Async/Await"],
      "modules": [
        {
          "id": "module-uuid",
          "title": "Fundamentos do JavaScript",
          "description": "Conceitos básicos e sintaxe",
          "displayOrder": 1,
          "lessonsCount": 4,
          "estimatedHours": 6
        }
      ]
    }
  }
}
```

##### **POST /api/v1/admin/learning-paths** (ADMIN ONLY)
```typescript
// Input
{
  "slug": "typescript",
  "name": "TypeScript",
  "description": "JavaScript com tipagem estática",
  "icon": "🔷",
  "color": "blue",
  "difficulty": "intermediate",
  "estimatedHours": 40,
  "technologies": ["Types", "Interfaces", "Generics"]
}

// Output
{
  "success": true,
  "message": "Trilha de aprendizado criada com sucesso",
  "data": {
    "learningPath": {
      "id": "new-uuid-here",
      "slug": "typescript",
      "name": "TypeScript",
      "description": "JavaScript com tipagem estática",
      "icon": "🔷",
      "color": "blue",
      "difficulty": "intermediate",
      "estimatedHours": 40,
      "isActive": true,
      "createdAt": "2024-12-20T10:30:00Z"
    }
  }
}
```

##### **GET /api/v1/learning-paths/:pathSlug/modules**
```typescript
// Output
{
  "success": true,
  "data": {
    "modules": [
      {
        "id": "module-uuid",
        "title": "Fundamentos do JavaScript",
        "description": "Conceitos básicos e sintaxe",
        "displayOrder": 1,
        "isActive": true,
        "lessons": [
          {
            "id": "lesson-uuid",
            "title": "Introdução ao JavaScript",
            "description": "O que é JavaScript e por que aprender",
            "displayOrder": 1,
            "estimatedMinutes": 15,
            "difficulty": "easy",
            "tags": ["introdução", "básico"]
          }
        ]
      }
    ]
  }
}
```

##### **GET /api/v1/lessons/:id**
```typescript
// Output
{
  "success": true,
  "data": {
    "lesson": {
      "id": "lesson-uuid",
      "title": "Introdução ao JavaScript",
      "description": "O que é JavaScript e por que aprender",
      "content": "# Introdução ao JavaScript\n\nJavaScript é uma linguagem...",
      "displayOrder": 1,
      "estimatedMinutes": 15,
      "difficulty": "easy",
      "tags": ["introdução", "básico"],
      "module": {
        "id": "module-uuid",
        "title": "Fundamentos do JavaScript",
        "learningPath": {
          "id": "path-uuid",
          "name": "JavaScript",
          "slug": "javascript"
        }
      }
    }
  }
}
```

---

### ❓ **MÓDULO 3: SISTEMA DE QUIZZES**

#### **Branch**: `feature/quizzes-system`

#### **Tabelas do Banco:**
1. **quizzes** - CRUD completo (admin), Read (student)
2. **quiz_questions** - CRUD completo (admin), Read (student)
3. **quiz_question_options** - CRUD completo (admin), Read (student)
4. **quiz_attempts** - Create, read (sem update/delete)
5. **quiz_attempt_answers** - Create, read (sem update/delete)

#### **Endpoints Detalhados:**

##### **GET /api/v1/quizzes**
```typescript
// Input (Query params)
?technology=javascript&difficulty=beginner&page=1&limit=10

// Output
{
  "success": true,
  "data": {
    "quizzes": [
      {
        "id": "quiz-uuid",
        "title": "JavaScript Básico - Quiz Completo",
        "description": "Teste seus conhecimentos fundamentais",
        "technology": "javascript",
        "difficulty": "beginner",
        "timeLimitMinutes": 20,
        "passingScorePercentage": 75,
        "totalQuestions": 15,
        "isActive": true,
        "createdAt": "2024-12-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "pages": 1
    }
  }
}
```

##### **GET /api/v1/quizzes/:id**
```typescript
// Output
{
  "success": true,
  "data": {
    "quiz": {
      "id": "quiz-uuid",
      "title": "JavaScript Básico - Quiz Completo",
      "description": "Teste seus conhecimentos fundamentais",
      "technology": "javascript",
      "difficulty": "beginner",
      "timeLimitMinutes": 20,
      "passingScorePercentage": 75,
      "questions": [
        {
          "id": "question-uuid",
          "questionText": "Qual é a diferença entre let e const?",
          "questionType": "multiple_choice",
          "difficulty": "easy",
          "points": 10,
          "displayOrder": 1,
          "options": [
            {
              "id": "option-uuid-1",
              "optionText": "Não há diferença, são sinônimos",
              "displayOrder": 1
            },
            {
              "id": "option-uuid-2",
              "optionText": "let pode ser reatribuído, const não",
              "displayOrder": 2
            }
          ]
        }
      ]
    }
  }
}
```

##### **POST /api/v1/quizzes/:id/attempts**
```typescript
// Input
{
  "answers": [
    {
      "questionId": "question-uuid-1",
      "selectedOptionIds": ["option-uuid-2"],
      "timeSpentSeconds": 15
    },
    {
      "questionId": "question-uuid-2",
      "selectedOptionIds": ["option-uuid-4"],
      "timeSpentSeconds": 22
    }
  ],
  "totalTimeSpentSeconds": 1200
}

// Output
{
  "success": true,
  "message": "Quiz finalizado com sucesso",
  "data": {
    "attempt": {
      "id": "attempt-uuid",
      "score": 85,
      "totalPoints": 100,
      "percentage": 85.0,
      "passed": true,
      "timeSpentSeconds": 1200,
      "completedAt": "2024-12-20T10:30:00Z",
      "answers": [
        {
          "questionId": "question-uuid-1",
          "selectedOptionIds": ["option-uuid-2"],
          "isCorrect": true,
          "pointsEarned": 10,
          "timeSpentSeconds": 15
        }
      ]
    },
    "result": {
      "correctAnswers": 12,
      "totalQuestions": 15,
      "feedback": "Parabéns! Você teve um excelente desempenho!",
      "suggestions": [
        "Revise o conteúdo sobre closures",
        "Pratique mais exercícios de arrays"
      ]
    }
  }
}
```

##### **GET /api/v1/users/quiz-attempts**
```typescript
// Input (Query params)
?quizId=quiz-uuid&page=1&limit=10

// Output
{
  "success": true,
  "data": {
    "attempts": [
      {
        "id": "attempt-uuid",
        "quiz": {
          "id": "quiz-uuid",
          "title": "JavaScript Básico - Quiz Completo",
          "technology": "javascript"
        },
        "score": 85,
        "percentage": 85.0,
        "passed": true,
        "timeSpentSeconds": 1200,
        "completedAt": "2024-12-20T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 3,
      "pages": 1
    }
  }
}
```

---

### 📈 **MÓDULO 4: PROGRESSO E GAMIFICAÇÃO**

#### **Branch**: `feature/progress-gamification`

#### **Tabelas do Banco:**
1. **user_learning_paths** - Create, read, update (sem delete)
2. **user_lesson_progress** - Create, read, update (sem delete)
3. **badges** - CRUD completo (admin), Read (student)
4. **user_badges** - Create, read (sem update/delete)
5. **achievements** - CRUD completo (admin), Read (student)
6. **user_achievements** - Create, read (sem update/delete)

#### **Endpoints Detalhados:**

##### **POST /api/v1/progress/learning-paths/:pathId/start**
```typescript
// Output
{
  "success": true,
  "message": "Trilha de aprendizado iniciada",
  "data": {
    "userLearningPath": {
      "id": "user-path-uuid",
      "learningPathId": "path-uuid",
      "startedAt": "2024-12-20T10:30:00Z",
      "progress": {
        "completedModules": 0,
        "totalModules": 12,
        "completedLessons": 0,
        "totalLessons": 48,
        "progressPercentage": 0
      }
    }
  }
}
```

##### **PUT /api/v1/progress/lessons/:lessonId/complete**
```typescript
// Input
{
  "timeSpentMinutes": 18
}

// Output
{
  "success": true,
  "message": "Lição marcada como concluída",
  "data": {
    "lessonProgress": {
      "lessonId": "lesson-uuid",
      "isCompleted": true,
      "timeSpentMinutes": 18,
      "completedAt": "2024-12-20T10:30:00Z"
    },
    "moduleProgress": {
      "moduleId": "module-uuid",
      "completedLessons": 3,
      "totalLessons": 4,
      "progressPercentage": 75
    },
    "pathProgress": {
      "learningPathId": "path-uuid",
      "completedLessons": 15,
      "totalLessons": 48,
      "progressPercentage": 31.25
    },
    "badgesEarned": [
      {
        "id": "badge-uuid",
        "name": "Primeira Lição",
        "description": "Complete sua primeira lição",
        "icon": "🎓",
        "earnedAt": "2024-12-20T10:30:00Z"
      }
    ]
  }
}
```

##### **GET /api/v1/progress/overview**
```typescript
// Output
{
  "success": true,
  "data": {
    "overview": {
      "totalLearningPaths": 3,
      "startedPaths": 2,
      "completedPaths": 0,
      "totalLessonsCompleted": 15,
      "totalTimeSpentMinutes": 420,
      "currentStreak": 5,
      "longestStreak": 12,
      "badgesEarned": 4,
      "achievementsUnlocked": 2
    },
    "activePaths": [
      {
        "id": "path-uuid",
        "name": "JavaScript",
        "progressPercentage": 31.25,
        "completedLessons": 15,
        "totalLessons": 48,
        "lastAccessedAt": "2024-12-20T10:30:00Z"
      }
    ],
    "recentBadges": [
      {
        "id": "badge-uuid",
        "name": "Primeira Lição",
        "icon": "🎓",
        "earnedAt": "2024-12-20T10:30:00Z"
      }
    ]
  }
}
```

##### **GET /api/v1/progress/learning-paths/:pathId**
```typescript
// Output
{
  "success": true,
  "data": {
    "pathProgress": {
      "learningPath": {
        "id": "path-uuid",
        "name": "JavaScript",
        "slug": "javascript"
      },
      "startedAt": "2024-12-15T08:00:00Z",
      "progressPercentage": 31.25,
      "completedLessons": 15,
      "totalLessons": 48,
      "timeSpentMinutes": 420,
      "modules": [
        {
          "id": "module-uuid",
          "title": "Fundamentos do JavaScript",
          "progressPercentage": 100,
          "completedLessons": 4,
          "totalLessons": 4,
          "isCompleted": true,
          "completedAt": "2024-12-18T15:30:00Z"
        }
      ]
    }
  }
}
```

---

### 📝 **MÓDULO 5: SISTEMA DE ANOTAÇÕES**

#### **Branch**: `feature/notes-system`

#### **Tabelas do Banco:**
1. **user_notes** - CRUD completo
2. **note_tags** - Create, delete (sem update)

#### **Endpoints Detalhados:**

##### **POST /api/v1/notes**
```typescript
// Input
{
  "lessonId": "lesson-uuid",
  "content": "Arrays em JavaScript são muito úteis para...",
  "tags": ["arrays", "métodos", "importante"],
  "isPublic": false
}

// Output
{
  "success": true,
  "message": "Anotação criada com sucesso",
  "data": {
    "note": {
      "id": "note-uuid",
      "lessonId": "lesson-uuid",
      "content": "Arrays em JavaScript são muito úteis para...",
      "tags": ["arrays", "métodos", "importante"],
      "isPublic": false,
      "createdAt": "2024-12-20T10:30:00Z"
    }
  }
}
```

##### **GET /api/v1/notes**
```typescript
// Input (Query params)
?lessonId=lesson-uuid&search=arrays&tags=métodos&page=1&limit=10

// Output
{
  "success": true,
  "data": {
    "notes": [
      {
        "id": "note-uuid",
        "content": "Arrays em JavaScript são muito úteis para...",
        "tags": ["arrays", "métodos", "importante"],
        "isPublic": false,
        "lesson": {
          "id": "lesson-uuid",
          "title": "Métodos Avançados de Array",
          "module": {
            "title": "Arrays e Métodos"
          }
        },
        "createdAt": "2024-12-20T10:30:00Z",
        "updatedAt": "2024-12-20T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 12,
      "pages": 2
    }
  }
}
```

##### **PUT /api/v1/notes/:id**
```typescript
// Input
{
  "content": "Arrays em JavaScript são extremamente úteis para manipular listas de dados...",
  "tags": ["arrays", "métodos", "importante", "manipulação"]
}

// Output
{
  "success": true,
  "message": "Anotação atualizada com sucesso",
  "data": {
    "note": {
      "id": "note-uuid",
      "content": "Arrays em JavaScript são extremamente úteis para manipular listas de dados...",
      "tags": ["arrays", "métodos", "importante", "manipulação"],
      "updatedAt": "2024-12-20T11:00:00Z"
    }
  }
}
```

---

### 📁 **MÓDULO 6: UPLOAD DE ARQUIVOS**

#### **Branch**: `feature/file-upload`

#### **Endpoints Detalhados:**

##### **POST /api/v1/files/upload**
```typescript
// Input (Multipart form-data)
file: [arquivo.pdf]
type: "content" | "profile-picture"
lessonId?: "lesson-uuid" (opcional, para arquivos de conteúdo)

// Output
{
  "success": true,
  "message": "Arquivo enviado com sucesso",
  "data": {
    "file": {
      "id": "file-uuid",
      "filename": "introducao-javascript.pdf",
      "originalName": "Introdução ao JavaScript.pdf",
      "mimeType": "application/pdf",
      "size": 2048576,
      "url": "https://api.codecompass.com/files/content/file-uuid.pdf",
      "type": "content",
      "uploadedAt": "2024-12-20T10:30:00Z"
    }
  }
}
```

---

### 👥 **MÓDULO 7: ADMINISTRAÇÃO**

#### **Branch**: `feature/admin-management`

#### **Endpoints Detalhados:**

##### **GET /api/v1/admin/dashboard**
```typescript
// Output
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 1250,
      "activeUsers": 980,
      "totalLearningPaths": 5,
      "totalLessons": 156,
      "totalQuizzes": 45,
      "totalQuizAttempts": 5670
    },
    "userGrowth": [
      { "date": "2024-12-01", "newUsers": 45 },
      { "date": "2024-12-02", "newUsers": 52 }
    ],
    "popularPaths": [
      {
        "id": "path-uuid",
        "name": "JavaScript",
        "studentsCount": 856,
        "completionRate": 68.5
      }
    ],
    "recentActivity": [
      {
        "type": "user_registered",
        "userName": "João Silva",
        "timestamp": "2024-12-20T10:30:00Z"
      }
    ]
  }
}
```

##### **GET /api/v1/admin/users**
```typescript
// Input (Query params)
?page=1&limit=20&search=joão&userType=student&isActive=true

// Output
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user-uuid",
        "name": "João Silva",
        "email": "joao@exemplo.com",
        "userType": "student",
        "isActive": true,
        "emailVerified": true,
        "lastLogin": "2024-12-20T09:00:00Z",
        "createdAt": "2024-12-15T00:00:00Z",
        "stats": {
          "completedLessons": 15,
          "badgesEarned": 4,
          "timeSpentMinutes": 420
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1250,
      "pages": 63
    }
  }
}
```

---

## 4. Cronograma Detalhado de Implementação

### **FASE 1: Setup e Infraestrutura** (2-3 dias)
**Branch**: `setup/initial-project`

#### Dia 1:
- [x] Criar projeto Node.js + TypeScript
- [x] Configurar Docker Compose (PostgreSQL + Redis)
- [x] Setup básico Express.js
- [x] Configurar Biome
- [x] Estrutura de pastas hexagonal

#### Dia 2:
- [x] Configurar Sequelize + PostgreSQL
- [x] Configurar Redis
- [x] Middlewares básicos (CORS, helmet, etc)
- [x] Sistema de logs com Winston
- [x] Health check endpoints

#### Dia 3:
- [ ] Configurar Jest para testes
- [ ] Configurar Swagger
- [ ] Variáveis de ambiente
- [ ] Docker funcionando 100%

### **FASE 2: Autenticação e Usuários** (3-4 dias)
**Branch**: `feature/auth-users`

#### Dia 1:
- [ ] Models: User, UserPreferences, UserSessions
- [ ] Migrations e seeds básicos
- [ ] Repository layer para usuários

#### Dia 2:
- [ ] Service layer de autenticação
- [ ] JWT utils (geração, validação, refresh)
- [ ] Hash de senhas com bcrypt
- [ ] Middlewares de auth

#### Dia 3:
- [ ] Controllers de autenticação
- [ ] Rotas: register, login, logout, refresh
- [ ] Validadores de entrada
- [ ] Testes unitários

#### Dia 4:
- [ ] Controllers de usuários
- [ ] Rotas: profile, preferences
- [ ] Testes de integração
- [ ] Documentação Swagger

### **FASE 3: Conteúdo Educacional** (4-5 dias)
**Branch**: `feature/content-management`

#### Dia 1-2:
- [ ] Models: LearningPath, Module, Lesson, etc
- [ ] Migrations e relacionamentos
- [ ] Seeds com dados do frontend
- [ ] Repository layer

#### Dia 3-4:
- [ ] Service layer de conteúdo
- [ ] Cache com Redis
- [ ] Controllers públicos (GET endpoints)
- [ ] Sistema de busca e filtros

#### Dia 5:
- [ ] Controllers admin (CRUD completo)
- [ ] Middleware de autorização admin
- [ ] Testes e documentação

### **FASE 4: Sistema de Quizzes** (4-5 dias)
**Branch**: `feature/quizzes-system`

#### Dia 1-2:
- [ ] Models de quizzes
- [ ] Sistema de tentativas
- [ ] Cálculo automático de scores
- [ ] Repository layer

#### Dia 3-4:
- [ ] Service layer de quizzes
- [ ] Lógica de correção automática
- [ ] Controllers e rotas
- [ ] Sistema de feedback

#### Dia 5:
- [ ] Histórico de tentativas
- [ ] Relatórios de performance
- [ ] Testes e documentação

### **FASE 5: Progresso e Gamificação** (3-4 dias)
**Branch**: `feature/progress-gamification`

#### Dia 1-2:
- [ ] Models de progresso
- [ ] Sistema de badges
- [ ] Cálculo automático de progresso
- [ ] Repository layer

#### Dia 3-4:
- [ ] Service layer de progresso
- [ ] Sistema de conquistas
- [ ] Controllers e rotas
- [ ] Dashboard de progresso

### **FASE 6: Funcionalidades Complementares** (2-3 dias)
**Branch**: `feature/additional-features`

#### Anotações (1 dia):
- [ ] Sistema completo de anotações
- [ ] Busca e tags
- [ ] Controllers e testes

#### Upload de Arquivos (1 dia):
- [ ] Multer para upload
- [ ] Validação de arquivos
- [ ] Geração de PDFs

#### Finalização (1 dia):
- [ ] Analytics detalhados
- [ ] Logs de auditoria
- [ ] Otimizações finais

---

## 5. Validações e Regras de Negócio

### **Usuários:**
- Email único no sistema
- Senha: mínimo 8 caracteres, 1 maiúscula, 1 número, 1 símbolo
- Nome: 2-100 caracteres
- Soft delete (não deletar fisicamente)

### **Conteúdo:**
- Slug único por trilha
- Ordem sequencial em módulos/lições
- Conteúdo markdown válido
- Tags: máximo 10 por lição

### **Quizzes:**
- Mínimo 5 questões por quiz
- Tempo limite: 5-120 minutos
- Score mínimo: 50-95%
- Máximo 3 tentativas por dia

### **Progresso:**
- Lição só desbloqueada se anterior completa
- Progresso calculado automaticamente
- Badge só pode ser conquistado uma vez

---

## 6. Comandos de Desenvolvimento

```bash
# Setup inicial
npm run docker:up
npm run db:migrate
npm run db:seed

# Desenvolvimento
npm run dev
npm run test:watch

# Testes
npm run test
npm run test:coverage

# Build e deploy
npm run build
npm run start
```

---

Este documento está SUPER detalhado! Cada endpoint tem input/output definido, todas as branches estão nomeadas, CRUDs especificados, cronograma dia-a-dia, validações, etc.

**Está bom assim ou quer que eu detalhe mais alguma parte específica?** 🚀