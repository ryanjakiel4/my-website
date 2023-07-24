# Personal React Website 
The website is currently hosted here, check it out!

https://ryan-jakiel-projects.web.app/

Feel free to re-use the code for your own website, just give credits!

## Setup

### Prerequisites
Install Node.js and Github CLI

https://nodejs.org/en

https://cli.github.com/manual/installation

### Pull the package
Then in your terminal (Windows or otherwise) pull the code, and naviagate to the new directory.
```
gh repo clone ryanjakiel4/my-website
cd my-website
```

### Use Node.js to install react-scripts
Before running, you'll need to install react-scripts.
```
npm install react-scripts
```

## Hosting the website locally

Run:
```
npm start
```
And you can open your website in your browser.

## Hosting the website remotely
There are a lot of web hosting services out there, I use firebase right now.

https://firebase.google.com/

It's very simple, and the free tier is great for small projects like this.

This is a good tutorial I found on how to setup deploying your react project to Firebase

https://www.knowledgehut.com/blog/web-development/deploying-react-app-to-firebase

To build the package for web hosting, run:
```
npm run build
```

And to deploy to firebase (after initial setup above):
```
firebase deploy
```
