<template>
  <div class="container" style="max-width:100%;padding:0px;height:100%;">
   <leftNav></leftNav>  <!-- Left side Navigation -->
    <div class="row"
    style="margin-left: 280px;border-left: 18px solid #f8f9fa;">
      <div class="col-sm-10" style="padding-left: 30px;max-width: 1270px;">
        <br>
        <h4>Run Scenario</h4>
        <hr>
        <alert :message=message v-if="showMessage"></alert>
        <br><br>
        <!-- Add Rules Form -->
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Run a scenario" active>
              <b-card-text>

                <div class="addrules">
                  <b-form @submit="execscenario" class="w-50">

                  <div style="display: -webkit-inline-box;margin-right: 20px;
                    box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
                    padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
                    <b-form-group id="form-application-group"
                                label="Application:"
                                label-for="form-application-input"
                                style="margin-right: 20px;">
                      <b-form-select v-on:change="selectOS(application)" v-model="application"
                        id="form-application-group1" required>
                        <option value="" selected>Please Select Application</option>
                        <option v-for="(app, index) in applications" :key="index" :value=app>
                        {{app}}</option>
                      <!--  <option value="parkjockey_web">ParkJockey Web</option>
                        <option value="parkjockey_hangtag">ParkJockey Hangtag</option>
                        <option value="tile">Tile</option>
                        <option value="parkjockey_web">ParkJockey Web</option>  -->
                    </b-form-select>
                    </b-form-group>
                    <b-form-group id="form-os-group"
                                label="OS:"
                                label-for="form-os-input"
                                style="margin-right: 20px;">
                      <b-form-select v-on:change="selectAppOS()" v-model="os"
                        id="form-os-group1" required>
                      <option value="" selected>Please Select OS</option>
                      <option v-for="(os, ind) in oslist" :key="ind" :value=os>
                        {{os}}</option>
                      <!--   <option value="android">Android</option>
                        <option value="ios">IOS</option>
                      <option value="website">Website</option>  -->
                    </b-form-select>
                    </b-form-group> 
                  </div>

                    <div style="display: -webkit-inline-box;margin-right: 20px;
                    box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
                    padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
                    <b-form-group id="form-flowname-group"
                                label="Flow Name:"
                                label-for="form-flowname-input"
                                style="margin-right: 20px;">
                      <b-form-select v-model="flowname"
                        id="form-application-group1" required>
                        <option value="" :selected="true">Please select Flowname</option>
                        <option v-for="(flow, index) in flownames" :key="index" :value=flow>
                        {{flow}}</option>
                        </b-form-select>
                    </b-form-group>
                    <b-button-group style="display:-webkit-inline-box;width:700px;">
                      <b-button type="submit" variant="primary" 
                      style="width: 150px;margin-right: 30px;margin-top:30px;">Exec Scenario</b-button>
                    </b-button-group>
                    </div>
                    
                          
                    
                  </b-form>
                </div>

              </b-card-text>
            </b-tab>
            <b-tab title="Create Test path">
              <b-card-text>

                <div class="addrules">
                  <b-form @submit="execscenario" class="w-50">

                  <div style="display: -webkit-inline-box;margin-right: 20px;
                    box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
                    padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
                    <b-form-group id="form-application-group"
                                label="Application:"
                                label-for="form-application-input"
                                style="margin-right: 20px;">
                      <b-form-select v-on:change="selectOS(application)" v-model="application"
                        id="form-application-group1" required>
                        <option value="" selected>Please Select Application</option>
                        <option v-for="(app, index) in applications" :key="index" :value=app>
                        {{app}}</option>
                      <!--  <option value="parkjockey_web">ParkJockey Web</option>
                        <option value="parkjockey_hangtag">ParkJockey Hangtag</option>
                        <option value="tile">Tile</option>
                        <option value="parkjockey_web">ParkJockey Web</option>  -->
                    </b-form-select>
                    </b-form-group>
                    <b-form-group id="form-os-group"
                                label="OS:"
                                label-for="form-os-input"
                                style="margin-right: 20px;">
                      <b-form-select v-on:change="selectAppOS()" v-model="os"
                        id="form-os-group1" required>
                      <option value="" selected>Please Select OS</option>
                      <option v-for="(os, ind) in oslist" :key="ind" :value=os>
                        {{os}}</option>
                      <!--   <option value="android">Android</option>
                        <option value="ios">IOS</option>
                      <option value="website">Website</option>  -->
                    </b-form-select>
                    </b-form-group> 
                  </div>

                    <div v-if="drag == true" id="draggScenario" style="display: -webkit-inline-box;margin-right: 20px;
                    box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
                    padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
                  <!--  <b-form-group id="form-flowname-group"
                                label="Flow Name:"
                                label-for="form-flowname-input"
                                style="margin-right: 20px;">
                      <b-form-select v-model="flowname"
                        id="form-application-group1" required>
                        <option value="" :selected="true">Please select Flowname</option>
                        <option v-for="(flow, index) in flownames" :key="index" :value=flow>
                        {{flow}}</option>
                        </b-form-select>
                    </b-form-group>  -->
                    <div class="col-3" style="margin-top: 15px;">
                      <h5>Scenario List</h5>
                      <br>
                      <draggable class="list-group" :list="flownames" group="people" @change="log">
                        <div
                          class="list-group-item"
                          v-for="(element, index) in flownames"
                          :key="index"
                          style="padding-top: 0.25rem;padding-bottom: 0.25rem;"
                        >
                          {{ index+1 }}. {{ element }}
                        </div>
                      </draggable>
                    </div>
                    <!-- Mandatory rules list  -->
                    <div class="col-3" style="margin-top: 15px;">
                      <h5>Selected Scenarios</h5>
                      <br>
                      <draggable class="list-group" :list="multipleFlownames" group="people" @change="log">
                        <div
                          class="list-group-item"
                          v-for="(element, index) in multipleFlownames"
                          :key="index"
                          style="padding-top: 0.25rem;padding-bottom: 0.25rem;"
                        >
                          {{ index+1 }}.{{ element }}
                        </div>
                        
                      </draggable>
                    </div>
                    <b-button-group style="display:-webkit-inline-box;width:700px;">
                      <b-button type="submit" variant="primary" 
                      style="width: 150px;margin-right: 30px;margin-top:30px;">Exec Scenario</b-button>
                    </b-button-group>
                    </div>
                    
                          
                    
                  </b-form>
                </div> 

              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
      

      <div  id="htmlresponse" style="margin-right: 20px; display:none;
        box-shadow: rgba(108, 117, 125, 0) 0px 0px 0px 5px inset;width:1200px;
        padding: 30px 10px 30px 30px;min-height: 30px;margin-bottom: 30px;background-color:#94989624;">
      </div>
      <div id="downloadresponse" style="display:none;padding-bottom:30px;"></div>

      <div v-if="loading">
            <vue-simple-spinner size="88" line-size="12"></vue-simple-spinner>
      </div>


    </div>
    
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';
import leftNav from './leftNav.vue';
import ClickConfirm from 'click-confirm';
import Spinner from 'vue-simple-spinner';
import draggable from 'vuedraggable';

export default {
  data: () => ({
    addScenarioForm : [
      {
      scenarioname: '',
      enabled: '',
      description: '',
      testcaseid: '',
      },
    ],
    addStepForm: [
      {
        screenname: '',
        name: '',
        action: '',
        value: '',
        condition: '',
        value1: '',
        value2: '',
        expectstring: '',
        conditionexec: '',
        skipflag: '',
      },  
    ],
    application: '',
    os: '',
    flowname: '',
    message: '',
    showMessage: false,
    count: 0,
    maincount: 0,
    submitCount: 0,
    scenarioCount: 0,
    stepSaveArray : {},
    finalarraydata: {},
    flowarray: {},
    flowarray1: {},
    arrayA: {},
    arrayB: {},
    arrayC: {},
    arrayD: {},
    arrayE: {},
    scnamesArray: {},
    scnames: [],
    names1: [],
    values: [],
    actionlist: [],
    viewSceArray: '',
    viewStepArray: '',
    app: '',
    osname: '',
    flownames: '',
    multipleFlownames: [],
    loading: false,
    applications: {},
    oslist: {},
    drag: false,
  }),
  name: "priority",
  display: "Priority",
  order: 1,
  components: {
    alert: Alert,
    leftNav: leftNav,
    clickConfirm: ClickConfirm,
    'vue-simple-spinner': Spinner,
    draggable,
  },
  methods: {
    selectFlownames () {
      const path = `http://localhost:5001/listscenarios/?app=${this.application}&os=${this.os}`;
      console.log(path);
      axios.get(path)
        .then((res) => {
          this.flownames = res.data;
          console.log(this.flownames)
        })
        .catch((error) => {
          console.error(error);
        });
    },
    execscenario(evt) {
     // console.log(flowname);
      evt.preventDefault();
      let param1 = this.flowname;
      console.log(param1);
      console.log(this.multipleFlownames);
      if (Array.isArray(this.multipleFlownames) && this.multipleFlownames.length > 0) {
        param1 = this.multipleFlownames.join();
        console.log(param1);
      }
      else {
        console.log('empty array');
      }
      const path = `http://localhost:5001/execFlow/${param1}`;
      console.log(path);
      document.getElementById('htmlresponse').style.display = 'none';
      this.loading = true
      axios.get(path)
        .then((res) => {
        //  console.log(res);
          console.log(res.data.html_response);
          document.getElementById('htmlresponse').innerHTML = res.data.html_response;
          document.getElementById('htmlresponse').style.display = 'block';
          document.getElementById('downloadresponse').innerHTML = '<a href="http://localhost:5001/report">Download Report</a>';
          document.getElementById('downloadresponse').style.display = 'block';
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => (this.loading = false));
    },
    getApplication () {
      const path = 'http://localhost:5001/application';
      let applications = '';
      let appResponse = '';
      console.log('aaaa');
      axios.get(path)
        .then((res) => {
          this.appResponse = res.data;
          this.applications = Object.keys(res.data.application);
          console.log(this.applications)
        })
        .catch((error) => {
          console.error(error);
        });
    },
    selectOS (appName) {
        this.drag = false;
        this.buttonVisible = false;
        Object.keys(this.appResponse.application).forEach((key) => {
            if (key == appName) {
                this.oslist = this.appResponse.application[key];
                this.os = '';
            }
        });
    },
    selectAppOS (){
      this.selectFlownames();
      this.drag = true;
    },
    viewScenario(num, val) {
      let viewSceArray = '';
      let viewStepArray = '';
      Object.keys(this.arrayA).forEach((key) => {
        if (key == val) {
          this.viewStepArray = this.arrayA[key];
        }
      });
      Object.keys(this.arrayB).forEach((key1) => {
        if (key1 == num) {
          this.viewSceArray = this.arrayB[key1];
        }
      });
      this.$refs.viewModal.show();
    },
    // Fetch screen names
    getScreenNames (appname, osdetail) {
      let scnames = [];
      let scnamesArray = {};
      let jsonScreennameFile = appname + ".json";
      axios.get(jsonScreennameFile)
        .then((response) => {
          this.scnamesArray = response.data[appname][osdetail].screenname;
          this.scnames = Object.keys(response.data[appname][osdetail].screenname);
          this.values = Object.values(response.data[appname].value);
          this.actionlist = Object.values(response.data[appname].Action);
          console.log(this.scnames);
          console.log(this.values);
          console.log(this.actionlist);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
      });  
    },
    // Fetch names based on screen names
    getNames(namescreen, id) {
      console.log('aaa');
      let names1 = [];
      Object.keys(this.scnamesArray).forEach((key) => {
        console.log(key, namescreen);
        if (key == namescreen) {
          this.$set(this.names1, id, this.scnamesArray[key]);
          console.log(this.names1);
        }
      });
    },
    // Add more conditions
    addscenario(mcount) {
      event.preventDefault();
      console.log(mcount);
      if (mcount == 0) {
        this.maincount = mcount + 1;
      }
      if (mcount >= 1 && this.submitCount == this.maincount) {
        this.maincount = mcount + 1;
        console.log(this.maincount);
        this.addScenarioForm.push({
          scenarioname: '',
          enabled: '',
          description: '',
          testcaseid: '',
        });
      }
      
    },
    addmorerules(val) {
      event.preventDefault();
      const newval = parseInt(val, 10);
      const val1 = val + 1;
      this.addStepForm.push({
        screenname: '',
        name: '',
        action: '',
        value: '',
        condition: '',
        value1: '',
        value2: '',
        expectstring: '',
        conditionexec: '',
        skipflag: '',
      });
      this.count = val1;
    },
    // remove conditions
    removerules(val,remid) {
      event.preventDefault();
      const sub = '#remcond';
      const ifrules = '#ifrules';
      if (val === 1) {
       // document.querySelector(ifrules).style.display = 'none';
       // document.querySelector(sub).style.display = 'none';
      }
      this.addStepForm.splice(remid, 1);
      const val1 = val - 1;
      this.count = val1;
    },
    
    // Initializing rules form
    initForm() {
      this.addStepForm[0].screenname = '';
      this.addStepForm[0].name = '';
      this.addStepForm[0].action = '';
      this.addStepForm[0].value = '';
      this.addStepForm[0].condition = '';
      this.addStepForm[0].value1 = '';
      this.addStepForm[0].value2 = '';
      this.addStepForm[0].expectstring = '';
      this.addStepForm[0].conditionexec = '';
      this.addStepForm[0].skipflag = '';
    },
    submitSteps(evt) {
      evt.preventDefault();
      const steparray = this.addStepForm;
      const scenarioArray = this.addScenarioForm;
      const scenarioIndex = this.scenarioCount;
      const stepCount = steparray.length;
      console.log(steparray.length);
      let formdata = {};
      let arraydata = {};
      let newarraydata = {};
      
      for (let i = 0; i < steparray.length; i += 1) {
        let screenname1 = this.addStepForm[i].screenname;
        let name1 = this.addStepForm[i].name;
        let action1 = this.addStepForm[i].action;
        let value1 = this.addStepForm[i].value;

        formdata = {};
        let steps = i+1;
        formdata[steps] = {};
        formdata[steps]['screen_name'] = screenname1;
        formdata[steps]['name'] = name1;
        formdata[steps]['action'] = action1;
        formdata[steps]['value'] = value1;
        if (action1 == 'expect') {
          formdata[steps]['condition'] = this.addStepForm[i].condition;
          formdata[steps]['value1'] = this.addStepForm[i].value1;
          formdata[steps]['value2'] = this.addStepForm[i].value2;
          formdata[steps]['expect_string'] = this.addStepForm[i].expectstring;
        }
        if (action1 != 'expect' && this.addStepForm[i].conditionexec == 'enabled') {
          formdata[steps]['cond_exec'] = this.addStepForm[i].conditionexec;
        }
        if (action1 != 'expect' && this.addStepForm[i].skipflag == 'enabled') {
          formdata[steps]['skipflag'] = this.addStepForm[i].skipflag;
        }
        arraydata = Object.assign(arraydata, formdata);
        console.log(arraydata);
      }
      //console.log(this.addScenarioForm[scenarioIndex].scenarioname);
      arraydata['stepcount'] = stepCount;
      let scenarioname1 = this.addScenarioForm[scenarioIndex].scenarioname;
      newarraydata[scenarioname1] = arraydata;
      this.arrayA = Object.assign(this.arrayA, newarraydata);

      let flowname1 = this.flowname;
      let flowarrayIndex = this.maincount;
      let flowarrayIndex1 = flowarrayIndex - 1;
      let flowarray = {};
     // flowarray[flowname1] = {};
      flowarray[flowarrayIndex] = {};
      flowarray[flowarrayIndex]['name'] = this.addScenarioForm[flowarrayIndex1].scenarioname;
      flowarray[flowarrayIndex]['enabled'] = this.addScenarioForm[flowarrayIndex1].enabled;
      flowarray[flowarrayIndex]['desc'] = this.addScenarioForm[flowarrayIndex1].description;
      flowarray[flowarrayIndex]['testcase_id'] = this.addScenarioForm[flowarrayIndex1].testcaseid;

      this.arrayB = Object.assign(this.arrayB, flowarray);
      this.submitCount = this.submitCount + 1;
      this.scenarioCount = this.scenarioCount + 1;

      document.querySelector('#form-application-group1').disabled = true;
      document.querySelector('#form-os-group1').disabled = true;
      this.addStepForm.splice(1, stepCount);
      /*
      let j=0;
      while (j < stepCount) {
        this.addStepForm.splice(j, 1);
        console.log(stepCount);
        j=j+1;
      }
     for (let j = 1; j <= stepCount; j += 1) {
        this.addStepForm.splice(j, 1);
        console.log(stepCount);
      } */
      this.initForm();
      console.log(arraydata);
      console.log(newarraydata);
      console.log(flowarray);
      console.log(this.arrayA);
      console.log(this.arrayB);
    },
    trimSpace(a) {
      return a.split(' ').join('');
    },
    createFile() {
      let completeArray = {};
      let jsonFileName = this.trimSpace(this.flowname);
      this.arrayB['scenario_count'] = this.scenarioCount;
      this.arrayC[this.flowname] = this.arrayB;
      this.arrayD['steps'] = this.arrayA;
      this.arrayE['scenarios'] = this.arrayC;
      completeArray = Object.assign(this.arrayE, this.arrayD);
      completeArray['filename'] = jsonFileName;
     // console.log(completeArray);
      if (Object.keys(this.arrayC).length != 0 && Object.keys(this.arrayA).length !=0) {
        const path = 'http://localhost:5001/createJson';
        axios.post(path, completeArray)
          .then((resp) => {
            this.message = 'Scenario Added Successfully';
            this.showMessage = true;
            document.querySelector('#downloadLink').style.display = 'block';
            document.querySelector('#downloadLink').innerHTML = resp.data;
            window.scrollTo(0, 0);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else {
          this.message = 'Error !!!';
          this.showMessage = true;
      }     
    },
    reloadPage(){
      window.location.reload();
    },
    log: function(evt) {
      window.console.log(evt);
    },
  },
  // city and operands are listed onload
  created() {
    this.getApplication();
  //  this.selectFlownames();
   // this.getScreenNames();
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
#tj-datetime-input {
    height: 38px;
    min-width: 176px;
}
</style>
