# Ask Sherlock

## Prerequisites

1. Both `node.js` and `yarn` must be installed on your local machine
2. Docker must be installed on your local machine
3. You must register an [OpenAI account](https://platform.openai.com) and generate a valid API key.

## Setup the project

1. Clone this repo
2. Install all dependencies, including the Supabase CLI

```bash
yarn
```

3. Create the local .env file

Copy the file `.env.template` in the root directory of the project to `.env`

```bash
cp .env.template .env
```

4. Setup OnenAI key

Modify the line. Replace <YOUR_OPENAI_API_KEY> in the file `.env` with your own key

```
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
```

5. Start the local Supabase server

```bash
npx supabase start
```

6. Start the fontend

Start the development server on http://localhost:3000

```bash
yarn dev
```

Now You can access the site using the URL http://localhost:3000/asksherlock

## Modifying the database schema

If you modify the database schema with new migrations, do not forget to update
the local Supabase instance with

```bash
npx supabase db reset
```

## Using a public Supabase Instance

The application uses a local supabase instance per default. If you want to run it
on a public Supabase instance, perform the following steps

1. Setup your Supabase project

You must register a [Supabase account](https://supabase.com), generate a Supabase project and generate the Supabase URL and the Supabase key for the project as descibed [here](https://supabase.com/docs/guides/getting-started/tutorials/with-nuxt-3#project-setup)

2. Link the local Supabase instance to the public Supabase instance

```bash
npx supabase link --project-ref <project-ref>
```

3. Push the database schema to the public Supabase instance

```bash
npx supabase db push
```

4. Configure the Supabase connection

Modify the line. Replace <YOUR_SUPABASE_URL> in the file `.env` with your public Supabase URL

```
SUPABASE_URL=<YOUR_SUPABASE_URL>
```

Modify the line. Replace <YOUR_SUPABASE_ANON_KEY> in the file `.env` with your public Supabase Anon Key

```
SUPABASE_KEY=<YOUR_SUPABASE_ANON_KEY>
```
