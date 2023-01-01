HOW TO RUN: 
1. run the MySQL db (copy of the db is in db dump.zip) and set the config in backend/config/config.json if necesarry,
2. run "npm install" and "npm start" commands in terminal, in "backend" and "frontend" subfolders.

DESCRIPTION: app to manage assebly lines, made for recruitment purposes

TOOLS: Angular (TS), NodeJS (JS), VSC, Postman, MySQL Workbench

STATUS: unfinished yet

CREATION PROCESS DESCRIPTION: 
At the begining (after receive recruitment task), I had learn as much as I could about NodeJS, Angular, TypeScript, because i havent got
a pleasure to use these technologies before (I havent even use any framework before).
After I got a little knowlegde, Ive decided to create app using a similar project that Ive found on youtube as base
(Link to the youtube guide: https://www.youtube.com/watch?v=w1_TNxbtrXY&list=PL9_OU-1M9E_sjaUPfH3FIp8GtJrhJhTb8&index=1)

For the moment, app is not finished because of many challenges I had to face during creation proccess.

It was great pleasure to create this project, beause I had opportunity to learn a lot of useful information
about Angular, TypeScript, NodeJS and RestAPI, that hopefully I will be using in the future as professional programmer.

I am aware that the project requires refactoring I that there is a lot of stuff that could be made better, 
but I did the best I could for the moment, consider limited amount of time I had.

UNFINISHED THINGS:
- associative tables, backend and frontend for many to many relations between assemlby lines and workstations,
- assigning product to assembly line on the frontend (backend works, but of the frontend there are only buttons with hardcoded product_id for testing pourposes. I was planning to create there some reactive combobox),
- details like:
    - keeping user logged in after refresh if a token isnt expired (for the moment refreshing causes logout),
    - possibility to update names of all elements and restrictions for deleting, when elements are in relationships,
    - improving styling,
    - filtering assebly lines by product.

Best regards, Jakub Górecki.



