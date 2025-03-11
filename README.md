# DotsGames ID System

A Proof of Concept (PoC) implementation for the DotsGames ID system, a frontend-only Single Page Application (SPA) that demonstrates user authentication and gaming platform integration capabilities.

## Features

- **User Authentication**
  - Registration with email, username, and password
  - Login/logout functionality
  - Password reset flow

- **Profile Management**
  - Edit user profile information
  - Password management

- **Gaming Platform Integration**
  - Link external gaming accounts (Xbox, PlayStation, Nintendo, etc.)
  - View linked accounts status
  - Unlink accounts

- **Multilingual Support**
  - English and Japanese language options
  - Dynamic language switching

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive components based on screen size

## Technical Implementation

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- In-memory data persistence (localStorage)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dmasubuchi/dotsline-test01.git
cd dotsline-test01
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Usage

### User Registration and Login

1. Navigate to the registration page
2. Create a new account with email, username, and password
3. Log in with your credentials

### Platform Linking

1. Navigate to the Platforms page
2. Select a gaming platform to link
3. Enter your platform username
4. Click "Link" to connect your account

### Profile Management

1. Navigate to the Profile page
2. Update your personal information
3. Change your password if needed

## Future Enhancements

- Backend integration with real authentication
- OAuth support for third-party login
- Enhanced security features (2FA, account recovery)
- Game library integration
- Friends and social features
- Achievements and rewards system

## License

This project is licensed under the MIT License - see the LICENSE file for details.
