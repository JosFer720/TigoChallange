const mocksTaller = [
  // ============= GET ENDPOINTS =============
  
  // 1. GET - Información de vehículo por placa
  {
    id: 'VEHICULO-GET-001',
    name: 'Obtener Vehículo por Placa',
    description: 'Obtiene información completa de un vehículo',
    path: '/api/vehiculos/:placa',
    method: 'GET',
    response: {
      status: 200,
      body: {
        id: 'VEH-001',
        placa: '{{params.placa}}',
        marca: 'Honda',
        modelo: 'Civic',
        año: 2021,
        color: 'Negro',
        tipoVehiculo: 'Sedán',
        tipoCombustible: 'Gasolina',
        numeroMotor: 'K20C3-1234567',
        numeroChasis: 'JHMFC1F31MX000123',
        kilometraje: 32500,
        fechaUltimaRevision: '2023-11-15',
        propietario: {
          id: 'CLI-001',
          nombre: 'María González López',
          dni: '12345678A',
          telefono: '+34 655 123 456',
          email: 'maria.gonzalez@email.com',
          direccion: 'Calle Mayor 45, Madrid 28013'
        },
        historialServicios: 5,
        serviciosPendientes: ['Cambio de aceite', 'Rotación de neumáticos'],
        garantiaActiva: true,
        fechaVencimientoGarantia: '2025-05-20'
      }
    }
  },

  // 2. GET - Lista de clientes del taller
  {
    id: 'CLIENTES-GET-001',
    name: 'Listar Clientes del Taller',
    description: 'Obtiene todos los clientes registrados',
    path: '/api/clientes',
    method: 'GET',
    response: {
      status: 200,
      body: {
        clientes: [
          {
            id: 'CLI-001',
            nombre: 'Carlos Martínez Ruiz',
            dni: '45678912B',
            telefono: '+34 611 222 333',
            email: 'carlos.martinez@email.com',
            vehiculosRegistrados: 2,
            clienteDesde: '2022-03-15',
            tipoCliente: 'Frecuente',
            descuentoAplicable: 10
          },
          {
            id: 'CLI-002',
            nombre: 'Ana Fernández García',
            dni: '78945612C',
            telefono: '+34 677 888 999',
            email: 'ana.fernandez@email.com',
            vehiculosRegistrados: 1,
            clienteDesde: '2023-07-20',
            tipoCliente: 'Regular',
            descuentoAplicable: 5
          },
          {
            id: 'CLI-003',
            nombre: 'Empresa Transportes López S.L.',
            cif: 'B12345678',
            telefono: '+34 915 555 666',
            email: 'mantenimiento@transporteslopez.com',
            vehiculosRegistrados: 15,
            clienteDesde: '2021-01-10',
            tipoCliente: 'Corporativo',
            descuentoAplicable: 15
          }
        ],
        total: 3,
        pagina: 1,
        porPagina: 10
      }
    }
  },

  // 3. GET - Órdenes de trabajo activas
  {
    id: 'ORDENES-GET-001',
    name: 'Obtener Órdenes de Trabajo Activas',
    description: 'Lista todas las órdenes de trabajo en proceso',
    path: '/api/ordenes-trabajo',
    method: 'GET',
    response: {
      status: 200,
      body: {
        ordenes: [
          {
            id: 'OT-2024-0145',
            fechaIngreso: '2024-01-15T08:30:00Z',
            vehiculo: {
              id: 'VEH-002',
              placa: 'ABC-123',
              marca: 'Ford',
              modelo: 'Focus',
              año: 2019
            },
            cliente: {
              id: 'CLI-004',
              nombre: 'Pedro Sánchez',
              telefono: '+34 633 444 555'
            },
            servicios: ['Cambio de aceite', 'Revisión de frenos', 'Alineación'],
            estado: 'En proceso',
            mecanico: {
              id: 'MEC-001',
              nombre: 'José Luis García'
            },
            tiempoEstimado: '3 horas',
            presupuesto: 285.50,
            observaciones: 'Cliente solicita revisión adicional de suspensión'
          },
          {
            id: 'OT-2024-0146',
            fechaIngreso: '2024-01-15T09:15:00Z',
            vehiculo: {
              id: 'VEH-003',
              placa: 'DEF-456',
              marca: 'Volkswagen',
              modelo: 'Golf',
              año: 2022
            },
            cliente: {
              id: 'CLI-005',
              nombre: 'Laura Jiménez',
              telefono: '+34 644 777 888'
            },
            servicios: ['Mantenimiento 20.000 km'],
            estado: 'Esperando repuestos',
            mecanico: {
              id: 'MEC-002',
              nombre: 'Miguel Ángel Fernández'
            },
            tiempoEstimado: '2 horas',
            presupuesto: 195.00,
            observaciones: 'Incluye cambio de filtros'
          }
        ],
        ordenesActivas: 2,
        ordenesCompletadasHoy: 5,
        tiempoPromedioServicio: '2.5 horas'
      }
    }
  },

  // 4. GET - Inventario de repuestos
  {
    id: 'REPUESTOS-GET-001',
    name: 'Consultar Inventario de Repuestos',
    description: 'Obtiene el stock de repuestos disponibles',
    path: '/api/repuestos',
    method: 'GET',
    response: {
      status: 200,
      body: {
        repuestos: [
          {
            id: 'REP-001',
            codigo: 'FIL-AC-001',
            nombre: 'Filtro de aceite universal',
            categoria: 'Filtros',
            marca: 'MANN-FILTER',
            stock: 45,
            stockMinimo: 20,
            precio: 12.50,
            ubicacion: 'Estante A-3',
            compatibilidad: ['Toyota', 'Honda', 'Mazda'],
            proveedor: {
              id: 'PROV-001',
              nombre: 'AutoPartes Madrid S.L.'
            }
          },
          {
            id: 'REP-002',
            codigo: 'PAS-FR-002',
            nombre: 'Pastillas de freno delanteras',
            categoria: 'Frenos',
            marca: 'Brembo',
            stock: 8,
            stockMinimo: 10,
            precio: 65.00,
            ubicacion: 'Estante B-1',
            compatibilidad: ['Volkswagen Golf', 'Seat León', 'Audi A3'],
            proveedor: {
              id: 'PROV-002',
              nombre: 'Frenos Premium S.A.'
            }
          },
          {
            id: 'REP-003',
            codigo: 'BAT-12V-003',
            nombre: 'Batería 12V 60Ah',
            categoria: 'Baterías',
            marca: 'Varta',
            stock: 12,
            stockMinimo: 5,
            precio: 95.00,
            ubicacion: 'Zona baterías',
            compatibilidad: ['Universal'],
            proveedor: {
              id: 'PROV-003',
              nombre: 'Baterías del Norte'
            }
          }
        ],
        totalItems: 3,
        valorInventario: 5425.50,
        itemsBajoStock: 1
      }
    }
  },

  // 5. GET - Detalle de orden de trabajo
  {
    id: 'ORDEN-DETALLE-GET-001',
    name: 'Obtener Detalle de Orden de Trabajo',
    description: 'Obtiene información detallada de una orden específica',
    path: '/api/ordenes-trabajo/:ordenId',
    method: 'GET',
    response: {
      status: 200,
      body: {
        id: '{{params.ordenId}}',
        fechaCreacion: '2024-01-15T08:30:00Z',
        fechaActualizacion: '2024-01-15T10:45:00Z',
        estado: 'En proceso',
        prioridad: 'Normal',
        vehiculo: {
          id: 'VEH-001',
          placa: 'GHI-789',
          marca: 'Toyota',
          modelo: 'RAV4',
          año: 2020,
          kilometraje: 45000
        },
        cliente: {
          id: 'CLI-001',
          nombre: 'Roberto Díaz Martín',
          telefono: '+34 622 333 444',
          email: 'roberto.diaz@email.com'
        },
        serviciosSolicitados: [
          {
            id: 'SERV-001',
            nombre: 'Cambio de aceite y filtro',
            categoria: 'Mantenimiento',
            estado: 'Completado',
            precio: 65.00,
            tiempoEstimado: '30 min',
            tiempoReal: '25 min'
          },
          {
            id: 'SERV-002',
            nombre: 'Revisión de frenos',
            categoria: 'Seguridad',
            estado: 'En proceso',
            precio: 45.00,
            tiempoEstimado: '45 min',
            tiempoReal: null
          },
          {
            id: 'SERV-003',
            nombre: 'Alineación y balanceo',
            categoria: 'Suspensión',
            estado: 'Pendiente',
            precio: 80.00,
            tiempoEstimado: '1 hora',
            tiempoReal: null
          }
        ],
        repuestosUtilizados: [
          {
            id: 'REP-001',
            codigo: 'FIL-AC-001',
            nombre: 'Filtro de aceite',
            cantidad: 1,
            precioUnitario: 12.50,
            subtotal: 12.50
          },
          {
            id: 'REP-004',
            codigo: 'ACE-5W30-4L',
            nombre: 'Aceite motor 5W-30 4L',
            cantidad: 1,
            precioUnitario: 28.00,
            subtotal: 28.00
          }
        ],
        mecanico: {
          id: 'MEC-001',
          nombre: 'José Luis García',
          especialidad: 'Motor'
        },
        diagnostico: 'Vehículo en buen estado general. Se detectó desgaste leve en pastillas de freno.',
        recomendaciones: [
          'Cambiar pastillas de freno en próximo servicio',
          'Revisar líquido de transmisión en 5000 km'
        ],
        totales: {
          subtotalServicios: 190.00,
          subtotalRepuestos: 40.50,
          descuento: 10.00,
          iva: 48.41,
          total: 278.91
        },
        tiempoTotal: {
          estimado: '2 horas 15 min',
          real: '25 min',
          restante: '1 hora 50 min'
        }
      }
    }
  },

  // ============= POST ENDPOINTS =============

  // 6. POST - Registrar nuevo vehículo
  {
    id: 'VEHICULO-POST-001',
    name: 'Registrar Nuevo Vehículo',
    description: 'Registra un nuevo vehículo en el sistema',
    path: '/api/vehiculos',
    method: 'POST',
    response: {
      status: 201,
      body: {
        id: 'VEH-NEW-001',
        placa: '{{body.placa}}',
        marca: '{{body.marca}}',
        modelo: '{{body.modelo}}',
        año: '{{body.año}}',
        color: '{{body.color}}',
        tipoVehiculo: '{{body.tipoVehiculo}}',
        numeroMotor: '{{body.numeroMotor}}',
        numeroChasis: '{{body.numeroChasis}}',
        propietarioId: '{{body.propietarioId}}',
        fechaRegistro: '2024-01-15T11:00:00Z',
        estado: 'Activo',
        mensaje: 'Vehículo registrado exitosamente'
      }
    }
  },

  // 7. POST - Crear nuevo cliente
  {
    id: 'CLIENTE-POST-001',
    name: 'Registrar Nuevo Cliente',
    description: 'Registra un nuevo cliente en el taller',
    path: '/api/clientes',
    method: 'POST',
    response: {
      status: 201,
      body: {
        id: 'CLI-NEW-001',
        nombre: '{{body.nombre}}',
        dni: '{{body.dni}}',
        telefono: '{{body.telefono}}',
        email: '{{body.email}}',
        direccion: '{{body.direccion}}',
        tipoCliente: 'Nuevo',
        descuentoAplicable: 0,
        vehiculosRegistrados: 0,
        clienteDesde: '2024-01-15',
        credito: {
          disponible: 500.00,
          usado: 0.00,
          limite: 500.00
        },
        estado: 'Activo',
        mensaje: 'Cliente registrado correctamente'
      }
    }
  },

  // 8. POST - Crear orden de trabajo
  {
    id: 'ORDEN-POST-001',
    name: 'Crear Nueva Orden de Trabajo',
    description: 'Crea una nueva orden de trabajo para un vehículo',
    path: '/api/ordenes-trabajo',
    method: 'POST',
    response: {
      status: 201,
      body: {
        id: 'OT-2024-0147',
        fechaCreacion: '2024-01-15T11:30:00Z',
        vehiculoId: '{{body.vehiculoId}}',
        clienteId: '{{body.clienteId}}',
        serviciosSolicitados: '{{body.servicios}}',
        prioridad: '{{body.prioridad}}',
        observaciones: '{{body.observaciones}}',
        estado: 'Recepción',
        mecanicoAsignado: null,
        presupuestoInicial: null,
        tiempoEstimado: null,
        siguientePaso: 'Diagnóstico inicial',
        numeroAutorizacion: 'AUTH-2024-0147',
        fechaPromesa: '2024-01-16T18:00:00Z',
        mensaje: 'Orden de trabajo creada. El vehículo está en recepción.'
      }
    }
  },

  // 9. POST - Agregar servicio a orden existente
  {
    id: 'SERVICIO-POST-001',
    name: 'Agregar Servicio a Orden',
    description: 'Agrega un servicio adicional a una orden de trabajo existente',
    path: '/api/ordenes-trabajo/:ordenId/servicios',
    method: 'POST',
    response: {
      status: 200,
      body: {
        ordenId: '{{params.ordenId}}',
        servicioAgregado: {
          id: 'SERV-NEW-001',
          nombre: '{{body.nombre}}',
          categoria: '{{body.categoria}}',
          precio: '{{body.precio}}',
          tiempoEstimado: '{{body.tiempoEstimado}}',
          requiereAutorizacion: '{{body.requiereAutorizacion}}',
          estado: 'Pendiente autorización'
        },
        totalesActualizados: {
          subtotalServicios: 310.00,
          subtotalRepuestos: 40.50,
          descuento: 10.00,
          iva: 71.51,
          total: 411.51
        },
        mensaje: 'Servicio agregado correctamente. Requiere autorización del cliente.'
      }
    }
  },

  // 10. POST - Entrada de repuestos al inventario
  {
    id: 'REPUESTO-POST-001',
    name: 'Registrar Entrada de Repuestos',
    description: 'Registra la entrada de repuestos al inventario',
    path: '/api/repuestos/entrada',
    method: 'POST',
    response: {
      status: 201,
      body: {
        movimientoId: 'MOV-2024-0089',
        tipo: 'Entrada',
        fecha: '2024-01-15T12:00:00Z',
        repuestos: '{{body.repuestos}}',
        proveedor: '{{body.proveedor}}',
        numeroFactura: '{{body.numeroFactura}}',
        resumen: {
          totalItems: 5,
          totalUnidades: 150,
          valorTotal: 2345.50
        },
        ubicacionesAsignadas: [
          {
            repuestoId: 'REP-001',
            ubicacion: 'Estante A-3',
            cantidad: 50
          }
        ],
        mensaje: 'Entrada de repuestos registrada correctamente'
      }
    }
  },

  // 11. POST - Asignar mecánico a orden
  {
    id: 'ASIGNAR-MECANICO-POST-001',
    name: 'Asignar Mecánico a Orden',
    description: 'Asigna un mecánico a una orden de trabajo',
    path: '/api/ordenes-trabajo/:ordenId/asignar-mecanico',
    method: 'POST',
    response: {
      status: 200,
      body: {
        ordenId: '{{params.ordenId}}',
        mecanicoAsignado: {
          id: '{{body.mecanicoId}}',
          nombre: 'Miguel Ángel Fernández',
          especialidades: ['Frenos', 'Suspensión']
        },
        fechaAsignacion: '2024-01-15T12:30:00Z',
        tiempoEstimadoInicio: '15 minutos',
        prioridad: 'Normal',
        cargaTrabajoMecanico: {
          ordenesActivas: 2,
          tiempoComprometido: '4 horas',
          disponibilidad: 'Parcial'
        },
        mensaje: 'Mecánico asignado correctamente a la orden'
      }
    }
  },

  // 12. POST - Generar presupuesto
  {
    id: 'PRESUPUESTO-POST-001',
    name: 'Generar Presupuesto',
    description: 'Genera un presupuesto para una orden de trabajo',
    path: '/api/presupuestos',
    method: 'POST',
    response: {
      status: 201,
      body: {
        id: 'PRES-2024-0234',
        ordenTrabajoId: '{{body.ordenTrabajoId}}',
        fecha: '2024-01-15T13:00:00Z',
        validezDias: 15,
        vehiculo: {
          placa: 'JKL-012',
          marca: 'Renault',
          modelo: 'Megane'
        },
        cliente: {
          nombre: 'Carmen López',
          email: 'carmen.lopez@email.com'
        },
        servicios: '{{body.servicios}}',
        repuestos: '{{body.repuestos}}',
        totales: {
          subtotalServicios: 225.00,
          subtotalRepuestos: 145.50,
          descuento: 18.50,
          iva: 73.92,
          total: 425.92
        },
        condiciones: [
          'Presupuesto válido por 15 días',
          'Precios sujetos a disponibilidad de repuestos',
          'Garantía de 6 meses en mano de obra'
        ],
        estado: 'Pendiente aprobación',
        urlPdf: '/api/presupuestos/PRES-2024-0234/pdf',
        mensaje: 'Presupuesto generado y enviado al cliente'
      }
    }
  },

  // 13. POST - Registrar pago
  {
    id: 'PAGO-POST-001',
    name: 'Registrar Pago',
    description: 'Registra un pago realizado por el cliente',
    path: '/api/pagos',
    method: 'POST',
    response: {
      status: 201,
      body: {
        id: 'PAG-2024-0567',
        fecha: '2024-01-15T14:00:00Z',
        ordenTrabajoId: '{{body.ordenTrabajoId}}',
        clienteId: '{{body.clienteId}}',
        monto: '{{body.monto}}',
        metodoPago: '{{body.metodoPago}}',
        referencia: '{{body.referencia}}',
        detalles: {
          totalOrden: 425.92,
          montoPagado: '{{body.monto}}',
          saldoPendiente: 0.00,
          cambio: 0.00
        },
        factura: {
          numero: 'FAC-2024-0789',
          fecha: '2024-01-15',
          urlPdf: '/api/facturas/FAC-2024-0789/pdf'
        },
        estado: 'Completado',
        mensaje: 'Pago registrado correctamente. Factura generada.'
      }
    }
  },

  // 14. GET - Lista de mecánicos
  {
    id: 'MECANICOS-GET-001',
    name: 'Listar Mecánicos del Taller',
    description: 'Obtiene la lista de mecánicos y su disponibilidad',
    path: '/api/mecanicos',
    method: 'GET',
    response: {
      status: 200,
      body: {
        mecanicos: [
          {
            id: 'MEC-001',
            nombre: 'José Luis García',
            especialidades: ['Motor', 'Transmisión', 'Diagnóstico electrónico'],
            experiencia: '15 años',
            estado: 'Ocupado',
            ordenActual: 'OT-2024-0145',
            certificaciones: ['ASE Master Technician', 'Bosch Car Service'],
            calificacion: 4.8,
            serviciosCompletadosHoy: 3
          },
          {
            id: 'MEC-002',
            nombre: 'Miguel Ángel Fernández',
            especialidades: ['Frenos', 'Suspensión', 'Alineación'],
            experiencia: '8 años',
            estado: 'Disponible',
            ordenActual: null,
            certificaciones: ['ASE Brakes', 'Hunter Alignment'],
            calificacion: 4.6,
            serviciosCompletadosHoy: 2
          },
          {
            id: 'MEC-003',
            nombre: 'Roberto Díaz',
            especialidades: ['Electricidad', 'Aire acondicionado', 'Electrónica'],
            experiencia: '12 años',
            estado: 'En descanso',
            ordenActual: null,
            certificaciones: ['Automotive Electrician Certificate'],
            calificacion: 4.9,
            serviciosCompletadosHoy: 4
          }
        ],
        totalMecanicos: 3,
        mecanicosDisponibles: 1,
        capacidadTaller: '85%'
      }
    }
  },

  // 15. GET - Historial de servicios
  {
    id: 'HISTORIAL-GET-001',
    name: 'Historial de Servicios por Vehículo',
    description: 'Obtiene el historial completo de servicios de un vehículo',
    path: '/api/vehiculos/:placa/historial',
    method: 'GET',
    response: {
      status: 200,
      body: {
        placa: '{{params.placa}}',
        vehiculo: {
          marca: 'Nissan',
          modelo: 'Qashqai',
          año: 2020
        },
        propietario: 'Alberto Ruiz Martín',
        historial: [
          {
            fecha: '2024-01-10',
            ordenTrabajo: 'OT-2024-0089',
            kilometraje: 45000,
            servicios: ['Mantenimiento 45.000 km', 'Cambio de aceite', 'Rotación de neumáticos'],
            repuestosUsados: ['Filtro aceite', 'Aceite 5W-30 4L', 'Filtro aire'],
            mecanico: 'José Luis García',
            costo: 185.50,
            garantia: '3 meses',
            observaciones: 'Se recomienda cambio de líquido de frenos en próximo servicio'
          },
          {
            fecha: '2023-08-22',
            ordenTrabajo: 'OT-2023-1567',
            kilometraje: 35000,
            servicios: ['Cambio de pastillas de freno', 'Revisión general'],
            repuestosUsados: ['Pastillas freno delanteras', 'Líquido de frenos'],
            mecanico: 'Miguel Ángel Fernández',
            costo: 245.00,
            garantia: '6 meses',
            observaciones: 'Frenos en perfecto estado'
          }
        ],
        proximoServicio: {
          kilometraje: 50000,
          fecha: '2024-04-10',
          serviciosRecomendados: ['Cambio de líquido de frenos', 'Cambio de bujías']
        }
      }
    }
  }
];

module.exports = mocksTaller;