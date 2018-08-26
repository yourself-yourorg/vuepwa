<template>
  <div>
    <div class="card-edge">
      <div class="card" >
        <header class="card-header">
          <p class="card-header-title">
            <span class="is-size-7">Traspaso de Envases</span>
          </p>
          <div class="card-header-icon" aria-label="more options">
            <button id="control-button" :class="PersonsButton.class" @click="openShutPersons('toggle')" ref="personsButton">
              <span class="is-size-7">{{ PersonsButton.text }}</span>
            </button>
            <button id="control-button" :class="CameraButton.class" @click="openShutCamera('toggle')" ref="CameraButton">
              <span class="is-size-7">{{ CameraButton.text }}</span>
            </button>
          </div>

         </header>

        <div class="card-content">

          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <div class="is-small">Nombre de Persona</div>
              </div>
              <div class="level-item">
                <autocomplete-input
                  @input="personPicked()"
                  :options="personPicker || null"
                  id="person-picker"
                  ref="prsnPckr"
                />
              </div>
<!--
              <div class="level-item">
                <div class="field is-grouped is-grouped-centered" v-if="thoseChosen.length > 0">
                  <p class="control">
                    <span class="content is-size-5 italic">
                      {{ inwardOutward }} {{personChosen.nombre}}
                    </span>
                  </p>
                  <p class="control">
                    <span class="block">
                        <b-radio v-model="inwardOutward" size="is-small" native-value="Recibir de">
                            Recepcion
                        </b-radio>
                        <b-radio v-model="inwardOutward" size="is-small" native-value="Entregar a">
                            Entrega
                        </b-radio>
                    </span>
                  </p>
                </div>
              </div>
 -->
<!--
              <div class="level-item" v-if="autocompleteDirty">
                <a class="button is-small is-black is-inverted" @click="clearAutoComplete">
                  <span class="icon is-small">
                    <i class="far fa-trash-alt"></i>
                  </span>
                </a>
              </div>
 -->
            </div>
            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>


          <b-collapse :open="true" ref="collapsePersons">
            <div id="scrollable-content">
              <virtual-scroller
                class="virtual-list"
                :items="items || []"
                type-field="type"
                item-height="24"
                content-tag="table"
                page-mode
                ref="scroller"
                >
                <template slot-scope="props">
                  <tr v-if="props.item.type === 'chosen'" class="chosen" :key="props.itemKey">
                    <td @click="picked(props)" class="tag is-info">
                      {{props.item.data.nombre}} - &nbsp;<span class="italic"> &nbsp; {{props.item.data.email}}</span>
                    </td>
                  </tr>

                  <tr v-if="props.item.type === 'person'" class="person" :key="props.itemKey">
                    <td @click="picked(props)">
                      {{props.item.data.nombre}} - &nbsp;<span class="italic"> &nbsp; {{props.item.data.email}}</span>
                    </td>
                  </tr>
                </template>
              </virtual-scroller>
            </div>
          </b-collapse>
        </div>

        <div class="columns">
          <div class="column is-one-quarter" id="drag-column">
            <hr />
            <nav class="level">
              <div class="tags has-addons level-item has-text-centered">
                <span class="tag is-dark">nosotros</span>
                <span class="tag is-outlined tag-inventory">
                  {{ currentUser.nombre || '_____' }}
                </span>
              </div>
            </nav>
            <nav class="level">
              <div class="tags has-addons level-item has-text-centered">
                <span class="tag is-invisible">dummy</span>
              </div>
            </nav>

            <div class="container scrollable-container">
              <Container :group-name="'1'" :get-child-payload="inventoryPayload" :should-accept-drop="shouldAcceptInventory" @drop="onDrop('inventory', $event)">
                <Draggable v-for="item in inventory" :key="item.id">
                  <div :class="item.props.className" :id="item.id" :style="item.props.style">
                    {{item.data}}
                  </div>
                </Draggable>
              </Container>
            </div>
          </div>

          <div class="column is-one-quarter" id="drag-column">
            <hr />
            <nav class="level">
              <div class="tags level-item has-text-centered">
                <span class="tag is-dark">Intercambio</span>
              </div>
            </nav>
            <nav class="level">
              <div class="level-item has-text-centered control is-small">
                <input class="input is-small" type="text" placeholder="Codigo" v-model="newBottle" id="inp-esp-envase" @focus="closeError(UNKNOWN_BOTTLE_ERROR)">
              </div>
              <p class="level-item has-text-centered control is-small">
                <a class="button is-small is-primary" @click="addNewBottle" id="butt-add-bottle">
                  <span class="is-size-7"><strong>Especificar Envase</strong></span>
                </a>
              </p>
            </nav>

            <div class="container scrollable-container">
              <Container :group-name="'1'" :get-child-payload="exchangePayload" @drop="onDrop('exchange', $event)">
                <Draggable v-for="item in exchange" :key="item.id">
                  <div :class="item.props.className" :id="item.id" :style="item.props.style">
                    {{item.data}} {{item.src}}
                  </div>
                </Draggable>
              </Container>
            </div>
            <nav class="level">
              <div class="level-item has-text-centered control is-small is-primary">
                <a class="button is-small is-warning" @click="saveMovements" id="butt-save-moves">
                  <span class="is-size-7"><strong>Grabar Movimientos</strong></span>
                </a>
              </div>
            </nav>
          </div>


          <div class="column is-one-quarter" id="drag-column">
            <hr />
            <nav class="level">
              <div class="tags has-addons level-item has-text-centered">
                <span class="tag is-dark">cliente</span>
                <span class="tag is-outlined tag-customer">
                  {{ personChosen.nombre || '_____' }}
                </span>
              </div>
            </nav>
            <nav class="level">
              <div class="tags has-addons level-item has-text-centered">
                <span class="tag is-invisible">dummy</span>
              </div>
            </nav>
            <div class="container scrollable-container">
              <Container :group-name="'1'" :get-child-payload="customerPayload" :should-accept-drop="shouldAcceptCustomer" @drop="onDrop('customer', $event)">
                <Draggable v-for="item in customer" :key="item.id">
                  <div :class="item.props.className" :id="item.id" :style="item.props.style">
                    {{item.data}}
                  </div>
                </Draggable>
              </Container>
            </div>
            <div class="trashBin">
              <nav class="level">
                <div class="level-item has-text-centered">
                  <Container :group-name="'1'" :should-accept-drop="shouldTrash" @drop="onDrop('trash', $event)">
                    <Draggable class="icon is-invisible">
                      <i class="far fa-trash-alt"></i>
                    </Draggable>
                    <Draggable class="icon">
                      <i class="far fa-trash-alt"></i>
                    </Draggable>
                  </Container>
                </div>
              </nav>

            </div>
          </div>
<!--
          <div class="column is-one-quarter">
            <nav class="level">
              <div class="tags has-addons level-item has-text-centered">
                <span class="tag is-dark">cliente</span>
                <span class="tag is-outlined tag-customer">
                  {{ personChosen.nombre || '_____' }}
                </span>
              </div>
            </nav>
            <nav class="level">
              <div class="tags has-addons level-item has-text-centered">
                <span class="tag is-invisible">dummy</span>
              </div>
            </nav>
          </div>
 -->
        </div>
<!--
          <p v-for="bottle in bottles" class="control is-small">
            <a class="button is-small" @click="dropBottle(bottle)">{{ bottle }}</a>
          </p>
          <p v-if="bottles[0] !== this.PLACEMARKER" class="control is-small">
            <a class="button is-small is-danger" @click="dropBottles">
              <strong>Vaciar Lista</strong>
            </a>
          </p>
 -->

        <div class="card-image">
          <div v-for="error in errors" class="alert alert-danger" role="alert">
            <b-notification type="is-danger">
              {{ error }}
            </b-notification>
           </div>
            <b-collapse :open="true" ref="collapseCamera">
              <!-- <Component :is="selectedDemo" @error="openError" @success="clearErrors" /> -->
            </b-collapse>

        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
        <p>currentUser: {{ currentUser.id }} Bottles: {{ currentUser.bottles.length }} </p>
        <p>personChosen: {{ personChosen.id }} Bottles: {{ personChosen.bottles.length }} </p>
      </div>
    </div>
  </div>
</template>

<script>

  import { Container, Draggable } from 'vue-smooth-dnd';
  import { applyDrag } from '@/utils/dragAndDrop';

  import { mapGetters, mapActions, mapState } from 'vuex'; // eslint-disable-line no-unused-vars
  import qrDecode from '@/utils/qrcodes/Decoder';
  import AutoComplete from '@/components/MultiUse/AutoComplete';

  // import TheValidateDemo from '@/utils/qrcodes/TheValidateDemo';

  // import Person from './Person';
  // import ChosenPerson from './ChosenPerson';
  // import { NONECHOSENFLAG } from './index';

  const LG = console.log; // eslint-disable-line no-unused-vars, no-console
  const LGERR = console.error; // eslint-disable-line no-console, no-unused-vars

  const loader = (theComponent) => {
    const vm = theComponent;
    LG(`
      uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu`);
    const seekCodigo = new RegExp('^.*', 'gi');

    vm.liveFeedStatus = 'finding';
    LG(`Searching with: ${seekCodigo}`);
    return vm.$pouch.liveFind({
      selector: {
        // _id: { $regex: new RegExp('bottle_.*', 'gi') },
        'data.type': 'person',
        'data.nombre': { $regex: seekCodigo },
        // ent: { $gt: 0 },
      },
      sort: ['data.type', 'data.nombre'],
      // aggregate: true,
    })

      // Called every time there is an update to the query
      .on('update', (upDate, aggregate) => { // eslint-disable-line no-unused-vars
        // update.action is 'ADD', 'UPDATE', or 'REMOVE'
        // update also contains id, rev, and doc
        // aggregate is an array of docs containing the latest state of the query
        const update = upDate;
        // LG(`######### Updating. ${update.id} ${update.doc}`);
        // LG(update.doc);
        vm.getItems(update);
        // if (update.doc.data.ultimo === 0) {
        //   vm.getItems(update);
        // } else {
        //   // LG(`######### Updated. ${update.id} ${update.doc.data.codigo}`);
        //   vm.$pouch.rel.find('aPerson', update.doc.data.ultimo).then((rslt) => {
        //     LG(`rslt for ${update.doc.data.ultimo} --`);
        //     LG(rslt);
        //     LG(rslt.allPersons);
        //     LG(rslt.allPersons[0].nombre);
        //     update.doc.data.ultimo =
        //       (rslt.allPersons[0] && rslt.allPersons[0].nombre) || update.doc.data.ultimo;
        //     update.doc.data.extra = rslt;
        //     // LG(update.doc.data);
        //     vm.getItems(update);
        //   });
        // }
      })

      // Called when the initial query is complete
      .on('ready', () => {
        LG('###############   Initial query complete.   ##############');

        // vm.$pouch.rel.find('aPerson', 12357).then((prsn) => {
        //   LG('prsn 12357');
        //   LG(prsn);
        // });

        vm.liveFeedStatus = 'listening';
      })

      // Called when you invoke `liveFeed.cancel()`
      .on('cancelled', () => {
        LG('###############   LiveFind cancelled.   ##############');
        vm.liveFeedStatus = 'idle';
        // vm.newSearch();
      })

      // Called if there is any error
      .on('error', (err) => {
        LGERR('Oh no!', err);
      });
  };

  const items = [];
  const PLACEMARKER = 'Lista de Envases';
  //            :renderers="renderers"

  // const renderers = Object.freeze({
  //   chosen: ChosenPerson,
  //   person: Person,
  // });
  const PersonsButtonVer = {
    class: 'button is-small is-info',
    text: 'Ver Personas',
  };
  const PersonsButtonEsconder = {
    class: 'button is-small is-info is-outlined',
    text: 'Esconder Personas',
  };
  const CameraButtonVer = {
    class: 'button is-small is-info',
    text: 'Ver QR',
  };
  const CameraButtonEsconder = {
    class: 'button is-small is-info is-outlined',
    text: 'Esconder QR',
  };
  const BOTTLEPLACEHOLDER = {
    id: 99999999,
    data: `Rastrear envases aqui
    `,
    src: '',
    props: {
      className: 'card',
      style: { backgroundColor: '#fffff0', textAlign: 'center' },
    },
  };

  const UNKNOWN_BOTTLE_ERROR = 'Error: Envase desconocido!';

  const vm = {
    name: 'bottle-tasks',
    data() {
      return {
        thoseChosen: [],
        personChosen: {
          name: null,
          id: '------',
          bottles: [],
        },
        selectedDemo: 'qrDecode',
        PersonsButton: PersonsButtonEsconder,
        CameraButton: CameraButtonEsconder,
        // autocompleteDirty: false,
        // autocompleteIdx: -1,
        personPicker: {
          list: [],
          data(picked) {
            // vm.autocompleteIdx = picked.pos;
            return { label: `[${picked.pos}] ${picked.label}`, value: picked.pos };
            // return `[${picked.pos}] ${picked.label}`;
          },
        },
        items,
        inwardOutward: 'Recibir de',
        newBottle: '',
        PLACEMARKER,
        UNKNOWN_BOTTLE_ERROR,
        bottles: [PLACEMARKER],
        errors: [],
        currentUser: {
          id: null,
          bottles: [],
        },

        inventory: [],
        customer: [],
        exchange: [BOTTLEPLACEHOLDER],
        trash: [BOTTLEPLACEHOLDER],

        // inventory: [{ id: 100001, data: 'IBAA001' }, { id: 100005, data: 'IBAA005' }],
        // customer: [{ id: 100014, data: 'IBAA014' }, { id: 100015, data: 'CLAA015' }],
        // exchange: [{ id: 99999999, data: 'Rastrear envases aqui' }],
      };
    },
    methods: {
      personPicked() {
        /* eslint-disable no-underscore-dangle */
        this.$nextTick(() => {
          LG('%%%%%%%%%%%%%%%% person picked %%%%%%%%%%%%%%%%%% ');
          // LG(this.$refs.prsnPckr.$children[0]);
          // const itemIndex = this.$refs.prsnPckr.$el.value;
          // const valueShown = this.$refs.prsnPckr.$el.value;
          // const itemIndex = valueShown.split(']')[0].split('[')[1] - 1;
          // this.autocompleteDirty = true;
          const itemIndex = Object.assign({}, this.$refs.prsnPckr.$el)._value - 1;
          LG(this.items[itemIndex].data.nombre);
          this.$refs.prsnPckr.$el.value = this.items[itemIndex].data.nombre;
          this.picked({ itemIndex });
        });
        /* eslint-enable no-underscore-dangle */
      },
      // clearAutoComplete() {
      //   this.autocompleteDirty = false;
      //   this.$refs.prsnPckr.$el.value = '';
      // },
      addNewBottle() {
        LG('%%%%%%%%%%%%%%%% add new bottle %%%%%%%%%%%%%%%%%% ');
        const codeBottle = this.newBottle.toUpperCase();
        LG(this.inventory);
        LG(this.customer);
        LG(this.exchange);
        this.$pouch.find({
          selector: {
            'data.type': 'bottle',
            'data.codigo': codeBottle,
          },
          // fields: ['data.id', 'data.codigo'],
        }).then((recs) => {
          if (recs.docs.length < 1) {
            this.openError(UNKNOWN_BOTTLE_ERROR);
            return;
          }
          const bottleInInventory = this.inventory.filter(env => env.data === codeBottle);
          const bottleInCustomer = this.customer.filter(env => env.data === codeBottle);
          let [bottle] = recs.docs;
          if (bottleInInventory.length > 0) {
            [bottle] = bottleInInventory;
            LG(`move from inventory ${JSON.stringify(bottleInInventory, null, 2)}`);
            this.inventory = this.inventory.filter(btl => btl !== bottleInInventory[0]);
          } else if (bottleInCustomer.length > 0) {
            [bottle] = bottleInCustomer;
            LG(`move from customer ${JSON.stringify(bottleInCustomer, null, 2)}`);
            this.customer = this.customer.filter(btl => btl !== bottleInCustomer[0]);
          } else {
            LG(`add to exchange ${JSON.stringify(bottle, null, 2)}`);
            bottle = {
              id: bottle.data.id,
              data: bottle.data.codigo,
              src: 'Q',
              props: {
                className: 'draggable-item draggable-exchange ',
                style: { backgroundColor: '#dfd8f3', textAlign: 'center' },
              },
            };
          }
          this.exchange.push(bottle);
          this.exchange = this.exchange.filter(itm => itm.id !== 99999999);
        }).catch((err) => {
          this.openError(`Error: Búsqueda fallida! (${err})`);
        });
        // this.$store.state.dbmgr.dbMgr.allDocs({
        //   include_docs: true,
        //   attachments: true,
        // }).then((recs) => {
        //   LG(recs);
        // });
        if (this.bottles[0] === this.PLACEMARKER) {
          this.bottles.splice(0, 1, codeBottle);
        } else {
          this.bottles.push(codeBottle);
        }
      },
      saveMovements() {
        LG('%%%%%%%%%%%%%%%% save movements %%%%%%%%%%%%%%%%%% ');
      },
      dropBottle(aBottle) {
        this.bottles.splice(this.bottles.indexOf(aBottle), 1);
      },
      dropBottles() {
        this.bottles = [this.PLACEMARKER];
      },
      openShutPersons(change) {
        const { isOpen } = this.$refs.collapsePersons;
        this.$refs.personsButton.blur();
        switch (change) {
          case 'open':
            if (isOpen) {
              this.PersonsButton = PersonsButtonEsconder;
              return;
            }
            break;
          case 'shut':
            if (!isOpen) {
              this.PersonsButton = PersonsButtonVer;
              return;
            }
            break;
          default:
        }
        // this.PersonsButton = `fas fa-angle-double-${isOpen ? 'down' : 'left'}`;
        this.PersonsButton = isOpen ? PersonsButtonVer : PersonsButtonEsconder;
        this.$refs.collapsePersons.toggle();
      },
      openShutCamera(change) {
        const { isOpen } = this.$refs.collapseCamera;
        this.$refs.CameraButton.blur();
        switch (change) {
          case 'open':
            if (isOpen) {
              this.CameraButton = CameraButtonEsconder;
              return;
            }
            break;
          case 'shut':
            if (!isOpen) {
              this.CameraButton = CameraButtonVer;
              return;
            }
            break;
          default:
        }
        // this.CameraButton = `fas fa-angle-double-${isOpen ? 'down' : 'left'}`;
        this.CameraButton = isOpen ? CameraButtonVer : CameraButtonEsconder;
        this.$refs.collapseCamera.toggle();
      },
      onDrop(collection, dropResult) {
        this[collection] = applyDrag(this[collection], dropResult);

        if (collection === 'exchange') {
          LG('onDrop');
          if (this.exchange.length > 1) {
            this.exchange = this.exchange.filter(itm => itm.id !== 99999999);
          } else if (this.exchange.length < 1) {
            this.exchange.push(BOTTLEPLACEHOLDER);
          }
          LG(dropResult);
        }
      },
      inventoryPayload(index) {
        return this.inventory[index];
      },
      exchangePayload(index) {
        return this.exchange[index];
      },
      customerPayload(index) {
        return this.customer[index];
      },
      trashPayload(index) {
        return this.trash[index];
      },
      shouldAcceptCustomer(sourceContainerOptions, payload) {
        LG('shouldAcceptCustomer');
        LG(payload);
        if (payload.src === 'C') return true;
        return false;
      },
      shouldAcceptInventory(sourceContainerOptions, payload) {
        LG('shouldAcceptInventory');
        LG(payload);
        if (payload.src === 'I') return true;
        return false;
      },
      shouldTrash(sourceContainerOptions, payload) {
        LG('shouldTrash');
        LG(payload);
        if (payload.src === 'Q') return true;
        return false;
      },
      picked(val) {
        LG(`picked ${JSON.stringify(val, null, 2)}`);
        LG(val);
        // LG(this.items[val.itemIndex].data.nombre);
        // LG(this.items[val.itemIndex].type);
        if (this.personChosen.nombre === this.items[val.itemIndex].data.nombre) {
          this.personChosen.nombre = null;
          this.items[val.itemIndex].type = 'person';
          this.thoseChosen = [];
          this.openShutPersons('open');
        } else {
          this.thoseChosen.forEach((idx) => {
            LG(idx);
            this.items[idx].type = 'person';
          });
          this.thoseChosen.push(val.itemIndex);
          this.items[val.itemIndex].type = 'chosen';
          this.personChosen = this.items[val.itemIndex].data;
          this.$refs.prsnPckr.$el.value = this.personChosen.nombre;
          this.$pouch.rel.find('aPerson', parseInt(this.personChosen.id, 10)).then((persons) => {
            LG(`
              !!!!!!!!!!!!!!!!  [ picked ]  !!!!!!!!!!!!!!!!!!
              ${JSON.stringify(this.personChosen, null, 2)}
              `);
            LG(persons);
            if (persons.allBottles) {
              this.personChosen.bottles = persons.allBottles;
              this.customer = this.personChosen.bottles
                .map(bottle => ({
                  id: bottle.id,
                  data: bottle.codigo,
                  src: 'C',
                  props: {
                    className: 'draggable-item draggable-customer ',
                    style: { backgroundColor: '#f0fff0', textAlign: 'center' },
                  },
                }));
              LG(this.personChosen);
            }
          });

          // this.customer = this.currentUser.bottles
          //   .map(bottle => ({ id: bottle.id, data: bottle.codigo }));

          this.$refs.collapsePersons.toggle();
          this.openShutPersons('shut');
        }
      },

      getItems(pouchData) {
        // LG('###############   getPersons   ##############');
        // LG(pouchData);

        let idx = null;
        /* eslint-disable no-underscore-dangle */
        switch (pouchData.action) {
          case 'REMOVE':
            LG('###############   LiveFind remove not implemented   ##############');
            break;
          case 'UPDATE':
            idx = this.items.findIndex(elem => elem._id === pouchData.id);
            // LG('###############   LiveFind update   ##############');
            // LG(this.items[idx]);
            this.items[idx] = { type: 'person', data: pouchData.doc.data };
            this.items = this.items.slice().sort();
            this.personPicker.list = this.items.map((item) => {
              LG('MAPPED');
              LG(item);
              return {
                value: 'aaa',
                label: 'XXX',
              };
            });

            break;
          default:
            this.items.push({ type: 'person', data: pouchData.doc.data });
            this.personPicker.list.push({
              pos: this.personPicker.list.length + 1,
              value: pouchData.doc.data.codigo,
              label: pouchData.doc.data.nombre,
            });
        }
        /* eslint-enable no-underscore-dangle */
      },

      openError(error) {
        this.errors.push(error);
      },

      closeError(error) {
        const index = this.errors.indexOf(error);
        this.errors.splice(index, 1);
      },

      clearErrors() {
        this.errors = [];
      },
    },

    created() {
      this.liveFeed = loader(this);
    },

    mounted() {
      LG(`
        !!!!!!!!!!!!!!!! mounted !!!!!!!!!!!!!!!!!!`);
      this.currentUser.id = parseInt(this.$store.state.dbmgr.user.name, 10);
      LG(this.currentUser);
      this.$pouch.rel.find('aPerson', this.currentUser.id).then((persons) => {
        LG(`
          !!!!!!!!!!!!!!!! mounted !!!!!!!!!!!!!!!!!!
          `);
        LG(persons);
        LG(persons.allPersons);
        LG(persons.allPersons.length);
        if (persons.allPersons && persons.allPersons.length > 0) {
          this.currentUser.bottles = persons.allBottles;
          this.currentUser.nombre = persons.allPersons[0].nombre;
          this.inventory = this.currentUser.bottles
            .map(bottle => ({
              id: bottle.id,
              data: bottle.codigo,
              src: 'I',
              props: {
                className: 'draggable-item draggable-inventory ',
                style: { backgroundColor: '#c0ebfd', textAlign: 'center' },
              },
            }));
          LG(this.currentUser);
        }
      });
      // this.$pouch.rel.find('aPerson', this.currentUser.id).then((persons) => {
      //   LG(`
      //     !!!!!!!!!!!!!!!! mounted !!!!!!!!!!!!!!!!!!
      //     `);
      //   LG(persons[0]);
      // });
    },

    components: {
      Container,
      Draggable,
      qrDecode,
      'autocomplete-input': AutoComplete,
      // TheValidateDemo,
    },

    watch: {
      selectedDemo: 'clearErrors',
    },

    computed: {
      draggableItemStyle(elem, val) {
        LG(`
          !!!!!!!!!!!!!!!! draggableItemStyle !!!!!!!!!!!!!!!!!!
          `);
        LG(elem);
        LG(val);
        return 'draggable-item draggable-customer';
      },
      // ...mapGetters('dbmgr', {
      //   user: 'getUserCredentials',
      // }),

      // personsId() {
      //   LG('||  %%%%%%%%%%%%%%%% personsId %%%%%%%%%%%%%%%%%% || ');
      //   LG(items);
      //   const list = [];
      //   items.forEach((item, idx) => {
      //     list.push({ pos: idx, value: item.data.codigo, label: item.data.nombre });
      //   });
      //   const ret = {
      //     list,
      //     data(text) {
      //       LG('%%%%%%%%%%%%%%%% we have picked someone %%%%%%%%%%%%%%%%%% ');
      //       LG(text);
      //       // return `(${text.value}) ${text.label}`;
      //       return `[${text.pos}] ${text.label}`;
      //     },
      //   };
      //   LG(ret);
      //   return ret;
      // },

      // personsId() {
      //   LG('%%%%%%%%%%%%%%%% personsId %%%%%%%%%%%%%%%%%% ');
      //   LG(this.$pouch);
      //   const ret = [];
      //   this.$pouch.liveFind({
      //     selector: { 'data.type': 'person' },
      //     // sort: [{data.type: 'desc'}, {data.nombre: 'desc'}],
      //     aggregate: true,
      //   })
      //     // Called every time there is an update to the query
      //     .on('update', (update, aggregate) => {
      //       // update.action is 'ADD', 'UPDATE', or 'REMOVE'
      //       // update also contains id, rev, and doc
      //       LG('update.action, update.id');
      //       LG(update.action, update.id);
      //       LG('aggregate');
      //       LG(aggregate);
      //       // aggregate is an array of docs containing the latest state of the query
      //       // refreshUI(aggregate);
      //       // (refreshUI would be a function you write to pipe the
      //       //    changes to your rendering engine)
      //     })

      //     // Called when the initial query is complete
      //     .on('ready', () => {
      //       LG('Livefind query complete.');
      //     })

      //     // Called when you invoke `liveFeed.cancel()`
      //     .on('cancelled', () => {
      //       LG('LiveFind cancelled.');
      //     })

      //     // Called if there is any error
      //     .on('error', (err) => {
      //       LGERR('LiveFind ERROR!', err);
      //     });

      //   // const ret = [];
      //   // const prsns = this.persons;
      //   // if (prsns) {
      //   //   LG('prsns');
      //   //   Object.keys(prsns).forEach((value) => {
      //   //     const person = prsns[value];
      //   //     ret.push({
      //   //       // name: person.nombre,
      //   //       value: person.codigo,
      //   //       // id: person.codigo,
      //   //       label: `${person.nombre}`,
      //   //     });
      //   //   });
      //   // }
      //   LG(ret);
      //   return {
      //     list: [{ value: 12, label: 'abc' }, { value: 112, label: 'ABcqq' }],
      //     data(text) {
      //       return `(${text.value}) ${text.label}`;
      //     },
      //   };
      // },
    },

  };

export default vm;

</script>

<style>
  input[type=text] {
    border: 1px solid;
    border-radius: 4px;
    width: 80px;
  }
  div.card-edge {
    margin: 10px;
  }
  #control-button {
    margin-left: 3px;
    margin-right: 3px;
  }
  #grouped-field {
    padding-left: 10px;
  }

  #person-picker {
    width: 100%;
  }

  #scrollable-content {
    height: 200px;
    overflow: auto;
    border: 1px inset;
    border-color: #9cdffc;
  }

  #drag-column {
    /*border-radius: 4px;*/
    margin-left: 30px;
    margin-right: 20px;
    padding: 10px;
  }

  #butt-save-moves {
    margin-top: 5px;
  }

  #inp-esp-envase {
    width: 80px;
  }

  #butt-add-bottle {
    margin-left: 10px;
  }

  span.tag-customer {
    background-color: #f0fff0
  }

  span.tag-inventory {
    background-color: #c0ebfd
  }

  div.scrollable-container {
    height: 300px;
    width: 90%;
    overflow: auto;
    border: 1px inset;
    border-color: #9cdffc;
  }

  div.draggable-item {
    margin: 2px;
    padding-left: 5px;
  }

  div.draggable-customer {
    border: 1px solid #ccffcc;
  }

  div.draggable-inventory {
    border: 1px solid #7bb8f7;
  }

  div.draggable-exchange {
    border: 1px solid #7b5fcb;
    margin-top: 5px;
  }

  div.trashBin {
    border: 1px inset #7b5fcb;
    margin-top: 5px;
    margin-left: 15px;
    margin-right: 15px;
    /*padding: 10px;*/
  }

  span.italic { font-style: italic; }


</style>
