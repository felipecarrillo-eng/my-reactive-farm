Modifiqué el estado inicial loading, cambiándolo de true a false dentro del componente Farm.jsx.
Esto hizo que la aplicación ya no muestre la animación de carga al inicio, porque React no entra al estado de “cargando”.

Como loading controla cuándo se muestra el componente <Loader />, al ponerlo en false, ese componente ya no aparece y React pasa directo a mostrar el contenido principal.

Esto demuestra cómo el estado controla lo que React renderiza en pantalla.
solo muestra animales cuya edad es mayor o igual al número ingresado,
se actualiza automáticamente cuando escribo una nueva edad,
sigue combinándose con los otros filtros (tipo, estado y búsqueda).

## Actividad 3: Mejoras del formulario

En esta actividad mejoré la experiencia de usuario del formulario de creación de animales implementando dos cambios principales.

###  Mejora 1: Validación visual de campos obligatorios
Agregué validaciones en el formulario para que los campos obligatorios (name, type, age, weight) muestren:
- Un borde rojo si están vacíos
- Un mensaje de error debajo del campo

**Beneficio:**  
El usuario entiende rápidamente qué falta completar sin tener que enviar el formulario varias veces.

---

###  Mejora 2: Limpieza automática del formulario después de enviar
Después de crear un animal exitosamente, los campos del formulario se limpian automáticamente.

**Beneficio:**  
Mejora el flujo cuando se registran varios animales seguidos, evitando que el usuario tenga que borrar manualmente los datos anteriores.

---

Estas mejoras hacen que el formulario sea más claro, más fácil de usar y con menos errores.
