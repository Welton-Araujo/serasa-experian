import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('\n🔴 Servidor encerrado');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🔴 Servidor finalizado');
  process.exit(0);
});
