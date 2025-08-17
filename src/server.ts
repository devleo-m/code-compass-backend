import { app } from './app';

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 URL: http://localhost:${PORT}`);
});
