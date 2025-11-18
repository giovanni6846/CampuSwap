# APISWAP — Guide de mise en place (NestJS + Docker, mode développement)

> **Astuce** : installe l’extension **Docker** dans **VS Code** pour manipuler les conteneurs directement depuis l’éditeur.

## 1) Créer le projet NestJS

```bash
npm i -g @nestjs/cli

nest new mon-api
cd mon-api

# Vérifier en local (hors Docker)
npm run start:dev
```

## 2) Ajouter un `.dockerignore` (important)

Empêche de copier des fichiers inutiles dans l’image Docker :

```
node_modules
dist
.git
.gitignore
Dockerfile*
docker-compose*
npm-debug.log
.env
```

## 3) Créer `Dockerfile.dev` (à la racine du projet, ex: `apiswap/`)

```dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

# Copier uniquement package.json pour installer d'abord les dépendances
COPY package*.json ./

RUN npm install

# Les sources seront montées en volume, pas besoin de copier ici
EXPOSE 3000

CMD ["npm", "run", "start:dev"]
```

## 4) Créer `docker-compose.yml` (toujours à la racine)

```yaml
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile.dev.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/src/app          # code local ↔ conteneur
      - /usr/src/app/node_modules  # conserver node_modules du conteneur
    environment:
      - NODE_ENV=development
      - PORT=3000
    command: npm run start:dev
```

## 5) Lancer en mode développement

Depuis la racine du projet (ex: `apiswap/`) :

```bash
docker compose up --build
```

À chaque modification dans `src/`, **Nest** redémarre automatiquement (**hot reload**).

---

### Notes rapides

- Le **volume** `node_modules` côté conteneur évite les conflits entre dépendances locales et celles du conteneur.
- Pense à **reconstruire** (`--build`) si tu modifies `package.json`.
- Le port par défaut exposé par Nest est **3000** (configurable via `PORT`).

