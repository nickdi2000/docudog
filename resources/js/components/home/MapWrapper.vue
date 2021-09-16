<template>
  <v-container fluid class="no-margins">
    <v-tabs v-model="tab"
            fill-height
            centered
            dark
            icons-and-text
            style="height:100%;"
            class="px-0 mx-0">
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-add">
        Add
        <v-icon>mdi-plus</v-icon>
      </v-tab>

      <v-tab href="#tab-list">
        Dogs
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-tab>


      <v-tab href="#tab-map">
        Map
        <v-icon>mdi-map</v-icon>
      </v-tab>


    </v-tabs>

    <v-tabs-items v-model="tab" fill-height>

      <v-tab-item value="tab-add">
        <v-card flat>
          <AddDog :locations="locations"
                @get-locations="getLocations()" />
        </v-card>
      </v-tab-item>

      <v-tab-item value="tab-list">
        <v-card flat>
          <List :locations="locations"
                :isAdmin="isAdmin"
                @get-locations="getLocations()" />
        </v-card>
      </v-tab-item>

      <v-tab-item value="tab-map" v-if="locations">
        <v-card flat >
          <gMap

					:markers="locations"
					:isAdmin="isAdmin"
					 @get-locations="getLocations()" />
        </v-card>
      </v-tab-item>

    </v-tabs-items>


  </v-container>

</template>

<script>

  import axios from 'axios'
  import gMap from './Map'
  import AddDog from './AddDog'
  import List from './List'

  export default {
    components: {
      gMap,
      List,
      AddDog
    },
    data() {
      return {
        tab: null,
        locations: [],
        isAdmin: false
      }
    },
    methods: {
      getLocations() {
        axios.get('/api/location').then(res => {
          this.locations = res.data
        })
      }
    },
    mounted() {
      this.getLocations()
      this.isAdmin = this.$route.meta.admin ? true : false
    }
  }

</script>
