<template>
  <div id="app">
  <v-app>
    <!-- Navigation -->
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile ripple :to="{path: '/'}">
          <v-list-tile-action>
            <v-icon>location_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Customer Addresses</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple :to="{path: '/DoSomethingElse'}">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Customers</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- top toolbar -->
    <v-toolbar color="blue lighten-1" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Graph Excel Addin</v-toolbar-title>
    </v-toolbar>

    <!-- Main content -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
           <!-- Swapped out view -->
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    onSetColor () {
      window.Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange()
        range.format.fill.color = 'green'
        await context.sync()
      })
    }
  }

}
</script>

<style>
</style>
