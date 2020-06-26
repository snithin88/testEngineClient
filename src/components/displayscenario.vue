<template>
  <div class="container" style="max-width:100%;padding:0px;height:100%;">
   <leftNav></leftNav>  <!-- Left side Navigation -->
    <div class="row"
    style="margin-left: 280px;border-left: 18px solid #f8f9fa;">
      <div class="col-sm-10" style="padding-left: 30px;max-width: 1270px;">
        <br>
        <h4>View Scenario</h4>
        <hr>
     <!--   <alert :message=message v-if="showMessage"></alert>  -->
        <br><br>

    <b-row>
      <b-col lg="6" class="my-1">
      <!--  <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
              <template v-slot:first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>
            <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>  -->
      </b-col>

      <b-col lg="6" class="my-1">
       <!-- <b-form-group
          label="Initial sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="initialSortSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="sortDirection"
            id="initialSortSelect"
            size="sm"
            :options="['asc', 'desc', 'last']"
          ></b-form-select>
        </b-form-group>  -->
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0">
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="scenarioName">Scenario Name</b-form-checkbox>
            <b-form-checkbox value="app">App</b-form-checkbox>
            <b-form-checkbox value="os">OS</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
      <!--  <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>  -->
      </b-col>

      <b-col sm="7" md="6" class="my-1">
      <!--  <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>  -->
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template v-slot:cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template v-slot:cell(actions)="row">
    <!--    <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>  -->
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'View' }} Details
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <div style="width: 100px;float: right;">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
          style="width: 300px;"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
            style="width: 80px;"
          ></b-form-select>
        </b-form-group>
    </div>
    <div style="width: 500px;float: right;">
    <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
    </div>    
    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>

    
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';
import leftNav from './leftNav.vue';
import ClickConfirm from 'click-confirm';
import Spinner from 'vue-simple-spinner';

 export default {
    data() {
      return {
        items: [],
        fields: [
          { key: 'scenarioName', label: 'Scenario', sortable: true, sortDirection: 'desc' },
          { key: 'app', label: 'App', sortable: true, class: 'text-center' },
          { key: 'os', label: 'OS', sortable: true, class: 'text-center' },
          
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [5, 10, 15],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        flownames : '',
        fullscenarios : '',
        scenArray : [],
      }
    },
    components: {
    alert: Alert,
    leftNav: leftNav,
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      // this.totalRows = this.items.length
      //  console.log(this.totalRows);
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      viewScenarios () {
        let fullscenarios = '';
        let appName = '';
        let appNameList = '';
        let osNameList ='';
        let scenNamelist = '';
        let scn = '';
        let scenario = '';
        //let scenArray = [];
        let scenItem = {};
        let mergeitem = {};
        let finalitem = {};
        let len = '';
        let len1 = '';
        let len2 = '';
        const path = 'http://localhost:5001/viewscenarios/';
        console.log(path);
        axios.get(path)
            .then((res) => {
            this.fullscenarios = res.data;
            appNameList = Object.keys(res.data);
            console.log(appNameList);
            len = appNameList.length;
            let appName1 = '';
            for (let i=0; i<len; i++) {
                appName = this.fullscenarios[appNameList[i]];
                console.log(appName);
                osNameList = Object.keys(appName);
                console.log(osNameList);
                len1 = osNameList.length;
                for(let j=0; j<len1; j++) {
                    scn = appName[osNameList[j]].scenarios;
                    console.log(scn);
                    for(let k=0; k<scn.length; k++) {
                        scenItem = {};
                        scenario = scn[k];
                        console.log(scenario);
                        scenItem['scenarioName'] = scenario;
                        scenItem['os'] = osNameList[j];
                        scenItem['app'] = appNameList[i];
                        console.log(scenItem);
                      //  mergeitem = Object.assign(finalitem, scenItem);
                        this.items.push(scenItem);
                       // console.log(scenArray);
                    }
                }
            }
            this.totalRows = this.items.length
            console.log(this.totalRows);
            console.log(this.fullscenarios);
            console.log(this.items);
            
            })
            .catch((error) => {
            console.error(error);
            });
        },
    },
    created() {
    this.viewScenarios();
  //  this.selectFlownames();
   // this.getScreenNames();
  },
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
#tj-datetime-input {
    height: 38px;
    min-width: 176px;
}
</style>
