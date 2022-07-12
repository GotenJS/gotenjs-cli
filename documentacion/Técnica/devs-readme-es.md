🌍 ∙ [English](devs-readme.md) ∙ [Español](devs-readme-es.md)

# Goten CLI - Devs

Necesitas:

- Ubuntu
- git
- node y npm (version > 10) (si no se usa docker)

Opcional:

- docker y docker-compose.

Para desarrollar y usar Goten recomendamos hacerlo con docker. Esto lo podemos hacer ejecutando:

```bash
$ git clone git@gitlab.cysonline.com.ar:goten/goten-cli.git
$ cd goten-cli
$ docker-compose up -d            // Este comando levanta los contenedores, pueden verse en el archivo docker-compose.yml.
$ docker exec -it goten-cli bash  // Se ingresa dentro del contenedor 'goten-cli' con 'bash'.
$ npm link                        // Pone las dependencias locales en modo global, de esta manera es reconocido el comando 'goten'
```

Una vez dentro del contenedor podrás usar Goten. 

```bash
root@goten-cli:$ goten --help
```

Con el docker-compose conectamos los distintos containers que tienen bases de MySQL y MongoDB, por lo que nos podemos conectar desde el container de goten-cli.
Ver [docker-compose.yml](docker-compose.yml)

Si no querés usar docker, tenemos que tener en cuenta que necesitarás tener ciertas dependencias instaladas, como por ejemplo, para hacer un backend con una base de MySQL, debemos tener esta base instalada y corriendo en algún puerto.