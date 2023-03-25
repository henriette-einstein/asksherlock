# Ask Sherlock

## Prerequisites
Install ```node.js``` on your local machine
Install ```yarn``` on your local machine

Copy the file ```.env.template``` in the root directory of the project to ```.env```

```bash
cp .env.template .env
```

Modify the line. Replace <YOUR_OPENAI_API_KEY> in the file ```.env``` with your own key
````
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
````

## Setup

Make sure to install the dependencies:

```bash
yarn install
```

## Create the Vector Database

The Vector database is required for the integration of 
custom content into the OpenAI-Processing. 

!!! This step only works if you have a valid OpenAI Key. You
can get a test key at https://platform.openai.com/overview

With this key set in the .env file, execute the following
command

```bash
yarn generate-all-vectors
```

## Start Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

Now You can access the site using the URL http://localhost:3000/asksherlock
