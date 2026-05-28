"use client";

function carac() {
  return (
    <div className="w-full overflow-hidden">
      <h2 className="starFont text-3xl text-center">Ecosistema Manepe</h2>
      
      {/* Sección 1: El detector de oportunidades (Scanner) */}
      <div className="flex justify-around items-center gap-4 m-10">
        <img
          src="/images/Screener.png"
          alt="Escáner de mercado"
          className="sm:h-50 lg:h-70 xl:h-150 w-auto object-cover"
        />
        <p className="max-w-[60%]">
          El detector de oportunidades o <b className="text-primary">Scanner</b> actúa como un radar financiero diseñado para 
          localizar activos de interés en tiempo real. Permite configurar reglas personalizadas 
          basadas en indicadores técnicos simples, como la media móvil de 50 sesiones (MA50), 
          filtros de volumen medio superiores a un millón, o hitos históricos como la ruptura 
          de máximos de 52 semanas. Los activos que cumplen los criterios se 
          estructuran dinámicamente en una tabla paginada.
        </p>
      </div>

      {/* Sección 2: El simulador de estrategias (Backtester) */}
      <div className="flex justify-around items-center gap-4 m-10">
        <p className="max-w-[60%]">
          El simulador de estrategias o <b className="text-primary">Backtester</b> permite evaluar ideas de inversión mediante 
          simulaciones históricas sin arriesgar capital real. El sistema procesa datos OHLCV 
          diarios provenientes de Yahoo Finance para proyectar el comportamiento de las reglas de 
          entrada y salida configuradas. Al finalizar la ejecución, se genera un gráfico de 
          la curva de equity y métricas de rendimiento clave como el Retorno Total, la Pérdida 
          Máxima y la comparación directa con el índice S&P 500.
        </p>
        <img
          src="/images/Backtest.png"
          alt="Simulador de estrategias"
          className="sm:h-50 lg:h-70 xl:h-150 w-auto object-cover"
        />
      </div>

      {/* Sección 3: Gestión de Usuarios y Seguridad */}
      <div className="flex justify-around items-center gap-4 m-10">
        <img
          src="/images/dash.png"
          alt="Seguridad y Gestión de Usuarios"
             className="sm:h-50 lg:h-70 xl:h-150 w-auto object-cover"
        />
        <p className="max-w-[60%]">
          Para garantizar una experiencia <b className="text-primary">personalizada y segura</b>, el ecosistema cuenta con un 
          módulo de autenticación que restringe las funciones de guardado y carga de criterios 
          a los usuarios registrados. El almacenamiento de contraseñas se realiza mediante 
          algoritmos de hashing seguro y las comunicaciones se cifran bajo el protocolo HTTPS. 
          Toda la gestión de la plataforma se rige estrictamente por los derechos de consentimiento, 
          acceso y supresión definidos en el marco legal del RGPD.
        </p>
      </div>
    </div>
  );
}

export default carac;