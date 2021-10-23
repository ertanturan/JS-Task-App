# JS-Task-App

This is a fundamental User/Task Server using REST API measures.

# Features

## User Features

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


## Task Features
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

# Postman Configuration
[Postman Collection to Import ](/GithubReferences/Postman/Task%20App.postman_collection.json)


