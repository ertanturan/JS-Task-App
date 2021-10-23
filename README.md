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
   * Sub -  Gathers data only when authorized user logged in.
   * Sub -  Action can be done only to logged and authorized user's data.
   * Sub -  Gathers only non-private data (hides password, user avatar and tokens)
- Patch User Info 
   * Sub -  Updates only logged users' data.
- Create User Avatar
- Fetch user avatar
   * Sub -  Action can be done only to logged and authorized user's data.
- Delete user avatar
   * Sub -  Action can be done only to logged and authorized user's data.
- Patch User Avatar
   * Sub -  Action can be done only to logged and authorized user's data.

## Task Features
- Create Task
   * Sub -  Action can be done only to logged and authorized user's task data.
- Read Task
   * Sub -  Action can be done only to logged and authorized user's task data.
- Delete Task
   * Sub -  Action can be done only to logged and authorized user's task data.
- Patch Task
   * Sub -  Action can be done only to logged and authorized user's task data.


