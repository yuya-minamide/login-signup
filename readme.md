<h1 style="text-align: center;">
Login authentication system
</h1>

![Alt Text](public/demonstration.gif)

## Description

This is a login authentication system
Credentials are stored in MongoDB, you can use your email address, Google, Github, Twitter

## Technologies Used

<p align="left">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="50" height="50" style="max-width: 100%;">
<img src="./public/expressjs.svg" alt="expressjs" width="50" height="50" style="max-width: 100%;">
<img src="./public/passport.svg" alt="passport" width="50" height="50" style="max-width: 100%;">
<img src="./public/ejs.svg" alt="ejs" width="50" height="50" style="max-width: 100%;">
<img src="./public/tailwind.svg" alt="tailwind" width="50" height="50" style="max-width: 100%;">
<img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" alt="mongodb" width="50" height="50" style="max-width: 100%;">
</p>

## How to start building

You can build a this bot by following the steps below

### Clone the repository

```sh
git clone https://github.com/yuya-minamide/login-signup.git
```

### Install

```sh
npm install
```

### Create .env

```sh
PORT=
MONGO_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
```

### Build MongoDB

[MongoDB](https://cloud.mongodb.com/)

-   Create your app
-   Retrieve the MONGO_URI and set them in the .env file

### Create your app in Google cloud

[Google cloud](https://console.cloud.google.com/)

-   Create your app
-   Set your URI and call back URI
-   Retrieve the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET values and set them in the .env file

### Create your app in your Github

[Your Github](https://github.com/)

-   Create your app(Setting/Developer setting/)
-   Set your URI and call back URI
-   Retrieve the GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET values and set them in the .env file

### Create your app in Twitter developer portal

[Twitter developer portal](https://developer.twitter.com/)

-   Create your app
-   Set your URL and call back URI(you can use "http://google.com" for URL)
-   Retrieve the TWITTER_CONSUMER_KEY and TWITTER_CONSUMER_SECRET values and set them in the .env file

## Documentation

-   [Passport.js](https://www.passportjs.org/)

## Contributors

-   [Yuya Minamide](https://github.com/yuya-minamide)
    [![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-Profile-informational?style=flat&logo=linkedin&logoColor=white&color=0D76A8)](https://www.linkedin.com/in/yuya-minamide/)
