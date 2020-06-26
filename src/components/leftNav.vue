<template>
  <!-- Left Navigation -->
  <div >
      <b-navbar toggleable="lg" type="dark" variant="info" style="background-color: black !important;
        position: fixed;width: 100%;z-index: 10;">
        <b-navbar-brand href="/">Test Engine</b-navbar-brand>
      </b-navbar>
  <!--    <b-nav vertical  >
        <b-nav-item v-b-toggle.collapse-0 text="Item 3">Building Blocks</b-nav-item>
        <b-collapse id="collapse-0" class="mt-2" style="margin-left:15px;">
          <b-nav-item v-b-toggle.collapse-01 text="Item 3">&#x27A4; Operands</b-nav-item>
            <b-collapse id="collapse-01" class="mt-2" style="margin-left:15px;">
                <b-nav-item @click="$router.push('/addoperand')">&#x27A4; Add Operand</b-nav-item>
                <b-nav-item @click="$router.push('/addoperand')">&#x27A4; View Operand</b-nav-item>
            </b-collapse>    
          <b-nav-item v-b-toggle.collapse-02 text="Item 3">&#x27A4; Rules</b-nav-item>
            <b-collapse id="collapse-02" class="mt-2" style="margin-left:15px;">
                <b-nav-item @click="$router.push('rules')">&#x27A4; Add Rules</b-nav-item>
                <b-nav-item @click="$router.push('rulesdisplay')">&#x27A4; View Rules</b-nav-item>
                <b-nav-item @click="$router.push('activaterules')">&#x27A4; Set Rule Status</b-nav-item>
                <b-nav-item @click="$router.push('rulespriority')">&#x27A4; Set Rule Priority</b-nav-item>
            </b-collapse> 
           <b-nav-item v-b-toggle.collapse-03 text="Item 3">&#x27A4; Promocode</b-nav-item>
            <b-collapse id="collapse-03" class="mt-2" style="margin-left:15px;">
                <b-nav-item @click="$router.push('promocode')">&#x27A4; Add Promocode</b-nav-item>
                <b-nav-item @click="$router.push('promodisplay')">&#x27A4; View Promocode</b-nav-item>
            </b-collapse> 
        </b-collapse>
        <b-nav-item v-b-toggle.collapse-1 text="Item 3">Parking</b-nav-item>
        <b-collapse id="collapse-1" class="mt-2" style="margin-left:15px;">
          <b-nav-item v-b-toggle.collapse-10 text="Item 3">&#x27A4; Booking</b-nav-item>
            <b-collapse id="collapse-10" class="mt-2" style="margin-left:15px;">
                <b-nav-item @click="$router.push('/')">&#x27A4; Add Booking</b-nav-item> -->
             <!--   <b-nav-item @click="$router.push('#')">&#x27A4; View Booking</b-nav-item>  -->
              <!--  <b-nav-item @click="$router.push('bookingrange')">&#x27A4; Booking Range</b-nav-item>
            </b-collapse> 
        </b-collapse>
        <b-nav-item v-b-toggle.collapse-2 text="Item 3">Kitchen</b-nav-item>
        <b-collapse id="collapse-2" class="mt-2" style="margin-left:15px;">
          <b-nav-item v-b-toggle.collapse-20 text="Item 3">&#x27A4; Orders</b-nav-item>
            <b-collapse id="collapse-20" class="mt-2" style="margin-left:15px;">
                <b-nav-item @click="$router.push('#')">&#x27A4; Add Orders</b-nav-item>
                <b-nav-item @click="$router.push('#')">&#x27A4; View Order s</b-nav-item>
            </b-collapse> 
        </b-collapse>
      </b-nav>  -->
   
  <sidebar-menu
        :menu="menu"
        :collapsed="collapsed"
        :theme="selectedTheme"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick"
      />  

    </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu';
const separator = {
  template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`
}
export default {
  name: 'leftNav',
  data () {
    return {
      menu: [
        {
          title: 'Configurator',
          icon: 'fa fa-list-alt',
          href: '/configurator'
          
        },
        {
          component: separator
        },
        {
          title: 'Generator',
          icon: 'fa fa-list-alt',
          child: [
                {
                  href: '/scenario',
                  title: 'Scenario Generator'
                },
                {
                  href: '/displayscenario',
                  title: 'View Scenarios'
                },
              ]
          
        },
        {
          component: separator
        },
        {
          title: 'Run',
          icon: 'fa fa-list-alt',
          href: '/executor'
          
        },
      ],
      collapsed: false,
      themes: [
        {
          name: 'Default theme',
          input: ''
        },
        {
          name: 'White theme',
          input: 'white-theme'
        }
      ],
      selectedTheme: 'white-theme'
    }
  },
  methods: {
    onToggleCollapse (collapsed) {
     // console.log(collapsed)
      this.collapsed = collapsed
    },
    onItemClick (event, item) {
     // console.log('onItemClick')
      // console.log(event)
      // console.log(item)
    }
  },
    components: {
        SidebarMenu
    }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
@import url('https://use.fontawesome.com/releases/v5.12.0/css/all.css');

body {
 // font-family: 'Source Sans Pro', sans-serif;
 // font-size: 18px;
 // background-color: #f2f4f7;
 // color: #262626;
}
.v-sidebar-menu.vsm_expanded {
  margin-top: 57px;
  height: 93vh;
} 
.v-sidebar-menu.vsm_collapsed { 
  margin-top: 57px;
  height: 93vh;
}
.v-sidebar-menu .vsm-arrow:after {
    content: '\f105';
    font-family: 'Font Awesome 5 Free';
}

.v-sidebar-menu .collapse-btn:after {
    content: '\f337';
    font-family: 'Font Awesome 5 Free';
}
.v-sidebar-menu .vsm--link {
  font-size: 14px;
}
#tj-datetime-input {
  min-width: 176px;
    width:100%;
    height: 33px;
    padding: 3px;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
}
</style>