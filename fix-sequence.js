const { PrismaClient } = require('@prisma/client');

async function fixSequence() {
  const prisma = new PrismaClient();
  
  try {
    // Resetează secvența la valoarea corectă
    await prisma.$executeRaw`SELECT setval('public."Exercise_id_seq"', (SELECT COALESCE(MAX(id), 0) FROM "Exercise") + 1)`;
    
    console.log('✅ Secvența a fost resetată cu succes!');
  } catch (error) {
    console.error('❌ Eroare:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixSequence(); 