# Teslo Shop | Una tienda en linea de ropa
> Este proyecto está inspirado en la tienda de Testa shop.tesla.com. Fue creado con el objetivo de aprender Next JS y para crear mi primer ecommerce

<hr />

## Commands

Para poder correr el proyecto en local se debe ejecutar los siguientes commandos

```bash
docker-compose up -d

yarn dev # ejecuta la aplicacion en desarrollo
```
Este levanta la imagen de docker de la base de datos y posteriormente levantar la aplicación en modo desarrollo.

* Otros comandos útiles son:

```bash
yarn build # crea el build de producción de la aplicación
yarn start # ejecuta el build de producción
```

### Variables de entorno

Renombrar el archivo __.env.template__ a __.env__ y asignarle los valores a las variables de entorno

- __MONGO_URL__: La url de la base de datos de mongo. Si es en desarrollo usamos _mongodb://localhost:27017/teslodb_.
- __JWT_SECREET_SEED__: Una frase secreta para la creación y validación de los Json Web Tokens.

<hr />

## Documentación de la API

### Datos de prueba

```bash
GET /api/seed
```

Este endpoint purga la base de datos y la llena con datos de prueba. Este endpoint no es accesible en entorno de producción

### Obtener Productos

#### Todos los productos

```bash
GET /api/products
```

Devuelve todos los productos de la base de datos

#### Por genero

```bash
GET /api/products?gender=men
```

Buscar productos por un género.

- __Params__
    * gender: `men` | `women` | `kid` | `unisex` | `all`


#### Por slug

```bash
GET /api/products/[slug]
```
Devuelve el producto que tiene el slug especificado

### Busqueda de Productos

```bash
GET /api/search/[query]
```

Busca los productos que contengan en su `titulo` o en los `tags` el `query` especificado

### Manejo de usuarios

#### Login 

```bash
POST /api/user/login
```

* __Body__
    * __email__: El email del usuario
    * __password__: El password del usuario

Realiza el login del usuario especificado

#### Register

```bash
POST /api/user/register
```

* __Body__
    * __name__: El nombre del usuario
    * __email__: El email del usuario
    * __password__: El password del usuario

Realiza el registro y login del usuario especificado

#### Validación de tokens

```bash
GET /api/user/validate-token
```


Valida el token que está en las `cookies` y crea uno nuevo

<hr />

## Developer

__Carlos Manuel González Peña__ - [_twitter_](https://twitter.com/cmglezp)