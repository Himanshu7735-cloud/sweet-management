# Sweet Shop Management

A full-stack web application for managing a sweet shop, built with modern technologies. Users can register, login, browse sweets, search by name, view detailed pages with images, and purchase items. Admins can manage the inventory via API.

## Features
- User authentication (register/login) with JWT.
- Browse and search sweets.
- Detailed sweet pages with images.
- Purchase functionality.
- Admin API for CRUD operations on sweets.
- Responsive UI with card-based design.

## Technologies Used
- **Backend**: Node.js, Express, TypeScript, TypeORM, SQLite, bcrypt, JWT.
- **Frontend**: React, Vite, TypeScript, Axios, React Router, CSS.
- **Testing**: Jest (backend).

## Project Structure
```
Sweet-Management/
├── sweet-shop-backend/
│   ├── src/
│   │   ├── entities/ (User.ts, Sweet.ts)
│   │   ├── middleware/ (auth.ts)
│   │   ├── routes/ (auth.ts, sweets.ts)
│   │   ├── index.ts
│   │   └── __tests__/ (auth.test.ts)
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── sweet-shop-frontend/
│   ├── src/
│   │   ├── pages/ (Home.tsx, Login.tsx, Register.tsx, SweetDetail.tsx)
│   │   ├── main.tsx
│   │   ├── App.css
│   │   └── types.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
└── README.md
```

## Setup and Installation

### Prerequisites
- Node.js (v18+)
- npm

### Backend Setup
1. Navigate to the backend folder:
   ```
   cd sweet-shop-backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. (Optional) Copy `.env.example` to `.env` and set `JWT_SECRET` (default is 'secret').
4. Start the development server:
   ```
   npm run dev
   ```
   The server runs on http://localhost:4000.

### Frontend Setup
1. Navigate to the frontend folder:
   ```
   cd sweet-shop-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The app runs on http://localhost:5173.

### Running Both
- Start backend first, then frontend.
- Open http://localhost:5173 in your browser.
- Sample sweets are seeded automatically on backend startup.

## API Endpoints
- `POST /api/auth/register` - Register user.
- `POST /api/auth/login` - Login user.
- `GET /api/sweets` - List sweets.
- `GET /api/sweets/search?name=...` - Search sweets.
- `GET /api/sweets/:id` - Get sweet details.
- `POST /api/sweets` - Add sweet (admin).
- `PUT /api/sweets/:id` - Update sweet.
- `DELETE /api/sweets/:id` - Delete sweet (admin).
- `POST /api/sweets/:id/purchase` - Purchase sweet.

## Screenshots
- Home page: Shows list of sweets in cards.
- Login/Register: Forms with validation.
- Sweet Detail: Individual sweet with image and purchase button.
- Search: Filtered results.

*(Add actual screenshots here)*

## Test Report
Backend tests use Jest.

### Test Results
- **auth.test.ts**: Tests user registration and login.
  - Register and login flow: PASSED
  - Total tests: 1
  - Passed: 1
  - Failed: 0

Run tests with `npm test` in the backend folder.

## My AI Usage
I used **GitHub Copilot** extensively throughout the development of this project.

- **How I used it**:
  - Generated boilerplate code for Express routes, TypeORM entities, and React components.
  - Suggested API endpoint structures and middleware logic.
  - Helped debug issues like CSS not applying and backend startup problems.
  - Assisted in writing test cases and seeding data.
  - Provided code completions for styling, routing, and database queries.

- **Reflection**:
  - AI significantly accelerated development by reducing repetitive coding and offering quick solutions to common problems. It helped me focus on architecture and features rather than syntax. However, I manually reviewed and edited all generated code to ensure correctness, security, and alignment with project goals. AI is a powerful tool but requires human oversight for quality and originality.

## Contributing
- Fork the repo.
- Create a feature branch.
- Submit a PR.

## License
MIT License.
