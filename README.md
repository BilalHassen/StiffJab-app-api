# StiffJab API
- This is the server that is used alongside the StiffJab front end.
- This server is required to run in order to get data for the front-end application


## Email Configuration 
- StiffJab API uses nodemailer to send emails. To enable this functionality you will need to set up your own email credentials following these steps:
- Add a `.env` file to the root
-    ```env
   EMAIL_USER="youremail@example.com"
   EMAIL_PASSWORD="yourpassword"
- NOTE: the email password is a google generated app password. 
