<template>

  <v-container fluid class="w-100">
    <v-card style="height:100%" v-if="!admin">
      <GmapMap :center="center"
               :zoom="zoom"
               map-type-id="terrain"
               style="width: 100%; height: 600px">
        <GmapMarker :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="markerClicked(m)"
                    :icon="beerIcon" />

        <gmap-info-window
           @closeclick="closeWindow()"
           :opened="windowOpen"
           :position="windowLocation"
           >
           <formatted-location :location="currentLocation" />
       </gmap-info-window>
      </GmapMap>
    </v-card>

    <v-card v-if="isAdmin" class="pa-md-4 mx-lg-auto">

      <v-card-text v-if="admin">

				 <v-progress-circular
					 v-if="saving"
					 indeterminate
					 color="primary"
				 ></v-progress-circular>

			 <span v-else>
        <gmap-autocomplete @place_changed="initMarker"
                           tag="v-text-field"
                           outlined
                           class="form-control my-4 py-2"
                           style="width:100%;border-width:1px;border-style:solid;font-size:1.5em;%">
        </gmap-autocomplete>

        <v-text-field v-model="locationDetails.name" outlined
                      label="Name" /></v-text-field>

        <v-textarea outlined label="Comments" v-model="locationDetails.comments"></v-textarea>


				<v-btn color="success" @click="addLocationMarker">Save Location</v-btn>
        <v-btn @click="admin=false">Cancel</v-btn>
			</span>
      </v-card-text>

      <v-card-text class="d-flex m-4 p-4" v-else>
        <v-btn color="default" class="py-2 mx-2" small @click="showAdmin()">Add New Location</v-btn>
      </v-card-text>
    </v-card>

  </v-container>

</template>

<script>

  import axios from 'axios'
  import FormattedLocation from '~/components/admin/shared/FormattedLocation';

  export default {
    name: 'google-map',
    components: {FormattedLocation},
    data() {
      return {
        windowOpen: false,
        windowLocation: null,
        currentLocation: null,
				beer_icon: {},
        center: {
          lat: 43.2392954,
          lng: -79.8775022
        },
        zoom: 14,
        savedLocations: [],
        locationMarkers: [],
        locPlaces: [],
        existingPlace: null,
        locationDetails: {
          name: '',
          comments: ''
        },
        admin: false,
				saving: false,

      }
    },
    props: ['markers', 'isAdmin'],

    mounted() {
      this.locateGeoLocation();
    },

    methods: {
      markerClicked(m){
        console.log(m);
        this.windowOpen = true;
        this.windowLocation = m.position;
        this.currentLocation = m;

      },
      closeWindow(){
        this.windowOpen = false;
      },
      showAdmin() {
        if (prompt('password') == 'lint') {
          this.admin = true
          this.$toast.error('Good')
        } else {
          this.$toast.error('Wrong Pass')
        }
      },
      initMarker(loc) {
        this.locationDetails.name = loc.name
        this.existingPlace = loc
      },
      async addLocationMarker() {
				this.saving = true;
        if (this.existingPlace) {
          const marker = {
            lat: this.existingPlace.geometry.location.lat(),
            lng: this.existingPlace.geometry.location.lng()
          }

          // send to DB
          let location = {
            address: this.existingPlace,
            details: this.locationDetails,
            marker: marker
          }

          await axios.post('/api/location', location).then(res => {
            console.log(res)
            this.$toast.success('Location Added');
						this.admin = false;
						this.saving = false;

          });
					this.$emit('get-locations');
					this.center = marker


        }
      },
      saveLocation(marker) {
        let location_ = {
          address: this.existingPlace,
          details: this.locationDetails
        }
      },
      locateGeoLocation: function() {
        navigator.geolocation.getCurrentPosition(res => {
          this.center = {
            lat: res.coords.latitude,
            lng: res.coords.longitude
          }
        })
      },
    },
    computed: {
      beerIcon() {
        return {
          url: '/images/beer-clink.png', // url
          scaledSize: new google.maps.Size(50, 50), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        }
      },

    }
  }

</script>
\
