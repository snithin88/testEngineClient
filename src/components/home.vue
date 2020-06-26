<template>
 <!--  <leftNav></leftNav>   Left side Navigation -->
   

    <div class="masthead text-white text-center">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-xl-9 mx-auto" style="margin-bottom:80px;">
          <h1 class="mb-5">Welcome to TestEngine</h1>
          <div><img src="testengine.png" alt=""></div>
        </div>


    <div>
        <b-card-group deck>
            <b-card title="Configurator" style="color:black;text-decoration: underline;">
                <br>
            <b-card-text style="color:black;">
                <p style="float:left;">&#x27A4; Configure new application (Android,IOS,Desktop)</p>
                <p style="float:left;">&#x27A4; Edit existing app configuration</p>
            </b-card-text>
            <template v-slot:footer>
                <a href="configurator">Configure</a>
            </template>
            </b-card>

            <b-card title="Generator" style="color:black;text-decoration: underline;">
                <br>
            <b-card-text style="color:black;">
                <p style="float:left;">&#x27A4; Generate test scenarios for an app</p>
                <p style="float:left;">&#x27A4; Download generated scenarios</p>
            </b-card-text>
            <template v-slot:footer>
                <a href="scenario">Generate</a>
            </template>
            </b-card>

            <b-card title="Runner" style="color:black;text-decoration: underline;">
                <br>
            <b-card-text style="color:black;">
                <p style="float:left;">&#x27A4; Execute the scenarios generated</p>
                <p style="float:left;">&#x27A4; Download Test Report</p>
            </b-card-text>
            <template v-slot:footer>
                <a href="executor">Run</a>
            </template>
            </b-card>
        </b-card-group>
    </div>


    <!--    <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
          <form>
            <div class="form-row">
              <div class="col-12 col-md-9 mb-2 mb-md-0">
                <input type="email" class="form-control form-control-lg" placeholder="Enter your email...">
              </div>
              <div class="col-12 col-md-3">
                <button type="submit" class="btn btn-block btn-lg btn-primary">Sign up!</button>
              </div>
            </div>
          </form>
        </div>  -->
      </div>
    </div>
  </div>




</template>

<script>
/*
import { BCard } from 'bootstrap-vue';

export default {
  
  components: {
    'b-card': BCard,
  }
}

*/
  //  import Vue from 'vue';
    

        // More code
    
</script>

<style scoped>
    .card-body {
        background : #dbdee0;
}
</style>