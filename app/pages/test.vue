<template>
  <div>
    <no-ssr>
      <template v-if="view===0">
        <editor-js
          v-model="contentEditor"
          :initial-content="testContent"
        />
      </template>
      <template v-if="view===1">
        <content-viewer :content="testContent" />
      </template>
    </no-ssr>
  </div>
</template>

<script>
import ContentViewer from '@/components/unit/content-viewer'
export default {
    components: {ContentViewer},
    data() {
        return {
            view: 1,
            testContent: JSON.parse(getTestContent()),
            contentEditor: null,
        }
    },
    mounted() {
        this.configBar(`Pagina demo`, [
            {handler: this.logout, text: `Cerrar sesion`},
        ])
    },
    head() {
        return {
            title: `Pagina demo`,
        }
    },
}

function getTestContent() {
    return `{"time":1582893129983,"blocks":[{"type":"paragraph","data":{"text":"El sistema solar es el <b>sistema planetario</b> en el que se encuentran la Tierra y otros objetos astronómicos que giran directa o indirectamente en una órbita alrededor de una única estrella conocida como <b>el Sol</b>."}},{"type":"paragraph","data":{"text":"La estrella concentra el 99,75 % de la masa del sistema solar,​ y la mayor parte de la masa restante se concentra en ocho planetas cuyas órbitas son prácticamente <b>circulares</b> y transitan dentro de un disco casi llano llamado<b> plano eclíptico</b>.​ Los cuatro planetas más cercanos, considerablemente más pequeños Mercurio, Venus, <b>Tierra</b> y <b>Marte</b>, también conocidos como los<b> planetas terrestres</b>, están compuestos principalmente por roca y metal. Mientras que los cuatro más alejados, denominados gigantes gaseosos o planetas jovianos, más masivos que los terrestres, están compuestos de hielo y gases. Los dos más grandes, Júpiter y <b>Saturno</b>, están compuestos principalmente de <b>helio</b> e <b>hidrógeno</b>. Urano y Neptuno, denominados <b>gigantes helados</b>, están formados mayoritariamente por agua congelada, amoniaco y <b>metano</b>."}},{"type":"paragraph","data":{"text":"El Sol es el único cuerpo celeste del sistema solar que emite luz propia,​ debido a la fusión termonuclear del hidrógeno y su transformación en helio en su <b>núcleo</b>.​El sistema solar se formó hace unos 4600 millones de años a partir del colapso de una nube molecular. El material residual originó un disco circunestelar <b>protoplanetario</b> en el que ocurrieron los procesos físicos que llevaron a la formación de los planetas. El sistema solar se ubica en la actualidad en la <b>nube Interestelar Local</b> que se halla en la Burbuja Local del brazo de Orión, de la galaxia espiral Vía Láctea, a unos 28 000 años luz del centro de esta."}}],"version":"2.16.1"}` // eslint-disable-line
}
</script>
