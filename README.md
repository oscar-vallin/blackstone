# Description
This project will allow us to register and authenticate, once authenticated it will allow us to generate tasks

## Installation
To install and run this proyect just type and execute
-cd server
-cd client

*npm install* or *yarn install*

### Command to start project with Client and Server


npm run dev

### Command to run unit tests

*npm run tests*

### Description of unit tests

They are found inside __tests__
there are three files
- authController.test.js will allow us to return two functions: a json (token) and another json (user)
- taskControler.test.js will allow us to return three functions: three json with the creation, deletion and update
- userController.test.js will allow us to return an object with the validation of the user's creation