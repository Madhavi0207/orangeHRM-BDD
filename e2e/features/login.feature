Feature:Login
As a admin
I want to login to the system
So that i can manage the employees properly

Scenario: Login
Given the admin is in the login page
When the admin logs in with the given credentials
| username | password |
| Admin    | admin123 |
Then the admin is logged in successfully

Scenario Outline: Login with invalid credentials
Given the admin is in the login page
When the admin enter the invalid credentials
| username | password  |
| orange   | orange123 |
Then the alert message "Invalid credentials" must appear