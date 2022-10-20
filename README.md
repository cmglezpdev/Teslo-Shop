# Teslo Shop | Una tienda en linea de ropa
> Este proyecto está inspirado en la tienda de Testa shop.tesla.com. Fue creado con el objetivo de aprender Next JS y para crear mi primer ecommerce


## Commands

Para poder correr el proyecto en local se debe ejecutar los siguientes commandos

```bash
docker-compose up -d

yarn dev # or npm run dev
```
Este levanta la imagen de docker de la base de datos y posteriormente levantar la aplicación en modo desarrollo.

* Otros comandos útiles son:

```bash
yarn build # crea el build de producción de la aplicación
yarn start # ejecuta el build de producción
```

## Documentación de la API

### Datos de prueba

```bash
GET /api/seed
```

Este endpoint purga la base de datos y la llena con datos de prueba. Este endpoint no es accesible en entorno de producción

### Obtener Productos

* Todos los productos

```bash
GET /api/products
```

Este endpoint devuelve todos los productos de la base de datos

* Por genero

```bash
GET /api/products?gender=men
```

También se puede buscar un producto por el género. Los generos admitidos son [`men`, `women`, `kid`, `unisex`, `all`]. Este ultimo hace lo mismo que si no le mandaras un parámetro

* Por slug

```bash
GET /api/products/<slug>
```
Este endpoint devuelve el producto que tiene el slug especificado

### Busqueda de Productos

```bash
GET /api/search/<query>
```

Este endpoint busca los productos que contengan en su `titulo` o en los `tags` el query especificado

## Developer

Carlos Manuel González Peña - [twitter](https://twitter.com/cmglezp)