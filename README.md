# Scraper de Amazon con Puppeteer

Este es un sencillo script de Node.js que utiliza Puppeteer para extraer información de productos de los resultados de búsqueda de Amazon para una consulta dada y posteriormente guardar los resultados en una base de datos MongoDB

## Requisitos previos

- Node.js instalado en tu máquina.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto en tu terminal.
3. Ejecuta el siguiente comando para instalar las dependencias requeridas:

```console
 npm install puppeteer
```
  

## Uso

1. Abre el archivo `index.js`.
2. Modifica la constante `QUERY_SEARCH` con la consulta de búsqueda deseada (por ejemplo, "estoicismo" para productos relacionados con el estoicismo).
3. Ejecuta el script utilizando Node.js:

```console
npm run start
```




El script abrirá un navegador en modo "headless" (sin interfaz gráfica), utilizando Puppeteer. Luego, navegará a la página de inicio de Amazon, realizará la búsqueda con la consulta proporcionada y extraerá información de los productos de los resultados de búsqueda, posteriormente guardará esta información en una base de datos Mongo DB

## Resultados

El script mostrará en la consola el título de los productos extraídos y guardará en MongoDB toda la información , la cual incluirá:

- Título del producto
- Precio del producto
- URL de la imagen del producto



