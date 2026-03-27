# Proyecto Intermodular: Plataforma de Análisis y Simulación de Inversión

Aplicación web diseñada para la validación de estrategias de inversión en bolsa mediante el uso de datos históricos (**backtesting**) y la identificación de oportunidades de mercado (**scanning**) sin riesgo de capital real.

---

## Características Principales

### 1. Detector de Oportunidades (Screener)
* **Filtros Personalizados:** Creación de reglas basadas en indicadores técnicos (ej. Media Móvil de 50 días) y volumen.
* **Detección de Hitos:** Identificación de activos que alcanzan máximos históricos o de periodos determinados (ej. máximo de 52 semanas).
* **Visualización:** Presentación de resultados en tablas paginadas con datos de símbolo, precio, variación y volumen.

### 2. Simulador de Estrategias (Backtester)
* **Simulación Histórica:** Evaluación de reglas de inversión utilizando datos del pasado para proyectar resultados.
* **Configuración Flexible:** Definición de capital inicial, rangos de fechas y reglas de entrada/salida (*Stop-Loss* y *Take-Profit*).
* **Métricas de Rendimiento:** Cálculo de Retorno Total, Retorno Anualizado, Sharpe Ratio, Profit Factor y comparación contra el S&P 500.
* **Análisis Gráfico:** Generación de curvas de *equity* para visualizar el crecimiento del capital.

---

## Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **Python** | Backend, lógica de negocio, procesamiento de datos financieros y motor de backtesting. |
| **HTML5 / CSS3** | Estructura, diseño visual responsivo y maquetación de la interfaz. |
| **JavaScript** | Interactividad del cliente, gestión dinámica del DOM y comunicación asíncrona. |
| **MySQL 8.0+** | Base de datos relacional para almacenamiento de precios (OHLCV) y datos de usuario. |
| **Yahoo Finance API** | Fuente de datos para la actualización diaria de precios de activos. |

---

## Arquitectura y Diseño

### Modelo de Datos
El sistema utiliza un modelo relacional para gestionar la persistencia de:
* **Activos y Precios:** Almacenamiento diario de datos OHLCV (*Open, High, Low, Close, Volume*).
* **Usuarios:** Gestión de cuentas cifradas para el guardado de estrategias y configuraciones personalizadas.
* **Filtros y Parámetros:** Estructura para almacenar criterios de escaneo y reglas de simulación.

### Metodología de Desarrollo
Se ha implementado **Scrumban**, combinando la estructura iterativa de Scrum con la flexibilidad y gestión visual de Kanban para optimizar el flujo de trabajo y la priorización de tareas.

---

## Requisitos del Sistema (Servidor)
* **SO:** Linux (Ubuntu 22.04 LTS o superior).
* **Hardware Mínimo:** 2 vCPU, 2 GB RAM, 60 GB SSD.
* **Infraestructura:** Gunicorn + Nginx para el despliegue de la aplicación Python.

---

## Marco Legal
La aplicación cumple con el **Reglamento General de Protección de Datos (RGPD)** de la UE, garantizando derechos de acceso, rectificación, supresión y portabilidad de los datos personales de los usuarios.

---

## Equipo del Proyecto
* **Marcos:** Project Manager / Arquitecto de Solución.
* **Néstor:** Frontend Engineer / UI Developer / Marketing.
* **Pedro:** Technical Writer / Project Support.
