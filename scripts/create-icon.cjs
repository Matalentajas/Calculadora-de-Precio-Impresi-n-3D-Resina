const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const png2icons = require('png2icons');

// Crear icono PNG programáticamente
function createPNGIcon() {
  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext('2d');
  
  // Fondo con gradiente
  const gradient = ctx.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(0.5, '#764ba2');
  gradient.addColorStop(1, '#f093fb');
  
  // Crear fondo redondeado
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(0, 0, 256, 256, 32);
  ctx.fill();
  
  // Calculadora
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.beginPath();
  ctx.roundRect(64, 40, 128, 176, 12);
  ctx.fill();
  
  // Pantalla
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.roundRect(76, 52, 104, 32, 4);
  ctx.fill();
  
  // Texto en pantalla
  ctx.fillStyle = '#00ff88';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('€ 15,50', 128, 72);
  
  // Botones de la calculadora
  const buttonColor = '#667eea';
  ctx.fillStyle = buttonColor;
  
  // 4 filas de botones
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const x = 88 + col * 24;
      const y = 100 + row * 24;
      
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Botón especial (=)
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath();
  ctx.roundRect(100, 188, 56, 16, 8);
  ctx.fill();
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 12px Arial';
  ctx.fillText('=', 128, 199);
  
  // Impresora 3D pequeña
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath();
  ctx.roundRect(200, 180, 40, 28, 4);
  ctx.fill();
  
  // Detalle de la impresora
  ctx.fillStyle = '#2E7D32';
  ctx.fillRect(204, 184, 32, 4);
  
  ctx.fillStyle = '#FF5722';
  ctx.beginPath();
  ctx.arc(220, 176, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Símbolo Euro decorativo
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.arc(40, 60, 12, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'white';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('€', 40, 66);
  
  return canvas.toBuffer('image/png');
}

// Crear icono ICO desde PNG
function createIcon() {
  try {
    console.log('🎨 Creando icono PNG...');
    const pngBuffer = createPNGIcon();
    
    // Guardar PNG
    const pngPath = path.join(__dirname, 'public', 'app-icon.png');
    fs.writeFileSync(pngPath, pngBuffer);
    console.log('✓ Archivo PNG creado:', pngPath);
    
    // Crear ICO
    console.log('🔄 Convirtiendo a ICO...');
    const icoBuffer = png2icons.createICO(pngBuffer, png2icons.BILINEAR, 0, false, true);
    
    if (icoBuffer) {
      const iconPath = path.join(__dirname, 'public', 'app-icon.ico');
      fs.writeFileSync(iconPath, icoBuffer);
      console.log('✓ Icono .ico creado exitosamente:', iconPath);
      
      // También crear versiones de diferentes tamaños
      const sizes = [16, 32, 48, 64, 128, 256];
      sizes.forEach(size => {
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');
        
        // Escalar el diseño
        const scale = size / 256;
        ctx.scale(scale, scale);
        
        // Redibujar el icono escalado (versión simplificada para tamaños pequeños)
        if (size >= 64) {
          // Usar el diseño completo para tamaños grandes
          const originalBuffer = createPNGIcon();
          // Para simplificar, guardamos solo el PNG principal
        } else {
          // Diseño simplificado para iconos pequeños
          const gradient = ctx.createLinearGradient(0, 0, 256, 256);
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(0, 0, 256, 256, 32);
          ctx.fill();
          
          // Solo calculadora básica
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.roundRect(64, 64, 128, 128, 12);
          ctx.fill();
          
          ctx.fillStyle = '#4CAF50';
          ctx.font = 'bold 32px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('€', 128, 140);
        }
      });
      
      console.log('🎉 ¡Iconos creados exitosamente!');
      
    } else {
      console.error('❌ Error creando el archivo ICO');
    }
    
  } catch (error) {
    console.error('❌ Error creando el icono:', error.message);
  }
}

createIcon();
