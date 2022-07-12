🌍 ∙ [English](devs-readme.md) ∙ [Español](devs-readme-es.md)

# Goten CLI - Devs

You will be needing:

- Ubuntu.
- git.
- If you don't use docker: node and npm (version > 10).

Optional:

- docker y docker-compose.

```bash
$ git clone git@gitlab.cysonline.com.ar:goten/goten-cli.git
$ cd goten-cli
$ docker-compose up -d              # This command creates and runs the containers, their configuration can be seen in the docker-compose.yml file.
$ docker exec -it goten-cli bash    # With this command we execute an interactive shell on the container
$ npm link                          # Links the local package (in this case, goten-cli) to the container's npm global dependencies, so we can use it anywhere inside it.
```

Once inside the container you can use Goten.

```bash
root@goten-cli:$ goten --help
```

In the docker-compose file we connect the containers that have the different databases installed (MySQL and MongoDB) to the goten-cli container. This way, we interact between them.
See [docker-compose.yml](docker-compose.yml)

In case you don't want to use docker, you should keep in mind that there are certain dependencies you need to install (for instance, MySQL in your computer in case you want to create a backend project).