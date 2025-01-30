# Image Vault

## Upload images and video to a vault with easy Google Sign In

## Tech Stack

- Frotnend: React, TailwindCSS,
- Backend: ExpressJS, Postgres, Cloudinary (for storage)

## Database Design

![drawSQL-image-export-2025-01-30](https://github.com/user-attachments/assets/e19edfb0-4c55-4a05-9801-84f40e2f48e3)

## How to run

1. Clone the repo

```bash
git clone https://github.com/rohit1kumar/image-vault.git && cd image-vault
```

2. Go to backend and and update the environment variables provided in `.env.example` file

```bash
cd backend
cp .env.example .env
```

3. Install dependencies, run migration and start server

```bash
npm install
npm run db:migrate
npm start
```

4. Go back to frontend dir, install dependencies & run

```bash
cd frontend
npm i
npm run dev
```

### Postman collection is given, import it and use to try endpoints
