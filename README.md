# Student Management System

The Student Management System is a React application that allows users to manage student data. Users can add, update, search, and delete student records. The application relies on a backend server and a MySQL database for persistence.

## Features

- Add new student records
- Update existing student records
- Search for students by name
- Delete student records
- Display a list of all students

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher)
- [Visual Studio Code](https://code.visualstudio.com/) or any other code editor
- Backend server (running on `http://localhost:8080`)
- MySQL server (running and configured)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/student-management-system.git
   cd student-management-system

2. **Install dependencies**

If you do not have npm installed, follow the instructions below to install it. Otherwise, skip to the next step.

## Installing npm

npm is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer.

**Windows & MacOS:**

Download the installer from the Node.js website.
Run the installer and follow the steps.

**Linux:**

Use your terminal to install Node.js and npm by running the following commands:

sudo apt update
sudo apt install nodejs npm

After installing npm, run the following command to install the necessary dependencies for the project:

npm install

3. **Ensure the backend server is running**

Make sure your backend server is running on http://localhost:8080 and is connected to a MySQL database. Follow the instructions for your backend server to start it and ensure it is properly connected to the MySQL database.

**Start the MySQL server**

Ensure your MySQL server is running and properly configured with the necessary database and tables for the backend server to interact with.

**Start the React application**

In the terminal, run the following command:

npm start

## Technologies Used

* React
* Material-UI
* Node.js
* Express (backend server)
* MySQL (database)

