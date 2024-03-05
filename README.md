This repository should support the website [logicgraph.dev](https://logicgraph.dev/). 

Deployment process: (this should eventually be part of a CI/CD pipeline, but right now let's just do it manually)

* Open AWS Lightsail, go to Containers, and select the container service (or create a new one).
* Create an initial deployment or modify an existing deployment
* Paste in the link to the Docker image (with the correct commit tag!) from the GitHub Container Registry.
* Enter environment variables DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT. (assuming PostgreSQL database is already set up)
* Run it!
