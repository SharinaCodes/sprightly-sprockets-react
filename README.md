# Sprightly Sprockets Inventory App

Welcome to **Sprightly Sprockets**, a lightweight and efficient inventory management system. This app enables users to manage parts and products through an intuitive interface. It is designed for ease of use and scalability, making it ideal for small to medium-sized businesses.

[Live Application](https://sprightly-sprockets-frontend.onrender.com/)

## Features

- **User Authentication**: Secure user authentication using JWT.
- **Parts Management**: Add, edit, delete, and search for parts.
- **Products Management**: Add, edit, delete, and search for products.
- **Reports**: Generate real-time reports of inventory and user activity.
- **Persistent Data Storage**: Connected to MongoDB cloud database for real-time storage and retrieval of inventory data.
- **Responsive Design**: Accessible from any device with a clean and simple UI.

## Technologies Used

### Frontend:
- **React.js**: For building a dynamic and responsive user interface.
- **React Router**: For client-side routing.
- **CSS/SCSS**: Custom styling for a modern look and feel.
  
### Backend:
- **Node.js** with **Express.js**: REST API for handling inventory data and authentication.
- **MongoDB Cloud**: Cloud-based database for persistent storage.
  
### Deployment:
- **Render.com**: Hosting for both frontend and backend services.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or above)
- **MongoDB** (for local setup or cloud access)
- **Git**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SharinaCodes/sprightly-sprockets-react.git
   cd sprightly-sprockets-react
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Run the application locally:
   ```bash
   npm start
   ```

   The frontend will be served on `http://localhost:3000` and the backend API will run on `http://localhost:5000`.

### Environment Variables

To run this project, you will need to set up the following environment variables in a `.env` file:

- `MONGO_URI`: Your MongoDB Cloud URI
- `JWT_SECRET`: A secret key for JWT token generation
- `PORT`: Port for the backend server

## Future Improvements

- Implement advanced reporting features.
- Add user role-based permissions for better access control.
- Improve logging and monitoring tools.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss improvements.

## License

This project is licensed under the MIT License.

---
