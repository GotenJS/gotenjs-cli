# Autenticación mediante el comando goten auth

Goten provee el comando **goten auth** para agregar la autenticación con JWT y permisos basados en roles/atributos.

### Desde el Backend

### Requisitos

- Crear un proyecto en Node.
- Elegir la base de datos: MySQL, MongoDB o MariaDB.

(ver [README](readme-es.md))

### Manejo de Usuarios

 - Dentro de la carpeta del proyecto, ejecutar:
  ```
    $ goten auth 
    $ npm start
  ```

 - Luego de ejecutar los comandos, se puede utilizar la API de usuarios (por ejemplo, desde **Postman**) : 

    **Para creación de usuarios**

    - POST a *localhost:3800/auth* 
      ```
      Body (Formato JSON) 
      { "username":"masdediezcaracteres",
        "password":"masdediezcaracteres"
      }
      ```
      *Observación: La password debe tener más de diez caracteres y tanto el username como la password ser alfanuméricos.*

    **Para Login**

    - POST a *localhost:3800/auth/login*
      ```
      Body (Formato JSON) 
      { "username":"masdediezcaracteres",
        "password":"masdediezcaracteres"
      }
      ```
     *Observación: Si los datos son incorrectos : status 401*

     **Ver Usuarios**

    - GET a *localhost:3800/auth*

      ```
      Muestra el listado de usuarios en Formanto JSON.
      ```
    **Ver un Usuario Específico**

    - GET a *localhost:3800/auth/#idusuario*

      ```
      Muestra un usuario específico en Formanto JSON.
      ```
    **Modificar un Usuario Específico**

    - PUT a *localhost:3800/auth/#idusuario*
    
    ```
      Body (Formato JSON) 
      { "username":"modificacion",
        "password":"modificacion"
      }
    ```
     *Observación: Se puede modificar el username y/o la contraseña*

### Desde el Frontend 

Una vez ya creado el usuario en el backend, crear un proyecto en la tecnología deseada (*Angular/React*). 

- Dentro de la carpeta del proyecto, ejecutar:
    ```
    $ goten auth-<tecnología>
    $ npm start
    ```
En la pantalla principal aparece la pantalla corresponiente al *Login* para ya ingresar el username y el password generados desde el backend.
