'use client';

import React, { useState } from 'react';
import { Shield, Car, Lock, User, Eye, EyeOff, Search, LogOut, Clock, AlertCircle, CheckCircle, UserCheck } from 'lucide-react';

interface UserType {
  dni: string;
  password?: string;
  role: 'ciudadano' | 'notario';
  name: string;
}

interface VehiculoType {
  placa: string;
  marca: string;
  modelo: string;
  año: number;
  color: string;
  estado: string;
  vin: string;
  propietario: string;
  dni: string;
  direccion: string;
  cargas: string;
}

interface ConsultaType {
  fecha: string;
  usuario: string;
  role: string;
  placa: string;
  motivo: string;
}

const NOTARIOS: Record<string, { password: string; name: string }> = {
  '87654321': { password: 'notario123', name: 'Dr. Pedro López' }
};

const CIUDADANOS_SIMULADOS: Record<string, string> = {
  '12345678': 'María González',
  '11111111': 'Carlos Rodríguez',
  '22222222': 'Ana Fernández'
};

const VEHICULOS: Record<string, VehiculoType> = {
  'ABC-123': {
    placa: 'ABC-123',
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2018,
    color: 'Plata',
    estado: 'Vigente',
    vin: 'JT2BF12E4X0123456',
    propietario: 'Juan Pérez Gómez',
    dni: '45678912',
    direccion: 'Av. Los Pinos 456, Lima',
    cargas: 'Sin cargas registrales'
  },
  'XYZ-789': {
    placa: 'XYZ-789',
    marca: 'Honda',
    modelo: 'Civic',
    año: 2020,
    color: 'Negro',
    estado: 'Vigente',
    vin: 'JHMFC1F77LX012345',
    propietario: 'Ana Martínez Silva',
    dni: '23456789',
    direccion: 'Jr. Las Flores 234, Callao',
    cargas: 'Prenda registrada - Banco Continental'
  }
};

export default function SunarpMejorado() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loginMode, setLoginMode] = useState<'ciudadano' | 'notario'>('ciudadano');
  const [dni, setDni] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');
  const [vehiculo, setVehiculo] = useState<VehiculoType | null>(null);
  const [searchError, setSearchError] = useState<string>('');
  const [consultaMotivo, setConsultaMotivo] = useState<string>('');
  const [historialConsultas, setHistorialConsultas] = useState<ConsultaType[]>([]);

  const handleLogin = () => {
    setLoginError('');

    if (!dni) {
      setLoginError('Por favor ingrese su DNI');
      return;
    }

    if (loginMode === 'ciudadano') {
      const nombreCiudadano = CIUDADANOS_SIMULADOS[dni];
      
      if (nombreCiudadano) {
        setUser({
          dni,
          role: 'ciudadano',
          name: nombreCiudadano
        });
        setIsLoggedIn(true);
        setDni('');
      } else {
        setLoginError('DNI no registrado en RENIEC');
      }
    } else {
      if (!password) {
        setLoginError('Los notarios deben ingresar contraseña');
        return;
      }

      const notario = NOTARIOS[dni];
      
      if (notario && notario.password === password) {
        setUser({
          dni,
          role: 'notario',
          name: notario.name
        });
        setIsLoggedIn(true);
        setDni('');
        setPassword('');
      } else {
        setLoginError('DNI o contraseña incorrectos');
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setVehiculo(null);
    setPlaca('');
    setConsultaMotivo('');
  };

  const handleSearch = () => {
    setSearchError('');
    setVehiculo(null);

    if (!user) return;

    const vehiculoEncontrado = VEHICULOS[placa.toUpperCase()];

    if (!vehiculoEncontrado) {
      setSearchError('Vehículo no encontrado');
      return;
    }

    if (user.role === 'notario' && !consultaMotivo) {
      setSearchError('Debe especificar el motivo de la consulta');
      return;
    }

    const consulta: ConsultaType = {
      fecha: new Date().toLocaleString('es-PE'),
      usuario: user.name,
      role: user.role,
      placa: placa.toUpperCase(),
      motivo: consultaMotivo || 'Consulta pública'
    };

    setHistorialConsultas([consulta, ...historialConsultas]);
    setVehiculo(vehiculoEncontrado);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">SUNARP</h1>
            <p className="text-gray-600">Sistema de Consulta Vehicular Segura</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setLoginMode('ciudadano');
                setPassword('');
                setLoginError('');
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition duration-200 ${
                loginMode === 'ciudadano'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              👤 Ciudadano
            </button>
            <button
              onClick={() => {
                setLoginMode('notario');
                setLoginError('');
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition duration-200 ${
                loginMode === 'notario'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ⚖️ Notario
            </button>
          </div>

          {loginMode === 'ciudadano' ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Acceso Ciudadano:</strong> Solo necesitas tu DNI para consultar datos públicos de vehículos (marca, modelo, año). No se muestran datos personales del propietario.
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Acceso Notario:</strong> Requiere DNI y contraseña. Permite acceder a datos personales del propietario bajo justificación legal.
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DNI
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (loginMode === 'ciudadano' ? handleLogin() : null)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese su DNI"
                />
              </div>
            </div>

            {loginMode === 'notario' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingrese su contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{loginError}</span>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {loginMode === 'ciudadano' ? <UserCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              Iniciar Sesión
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-medium">Credenciales de prueba:</p>
            <div className="space-y-3 text-xs bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="font-semibold text-gray-700">👤 Ciudadanos (solo DNI):</p>
                <p className="text-gray-600">12345678, 11111111, 22222222</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">⚖️ Notario (DNI + contraseña):</p>
                <p className="text-gray-600">DNI: 87654321 / Pass: notario123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">SUNARP</h1>
                <p className="text-sm text-gray-600">Consulta Vehicular Segura</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">
                  {user?.role === 'notario' ? '⚖️ Notario Autorizado' : '👤 Ciudadano'}
                </p>
                <p className="text-xs text-gray-400">DNI: {user?.dni}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Consultar Vehículo
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Placa
                  </label>
                  <input
                    type="text"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                    placeholder="Ej: ABC-123"
                  />
                  <p className="text-xs text-gray-500 mt-1">Placas de prueba: ABC-123, XYZ-789</p>
                </div>

                {user?.role === 'notario' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motivo de Consulta *
                    </label>
                    <select
                      value={consultaMotivo}
                      onChange={(e) => setConsultaMotivo(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccione un motivo</option>
                      <option value="Compraventa vehicular">Compraventa vehicular</option>
                      <option value="Trámite notarial">Trámite notarial</option>
                      <option value="Verificación legal">Verificación legal</option>
                      <option value="Proceso judicial">Proceso judicial</option>
                    </select>
                  </div>
                )}

                {searchError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{searchError}</span>
                  </div>
                )}

                <button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Buscar Vehículo
                </button>
              </div>
            </div>

            {vehiculo && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Car className="w-6 h-6" />
                    Información del Vehículo
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Placa</p>
                      <p className="text-lg font-bold text-gray-800">{vehiculo.placa}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Estado</p>
                      <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        {vehiculo.estado}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Marca</p>
                      <p className="text-base font-semibold text-gray-800">{vehiculo.marca}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Modelo</p>
                      <p className="text-base font-semibold text-gray-800">{vehiculo.modelo}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Año</p>
                      <p className="text-base font-semibold text-gray-800">{vehiculo.año}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Color</p>
                      <p className="text-base font-semibold text-gray-800">{vehiculo.color}</p>
                    </div>
                  </div>

                  {user?.role === 'notario' ? (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <p className="text-sm text-yellow-800 font-medium flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Información sensible - Solo visible para usuarios autorizados
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                          <span className="text-sm text-gray-600">Propietario:</span>
                          <span className="text-sm font-semibold text-gray-800">{vehiculo.propietario}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                          <span className="text-sm text-gray-600">DNI:</span>
                          <span className="text-sm font-semibold text-gray-800">{vehiculo.dni}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                          <span className="text-sm text-gray-600">Dirección:</span>
                          <span className="text-sm font-semibold text-gray-800">{vehiculo.direccion}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                          <span className="text-sm text-gray-600">VIN:</span>
                          <span className="text-sm font-semibold text-gray-800 font-mono">{vehiculo.vin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cargas/Gravámenes:</span>
                          <span className="text-sm font-semibold text-gray-800">{vehiculo.cargas}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800 flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          <span>
                            <strong>Datos del propietario protegidos.</strong> Para acceder a información completa del titular, 
                            debe autenticarse como notario o usuario autorizado con credenciales especiales.
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Historial de Consultas
              </h3>
              
              {historialConsultas.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No hay consultas registradas
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {historialConsultas.map((consulta, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-semibold text-gray-800">{consulta.placa}</span>
                        <span className="text-xs text-gray-500">{consulta.fecha}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        <strong>Usuario:</strong> {consulta.usuario}
                      </p>
                      <p className="text-xs text-gray-600 capitalize">
                        <strong>Motivo:</strong> {consulta.motivo}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Privacidad y Seguridad
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Todas las consultas quedan registradas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Datos personales protegidos por rol de usuario</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Autenticación diferenciada según tipo de acceso</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Cumplimiento con Ley N° 29733 y RGPD</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}