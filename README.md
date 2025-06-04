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
   <br>git clone https://github.com/NilusCodeRepo/task-manager-app.git
   <br>cd your_repo_name
   
2. Install Dependencies
   <br>npm install
   
3. Create .env File
<br>PORT=3000
<br>MONGODB_URI=mongodb://localhost:27017/your-db-name // Make sure MongoDB is running locally or that the URI points to a cloud instance (like MongoDB Atlas).
<br>JWT_SECRET=your-secret-key

4. Run the Project
<br>npm start


# API Endpoints
<br>----------------------------------------------------------------
<br>1. Register a User - 
<br>POST: http://localhost:3000/api/v1/auth/register
<br>{
	<br>"firstName": "Suchitra",
	<br>"lastName" : "Verma",
	<br>"email": "kiran123@gmail.com",
	<br>"password": "suchitra@123",
	<br>"phoneNumber": "8956458945"
<br>}

<br>2. login 
<br>POST: http://localhost:3000/api/v1/auth/login
<br>{
	<br>"email": "nilu.bhagde895@gmail.com",
	<br>"password": "Nilam@123"
<br>}

<br>3. Create a task
<br>POST: http://localhost:3000/api/v1/tasks/createTask
<br>{
 <br>"title" : "Lunch meeting",
 <br>"description": "To achieve familarity",
 <br>"due_date": "2025-06-08"
<br>}

<br>4. List tasks
<br>GET: http://localhost:3000/api/v1/tasks/getAllTasks?page=1&limit=10&search=submit

<br>5. Update a task
<br>PUT: http://localhost:3000/api/v1/tasks/updateTask/1
<br>{
<br> "title" : "Task Main",
<br>"due_date": "2025-06-12"
<br>}

<br>6. Delete a task
<br>DELETE: http://localhost:3000/api/v1/tasks/deleteTask/1



