Perfect! If you want to use Supabase as the backend and Vercel for Employee Directory Web Application

A full-stack Employee Directory web app where users can search, view, and manage employee details.
Built using React (frontend) with Supabase (backend & database) and deployed on Vercel.


---

🧩 Features

View all employees with:

Profile photo

Name

Job title

Department

Email & phone


Search employees by name, department, or role

Sort employees alphabetically or by department

Admin Dashboard (protected with Supabase auth):

Add new employees

Edit existing employees

Delete employees


Responsive design for mobile and desktop



---

⚙️ Tech Stack

Layer	Technology

Frontend	React, Tailwind CSS
Backend	Supabase (Database + Auth + API)
Deployment	Vercel



---

🚀 Getting Started

1. Clone the repository

git clone https://github.com/yourusername/employee-directory.git
cd employee-directory

2. Install dependencies

npm install

3. Setup Supabase

1. Go to Supabase and create a new project.


2. Create a table employees with columns:

id (UUID, primary key)

name (text)

email (text)

phone (text)

department (text)

job_title (text)

profile_photo (text)



3. Enable Supabase Auth for admin login.


4. Copy your Supabase URL and API Key.



4. Configure environment variables

Create a .env.local file in the frontend:

REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

5. Run the project locally

npm start

Open http://localhost:3000 in your browser.


---

📂 Folder Structure

/src
  /components     -> Reusable UI components (EmployeeCard, SearchBar, Modal)
/pages            -> Directory pages and admin pages
/supabaseClient.js -> Supabase initialization
.env.local        -> Environment variables


---

🔍 Usage

1. Open the Employee Directory page.


2. Use the search bar to find employees by name, department, or role.


3. Admins can log in via Supabase Auth to add, edit, or delete employees.




---

🌐 Deployment on Vercel

1. Push your project to GitHub.


2. Go to Vercel → New Project → Import GitHub repo.


3. Add environment variables in Vercel (REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY).


