import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-white">
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed bg-white text-justify">
      <h1 className="text-3xl font-bold mb-8 uppercase text-center">
        Política de privacidad - MANEPE
      </h1>

      {/* 1.- INFORMACIÓN GENERAL */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          1.- INFORMACIÓN GENERAL
        </h2>
        <p className="mb-4">
          La presente “Política de Privacidad y Protección de Datos” tiene como
          finalidad dar a conocer las condiciones que rigen la recogida y
          tratamiento de datos personales en el proyecto de código abierto (Open Source)
          <strong> MANEPE</strong>. Este documento busca velar por los derechos fundamentales
          de los usuarios en cumplimiento de las normativas vigentes que regulan la
          Protección de Datos personales según el Reglamento General de Protección de Datos
          (RGPD) de la Unión Europea.
        </p>
        <p className="mb-4">
          Al utilizar nuestra aplicación o registrarse en ella, requerimos su conformidad
          para el tratamiento de los datos estrictamente necesarios para la prestación del
          servicio técnico, detallados a continuación.
        </p>
      </section>

      {/* 2.- RESPONSABLE DEL TRATAMIENTO */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          2.- RESPONSABLE DEL TRATAMIENTO
        </h2>
        <p className="mb-4">
          Al tratarse de un proyecto de código abierto sin entidad jurídica constituida, el
          tratamiento de los datos es gestionado por los mantenedores y el equipo técnico
          del proyecto MANEPE.
        </p>
        <p className="mb-2">
          <strong>Contacto para asuntos de privacidad:</strong>
        </p>
        <p className="mb-4">
          Para cualquier consulta, reclamación o ejercicio de derechos, puede ponerse en
          contacto con el equipo a través del correo electrónico:{" "}
          <a
            href="mailto:privacy@manepe.dev"
            className="text-blue-600 transition-colors duration-300 hover:text-orange-500 hover:underline"
          >
            privacy@manepe.dev
          </a>
        </p>
      </section>

      {/* 3.- MEDIDAS DE SEGURIDAD */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          3.- MEDIDAS DE SEGURIDAD
        </h2>
        <p className="mb-4">
          El proyecto adopta las medidas técnicas necesarias para garantizar la seguridad y
          la privacidad de sus datos, evitando su alteración, pérdida o acceso no
          autorizado de acuerdo con los estándares actuales del desarrollo de software.
        </p>
        <ul className="list-disc ml-8 space-y-2">
          <li>
            Uso de conexiones seguras y cifrado en la transmisión de datos (HTTPS).
          </li>
          <li>
            Cifrado de contraseñas mediante funciones de hash seguro en la base de datos.
          </li>
          <li>
            Revisiones periódicas del código fuente del proyecto para mitigar vulnerabilidades.
          </li>
        </ul>
      </section>

      {/* 4.- FINALIDAD Y CONSERVACIÓN DE LOS DATOS */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          4.- FINALIDAD Y CONSERVACIÓN DE LOS DATOS
        </h2>
        <p className="mb-4">
          Tratamos los datos mínimos e indispensables para el correcto funcionamiento de la
          plataforma bajo las siguientes finalidades:
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold uppercase mb-2">
              GESTIÓN DE CUENTAS DE USUARIO Y AUTENTICACIÓN
            </h3>
            <p className="mb-2">
              Permite la creación de perfiles, el inicio de sesión y la personalización de la
              experiencia dentro de la aplicación.
            </p>
            <p className="text-sm text-gray-600 italic">
              Plazo de conservación: Los datos se conservarán mientras la cuenta permanezca
              activa y serán eliminados inmediatamente tras la solicitud de baja por parte del
              usuario.
            </p>
          </div>

          <div>
            <h3 className="font-bold uppercase mb-2">
              MANTENIMIENTO TÉCNICO Y SEGURIDAD (LOGS)
            </h3>
            <p className="mb-2">
              Registro de datos técnicos de acceso de forma automatizada con el fin de garantizar
              la estabilidad del servidor y prevenir ataques informáticos.
            </p>
            <p className="text-sm text-gray-600 italic">
              Plazo de conservación: Los registros del servidor (logs) se purgan o anonimizan
              automáticamente en un plazo máximo de 30 días.
            </p>
          </div>
        </div>
      </section>

      {/* 5.- LEGITIMACIÓN DEL TRATAMIENTO */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          5.- LEGITIMACIÓN DEL TRATAMIENTO
        </h2>
        <ul className="list-disc ml-8 space-y-4">
          <li>
            <strong>Consentimiento del interesado:</strong> Para la creación de la cuenta de
            usuario y el tratamiento de los datos de perfil suministrados voluntariamente.
          </li>
          <li>
            <strong>Interés legítimo:</strong> Para la recogida de logs técnicos necesarios para
            garantizar la seguridad, integridad y correcto funcionamiento de la infraestructura
            web.
          </li>
        </ul>
      </section>

      {/* 6.- DESTINATARIOS Y TRANSFERENCIAS */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          6.- DESTINATARIOS DE SUS DATOS
        </h2>
        <p className="mb-4">
          Los datos personales procesados por MANEPE no se venden, alquilan ni ceden a terceros.
          Solo podrán tener acceso a los mismos los proveedores de infraestructura tecnológica
          (como el servicio de alojamiento web o base de datos) estrictamente necesarios para
          mantener la aplicación en línea, operando bajo sus respectivas directivas de privacidad.
        </p>
        <p className="font-bold mt-6 mb-2">
          ¿Realizamos Transferencias Internacionales de sus datos?
        </p>
        <p>
          Los datos se almacenan en servidores ubicados dentro del Espacio Económico Europeo. En
          caso de utilizar servicios de terceros que impliquen transferencia internacional, se
          verificará que cuenten con los marcos de cumplimiento adecuados (como cláusulas
          contractuales tipo).
        </p>
      </section>

      {/* 7.- PROCEDENCIA Y TIPOS DE DATOS TRATADOS */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          7.- PROCEDENCIA Y TIPOS DE DATOS TRATADOS
        </h2>
        <p className="mb-4">
          Todos los datos tratados proceden directamente del propio interesado a través de los
          formularios de la plataforma o de la interacción técnica con la misma.
        </p>

        <div className="space-y-4 text-sm mt-4">
          <div>
            <p className="font-bold uppercase mb-2">
              DATOS DE REGISTRO
            </p>
            <p>
              Nombre de usuario, dirección de correo electrónico y credenciales de acceso cifradas.
              Si se utiliza autenticación de terceros (OAuth), se recopilarán los datos públicos
              autorizados por el proveedor (por ejemplo, ID de GitHub o correo electrónico).
            </p>
          </div>
          <div>
            <p className="font-bold uppercase mb-2">
              DATOS TÉCNICOS
            </p>
            <p>
              Dirección IP, tipo de navegador, sistema operativo e información técnica de las peticiones
              HTTP estándar.
            </p>
          </div>
        </div>
      </section>

      {/* 8.- DERECHOS DE LOS INTERESADOS */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          8.- DERECHOS DE LOS INTERESADOS
        </h2>
        <p className="mb-4">
          La normativa de protección de datos le ampara en una serie de derechos unipersonales e
          intransferibles. Usted puede ejercer ante los mantenedores de MANEPE los siguientes derechos:
        </p>
        <ul className="list-disc ml-8 space-y-2 mb-8">
          <li>Solicitar el <strong>ACCESO</strong> a sus datos personales.</li>
          <li>Solicitar la <strong>RECTIFICACIÓN</strong> de datos inexactos.</li>
          <li>Solicitar la <strong>SUPRESIÓN</strong> o eliminación de sus datos de la plataforma.</li>
          <li>Solicitar la <strong>LIMITACIÓN</strong> u <strong>OPOSICIÓN</strong> al tratamiento.</li>
          <li>Derecho a <strong>RETIRAR</strong> su consentimiento en cualquier momento, lo que implicará la baja del servicio.</li>
          <li>Derecho a presentar una reclamación ante la autoridad de control competente (Agencia Española de Protección de Datos).</li>
        </ul>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-sm">
          <p className="font-bold border-b mb-2 pb-1 uppercase">
            MEDIO PARA EL EJERCICIO DE DERECHOS
          </p>
          <p className="mb-2">
            Para ejercer cualquiera de estos derechos, envíe un requerimiento detallado por correo electrónico.
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:privacy@manepe.dev" className="text-blue-600 hover:underline">
              privacy@manepe.dev
            </a>
          </p>
        </div>
      </section>

      {/* 9.- CONSENTIMIENTO Y ACEPTACIÓN */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2 uppercase">
          9.- CONSENTIMIENTO Y ACEPTACIÓN
        </h2>
        <p className="mb-4">
          El registro de una cuenta o la utilización de las funciones interactivas en el portal{" "}
          <strong>MANEPE</strong> implica que usted entiende y acepta las condiciones técnicas de
          tratamiento descritas en esta política de privacidad de código abierto.
        </p>
      </section>

      {/* SECCIÓN DE REPOSITORIO */}
      <section className="flex flex-col border-t pt-6">
        <p className="text-xs text-gray-500 italic">
          Esta política se encuentra alojada de forma pública y transparente en el repositorio oficial del proyecto.
        </p>
      </section>
    </div>
    </div>
  );
}