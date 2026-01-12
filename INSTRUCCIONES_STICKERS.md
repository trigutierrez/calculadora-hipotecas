# Instrucciones para agregar los Stickers

## Paso 1: Guardar las imágenes

Por favor, descarga y guarda las 8 imágenes PNG que compartiste con los siguientes nombres **exactos** en la carpeta `public/stickers/`:

### Imágenes de la primera tanda:
1. `keychain.png` - Llavero verde con signo de interrogación
2. `pencil-holder.png` - Porta-lápices azul con pulgar hacia arriba (icono de "me gusta")
3. `suitcase.png` - Maleta de viaje plateada con stickers coloridos
4. `wallet.png` - Billetera verde acolchada con tarjetas
5. `mailbox.png` - Buzón de correo con cara sonriente

### Imágenes de la segunda tanda:
6. `tape.png` - Rollo de cinta adhesiva azul con decoración
7. `folder.png` - Carpeta naranja con documentos y tarjeta rosa
8. `box.png` - Caja de cartón con múltiples stickers

## Paso 2: Ubicación correcta

Las imágenes deben estar en:
```
/home/user/calculadora-hipotecas/public/stickers/
```

## Paso 3: Verificar

Una vez que hayas guardado todas las imágenes, puedes verificar que estén correctamente guardadas ejecutando:

```bash
ls -la public/stickers/
```

Deberías ver los 8 archivos PNG listados.

## Paso 4: Probar

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Y abre la aplicación en tu navegador. Deberías ver los nuevos stickers flotando en el fondo.

## Posiciones de los stickers:

- **Llavero**: Arriba a la izquierda
- **Porta-lápices**: Arriba a la derecha
- **Maleta**: Izquierda al centro
- **Rollo de cinta**: Derecha al centro
- **Billetera**: Abajo a la izquierda
- **Buzón**: Abajo a la derecha
- **Carpeta**: Arriba centro-izquierda (solo visible en pantallas XL)
- **Caja**: Abajo centro-derecha (solo visible en pantallas XL)

---

**Nota**: Si las imágenes no aparecen, verifica que:
1. Los nombres de archivo sean exactamente como se indica (case-sensitive)
2. Las imágenes estén en formato PNG
3. El servidor de desarrollo esté corriendo
4. No haya errores en la consola del navegador
