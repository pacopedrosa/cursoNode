- [1. Introducción a Node.js](#1-introducción-a-nodejs)
  - [1.1 ¿Qué es Node.js?](#11-qué-es-nodejs)
  - [1.2 Motor V8 de Google Chrome](#12-motor-v8-de-google-chrome)
  - [1.3 Programación asíncrona y el Event Loop](#13-programación-asíncrona-y-el-event-loop)
    - [1.3.1 ¿Qué es la programación asíncrona?](#131-qué-es-la-programación-asíncrona)
      - [Ejemplo de funcionamiento síncrono:](#ejemplo-de-funcionamiento-síncrono)
      - [Ejemplo de funcionamiento asíncrono:](#ejemplo-de-funcionamiento-asíncrono)
    - [1.3.2 ¿Cómo funciona el Event Loop?](#132-cómo-funciona-el-event-loop)
      - [Etapas del Event Loop:](#etapas-del-event-loop)
    - [Diagrama del Event Loop:](#diagrama-del-event-loop)
    - [1.3.3 Mecanismos Asíncronos en Node.js](#133-mecanismos-asíncronos-en-nodejs)
    - [1.3.4 Flujo de Ejecución en el Event Loop](#134-flujo-de-ejecución-en-el-event-loop)
    - [1.3.5 ¿Qué significa "non-blocking" en Node.js?](#135-qué-significa-non-blocking-en-nodejs)
    - [1.3.6 Tiempos de espera y control de tareas asincrónicas](#136-tiempos-de-espera-y-control-de-tareas-asincrónicas)
  - [Diagrama de Alto Nivel: Explicación detallada](#diagrama-de-alto-nivel-explicación-detallada)
  - [1.4 Módulos de Node.js (CommonJS vs ESModules)](#14-módulos-de-nodejs-commonjs-vs-esmodules)
  - [1.5 Gestión de dependencias con NPM y `package.json`](#15-gestión-de-dependencias-con-npm-y-packagejson)
    - [¿Qué es NPM?](#qué-es-npm)
    - [1.5.1 Creación de un archivo `package.json`](#151-creación-de-un-archivo-packagejson)
    - [1.5.2 Instalación de dependencias](#152-instalación-de-dependencias)
      - [Instalación de un paquete (dependencia):](#instalación-de-un-paquete-dependencia)
      - [Instalación de una dependencia de desarrollo:](#instalación-de-una-dependencia-de-desarrollo)
    - [1.5.3 Eliminación de dependencias](#153-eliminación-de-dependencias)
      - [Ejemplo:](#ejemplo)
    - [1.5.4 Instalación de dependencias en producción](#154-instalación-de-dependencias-en-producción)
    - [1.5.5 Creación de scripts personalizados](#155-creación-de-scripts-personalizados)
      - [Ejecución de scripts:](#ejecución-de-scripts)
    - [1.5.6 Gestión de versiones en `package.json`](#156-gestión-de-versiones-en-packagejson)
    - [1.5.7 `package-lock.json`](#157-package-lockjson)
    - [1.5.8 Publicación de paquetes con NPM](#158-publicación-de-paquetes-con-npm)
  - [1.6 ¿Qué es NVM?](#16-qué-es-nvm)
    - [1.6.1 Instalación de NVM](#161-instalación-de-nvm)
      - [a. Instalación en Linux/MacOS](#a-instalación-en-linuxmacos)
      - [b. Instalación en Windows](#b-instalación-en-windows)
    - [1.6.2 Instalación de diferentes versiones de Node.js](#162-instalación-de-diferentes-versiones-de-nodejs)
      - [a. Instalar una versión específica de Node.js](#a-instalar-una-versión-específica-de-nodejs)
      - [b. Ver todas las versiones disponibles](#b-ver-todas-las-versiones-disponibles)
      - [c. Ver las versiones instaladas localmente](#c-ver-las-versiones-instaladas-localmente)
    - [1.6.3 Cambiar entre versiones de Node.js](#163-cambiar-entre-versiones-de-nodejs)
      - [a. Usar una versión específica](#a-usar-una-versión-específica)
      - [b. Establecer una versión como predeterminada](#b-establecer-una-versión-como-predeterminada)
    - [1.6.4 Eliminar versiones de Node.js](#164-eliminar-versiones-de-nodejs)
    - [1.6.5 ¿Por qué es importante disponer de varias versiones?](#165-por-qué-es-importante-disponer-de-varias-versiones)
    - [1.6.6 Otros comandos útiles](#166-otros-comandos-útiles)
      - [a. Mostrar la versión actual de Node.js en uso:](#a-mostrar-la-versión-actual-de-nodejs-en-uso)
      - [b. Actualizar NVM](#b-actualizar-nvm)
      - [c. Ayuda de NVM](#c-ayuda-de-nvm)

## 1. Introducción a Node.js

### 1.1 ¿Qué es Node.js?

[Node.js](https://nodejs.org/en) es un entorno de ejecución de JavaScript que permite ejecutar código JavaScript fuera del navegador, aprovechando el motor **V8** de Google Chrome. Esto habilita a los desarrolladores a construir aplicaciones del lado del servidor utilizando el mismo lenguaje que del lado del cliente (JavaScript).

<figure style="text-align: center;">
  <img src="https://imgur.com/eYlZU5f.jpg" alt="Ryan Dahl" width="500" >
  <figcaption> ✨Ryan Dahl. Creador de NodeJS  ✨</figcaption>
</figure>

**Características clave de Node.js:**

- **Single-threaded**: Usa un solo hilo de ejecución.
- **Event-driven**: Utiliza un modelo basado en eventos.
- **Non-blocking I/O**: Las operaciones de entrada/salida no detienen el flujo de la aplicación.

### 1.2 Motor V8 de Google Chrome

El motor **V8** es el encargado de ejecutar el código JavaScript. Lo convierte de código de alto nivel (JavaScript) en código máquina que el sistema operativo puede entender, lo que hace a Node.js extremadamente rápido y eficiente.

**Funcionamiento básico:**

1. **Compilación Just-In-Time (JIT)**: V8 compila el código JavaScript a código máquina en tiempo real.
2. **Garbage Collection**: El motor maneja automáticamente la memoria, liberando espacio cuando los objetos ya no son necesarios.

### 1.3 Programación asíncrona y el Event Loop

Node.js está diseñado para manejar grandes cantidades de operaciones de entrada/salida (I/O) de manera eficiente, gracias a su arquitectura **no bloqueante** y al **Event Loop**.

#### 1.3.1 ¿Qué es la programación asíncrona?

La **programación asíncrona** permite que las operaciones que toman tiempo, como leer archivos, hacer consultas a bases de datos o realizar solicitudes HTTP, no detengan la ejecución del programa. En vez de esperar a que estas operaciones terminen para continuar, el programa sigue adelante, y la operación larga se resuelve en segundo plano.

##### Ejemplo de funcionamiento síncrono:

Imagina un código que lee un archivo y luego muestra un mensaje en la consola:

```js
const fs = require("fs");

// Ejemplo síncrono (bloqueante)
const data = fs.readFileSync("archivo.txt", "utf8"); // La ejecución se detiene aquí hasta que se lea el archivo
console.log(data); // Esto se ejecuta solo cuando la lectura ha terminado
console.log("Este mensaje aparece después de leer el archivo");
```

Este ejemplo usa la versión **síncrona** (`readFileSync`) de la función `fs.readFile`, lo que significa que el programa **espera** hasta que la lectura del archivo termine para continuar. Si la operación de lectura es lenta, la ejecución del programa se bloquea, impidiendo que otras tareas se ejecuten.

##### Ejemplo de funcionamiento asíncrono:

```js
const fs = require("fs");

// Ejemplo asíncrono (no bloqueante)
fs.readFile("archivo.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data); // Esto se ejecuta cuando la lectura se completa, pero no bloquea la ejecución
});
console.log("Este mensaje aparece antes de leer el archivo");
```

En este caso, `fs.readFile` es asíncrono, lo que significa que la ejecución **no se bloquea** mientras se lee el archivo. El flujo de ejecución sigue adelante, y cuando la operación de lectura termina, el **callback** (la función que pasa como argumento) se ejecuta.

#### 1.3.2 ¿Cómo funciona el Event Loop?

El **Event Loop** es el núcleo de la arquitectura de Node.js, responsable de manejar las operaciones asíncronas. Este mecanismo permite que Node.js maneje múltiples operaciones simultáneamente sin necesidad de crear múltiples hilos de ejecución.

- **Single-threaded**: Node.js funciona con un solo hilo de ejecución para manejar el código JavaScript.
- **Non-blocking**: Mientras se ejecutan operaciones de I/O (como leer archivos o hacer peticiones de red), el Event Loop sigue ejecutando otras partes del código.

##### Etapas del Event Loop:

> 1. **Timers**: Ejecuta funciones programadas por `setTimeout` o `setInterval`.
> 2. **Pending Callbacks**: Maneja callbacks de operaciones que han terminado (por ejemplo, operaciones de red).
> 3. **Idle, Prepare**: Se utiliza internamente en Node.js.
> 4. **Poll**: Espera nuevos eventos y ejecuta operaciones de I/O (lectura de archivos, peticiones HTTP, etc.).
> 5. **Check**: Ejecuta callbacks programados por `setImmediate`.
> 6. **Close Callbacks**: Maneja el cierre de conexiones de red.

#### Diagrama del Event Loop:

<figure style="text-align: center;">
  <img src="https://www.devtip.co/content/images/2023/01/BTm1H.png" alt="Event Loop"  width="600" >
  <figcaption> Funcionamiento del Event Loop </figcaption>
</figure>

#### 1.3.3 Mecanismos Asíncronos en Node.js

Existen varios mecanismos para manejar la programación asíncrona en Node.js, cada uno con sus propios casos de uso:

1. **Callbacks**: Es el enfoque más básico y tradicional para manejar operaciones asíncronas. Node.js utiliza callbacks en casi todas sus APIs internas.

   Ejemplo de callback:

   ```js
   const fs = require("fs");

   fs.readFile("archivo.txt", "utf8", (err, data) => {
     if (err) throw err;
     console.log(data);
   });
   ```

2. **Promises**: Las promesas son una forma más moderna de manejar operaciones asíncronas y permiten un manejo más sencillo de las cadenas de operaciones asíncronas.

   Ejemplo de Promise:

   ```js
   const fs = require("fs").promises;

   fs.readFile("archivo.txt", "utf8")
     .then((data) => {
       console.log(data);
     })
     .catch((err) => {
       console.error(err);
     });
   ```

3. **Async/Await**: Async/Await es una sintaxis más clara y legible que permite trabajar con promesas de manera similar al código síncrono. La palabra clave `async` se usa para declarar funciones que devuelven promesas, y `await` se usa para esperar a que una promesa se resuelva.

   Ejemplo de Async/Await:

   ```js
   const fs = require("fs").promises;

   async function leerArchivo() {
     try {
       const data = await fs.readFile("archivo.txt", "utf8");
       console.log(data);
     } catch (err) {
       console.error(err);
     }
   }

   leerArchivo();
   ```

#### 1.3.4 Flujo de Ejecución en el Event Loop

1. Cuando Node.js arranca, ejecuta el archivo principal y comienza a procesar el código de manera síncrona.
2. Las operaciones asíncronas (como `fs.readFile`) se delegan a la API de bajo nivel de Node.js o al sistema operativo.
3. Mientras esas operaciones se ejecutan en segundo plano, el Event Loop sigue procesando el código restante.
4. Cuando una operación asíncrona termina, se coloca un **callback** en la cola de tareas, y el Event Loop ejecuta los callbacks cuando el hilo principal queda libre.

<figure style="text-align: center;">
  <img src="https://miro.medium.com/v2/resize:fit:672/1*SNu8b0NKs9cBB9JsvNXKcA.png" alt="Event Loop"  width="400" >
  <figcaption>Flujo de Ejecución </figcaption>
</figure>

#### 1.3.5 ¿Qué significa "non-blocking" en Node.js?

En la programación tradicional de muchos lenguajes, si haces una operación costosa (como una consulta a una base de datos), tu aplicación queda "bloqueada" hasta que esa operación termine. Esto puede ser muy ineficiente cuando tienes muchas solicitudes que manejar. Node.js adopta un enfoque diferente al delegar esas operaciones a procesos asíncronos en segundo plano.

**Ejemplo de una operación no bloqueante:**

```js
const http = require("http");

http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Bienvenido a mi servidor");
    } else if (req.url === "/archivo") {
      // Operación asíncrona
      fs.readFile("archivo.txt", (err, data) => {
        if (err) {
          res.writeHead(500);
          return res.end("Error al leer el archivo");
        }
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
      });
    }
  })
  .listen(3000);
```

Aquí, la operación de lectura del archivo es no bloqueante, permitiendo que el servidor siga manejando otras solicitudes mientras se completa la lectura del archivo en segundo plano.

#### 1.3.6 Tiempos de espera y control de tareas asincrónicas

Node.js ofrece mecanismos como **`setTimeout`**, **`setInterval`**, y **`setImmediate`** para programar la ejecución de tareas con un retraso o para que se ejecuten en el próximo ciclo del Event Loop.

- **`setTimeout(fn, delay)`**: Ejecuta `fn` después de `delay` milisegundos.
- **`setInterval(fn, interval)`**: Ejecuta `fn` repetidamente cada `interval` milisegundos.
- **`setImmediate(fn)`**: Ejecuta `fn` en el próximo ciclo del Event Loop, después de que se hayan procesado las operaciones I/O actuales.

### Diagrama de Alto Nivel: Explicación detallada

Este diagrama representa el flujo básico del funcionamiento de Node.js cuando ejecuta una aplicación.

```plaintext
      ┌───────────────────────────┐
      │       JavaScript (JS)     │
      └───────────────────────────┘
                  │
                  ▼
      ┌───────────────────────────┐
      │  V8 (JavaScript Engine)   │
      └───────────────────────────┘
                  │
                  ▼
      ┌───────────────────────────┐
      │   Event Loop (Non-blocking│
      │       and asynchronous)   │
      └───────────────────────────┘
                  │
                  ▼
      ┌───────────────────────────┐
      │  I/O Operations (Files,   │
      │ Network, etc.)            │
      └───────────────────────────┘
```

1. **JavaScript (JS)**: Representa el código que escribes. Esto incluye tu lógica de aplicación, la manipulación de datos y las llamadas a funciones asincrónicas, como lectura de archivos o consultas a una base de datos.

2. **V8 (Motor de JavaScript)**: Es el motor de Google Chrome que ejecuta el código JavaScript. Toma tu código JavaScript y lo convierte en código máquina que el sistema operativo puede ejecutar. Este paso ocurre rápidamente y es esencial para la ejecución de código en Node.js.

3. **Event Loop (Asíncrono y no bloqueante)**: Es el mecanismo central de Node.js que maneja todas las operaciones asíncronas. El Event Loop permite que Node.js ejecute múltiples operaciones de entrada/salida sin bloquear el hilo principal. Las operaciones largas (como acceder a archivos o bases de datos) no bloquean el flujo de ejecución del programa. Cuando esas operaciones terminan, el Event Loop llama a los callbacks correspondientes.

4. **Operaciones I/O (Archivos, red, etc.)**: Aquí es donde entran las operaciones que implican interacción con el sistema de archivos, bases de datos o la red. Estas operaciones son ejecutadas de forma asincrónica. Node.js delega estas operaciones al sistema operativo para que se gestionen en segundo plano, liberando el Event Loop para manejar otras solicitudes mientras tanto.

Por tanto es importante concluir para que se entienda que:

- Node.js usa un solo hilo de ejecución, pero puede manejar múltiples operaciones asincrónicas simultáneamente.
- El Event Loop es el encargado de coordinar la ejecución de tareas asíncronas en Node.js.
- Operaciones de I/O, como leer archivos o hacer peticiones HTTP, se manejan de forma no bloqueante.
- Los callbacks, las promesas y `async/await` son los mecanismos más comunes para manejar la programación asíncrona.

### 1.4 Módulos de Node.js (CommonJS vs ESModules)

<figure style="text-align: center;">
  <img src="https://media.licdn.com/dms/image/v2/D4D12AQFJkvctwTsVyA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1715963104712?e=2147483647&v=beta&t=98O_KR8DarGWn8KzJz__oRod7knik6lJfhDMlA-aU-Q" alt="Event Loop"  width="600" >
  <figcaption>¿Cómo usar los módulos en NodeJS?</figcaption>
</figure>

En Node.js, puedes organizar tu código en módulos para mejorar la reutilización y la mantenibilidad. Hay dos formas de trabajar con módulos:

1. **CommonJS (require/export)**: Es el sistema de módulos predeterminado en Node.js.
2. **ESModules (import/export)**: Es el estándar moderno de JavaScript, pero está disponible en Node.js a partir de la versión 12.

**Ejemplo de uso de CommonJS:**

Archivo `saludo.js`:

```javascript
// Exportar una función en CommonJS
function saludar(nombre) {
  return `Hola, ${nombre}!`;
}

module.exports = saludar;
```

Archivo `app.js`:

```javascript
// Importar el módulo usando CommonJS
const saludar = require("./saludo");

console.log(saludar("Juan"));
```

**Ejemplo de ESModules:**

Archivo `saludo.mjs`:

```javascript
// Exportar una función en ESModules
export function saludar(nombre) {
  return `Hola, ${nombre}!`;
}
```

Archivo `app.mjs`:

```javascript
// Importar el módulo usando ESModules
import { saludar } from "./saludo.mjs";

console.log(saludar("Juan"));
```

### 1.5 Gestión de dependencias con NPM y `package.json`

#### ¿Qué es NPM?

**NPM** [Node Package Manager](https://www.npmjs.com/) es el sistema de gestión de paquetes de Node.js. Facilita la instalación, actualización y eliminación de bibliotecas (módulos) de terceros, así como la publicación de tus propios paquetes.

- **NPM Registry**: Es un repositorio central donde se alojan la mayoría de los paquetes públicos que puedes instalar y utilizar en tus proyectos.

Cuando inicias un proyecto de Node.js, utilizas `NPM` para instalar las dependencias que tu proyecto necesita. Estas dependencias se detallan en un archivo clave llamado **`package.json`**, que describe el proyecto y sus dependencias.

#### 1.5.1 Creación de un archivo `package.json`

Cuando creas un nuevo proyecto Node.js, es esencial crear un archivo `package.json` para gestionar las dependencias y metadatos del proyecto. Puedes generarlo automáticamente con:

```bash
npm init
```

Este comando te hará una serie de preguntas como el nombre del proyecto, la versión, la descripción, el punto de entrada (`index.js`), y los comandos de prueba, entre otros. Tras completarlo, genera un archivo `package.json` similar al siguiente:

```json
{
  "name": "Aprendiendo NODE JS . HLanz",
  "version": "1.0.0",
  "description": "Un proyecto Node.js de ejemplo",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"No hay tests aún\""
  },
  "author": "Isaías FL",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
```

#### 1.5.2 Instalación de dependencias

Cuando instalas un paquete con NPM, se añade a la sección de dependencias de tu archivo `package.json`.

##### Instalación de un paquete (dependencia):

```bash
npm install express
```

Esto agrega [**Express**](https://expressjs.com/) a la sección `"dependencies"` en tu archivo `package.json` y guarda la información de la versión en el archivo `package-lock.json`. Al instalar dependencias, NPM también crea una carpeta llamada `node_modules` donde almacena todos los paquetes descargados.

##### Instalación de una dependencia de desarrollo:

Si necesitas un paquete **solo para desarrollo** (como herramientas de testing o reinicio automático del servidor), lo instalas como una **dependencia de desarrollo**:

```bash
npm install --save-dev nodemon
# también sería con -D
npm install -D nodemon

```

Esto añade el paquete **nodemon** a la sección `"devDependencies"` del archivo `package.json`:

```json
"devDependencies": {
  "nodemon": "^2.0.15"
}
```

- **`dependencies`**: Aquí se almacenan las dependencias necesarias para ejecutar tu aplicación en producción.
- **`devDependencies`**: Aquí se listan las dependencias que solo son necesarias en el entorno de desarrollo.

#### 1.5.3 Eliminación de dependencias

Para eliminar paquetes que ya no necesitas, puedes usar el siguiente comando:

```bash
npm uninstall <nombre-del-paquete>
```

Esto elimina el paquete de `node_modules` y lo elimina de la lista de dependencias en el archivo `package.json`. Si el paquete está en las **devDependencies**, puedes usar:

```bash
npm uninstall <nombre-del-paquete> --save-dev
```

##### Ejemplo:

```bash
npm uninstall express
```

Este comando quita **Express** tanto del archivo `package.json` como de `node_modules`.

#### 1.5.4 Instalación de dependencias en producción

Cuando quieras instalar dependencias para **producción** (solo aquellas en `"dependencies"` y no en `"devDependencies"`), debes usar la opción `--production`:

```bash
npm install --production
```

Este comando omitirá las dependencias de desarrollo y solo instalará lo que realmente se necesita para ejecutar tu aplicación en producción.

#### 1.5.5 Creación de scripts personalizados

Dentro de tu archivo `package.json`, tienes la posibilidad de definir **scripts personalizados** para ejecutar tareas comunes de tu proyecto. Los scripts se definen en la sección `"scripts"`.

Por ejemplo:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "build": "webpack --config webpack.config.js",
  "test": "jest"
}
```

##### Ejecución de scripts:

- Para ejecutar el script `"start"`:

  ```bash
  npm start
  ```

  Esto es equivalente a ejecutar `node index.js`.

- Para ejecutar el script `"dev"`:

  ```bash
  npm run dev
  ```

  Esto es equivalente a ejecutar `nodemon index.js`, que reinicia el servidor automáticamente cuando detecta cambios.

- Puedes definir cualquier script que te sea útil, como comandos de testing o construcción de la aplicación.

#### 1.5.6 Gestión de versiones en `package.json`

En `package.json`, las versiones de los paquetes tienen un formato semántico de versionado:

```json
"dependencies": {
  "express": "^4.17.1"
}
```

El número de versión sigue el patrón: **MAJOR.MINOR.PATCH**. Las siguientes reglas son importantes:

- **^4.17.1**: Instalará cualquier versión de Express compatible con la versión 4. Si hay un cambio en el número menor (MINOR) o patch (PATCH), se instalará automáticamente al hacer `npm install`.
- **~4.17.1**: Solo instalará actualizaciones dentro de la misma versión menor (4.17.x).
- **4.17.1**: Fija exactamente la versión de Express. No se instalarán otras versiones.

#### 1.5.7 `package-lock.json`

Cuando instalas o actualizas dependencias, NPM genera un archivo llamado **`package-lock.json`**. Este archivo es crucial para garantizar que se instalen las mismas versiones de los paquetes en todos los entornos, ya que bloquea las versiones exactas de todas las dependencias, incluidas las dependencias de las dependencias.

#### 1.5.8 Publicación de paquetes con NPM

Si decides crear tu propio paquete y publicarlo en el registro de NPM, el proceso es relativamente sencillo:

1. Primero debes iniciar sesión en NPM:

   ```bash
   npm login
   ```

2. Luego puedes publicar tu paquete usando:
   ```bash
   npm publish
   ```

Esto hará que tu paquete esté disponible para otros desarrolladores que puedan instalarlo usando `npm install <nombre-del-paquete>`.

### 1.6 ¿Qué es NVM?

NVM (Node Version Manager) es una herramienta que permite gestionar múltiples versiones de Node.js en tu sistema. Esto es útil cuando trabajas en proyectos diferentes que requieren versiones específicas de Node.js o cuando deseas probar nuevas características sin afectar tu entorno actual.

#### 1.6.1 Instalación de NVM

Antes de instalar NVM, asegúrate de que no tienes una versión de Node.js ya instalada directamente (a través de gestores de paquetes como Homebrew o apt-get).

##### a. Instalación en Linux/MacOS

1. Abre una terminal y ejecuta el siguiente comando para descargar el script de instalación:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
   ```

2. Después de la instalación, añade NVM a tu terminal actual ejecutando:

   ```bash
   export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

3. Verifica que NVM se haya instalado correctamente:
   ```bash
   nvm --version
   ```

##### b. Instalación en Windows

Para Windows, puedes usar [nvm-windows](https://github.com/coreybutler/nvm-windows), que es una versión adaptada de NVM.

1. Descarga el instalador de NVM desde el [repositorio oficial de nvm-windows](https://github.com/coreybutler/nvm-windows/releases).
2. Sigue las instrucciones del instalador y completa la instalación.
3. Después de la instalación, abre la terminal de Windows y verifica que NVM está disponible:
   ```bash
   nvm version
   ```

#### 1.6.2 Instalación de diferentes versiones de Node.js

Con NVM instalado, puedes gestionar varias versiones de Node.js de manera muy sencilla.

##### a. Instalar una versión específica de Node.js

Para instalar una versión específica, usa el siguiente comando:

```bash
nvm install <versión>
```

Por ejemplo, para instalar la versión 16.15.0:

```bash
nvm install 16.15.0
```

##### b. Ver todas las versiones disponibles

Puedes listar todas las versiones de Node.js disponibles para instalar con:

```bash
nvm ls-remote
```

##### c. Ver las versiones instaladas localmente

Para ver las versiones de Node.js que tienes instaladas en tu sistema:

```bash
nvm ls
```

#### 1.6.3 Cambiar entre versiones de Node.js

##### a. Usar una versión específica

Si necesitas usar una versión específica de Node.js para un proyecto, puedes cambiar de versión con:

```bash
nvm use <versión>
```

Por ejemplo:

```bash
nvm use 14.17.0
```

##### b. Establecer una versión como predeterminada

Para establecer una versión como la predeterminada (la que se usará por defecto en cada nueva terminal), puedes usar el comando:

```bash
nvm alias default <versión>
```

Por ejemplo:

```bash
nvm alias default 16.15.0
```

Esto es útil para asegurarte de que una versión estable esté disponible por defecto, pero puedes cambiar a otras versiones cuando sea necesario.

#### 1.6.4 Eliminar versiones de Node.js

Si ya no necesitas una versión específica de Node.js, puedes eliminarla para liberar espacio:

```bash
nvm uninstall <versión>
```

Por ejemplo, para eliminar la versión 14.17.0:

```bash
nvm uninstall 14.17.0
```

#### 1.6.5 ¿Por qué es importante disponer de varias versiones?

Diferentes proyectos pueden requerir versiones específicas de Node.js. Aquí algunas razones clave:

- **Compatibilidad del proyecto**: Si estás trabajando en proyectos antiguos, puede que dependan de una versión más antigua de Node.js. Tener la versión correcta ayuda a evitar problemas de compatibilidad.
- **Nuevas características**: Algunas versiones más nuevas de Node.js introducen características nuevas y mejoras de rendimiento que puedes querer aprovechar.
- **Desarrollo paralelo**: Si estás desarrollando o manteniendo múltiples proyectos, puedes necesitar versiones diferentes de Node.js para cada uno.
- **Pruebas de backward compatibility**: Para asegurarte de que tus aplicaciones funcionan en versiones más antiguas y modernas de Node.js, puedes probarlas en varias versiones sin afectar tu sistema global.

#### 1.6.6 Otros comandos útiles

##### a. Mostrar la versión actual de Node.js en uso:

```bash
node -v
```

##### b. Actualizar NVM

Si necesitas actualizar NVM a una versión más reciente, puedes volver a ejecutar el script de instalación, y se actualizará automáticamente:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

##### c. Ayuda de NVM

Si alguna vez necesitas ayuda con los comandos de NVM, puedes acceder al manual de la herramienta:

```bash
nvm help
```
