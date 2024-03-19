This repository should support the website [logicgraph.dev](https://logicgraph.dev/).

Credit to the tutorial [here](https://www.youtube.com/watch?v=mScd-Pc_pX0) for helping me set up this Django project.

To deploy to AWS Lightsail:
* Create an AWS Lightsail instance.
* Create a postgres database in AWS Lightsail.
* Copy-and-paste the compose.yaml file into the server.
* Edit the .env file to be reasonable (pull the right images, DB_NAME should be "postgres", DB_HOST should be the long address).
* Install docker with yum.
* Install docker compose manually for all users (important for permissions reasons): https://docs.docker.com/compose/install/linux/#install-the-plugin-manually
* Run "sudo docker compose up"
* Everything should be good to go!
