# Movie App

• __Deployment__: https://rjs-asm01-fx19838.netlify.app

• **Techniques**: ExpressJS, ReactJS, NodeJS

• **Description**: show movie's information by genre and search by keyword.

• **Reason to do**:

    - Access to a wide range of rich and varied content.

    - Suitable for viewing on many different devices.

    - Provides high picture quality and excellent sound.

    - Provides intelligent search and recommendations.

    - Watch movies on demand, anytime.

• **Project process**:

    (1) Front-end:

        - Home page: NavBar, Banner, Movie Lists, Movie details.

        - Search page: find movies by input fields, can show movies details like Home page.

    (2) Back-end:

        - Create a new NodeJS project and read data from file.

        - Create routes to response movies by the request or message when endpoint wrong.

        - Add token authentication for routes.

        - Added more parameters to search for movies (genre, mediaType, language, year).

• **How to install and start this project (dev. version)**

(1) Open VS Code -> Open Root Folder.

(2) Open Terminal -> Run `cd backend`.

(3) Run `npm install --save concurrently`.

(4) Continue run `npm run install-all` -> `npm run start-all`.

(I have written more code in "backend/package.json", so only run terminal at backend, frontend side will be run at the same time.)
