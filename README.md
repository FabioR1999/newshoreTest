# NewshoreTest

El proyecto fue construído en Angular CLI version 17.1.0.
Instalarlo con `npm install -g @angular/cli@17`

Versión de NodeJS usada 20.11.0.

Se recomienda usar estas versiones de Angular y NodeJs para evitar cualquier problema de compatibilidad.

Para compliar el proyecto, usar `npm install`

## Ejecución

Para inicializar el proyecto se usa `ng serve` para ambiente local. Navegar a `http://localhost:4200/` (puerto por defecto). La aplicación automáticamente se recargará cuando se guarden cambios.

## Consideraciones
En el contexto de la evaluación técnica, es relevante señalar que la URL de la API web está definida en el archivo environment.ts.

## Estructura General
**Formulario de Búsqueda:** La interfaz contiene un formulario de búsqueda con campos para el origen, destino, moneda y un botón para iniciar la búsqueda de vuelos.

**Resultados de la Búsqueda:** Después de realizar una búsqueda, se muestran los resultados en una sección que contiene tarjetas de vuelos disponibles. Cada tarjeta presenta información como escalas, precio, estaciones de salida y llegada, y una representación gráfica de un avión.

**Detalles del Vuelo Seleccionado:** Cuando se selecciona una tarjeta de vuelo, se revelan los detalles específicos del vuelo, como el origen, destino, aerolínea, número de vuelo y precio.

## Formulario de Búsqueda
**Campos de Origen y Destino:** Permiten ingresar tres caracteres con validaciones específicas.

**Campo de Moneda:** Permite seleccionar la moneda para mostrar los precios.

**Botón de Búsqueda:** Inicia la búsqueda de vuelos.

## Resultados de la Búsqueda
**Tarjetas de Vuelo:** Presentan información clave sobre los vuelos encontrados, como escalas, precio y estaciones.

**Precio Convertido:** El precio se muestra en la moneda seleccionada, considerando el factor de multiplicación proporcionado por la API de intercambio.

**Detalles del Vuelo Seleccionado**

**Detalles del Vuelo:** Se muestran detalles adicionales del vuelo seleccionado, como aerolínea, número de vuelo y detalles de las estaciones.

**Componente Adicional**

**app-btn-new-consult:** Un botón que permite realizar una nueva consulta.

## Aclaraciones
Se logró cumplir con todos los requerimientos, solo faltó el requerimiento de pruebas unitarias.


