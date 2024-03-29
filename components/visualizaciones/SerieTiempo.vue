<template>
  <div :id="linea_id" class="contenedor-lineas">
    <slot name="encabezado"></slot>

    <div class="contenedor-tooltip-svg">
      <div class="tooltip">
        <div class="tooltip-contenido">
          <div class="contenedor-boton-cerrar">
            <button class="boton-cerrar-tooltip" @click="cerrarTooltip">
              &times;
            </button>
          </div>
          <div class="tooltip-cifras"></div>
        </div>
      </div>
      <div
        class="contenedor-titulo-eje-y"
        :style="{
          height: alto_vis + 'px',
        }"
      >
        <div
          :style="{
            width: alto_vis + 'px',
            transform: `rotate(-90deg)translate(calc(-100% - ${
              0.5 * margen.arriba
            }px), ${ancho ? 0 : ancho}px)`,
          }"
          class="titulo-eje-y"
          style="padding: 10px 0 5px 0"
          v-html="titulo_eje_y"
        ></div>
      </div>
      <svg class="svg-lineas">
        <defs>
          <clipPath id="clip">
            <rect></rect>
          </clipPath>
        </defs>
        <g class="eje-x"></g>
        <g class="eje-y"></g>
        <g class="grupo-fondo"></g>
        <g class="grupo-contenedor-de-lineas">
          <line class="guia-x"></line>
          <line class="guia-y"></line>
        </g>
        <g class="grupo-frente"></g>
      </svg>
      <div class="contenedor-titulo-eje-x">
        <div
          class="titulo-eje-x"
          :style="{paddingLeft:(ancho_leyenda_y + margen.izquierda) +'px'}"
          v-html="titulo_eje_x"
        ></div>
      </div>

    </div>
    <slot name="pie">
      <div class="pie"> 
        <p class="nomenclatura"> <span :style="{background: color_2016} "></span> 2016-2017: Llamado nacional para crear protocolos de atención.</p>
        <p class="nomenclatura"><span :style="{background: color_2020} "></span> 2020-2021: Pandemia por Covid-19.</p>  
        <p class="nomenclatura fuente">  Fuente: Base de datos propia, construida con información de las secretarías de Educación de 28 estados del país. Baja California Sur, Nuevo León, San Luis Potosí y Sonora no entregaron información.</p>  

      </div> 
      

    </slot>

  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: 'SisdaiLineas',
  components: {},
  props: {
    linea_id: String,
    datos: Array,
    variables: Array,
    titulo_eje_y: String,
    titulo_eje_x: String,
    nombre_columna_horizontal: String,
    conversionTemporal: {
      type: Function,
      default: () => d3.timeParse("%d-%m-%Y")
    },
    alto_vis: {
      type: Number,
      default: function () {
        return 300
      }
    },
    escala_logaritmica: {
      type: Boolean,
      default: false
    },
    titulo_tooltip: {
      type: String,
      default: ""
    },
    ancho_tooltip: {
      type: Number,
      default: 120
    },
    margen: {
      type: Object,
      default: () => ({arriba: 10, abajo: 70, izquierda: 20, derecha: 30})
    },
    tipo_tooltip: {
      type: String,
      default: () => "general"
    },
    logo_conacyt: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    tooltip_activo: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    textoTooltip: {
      type: Function,
      default: function () {
        if (this.tipo_tooltip == "general") {
          let total_muestras = d3.sum(this.variables.map((d) => this.tooltip_data_seleccionada[d.cve]));
          let cifras_variables = this.variables.map((d) => `<p>
							<span class="nomenclatura-tooltip" style="background: ${d.color} "></span>
							${d.cve} <b>${(this.tooltip_data_seleccionada[d.cve]).toLocaleString("en")}</b>
							(${Math.round(100 * this.tooltip_data_seleccionada[d.cve] / total_muestras)}%)
							</p>`)
          return `${cifras_variables.join("")}`
        } else if (this.tipo_tooltip == "individual") {
          let entidad = this.variables.filter(d => d.cve == this.tooltip_data_seleccionada.cve)[0]
          return `
							
							Año: ${this.tooltip_data_seleccionada.fech.toLocaleDateString('en-GB').split("/").slice(-1) == 2023 ? "Febrero de 2023": this.tooltip_data_seleccionada.fech.toLocaleDateString('en-GB').split("/").slice(-1)}<br/>
							${entidad.nombre}: ${this.tooltip_data_seleccionada.cat.toLocaleString('en')}  <br/>
						`
        }

      }
    }
  },
  computed: {},
  watch: {

    variables() {

      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaLinea();
      this.creandoLineas();
      this.actualizandoLineas();

    },
    datos() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaLinea();
      this.creandoLineas()
      this.actualizandoLineas();

    },
    margen() {
      this.reescalandoPantalla()
    }
  },
  data() {
    return {
      width: 200,
      ancho_leyenda_y: 0,
      ancho:0,

      tooltip_data_seleccionada: Object,
      color_2016: "#57b9c7bd",
      color_2020: "#e1b02ebd"

    }
  },
  mounted() {
    this.claves = this.variables.map(d => d.cve)
    this.svg = d3.select("div#" + this.linea_id + " svg.svg-lineas");
    this.grupo_contenedor = this.svg.select("g.grupo-contenedor-de-lineas");

    this.guia_x = this.grupo_contenedor.select("line.guia-x")
    this.guia_y = this.grupo_contenedor.select("line.guia-y")

    this.tooltip = d3.select("div#" + this.linea_id)
        .select("div.tooltip");
    this.eje_x = this.svg
        .select("g.eje-x");
    this.eje_y = this.svg
        .select("g.eje-y");

    this.grupo_frente = this.svg.select("g.grupo-frente")
    this.grupo_fondo = this.svg.select("g.grupo-fondo")

    this.configurandoDimensionesParaSVG();
    this.configurandoDimensionesParaLinea();
    /*this.brush = d3.brushX()
      .extent( [ [0,0], [this.width,this.height] ] )
      .on("end", this.zoomSeleccion)
    this.grupo_contenedor
      .append("g")
      .attr("class","brush")
      .call(this.brush)*/
    this.creandoLineas();
    this.actualizandoLineas();

    this.guia_y
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", this.ancho)
        .attr("y2", 0)
    this.guia_x
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", this.alto)

    window.addEventListener("resize", this.reescalandoPantalla);
  },
  methods: {
    multiFormat(date) {
      /**
       * Método para traducir el formato de fecha
       */
      this.locale = d3.timeFormatLocale({
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["€", ""],
        "dateTime": "%A, %e %B %Y г. %X",
        "date": "%d.%m.%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        "shortDays": ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
        "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        "shortMonths": ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
      });
      this.formatMillisecond = this.locale.format(".%L");
      this.formatSecond = this.locale.format(":%S");
      this.formatMinute = this.locale.format("%I:%M");
      this.formatHour = this.locale.format("%I %p");
      this.formatDay = this.locale.format("%a %d");
      this.formatWeek = this.locale.format("%b %d");
      this.formatMonth = this.locale.format("%b");
      this.formatMonthYear = this.locale.format("%b/%Y");
      this.formatYear = this.locale.format("%Y");
      // console.log(date)
      return (d3.timeSecond(date) < date ? this.formatMillisecond
          : d3.timeMinute(date) < date ? this.formatSecond
              : d3.timeHour(date) < date ? this.formatMinute
                  : d3.timeDay(date) < date ? this.formatHour
                      : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? this.formatDay : this.formatWeek)
                          : d3.timeYear(date) < date ? this.formatMonthYear
                              : this.locale.format("%Y"))(date);
    },
    configurandoDimensionesParaSVG() {
      this.ancho_leyenda_y = document.querySelector("#" + this.linea_id + " .titulo-eje-y")
          .clientHeight
      this.ancho = document.querySelector(`#${this.linea_id}`).clientWidth - this.margen.derecha - this.margen.izquierda - this.ancho_leyenda_y
      this.alto = this.alto_vis - this.margen.arriba - this.margen.abajo;

      this.svg
          .attr("width", this.ancho + this.margen.derecha + this.margen.izquierda)
          .attr("height", this.alto + this.margen.arriba + this.margen.abajo)
          .style("left", this.ancho_leyenda_y + "px");

          this.grupo_fondo
          .attr("transform", `translate(${this.margen.izquierda},${this.margen.arriba})`);
      this.grupo_contenedor
          .attr("transform", `translate(${this.margen.izquierda},${this.margen.arriba})`);
      this.grupo_frente.attr("transform", `translate(${this.margen.izquierda},${this.margen.arriba})`);
    },
    configurandoDimensionesParaLinea() {
      this.datos.forEach((d) => {
        d.fech = this.conversionTemporal(d[this.nombre_columna_horizontal])
      })
      this.escalaX = d3.scaleTime()
          .domain(d3.extent(this.datos.map((d) => d.fech)))
          .range([0, this.ancho])

      this.claves = this.variables.map(d => d.cve);
      if (this.escala_logaritmica) {
        this.escalaY = d3.scaleLog()
            .domain([
              d3.min(this.datos.map((d) => d3.min(this.claves.map((dd) => d[dd])))),
              d3.max(this.datos.map((d) => d3.max(this.claves.map((dd) => d[dd]))))
            ])
            .range([this.alto, 0])
      } else {
        if (this.claves.length != 0) {
          this.escalaY = d3.scaleLinear()
              .domain([
                0,
                d3.max(this.datos.map((d) => d3.max(this.claves.map((dd) => d[dd]))))
              ])
              .range([this.alto, 0])
        } else {
          this.escalaY = d3.scaleLinear()
              .domain([
                0, 0
              ])
              .range([this.alto, 0])
        }

      }

    },

    creandoLineas() {
      this.rect_llamado = this.grupo_fondo.append("rect")
      this.rect_crisis = this.grupo_fondo.append("rect")

      this.grupo_contenedor.selectAll("g.grupos-lineas-puntos").remove()
      this.grupos_series = this.grupo_contenedor
          .selectAll("grupos-lineas-puntos")
          .data(this.variables)
          .enter()
          .append("g")
          .attr("class", "grupos-lineas-puntos")


      this.grupos_lineas = this.grupos_series
          .style("fill", "none")
          .style("stroke", d => d.color)
          .style("stroke-width", "1px")
          .selectAll("lineas")
          .data((d) => {
            return [this.datos.map((dd) => ({
              "fech": dd.fech,
              "cat": dd[d.cve],
              color: d.color,
              cve: d.cve,
              resaltado: d.resaltado
            }))]
          })
          .enter()
          .append("path")
          .attr("class", "lineas")


      if (this.variables.length == 1) {
        this.grupos_puntos = this.grupos_series
            .selectAll("puntos")
            .data((d) => {
              return [this.datos.map((dd) => ({
                "fech": dd.fech,
                "cat": dd[d.cve],
                color: d.color,
                cve: d.cve,
                resaltado: d.resaltado
              }))]
            })
            .enter()
            .selectAll("puntos")
            .data(d => d)
            .enter()
            .append("circle")
            .attr("class", "puntos")

      }
      if (this.tooltip_activo) {
        this.svg
            .on("mousemove", (evento) => {
              if (this.tipo_tooltip == "individual") this.mostrarTooltipIndividual(evento);
              else if (this.tipo_tooltip == "general") this.mostrarTooltipGeneral(evento);
            })
            .on("mouseout", this.cerrarTooltip)
      }

    },
    actualizandoLineas() {
      this.rect_llamado
        .attr("x",this.escalaX(this.conversionTemporal("2016")))
        .attr("y",0)
        .attr("rx",10)
        .attr("width",this.escalaX(this.conversionTemporal("2017")) - this.escalaX(this.conversionTemporal("2016")))
        .attr("height", this.alto)
        .style("fill",this.color_2016)

      this.rect_crisis.attr("x",this.escalaX(this.conversionTemporal("2020")))
        .attr("y",0)
        .attr("rx",10)
        .attr("width",this.escalaX(this.conversionTemporal("2022")) - this.escalaX(this.conversionTemporal("2020")))
        .attr("height", this.alto)
        .style("fill",this.color_2020)
      this.grupos_lineas
          .attr("d", (dd) => {

                return d3.line()
                    .x((d) => this.escalaX(d.fech))
                    .y((d) => this.escalaY(d.cat))(dd)
              }
          )


          .attr("d", (dd) => {
                return d3.line()
                    .x((d) => this.escalaX(d.fech))
                    .y((d) => this.escalaY(d.cat))(dd)
              }
          )
      if (this.variables.length == 1) {
        this.grupos_puntos.style("fill", d => d.color)
            .style("stroke", "#fff")
            .attr("r", 5)
            .attr("cx", (d) => this.escalaX(d.fech))
            .attr("cy", (d) => this.escalaY(d.cat))
      }


      this.eje_x.attr("transform", `translate(${this.margen.izquierda}, ${this.alto + this.margen.arriba})`)
          .call(
              d3.axisBottom(this.escalaX)
                  .ticks(10)
                  .tickFormat(this.multiFormat)
          );
      this.eje_x.selectAll("text")
          //.style("text-anchor","middle")
          .style("dominant-baseline", "middle");
      this.eje_x.selectAll("line")
          .remove();
      this.eje_x.select("path").remove()
      // this.eje_x.select("path").attr("d", () => {
      //   return this.eje_x.select("path").attr("d").replace("M0,6", "M0,0").replace("V6", "V0")
      // })
      this.eje_x.selectAll("text").style("transform",`rotate(${-90}deg)translate(${-25}px,${-15}px)`)
        .text((d,i)=>{

          return this.multiFormat(d) == 2023 ? " Febrero de 2023": this.multiFormat(d)
        })
      this.eje_y.attr("transform", `translate(${this.margen.izquierda}, ${this.margen.arriba})`)
          .call(d3.axisLeft(this.escalaY).ticks(5));
      this.eje_y.select("path").style("opacity", 0);
      this.eje_y.selectAll("line")
          .attr("x2", this.ancho)
          .style("stroke-opacity", ".2")
          .style("stroke", "#000");
    },

    reescalandoPantalla() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaLinea();
      this.actualizandoLineas();
    },

    cerrarTooltip() {
      this.tooltip.style('visibility', 'hidden')
    },


    mostrarTooltipIndividual(evento) {
      let bisecetDate = d3.bisector((d) => d.fech).left;
      let x0 = this.escalaX.invert(evento.layerX - this.margen.izquierda)
      let indice = bisecetDate(this.datos, x0);
      let d0 = this.datos[indice - 1]
      let d1 = this.datos[indice];
      if (d0 != undefined & d1 != undefined) {

        let datum = x0 - d0.fech > d1.fech - x0 ? d1 : d0;
        let datos_y = this.claves.map(d => [d, datum[d]]).sort((a, b) => d3.ascending(a[1], b[1]))

        let bisectCantidad = d3.bisector((d) => d).center;
        let y0 = this.escalaY.invert(evento.layerY - this.margen.arriba);
        let indiceY = bisectCantidad(datos_y.map(d => d[1]), y0)

        this.tooltip_data_seleccionada = {
          fech: datum.fech,
          cve: datos_y[indiceY][0],
          cat: datum[datos_y[indiceY][0]],
          ...this.variables.filter(d => d.cve == datos_y[indiceY][0])[0]
        }
        this.guia_y
            .transition()
            .duration(50)
            .attr("x1", 0)
            .attr("y1", this.escalaY(this.tooltip_data_seleccionada.cat))
            .attr("x2", this.ancho)
            .attr("y2", this.escalaY(this.tooltip_data_seleccionada.cat))
            .style("stroke", "gray")
        this.guia_x
            .transition()
            .duration(100)
            .attr("x1", this.escalaX(this.tooltip_data_seleccionada.fech))
            .attr("y1", 0)
            .attr("x2", this.escalaX(this.tooltip_data_seleccionada.fech))
            .attr("y2", this.alto)
            .style("stroke", "gray")
        this.tooltip
            .style("visibility", "visible")
            .style("left", evento.layerX - this.margen.izquierda < .6 * this.ancho ? (evento.layerX + 10 + this.ancho_leyenda_y) + "px" : (+evento.layerX - this.ancho_tooltip - 20 + this.ancho_leyenda_y) + "px")
            .style("top", evento.layerY + "px")
            .attr("width", this.ancho_tooltip)
            .attr("height", 30)

        let contenido_tooltip = this.tooltip.select("div.tooltip-contenido")
            .style("background", this.tooltip_data_seleccionada.color)
            .style("min-width", this.ancho_tooltip + "px")
            .style("border-radius", "8px")
            .style("width", this.ancho_tooltip + "px")
            .style("padding", "0 3px 0 10px")

        contenido_tooltip
            .select("div.tooltip-cifras")
            .html(this.textoTooltip())
            .style("margin", "0")
            .style("padding", "0 0 5px 0")

        contenido_tooltip.transition()
            .duration(100)
            .style("background", this.tooltip_data_seleccionada.color)
        this.tooltip
            .style("height", contenido_tooltip.style("height"))
            .style("width", contenido_tooltip.style("width"))
      }
    },
    mostrarTooltipGeneral(evento) {

      let bisecetDate = d3.bisector((d) => d.fech).left;
      let x0 = this.escalaX.invert(evento.layerX - this.margen.izquierda)
      let indice = bisecetDate(this.datos, x0);
      let d0 = this.datos[indice - 1]
      let d1 = this.datos[indice];
      if (d0 != undefined & d1 != undefined) {
        this.tooltip_data_seleccionada = x0 - d0.fech > d1.fech - x0 ? d1 : d0;

        this.guia_x
            .transition()
            .duration(100)
            .attr("x1", this.escalaX(this.tooltip_data_seleccionada.fech))
            .attr("y1", 0)
            .attr("x2", this.escalaX(this.tooltip_data_seleccionada.fech))
            .attr("y2", this.alto)
            .style("stroke", "gray")

        this.tooltip
            .style("visibility", "visible")
            .style("left", evento.layerX - this.margen.izquierda < .5 * this.ancho ? (evento.layerX + 20 + 1 * this.margen.izquierda) + "px" : (+evento.layerX - this.ancho_tooltip - 20 + this.ancho_leyenda_y) + "px")
            .style("top", 0 + "px")
            .attr("width", this.ancho_tooltip)
            .attr("height", 30)

        const contenidoTooltip = this.tooltip.select('div.tooltip-contenido')
            .style('min-width', this.ancho_tooltip)
            .style('border-radius', '8px')
            .style('width', `${this.ancho_tooltip}px`)
            .style('padding', '10px');


        contenidoTooltip
            .select('div.tooltip-cifras')
            .html(this.textoTooltip())
            .style('margin', '0')
            .style('padding', '0');

        this.tooltip
            .style('height', contenidoTooltip.style('height') + "px")
            .style('width', (parseInt(contenidoTooltip.style('width'), 10) + 13) + "px")
      }


    },


  }
}
</script>
<style lang="scss" scoped>

svg.svg-lineas {
  position: absolute;
  top: 0;
}

svg.svg-barras :deep(text) {
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
}
div.pie{
  margin-bottom:40px;
  p.nomenclatura{
    font-size: 14px;
    margin: 5px;
    span{
      width: 20px;
      height: 16px;
      border-radius: 4px;
      transform: translateY(2px);
      position: relative;
      display: inline-block;
    }
  }
}

div.contenedor-tooltip-svg {
  position: relative;
  width: 100%;
  display: block;
  svg {
    z-index: 1;
  }

  .contenedor-titulo-eje-y {
    display: inline-block;
    width: 10px;

    .titulo-eje-y {
      display: block;
      transform-origin: top left;
      //transform: rotate(-90deg) translate(-100%);
      font-size: 12px;
      text-align: center;
      font-weight: 600;
    }
  }

  div.contenedor-titulo-eje-x {
    position: relative;
    width: 100%;
    .titulo-eje-x {
      font-size: 12px;
      text-align: center;
      font-weight: 600;
      margin: 16px 0;
    }
  }

  div.tooltip {
    color: #000;
    font-size: 12px;
    position: absolute;
    z-index: 1000;
    visibility: hidden;
    .tooltip-contenido {
      background: #e0e0e083;
      backdrop-filter: blur(3px);
    }
  }

  div.tooltip :deep(div.tooltip-cifras) {
    padding-bottom: 5px;

    p {
      margin: 3px;

      span.nomenclatura-tooltip {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: solid 1px rgba(255, 255, 255, 0.7);
        display: inline-block;
      }
    }
  }

  div.tooltip div.contenedor-boton-cerrar {
    height: auto;
    display: flex;
    width: 100%;
    padding-top: 5px;
    font-weight: 600;
  }

  div.tooltip button.boton-cerrar-tooltip {
    background: transparent;
    border: none;
    font-size: 30px;
    line-height: 0.9;
    font-weight: 300;
    padding: 0 5px;
    border-radius: 8px;
    margin: 0 0 0 auto;
    @media (min-width: 768px) {
      display: none;
    }
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      float: right;
    }
  }
}


</style>