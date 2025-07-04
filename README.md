# Eval Webs 2

Ce projet est une plateforme de gestion de réservations de salles avec API REST, GraphQL et gRPC, sécurisée par Keycloak.

## Prérequis
- Docker & Docker Compose
- Node.js
- npm

## Démarrage rapide

1. **Lance les services**
   ```bash
   docker compose up -d
   ```

2. **Initialise Keycloak**
   ```bash
   node init-keycloak.js
   ```

3. **Démarre toutes les API (REST, GraphQL, gRPC)**
   ```bash
   npm run launch:dev
   ```

4. **Lance la suite de tests pour vérifier que tout fonctionne**
   ```bash
   npm run test
   ```

---