# Proyecto Astro React con Tailwind CSS y Supabase

## Índice

- [Requisitos previos](#requisitos-previos)
- [Dependencias utilizadas para el proyecto](#dependencias-utilizadas-para-el-proyecto)
- [Comandos útiles](#comandos-útiles)

## Requisitos previos

Antes de comenzar con el proyecto, asegúrate de tener instalado lo siguiente:

- **NodeJS** (Versión 18 o superior)
  - Descarga e instala desde (https://nodejs.org/en/download/current)).

- **pnpm**
  - Instálalo globalmente con `npm install -g pnpm`.

## Dependencias utilizadas para el proyecto

Estas son las dependencias necesarias que serán instaladas dentro del proyecto:

- **Framework: Astro (V4.8.0)**

  `pnpm create astro@4.8.0`

- **Extension de Astro en Visual Studio Code**
  
  Busca e instala "Astro" en las extensiones de Visual Studio Code, que mas voy a explicar xdd

- **React**

  `pnpm astro add react`

- **Tailwind CSS**
  
  `pnpm astro add tailwind`

- **Supabase**

  `pnpm add @supabase/supabase-js`

- **Vercel** Adaptador de renderizado
  
  `pnpm astro add vercel`

- **FireBase**

  `pnpm add firebase firebase-admin`

## Comandos útiles

A continuación, algunos comandos útiles para trabajar con el proyecto:

- **Instalar dependencias**
- Después de clonar el proyecto, ejecuta:
  ```
  pnpm install
  ```
  Este comando instalará todas las dependencias descritas en el archivo `package.json`. Si no lo haces, podrías experimentar problemas con el proyecto.

- **Iniciar proyecto en modo desarrollador**
  ```
  pnpm astro dev
  ```
Este comando inicia el proyecto en modo desarrollador, permitiéndote visualizar la página y realizar cambios en tiempo real.
