# **GitHub User Explorer** - Guía de Uso

Con **GitHub User Explorer**, puedes explorar fácilmente información sobre usuarios de GitHub y guardar tus selecciones favoritas de usuarios en una base de datos local.

## **Interfaz de Usuario**

### **Características Principales**

1. Búsqueda de usuarios de GitHub utilizando el API oficial.
2. Visualización de los primeros 10 resultados con nombre de usuario e ID.
3. Acceso directo al perfil de cada usuario.
4. Visión detallada del usuario seleccionado con imagen y otros datos.
5. Parámetros de búsqueda ajustables.
6. Gráfica interactiva de seguidores de los usuarios mostrados.
7. Notificaciones integradas para una mejor experiencia del usuario.

### **Cómo Empezar**

1. Descarga el código fuente.
2. Accede al directorio "front" en tu copia local.
3. Prepara tu ambiente:

   ```
   npm install
   ```

4. Configura las variables de entorno.
5. Inicia la interfaz:

   ```
   npm preview
   ```

6. Abre en tu navegador: <http://localhost:3000>.

### **Herramientas Implementadas**

- Interfaz basada en React
- Consultas GraphQL con Urql
- Enrutamiento con Wouter
- Estado con Zustand
- Construcción y desarrollo con Vite
- Tipos con TypeScript
- Estilo con Tailwind CSS
- Validación de código con ESLint

## **Servicio Backend**

### **Funcionalidades**

1. Almacena selecciones de usuarios.
2. Accede a usuarios almacenados en la base de datos.
3. Cumple con estándares de desarrollo y seguridad.
4. Soporta consultas HTTP RESTful y GraphQL.

### **Puesta en Marcha**

1. Ve al directorio "backend".
2. Instala las dependencias:

   ```
   npm install
   ```

3. Arranca el servicio:

   ```
   npm preview
   ```

4. Abre en tu navegador: <http://localhost:4000> o para GraphQL <http://localhost:4000/graphql>.

### **Tecnologías En Uso**

- Servicio en Node.js
- Base de datos con PostgreSQL
- ORM con Prisma
- GraphQL con Apollo Server
- Pruebas con uvu y testdouble

## **Pruebas en Entorno Local**

Para probar **GitHub User Explorer** en tu máquina, sigue los pasos en las secciones de Interfaz de Usuario y Servicio Backend.

Adicionalmente, para pruebas del backend:

```
npm run test
```

Si prefieres utilizar Docker, simplemente utiliza el archivo docker-compose.yml:

``` 
docker-compose up
