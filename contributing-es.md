🌍 ∙ [English](contributing.md) ∙ [Español](contributing-es.md)

# Contribuir a Goten

Incentivamos a la participación en Goten, y nos encantaría que contribuyas a su crecimiento. Por esto te pedimos que leas atentamente cómo hacerlo:

1. [Levantar una issue](#levantarIssue)
	- 1.1 [Reportar bug](#reportarBug)
	- 1.2 [Solicitar feature](#solicitarFeature)
2. [Resolver una issue](#resolverIssue)
3. [En qué contribuir](#enQueContribuir)
4. [Ambiente para devs](#ambienteDevs)


## Levantar una issue<a name="levantarIssue"></a>

Para levantar una issue es necesario seguir ciertas especificaciones según si es un **bug** o si es un **feature**.

### Reportar un bug<a name="reportarBug"></a>

Si encontraste un **bug** en Goten no dudes en reportarlo. Podes hacerlo levantando una issue, para hacerlo seguí las especificaciones:

1. Creá una nueva issue en el repositorio del proyecto correspondiente.
2. Agregá a esta issue los labels correspondientes, para que se pueda identificar más fácilmente de qué trata. Podes ver los labels [acá](https://gitlab.cysonline.com.ar/goten/goten-cli/labels). Para los **bug**, pedimos que se ponga el label `bugs/fixes` y cualquier otro que corresponda.
3. Describí el **bug**!

¿Cómo describo el **bug**?

Es importante que se de una buena descripción a la hora de reportar el error que hayas encontrado. Esto es para que podamos reproducir el **bug**, encontrarlo y arreglarlo.
Pedimos que por lo menos se tengan en cuenta las siguientes cosas a poner en la descripción:

- **Ambiente**: especificar el ambiente en el que se estaba trabajando a la hora de encontrar el **bug**. Esto es especificar el sistema operativo utilizado, si se estaba corriendo con docker, con qué versión de goten se trabajaba y cualquier otra cosa que se crea necesario.
- **Procedimiento**: procedimiento con el que se llegó al **bug**. Una lista de pasos a hacer para poder llegar al **bug** que se encontró. Por ejemplo los comandos que se corrieron.
- **Errores**: pedimos el output de la consola con los errores que se generaron.
- **Salida esperada**: por último se pide la salida esperada, esto es para entender mejor qué esperabas como resultado en la salida de lo que estabas haciendo. De esta manera nos aseguramos de arreglar el **bug** de forma que conforme lo que esperabas hacer.

### Solicitar un feature<a name="solicitarFeature"></a>

Si te interesa un **feature** para Goten podes levantar una issue para que se revise. Para hacerlo te pedimos que sigas las especificaciones:

1. Creá una nueva issue en el repositorio del proyecto correspondiente.
2. Agrega a este issue los labels correspondientes, para que se pueda identificar más fácilmente de qué trata. Podes ver los labels [acá](https://gitlab.cysonline.com.ar/goten/goten-cli/labels). Para los **features** pedimos que se ponga el label `feature` y cualquier otro que corresponda.
3. Describí el **feature**! Es importante que lo describar lo mejor posible, así entendémos el porqué te es importante tener este **feature** o porqué te interesa y se trabaja hacia lo que se quería.

## Resolver una issue<a name="resolverIssue"></a>

1. Creá una branch con el nombre `<#issue>-<nombre-de-issue>` que salga de master.
2. Resolvé el issue en esa branch creada. Al momento de hacer la resolución tené en cuenta que tu código siga el formato de Goten.
3. Una vez resuelto y antes de hacer el pull request, corré los tests de goten, para verificar que todo ande como debería.
4. Ahora sí podes hacer el pull request, verificá que sea para mergear a master. No es necesario que asignes a nadie al PR. Una vez hecho esperá por correcciones o la aceptación del mismo.


## En qué contribuir?<a name="enQueContribuir"></a>

- Encontrá un [bug reproducible](https://gitlab.cysonline.com.ar/goten/goten-cli/issues?scope=all&utf8=%E2%9C%93&state=opened&label_name[]=bugs%2Ffixes) en las issues o un [feature a implementar](https://gitlab.cysonline.com.ar/goten/goten-cli/issues?scope=all&utf8=%E2%9C%93&state=opened&label_name[]=feature).

## Ambiente para devs <a name="ambienteDevs"></a>
Ver [devs-readme-es](devs-readme-es.md)
