# Prueba Técnica - GitHub User Explorer

Esta es una prueba técnica para crear una aplicación utilizando tecnología de React y un servicio en Node.js para explorar información de usuarios de GitHub y guardar selecciones de usuarios en una base de datos local.

## Frontend

### Requisitos Funcionales

1. La aplicación debe permitir la búsqueda de usuarios de GitHub utilizando el API público de GitHub.
2. Mostrar los primeros 10 usuarios del resultado de búsqueda con su nombre de usuario y su ID.
3. Cada perfil de usuario debe ser un enlace para navegar a una ruta con la propiedad 'user.login' como parámetro.
4. Crear un componente independiente para leer el parámetro de la URL y obtener los datos del usuario utilizando el API de GitHub.
5. Mostrar la imagen del usuario ('avatar_url') y otra información relevante en el componente.
6. Validar que el texto de búsqueda sea de al menos 4 caracteres y que no permita buscar la palabra "doublevpartners".
7. Integrar una librería de gráficos para mostrar un gráfico de barras con el número de seguidores de los 10 primeros usuarios.
8. Incluir un componente para mostrar mensajes de error en toda la aplicación.

### Instrucciones de Ejecución

1. Clonar este repositorio en tu máquina local.
2. Ir al directorio "frond" dentro del repositorio clonado.
3. Instalar las dependencias usando el siguiente comando:

   ```
   npm install
   ```

4. Crear un archivo ".env" con base al .env.example.

5. Iniciar la aplicación con el siguiente comando:

   ```
   npm preview
   ```

6. La aplicación estará disponible en <http://localhost:3000>.

### Tecnologías Utilizadas

- React y ReactDOM para construir interfaces de usuario
- Urql para manejar las consultas GraphQL
- Wouter para el enrutamiento
- Zustand para el manejo del estado
- Vite para el desarrollo y la construcción
- TypeScript para añadir tipos estáticos al código
- ESLint con varios plugins para la comprobación de la calidad del código
- Tailwind CSS para el diseño

## Backend

### Requisitos Funcionales

1. Crear un endpoint en Node.js para guardar la selección de un usuario mediante un botón de "Exportar".
2. El servicio debe guardar el usuario en una base de datos local.
3. Crear un segundo endpoint para consultar el listado de usuarios guardados en la base de datos.
4. Utilizar un ORM para la base de datos relacional (por definir: MySQL, Postgres, etc.).
5. Exponer el servicio mediante HTTP RESTful (valorable: GRPC y GraphQL).
6. Aplicar las mejores prácticas de desarrollo, como validaciones de inputs, manejo de excepciones, etc.

### Instrucciones de Ejecución

1. Ir al directorio "backend" dentro del repositorio clonado.

2. Instalar las dependencias usando el siguiente comando:

   ```
   npm install
   ```

3. Iniciar el servicio con el siguiente comando:

   ```
   npm preview
   ```

4. El servicio estará disponible en <http://localhost:4000>.

5. Para acceder a las consultas de GraphQL, ir a <http://localhost:4000/graphql>.

### Tecnologías Utilizadas

- Node.js
- PostgreSQL
- Prisma
- Apollo Server
- GraphQL
- uvu
- testdouble

## Cómo Probar en Local

Para ejecutar la aplicación en local o modo desarrollo y los test ir al repositorio clonado y en sus subcarpetas de frontend y backend ejecutar con los comandos:

```
npx prisma generate && npm run dev
```

```
npm run test
```

Tamibén se puede ejecutar usando el docker-compose.yml que se encuentra en la raíz del repositorio con el comando:

```
docker-compose up
```

## Cómo Probar en Producción

Para ejecutar la aplicación en producción ir al repositorio clonado y en sus subcarpetas de frontend y backend ejecutar con los comandos:

```
npm run build
```

```
npm run start
```


