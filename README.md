# Ask Sherlock

## Prerequisites
Install ```node.js``` on your local machine
Install ```yarn``` on your local machine

Copy the file .env.template in the root directory of the project to .env

```bash
cp .env.template .env
```

Modify the line. Replace <YOUR_OPENAI_API_KEY> with your own key
````
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
````

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```