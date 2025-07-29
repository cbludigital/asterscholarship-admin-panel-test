# Serverless Scholarship Admin Dashboard 

This project provides an Express-based admin dashboard for viewing scholarship applications. The dashboard is deployed as a DigitalOcean Serverless Function using `serverless-http`.

## Deploying

1. Install dependencies within the `packages/admin_panel/admin_panel` directory using `npm install`.
2. Deploy the project with `doctl serverless deploy`. The `admin_panel` action will serve the dashboard.

## Using

Set the following environment variables for the action:

- `MONGO_URL` – connection string for MongoDB
- `SESSION_SECRET` – secret for Express sessions
- `ADMIN_USERNAME` – admin user name
- `ADMIN_PASSWORD_HASH` – bcrypt hash of the admin password

When running locally you may set `SERVE_LOCAL=1` to start an Express server with `npm start`.
