# SimpleUserDirectory

A simple user directory that implements Graphql with typescript. Take Home Assignment for https://naamche.com

# Technologies Used

- Typescript
- Apollo Server
- Nexuxjs
- Prisma
- Sqlite

# Install the project

```
npm install
```

# Migrate the prisma database

```
npx prisma migrate dev --name init --preview-feature
```

# Generate only graphql schema from resolvers

```
npm run generate
```

# Run the api in dev mode

```
npm run dev
```
