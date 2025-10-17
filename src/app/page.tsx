// 'use client';

// import React, { useState } from 'react';
// import { Shield, Car, Lock, User, Eye, EyeOff, Search, LogOut, Clock, AlertCircle, CheckCircle, UserCheck } from 'lucide-react';

// interface UserType {
//   dni: string;
//   password?: string;
//   role: 'ciudadano' | 'notario';
//   name: string;
// }

// interface VehiculoType {
//   placa: string;
//   marca: string;
//   modelo: string;
//   año: number;
//   color: string;
//   estado: string;
//   vin: string;
//   propietario: string;
//   dni: string;
//   direccion: string;
//   cargas: string;
// }

// interface ConsultaType {
//   fecha: string;
//   usuario: string;
//   role: string;
//   placa: string;
//   motivo: string;
// }

// const NOTARIOS: Record<string, { password: string; name: string }> = {
//   '87654321': { password: 'notario123', name: 'Dr. Pedro López' }
// };

// const CIUDADANOS_SIMULADOS: Record<string, string> = {
//   '12345678': 'María González',
//   '11111111': 'Carlos Rodríguez',
//   '22222222': 'Ana Fernández'
// };

// const VEHICULOS: Record<string, VehiculoType> = {
//   'ABC-123': {
//     placa: 'ABC-123',
//     marca: 'Toyota',
//     modelo: 'Corolla',
//     año: 2018,
//     color: 'Plata',
//     estado: 'Vigente',
//     vin: 'JT2BF12E4X0123456',
//     propietario: 'Juan Pérez Gómez',
//     dni: '45678912',
//     direccion: 'Av. Los Pinos 456, Lima',
//     cargas: 'Sin cargas registrales'
//   },
//   'XYZ-789': {
//     placa: 'XYZ-789',
//     marca: 'Honda',
//     modelo: 'Civic',
//     año: 2020,
//     color: 'Negro',
//     estado: 'Vigente',
//     vin: 'JHMFC1F77LX012345',
//     propietario: 'Ana Martínez Silva',
//     dni: '23456789',
//     direccion: 'Jr. Las Flores 234, Callao',
//     cargas: 'Prenda registrada - Banco Continental'
//   }
// };

// export default function SunarpMejorado() {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [user, setUser] = useState<UserType | null>(null);
//   const [loginMode, setLoginMode] = useState<'ciudadano' | 'notario'>('ciudadano');
//   const [dni, setDni] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [loginError, setLoginError] = useState<string>('');
//   const [placa, setPlaca] = useState<string>('');
//   const [vehiculo, setVehiculo] = useState<VehiculoType | null>(null);
//   const [searchError, setSearchError] = useState<string>('');
//   const [consultaMotivo, setConsultaMotivo] = useState<string>('');
//   const [historialConsultas, setHistorialConsultas] = useState<ConsultaType[]>([]);

//   const handleLogin = () => {
//     setLoginError('');

//     if (!dni) {
//       setLoginError('Por favor ingrese su DNI');
//       return;
//     }

//     if (loginMode === 'ciudadano') {
//       const nombreCiudadano = CIUDADANOS_SIMULADOS[dni];
      
//       if (nombreCiudadano) {
//         setUser({
//           dni,
//           role: 'ciudadano',
//           name: nombreCiudadano
//         });
//         setIsLoggedIn(true);
//         setDni('');
//       } else {
//         setLoginError('DNI no registrado en RENIEC');
//       }
//     } else {
//       if (!password) {
//         setLoginError('Los notarios deben ingresar contraseña');
//         return;
//       }

//       const notario = NOTARIOS[dni];
      
//       if (notario && notario.password === password) {
//         setUser({
//           dni,
//           role: 'notario',
//           name: notario.name
//         });
//         setIsLoggedIn(true);
//         setDni('');
//         setPassword('');
//       } else {
//         setLoginError('DNI o contraseña incorrectos');
//       }
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//     setVehiculo(null);
//     setPlaca('');
//     setConsultaMotivo('');
//   };

//   const handleSearch = () => {
//     setSearchError('');
//     setVehiculo(null);

//     if (!user) return;

//     const vehiculoEncontrado = VEHICULOS[placa.toUpperCase()];

//     if (!vehiculoEncontrado) {
//       setSearchError('Vehículo no encontrado');
//       return;
//     }

//     if (user.role === 'notario' && !consultaMotivo) {
//       setSearchError('Debe especificar el motivo de la consulta');
//       return;
//     }

//     const consulta: ConsultaType = {
//       fecha: new Date().toLocaleString('es-PE'),
//       usuario: user.name,
//       role: user.role,
//       placa: placa.toUpperCase(),
//       motivo: consultaMotivo || 'Consulta pública'
//     };

//     setHistorialConsultas([consulta, ...historialConsultas]);
//     setVehiculo(vehiculoEncontrado);
//   };

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
//               <Shield className="w-10 h-10 text-blue-600" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">SUNARP</h1>
//             <p className="text-gray-600">Sistema de Consulta Vehicular Segura</p>
//           </div>

//           <div className="flex gap-2 mb-6">
//             <button
//               onClick={() => {
//                 setLoginMode('ciudadano');
//                 setPassword('');
//                 setLoginError('');
//               }}
//               className={`flex-1 py-3 rounded-lg font-semibold transition duration-200 ${
//                 loginMode === 'ciudadano'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               👤 Ciudadano
//             </button>
//             <button
//               onClick={() => {
//                 setLoginMode('notario');
//                 setLoginError('');
//               }}
//               className={`flex-1 py-3 rounded-lg font-semibold transition duration-200 ${
//                 loginMode === 'notario'
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               ⚖️ Notario
//             </button>
//           </div>

//           {loginMode === 'ciudadano' ? (
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//               <p className="text-sm text-blue-800">
//                 <strong>Acceso Ciudadano:</strong> Solo necesitas tu DNI para consultar datos públicos de vehículos (marca, modelo, año). No se muestran datos personales del propietario.
//               </p>
//             </div>
//           ) : (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//               <p className="text-sm text-yellow-800">
//                 <strong>Acceso Notario:</strong> Requiere DNI y contraseña. Permite acceder a datos personales del propietario bajo justificación legal.
//               </p>
//             </div>
//           )}

//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 DNI
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={dni}
//                   onChange={(e) => setDni(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && (loginMode === 'ciudadano' ? handleLogin() : null)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Ingrese su DNI"
//                 />
//               </div>
//             </div>

//             {loginMode === 'notario' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Contraseña
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Ingrese su contraseña"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
//             )}

//             {loginError && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
//                 <AlertCircle className="w-5 h-5" />
//                 <span className="text-sm">{loginError}</span>
//               </div>
//             )}

//             <button
//               onClick={handleLogin}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
//             >
//               {loginMode === 'ciudadano' ? <UserCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
//               Iniciar Sesión
//             </button>
//           </div>

//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-sm text-gray-600 mb-3 font-medium">Credenciales de prueba:</p>
//             <div className="space-y-3 text-xs bg-gray-50 p-3 rounded-lg">
//               <div>
//                 <p className="font-semibold text-gray-700">👤 Ciudadanos (solo DNI):</p>
//                 <p className="text-gray-600">12345678, 11111111, 22222222</p>
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-700">⚖️ Notario (DNI + contraseña):</p>
//                 <p className="text-gray-600">DNI: 87654321 / Pass: notario123</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <Shield className="w-8 h-8 text-blue-600" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">SUNARP</h1>
//                 <p className="text-sm text-gray-600">Consulta Vehicular Segura</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
//                 <p className="text-xs text-gray-500">
//                   {user?.role === 'notario' ? '⚖️ Notario Autorizado' : '👤 Ciudadano'}
//                 </p>
//                 <p className="text-xs text-gray-400">DNI: {user?.dni}</p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition duration-200"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span className="text-sm font-medium">Salir</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//               <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                 <Search className="w-5 h-5 text-blue-600" />
//                 Consultar Vehículo
//               </h2>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Número de Placa
//                   </label>
//                   <input
//                     type="text"
//                     value={placa}
//                     onChange={(e) => setPlaca(e.target.value.toUpperCase())}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
//                     placeholder="Ej: ABC-123"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">Placas de prueba: ABC-123, XYZ-789</p>
//                 </div>

//                 {user?.role === 'notario' && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Motivo de Consulta *
//                     </label>
//                     <select
//                       value={consultaMotivo}
//                       onChange={(e) => setConsultaMotivo(e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Seleccione un motivo</option>
//                       <option value="Compraventa vehicular">Compraventa vehicular</option>
//                       <option value="Trámite notarial">Trámite notarial</option>
//                       <option value="Verificación legal">Verificación legal</option>
//                       <option value="Proceso judicial">Proceso judicial</option>
//                     </select>
//                   </div>
//                 )}

//                 {searchError && (
//                   <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
//                     <AlertCircle className="w-5 h-5" />
//                     <span className="text-sm">{searchError}</span>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleSearch}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
//                 >
//                   <Search className="w-5 h-5" />
//                   Buscar Vehículo
//                 </button>
//               </div>
//             </div>

//             {vehiculo && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
//                   <h3 className="text-xl font-bold text-white flex items-center gap-2">
//                     <Car className="w-6 h-6" />
//                     Información del Vehículo
//                   </h3>
//                 </div>

//                 <div className="p-6 space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-xs text-gray-500 mb-1">Placa</p>
//                       <p className="text-lg font-bold text-gray-800">{vehiculo.placa}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-xs text-gray-500 mb-1">Estado</p>
//                       <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
//                         <CheckCircle className="w-4 h-4" />
//                         {vehiculo.estado}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-xs text-gray-500 mb-1">Marca</p>
//                       <p className="text-base font-semibold text-gray-800">{vehiculo.marca}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-xs text-gray-500 mb-1">Modelo</p>
//                       <p className="text-base font-semibold text-gray-800">{vehiculo.modelo}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-xs text-gray-500 mb-1">Año</p>
//                       <p className="text-base font-semibold text-gray-800">{vehiculo.año}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-xs text-gray-500 mb-1">Color</p>
//                       <p className="text-base font-semibold text-gray-800">{vehiculo.color}</p>
//                     </div>
//                   </div>

//                   {user?.role === 'notario' ? (
//                     <div className="border-t border-gray-200 pt-4 mt-4">
//                       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//                         <p className="text-sm text-yellow-800 font-medium flex items-center gap-2">
//                           <Lock className="w-4 h-4" />
//                           Información sensible - Solo visible para usuarios autorizados
//                         </p>
//                       </div>
                      
//                       <div className="space-y-3">
//                         <div className="flex justify-between border-b border-gray-200 pb-2">
//                           <span className="text-sm text-gray-600">Propietario:</span>
//                           <span className="text-sm font-semibold text-gray-800">{vehiculo.propietario}</span>
//                         </div>
//                         <div className="flex justify-between border-b border-gray-200 pb-2">
//                           <span className="text-sm text-gray-600">DNI:</span>
//                           <span className="text-sm font-semibold text-gray-800">{vehiculo.dni}</span>
//                         </div>
//                         <div className="flex justify-between border-b border-gray-200 pb-2">
//                           <span className="text-sm text-gray-600">Dirección:</span>
//                           <span className="text-sm font-semibold text-gray-800">{vehiculo.direccion}</span>
//                         </div>
//                         <div className="flex justify-between border-b border-gray-200 pb-2">
//                           <span className="text-sm text-gray-600">VIN:</span>
//                           <span className="text-sm font-semibold text-gray-800 font-mono">{vehiculo.vin}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-sm text-gray-600">Cargas/Gravámenes:</span>
//                           <span className="text-sm font-semibold text-gray-800">{vehiculo.cargas}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="border-t border-gray-200 pt-4 mt-4">
//                       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                         <p className="text-sm text-blue-800 flex items-center gap-2">
//                           <Lock className="w-4 h-4" />
//                           <span>
//                             <strong>Datos del propietario protegidos.</strong> Para acceder a información completa del titular, 
//                             debe autenticarse como notario o usuario autorizado con credenciales especiales.
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//               <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//                 <Clock className="w-5 h-5 text-blue-600" />
//                 Historial de Consultas
//               </h3>
              
//               {historialConsultas.length === 0 ? (
//                 <p className="text-sm text-gray-500 text-center py-8">
//                   No hay consultas registradas
//                 </p>
//               ) : (
//                 <div className="space-y-3 max-h-96 overflow-y-auto">
//                   {historialConsultas.map((consulta, index) => (
//                     <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
//                       <div className="flex justify-between items-start mb-2">
//                         <span className="text-sm font-semibold text-gray-800">{consulta.placa}</span>
//                         <span className="text-xs text-gray-500">{consulta.fecha}</span>
//                       </div>
//                       <p className="text-xs text-gray-600 mb-1">
//                         <strong>Usuario:</strong> {consulta.usuario}
//                       </p>
//                       <p className="text-xs text-gray-600 capitalize">
//                         <strong>Motivo:</strong> {consulta.motivo}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//               <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
//                 <Shield className="w-5 h-5 text-blue-600" />
//                 Privacidad y Seguridad
//               </h3>
//               <ul className="space-y-2 text-sm text-gray-700">
//                 <li className="flex items-start gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
//                   <span>Todas las consultas quedan registradas</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
//                   <span>Datos personales protegidos por rol de usuario</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
//                   <span>Autenticación diferenciada según tipo de acceso</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
//                   <span>Cumplimiento con Ley N° 29733 y RGPD</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Users, Server, Mail, Lock, Activity, FileText, Award, Bell } from 'lucide-react';

// Interfaces para tipado seguro
interface Alert {
  id: number; // QUITÉ EL COMENTARIO DE ESTA LÍNEA
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
  read: boolean;
}

interface KPICard {
  title: string;
  value: string;
  status: 'success' | 'warning' | 'critical';
  icon: React.ComponentType<{ className?: string }>;
  metric: string;
  description: string;
}

interface CoverageData {
  retail: number;
  empresas: number;
  ti: number;
}

interface PatchingTime {
  mes: string;
  dias: number;
}

interface ThreatVector {
  name: string;
  value: number;
  color: string;
}

interface PhishingTest {
  area: string;
  aprobados: number;
  reprobados: number;
}

interface Policy {
  id: string;
  name: string;
  status: 'Vigente' | 'En revisión';
  lastUpdate: string;
  framework: string;
}

interface InfrastructureItem {
  name: string;
  status: string;
  value: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  endpoints: string;
}

export default function BCPSecurityMonitor() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alerts, setAlerts] = useState<Alert[]>([
    // AHORA LAS IDs ESTÁN CORRECTAS
    { id: 1, type: 'critical', message: 'Intento de phishing detectado en Área Retail', time: 'Hace 5 min', read: false },
    { id: 2, type: 'warning', message: '15 endpoints pendientes de actualización', time: 'Hace 1 hora', read: false },
    { id: 3, type: 'info', message: 'Parches de seguridad aplicados exitosamente', time: 'Hace 2 horas', read: true }
  ]);

  // Estados para datos simulados dinámicos
  const [coverageAntimalware, setCoverageAntimalware] = useState<CoverageData>({ retail: 98, empresas: 95, ti: 100 });
  const [patchingTime, setPatchingTime] = useState<PatchingTime[]>([
    { mes: 'Ene', dias: 5 }, { mes: 'Feb', dias: 7 }, { mes: 'Mar', dias: 4 },
    { mes: 'Abr', dias: 6 }, { mes: 'May', dias: 5 }, { mes: 'Jun', dias: 8 }
  ]);
  const [threatVectors] = useState<ThreatVector[]>([
    { name: 'Correo', value: 65, color: '#ef4444' },
    { name: 'Web', value: 20, color: '#f59e0b' },
    { name: 'USB', value: 10, color: '#3b82f6' },
    { name: 'Otros', value: 5, color: '#6b7280' }
  ]);
  const [phishingTests, setPhishingTests] = useState<PhishingTest[]>([
    { area: 'Retail', aprobados: 85, reprobados: 15 },
    { area: 'Empresas', aprobados: 78, reprobados: 22 },
    { area: 'TI', aprobados: 95, reprobados: 5 },
    { area: 'RRHH', aprobados: 82, reprobados: 18 }
  ]);

  // Simular datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Actualizar cobertura antimalware con variaciones pequeñas
      setCoverageAntimalware(prev => ({
        retail: Math.min(100, Math.max(90, prev.retail + (Math.random() - 0.5))),
        empresas: Math.min(100, Math.max(85, prev.empresas + (Math.random() - 0.5))),
        ti: Math.min(100, Math.max(95, prev.ti + (Math.random() - 0.3)))
      }));

      // Actualizar tiempos de parcheo
      setPatchingTime(prev => 
        prev.map(item => ({
          ...item,
          dias: Math.max(2, Math.min(10, item.dias + (Math.random() - 0.5)))
        }))
      );

      // Actualizar tests de phishing
      setPhishingTests(prev =>
        prev.map(test => ({
          ...test,
          aprobados: Math.min(100, Math.max(70, test.aprobados + (Math.random() - 0.5))),
          reprobados: Math.min(30, Math.max(0, test.reprobados + (Math.random() - 0.5)))
        }))
      );

      // Simular nuevas alertas ocasionalmente
      if (Math.random() > 0.7) {
        const alertTypes: Array<'critical' | 'warning' | 'info'> = ['critical', 'warning', 'info'];
        const messages = [
          'Nueva vulnerabilidad detectada en sistemas',
          'Actualización de seguridad disponible',
          'Comportamiento sospechoso en red interna',
          'Backup completado exitosamente'
        ];
        
        const newAlert: Alert = {
          id: Date.now(),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          time: 'Hace 1 min',
          read: false
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Función para marcar alertas como leídas
  const markAlertAsRead = (alertId: number) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  // KPIs calculados dinámicamente
  const kpiCards: KPICard[] = [
    { 
      title: 'Cobertura Antimalware', 
      value: `${((coverageAntimalware.retail + coverageAntimalware.empresas + coverageAntimalware.ti) / 3).toFixed(1)}%`, 
      status: 'success', 
      icon: Shield, 
      metric: 'M1', 
      description: 'Endpoints protegidos con EDR/AV actualizado' 
    },
    { 
      title: 'Tiempo Medio de Parcheo', 
      value: `${(patchingTime.reduce((sum, item) => sum + item.dias, 0) / patchingTime.length).toFixed(1)} días`, 
      status: 'success', 
      icon: TrendingUp, 
      metric: 'M2', 
      description: 'Objetivo: ≤7 días para parches críticos' 
    },
    { 
      title: 'Correos Bloqueados', 
      value: `${Math.floor(2847 + Math.random() * 100).toLocaleString()}`, 
      status: 'warning', 
      icon: Mail, 
      metric: 'M3', 
      description: 'Correos maliciosos detectados este mes' 
    },
    { 
      title: 'Concienciación', 
      value: `${(phishingTests.reduce((sum, test) => sum + test.aprobados, 0) / phishingTests.length).toFixed(0)}%`, 
      status: 'success', 
      icon: Users, 
      metric: 'M4', 
      description: 'Empleados aprueban test de phishing' 
    },
    { 
      title: 'Incidentes Activos', 
      value: `${alerts.filter(a => a.type === 'critical' && !a.read).length}`, 
      status: 'critical', 
      icon: AlertTriangle, 
      metric: 'M5', 
      description: 'Infecciones con impacto operativo' 
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          const statusColors = { 
            success: 'bg-green-50 border-green-200', 
            warning: 'bg-yellow-50 border-yellow-200', 
            critical: 'bg-red-50 border-red-200' 
          };
          const iconColors = { 
            success: 'text-green-600', 
            warning: 'text-yellow-600', 
            critical: 'text-red-600' 
          };
          
          return (
            <div key={idx} className={`border-2 rounded-lg p-4 ${statusColors[kpi.status]}`}>
              <div className="flex items-start justify-between mb-2">
                <Icon className={`w-6 h-6 ${iconColors[kpi.status]}`} />
                <span className="text-xs font-mono text-gray-500">{kpi.metric}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">{kpi.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">{kpi.value}</p>
              <p className="text-xs text-gray-600">{kpi.description}</p>
            </div>
          );
        })}
      </div>

      {/* Gráficos de Métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* M1: Cobertura Antimalware */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-4">M1: Cobertura Antimalware por Unidad</h3>
          <div className="space-y-3">
            {Object.entries(coverageAntimalware).map(([area, value]) => (
              <div key={area}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium capitalize">{area}</span>
                  <span className="font-bold">{value.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${value}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* M2: Tiempo medio de parcheo */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-4">M2: Tiempo Medio de Parcheo (días)</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {patchingTime.map((item, idx) => {
              const height = (item.dias / 10) * 100;
              const color = item.dias <= 7 ? 'bg-green-500' : 'bg-red-500';
              return (
                <div key={idx} className="flex flex-col items-center flex-1">
                  <div className="w-full flex flex-col items-center justify-end h-32">
                    <span className="text-xs font-bold mb-1">{item.dias.toFixed(1)}d</span>
                    <div 
                      className={`w-full ${color} rounded-t transition-all duration-500`} 
                      style={{ height: `${height}%` }} 
                    />
                  </div>
                  <span className="text-xs font-medium mt-2">{item.mes}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span>≤ 7 días (objetivo)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span>&gt; 7 días</span>
            </div>
          </div>
        </div>

        {/* Gráfico de vectores de amenaza */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 lg:col-span-2">
          <h3 className="font-bold text-gray-900 mb-4">Distribución de Vectores de Amenaza</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {threatVectors.map((vector, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e5e7eb" strokeWidth="3"/>
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15.9155" 
                      fill="none" 
                      stroke={vector.color} 
                      strokeWidth="3" 
                      strokeDasharray={`${vector.value} ${100 - vector.value}`} 
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">{vector.value}%</span>
                  </div>
                </div>
                <span className="text-sm font-medium mt-2">{vector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRaci = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-600" />
        Matriz RACI - Estructuras Organizativas (3.2)
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Rol</th>
              <th className="px-4 py-3 text-center font-semibold">Aprobación</th>
              <th className="px-4 py-3 text-center font-semibold">Implementación</th>
              <th className="px-4 py-3 text-center font-semibold">Monitoreo</th>
              <th className="px-4 py-3 text-center font-semibold">Auditoría</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rol: 'CIO', aprobacion: 'A', implementacion: 'I', monitoreo: 'I', auditoria: 'C' },
              { rol: 'CISO', aprobacion: 'R', implementacion: 'A', monitoreo: 'C', auditoria: 'C' },
              { rol: 'SOC', aprobacion: 'C', implementacion: 'R', monitoreo: 'R', auditoria: 'I' },
              { rol: 'Infraestructura TI', aprobacion: 'I', implementacion: 'R', monitoreo: 'C', auditoria: 'I' },
              { rol: 'Auditoría Interna', aprobacion: 'I', implementacion: 'I', monitoreo: 'C', auditoria: 'R' }
            ].map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.rol}</td>
                {['aprobacion', 'implementacion', 'monitoreo', 'auditoria'].map((key) => (
                  <td key={key} className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded font-bold ${
                      row[key as keyof typeof row] === 'R' ? 'bg-blue-100 text-blue-700' :
                      row[key as keyof typeof row] === 'A' ? 'bg-green-100 text-green-700' :
                      row[key as keyof typeof row] === 'C' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {row[key as keyof typeof row]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const policies: Policy[] = [
    { id: '3.3.2.1', name: 'Política de prevención de software malicioso', status: 'Vigente', lastUpdate: '15/01/2025', framework: 'ISO 27002:12.2, CIS Control 8' },
    { id: '3.3.2.2', name: 'Política de seguridad de conectividad', status: 'Vigente', lastUpdate: '10/01/2025', framework: 'DSS05.02' },
    { id: '3.3.2.3', name: 'Política de seguridad de endpoints', status: 'En revisión', lastUpdate: '20/12/2024', framework: 'DSS05.03, CIS Control 4' }
  ];

  const renderPolicies = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Políticas y Procedimientos (3.3)
        </h2>
        <div className="space-y-3">
          {policies.map((policy) => (
            <div key={policy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-mono text-gray-500">{policy.id}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{policy.name}</h3>
                  <div className="mt-2 flex gap-4 text-xs text-gray-600">
                    <span>Actualización: {policy.lastUpdate}</span>
                    <span className="text-blue-600">{policy.framework}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  policy.status === 'Vigente' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {policy.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Cultura y Capacitación (3.5-3.6)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">Concienciación</h3>
            <p className="text-2xl font-bold text-green-700 mb-1">
              {Math.floor(847 + Math.random() * 20)}
            </p>
            <p className="text-xs text-gray-600">Empleados capacitados</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">Comportamiento</h3>
            <p className="text-2xl font-bold text-blue-700 mb-1">
              {Math.floor(127 + Math.random() * 10)}
            </p>
            <p className="text-xs text-gray-600">Reportes este mes</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">Cultura</h3>
            <p className="text-2xl font-bold text-purple-700 mb-1">
              {(4.2 + Math.random() * 0.3).toFixed(1)}/5
            </p>
            <p className="text-xs text-gray-600">Índice de seguridad</p>
          </div>
        </div>
        
        {/* Tests de Phishing por área */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Resultados de Tests de Phishing por Área</h3>
          <div className="space-y-3">
            {phishingTests.map((test, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="font-medium text-sm w-24">{test.area}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${test.aprobados}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-600 w-20 text-right">
                  {test.aprobados.toFixed(0)}% aprobados
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-blue-600" />
        Centro de Alertas ({alerts.filter(a => !a.read).length} sin leer)
      </h2>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const alertStyles = {
            critical: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', dot: 'bg-red-500' },
            warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600', dot: 'bg-yellow-500' },
            info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', dot: 'bg-blue-500' }
          };
          const style = alertStyles[alert.type];
          
          return (
            <div 
              key={alert.id} 
              className={`border ${style.border} ${style.bg} rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                !alert.read ? 'font-semibold' : 'opacity-75'
              }`}
              onClick={() => markAlertAsRead(alert.id)}
            >
              <div className="flex items-start gap-3">
                {!alert.read && <div className={`w-2 h-2 ${style.dot} rounded-full mt-2 flex-shrink-0`} />}
                <AlertTriangle className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-1`} />
                <div className="flex-1">
                  <p className="text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                </div>
                {!alert.read && (
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    Marcar leído
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const infrastructureItems: InfrastructureItem[] = [
    { name: 'EDR/Antivirus', status: 'Activo', value: '97.6%', color: 'green', icon: Shield, endpoints: '1,847 endpoints' },
    { name: 'Gateway Email', status: 'Operando', value: '100%', color: 'blue', icon: Mail, endpoints: '2,847 amenazas' },
    { name: 'Firewall', status: 'Protegido', value: '100%', color: 'purple', icon: Lock, endpoints: 'IDS/IPS activo' },
    { name: 'SIEM/SOC', status: 'Monitoreando', value: '100%', color: 'orange', icon: Activity, endpoints: 'Vigilancia continua' }
  ];

  const renderInfrastructure = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-600" />
          Infraestructura (3.7)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {infrastructureItems.map((item, idx) => {
            const Icon = item.icon;
            const colorClasses: { [key: string]: string } = {
              green: 'text-green-600 bg-green-500',
              blue: 'text-blue-600 bg-blue-500', 
              purple: 'text-purple-600 bg-purple-500',
              orange: 'text-orange-600 bg-orange-500'
            };
            
            return (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 ${colorClasses[item.color].split(' ')[0]}`} />
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{item.status}</p>
                <p className="text-xs text-gray-600 mt-1">{item.endpoints}</p>
                <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${colorClasses[item.color].split(' ')[1]} animate-pulse`} 
                    style={{ width: item.value }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Resultados y Análisis
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Síntesis de Resultados</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Cobertura antimalware del {((coverageAntimalware.retail + coverageAntimalware.empresas + coverageAntimalware.ti) / 3).toFixed(1)}%</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Tiempo de parcheo: {(patchingTime.reduce((sum, item) => sum + item.dias, 0) / patchingTime.length).toFixed(1)} días (objetivo ≤7)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{Math.floor(2847 + Math.random() * 100).toLocaleString()} amenazas bloqueadas mensualmente</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Nivel de Madurez</h3>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-blue-900">Nivel 3</p>
                  <p className="text-sm text-blue-700">Definido y Establecido</p>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                      key={level} 
                      className={`w-8 h-24 rounded flex items-end justify-center pb-2 ${
                        level <= 3 ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className="text-white text-xs font-bold">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10" />
              <div>
                <h1 className="text-2xl font-bold">BCP Security Monitor</h1>
                <p className="text-blue-200 text-sm">Sistema de Gestión Antimalware - DSS05.01 COBIT 2019</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-blue-200">Banco de Crédito del Perú</p>
                <p className="text-xs text-blue-300">Última actualización: {new Date().toLocaleString('es-PE')}</p>
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 cursor-pointer hover:text-blue-200 transition-colors" />
                {alerts.filter(a => !a.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {alerts.filter(a => !a.read).length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'raci', label: 'RACI', icon: Users },
              { id: 'policies', label: 'Políticas', icon: FileText },
              { id: 'training', label: 'Capacitación', icon: Award },
              { id: 'alerts', label: 'Alertas', icon: Bell },
              { id: 'infrastructure', label: 'Infraestructura', icon: Server },
              { id: 'reports', label: 'Resultados', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'raci' && renderRaci()}
        {activeTab === 'policies' && renderPolicies()}
        {activeTab === 'training' && renderTraining()}
        {activeTab === 'alerts' && renderAlerts()}
        {activeTab === 'infrastructure' && renderInfrastructure()}
        {activeTab === 'reports' && renderReports()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold">BCP Security Monitor</span>
          </div>
          <p className="text-gray-400 text-sm">Sistema de Gestión Antimalware basado en COBIT 2019 - Proceso DSS05.01</p>
          <p className="text-gray-500 text-xs mt-2">Desarrollado para el Banco de Crédito del Perú - 2025</p>
        </div>
      </footer>
    </div>
  );
}