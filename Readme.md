# Implementing Passwordless Login using Express.js, Postgres, Docker and the Web Authentication API

I used the following set of commands to set up my Docker project in the order that they are listed.

### Prerequisites

[Docker Engine](https://docs.docker.com/engine/install/) installed

### Setting up the project

Create these 3 files: `.dockerignore`, `Dockerfile` and `docker-compose.yml` and run the Docker Engine on your local.

Execute the following commands to start the service containers (`web` and `db` in our case) as mentioned in `docker-compose.yml`:

```bash
docker compose build
docker compose up
```

The app will run on `localhost:3000` and the DB server will run on port `5432`.

##### For opening the Bash shell inside a container:

```bash
docker compose run --service-ports web bash
```

The above command starts a new container for the `web` service, maps the service’s ports to the host, and opens a Bash shell inside the container.

##### Once inside the container bash, run:

```bash
npm init --yes
npm install express --save
```

##### To run the server

```bash
node index.js
```

Install `nodemon` package to auto-restart the server whenever there is a change in the file(s)

```bash
docker compose exec web npm install nodemon --save-dev
```

##### Build application after pulling the project

```bash
docker compose build
docker compose up
```

### Setting up the Database for User Login

Install **Sequelize** (ORM for Javascript):

```bash
docker compose exec web npm install sequelize --save
docker compose exec web npm install sequelize-cli --save-dev
docker compose exec web npx sequelize-cli init
```

Move the files for restructuring the project:

```bash
mv models ./app/models
mv migrations ./db/migrations
mv seeders ./db/seeders
mv config/config.json config/database.js
```

Rename the imports for `./config.json` in `./app/models/index.js`

Create `.sequelizerc` and override all the paths as mentioned above

Create `.env` and mention environment variables

Setup the `postgres` db while making changes in the `database.js` file and create a new db service in `docker-compose.yml` file

Now run:

```bash
docker compose build
docker compose up
docker compose exec db bash
```

Test your DB connection from Bash using either of the following commands:

```
>> psql -h 0.0.0.0 -U <database_user> -d <database_name>
>> psql -p <port> -U <database_user> -d <database_name> -h <hostname>
```

Create `db/helpers/init.js` file for connecting `Sequelize` to the database

Run the following command to generate the entities for the database (For example: `User` with attributes `email:string`)

```bash
docker compose exec web npx sequelize-cli model:generate --name User --attributes email:string
```

Add more attributes, change the table name by modifying the `user.js` as well as the migrations file for the respective entity and run:

```bash
npm install pg --save
docker compose exec web npx sequelize-cli db:migrate
```

Now create a new model for storing public key credentials

```bash
docker compose exec web npx sequelize-cli model:generate --name PublicKeyCredentials --attributes public_key:string
```

### Setting up Views, Controllers and Routes

Create `routes.js` file under `config/` and shift the route from `./index.js` to this file. This file will contain all the routes to be used in our application.

Inside `app/controllers/`, we'll have all the controllers that redirect to the respective views.

Inside `app/views/`, we'll have all the views for welcome, admin, login and register pages.

For views, install `ejs` and `express-ejs` :-

```bash
docker compose exec web npm install ejs express-ejs-layouts --save
```

Create `app/views/layouts/application.ejs` for the main layout of the application.

Add HTML, CSS, logos, images and other static content for the Welcome Page

_To be continued..._

### Additional Notes

- You can use **pgAdmin 4** PostgreSQL Client to connect to the database from UI
