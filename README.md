# task-manager-app
A simple Task Manager app that allows users to register, authenticate, and manage their own tasks.

# Technologies Used
-----------------------------------------------------------
1. Node Js
2. Express JS
3. MongoDB
4. JWT for Authentication

   
#Setup Instructions
-------------------------------------------------------------
1. Clone the repository
   git clone https://github.com/NilusCodeRepo/task-manager-app.git
   cd your_repo_name
   
3. Install Dependencies
   npm install
   
5. Create .env File
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-db-name // Make sure MongoDB is running locally or that the URI points to a cloud instance (like MongoDB Atlas).
JWT_SECRET=your-secret-key

6. Run the Project
npm start


# API Endpoints
----------------------------------------------------------------
1. Register a User - 
POST: http://localhost:3000/api/v1/auth/register
{
	"firstName": "Suchitra",
	"lastName" : "Verma",
	"email": "kiran123@gmail.com",
	"password": "suchitra@123",
	"phoneNumber": "8956458945"
}

2. login 
POST: http://localhost:3000/api/v1/auth/login
{
	"email": "nilu.bhagde895@gmail.com",
	"password": "Nilam@123"
}

3. Create a task
POST: http://localhost:3000/api/v1/tasks/createTask
{
 "title" : "Lunch meeting",
 "description": "To achieve familarity",
 "due_date": "2025-06-08"
}

4. List tasks
GET: http://localhost:3000/api/v1/tasks/getAllTasks?page=1&limit=10&search=submit

5. Update a task
PUT: http://localhost:3000/api/v1/tasks/updateTask/1
{
 "title" : "Task Main",
 "due_date": "2025-06-12"
}

6. Delete a task
DELETE: http://localhost:3000/api/v1/tasks/deleteTask/1



