Modifiqué el estado inicial loading, cambiándolo de true a false dentro del componente Farm.jsx.
Esto hizo que la aplicación ya no muestre la animación de carga al inicio, porque React no entra al estado de “cargando”.

Como loading controla cuándo se muestra el componente <Loader />, al ponerlo en false, ese componente ya no aparece y React pasa directo a mostrar el contenido principal.

Esto demuestra cómo el estado controla lo que React renderiza en pantalla.