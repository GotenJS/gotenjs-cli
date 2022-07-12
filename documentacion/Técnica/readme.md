🌍 ∙ [English](readme.md) ∙ [Español](readme-es.md)

# Goten CLI

**Index**
1. [Installation](#installation)  
2. [Usage](#use)  
	- 2.1 [Backend - Node](#node)  
		- 2.1.1 [Create project](#createProjectNode)  
		- 2.1.2 [Create ABM](#createABMNode)  
		- 2.1.3 [Impact migrations](#impactMigrationsNode)  
		- 2.1.2 [Create new version en la API](#versionAPI)  
	- 2.2 [Frontend - Angular and React](#frontend) 
		- 2.2.1 [Angular](#angular)
			- 2.2.1.1[Create proyecto](#createProyectoAngular)  
			- 2.2.2.2[Create ABM](#createABMAngular)
			- 2.2.2.3[Assigne Favicon](#assigFaviconAngular)
		- 2.2.2 [React](#react)
	    	- 2.2.2.1 [Create proyecto](#createProyectoReact)
	    	- 2.2.2.2[Create ABM](#createABMReact)
			- 2.2.2.3[Assigne Favicon](#assigFaviconReact)
3. [To contribute](#toContribute)

## Installation<a name="installation"></a>:

You need read access to this repository and your ssh keys must be added to your gitlab account. To install, run the following command:

```bash
$ npm install -g git+ssh://git@gitlab.cysonline.com.ar:goten/goten-cli.git
```
If you do not have write permissions on npm libs, execute the following:
```bash
$ sudo -s
$ cd /root/.ssh/
$ ln -s ~/.ssh/id_rsa ./
$ ln -s ~/.ssh/id_rsa.pub ./
```
## Use <a name="use"></a>

**Goten-CLI** creates APIs in *Node* in a simple way and frontend applications in *Angular 7* and *React*.

### Backend - Node <a name="node"></a>

#### Create project <a name="createProjectNode"></a>

To create an API, use the command *new*:

```bash
$ goten new <appName> *[options]*
```
This command will run in interactive mode. If you wish to omit this step, you have to specify the *[options]*:

options | value by default |characteristics
-- | -- | --
-p, --port \<port> | 3800 | Port where the app will be listening
-d, --database \<engine> | mongodb | Database engine
-n, --dbname \<dbname> | *name of project* | Database name
-h, --dbhost \<dbhost> | 127.0.0.1 | Database host
-P, --dbport \<dbport> | 27017 | Database port
-u, --dbuser \<dbuser> | *none* | Database user
-w, --dbpass \<dbpass> | - | Database password (only required when specifying an user)
-y, --yes | - | Default values

This command also has the following optional parameters:

***-V, --versioning*** Adds [goten-versioning](https://gitlab.cysonline.com.ar/goten/goten-versioning) to manage API's that are versioned

**Important:** Goten will not create the database. If you need to add a database to test your app, consider:
[devs-readme](devs-readme.md)

#### Create ABM<a name="createABMNode"></a>

To create all the layers related to an entity, (model, dao, service, assembler, controller, dto, filter, router), use the command ***abm***

```bash
$ goten abm <entityName> *[options]*
```
This command will run in interactive mode. If you wish to omit this step, you have to specify the *[options]*:

options | value by default | characteristics
- | - | -
-p, --property \ <propertyOption> | - | Add a property to the entity. The format of *propertyOption* is `propertyName: propertyType`. Ex: *goten new user -p name: String*. The *propertyType* depends on the type of engine selected.
-m, --migrate | - | (This command only works with SQL databases) When you finish creating the model and its migrations, it impacts them in the database.
-V, --versioning \ <versionNumber> | *name of project* | (This command only works if you are using goten-versioning) By default the models are added to the latest version of the API, this option allows you to specify in which version you want to create

# Supported databases
The supported databases depend on the type of database engine selected, in case you have selected mongo you can see the types supported by *mongoose* [here](http://mongoosejs.com/docs/schematypes.html); If you are using a relational engine you can see the types supported by *sequelize* [here](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types).
	- To create relationships of type *one to many* you must add a property of type *hasMany (Class)*. For example if you want to create a *one to many* relationship between *Face* and *Eye* you need to add

```bash
$ goten abm Face -p "eye: hasMany(Eye)"
```
#### Impact migrations<a name="impactMigrationsNode"></a>
To impact the *migrations* in the database, use **migrate**
```bash
$ goten migrate   
```
\* *This command only works on SQL engines*

#### Create new version in the API<a name="versionarAPI"></a>

To create a new version of the API, the command must be executed
```bash
$ goten version
```

\* This command only works if the goten-versioning plugin is being used

## Frontend - Angular and React <a name="front"></a>

### Angular<a name="angular"></a>

#### Create project <a name="createProjectAngular"></a>

To create a new SPA use ***new-angular***

```bash
$ goten new-angular <appName> *[options]*
```

This command will start the application in interactive mode, asking for a configuration parameter for the app:
        - Address of the api to consume

If you want to omit the interactive mode you must specify the *[options]*

options | characteristics
-- | --
-a, --api | Specify the host: port where the app will consume.
-p, --primary | Default color is: blue
-d, --danger | Default color is: red
-s, --success | Default color is: green
-i, --info | Default color is: cyan
-w, --warning | Default color is: yellow
-S, --secondary | Default color is: gray

Run the generated app
```bash
$ cd <appName>
$ npm install
$ npm start
```
#### Create ABM<a name="crearABMAngular"></a>

To create all the layers referring to an entity (dto, filter, response, service, routes, components and the corresponding tab), use **abm-angular**.

```bash
$ cd <appName>
$ goten abm-angular <entityName> *[options]*
```
When executing the previous one, an interactive mode is launched that allows you to add native types and custom types.

The native types are:
- Boolean.
- Number.
- String.
- Date.

To add custom types in the interactive mode, *goten* will request the type of the property using the tag *Other*. This will offer the options *Array* and *Custom* (if you choose *Array* you must specify its type, allowing any native or *Custom* types).
When choosing the type *Custom*, *goten* will request the name of the class that wants to be generated. Once all the properties of **ABM** have been specified, *goten* will ask the user to define properties for each *Custom* type entered by the user.

If you want to omit the interactive mode, you must specify the following parameters:

options | parameter | characteristics
- | - | -
-p, --prop | **propOption** | Add a property with the specified format.
-i, --prop | **internalModelOption** | Add a property with a customized type.

**propOption** must respect the format `propertyName: propertyType`.
**internalModelOption** must respect the format `customPropertyType.propertyName: propertyType`.

Examples:
```bash
$ goten abm-angular artist -p name:String -p disc:Disc -i Disc.name:String
```
```bash
$ goten abm-angular artist -p name:String -i Disc.name:String
```
In this last example, the definition of *disc* is implicit for an artist when defining *Disc.name* .

#### Assign Favicon <a name="assignFaviconAngular"> </a>

To assign a favicon in the browser of the SPA generated, must execute the following command:

```
bash
$ cd <appName>
$ goten favicon <path_imagen>
```
For the execution to be successful, it must be considered that:
- Size: Do not exceed 1000x1000 px.
- Acceptable formats: ICO, JPG, JPEG and PNG.

### React<a name="react"></a>

#### Create project <a name="createProjectReact"></a>

To create a new project with react, use the command *new-react*:

```bash
$ goten new-react <appName> *[options]*
```
This command will run in interactive mode. If you wish to omit this step, you have to specify the *[options]*:

options | characteristics
- | -
-a, --api | Modal properties
-y, --yes | Url of the api defined by default ("localhost: 3800")
-r, --redux | Architecture with redux

#### Create ABM <a name="createABMReact"></a>

To add modules,use the command :

```bash
$ cd <appName>
$ goten abm-react <entityName> *[options]*
```
When executing the previous one, an interactive mode is launched that allows us to add native types and custom types.

The native types are:
- Boolean.
- Number.
- String.
- Date.

To add custom types in the interactive mode, *goten* will request the type of the property using the tag *Other*. This will offer the options *Array* and *Custom* (if you choose *Array* you must specify its type, allowing any native or *Custom* types).
When choosing the type *Custom*, *goten* will request the name of the class that wants to be generated. Once all the properties of **ABM** have been specified, *goten* will ask the user to define properties for each *Custom* type entered by the user.

If you want to omit the interactive mode, you must specify the following parameters:

options | parameter | characteristics
- | - | -
-p, --prop | **propOption** | Add a property with the specified format.
-i, --prop | **internalModelOption** | Add a property with a customized type.

**propOption** must respect the format `propertyName: propertyType`.
**internalModelOption** must respect the format `customPropertyType.propertyName: propertyType`.

Examples:
```bash
$ goten abm-react artist -p name:String -p disc:Disc -i Disc.name:String
```
```bash
$ goten abm-react artist -p name:String -i Disc.name:String
```
In this last example, the definition of *disco* is implicit for an artist when defining *Disc.name* .

#### Assign Favicon <a name="assignFaviconReact"> </a>

To assign a favicon in the browser of the SPA generated,must execute the following command:

```
bash
$ cd <appName>
$ goten favicon <path_imagen>
```
For the execution to be successful, it must be considered that:
- Size: Do not exceed 1000x1000 px.
- Acceptable formats: ICO, JPG, JPEG and PNG.

### How to contribute to the project <a name="toContribute"> </a>
See [contributing](contributing.md)
