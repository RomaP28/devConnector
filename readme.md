![Banner](./client/public/img/banner.png)

# devConnector App

This is a small MERN stack social network app that includes authentication, user profiles, posts, likes and comments.
Built using modern technologies: MongoDB, Express, React, Node.js, Redux.

## The project is hosted and running on cyclic environment:

https://weary-bull-teddy.cyclic.app/

## To run the project locally:
 
You should create your own Mongo database.

### 1. Download project open root folder and create config.env with 5 variables:

**NODE_ENV** "production" or "development", <br />
**mongoURI** MongoDB connection, <br />
**jwtSecret** secret password for generation JWT Token, <br />
**githubClientId**, **githubSecret** Github connection

### 2. and install server dependencies:
`npm install`

### 3. Open client folder:
`cd client`

### 4. Install client dependencies:
`npm install`

### 5. Come back to the root folder:
`cd..`

### 6. Run both Express & React:
`npm run dev`
