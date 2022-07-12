∙ [English](react.md) ∙ [Español](react-es.md)

# Arquitectura Aplicación React

La arquitectura de la aplicación de React varía según el state manager que se use (Context por default o Redux como alternativa).

## Índice

1. [Arquitectura Context](#arquitectura-con-context)

    1.1 [Estructura](#estructura-del-proyecto-context)

    1.2 [Configuración](#configuración-de-react-context)

    1.3 [Componentes](#componentes-context)

    1.4 [Conexión API - Context](#conexión-api-context)

2. [Arquitectura Redux](#arquitectura-con-redux)

    2.1 [Estructura](#estructura-del-proyecto-redux)

    2.2 [Configuración](#configuración-de-react-redux)

    2.3 [Componentes](#componentes-redux)

    2.4 [Conexión API - Redux](#conexión-api-redux)


## Arquitectura con Context

![Arquitectura React](./architectureContext.png)

La arquitectura del proyecto de React con [Context](https://reactjs.org/docs/context.html) utiliza distintos 'providers' para proveer el estado a la aplicación. Esto se hace de manera global (los providers son los primeros componentes que se renderizan), pero cada componente se suscribe a los distintos contextos cuando así lo precisen. 

Los que se crean con la aplicación base son **SnackbarProvider** (para mostrar notificaciones tipo snackbar) y **RouterProvider** (que sirve para navegar con react-router).

Al crear un ABM con goten, se crea también un provider para este (Ej del gráfico: ArtistProvider), que contiene que contiene los métodos para realizar requests a la API y maneja el estado correspondiente.

### Estructura del proyecto - Context

Está dividida en las carpetas **config** (cómo se conecta al back), **layout** (componentes reutilizables), **modules** (los componentes que representan los datos del backend) y **utils** (funciones y constantes útiles, entre ellas, las funciones que se usan para conectarse a la API).

Cuando se crea un ABM, se agregan una carpeta con el nombre del ABM en **modules**, y varios archivos dentro de esta, entre ellos el correspondiente al Context.

### Configuración de React - Context

La aplicación se crea utilizando **create-react-app** (ver versión soportada en el package.json, sería la versión de react-scripts).

En la imágen se ve lo que generaría el CLI. Hay componentes de distintos colores, y funciones que se usarán en todo el proyecto.
 - **En verde**, estan los componentes que no hace falta que el usuario modifique. El componente de App y el Navbar son bastante estáticos, dado que el CLI se ocupa de generar las rutas al crear módulos, y de agregar los providers correspondientes a `index.js`. 
 - **En azul** está el componente Home. Este *tiene* que ser modificado por quién sea que use el CLI, dado que no tiene configuración alguna y está hecho puramente como relleno (que se supone necesario para todo proyecto).
 - **En rojo** está representado el provider del contexto de Router(RTC).
 - **En amarillo** está representado el provider del contexto de Snackbar(SBC).
 - **En violeta** está representado un modelo sobre el cuál se hizo el ejemplo de lo que generaría el CLI. Este módulo es de Artistas, y tiene ciertos componentes que representan el modelo definido en la base de datos. Este ejemplo tiene la siguiente forma:

```js
artista = {
    nombre: String,
}
```
Además de esto, Goten generará la configuración del backend y definirá las funciones necesarias para hacer llamados a la API (suponiendo que el backend se generó con Goten también).

Observación: Se marca con unas siglas ubicadas arriba a la derecha para indicar a qué provider se suscriben(como por ejemplo RTC para **RouterContext**), por lo que podrán utilizar sus métodos e interactuar con su estado.

### Componentes - Context

Los componentes, a grandes rasgos, se explican a continuación:

- **App**, es el componente principal de la aplicación.
  - Define un **Navbar** en el header, que tendrá botones con links a **Home** y a los *módulos* (en caso de haber). El navbar se exporta con **withRouter** para realizar la navegación.
  - También define las rutas (‘/’ -> Home, ‘/artistas’ -> ArtistaRoutes, etc).
- **RouterContext**, expone todo lo referido a Context para el routeo.
  - **RouterProvider**, proveerá el contexto del router a toda la aplicación. Se usa en el *index.js* de la aplicación.
  - **withRouting**, un HOC para exportar componentes que se quieren suscribir a todo lo que expone **RouterProvider** (state, métodos, etc.). Principalmente, al método *redirectTo*.
  - **Routed**, el componente consumer para usar en caso de no querer suscribirse a todo lo que se exporta de **RouterProvider**.
- **Snackbar** - **SnackbarContext**, componente que utiliza el snackbar de material UI para mostrar ciertos mensajes (se usa con Context de modo que sea fácil invocarlo, se evita también repetir código).
  - **SnackbarProvider**, proveerá el contexto del router a toda la aplicación. Se usa en el *index.js* de la aplicación.
  - **withNotifier**, un HOC para exportar componentes que se quieren suscribir a todo lo que expone **SnackbarProvider** (state, métodos, etc.). Principalmente, a los métodos *showSnackbar* y *closeSnackbar*.
  - **Notifier**, el componente consumer para usar en caso de no querer suscribirse a todo lo que se exporta de **SnackbarProvider**.
- **ArtistaContext**, es el archivo que contiene todo lo referido a Context para el módulo Artista. Se divide en:
  - **ArtistaProvider**, proveerá el contexto de artista a toda la aplicación. Se usa en el *index.js* de la aplicación.
  - **withArtist**, un HOC para exportar componentes que se quieren suscribir a todo lo que expone **ArtistaProvider** (state, métodos, etc.)
  - **ArtistaConsumer**, el componente consumer para usar en caso de no querer suscribirse a todo lo que se exporta de **ArtistaProvider**.
- **ArtistaRoutes**, es un componente que define todas las rutas que comienzan con ‘/artistas’. Esto se decidió separar para hacer que el agregado de rutas sea sencillo y no ‘agrande’ el componente App innecesariamente.
- **ArtistaIndex**, el componente principal del módulo Artistas.
  - Define un botón para agregar artistas (esto interactúa con Context). Esto abre un modal (**CreateArtistaModal**) que contiene un **ArtistaForm**.
  - Hace uso de *GotenPaginator* (con un **ArtistaSearcher** y un **ArtistaList**) para mostrar los resultados de la búsqueda (con o sin query params).
 - **ArtistaSearcher** define inputs según los atributos que tenga Artista (asignando los tipos correctos). Cuando se apreta buscar, esto ejecuta un llamado a la API mediante **ArtistaContext**, y cuando reciba una respuesta exitosa, la data que viene se guardará en su estado (en el atributo *artistaStore*). Lo que se guarda es el listado de todos los artistas (en el atributo *list*), y cada parámetro del paginado (*limit*, *offset* y *total*).
 - **ArtistaList** tiene un *GotenList* que está alimentado por los artistas en *artistaStore* (en Context). Los siguientes componentes son renderizados por *GotenList*:
   - **ArtistaRow**, contienen la información del Artista.
   - **EditArtistaModal**, tiene un **ArtistaForm** para editar los campos del artista seleccionado. La data del mismo se pasa por parámetro al abrir el modal.
   - **InspectArtistaModal**, tiene un **ArtistaForm** (en modo visualización) para ver los campos del artista seleccionado. La data del artista se pasa por parámetro al abrir el modal.

Para los componentes que realizan llamados a la API mediante Context, se usan promises para los distintos posibles resultados (en caso de error, se muestra el snackbar con el mensaje correspondiente).

### Conexión API - Context

La conexión a la API es sencilla, se definieron las funciones a utilizar en la carpeta `utils/api/api<Nombre_del_modulo>.js`, y desde Context lo que se hizo es un poco de lógica para el manejo del store, pero siempre usando estas funciones.

## Arquitectura con Redux

![Arquitectura React](./architectureRedux.png)

La arquitectura del proyecto en [Redux](https://es.redux.js.org) que generaría Goten es sencilla, modular y tiene incorporadas ciertas prácticas comunes y librerías como Bootstrap, Router. También usa paquetes de Goten para mostrar su fácil implementación y ventajas que provee respecto a otros.

### Estructura del proyecto - Redux

La estructura es similar a la creada con [Context](#estructura-del-proyecto-context).Está dividida en las carpetas **config** (cómo se conecta al back), **layout** (componentes reutilizables), **modules** (los componentes que representan los datos del backend), **utils** (funciones y constantes útiles, entre ellas, las funciones que se usan para conectarnos a la API) y **redux** (definición de los reducers y el store). 

Luego, para el uso de Redux se define una estructura amigable, que se llama [**‘duck’**](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be). Esta permite escalar la aplicación de forma incremental, de modo de no tener problemas con archivos grandes que contienen toda la lógica de Redux. Esta estructura se explica bien en el artículo linkeado, pero a grandes rasgos, se  tendrá una carpeta duck *para cada* módulo, que van a ser independientes unas de otras y representarán cierta funcionalidad, y en estas se encontrará lo típico de Redux (constantes de tipos, acciones y action creators, y un concepto nuevo que se llama operations).

### Configuración de React - Redux

En la imágen se ve lo que generaría el CLI. Hay componentes de distintos colores, y funciones que se usarán en todo el proyecto.
 - **En verde**, los componentes que no serán modificados (o no necesariamente) por el usuario. Lo podrá hacer, pero no haría falta ya que la configuración del snackbar y de App es bastante estática, y el CLI se ocupa de generar las rutas al crear módulos.
 - **En azul** ,el componente Home. Este *tiene* que ser modificado por quién sea que use el CLI, dado que no tiene configuración alguna y está hecho puramente como relleno (que suponemos necesario para todo proyecto).
 - **En violeta** está representado lo que sería Redux y su store. Algunos componentes estarán escuchando al store de Redux (se los marca con una pequeña cruz violeta arriba a la derecha) mientras que otros estarán haciendo dispatch para hacer pedidos a la API, o en el caso del snackbar para mostrar y cambiar su mensaje.
 - **En rojo** está representado un modelo sobre el cual se hizo el ejemplo de lo que generaría el CLI. Este módulo es de Artistas, y tiene ciertos componentes que representan el modelo definido en la base de datos. Este ejemplo tiene la siguiente forma:

```js
artista = {
    nombre: String,
  }
```
Además de esto, GotenCLI generará la configuración del backend y definirá las funciones necesarias para hacer llamados a la API (suponiendo que el backend se generó con GotenCLI también).

### Componentes - Redux

Los componentes, a grandes rasgos, se explican a continuación:
- **App**, es el componente principal de la aplicación.
 - Tiene la configuración necesaria para persistir la información de Redux entre pestañas.
 - También define un **Navbar** en el header, que tendrá botones con links a **Home** y a los *módulos* (en caso de haber), y también define las rutas (‘/’ -> Home, ‘/artistas’ -> ArtistaRoutes, etc).
 - Por último, se tiene un *Snackbar* de material UI para mostrar los errores que provienen del backend (se usa un interceptor de axios).
- **ArtistaRoutes**, es un componente que define todas las rutas que comienzan con ‘/artistas’. Esto se decidió separar para hacer que el agregado de rutas sea sencillo y no ‘agrande’ el componente App innecesariamente.
- **ArtistaIndex**, el componente principal del módulo Artistas.
 - Define un botón para agregar artistas (esto interactúa con Redux mediante una función thunk, que permite hacer varios dispatch seguidos), que abre un modal (**CreateArtistaModal**) que contiene un **ArtistaForm**.
 - Hace uso de *GotenPaginator* (con un **ArtistaSearcher** y un **ArtistaList**) para mostrar los resultados de la búsqueda (con o sin query params).
 - **ArtistaSearcher** define inputs según los atributos que tenga Artista (asignando los tipos correctos). Cuando se apreta buscar, esto ejecuta un dispatch que ejecutará el llamado a la API, y cuando reciba una respuesta exitosa, la data que viene se guardará en Redux (en la parte del store correspondiente, en este caso, artistaStore).
 - **ArtistaList** tiene un *GotenList* que está alimentado por los artistas en artistaStore (en Redux). Estos componentes son renderizados por *GotenList* en ArtistaList:
  - **ArtistaRow**, son renderizados por **ArtistaList**, y contienen la información del Artista.
  - **EditArtistaModal**, tiene un **ArtistaForm** para editar los campos del artista seleccionado. La data del artista se pasa por parámetro al abrir el modal.
  - **InspectArtistaModal**, tiene un **ArtistaForm** (en modo visualización) para ver los campos del artista seleccionado. La data del artista se pasa por parámetro al abrir el modal.


### Conexión API - Redux
El querer realizar un GET, POST, etc. a la API,se  maneja con **funciones thunk**. Estas son funciones que devuelven funciones, simplemente. Entonces, se tiene configurado el store de Redux con middlewares para que se pueda hacer un dispatch de estos thunks. ¿Para qué sirven? Para que en un mismo llamado a la API se puedan hacer varios dispatch según la respuesta. Es más cómodo que definirlas en el componente ya que queda menos acoplado el código y es más fácil de modificar. Un ejemplo sería:

```
const getArtistas = (queryParams=initialQueryParams) => (dispatch) => {
  dispatch(toggleCargandoArtistas())
  axios.get(urlApiArtistas, {...queryParams})
  .then((response) => {
    dispatch(updateArtistas(response.data))
    dispatch(toggleCargandoArtistas())
  })
  .catch((err) => {
    dispatch(errorUpdateArtistas(response.data))
    dispatch(toggleCargandoArtistas())
  })
}
```

Y luego, cuando se quiera obtener artistas, en algún método de un componente de React que esté conectado con Redux simplemente hacemos:

`dispatch(getArtistas())`


