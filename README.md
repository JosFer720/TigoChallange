# 🚗 Mock API - Sistema de Taller de Autos

API REST para crear y gestionar mocks de endpoints dinámicamente. Incluye 15+ endpoints pre-configurados para simular un sistema completo de gestión de taller automotriz.

## 🚀 Inicio Rápido

### Opción 1: Desarrollo Local
```bash
# Clonar repositorio
git clone https://github.com/JosFer720/TigoChallange
cd mock-api

# Instalar dependencias
npm install

# Configurar entorno
cp .env.example .env

# Ejecutar
npm run dev
```

### Opción 2: Docker
```bash
# Construir y ejecutar
docker build -t mock-api .
docker run -p 4001:4001 mock-api

# O con Docker Compose
docker-compose up -d
```

## 📚 Documentación Interactiva - Swagger UI

### 🌐 Acceder a Swagger
Abre tu navegador en: **http://localhost:4001/api-docs**

### 🎯 Cómo usar Swagger UI

1. **Explorar endpoints**: Verás todos los endpoints organizados por categorías
2. **Probar endpoint**: Click en cualquier endpoint → "Try it out"
3. **Ejecutar**: Modifica parámetros → "Execute"
4. **Ver respuesta**: La respuesta aparece abajo con código de estado

### ✅ Verificación Inicial

1. En Swagger, busca el endpoint **Health** (`GET /health`)
2. Click en "Try it out" → "Execute"
3. Deberías ver:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

## 📋 Mocks Pre-configurados (IDs Reales)

La API viene con estos mocks ya configurados:

| ID del Mock | Endpoint | Descripción |
|-------------|----------|-------------|
| `VEHICULO-GET-001` | GET `/api/vehiculos/:placa` | Obtener vehículo |
| `CLIENTES-GET-001` | GET `/api/clientes` | Listar clientes |
| `ORDENES-GET-001` | GET `/api/ordenes-trabajo` | Órdenes activas |
| `REPUESTOS-GET-001` | GET `/api/repuestos` | Inventario |
| `ORDEN-DETALLE-GET-001` | GET `/api/ordenes-trabajo/:ordenId` | Detalle orden |
| `VEHICULO-POST-001` | POST `/api/vehiculos` | Registrar vehículo |
| `CLIENTE-POST-001` | POST `/api/clientes` | Crear cliente |
| `ORDEN-POST-001` | POST `/api/ordenes-trabajo` | Nueva orden |

## 🔍 Ejemplos de Uso

### 1. GESTIÓN DE CONFIGURACIONES

#### 📝 Ver todos los mocks configurados

**En Swagger UI:**
1. Busca `GET /api/configs`
2. Click "Try it out" → "Execute"
3. Verás los 15 mocks pre-cargados con sus IDs reales

**Con curl:**
```bash
curl http://localhost:4001/api/configs | jq '.data[].id'
```

#### 🔧 Ver detalle de un mock específico

**En Swagger UI:**
1. Busca `GET /api/configs/{id}`
2. En el campo `id` escribe: `VEHICULO-GET-001`
3. Click "Execute"

**Con curl:**
```bash
curl http://localhost:4001/api/configs/VEHICULO-GET-001
```

### 2. VEHÍCULOS

#### 🚗 Consultar información de vehículo

**En Swagger UI:**
1. Busca el endpoint mock: `GET /api/vehiculos/{placa}`
2. En `placa` escribe: `ABC-123`
3. Click "Execute"

**Respuesta:**
```json
{
  "id": "VEH-001",
  "placa": "ABC-123",
  "marca": "Honda",
  "modelo": "Civic",
  "año": 2021,
  "propietario": {
    "id": "CLI-001",
    "nombre": "María González López"
  }
}
```

**Con curl:**
```bash
curl http://localhost:4001/api/vehiculos/ABC-123
```

#### ➕ Registrar nuevo vehículo

**En Swagger UI:**
1. Busca `POST /api/vehiculos`
2. Click "Try it out"
3. En el body, modifica los valores:
```json
{
  "placa": "NEW-123",
  "marca": "Toyota",
  "modelo": "Corolla",
  "año": 2023,
  "color": "Rojo",
  "propietarioId": "CLI-001"
}
```
4. Click "Execute"

### 3. CLIENTES

#### 👥 Ver clientes registrados (ID: CLIENTES-GET-001)

**En Swagger UI:**
1. Busca `GET /api/clientes`
2. Click "Try it out" → "Execute"
3. Verás 3 clientes pre-configurados:
   - `CLI-001`: Carlos Martínez Ruiz
   - `CLI-002`: Ana Fernández García
   - `CLI-003`: Empresa Transportes López S.L.

### 4. ÓRDENES DE TRABAJO

#### 📋 Ver órdenes activas (ID: ORDENES-GET-001)

**En Swagger UI:**
1. Busca `GET /api/ordenes-trabajo`
2. Click "Execute"
3. Verás 2 órdenes activas:
   - `OT-2024-0145`: Ford Focus - En proceso
   - `OT-2024-0146`: Volkswagen Golf - Esperando repuestos

#### 🔍 Ver detalle de orden específica

**En Swagger UI:**
1. Busca `GET /api/ordenes-trabajo/{ordenId}`
2. En `ordenId` escribe: `OT-2024-0145`
3. Click "Execute"

### 5. INVENTARIO

#### 📦 Consultar repuestos (ID: REPUESTOS-GET-001)

**En Swagger UI:**
1. Busca `GET /api/repuestos`
2. Click "Execute"
3. Verás 3 repuestos en inventario:
   - `REP-001`: Filtro de aceite (45 unidades)
   - `REP-002`: Pastillas de freno (8 unidades) ⚠️ Bajo stock
   - `REP-003`: Batería 12V (12 unidades)

## 🛠 Gestión Avanzada de Mocks

### Crear un mock personalizado

**En Swagger UI:**
1. Busca `POST /api/configs`
2. Click "Try it out"
3. Usa este ejemplo:
```json
{
  "id": "MI-MOCK-001",
  "name": "Mi Endpoint Personalizado",
  "path": "/api/mi-endpoint/:id",
  "method": "GET",
  "response": {
    "status": 200,
    "body": {
      "id": "{{params.id}}",
      "mensaje": "Este es mi mock personalizado",
      "fecha": "2024-01-15"
    }
  }
}
```
4. Click "Execute"
5. Ahora puedes probar tu nuevo endpoint en `/api/mi-endpoint/123`

### Actualizar un mock existente

**En Swagger UI:**
1. Busca `PUT /api/configs/{id}`
2. En `id` escribe: `VEHICULO-GET-001`
3. En el body:
```json
{
  "enabled": false
}
```
4. Esto deshabilitará temporalmente el endpoint de vehículos

### Variables dinámicas disponibles

Los mocks soportan estas variables:
- `{{params.id}}` - Parámetros de ruta
- `{{query.nombre}}` - Query parameters
- `{{body.campo}}` - Campos del body
- `{{headers.authorization}}` - Headers

**Ejemplo en Swagger:**
1. Crea un mock con `POST /api/configs`:
```json
{
  "name": "Test Variables",
  "path": "/api/test/:userId",
  "method": "POST",
  "response": {
    "body": {
      "userId": "{{params.userId}}",
      "userName": "{{body.name}}",
      "filter": "{{query.type}}"
    }
  }
}
```

## 📊 Referencia Rápida de IDs

### Mocks GET
- `VEHICULO-GET-001` → Info vehículo
- `CLIENTES-GET-001` → Lista clientes
- `ORDENES-GET-001` → Órdenes activas
- `REPUESTOS-GET-001` → Inventario
- `MECANICOS-GET-001` → Lista mecánicos
- `ORDEN-DETALLE-GET-001` → Detalle orden
- `HISTORIAL-GET-001` → Historial vehículo

### Mocks POST
- `VEHICULO-POST-001` → Registrar vehículo
- `CLIENTE-POST-001` → Crear cliente
- `ORDEN-POST-001` → Nueva orden
- `SERVICIO-POST-001` → Agregar servicio
- `REPUESTO-POST-001` → Entrada repuestos
- `ASIGNAR-MECANICO-POST-001` → Asignar mecánico
- `PRESUPUESTO-POST-001` → Generar presupuesto
- `PAGO-POST-001` → Registrar pago

## 🧪 Testing con Swagger

### Flujo completo de prueba

1. **Ver clientes** → GET `/api/clientes`
2. **Crear cliente** → POST `/api/clientes`
3. **Ver vehículos** → GET `/api/vehiculos/ABC-123`
4. **Crear orden** → POST `/api/ordenes-trabajo`
5. **Ver orden creada** → GET `/api/ordenes-trabajo/{id}`

## 💡 Tips para Swagger UI

1. **Autorización**: Si un endpoint requiere headers, agrégalos en "Parameters"
2. **Formato**: Swagger formatea automáticamente las respuestas JSON
3. **Historial**: Tu navegador guarda el historial de pruebas
4. **Copiar**: Puedes copiar el curl command desde Swagger

## 🐳 Docker - Verificación

```bash
# Ver logs en tiempo real
docker-compose logs -f mock-api

# Verificar mocks cargados
docker-compose exec mock-api sh -c "curl localhost:4001/api/configs | jq '.count'"
# Resultado esperado: 15
```

## 🆘 Troubleshooting

### No veo Swagger UI
1. Verifica que el servidor esté corriendo
2. Abre exactamente: http://localhost:4001/api-docs
3. Revisa los logs por errores

### Un mock no funciona
1. En Swagger, ve a `GET /api/configs/{id}`
2. Verifica que `enabled: true`
3. Revisa la estructura del path y método
