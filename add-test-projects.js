// Script temporal para añadir proyectos de prueba
console.log('Para añadir proyectos de prueba, ejecuta este código en la consola del navegador:');
console.log('');
console.log(`
// Generar 20 proyectos de prueba
const testProjects = [];
const existingProjects = JSON.parse(localStorage.getItem('savedPieces3D') || '[]');

for(let i = 1; i <= 20; i++) {
  testProjects.push({
    id: Date.now() + i * 1000,
    name: 'Proyecto Test ' + i,
    type: 'resin',
    mlUsed: Math.floor(Math.random() * 200) + 50,
    resinType: ['Standard', 'Tough', 'Flexible', 'Castable'][Math.floor(Math.random() * 4)],
    printTime: (Math.random() * 8 + 1).toFixed(1),
    postProcessingTime: (Math.random() * 2 + 0.5).toFixed(1),
    finalPrice: (Math.random() * 50 + 10).toFixed(2),
    createdAt: new Date().toISOString(),
    image: null
  });
}

// Combinar con proyectos existentes
const allProjects = [...existingProjects, ...testProjects];
localStorage.setItem('savedPieces3D', JSON.stringify(allProjects));
console.log('Añadidos ' + testProjects.length + ' proyectos de prueba');
location.reload(); // Recargar para ver los cambios
`);
