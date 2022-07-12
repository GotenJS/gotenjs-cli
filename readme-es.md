🌍 ∙ [English](readme.md) ∙ [Español](readme-es.md)

# Goten CLI

**Índice**   
1. [Instalación](#instalacion)  
2. [Uso](#uso)  
	- 2.1 [Backend - Node](#node)  
		- 2.1.1 [Crear proyecto](#crearProyectoNode)  
		- 2.1.2 [Crear ABM](#crearABMNode)  
		- 2.1.3 [Impactar migrations](#impactarMigrationsNode)  
		- 2.1.2 [Crear nueva versión en la API](#versionarAPI)  
	- 2.2 [Frontend - Angular y React](#frontend) 
		- 2.2.1 [Angular](#angular)
			- 2.2.1.1[Crear proyecto](#crearProyectoAngular)  
			- 2.2.2.2[Crear ABM](#crearABMAngular)
			- 2.2.2.3[Asignar Favicon](#asignacionFaviconAngular)
		- 2.2.2 [React](#react)
	    	- 2.2.2.1 [Crear proyecto](#crearProyectoReact)
	    	- 2.2.2.2[Crear ABM](#crearABMReact)
			- 2.2.2.3[Asignar Favicon](#asignacionFaviconReact)
3. [Contribuir](#contribuir)

## Instalación<a name="instalacion"></a>:

Chequear que se cuenta con permisos de lectura sobre el repositorio y que las claves ssh estén agregadas a gitlab, luego ejecutar:

```bash
$ npm install -g git+ssh://git@gitlab.cysonline.com.ar:goten/goten-cli.git
``` 
En caso de no tener permiso de escritura sobre las libs de npm ejecutar lo siguiente
```bash
$ sudo -s
$ cd /root/.ssh/
$ ln -s ~/.ssh/id_rsa ./
$ ln -s ~/.ssh/id_rsa.pub ./
```
## Uso <a name="uso"></a>

**Goten-cli** crear APIs en *node* de forma sencilla y aplicaciones de frontend en *angular7* y *react*.

## Backend - Node <a name="node"></a>

#### Crear proyecto <a name="crearProyectoNode"></a>

Para crear una api debe ejecutarse el comando *new*:

```bash
$ goten new <appName> *[options]*
```
Este comando iniciará la aplicación en modo interactivo pidiendo los parámetros de configuración para la app.
En caso de querer omitir el modo interactivo se debe especificar las *[options]*

options | value by default |características
-- | -- | --
-p, --port \<port> | 3800 |puerto en el que escuchará la app 
-d, --database \<engine> | mongodb |motor de base de datos
-n, --dbname \<dbname> | *name of project* |nombre de la base de datos
-h, --dbhost \<dbhost> | 127.0.0.1 |host de la base de datos
-P, --dbport \<dbport> | 27017 |puerto de la base de datos
-u, --dbuser \<dbuser> | *none* |usuario de la base de datos
-w, --dbpass \<dbpass> | - |password de la base de datos (Sólo si se ingresó un usuario)
-y, --yes | - | valores por default

Posee además el siguiente parámetro adicional:  
***-V, --versioning*** Agrega el plugin de [goten-versioning](https://gitlab.cysonline.com.ar/goten/goten-versioning) para el manejar versionado en la API.

**Importante:** Goten no creará la base de datos. Si se necesita incorporar una base de datos para hacer pruebas considerar:
[devs-readme-es](devs-readme-es.md)

#### Crear ABM<a name="crearABMNode"></a>

Crea todas las capas referentes a una entidad, es decir, model, dao, service, assembler, controller, dto, filter, router.

```bash
$ goten abm <entityName> *[options]*
```
Este comando iniciará en modo interactivo. En caso de querer omitir el modo interactivo se deben especificar las *[options]*

options | value by default |características
-- | -- | --
-p, --property \<propertyOption> | - | Agrega una property a la entidad. El formato de *propertyOption* es `propertyName:propertyType`. Ej: *goten new usuario -p nombre:String*. Las *propertyType* dependen del tipo de motor seleccionado.
-m, --migrate | - | (Este comando solo sirve con bases SQL) Al terminar de crear el modelo y sus migraciones las impacta en la base de datos.
-V, --versioning \<versionNumber> | *name of project* | (Este comando solo sirve si se esta utilizando goten-versioning) Por defecto los modelos se agregan a la última versión de la API, esta opción permite especificar en que versión desea crearse

# Tipos de base de datos soportados
- mongo: ver los tipos soportados por *mongoose* [aquí](http://mongoosejs.com/docs/schematypes.html);
- mysql: ver los tipos soportados por *sequelize* [aquí](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types).
	- Para crear relaciones del tipo *one to many* se debe agregar una property del tipo *hasMany(Class)*. Por ejemplo si se quiere crear una relación *one to many* entre *Cara* y *Ojo* es necesario agregar
```bash
$ goten abm Cara -p "ojos: hasMany(Ojo)"
```

#### Impactar migrations<a name="impactarMigrationsNode"></a>

Para impactar las *migrations* en la base de datos se debe ejecutar el comando ***migrate***
```bash
$ goten migrate   
```
\* *Este comando solo funciona sobre motores SQL*

#### Crear nueva versión en la API<a name="versionarAPI"></a>

Para crear una nueva versión de la API, se debe ejecutar el siguiente comando
```bash
$ goten version
```
\* Este comando solo funciona si se esta utilizando el plugin goten-versioning

## Frontend - Angular y React <a name="front"></a>

## Angular<a name="angular"></a>

#### Crear proyecto <a name="crearProyectoAngular"></a>

Para crear una nueva SPA en angular debe ejecutarse el comando *new-angular*:
```bash
$ goten new-angular <appName> *[options]*
```

Este comando iniciará la aplicación en modo interactivo, pidiendo un parámetro de configuración para la app:
        - direccion de la api a consumir

En caso de querer omitir el modo interactivo se debe especificar las *[options]*

options | características
-- | --
-a, --api | especifica el host:port de donde consumirá la app.
-p, --primary | color por defecto es: azul
-d, --danger | color por defecto es: rojo
-s, --success | color por defecto es: verde
-i, --info | color por defecto es: cian
-w, --warning | color por defecto es: amarillo
-S, --secondary | color por defecto es: gris

Ejecutar la app esqueleto generada
```bash
$ cd <appName>
$ npm install
$ npm start
```
#### Crear ABM<a name="crearABMAngular"></a>

Para crear todas las capas referentes a una entidad, es decir, dto, filter, response, service, routes, componentes y el tab corresponidiente, se debe ejecutar el comando

```bash
$ cd <appName>
$ goten abm-angular <entityName> *[options]*
```

Al ejecutar el anterior se lanza un modo interactivo que nos posibilita añadir tipos nativos y tipos custom.

Los tipos nativos son:
- Boolean
- Number
- String

Para añadir tipos custom en el modo interactivo *goten* solicitará el tipo de la property mediante la etiqueta *Other*, esto ofrecerá las opciones *Array* y *Custom* (si se elige *Array* se debera especificar el tipo del mismo, pudiendo ser cualquier tipo nativo o *Custom*). Al elegir el tipo *Custom* *goten* solicitará el nombre de la clase que quiere generarse. Una vez indicadas todas las properties del **ABM** *goten* pedirá que se indiquen las properties de todos los tipos *Custom* ingresados por el usuario.

En caso de querer omitir el modo interactivo se debe especificar los siguientes parámetros:

options | parámetro | características
-- | -- | --
-p, --prop | **propOption** | agrega una property con el formato especificado.
-i, --prop | **internalModelOption** | agrega una property con un tipo customizado.

**propOption** debe respetar el formato `propertyName:propertyType`.

**internalModelOption** debe respetar el formato `customPropertyType.propertyName:propertyType`.

Ejemplos
```bash
$ goten abm-angular artista -p nombre:String -p disco:Disco -i Disco.nombre:String
```
```bash
$ goten abm-angular artista -p nombre:String -i Disco.nombre:String
```
En este último ejemplo es implícita la definición de *disco* para un artista al definir *Disco.nombre*

#### Asignar Favicon <a name="asignacionFaviconAngular"></a>

Si se quiere asignar un favicon en el browser de la SPA generada, se debe ejecutar el siguiente comando:

```bash
$ cd <appName>
$ goten favicon <path_imagen> 
```
Para que la ejecución sea exitosa se debe considerar que:
- Tamaño: No supere 1000x1000 px.
- Formatos aceptados: ICO, JPG, JPEG y  PNG. 

## React<a name="react"></a>

#### Crear proyecto <a name="crearProyectoReact"></a>

Para crear una nueva SPA debe ejecutarse el comando *new-react*:
```bash
$ goten new-react <appName> *[options]*
```

Este comando iniciará la aplicación en modo interactivo.En caso de querer omitirlo,se debe especificar las *[options]*

options | características
-- | --
-a, --api | propiedades del modal
-y, --yes | url de la api definida por defecto ("localhost:3800")
-r, --redux | arquitectura con redux

#### Crear ABM <a name="crearABMReact"></a>

Si queremos agregar módulos, podemos hacerlo ejecutando el siguiente comando:

```bash
$ cd <appName>
$ goten abm-react <nombre_abm> *[options]*
```
Al ejecutar el anterior se lanza un modo interactivo que nos posibilita añadir tipos nativos y tipos custom.

Los tipos nativos son:
- Boolean
- Number
- String
- Date

Para añadir tipos custom en el modo interactivo *goten* solicitará el tipo de la property mediante la etiqueta *Other*, esto ofrecerá las opciones *Array* y *Custom* (si se elige *Array* se debera especificar el tipo del mismo, pudiendo ser cualquier tipo nativo o *Custom*). Al elegir el tipo *Custom* *goten* solicitará el nombre de la clase que quiere generarse. Una vez indicadas todas las property del **ABM**, *goten* pedirá que se indiquen las de todos los tipos *Custom* ingresados por el usuario.

En caso de querer omitir el modo interactivo se debe especificar los siguientes parámetros:

options | parámetro | características
-- | -- | --
-p, --prop | **propOption** | agrega una property con el formato especificado.
-i, --prop | **internalModelOption** | agrega una property con un tipo customizado.

**propOption** debe respetar el formato `propertyName:propertyType`.

**internalModelOption** debe respetar el formato `customPropertyType.propertyName:propertyType`.

Ejemplos
```bash
$ goten abm-react artista -p nombre:String -p disco:Disco -i Disco.nombre:String
```
```bash
$ goten abm-react artista -p nombre:String -i Disco.nombre:String
```
En este último ejemplo es implícita la definición de *disco* para un artista al definir *Disco.nombre*

#### Asignar de Favicon <a name="asignacionFaviconReact"></a>

Si se quiere asignar un favicon en el browser de la SPA generada, se debe ejecutar el siguiente comando:

```bash
$ cd <appName>
$ goten favicon <path_imagen> 
```
Para que la ejecución sea exitosa se debe considerar que:
- Tamaño: No supere 1000x1000 px.
- Formatos aceptados: ICO, JPG, JPEG y  PNG.

### Cómo contribuir al proyecto <a name="contribuir"></a>

Ver [Contribuir](contributing-es.md)
