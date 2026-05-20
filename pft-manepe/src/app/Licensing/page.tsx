import React from "react";

export default function Licensing() {
  const currentYear = new Date().getFullYear();

  return (
        <div className="w-full bg-white">
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed text-justify">
      <h1 className="text-3xl font-bold mb-8 uppercase text-center">
        Licencia y Uso de Código - MANEPE
      </h1>

      {/* 1.- FILOSOFÍA OPEN SOURCE */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          1.- ÁMBITO Y PROYECTO
        </h2>
        <p className="mb-4">
          <strong>MANEPE</strong> es un proyecto de código abierto (Open Source) gestionado y
          mantenido por su comunidad de desarrolladores. La publicación del código fuente tiene como
          objetivo fomentar la transparencia, la auditoría técnica y el desarrollo colaborativo de
          herramientas accesibles. Todo el software alojado en los repositorios oficiales se rige por las
          condiciones legales detalladas en este documento.
        </p>
      </section>

      {/* 2.- LA LICENCIA MIT */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          2.- LICENCIA DE SOFTWARE (MIT)
        </h2>
        <p className="mb-4">
          El código fuente de MANEPE se distribuye en su totalidad bajo los términos jurídicos de la
          <strong> Licencia MIT</strong>. Esta licencia de carácter permisivo otorga a los usuarios
          amplias facultades de uso, modificación y distribución bajo la única condición de mantener el
          aviso de derechos de autor.
        </p>
        
        <blockquote className="bg-gray-50 p-5 border-l-4 border-gray-400 rounded-r-lg font-mono text-xs sm:text-sm my-6 text-left whitespace-pre-line text-gray-700">
          {`Copyright (c) ${currentYear} MANEPE Open Source Project

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`}
        </blockquote>
      </section>

      {/* 3.- CONDICIONES DE USO Y EXCLUSIONES */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          3.- CONDICIONES DE USO Y EXCLUSIONES
        </h2>
        <p className="mb-4">
          A efectos prácticos e informativos, los términos de la Licencia MIT delimitan los derechos y
          obligaciones de los licenciatarios conforme a los siguientes puntos básicos:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 uppercase mb-3 text-sm">
              Derechos concedidos
            </h3>
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">
              <li><strong>Explotación comercial:</strong> Se permite el uso del código para el desarrollo de soluciones comerciales con fines de lucro.</li>
              <li><strong>Modificación de obra:</strong> El usuario tiene la facultad de alterar, refactorizar o derivar el código fuente original de manera libre.</li>
              <li><strong>Redistribución:</strong> Se autoriza la transferencia y distribución de copias del software, tanto en su estado original como modificado.</li>
              <li><strong>Sublicenciamiento:</strong> Los desarrolladores pueden aplicar términos de licencias diferentes a sus obras derivadas.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 uppercase mb-3 text-sm">
              Obligaciones y limitaciones
            </h3>
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">
              <li><strong>Atribución obligatoria:</strong> Toda copia o fragmento sustancial del software debe conservar el texto íntegro de la licencia original y la nota de copyright de MANEPE.</li>
              <li><strong>Exención de responsabilidad:</strong> El software se suministra de forma gratuita y "tal cual", sin garantías de ningún tipo. Los mantenedores no asumirán responsabilidad por daños, perjuicios o fallos derivados de su uso.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4.- CONTRIBUCIONES */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          4.- PROCESO DE CONTRIBUCIÓN (PULL REQUESTS)
        </h2>
        <p className="mb-4">
          Todo envío de código, documentación o parches de seguridad al repositorio público de MANEPE a través
          de mecanismos de aportación colectiva (como Pull Requests) implica la aceptación tácita e irreversible
          de que dicho trabajo será licenciado bajo los mismos términos de la Licencia MIT descritos en este documento.
        </p>
      </section>

      {/* 5.- MARCAS Y LOGOTIPOS */}
      <section className="mb-10">
        <h2 className="font-bold text-xl mb-4 border-b pb-2">
          5.- EXCLUSIÓN DE MARCA E IDENTIDAD VISUAL
        </h2>
        <p className="mb-4">
          Las libertades otorgadas por la Licencia MIT se limitan estrictamente al software y al código fuente. Quedan
          excluidos del uso libre los derechos sobre la marca denominativa <strong>MANEPE</strong>, sus logotipos
          oficiales, recursos gráficos y cualquier elemento de identidad corporativa. La creación de bifurcaciones
          (forks) o proyectos derivados requiere la modificación del nombre y de los elementos visuales identificativos
          para evitar confusión pública con la distribución oficial.
        </p>
      </section>

      {/* ENLACE AL REPOSITORIO */}
      <section className="flex flex-col border-t pt-6">
        <p className="text-xs text-gray-500 italic">
          El archivo de licencia formal se encuentra disponible permanentemente para su consulta en la raíz del repositorio de código del proyecto.
        </p>
      </section>
    </div>
    </div>
  );
}