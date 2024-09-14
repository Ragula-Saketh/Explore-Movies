Explore Movies is a full-stack web application designed to extend the 
functionality of a previous hackathon project. The platform features role-based
authentication, allowing users and admins to interact with the system through
distinct pages. All actions and changes are seamlessly reflected in the database 
in real time, ensuring data consistency and reliability.

User Features:
Once authenticated, users are redirected to their personalized page, where they can
request to view specific movies. These requests are sent to the admin and stored in 
the database. Upon admin approval, the movie details become accessible to the user, 
who can also add movies to their "Watch Later" list. Each user has a separate database 
entry to manage their unique movie requests and watchlist. Any updates are instantly 
saved in the database. Users can securely log out, and their session information is 
removed from the system.

Admin Features:
Admins are directed to a comprehensive user management page where they can perform full 
CRUD (Create, Read, Update, Delete) operations on user accounts. The admin also has access 
to a movie management page, where they can add, update, delete, and view movie entries. 
Every change made to user or movie data is instantly reflected in the database, ensuring 
the system remains up to date. In the request management section, admins can approve or 
reject movie requests from users, with each decision being stored and updated in the 
database.

Core Functionalities:
The application offers smooth navigation between pages, search functionality, and robust 
access control. The platform's database-driven architecture ensures that all interactions, 
whether performed by users or admins, are instantly reflected in the database. After 
logging out, neither users nor admins can access any restricted pages except for login 
and registration, safeguarding data and user sessions.

This version emphasizes that all changes made by users and admins are dynamically reflected
in the database, ensuring real-time updates and consistent data management.