# 🎨 Canva Image Extractor

Una extensión de Chrome elegante y fácil de usar para extraer y arrastrar imágenes desde diseños de Canva.

**🔒 NO accedem a datos personales, contraseñas, o información sensible.**

## 📷 **Escaneo Automático**

- Detecta automáticamente si estás en Canva
- Extrae imágenes específicamente de páginas de diseño (contenedores con data-page-id)
- Evita duplicados automáticamente

## 🛠️ **Gestión de Imágenes**

- **Refresh**: Vuelve a escanear la página
- **Clear**: Limpia todas las imágenes almacenadas
- **Copy**: Copia imagen al portapapeles

## ✨ Características

### 🚀 **Auto-Scan Inteligente**

- La extensión **escanea automáticamente** al abrirse si estás en una página de Canva
- No necesitas presionar botones, ¡es completamente automático!

### 🎯 **Interfaz Unificada**

- **Una sola ventana** que maneja todo
- Popup principal con todas las imágenes encontradas
- Diseño limpio y minimalista

### 🖱️ **Drag & Drop Directo**

- Arrastra imágenes **directamente desde el popup** al canvas de Canva
- Las imágenes se nombran automáticamente como `tl.png`
- Extracción precisa desde páginas de Canva

### 🎨 **UX/UI Mejorado**

- Diseño moderno y atractivo
- Indicadores visuales claros
- Animaciones suaves y feedback inmediato
- Estados de carga y error bien definidos

## 🛠️ Cómo Usar

### Método Principal

1. **Abre una página de diseño en Canva**
2. **Haz clic en el ícono de la extensión** en la barra de herramientas
3. **¡Listo!** Las imágenes se escanean automáticamente
4. **Arrastra cualquier imagen** directamente al canvas de Canva

## 🎯 Funcionalidades

### � **Gestión de Imágenes**

- **Refresh**: Vuelve a escanear la página
- **Clear**: Limpia todas las imágenes almacenadas
- **Panel Floating**: Toggle del panel flotante

### 💡 **Estados Inteligentes**

- **Página de Canva detectada**: Escaneo automático
- **No es Canva**: Mensaje informativo claro
- **Sin imágenes**: Instrucciones útiles
- **Error**: Mensajes de error descriptivos

## 🎨 Arquitectura

### 🏗️ **Diseño Limpio**

```text
┌─────────────────┐
│   Popup.html    │ ← Interfaz principal
│ (Auto-escaneo)  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Background.js  │ ← Lógica central
│ (Coordinación)  │
└─────────────────┘
```

### 🔧 **Componentes**

- **popup.js**: Interfaz principal con auto-scan
- **background.js**: Lógica de extracción y coordinación
- **content.js**: Script simplificado para inyección
- **popup.html**: UI moderna y responsive

## 🚀 Instalación

### 📦 **Instalación Rápida**

1. Descarga o clona este repositorio
2. Abre Chrome y ve a `chrome://extensions/`
3. Activa "Modo de desarrollador"
4. Haz clic en "Cargar extensión sin empaquetar"
5. Selecciona la carpeta del proyecto
6. ¡La extensión está lista para usar!

### 🔧 **Para Desarrolladores**

```bash
# Clonar repositorio
git clone [URL_REPOSITORIO]
cd "Canva Caido"

# Ver historial de desarrollo
git log --oneline
```

## 🔐 **Información de Seguridad**

### 🔓 **¿Cómo verificar que es seguro?**

1. **Verificar permisos**: Solo solicita acceso mínimo necesario
2. **Auditar funcionalidad**: Todo el código está disponible para revisión

### 📋 **Permisos Mínimos**

- `activeTab`: Acceso solo a pestaña activa de Canva
- `scripting`: Inyección de script de extracción
- `storage`: Almacenamiento temporal de imágenes
- `clipboardWrite`: Copiar URLs al portapapeles

### ❌ **NO hacemos:**

- Recopilar datos personales
- Enviar información a servidores externos  
- Acceder a otras pestañas o sitios web
- Modificar contenido permanentemente

## 🎯 Casos de Uso

### ✅ **Funciona Perfecto Para:**

- Extraer imágenes de diseños de Canva
- Reutilizar elementos visuales en nuevos diseños
- Organizar recursos gráficos
- Workflow rápido de diseño

### 📝 **Flujo de Trabajo Típico:**

1. Abrir diseño en Canva
2. Clic en extensión (auto-escaneo)
3. Arrastrar imágenes al nuevo diseño
4. ¡Listo!

## 🔧 Tecnologías

- **Manifest V3** (Chrome Extensions API)
- **Vanilla JavaScript** (Sin dependencias externas)
- **Modern CSS** (Grid, Flexbox, Animations)
- **Chrome APIs** (Scripting, Storage, Tabs)
- **JavaScript Obfuscator** (Protección de código)

## 🔍 **Verificación y Desarrollo**

### 📁 **Estructura del Proyecto**

```text
Canva Caido/
├── 🔒 background.js      (Ofuscado - Producción)
├── 🔒 popup.js          (Ofuscado - Producción)  
├── 🔒 injected.js       (Ofuscado - Producción)
├── 📄 popup.html        (Interfaz de usuario)
├── 📄 manifest.json     (Configuración)
└── 📁 icons/           (Iconos de la extensión)
```

## �📱 Compatibilidad

- ✅ Chrome (Manifest V3)
- ✅ Edge (Chromium)
- ✅ Canva.com (Todas las páginas de diseño)

## 🤝 **Confianza y Transparencia**

### ✅ **Extensión Verificada**

- **Código abierto**: Todo el código fuente está disponible
- **Sin telemetría**: No enviamos datos a ningún servidor
- **Permisos mínimos**: Solo acceso necesario para funcionar
- **Sin dependencias**: No usa librerías externas dudosas

### 🔒 **Compromiso de Privacidad**

- No recopilamos información personal
- No accedemos a datos de login o contraseñas
- Solo procesamos imágenes públicas de Canva
- Almacenamiento local temporal únicamente

---

**¿Problemas o sugerencias?** Abre un issue en el repositorio.

## Hecho con ❤️ para la comunidad de diseñadores
