<template>
  <main class="vista-historias">
    <article>
      <div class="cover-portada">
        <img src="~/assets/imgs/cap1/ilustracion_1.jpg" alt="" />
        <div class="contenedor-titulo">
          <div class="titulo-centrado">
            <h1>Secreto escolar.</h1>
            <h2 class="subtitulo">
              En la última década se triplicó el abuso sexual infantil dentro de
              las escuelas
            </h2>
          </div>
        </div>
      </div>
      <section class="contenedor-flex">
        <div class="ancho-texto">
          <p class="resumen">
            Los registros de casos de delitos sexuales cometidos por el personal
            de las escuelas en contra de los alumnos va en aumento.
            <strong
              >Entre 2012 y 2015 hubo, en promedio, 149 al año. A partir de
              entonces, la cifra se incrementó. En 2022, se registraron más de
              550 casos.</strong
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
            solicitó entrevista a las autoridades escolares sin que al cierre de
            edición hayan dado respuesta.
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
            públicos en el Guadalupe Borja, son solo uno de los 3,534 casos que
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
            las distintas secretarías de educación del país reportaron 596 casos
            en todo México, un promedio de 149 al año. Los registros en ese
            periodo son pocos, pues las mismas dependencias educativas reconocen
            que no registraban la información ni daban seguimiento a estos
            casos. Sinaloa, por ejemplo, respondió: "Si bien se llegaron a
            acercar o presentar algún caso no se creaban como tal expedientes".
          </p>
          <VisualizacionesSerieTiempo
            :conversionTemporal="conversionTemporal"
            :datos="datos_por_anio"
            :linea_id="'lineas1'"
            :margen="{ arriba: 10, abajo: 80, izquierda: 30, derecha: 30 }"
            :nombre_columna_horizontal="'anio'"
            :titulo_eje_x="'Año'"
            :titulo_eje_y="'Número de casos'"
            :tooltip_activo="true"
            :variables="variables_anios"
            :alto_vis="500"
            :tipo_tooltip="'individual'"
          >
            <template v-slot:encabezado>
              <h4>
                Casos registrados por autoridades educativas 2012-febrero 2023
              </h4>
            </template></VisualizacionesSerieTiempo
          >
          <p>
            A partir de 2017, se incrementó el número de registros oficiales
            hasta el punto de duplicar el registro anual. La tendencia se
            mantuvo al alza hasta que llegó la pandemia por Covid-19 y aunque
            los niños y adolescentes dejaron las aulas para estudiar desde casa,
            las violencias desde las escuelas no cesaron, los registros son
            principalmente por acoso sexual del personal cometido de manera
            virtual contra los estudiantes, como se pudo acreditar con las actas
            de hechos de este periodo obtenidas para la investigación.
          </p>
          <p>
            Una vez que la emergencia sanitaria bajó de nivel y los alumnos
            regresaron físicamente a las escuelas, la violencia sexual contra
            ellos arrasó: en 2022 se registraron 574 quejas en todo el país.
          </p>
          <p>
            Las cifras oficiales de enero y febrero 2023 muestran un panorama
            poco alentador: hay 132 casos en solo dos meses, es decir, todos los
            días dos niños y niñas son violentados sexualmente dentro sus
            escuelas por algún miembro del personal educativo. La tendencia post
            pandémica se mantiene.
          </p>

          <p>
            Los impactos para un sobreviviente de violencia sexual son vastos.
            De inicio, surgen cambios en los hábitos y en el comportamiento. Hay
            ansiedad, estrés, agresión. A mediano plazo, dejan heridas graves en
            su relación con la escuela: bajas en el rendimiento académico o
            abandono escolar. A largo plazo, pueden caer en conductas de alto
            riesgo que ponen en peligro su salud. “Son impactos en varios
            aspectos de la vida de una persona y puede durar toda una vida, por
            eso es importante prevenirlo”, dice Astrid Hollander, jefa de
            educación en Unicef México.
          </p>
          <p>
            Se solicitó entrevista sobre esta problemática a la Secretaría de
            Educación Pública (SEP) federal por ser la coordinadora de la
            educación en el país, pero rechazó emitir un posicionamiento y pidió
            buscar a cada secretaría estatal.
          </p>
          <h3>Visibilizar para prevenir</h3>
          <p>
            La cifra obtenida es conservadora, minúscula en relación a la
            problemática. La falta de registros en las secretarías de Educación
            choca con lo reportado por Fiscalías de justicia, comisiones de
            Derechos Humanos y oficinas de Protección a la Infancia: no hay
            ningún estado en el país que pueda presumir no tener denuncias de
            abuso en sus escuelas.
          </p>
        </div>
        <div class="ancho-visualizacion">
          <VisualizacionesTableroBarras
            class="visualizacion-contenedor"
            :datos_sep_fiscalias_dh="datos_sep_fiscalias_dh"
            :barras_variables="barras_variables"
          >
            <template v-slot:encabezado>
              <p>
                Registros de abuso sexual ante Educación, Fiscalías y oficinas
                de Protección y Derechos Humanos
              </p>
            </template>
          </VisualizacionesTableroBarras>
        </div>
        <div class="ancho-texto">
          <p>
            La falta de desagregación en la mayoría de los datos obtenidos
            impide hacer un análisis más detallado de cada caso. Por ejemplo, la
            Secretaría de Educación de San Luis Potosí no entregó información,
            pero la comisión de Derechos Humanos registró 54 quejas.En Baja
            California Sur y Sonora se negaron a otorgar la información, pero
            sus fiscalías abrieron 33 y 11 carpetas respectivamente en un
            periodo de cinco años.
          </p>

          <blockquote>
            “Los registros nos permiten visibilizar una problemática. Quizá es
            una problemática de la que no nos gusta hablar, pero que tiene
            afectaciones muy graves en la vida de las personas y por ello hay
            que visibilizar para prevenir, detectar y actuar adecuadamente”,
            dice Hollander.
          </blockquote>
          <p>
            En otros casos, los pocos registros que existen muestran que pocas
            denuncias llegan al ámbito penal. En Jalisco, por ejemplo, se
            registraron 509 quejas, mientras que la Fiscalía abrió 31 carpetas
            de investigación. En cambio en la Ciudad de México, aunque tiene
            1,449 quejas en una década, la Fiscalía dice no saber cuántos
            delitos sexuales ocurrieron en escuelas.
          </p>
          <p>
            En general, de los casos registrados por las autoridades educativas
            sólo la mitad llegaron ante una fiscalía de justicia.
          </p>
          <p>
            Mariana Gil, abogada y directora de la Oficina de Defensoría de los
            Derechos de la Infancia, A.C. (ODI), señala que la cifra negra en
            estos casos es incalculable. Ejemplifica con casos que han
            acompañado legalmente desde su organización.
          </p>
        </div>
      </section>
      <InteractivosHorizontalCasosParticulares></InteractivosHorizontalCasosParticulares>
      <section class="contenedor-flex">
        <div class="ancho-texto">
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
            delito se resuelva es del 0.9%, según estimaciones de
            <a
              target="_blank"
              href="https://www.impunidadcero.org/impunidad-en-mexico/"
              >Impunidad Cero</a
            >, una organización de la sociedad civil que estudia, analiza y
            visibiliza el problema de la impunidad en México.
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
            puerta secreta”.
            <strong
              >Los dictámenes periciales muestran que tanto en el salón de
              música como en el de 1° B había “cuartos ocultos”, ubicados al
              fondo de los salones, escondidos detrás de cortinas, a un costado
              de estantes con material didáctico y pesadas puertas en donde el
              profesor de música y el intendente cometieron las agresiones.
            </strong>
            Servando era el único que tenía llaves de este espacio, declaró la
            directora en el juicio.
          </p>
          <p>
            Se le preguntó a la dependencia sobre su actuación ante este caso,
            pero rechazó pronunciarse por considerar que todavía está en
            litigio. Dijo que hasta 2020 actualizaron su protocolo interno de
            actuación ante posibles riesgos dentro de las escuelas, incluyendo
            la violencia sexual.
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
            primero, que T. se estaba acoplando al kínder; luego, que los golpes
            se los daban niños de tercero que eran bruscos. Cuando T. dijo
            'mañana me van a enseñar a chupar pipí en la escuela', la directora
            culpó a otros niños.
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
      <section class="contenedor-flex">
        <div class="ancho-texto">
          <p class="fuente">
            Fuente: Base de datos propia, creada con información de actas de
            hechos y estadísticas de Educación.
          </p>
          <p>
            El perfil del agresor escolar coincide con la descripción del
            “abusador situacional” que, según explica Julia Borbolla, psicóloga
            especializada en abuso sexual, son personas que de forma deliberada
            buscan contratarse como profesores, a veces suplentes, instructores
            de deportes o idiomas para estar cerca de las y los niños.
          </p>
          <p>
            “Por eso es muy importante que los colegios hagan una muy buena
            selección de personal.(...) Hay que hacer selección de personal
            clínica, no solo de sus preferencias o aptitudes, sino de su salud
            mental, hacer una especie de peritaje, pedir antecedentes penales,
            investigar la vida familiar, con quién vive… rascarle un poquito más
            porque van a estar con los niños”, aconseja.
          </p>

          <p>
            Actas de hechos obtenidas por transparencia dan cuenta de la
            debilidad de los procesos de contratación. Por ejemplo, en Oaxaca,
            un hombre fue asignado como docente de preescolar en el municipio de
            San Juan Bautista Cuicatlán. Era apenas estudiante de pedagogía,
            pero era hijo de una maestra jubilada, lo que facilitó su selección
            como docente. Meses después de su asignación en 2016, las
            autoridades encontraron en su celular y computadora imágenes
            sexuales que había tomado a sus alumnos preescolares. La dependencia
            registró el caso, pero no dio detalles del estatus del docente.
          </p>
        </div>
        <div class="ancho-imagen">
          <img src="~/assets/imgs/cap1/caso_oax.png" alt="" />
        </div>
        <div class="ancho-texto">
          <p>
            En México, el Sindicato Nacional de Trabajadores de la Educación
            (SNTE) —que reúne al personal que trabaja en escuelas públicas de
            educación básica— tiene un peso importante en la política educativa.
            Es el sindicato más grande de América Latina y su origen está ligado
            al Partido Revolucionario Institucional (PRI) que gobernó el país
            por más de 70 años continuos; desde esa relación, ha influido en
            cómo se educa en el país y ha sido acusado de participar en fraudes
            electorales. En la última década se ha opuesto a la evaluación de
            los docentes y a eliminar la “herencia” de plazas en las escuelas,
            una práctica que permite que personal que no cuenta con el perfil
            adecuado llegue a centros escolares. Se solicitó una entrevista con
            el secretario general del SNTE, Alfonso Cepeda Salas, sin que hasta
            el cierre de edición haya dado respuesta.
          </p>
        </div>
        <div class="ancho-imagen">
          <img src="~/assets/imgs/cap1/ilustracion_2.jpg" alt="" />
        </div>
        <div class="ancho-texto">
          <p>
            El análisis realizado a nivel nacional muestra que las víctimas son
            diversas: niñas, niños y adolescentes que de pronto tienen terrores
            nocturnos, presentan incontinencia nocturna, cambian su
            temperamento, pierden el habla o el interés en la escuela.
          </p>
          <p>
            La mayoría son mujeres (68%), pero las agresiones contra hombres
            también están presentes.
          </p>
          <p>
            La edad juega un factor en el tipo de violencia que se ejerce contra
            ellos. Entre más pequeños más vulnerables al abuso y violación
            sexual. Sin embargo, el 37% de los casos registrados ocurrieron en
            secundaria, principalmente en contra de mujeres. Alumnas de entre 12
            y 14 años reportan a docentes que han tenido acercamientos de índole
            sexual con ellas, según en las actas de hechos que se recabaron vía
            transparencia. La mayoría de denuncias son por acoso sexual que
            ocurre durante las clases, los recesos e incluso por mensajes en
            redes sociales. En algunos casos, la manipulación emocional, las
            amenazas y los métodos coercitivos de los adultos terminan en
            violaciones.
          </p>
          <p>
            Las violencias sexuales contra estudiantes de primaria están en el
            segundo lugar, hay 884 quejas. Se repite el patrón: las autoridades
            educativas no declararon cuáles fueron las consecuencias
            administrativas y/o penales en contra de los señalados, aunque se
            les solicitó vía transparencia.
          </p>
          <p>
            Además se encontraron 45 casos en Jalisco y Guanajuato en donde no
            se puede establecer el número exacto de victimarios, se clasificaron
            como “varios”. Los registros enlistan a directores, intendentes,
            encargados de cooperativa y docentes como un grupo de agresores en
            contra de los menores.
          </p>
          <p>
            La Oficina de Defensoría de los Derechos de la Infancia, A.C. (ODI)
            en su informe
            <i
              ><a
                target="_blank"
                href="https://dispensariodi.com/wp-content/uploads/2021/05/es-un-secreto-la-explotacion-sexual-infantil-en-escuelas-2.pdf"
                >Es un Secreto. La explotación sexual infantil en escuelas</a
              ></i
            >
            —y sus dos actualizaciones
            <i
              ><a
                target="_blank"
                href="https://dispensariodi.com/wp-content/uploads/2023/05/Es-un-secreto.-Actualizacion-2023.pdf"
                >(2022 y 2023)</a
              > </i
            >— denunció que hay indicios de abuso sexual organizado —varios
            adultos participando en la ejecución de los delitos— en al menos 25
            escuelas de educación básica repartidas en 11 estados del país. Los
            delitos sexuales, explican, son cometidos principalmente contra
            grupos de niñas y niños de entre tres y cinco años; violentados por
            múltiples personas que cometen agresiones ritualísticas o
            escenificadas, a veces videograbadas. En todos los casos hay
            personal que facilita o encubre el abuso.
          </p>
        </div>
        <div class="ancho-imagen">
          <img src="~/assets/imgs/cap1/ilustracion_3.jpg" alt="" />
        </div>
        <div class="ancho-texto">
          <h3>Sanción a medias</h3>
          <p>
            Durante el juicio contra el personal del Guadalupe Borja, se le
            preguntó al perito en psicología que revisó a J: “¿Por qué creer el
            dicho del niño de que fue abusado sexualmente por dos personas
            adultas?”. El perito respondió: “Los niños a esta edad no realizan
            mentiras, su capacidad para mentir no está desarrollada porque el
            mentir y el engañar conlleva una maduración del lóbulo frontal que
            los niños a este momento todavía no tienen”.
          </p>
          <p>
            Ante esto, la psicóloga especializada en abuso sexual infantil,
            Julia Borbolla, refuerza: “Los niños no inventan estas cosas, no
            tienen capacidad de inventar algo que no conocen”.
          </p>
          <p>
            Las autoridades de justicia encontraron culpables a Gerardo “Cantos”
            y a Servando “el que limpia las cosas cuando están tiradas”. Aunque
            los delitos descritos por las víctimas y las pruebas físicas
            evidenciaban violación, el ministerio público lo acusó por el delito
            de abuso sexual, lo que permitió que la sanción para los victimarios
            fuera menor. El delito de violación se castiga en el estado con una
            pena de entre ocho a 15 años de prisión, se considera más grave y
            aumenta, si se comete contra un menor de edad; dentro de un inmueble
            público, como una escuela; y con abuso de autoridad, por ejemplo, si
            el agresor es personal de la escuela. Dos de las siete carpetas de
            investigación se convirtieron en sentencia: una suma de 16 años de
            prisión para cada uno por las agresiones cometidas contra J y T.
          </p>
          <p>
            Las familias perdieron recursos económicos y estabilidad. La
            secretaría de Educación estatal, encargada de la operación del
            Jardín de Niños Guadalupe Borja, no se pronunció respecto a cambios
            en pro de la prevención de este tipo de delitos al interior del
            colegio. A pesar de la sentencia que encontró culpables a los
            acusados, sus abogados aún intentan que recuperen su libertad. Se
            solicitó entrevista por distintas vías con las personas involucradas
            en el caso, incluyendo al personal de la escuela, los familiares de
            los señalados y a la sección 5 del Sindicato Nacional de
            Trabajadores de la Educación, sin que al cierre de edición hayan
            dado respuesta.
          </p>
          <p>
            Las y los niños aún padecen las secuelas psicológicas y emocionales.
          </p>
          <p>
            “Cuando volvieron a clases presenciales su primera pregunta fue:
            ‘Mamá, ¿las maestras de aquí sí son buenas?’ Nosotros buscamos
            justicia para nuestros hijos, pero también para que ningún niño
            vuelva a vivir lo que vivieron mis hijos. Las cosas tienen que
            cambiar para ellos, tristemente cada semana vemos denuncias de
            violación, abuso y acoso cometidos por maestros. Las cosas siguen
            igual”, lamenta la madre de J. y T.
          </p>
        </div>
      </section>
      <section class="final">
        <div class="titulo-historias">Lee la investigación completa</div>
        <div class="contenedor-flex contenedor-tarjetas">
          <NavegacionTarjetas
            class="t-50"
            :ruta="'nuestros-protocolos-no-existen'"
            :titulo="`&quot;Nuestros protocolos no existen&quot;`"
            :descripcion="'La historia de una política fallida'"
          ></NavegacionTarjetas>
          <NavegacionTarjetas
            class="t-50"
            :ruta="'/'"
            :titulo="'Inicio'"
            :descripcion="'Depredadores en las aulas'"
          ></NavegacionTarjetas>
        </div>
      </section>
    </article>
  </main>
  <NavegacionCompartidera
    :link="'https://interactivos.eluniversal.com.mx/2023/abuso-sexual-escuelas/secreto-escolar'"
    :texto="description"
    :hashtags="'Depredadoresenlasaulas'"
  ></NavegacionCompartidera>
</template>
<script setup>
/*import { csv } from "d3";
csv("datos/CIFRAS SEP-FISCALIAS-DH Y OP.V13072023 - paraviz.csv").then((D) => {
  console.log(D);
});*/
import por_anio from "@/assets/datos/por_anio.json";
import sep_fiscalias_dh from "@/assets/datos/sep_fiscalias_dh.json";
import { ref } from "vue";
import { timeParse } from "d3";
const title = ref("Secreto escolar");
const description = ref(
  "Las agresiones sexuales cometidas por el personal de las escuelas en contra de alumnos de educación básica aumentó en la última década. Ningún año está libre de quejas. Tras la pandemia se rompió récord: 574 casos sólo en 2022. "
);
useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage:
    "https://interactivos.eluniversal.com.mx/2023/abuso-sexual-escuelas/media-secreto.png",
  twitterCard: "summary_large_image",
});

por_anio.forEach((d) => {
  d.No_quejas = +d.No_quejas;
});
const datos_por_anio = ref(por_anio);
const conversionTemporal = ref(timeParse("%Y"));

sep_fiscalias_dh.forEach((d) => {
  d.No_casos_Fiscalia =
    d.No_casos_Fiscalia != "NE" && d.No_casos_Fiscalia != "ND"
      ? +d.No_casos_Fiscalia
      : d.No_casos_Fiscalia;
  d.No_casos_SEP =
    d.No_casos_SEP != "NE" && d.No_casos_SEP != "ND"
      ? +d.No_casos_SEP
      : d.No_casos_SEP;
  d.No_casos_DH_y_OPI =
    d.No_casos_DH_y_OPI != "NE" && d.No_casos_DH_y_OPI != "ND"
      ? +d.No_casos_DH_y_OPI
      : d.No_casos_DH_y_OPI;
});
const datos_sep_fiscalias_dh = ref(sep_fiscalias_dh);
const variables_anios = ref([
  {
    cve: "No_quejas",
    nombre: "Registros",
    color: "#ed6931",
  },
]);

const barras_variables = ref([
  {
    id: "No_casos_SEP",
    nombre_colores: "Registros de la SEP",
    color: "#ed6931",
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
<style lang="scss">
section.contenedor-flex {
  flex-wrap: wrap;
}
#barras-sfd {
  width: 100%;
}
section.final {
  padding: 0;
  .titulo-historias {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    padding: 48px 0;
  }

  .contenedor-flex.contenedor-tarjetas {
    max-width: 800px;
    padding: 16px;
    gap: 32px;
    margin: auto;
    padding-bottom: 150px;
    .tarjeta-historia {
      background: $color-fondo-oscuro-transparencia;
    }
  }
}
</style>
