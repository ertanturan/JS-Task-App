# JS-Task-App

This is a fundamental User/Task Server using REST API measures.

# Features

## User-Side

- Create User
- Delete User
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
