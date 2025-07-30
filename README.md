# 🎨 Canva Image Extractor

Una extensión de Chrome diseñada para extraer imágenes de diseños en Canva de manera eficiente y sin complicaciones.

## Características Principales

- **Escaneo Automático**: Detecta automáticamente si estás en una página de diseño de Canva y extrae imágenes relevantes.
- **Gestión de Imágenes**: Opciones para refrescar, limpiar y copiar imágenes al portapapeles.
- **Interfaz Intuitiva**: Diseño minimalista y funcional para una experiencia de usuario fluida.
- **Drag & Drop**: Arrastra imágenes directamente desde el popup al canvas de Canva.

## Cómo Usar

1. Abre una página de diseño en Canva.
2. Haz clic en el ícono de la extensión en la barra de herramientas de Chrome.
3. Las imágenes se escanearán automáticamente.
4. Arrastra las imágenes al canvas de Canva según sea necesario.

## Instalación

1. Descarga o clona este repositorio.
2. Abre Chrome y navega a `chrome://extensions/`.
3. Activa "Modo de desarrollador".
4. Haz clic en "Cargar extensión sin empaquetar" y selecciona la carpeta del proyecto.

## Seguridad

- **Permisos Mínimos**: La extensión solo solicita acceso a la pestaña activa, inyección de scripts, almacenamiento temporal y escritura en el portapapeles.
- **Privacidad Garantizada**: No recopilamos datos personales ni accedemos a información sensible.
- **Código Abierto**: Todo el código está disponible para auditoría.

## Tecnologías Utilizadas

- **Manifest V3**: API de extensiones de Chrome.
- **JavaScript**: Sin dependencias externas.
- **CSS Moderno**: Uso de Grid, Flexbox y animaciones.
- **Chrome APIs**: Scripting, Storage y Tabs.

## Compatibilidad

- **Navegadores**: Chrome y Edge (basado en Chromium).
- **Plataforma**: Diseños en Canva.com.

## Estructura del Proyecto

```text
Canva Caido/
├── background.js      (Lógica central)
├── popup.js           (Interfaz principal)
├── injected.js        (Script de inyección)
├── popup.html         (Interfaz de usuario)
├── manifest.json      (Configuración de la extensión)
└── icons/             (Recursos gráficos)
```

## Contribuciones

¿Tienes ideas o encontraste un problema? Abre un issue o envía un pull request en el repositorio.

---

**Nota**: Esta extensión es una herramienta local y no interactúa con servidores externos. Diseñada para facilitar el flujo de trabajo de diseñadores gráficos.
