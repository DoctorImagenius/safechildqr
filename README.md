# SafeChildQR Backend

Backend API for the SafeChildQR child safety and recovery system. This Express and MongoDB service manages authentication, parent profiles, child records, scan handling, scan logging, and email alerts.

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt
- Express Validator
- Express Rate Limit
- Nodemailer
- Axios

## Main Features

- Parent signup and login
- JWT-based protected routes
- Parent profile retrieval, update, and delete
- Child create, read, update, and delete
- Public scan endpoint for QR lookups
- Scan logging with IP and device information
- Email alert to the parent when a scan happens
- Validation and centralized error handling

## Project Structure

```text
backend/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── validationRules/
├── server.js
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

## Installation

```bash
cd backend
npm install
```

## Run the Server

```bash
npm start
```

The API starts on `http://localhost:5000` unless `PORT` is changed.

## API Base Routes

- `/auth`
- `/parent`
- `/child`
- `/scan`

## API Endpoints

### Auth

- `POST /auth/signup` - Register a parent
- `POST /auth/login` - Login parent

### Parent

- `GET /parent/me` - Get logged-in parent profile with children
- `PUT /parent/me` - Update password or emergency number
- `DELETE /parent/me` - Delete parent account and children

### Child

- `POST /child` - Add a child
- `GET /child/:id` - Get one child
- `PUT /child/:id` - Update child data
- `DELETE /child/:id` - Delete child

### Scan

- `GET /scan/:code` - Public endpoint used by QR scans

## Data Models

### Parent

- `email`
- `password`
- `emergencyNumber`
- `children`

### Child

- `parent`
- `name`
- `age`
- `emergencyMessage`
- `location`

### ScanLog

- `child`
- `parent`
- `ipAddress`
- `deviceInfo`
- timestamps

## Validation Rules

- Email must be valid
- Password must be strong:
  `8+ chars, uppercase, lowercase, number, special character`
- Emergency number must match local format:
  `03XXXXXXXXX`
- Child age must be between `0` and `18`

## Scan Flow

1. Finder scans the QR code.
2. Frontend calls `GET /scan/:code`.
3. Backend extracts the child ID from the QR code.
4. Child and parent emergency info are returned.
5. A scan log is saved with IP and user-agent.
6. An alert email is sent to the parent.

## Notes About Current Implementation

- The server currently uses standard Express HTTP routes only.
- Socket.io is planned but not yet implemented in this repository.
- Email alerts use Gmail through Nodemailer.
- IP-based approximate location lookup is handled through `ipapi.co`.
- Login requests are rate-limited.

## Sample Request Bodies

### Signup

```json
{
  "email": "parent@example.com",
  "password": "StrongPass1!",
  "emergencyNumber": "03123456789"
}
```

### Add Child

```json
{
  "name": "Ali",
  "age": 7,
  "emergencyMessage": "Please contact the parent immediately.",
  "location": {
    "lat": 24.8607,
    "lon": 67.0011
  }
}
```

## Future Improvements

- Live location sharing with Socket.io
- Push notifications
- Scan analytics dashboard
- Emergency services integration
- Merchandise and shop features
- Mobile application support