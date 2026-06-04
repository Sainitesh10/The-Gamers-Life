<div align="center">
  <h1>🎮 The Gamer's Life</h1>
  <p>A modern, interactive platform built for gamers to track, review, and discover their favorite video games.</p>
</div>

<br/>

## 🚀 Project Overview

**The Gamer's Life** is a full-stack web application designed for gaming enthusiasts. It provides a sleek and intuitive interface where users can manage their gaming library, read reviews, and keep track of their gaming journey. Built with the modern Next.js stack, it offers high performance and a seamless user experience.

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Styling:** Tailwind CSS

## ✨ Features

- 👾 **Game Library Management:** Keep track of the games you are playing, have completed, or want to play.
- 📝 **Reviews & Ratings:** Share your thoughts and rate your favorite games.
- 🔍 **Game Discovery:** Browse and search through an extensive database of video games.
- ⚡ **Responsive UI:** A stunning, gamer-centric dark mode UI optimized for all devices.

## 📸 Screenshots

*(Add screenshots of the application here)*

## ⚙️ Setup Instructions

### Prerequisites
- Node.js & npm
- A PostgreSQL Database (for Prisma)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sainitesh10/The-Gamers-Life.git
   cd The-Gamers-Life
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your database connection string:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/gamerslife"
   ```

4. **Initialize the Database:**
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🌐 Live Demo

*(Link to live deployment goes here)*

---
*Built by [Gudala Sai Nitesh](https://github.com/Sainitesh10)*
