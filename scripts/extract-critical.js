const critical = require('critical');
const fs = require('fs');
const path = require('path');

async function extractCritical() {
  try {
    const result = await critical.generate({
      base: 'out/',
      src: 'index.html',
      target: {
        css: 'styles/critical.css',
        html: 'index-critical.html',
        uncritical: 'styles/non-critical.css',
      },
      width: 1300,
      height: 900,
      inline: true,
      ignore: {
        atrule: ['@font-face']
      },
      dimensions: [
        {
          height: 500,
          width: 300,
        },
        {
          height: 900,
          width: 1300,
        },
      ],
    });

    // Copiar o CSS crítico para o arquivo da aplicação
    fs.writeFileSync(
      path.join(process.cwd(), 'app/critical.css'),
      result.css,
      'utf-8'
    );

    console.log('Critical CSS extracted successfully!');
  } catch (err) {
    console.error('Error extracting critical CSS:', err);
  }
}

extractCritical();
