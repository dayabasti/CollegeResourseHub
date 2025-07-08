📚 College Resource Hub
A centralized platform for students to upload, access, and manage academic resources like PDFs, assignments, notes, and past papers.

✨ Features
📁 Upload PDFs and study materials
🔍 Browse and view uploaded resources
📦 Backend using Node.js + Express
🌐 Frontend built with React
☁️ Cloud-ready with MongoDB Atlas
🗂 Organized file storage
📄 Download/view uploaded resources
🔐 Secure and scalable architecture

🛠 Tech Stack
Frontend: React, Axios
Backend: Node.js, Express
Database: MongoDB Atlas
File Uploads: Multer
Environment Management: dotenv

⚙️ Installation & Setup
1. Clone the repository

git clone https://github.com/dayabasti/CollegeResourseHub.git
cd CollegeResourseHub

2. Setup Backend

cd backend
npm install

Create a .env file:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Start the server:
node server.js

3. Setup Frontend
cd ../frontend
npm install
npm start
Open http://localhost:3000 in your browser.

📁 Folder Structure
CollegeResourseHub/
├── backend/
│   ├── server.js
│   ├── routes/
│   └── controllers/
├── frontend/
│   ├── src/
│   ├── public/
├── uploads/
└── README.md

🧪 Future Improvements
🔐 Add authentication (student login)
📊 Analytics dashboard for usage
🧵 Tagging and categorization
📝 Comments and feedback on files

👩‍💻 Author
Daya Basti
MCA Student, IGDTUW
GitHub

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

