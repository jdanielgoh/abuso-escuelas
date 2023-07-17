<template>
  <div class="vista-historias">
    <article>
      <section class="contenedor-flex">
        <div class="ancho-texto">
          <h1>Agresores en las aulas</h1>
          <h2 class="subtitulo">
            En la última década se triplicó el abuso sexual infantil dentro de
            las escuelas
          </h2>
          <p class="resumen">
            Los casos de delitos sexuales cometidos por el personal de las
            escuelas en contra de los alumnos va en aumento.
            <strong>Entre 2012 y 2015 hubo, en promedio, 145 al año</strong> . A
            partir de entonces, la cifra fue en aumento.
            <strong>
              En 2022, se incrementaron hasta los 500 casos anuales.</strong
            >
          </p>
          <p>
            A las puertas del Jardín de Niños “Guadalupe Borja de Díaz Ordaz”,
            ubicado en Saltillo, Coahuila, llegó una familia en busca de
            respuestas y apoyo. Ese viernes 27 de septiembre de 2019, J., de
            tres años, volvió de la escuela en llanto, sumido en un intenso
            dolor. En palabras del integrante más pequeño de la familia, le
            habían “picado la colita con un palo”.
          </p>
          <p>
            Los padres hablaron con la directora y la maestra de grupo, buscaban
            entender por qué su hijo tenía heridas en el área rectal. Intuían
            que el niño había sido víctima de violación.
          </p>
          <p>
            Los padres recuerdan fragmentos del diálogo que la directora, en
            presencia de la maestra de grupo, inició con su hijo:
          </p>
          <blockquote>
            —¿Quién te hizo eso? —le cuestionó. <br />
            —Gerardo —respondió el pequeño.<br />
            —Gerardo, el niño de la maestra Nancy —insistió, como afirmando, la
            servidora pública.<br />
            —No, Gerardo —reiteró el pequeño, en referencia al profesor de
            música. <br />
          </blockquote>
          <p>
            Los padres cuentan que la directora se negó a llamar a una patrulla
            y que a regañadientes levantó un acta de hechos, el formato
            establecido para capturar las quejas de este tipo. En el acta la
            directora consignó que la víctima acusaba a otro estudiante, según
            la copia del documento que fue obtenida para esta investigación. Les
            pidió volver a casa, bañar al niño y dormirlo.
          </p>
          <p>
            La directora, una servidora pública de la Secretaría de Educación
            del estado (SEDU), no dio aviso inmediato a sus superiores. Tampoco
            dejó asentadas en el acta de hechos las palabras exactas de J., pues
            agregó información que, de acuerdo con el relato de los padres, el
            niño no mencionó y evadió su obligación de dar aviso a las
            autoridades de justicia ante la probable comisión de un delito. Se
            solicitó entrevista a la directora sin que al cierre de edición haya
            dado respuesta.
          </p>
          <p>
            Los padres de J. se movilizaron y denunciaron, pues no era la
            primera vez que acudían a la escuela buscando respuestas por los
            focos rojos que detectaban en sus hijos. Acudieron a un médico
            privado porque ninguna instancia gubernamental le brindó atención
            médica inmediata al niño. Un pediatra acreditó la violación. J.
            llevaba sólo 27 días siendo alumno de 1° del Jardín de Niños
            Guadalupe Borja.
          </p>
          <p>
            Más tarde, las terapias psicológicas que recibió el niño,
            indispensables en casos de violencia sexual, revelaron una historia
            de abusos reiterados cometidos no sólo por Gerardo, el profesor de
            música, conocido por los alumnos como “Cantos”, sino también por
            Servando, con cargo de intendente, “el que barría”, como lo
            identificaron los estudiantes. Las autoridades judiciales
            determinaron que ambos servidores públicos agredieron sexualmente a
            J., a su hermano T., de cuatro años, y a varias de sus compañeritas
            y compañeritos de preescolar.
          </p>
          <p>
            Los abusos y violaciones sexuales cometidos por los servidores
            públicos en el Guadalupe Borja, son solo uno de los 3,550 casos que
            se han registrado en México entre 2012 y febrero de 2023. La
            información fue obtenida tras el análisis de una base de datos
            propia, creada con la información que las secretarías de Educación
            de 28 estados enviaron a solicitudes de transparencia. Los datos
            tienen el vacío de Baja California Sur, Nuevo León, San Luis Potosí
            y Sonora que se negaron a responder.
          </p>
          <p>
            El análisis revela que esta problemática no se ha frenado en la
            última década; por el contrario, va en aumento. Entre 2012 y 2015
            las distintas secretarías de educación del país reportaron 598 casos
            en todo México, un promedio de 145 al año. Los registros en ese
            periodo son pocos, pues las mismas dependencias educativas reconocen
            que no registraban la información ni daban seguimiento a estos
            casos. Sinaloa, por ejemplo, respondió: "Si bien se llegaron a
            acercar o presentar algún caso no se creaban como tal expedientes".
          </p>
          <p>
            A partir de 2017, se incrementó el número de registros oficiales
            hasta el punto de duplicar el registro anual. En 2018, se enlistaron
            340 casos. La tendencia se mantuvo así hasta que llegó la pandemia
            por Covid-19 y aunque los niños y adolescentes dejaron las aulas
            para estudiar desde casa, las violencias desde las escuelas no
            cesaron. En 2020 y 2021 se registraron 215 denuncias, principalmente
            por acoso sexual del personal cometido de manera virtual contra los
            estudiantes, como se pudo acreditar con las actas de hechos de este
            periodo obtenidas para la investigación.
          </p>
          <p>
            Una vez que la emergencia sanitaria bajó de nivel y los alumnos
            regresaron físicamente a las escuelas, la violencia sexual contra
            ellos arrasó: en 2022 se registraron más de 500 quejas en todo el
            país.
          </p>
          <p>
            Las cifras oficiales de enero y febrero 2023 muestran un panorama
            poco alentador: hay 132 casos en solo dos meses, es decir, todos los
            días dos niños y niñas son violentados sexualmente dentro sus
            escuelas por algún miembro del personal educativo. La tendencia post
            pandémica se mantiene.
          </p>
          <VisualizacionesSerieTiempo
            :conversionTemporal="conversionTemporal"
            :datos="datos_por_anio"
            :linea_id="'lineas1'"
            :margen="{ arriba: 10, abajo: 40, izquierda: 30, derecha: 30 }"
            :nombre_columna_horizontal="'anio'"
            :titulo_eje_x="'Eje horizontal (temporal)'"
            :titulo_eje_y="'Eje vertical (numérico)'"
            :tooltip_activo="true"
            :variables="variables_anios"
            :alto_vis="500"
            :tipo_tooltip="'individual'"
          >
            <template v-slot:encabezado>
              <h4>Casos que ha registrado la SE de 2012 a febrero de 2023</h4>
            </template></VisualizacionesSerieTiempo
          >
          <p>
            Los impactos para un sobreviviente de violencia sexual duran toda la
            vida. De inicio, surgen cambios en los hábitos y en el
            comportamiento. Hay ansiedad, estrés, agresión. A mediano plazo,
            dejan heridas graves en su relación con la escuela: bajas en el
            rendimiento académico o abandono escolar. A largo plazo, pueden caer
            en conductas de alto riesgo que ponen en peligro su salud. “Son
            impactos en varios aspectos de la vida de una persona y puede durar
            toda una vida, por eso es importante prevenirlo”, insiste Hollander
            de Unicef.
          </p>
          <h3>Visibilizar para prevenir</h3>
          <p>
            La cifra obtenida es conservadora, minúscula en relación a la
            problemática. La falta de registros en las secretarías de Educación
            choca con lo reportado por otros organismos: no hay ningún estado en
            el país que pueda presumir no tener denuncias de abuso en sus
            escuelas.
          </p>
          <VisualizacionesBarras
            :datos="datos_sep_fiscalias_dh"
            :variables="barras_variables"
            :barras_id="'barras-sfd'"
            :nombre_barra="'Entidad'"
            :nombre_color="'nombre_colores'"
            :margen="{ arriba: 0, abajo: 0, derecha: 10, izquierda: 90 }"
            titulo_eje_x="Número de casos"
            titulo_eje_y="Entidad"
            :apiladas_o_agrupadas="'agrupadas'"
            :alto_vis="600"
            :orientacion="'horizontal'"
          >
            <template v-slot:encabezado>
              <h4>
                Casos de abuso sexual en escuelas registrados por la SEP, las
                fiscalías y distingas organizaciones en México
              </h4>
            </template>
          </VisualizacionesBarras>
          <p>
            Por ejemplo, la Secretaría de Educación de Nuevo León dice que
            <cite
              >“no existen antecedentes referentes al abuso sexual presuntamente
              cometido por algún servidor público”</cite
            >. No obstante, de 2017 a febrero de 2023, la Fiscalía General de
            Justicia estatal registró 215 delitos sexuales en sus instituciones
            educativas.
          </p>
          <p>
            <cite
              >“Esta autoridad carece de facultades para conocer o investigar
              los hechos de ese tipo”</cite
            >, contestó su homóloga en San Luis Potosí, donde la autoridad
            judicial abrió 226 carpetas de investigación. En Baja California Sur
            y Sonora se negaron a otorgar la información, pero sus fiscalías
            abrieron 33 y 11 carpetas respectivamente en un periodo de cinco
            años. En Michoacán, Educación solo admitió un caso, pero la Fiscalía
            tiene 190 denuncias.
          </p>
          <blockquote>
            “Los registros nos permiten visibilizar una problemática. Quizá es
            una problemática de la que no nos gusta hablar, pero que tiene
            afectaciones muy graves en la vida de las personas y por ello hay
            que visibilizar para prevenir, detectar y actuar adecuadamente”,
            dice Astrid Hollander, jefa de educación en Unicef México.
          </blockquote>
          <p>
            En otros casos, los pocos registros que existen muestran que pocas
            denuncias llegan al ámbito penal.
          </p>
          <p>
            En Jalisco, por ejemplo, se registraron 503 quejas, mientras que la
            Fiscalía únicamente abrió 31 carpetas de investigación. En cambio,
            en el Estado de México, las autoridades judiciales dicen no saber
            cuántos delitos ocurrieron en escuelas.
          </p>
          <p>
            En general, de los casos registrados por las autoridades educativas
            sólo la mitad llegaron ante una fiscalía de justicia.
          </p>
          <p>
            <span style="color: rosybrown">probable grafico </span>
          </p>
          <blockquote>
            “La Fiscalía, que no está capacitada para esto, desestima varias
            denuncias. Hay revictimización. Muchas familias se van, abandonan
            por el tiempo que lleva un proceso por el mal actuar de las
            autoridades, incluyendo las educativas. En el camino, pierden su
            trabajo, recursos, se divorcian”. Mariana Gil
          </blockquote>
          <p>
            Pero además, la justicia trabaja lento. Las carpetas de
            investigación no necesariamente se traducen en una sentencia.
            Normalmente la justicia en México es así: la probabilidad de que un
            delito se resuelva es del 0.9%, según estimaciones de la
            organización
            <a href="https://www.impunidadcero.org/impunidad-en-mexico/"
              >Impunidad Cero</a
            >.
          </p>
          <h3>Omisión tras omisión</h3>
          <p>
            Coahuila es uno de los estados que asegura tener pocas quejas contra
            su personal educativo. Afirma que en una década sólo ha recibido 54,
            en dos de cada 10 casos las víctimas fueron pequeños de preescolar.
            Los señalamientos en este estado —y otros en el país— no suelen
            registrar el número de víctimas, por lo que un registro puede
            esconder múltiples víctimas y victimarios.
          </p>
          <p>
            Del Guadalupe Borja se abrieron siete carpetas de investigación,
            según el expediente de queja ante la Comisión Estatal de Derechos
            Humanos de noviembre de 2019. En él se detalla que siete niños
            señalaron a “Cantos” y a “el que limpia las cosas cuando están
            tiradas” como sus agresores.
          </p>
          <p>
            Las declaraciones de los pequeños, asentadas en la carpeta de
            investigación, identifican a las maestras como “buenas” porque les
            curaban las heridas.
          </p>
          <p>
            En la causa penal 1229-2020, correspondiente solo a una de las siete
            denuncias, quedó asentado que el niño refirió abusos sexuales y
            violaciones en el área de juegos, en el salón de canto y “en la
            puerta secreta”. Los dictámenes periciales muestran que tanto en el
            salón de música como en el de 1° B había cuartos ocultos, ubicados
            al fondo de los salones, escondidos detrás de cortinas, estantes con
            material didáctico y pesadas puertas en donde el profesor de música
            y el intendente cometieron las agresiones. Servando era el único que
            tenía llaves de este espacio, declaró la directora en el juicio.
          </p>
          <p>
            La autoridad educativa del estado debió de haber realizado
            recorridos en la escuela para detectar esos espacios. Pero no hay
            información sobre que estas inspecciones hayan catalogado estas
            zonas como un riesgo para los estudiantes. Se le preguntó a la
            dependencia, pero rechazaron hacer comentarios sobre el caso.
          </p>
          <p>
            Los dictámenes psicológicos a T., hermano mayor de J., revelaron que
            le pidió ayuda a una maestra, pero que ella sólo dijo que regañaría
            a “Cantos”.
          </p>
          <p>
            La noticia dejó helada a la familia. “Todo hizo sentido. Él estaba
            en 2º y empezamos a notar cambios: no quería estar con nosotros,
            rompía sus juguetes, empezó con pesadillas y a no comer, por las
            noches se hacía pipí y popó”, cuenta el padre. Acudió una decena de
            veces con la maestra de grupo, que siempre minimizó los síntomas:
            primero, que T. se estaba acoplando al colegio; luego, que los
            golpes se los daban niños de tercero que eran bruscos. Cuando T.
            dijo 'mañana me van a enseñar a chupar pipí en la escuela', la
            directora culpó a otros niños.
          </p>
          <p>
            “Debían salvaguardar la seguridad de los niños dentro de la
            institución. Nosotros les dimos toda la confianza, les entregamos
            nuestro más grande tesoro y fuimos defraudados. No fueron humanas en
            sentir el dolor que estaba sintiendo mi hijo, no se tocaron el
            corazón en prestarle auxilio, ocultaron muchas cosas.
            Afortunadamente nos dimos cuenta. Salvamos a nuestros hijos y a
            muchos otros alumnos que pasaban por lo mismo”, dice la madre.
          </p>
          <p>
            Este caso, sigue los patrones detectados en la incidencia nacional.
            La información analizada permitió consolidar una muestra con el
            perfil de los victimarios y también establecer quiénes son las
            víctimas de estas violencias.
          </p>
        </div>
      </section>

      <InteractivosHorizontalAgresores></InteractivosHorizontalAgresores>
    </article>
  </div>
</template>
<script setup>
/*import {csv} from "d3"
csv("datos/CIFRAS SEP-FISCALIAS-DH Y OP.V13072023 - paraviz.csv").then(D=>{
  console.log(D)
})*/
import por_anio from "@/assets/datos/por_anio.json";
import sep_fiscalias_dh from "@/assets/datos/sep_fiscalias_dh.json";
import { ref } from "vue";
import { timeParse } from "d3";

por_anio.forEach((d) => {
  d.No_quejas = +d.No_quejas;
});
console.log(por_anio);
const datos_por_anio = ref(por_anio);
const conversionTemporal = ref(timeParse("%Y"));

sep_fiscalias_dh.forEach((d) => {
  d.No_casos_Fiscalia = +d.No_casos_Fiscalia;
  d.No_casos_SEP = +d.No_casos_SEP;
  d.No_casos_DH_y_OPI = +d.No_casos_DH_y_OPI;
});
const datos_sep_fiscalias_dh = ref(sep_fiscalias_dh);
const variables_anios = ref([
  {
    cve: "No_quejas",
    nombre: "Registros",
    color: "orange",
  },
]);

const barras_variables = ref([
  {
    id: "No_casos_SEP",
    nombre_colores: "Registros de la SEP",
    color: "orange",
  },
  {
    id: "No_casos_Fiscalia",
    nombre_colores: "Registros de la fiscalía",
    color: "#038f83",
  },
  {
    id: "No_casos_DH_y_OPI",
    nombre_colores: "Registros de otras organizaciones",
    color: "purple",
  },
]);
</script>
<style>
#barras-sfd {
  width: 100%;
}
</style>