# Serverless Admin Dashboard

This project demonstrates hosting a minimal admin dashboard on DigitalOcean's App Platform using Serverless Functions. The dashboard provides a simple interface to list and create items via a serverless API.

## Deploying

1. Clone this repository.
2. Deploy with `doctl serverless deploy`. The `admin` function will be available along with the static web dashboard found in the `web` directory.

## Using

Open the deployed site in your browser. Add new items with the form at the top of the page. The page communicates with the `admin/admin` serverless action to store and retrieve items.

This code is a simplified example intended for educational use.
