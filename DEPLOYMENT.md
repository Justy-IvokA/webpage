# Guía de Deployment

## Configuración Actual

El proyecto está configurado para desplegarse en **GitHub Pages** o en un **dominio propio**.

### GitHub Pages (Actual)
```typescript
// next.config.ts
{
  output: 'export',
  basePath: '/webpage',
  assetPrefix: '/webpage/',
  trailingSlash: true,
}
```

### Dominio Propio (Futuro: ivoka.ai)
```typescript
// next.config.ts
{
  output: 'export',
  basePath: '',  // Sin basePath para dominio propio
  assetPrefix: '',
  trailingSlash: true,
}
```

## Comportamiento de basePath

### En Desarrollo (`pnpm run dev`)
- **URL:** `http://localhost:3000/`
- **basePath NO se aplica** - Esto es el comportamiento normal de Next.js
- Los assets se cargan desde `/images/...`, `/videos/...`, etc.
- Esto es correcto y esperado

### En Producción (GitHub Pages)
- **URL:** `https://justy-ivoka.github.io/webpage/`
- **basePath SÍ se aplica automáticamente**
- Los assets se cargan desde `/webpage/images/...`, `/webpage/videos/...`, etc.
- Next.js maneja esto automáticamente

## Componentes que Manejan basePath Automáticamente

Next.js aplica el basePath automáticamente a:
- `<Image>` de `next/image`
- `<Link>` de `next/link`
- `<link>` tags en el `<head>`
- `<script>` tags
- Archivos estáticos en `/public`

## Verificar el Deployment

1. **Build local:**
   ```bash
   pnpm run build
   ```

2. **Verificar carpeta `out`:**
   - Los assets deben estar en `out/images/`, `out/videos/`, etc.
   - El HTML debe referenciar `/webpage/images/...`

3. **Monitorear GitHub Actions:**
   ```
   https://github.com/Justy-IvokA/webpage/actions
   ```

4. **Acceder al sitio:**
   ```
   https://justy-ivoka.github.io/webpage/
   ```

## Notas Importantes

- ⚠️ **NO** intentes acceder a `http://localhost:3000/webpage/` en desarrollo
- ✅ En desarrollo usa: `http://localhost:3000/`
- ✅ En producción usa: `https://justy-ivoka.github.io/webpage/`

## Migración a Dominio Propio (ivoka.ai)

Cuando estés listo para usar tu dominio propio, sigue estos pasos:

### 1. Actualizar `next.config.ts`
```typescript
// Cambiar estas líneas:
const basePath = isProd ? '/webpage' : '';  // ← Cambiar a ''
// ...
assetPrefix: isProd ? '/webpage/' : '',     // ← Cambiar a ''
```

### 2. El helper `assetPath` se adapta automáticamente
El archivo `src/lib/asset-path.ts` detecta automáticamente el dominio:
- ✅ `*.github.io` → usa `/webpage`
- ✅ `ivoka.ai` → sin basePath
- ✅ `localhost` → sin basePath

**No necesitas modificar nada en los componentes** 🎉

### 3. Configurar DNS
1. En tu proveedor de DNS (Cloudflare, GoDaddy, etc.)
2. Agregar registro CNAME apuntando a `justy-ivoka.github.io`
3. En GitHub: Settings → Pages → Custom domain → `ivoka.ai`

## Troubleshooting

### Assets no cargan en GitHub Pages
1. Verifica que el build se completó exitosamente
2. Verifica que GitHub Pages está configurado para usar "GitHub Actions" como source
3. Espera 2-3 minutos después del deployment
4. Limpia el caché del navegador (Ctrl+Shift+R)

### Página en blanco en GitHub Pages
1. Verifica la consola del navegador para errores
2. Asegúrate de acceder a la URL completa con `/webpage/`
3. Verifica que el workflow de GitHub Actions se completó sin errores

### Assets no cargan en dominio propio
1. Verifica que actualizaste `next.config.ts` (basePath y assetPrefix a '')
2. Haz un nuevo build y deployment
3. El helper `assetPath` debería detectar automáticamente el dominio
