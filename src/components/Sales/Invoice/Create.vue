<template>
  <div>
    <b-loading :is-full-page="false" :active.sync="isCreating" :canCancel="true"></b-loading>
    <formulate
      class="my-form"
      @submit="commitForm"
      name="createInvoice"
    >
      <formulate-element
        name="codigo"
        type="hidden"
        placeholder="-1"
      />

        <article class="tile is-child box">
          <h3 class="title">Invoice</h3>

          <div class="columns">
            <div class="column is-centered">

              <div class="control">
                <label class="label">Cliente</label>
                <formulate-element
                  name="Persona"
                  validation="required"
                >
                  <autocomplete-input
                    v-model="Persona"
                    :options="personsId || null"
                  />
                </formulate-element>
<!--
{ list: ['Html', 'CSS', 'Javascript', 'PHP'] }
 -->

<!--
                  :options="{ list: [
                    { label: 'Belarus', value: 'BY' },
                    { label: 'China', value: 'CN' },
                    { label: 'United States', value: 'US' }
                  ] }"
 -->

<!--
                <formulate-element
                  class="select is-small"
                  name="Nombre de persona"
                  type="select"
                  validation="required"
                  :options="personsId || null"
                />
 -->
              </div>

            </div>

            <div class="column is-centered">

              <div class="control">
                <label class="label">Fecha</label>
                <v-date-picker
                  :formats='formats'
                  mode='single'
                  v-model='myDate'>
                </v-date-picker>

              </div>

            </div>

          </div>

          <div class="columns is-mobile">
            <div class="column">

              <label class="label">Itemes</label>
              <button class="button is-info"
                @click="openModal">
                  <b-icon icon="plus"></b-icon>
                  <span>Anadir item</span>
              </button>

              <button class="button field is-danger" @click="dropRow"
                  :disabled="!checkedRows.length">
                  <b-icon icon="trash"></b-icon>
                  <span>Borrar seleccionadas</span>
              </button>

              <b-modal :active.sync="isComponentModalActive" has-modal-card>
                <!-- <detailsForm v-bind="formProps"></detailsForm> -->
                <detailsForm></detailsForm>
              </b-modal>

              <b-table
                :data="tableData"
                :checked-rows.sync="checkedRows"
                checkable>

                <template slot-scope="props">
                  <b-table-column label="Codigo" numeric>
                    {{ props.row.codigo }}
                  </b-table-column>

                  <b-table-column label="Producto/Servicio">
                    {{ props.row.nombre }}
                  </b-table-column>

                  <b-table-column label="Unidad">
                    {{ props.row.unidad }}
                  </b-table-column>

                  <b-table-column label="Valor" numeric>
                    {{ props.row.valor }}
                  </b-table-column>

                  <b-table-column label="IVA" numeric>
                    {{ props.row.iva.str }}
                  </b-table-column>

                  <b-table-column label="Cantidad" centered>
                    {{ props.row.cantidad }}
                  </b-table-column>

                  <b-table-column label="Total" numeric>
                    {{ props.row.total }}
                  </b-table-column>

                </template>

                <template slot="footer">
                  <th colspan="5">
                    <div class="th-wrap is-numeric">  </div>
                  </th>
                  <th colspan="2">
                    <div class="is-numeric">
                      <b-table :data="totals">
                        <template slot-scope="props">
                          <b-table-column width="180">
                              {{ props.row.label }}
                          </b-table-column>

                          <b-table-column numeric>
                            <div v-if="props.row.label.startsWith('Descuento')">
                              <formulate-element
                                name="desc"
                                placeholder=0
                                element-classes="resizedTextbox"
                                validation="isPct(desc)"
                              />
                            </div>
                            <div v-else>
                              {{ props.row.value }}
                            </div>
                          </b-table-column>
                        </template>
                      </b-table>
                    </div>
                  </th>
                  <th>
                    <div class="text-right">
                      <div class="push-down">  </div>
                      <div v-if="retention" v-bind:class="[retention === 'si' ? '' : 'strike-out']">
                        Retencion
                      </div>
                      <div v-if="distributor" v-bind:class="[distributor === 'si' ? '' : 'strike-out']">
                        Distribuidor
                      </div>
                    </div>
                  </th>
                </template>

              </b-table>


              <div class="control">

                <formulate-element
                  type="submit"
                  name="Save"
                  elementClasses="button is-info"
                />
              </div>
            </div>

          </div>
        </article>
    </formulate>

  </div>
</template>

<script>

  import { mapGetters, mapActions, mapState } from 'vuex'; // eslint-disable-line no-unused-vars
  import { mapModels } from 'vue-formulate'; // eslint-disable-line no-unused-vars

  import Awesomplete from 'awesomplete'; // eslint-disable-line no-unused-vars
  import AutoComplete from '@/components/MultiUse/AutoComplete';

  import format from '@/utils/format';

  import Details from './Details';

  const LG = console.log; // eslint-disable-line no-unused-vars, no-console

  // const SUBTOTALIVA0 = 0;
  // const SUBTOTALIVA12 = SUBTOTALIVA0 + 1;
  // const SUBTOTAL = SUBTOTALIVA12 + 1;
  // const DESCUENTO = SUBTOTAL + 1;
  // const TOTAL = DESCUENTO + 1;

  export default {
    props: ['pers'],
    components: {
      detailsForm: Details,
      'autocomplete-input': AutoComplete,
    },
    // created() {
    //   this.$on('child-data', (formData) => {
    //     LG(`Event received : ${formData}`);
    //   });
    // },
    data() {
      const totals = [];
      return {
        totals,
        isComponentModalActive: false,
        checkedRows: [],
        retention: null,
        distributor: null,
        myDate: new Date(),
        formats: {
          title: 'MMMM / YYYY',
          weekdays: 'W',
          navMonths: 'MMM',
          input: ['YYYY-MM-DD', 'YYYY/MM/DD'],
          dayPopover: 'L',
          data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        },
      };
    },

    computed: {
      ...mapGetters('invoice', {
        enums: 'getEnums',
      }),
      ...mapGetters('product', {
        products: 'list',
        productsMap: 'getProductsMap',
      }),
      ...mapGetters('person', {
        persons: 'list',
        getPerson: 'getPerson',
      }),
      ...mapState('invoice', {
        isCreating: 'isCreating',
        formRows: 'formRows',
      }),
      ...mapModels({
        Persona: 'createInvoice/Persona',
      }),
      tableData() {
        const dummy = [{
          codigo: 'codigo',
          nombre: 'nombre',
          unidad: 'unidad',
          iva: 'iva',
          valor: '$0.00',
          cantidad: 0,
          total: '$0.00',
        }];
        LG(this.products);
        LG(this.productsMap);
        LG(this.formRows);

        let pers = null;
        if (
          this.$store.state.values.createInvoice &&
          this.$store.state.values.createInvoice.Persona) {
          // LG(this.$store.state.values.createInvoice.Persona.match(/\(([^)]+)\)/)[1]);
          // LG(this.getPerson(126));
          pers = this.getPerson(this.$store.state.values.createInvoice.Persona.match(/\(([^)]+)\)/)[1]);
        }
        this.retention = (pers && pers.retencion) || null;
        this.distributor = (pers && pers.distribuidor) || null;

        LG(`


          tableData() ----------------------------`);
        this.totals = [];

        let strPrice = 0;
        let price = 0;
        let iva0 = 0;
        let iva12 = 0;
        let subtotal = 0;
        let discountPct = 0;
        let discount = 0;
        let retention = 0;
        let total = 0;

        if (this.products.length < 1) return dummy;
        if (this.formRows.row.length < 1) return dummy;
        if (this.formRows.row[0].code < 0) return dummy;


        const rows = [];
        this.formRows.row.forEach((row) => {
          LG('row');
          LG(row);
          const prd = this.productsMap[row.code];
          strPrice = (this.distributor && this.distributor === 'si') ?
            prd.valor_distribuidor.str :
            prd.valor.str;
          price = (this.distributor && this.distributor === 'si') ?
            prd.valor_distribuidor.raw :
            prd.valor.raw;
          const rowval = price * row.qty;
          LG(prd.iva);
          const i0 = (prd.iva.raw === 0) ? rowval : 0;
          const i12 = (prd.iva.raw > 0) ? (1 + prd.iva.raw) * rowval : 0;

          iva0 += i0;
          iva12 += i12;
          subtotal += i0 + i12;

          rows.push({
            codigo: row.code,
            nombre: prd.nombre,
            unidad: prd.unidad,
            iva: prd.iva,
            valor: strPrice,
            cantidad: row.qty,
            total: format.usd(price * row.qty).str,
          });
        });
        LG('rows');
        LG(rows);
        discountPct = (
          this.$store.state.values.createInvoice &&
          this.$store.state.values.createInvoice.desc
        ) || 0;
        discount = (discountPct / 100) * subtotal;
        total = subtotal - discount;

        this.totals.push({ label: 'Subtotal IVA  0%', value: format.usd(iva0).str });
        this.totals.push({ label: 'Subtotal IVA 12%', value: format.usd(iva12).str });
        this.totals.push({ label: 'Subtotal', value: format.usd(subtotal).str });
        this.totals.push({ label: 'Descuento', value: format.usd(discount).str });
        if (this.retention) {
          retention = total * 0.01;
          total -= retention;
          this.totals.push({ label: 'Retencion', value: format.usd(retention).str });
        }
        this.totals.push({ label: 'Total', value: format.usd(total).str });

        //         this.totals[SUBTOTALIVA12].value = format.usd(iva12).str;
        //         this.totals[SUBTOTAL].value = format.usd(subtotal).str;
        //         this.totals[DESCUENTO].value = format.usd(discount).str;
        //         this.totals[TOTAL].value = format.usd(total).str;

        LG('VALS');
        LG(`${iva0} : ${iva12} : ${subtotal}`);
        LG(this.$store.state.values.createInvoice);
        LG(this.$store);
        return rows;
      },
      personsId() {
        LG('CC %%%%%%%%%%%%%%%%%%');
        LG(this);
        const ret = [];
        const prsns = this.persons;
        if (prsns) {
          Object.keys(prsns).forEach((value) => {
            const person = prsns[value];
            ret.push({
              // name: person.nombre,
              value: person.codigo,
              // id: person.codigo,
              label: `${person.nombre}`,
            });
          });
        } else {
          ret.push({
            name: 'aa',
            value: 'AA',
            id: 'AA-',
            label: 'aa-',
          });
        }
        LG(ret);
        return {
          list: ret,
          // list: [
          //   'aol.com', 'att.net', 'comcast.net', 'facebook.com',
          //   'gmail.com', 'gmx.com', 'googlemail.com', 'google.com',
          //   'hotmail.com', 'hotmail.co.uk', 'mac.com', 'me.com',
          //   'mail.com', 'msn.com', 'live.com', 'sbcglobal.net',
          //   'verizon.net', 'yahoo.com', 'yahoo.co.uk',
          // ],
          data(text, input) {
            LG(`data vs ${input}`);
            LG(this);
            // return `${input.slice(0, input.indexOf('@'))}@${text}`;
            return `(${text.value}) ${text.label}`;
            // return text.label;
          },
          // replace(text) {
          //   // LG(`replace ${text}`);
          //   this.input.value = text.label;
          // },
          // filter: Awesomplete.FILTER_STARTSWITH,
        };
      },
    },
    // events: {
    //   childIsCalling: function (payload) { // eslint-disable-line func-names, object-shorthand
    //     LG('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //     LG(payload);
    //     return true;
    //   },
    // },
    methods: {
      ...mapActions('invoice', {
        saveForm: 'saveForm',
      }),
      openModal: function (event) { // eslint-disable-line func-names, object-shorthand
        event.preventDefault();
        this.isComponentModalActive = true;
      },
      // newDate() {
      //   LG('!!!!!!!!!!!!!!!! newDate !!!!!!!!!!!!!!!!!!!!!!!!!!');
      //   LG(this);
      // },
      dropRow: function (event) { // eslint-disable-line func-names, object-shorthand
        this.checkedRows.forEach((chkd) => {
          this.formRows.row.forEach((row, ix) => {
            if (row.code === chkd.codigo && row.code === chkd.codigo) {
              this.formRows.row.splice(ix, 1);
            }
          });
        });

        LG(this.checkedRows);
        event.preventDefault();
      },
      commitForm() {
        LG('Commit form');
        LG(this);
        LG(this.$store);
        LG(this.$store.state);
        LG(this.$store.state.values);
        LG(this.$store.state.values.createInvoice);
        LG(this.$store.state.values.createInvoice.Persona);
      },
      setItem(item) {
        LG(`Item ${item.qty} of ${item.code}`);
      },
    },
  };

</script>

<style scoped>
  .resizedTextbox { width: 40px; padding: 1px; text-align: right; }
  div.text-right { margin-left:auto; margin-right:0; }
  div.push-down {
      padding-top: 50px;
  }
  div.push-right {
      padding-left: 25px;
  }
  div.strike-out {
    background-color: transparent;
    background-image: -webkit-gradient(linear, 19.1% -7.9%, 81% 107.9%, color-stop(0, #fff), color-stop(.48, #fff), color-stop(.5, #000), color-stop(.52, #fff), color-stop(1, #fff));
    background-image: -webkit-repeating-linear-gradient(287deg, #fff 0%, #fff 48%, #000 50%, #fff 52%, #fff 100%);
    background-image: repeating-linear-gradient(163deg, #fff 0%, #fff 48%, #000 50%, #fff 52%, #fff 100%);
    background-image: -ms-repeating-linear-gradient(287deg, #fff 0%, #fff 48%, #000 50%, #fff 52%, #fff 100%);
  }
</style>
