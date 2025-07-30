# 🔓 Guía de Desofuscación - Canva Image Extractor

## ¿Por qué está ofuscado el código?

La ofuscación se usa para:
- **Proteger la propiedad intelectual** del código
- **Reducir el tamaño** de los archivos JavaScript  
- **Optimizar el rendimiento** en producción

## ✅ ¿Es seguro usar esta extensión?

**¡SÍ, es completamente seguro!** Aquí te explicamos cómo verificarlo:

### 🔍 Paso 1: Revisar el Código Fuente Original

```bash
# Navegar a la carpeta de código limpio
cd src-original/

# Ver todos los archivos de código fuente
ls -la

# Leer el código principal (background)
cat background.js

# Leer el código de interfaz (popup)  
cat popup.js

# Leer el script de inyección
cat injected.js
```

### 📋 Paso 2: Verificar Permisos

La extensión **SOLO** solicita estos permisos:

- `activeTab`: Acceso a la pestaña activa (solo Canva)
- `scripting`: Inyectar script para extraer imágenes
- `storage`: Almacenar temporalmente las imágenes extraídas
- `clipboardWrite`: Copiar URLs al portapapeles

### 🔒 Paso 3: Verificar que NO hace nada malicioso

**Lo que NO hace la extensión:**
- ❌ No envía datos a servidores externos
- ❌ No accede a información personal
- ❌ No modifica otros sitios web  
- ❌ No instala software adicional
- ❌ No usa tracking o analytics

**Lo que SÍ hace:**
- ✅ Solo extrae imágenes de páginas de Canva
- ✅ Almacena temporalmente en tu navegador
- ✅ Te permite arrastrar y soltar imágenes
- ✅ Funciona completamente offline

### 🧪 Paso 4: Modo Desarrollo (Opcional)

Si quieres usar la versión sin ofuscar:

```bash
# 1. Hacer backup de archivos ofuscados
mkdir backup-obfuscated
cp *.js backup-obfuscated/

# 2. Restaurar código original
cp src-original/*.js ./

# 3. Recargar extensión en Chrome
# Ir a chrome://extensions/
# Encontrar "Canva Image Extractor"  
# Hacer clic en el botón "Recargar" 🔄
```

### 🔄 Restaurar Versión Ofuscada

```bash
# Restaurar archivos ofuscados
cp backup-obfuscated/*.js ./

# Recargar extensión en Chrome
```

## 🛡️ Garantía de Seguridad

**Esta extensión es segura porque:**

1. **Código abierto**: Todo el código fuente está disponible
2. **Permisos mínimos**: Solo acceso necesario para funcionar  
3. **Sin dependencias**: No usa librerías externas
4. **Sin red**: No hace llamadas a internet
5. **Temporal**: Solo almacena datos localmente y temporalmente

## 🤝 Confianza

Si tienes dudas sobre la seguridad:

1. **Revisa el código** en `src-original/`
2. **Verifica los permisos** en `manifest.json`
3. **Usa la versión sin ofuscar** siguiendo la guía de desarrollo
4. **Contacta al desarrollador** si tienes preguntas

## 📞 Soporte

- **GitHub Issues**: Para reportar problemas
- **Código fuente**: Siempre disponible en `src-original/`
- **Documentación**: README.md principal

---

**¡Disfruta extrayendo imágenes de Canva de forma segura!** 🎨✨
