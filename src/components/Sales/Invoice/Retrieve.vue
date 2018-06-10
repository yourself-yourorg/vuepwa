<template>
<!--
  <main id="invoice">
    <p class="back">
      <router-link :to="{ name: 'invoices' }">Back to Invoices</router-link>
    </p>
    <invoice-record v-if="currentInvoice" :invoice="currentInvoice" />
  </main>
-->

  <div>
    <nav class="level">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Codigo</p>
            <p class="is-size-5">{{ invc.codigo }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Fecha</p>
            <p class="is-size-5">{{ invc.fecha }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Estado</p>
            <p class="is-size-5">{{ enums[invc.estado] }}</p>
          </div>
        </div>
      </div>

      <div class="level-item has-text-centered">
        <div v-bind:class="[invc.distribuidor ? '' : 'price--line-through']">
          Distribuidor
        </div>
        <div>
          <p class="heading">Cliente</p>
          <p class="is-size-5">{{ invc.codigo_cliente }}</p>
        </div>
      </div>

      <div class="level-right">
        <div class="level-item has-text-centered">
          <div>
          <p class="heading">Mail</p>
          <p class="is-size-5">{{ invc.email }}</p>
          </div>
        </div>
      </div>
    </nav>
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Items</p>
          <b-table
              :data="detail"
              :narrowed="true">
              <template slot-scope="props">
                  <b-table-column field="cant" label="Cantidad" width="5" numeric>
                      {{ props.row.cantidad }}
                  </b-table-column>
                  <b-table-column field="nombre" label="Nombre">
                      ({{ props.row.codigo }}) {{ props.row.nombre }}
                  </b-table-column>
                  <b-table-column field="nombre" label="Unidades" width="30">
                      {{ props.row.unidad }}
                  </b-table-column>
                  <b-table-column field="descuento" label="Descuento Especial" width="5">
                      {{ props.row.descuento }}%
                  </b-table-column>
              </template>
          </b-table>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

  import { mapState, mapActions, mapGetters } from 'vuex'; // eslint-disable-line no-unused-vars

  const LG = console.log; // eslint-disable-line no-console, no-unused-vars

  export default {

    computed: {
      ...mapGetters('invoice', {
        enums: 'getEnums',
      }),
      detail() {
        LG(`  *************** INVC **********************
`);
        let items = this.invc.lista_de_items;
        const rslt = [];
        if (typeof items === 'string') {
          LG('items string');
          items = JSON
            .parse(items)
            .details
            .filter(itm => itm[0] > 0);

          LG(items);
          for (let ii = 0; ii < items.length; ii += 1) {
            rslt.push({
              codigo: items[ii][0],
              nombre: '',
              unidad: '',
              cantidad: items[ii][1],
              descuento: 100 - (items[ii][2] * 100),
            });
          }
          return rslt;
        }
        items = this.invc.lista_de_items;
        LG('items object');
        LG(items);
        for (let ii = 0; ii < items.length; ii += 1) {
          LG(`At ${ii} -- ${items[ii][0].unidad} (${items[ii][0].codigo}) ${items[ii][0].nombre}`);
          rslt.push({
            codigo: items[ii][0].codigo,
            nombre: items[ii][0].nombre,
            unidad: items[ii][0].unidad,
            cantidad: items[ii][1],
            descuento: 100 - (items[ii][2] * 100),
          });
        }
        return rslt;
      },
    },

    props: {
      invc: {
        type: Object,
        required: true,
        default: () => ({
          codigo: 9999,
          ruc_cedula: '34-4545',
          nombre: 'asdf asdf asdf asdf',
          telefono: '23452345',
          direccion: 'asdfasdf',
          distribuidor: 'si',
          retencion: 'no',
          tipo_de_documento: 'RUC',
        }),
      },
    },

  };
</script>

<style scoped>
  div.price--line-through {
    background-color: transparent;
    background-image: -webkit-gradient(linear, 19.1% -7.9%, 81% 107.9%, color-stop(0, #fff), color-stop(.48, #fff), color-stop(.5, #000), color-stop(.52, #fff), color-stop(1, #fff));
    background-image: -webkit-repeating-linear-gradient(287deg, #fff 0%, #fff 48%, #000 50%, #fff 52%, #fff 100%);
    background-image: repeating-linear-gradient(163deg, #fff 0%, #fff 48%, #000 50%, #fff 52%, #fff 100%);
    background-image: -ms-repeating-linear-gradient(287deg, #fff 0%, #fff 48%, #000 50%, #fff 52%, #fff 100%);
  }
</style>
