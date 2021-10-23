# JS-Task-App

This is a fundamental User/Task Server using REST API measures.

# Features

## User-Wise

- Create User
- Delete User
   * Sub -  Action can be done only to logged and authorized user's data.
   * Deleting user triggers another action to remove all tasks created and assigned to the deleted user. 
- Signup a New User
- Read User 
   * Gathers data only when authorized user logged in.
   * Action can be done only to logged and authorized user's data.
   * Gathers only non-private data (hides password, user avatar and tokens)
- Patch User Info 
   * Updates only logged users' data.
- Upload User Avatar
- Fetch user avatar
   * Action can be done only to logged and authorized user's data.
- Delete user avatar
   * Action can be done only to logged and authorized user's data.


## Task-Wise
- Create Task
   * Action can be done only to logged and authorized user's task data.
- Read Task
   * Action can be done only to logged and authorized user's task data.
- Delete Task
   * Action can be done only to logged and authorized user's task data.
- Patch Task
   * Action can be done only to logged and authorized user's task data.
- Fetch all Tasks.
   * Action can be done only to logged and authorized user's task data.

## Auth

There's a simple middleware uses jwt(a npm tool) to create and verify tokens of users which helps to recognize if whom communicates with the server is a logged in user..

# Postman Configuration
1. [This](/GithubReferences/Postman/Task%20App.postman_collection.json) json file should be imported to your postman dashboard as collection. Expect a result as seen in the screenshot below.
![Task App Collection](/GithubReferences/Postman/Collection.png)

3. Environment variables should be configured as seen in the screenshot below.
![Environment Configuration](/GithubReferences/Postman/EnvironmentConfiguration.png)
3. To make requests work which imported in the first step, you should assign the configured environment to each of them as seen in the screenshot below.
![Environment Selection](/GithubReferences/Postman/EnvironmentSelection.png)

# IDE Configuration

1. run the `npm install` command.
2. Create a directory named `config` in the root directory
3. Create files named `test.env` and `dev.env`
4. Configure `.env` files as seen below
   1. test.env
   ![test.Env](/GithubReferences/IDE/TestEnv_Example.png)
   2. dev.env
   ![dev.env](/GithubReferences/IDE/DevEnvExample.png)    

# Pre-Requisities
MongoDB should be installed in your computer.

# Running

1. Start MongoDB to your designated data path (Do this to save your database to a known directory)
2. To start once -> Run command `npm run start`
3. To start again whenever a change in filesystem has been detected -> Run command `npm run dev`
4. To run unit test -> Run command `npm run test`
5. Your server is up !


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


# ENJOY !
