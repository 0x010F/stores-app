<template>
  <div id="sidebar" :class="{ active: isActive }">
    <div class="sidebar-header">
      <img src="../../assets/logo_mkcl_w.svg" class="logo" />
    </div>

    <div class="custom-menu">
      <button
        type="button"
        id="sidebarCollapse"
        class="btn btn-primary"
        @click="toggleSideBar()"
      >
        <i class="mdi mdi-menu"></i>
        <span class="sr-only">Toggle Menu</span>
      </button>
    </div>

    <div v-bar>  
      <div class="sidebar-vbar">
        <ul>
          <!-- <template v-for="(page, i) in this.$router.options.routes">
            <li :key="i">
              <b-link :to="page.path"
                ><i class="sidebar-icon" :class="page.meta.icon"></i>
                {{ page.name }}</b-link
              >
            </li>
          </template> -->

          <li>
            <router-link to="/"><i class="mdi mdi-home-outline sidebar-icon"></i> Home</router-link>
          </li>

          <li>
            <router-link to="/acknowledgement"><i class="mdi mdi-record sidebar-icon"></i>Acknowledgement</router-link>
          </li>

          <li>
            <router-link to="/issue"><i class="mdi mdi-record sidebar-icon"></i>Issue</router-link>
          </li>
          <li>
            <router-link to="/request"><i class="mdi mdi-record sidebar-icon"></i>Request</router-link>
          </li>
          <li>
            <router-link to="/vendor"><i class="mdi mdi-record sidebar-icon"></i>Stock_req</router-link>
          </li>
          <li>
            <router-link to="/update"><i class="mdi mdi-record sidebar-icon"></i>Update</router-link>
          </li>
        </ul>
      </div>     
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data: function () {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleSideBar() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style></style>
