<template>
  <div v-bind:id="barras_id" class="contenedor-barras">
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
      <svg class="svg-barras">
        <defs></defs>
        <g class="grupo-fondo"></g>
        <g class="grupo-contenedor-de-barras"></g>
        <g class="grupo-frente"></g>
      </svg>
      <div class="contenedor-titulo-eje-x">
        <div
          class="titulo-eje-x"
          :style="{ paddingLeft: ancho_leyenda_y + margen.izquierda + 'px' }"
          v-html="titulo_eje_x"
        ></div>
      </div>
    </div>
    <slot name="pie"></slot>
  </div>
</template>
  
  <script>
import * as d3 from "d3";

export default {
  name: "Barras",
  props: {
    barras_id: String,
    datos: Array,
    variables: {
      type: Array,
      default: function () {
        return [];
      },
    },
    orientacion: {
      type: String,
      default: "vertical",
    },
    nombre_barra: String,
    nombre_color: String,
    titulo_eje_y: String,
    titulo_eje_x: String,
    ancho_tooltip: {
      type: Number,
      default: 200,
    },
    margen: {
      type: Object,
      default: function () {
        return { arriba: 20, abajo: 50, izquierda: 60, derecha: 20 };
      },
    },
    alto_vis: {
      type: Number,
      default: function () {
        return 250;
      },
    },
    espaciado_barras: {
      type: Number,
      default: function () {
        return 0.0;
      },
    },
    logo_conacyt: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    tooltip_activo: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    textoTooltip: {
      type: Function,
      default: function () {
        var txt = [];
        this.variables.map((d) => {
          txt.push(`<p><span class="nomenclatura-tooltip" style="background: ${
            d.color
          }"></span>
                          ${
                            d[this.nombre_color]
                          }: <b>${this.tooltip_data_seleccionada[
            d.id
          ].toLocaleString("en")}</b>  
                          </p>`);
        });

        return `<p><b> ${this.tooltip_categoria}</b></p>
                          ${txt.join(" ")}`;
      },
    },
    apiladas_o_agrupadas: {
      default: () => "apiladas",
      type: String,
    },
    padding_agrupadas: {
      type: Number,
      default: () => 0.1,
    },
  },
  watch: {
    variables() {
      this.configurandoDimensionesParaBarras();
      this.creandoBarras();
      this.actualizandoBarras();
    },
    datos() {
      this.configurandoDimensionesParaBarras();
      this.creandoBarras();
      this.actualizandoBarras();
    },
  },

  data() {
    return {
      width: 200,
      ancho_leyenda_y: 0,
      ancho: 0,
    };
  },
  mounted() {
    this.svg = d3.select(`#${this.barras_id} .svg-barras`);
    this.grupo_contenedor = this.svg.select(".grupo-contenedor-de-barras");
    this.grupo_fondo = this.svg.select(".grupo-fondo");
    this.grupo_frente = this.svg.select(".grupo-frente");

    this.eje_y = this.grupo_contenedor.append("g").attr("class", "eje-y");
    this.eje_x = this.grupo_contenedor.append("g").attr("class", "eje-x");

    this.tooltip = d3.select(`#${this.barras_id} .tooltip`);
    this.configurandoDimensionesParaSVG();
    this.configurandoDimensionesParaBarras();
    this.creandoBarras();
    this.actualizandoBarras();

    window.addEventListener("resize", this.reescalandoPantalla);
  },
  destroyed() {
    window.removeEventListener("resize", this.reescalandoPantalla);
  },
  methods: {
    configurandoDimensionesParaSVG() {
      this.ancho_leyenda_y = document.querySelector(
        `#${this.barras_id} .titulo-eje-y`
      ).clientHeight;

      this.ancho =
        document.querySelector(`#${this.barras_id}`).clientWidth -
        this.margen.derecha -
        this.margen.izquierda -
        this.ancho_leyenda_y;
      this.alto = this.alto_vis - this.margen.arriba - this.margen.abajo;

      this.svg
        .attr("width", this.ancho + this.margen.derecha + this.margen.izquierda)
        .attr("height", this.alto + this.margen.arriba + this.margen.abajo)
        .style("left", this.ancho_leyenda_y + "px");

      this.grupo_contenedor.attr(
        "transform",
        `translate(${this.margen.izquierda},${this.margen.arriba})`
      );

      this.grupo_fondo.attr(
        "transform",
        `translate(${this.margen.izquierda},${this.margen.arriba})`
      );

      this.grupo_frente.attr(
        "transform",
        `translate(${this.margen.izquierda},${this.margen.arriba})`
      );
    },

    configurandoDimensionesParaBarras() {
      this.data_apilada = d3.stack().keys(this.variables.map((d) => d.id))(
        this.datos
      );
      for (let i = 0; i < this.variables.length; i++) {
        this.data_apilada[i].forEach((d) => {
          d.data = Object.assign({}, d.data, { key: this.data_apilada[i].key });
        });
      }

      if (this.orientacion === "vertical") {
        if (this.apiladas_o_agrupadas === "apiladas") {
          this.escalaY = d3
            .scaleLinear()
            .domain([
              0,
              d3.max(
                this.datos.map((d) =>
                  d3.sum(this.variables.map((dd) => d[dd.id]))
                )
              ),
            ])
            .range([this.alto, 0]);
        } else {
          this.escalaY = d3
            .scaleLinear()
            .domain([
              0,
              d3.max(
                this.datos.map((d) =>
                  d3.max(this.variables.map((dd) => d[dd.id]).filter(d=> d!="NE" && d!="ND"))
                )
              ),
            ])
            .range([this.alto, 0]);
        }

        this.escalaX = d3
          .scaleBand()
          .domain(this.datos.map((d) => d[this.nombre_barra]))
          .range([0, this.ancho])
          .padding(this.espaciado_barras);

        // Esta escala se usará sólo para agrupadas
        this.escalaXSub = d3
          .scaleBand()
          .domain(this.variables.map((d) => d.id))
          .range([0, this.escalaX.bandwidth()])
          .padding(this.padding_agrupadas);

        this.eje_y.call(d3.axisLeft(this.escalaY).ticks(5));
        this.eje_y.select("path.domain").remove();
        this.eje_y
          .selectAll("line")
          .attr("x1", this.ancho)
          .style("stroke", "#000000")
          .style("stroke-opacity", ".2");

        this.eje_x
          .call(d3.axisBottom(this.escalaX))
          .attr("transform", `translate(${0}, ${this.alto})`);

        this.eje_x.select("path").remove();
        this.eje_x.selectAll("line").remove();
      } else {
        if (this.apiladas_o_agrupadas === "apiladas") {
          this.escalaX = d3
            .scaleLinear()
            .domain([
              0,
              d3.max(
                this.datos.map((d) =>
                  d3.sum(this.variables.map((dd) => d[dd.id]))
                )
              ),
            ])
            .range([0, this.ancho]);
        } else {
          this.escalaX = d3
            .scaleLinear()
            .domain([
              0,
              d3.max(
                this.datos.map((d) =>
                  d3.max(this.variables.map((dd) => d[dd.id]))
                )
              ),
            ])
            .range([0, this.ancho]);
        }

        this.escalaY = d3
          .scaleBand()
          .domain(this.datos.map((d) => d[this.nombre_barra]))
          .range([0, this.alto])
          .padding(this.espaciado_barras);

        // Esta escala se usará sólo para agrupadas
        this.escalaYSub = d3
          .scaleBand()
          .domain(this.variables.map((d) => d.id))
          .range([0, this.escalaY.bandwidth()])
          .padding(this.padding_agrupadas);

        this.eje_y.call(d3.axisLeft(this.escalaY));
        this.eje_y.select("path.domain").remove();
        this.eje_y.selectAll("line").remove();
        this.eje_y
          .selectAll("text")

          .style("fill", "#000000");

        this.eje_x
          .call(d3.axisBottom(this.escalaX))
          .attr("transform", `translate(${0}, ${this.alto})`);
        this.eje_x.select("path.domain").remove();
        this.eje_x
          .selectAll("line")
          .attr("y1", -this.alto)
          .style("stroke-opacity", ".2")
          .style("stroke", "#000000");
        this.eje_x
          .selectAll("text")

          .style("fill", "#000000");
      }
    },
    creandoBarras() {
      this.grupo_contenedor.selectAll(".g-rects").remove();

      this.barras_juntadas = this.grupo_contenedor
        .selectAll(".g-rects")
        .data(this.data_apilada)
        .enter()
        .append("g")
        .attr("class", (d) => `${d.key} g-rects`)
        .style("fill", (d, i) => this.variables[i].color);

      this.barras_individuales = this.barras_juntadas
        .selectAll("rect")
        .data((d) => d)
        .enter()
        .append("rect");
      
        this.cifras_barras = this.barras_juntadas
        .selectAll("text")
        .data((d) => d)
        .enter()
        .append("text");

      if (this.tooltip_activo) {
        this.svg
          .on("mousemove", (evento) => {
            this.mostrarTooltip(evento);
          })
          .on("mouseout", this.cerrarTooltip);
      }
    },
    actualizandoBarras() {
      if (this.orientacion === "vertical") {
        if (this.apiladas_o_agrupadas === "apiladas") {
          this.barras_individuales
            .attr("width", this.escalaX.bandwidth)
            .attr("height", (d) => this.escalaY(d[0]) - this.escalaY(d[1]))
            .attr("x", (d) => this.escalaX(d.data[this.nombre_barra]))
            .attr("y", (d) => this.escalaY(d[1]));
        } else {
          this.barras_individuales
            .attr("width", this.escalaXSub.bandwidth)
            .attr("height", (d) => this.escalaY(d[0]) - this.escalaY(d[1]))
            .attr(
              "x",
              (d) =>
                this.escalaX(d.data[this.nombre_barra]) +
                this.escalaXSub(d.data.key)
            )
            .attr("y", (d) => this.escalaY(d[1] - d[0]));
          
            this.cifras_barras.attr(
              "x",
              (d) =>
                this.escalaX(d.data[this.nombre_barra]) +
                this.escalaXSub(d.data.key) + .5 * this.escalaXSub.bandwidth()
            )
            .attr("y", (d) => (d.data[d.data.key]=="NE" || d.data[d.data.key]=="ND") ? this.alto :  -2 + this.escalaY(d[1] - d[0]))
            .text(d=> { return d.data[d.data.key]})
            .style("font-size", "14px")
            .style("text-anchor", "middle")
            .style("font-weight", "700")
        }
      } else {
        if (this.apiladas_o_agrupadas === "apiladas") {
          this.barras_individuales
            .attr("width", (d) => this.escalaX(d[1]) - this.escalaX(d[0]))
            .attr("height", this.escalaY.bandwidth)
            .attr("x", (d) => this.escalaX(d[0]))
            .attr("y", (d) => this.escalaY(d.data[this.nombre_barra]));
        } else {
          this.barras_individuales
            .attr("width", (d) => this.escalaX(d[1]) - this.escalaX(d[0]))
            .attr("height", this.escalaYSub.bandwidth)
            .attr("x", (d) => d3.min(this.escalaX.domain()))
            .attr(
              "y",
              (d) =>
                this.escalaY(d.data[this.nombre_barra]) +
                this.escalaYSub(d.data.key)
            );
        }
      }
    },

    reescalandoPantalla() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaBarras();
      this.actualizandoBarras();
    },
    mostrarTooltip(evento) {
      // TODO: volter esto layerX y this.escalaX.step();
      if (this.orientacion === "vertical") {
        this.tooltip_bandas = this.escalaX.step();
        this.tooltip_indice = parseInt(
          (evento.layerX - this.margen.izquierda - this.margen.derecha) /
            this.tooltip_bandas
        );

        if (
          0 <= this.tooltip_indice &&
          this.tooltip_indice < this.datos.length
        ) {
          this.tooltip_categoria = this.escalaX.domain()[this.tooltip_indice];
          this.tooltip_data_seleccionada = this.data_apilada[0].filter(
            (dd) => dd.data[this.nombre_barra] == this.tooltip_categoria
          )[0].data;

          this.tooltip
            .style("visibility", "visible")
            .style(
              "left",
              evento.layerX >
                0.5 * (this.ancho + this.margen.izquierda + this.margen.derecha)
                ? `${
                    evento.layerX -
                    this.ancho_tooltip +
                    this.ancho_leyenda_y -
                    20
                  }px`
                : `${evento.layerX + this.ancho_leyenda_y + 20}px`
            )
            .style("width", this.ancho_tooltip + "px")
            .style("top", evento.layerY + "px")
            .style("height", "30px");

          let contenido_tooltip = this.tooltip
            .select(".tooltip-contenido")
            .style("min-width", this.ancho_tooltip + "px")
            .style("border-radius", "8px")
            .style("width", this.ancho_tooltip + "px")
            .attr("height", 70)
            .style("padding", "0 3px 0 10px");

          contenido_tooltip
            .select("div.tooltip-cifras")
            .html(this.textoTooltip());

          this.barras_individuales.style("fill-opacity", ".2");

          this.barras_individuales
            .filter((d) => d.data[this.nombre_barra] == this.tooltip_categoria)
            .style("fill-opacity", "1");
        }
      } else {
        this.tooltip_bandas = this.escalaY.step();
        this.tooltip_indice = parseInt(
          (evento.layerY - this.margen.arriba + this.espaciado_barras) /
            this.tooltip_bandas
        );

        if (
          0 <= this.tooltip_indice &&
          this.tooltip_indice < this.datos.length
        ) {
          this.tooltip_categoria = this.escalaY.domain()[this.tooltip_indice];
          this.tooltip_data_seleccionada = this.data_apilada[0].filter(
            (dd) => dd.data[this.nombre_barra] == this.tooltip_categoria
          )[0].data;

          this.tooltip
            .style("visibility", "visible")
            .style(
              "left",
              evento.layerX >
                0.5 * (this.ancho + this.margen.izquierda + this.margen.derecha)
                ? `${
                    evento.layerX -
                    this.ancho_tooltip +
                    this.ancho_leyenda_y -
                    20
                  }px`
                : `${evento.layerX + this.ancho_leyenda_y + 20}px`
            )
            .style("width", this.ancho_tooltip + "px")
            .style("top", evento.layerY + "px")
            .style("height", "30px");

          let contenido_tooltip = this.tooltip
            .select(".tooltip-contenido")
            .style("min-width", this.ancho_tooltip + "px")
            .style("border-radius", "8px")
            .style("width", this.ancho_tooltip + "px")
            .attr("height", 70)
            .style("padding", "0 3px 0 10px");

          contenido_tooltip
            .select("div.tooltip-cifras")
            .html(this.textoTooltip());

          this.barras_individuales.style("fill-opacity", ".1");

          this.barras_individuales
            .filter((d) => d.data[this.nombre_barra] == this.tooltip_categoria)
            .style("fill-opacity", "1");
        }
      }
    },
    cerrarTooltip() {
      this.tooltip.style("visibility", "hidden");
      this.barras_individuales.style("fill-opacity", "1");
    },
  },
};
</script>
  
  <style lang="scss" scoped>
$border-radius-tarjeta: 10px;
svg.svg-barras {
  position: absolute;
  top: 0;
}

svg.svg-barras :deep(text) {
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
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
        border-radius: 0%;
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