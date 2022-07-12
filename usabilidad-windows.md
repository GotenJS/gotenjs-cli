# Goten-cli en Windows 

Para poder desarrollar es necesario tener previamente clonado el repositorio. Se puede realizar ejecutando el siguiente comando: 

```
$ git clone git@gitlab.cysonline.com.ar:goten/goten-cli.git
```

## Usabilidad sin Docker

### Requisitos

 Instalación de :
- Node y Npm: versión > 10
- Angular CLI: versión 7.3.8
- React: versión 3.3.0
- Bases de datos: MySQL, MongoDB y MariaDB.

### Observaciones

- Tener en cuenta que, si bien la usabilidad es la misma que los demás sistemas operativos, los tiempos de instalación/ejecución son más lentos.

## Usabilidad con Docker

### Requisitos:

Para poder desarrollar, es necesario instalar previamente Docker(compatible únicamente con Windows10 Pro y Enterprise) y verificar :

El archivo **“docker-compose.yml”** :
- Volúmenes:  ubicación correcta de los paths.

### Permisos: 
Ser el [**Administrador** local](https://gitlab.cysonline.com.ar/imasd/docker/blob/master/Instalacion/requisitos-windows.md) del **Equipo** y grupo **docker-user**. Una vez ya configurado el entorno, utilizar igual que en Linux.

### Usabilidad

```
$ cd goten-cli
$ docker-compose up -d            // Levantar los contenedores visualizados en docker-compose.yml.
$ docker exec -it goten-cli bash  // Ingresar dentro del contenedor 'goten-cli' con 'bash'.
$ npm link                        // Poner las dependencias locales en modo global para reconocer el comando 'goten'
```
Una vez dentro del contenedor, se podrá usar Goten. 

```
bash
root@goten-cli:$ goten --help
```
El docker-compose conecta los distintos containers que tienen bases de MySQL y MongoDB al container de goten-cli.
Ver [docker-compose.yml](docker-compose.yml)

### Observaciones:
- Ejecutar todos los comandos desde el *powershell*  para asegurarse de que se concrete correctamente. 
- Bug de Windows: Al momento de ejecutar algún comando y se “cuelgue” la consola, apretar 2 veces cualquier tecla que no sea enter.

### Errores posibles:

- No permite bindear los puertos: la causa es la falta de algunos de los permisos mencionados anteriormente o el mal direccionamiento del puerto local al puerto del contenedor.

- Montaje de volúmenes en docker-compose.yml : 

```
 ~/.ssh/:/root/.ssh/ → Las claves no se alojan en dicho lugar. 
 /etc/timezone:/etc/timezone  → En Windows no existe.
```