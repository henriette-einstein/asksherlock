# Ask Sherlock

## Prerequisites
1. Both ```node.js``` and ```yarn``` must be installed on your local machine
2. You must register an [OpenAI account](https://platform.openai.com) and generate a valid API key.
3. You must register a [Supabase account](https://supabase.com) and generate a Supabase URL an Supabase key as descibed [here](https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3#project-setup)

## Setup required Keys
Copy the file ```.env.template``` in the root directory of the project to ```.env```

```bash
cp .env.template .env
```

Modify the line. Replace <YOUR_OPENAI_API_KEY> in the file ```.env``` with your own key
````
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
````

Modify the line. Replace <YOUR_SUPABASE_URL> in the file ```.env``` with your own Supabase URL
````
SUPABASE_URL=<YOUR_SUPABASE_URL>
````

Modify the line. Replace <YOUR_SUPABASE_ANON_KEY> in the file ```.env``` with your own Supabase Anon Key
````
SUPABASE_KEY=<YOUR_SUPABASE_ANON_KEY>
````

## Compile the sources
Install ```node.js``` on your local machine
Install ```yarn``` on your local machine


Install the dependencies:

```bash
yarn install
```

## Create the Vector Database for the testdata

The Vector database is required for the integration of 
custom content into the OpenAI-Processing. 

!!! This step only works if you have a valid OpenAI Key. You
can get a test key at https://platform.openai.com/overview

With this key set in the .env file, execute the following
command

```bash
yarn generate-testdata
```

## Start Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

Now You can access the site using the URL http://localhost:3000/asksherlock
