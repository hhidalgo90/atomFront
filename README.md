# ATOM FE CHALLENGE TEMPLATE - ANGULAR

Este proyecto es una plantilla con lo necesario para comenzar a desarrollar el front-end de la aplicación de la prueba técnica de Atom. Se base en Angular con la versión 17.3.6.
Se ha realizado la instalación y configuración de varias dependencias necesarias para el desarrollo de la aplicación, como por ejemplo: Angular Material.

## Comentarios sobre el desarrollo
# TasksProject - Angular Frontend Application

## Descripción

Esta es la aplicación frontend desarrollada en **Angular** que interactúa con el backend en **Spring Boot**. Su propósito es proporcionar una interfaz para la gestión de tareas, permitiendo a los usuarios visualizar, agregar, actualizar y eliminar tareas. La aplicación está desplegada en **Firebase Hosting**.

## Tecnologías utilizadas

- **Angular 17**: Framework principal para la creación de la aplicación frontend.
- **Angular Router**: Módulo de enrutamiento para gestionar la navegación entre vistas.
- **Angular Forms**: Manejo de formularios reactivos para la entrada de datos de los usuarios.
- **Bootstrap**: Librería de estilos para mejorar la apariencia de la aplicación.
- **Firebase Hosting**: Servicio de Firebase utilizado para el despliegue del frontend.
- **Environment Configuration**: Uso de entornos de configuración para manejar las URLs de desarrollo y producción del backend.

## Decisiones de Diseño

### Arquitectura

La aplicación sigue la arquitectura modular de **Angular**, con separación de responsabilidades en componentes, servicios y módulos:

- **Componentes**: Se encargan de la representación visual de la aplicación.
- **Servicios**: Gestionan la comunicación con el backend y la manipulación de datos.
- **Routing**: Se utiliza el módulo de enrutamiento de Angular para manejar la navegación.
- **Environments**: Se utilizan archivos de entorno (`environment.ts`) para manejar distintas configuraciones de API en desarrollo y producción.

### Gestión del Backend

Para permitir que la aplicación Angular interactúe con el backend, se usa un servicio centralizado que maneja las llamadas HTTP.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks(userEmail: string) {
    return this.http.get(`${this.apiUrl}/tasks?email=${userEmail}`);
  }

  addTask(userEmail: string, task: any) {
    return this.http.post(`${this.apiUrl}/tasks`, { email: userEmail, ...task });
  }
}
```

## Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/hhidalgo90/atomFront
   ```

2. **Instalar dependencias**:
   ```bash
   cd atom-frontend
   npm install
   ```

3. **Iniciar servidor local**:
    Ejecutar `ng serve`. En el navegador ir a `http://localhost:4200/`.


4. **Desplegar en Firebase Hosting**:
    Hacer merge request hacia la rama master, Cloud Build desplegara automaticamente.
