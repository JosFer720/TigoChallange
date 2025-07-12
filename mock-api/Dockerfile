FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema si es necesario
RUN apk add --no-cache curl

# Copiar archivos de package
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install --production

# Copiar el resto de la aplicación
COPY . .

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

# Exponer puerto
EXPOSE 4001

# Health check con el puerto correcto
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4001/health || exit 1

# Iniciar aplicación
CMD ["node", "server.js"]