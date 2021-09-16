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

      <v-tab href="#tab-map">
        Map
        <v-icon>mdi-map</v-icon>
      </v-tab>

      <v-tab href="#tab-list">
        List
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-tab>

    </v-tabs>

    <v-tabs-items v-model="tab" fill-height>
      <v-tab-item value="tab-map" v-if="locations">
        <v-card flat >
          <gMap

					:markers="locations"
					:isAdmin="isAdmin"
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

    </v-tabs-items>
		<v-container class="w-100 d-flex" fluid justify-center align-center>
			<v-btn x-small><v-icon>reply</v-icon> &nbsp; Back to Linktr.ee/2pintguys</v-btn>
		</v-container>
<!--
		<v-container class="w-100 d-flex" fluid justify-center align-center>
			<a href="https://webfly.io" style="font-size:0.8em;color:gray;">design</a>
		</v-container>
	-->

  </v-container>

</template>

<script>

  import axios from 'axios'
  import gMap from './Map'
  import List from './List'

  export default {
    components: {
      gMap,
      List
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
