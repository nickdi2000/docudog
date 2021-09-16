<template>

  <v-container fluid class="w-100">

    <v-card class="pa-md-4 mx-lg-auto">

      <v-alert  border="top"
      colored-border
      type="info"
      elevation="2"
      v-if="currentDog" class="my-2 mx-2">
        <strong>You have already reported a dog:</strong><br/>
        {{ existingDog.name }}, {{ existingDog.breed}} <br/>
        {{ existingDog.comments }}

      </v-alert>


      <v-card-text v-if="showForm">

				 <v-progress-circular
					 v-if="saving"
					 indeterminate
					 color="primary"
				 ></v-progress-circular>


        <gmap-autocomplete @place_changed="initMarker"
                           tag="v-text-field"
                           outlined
                           class="form-control my-4 py-2"
                           style="width:100%;border-width:1px;border-style:solid;font-size:1.5em;%">
        </gmap-autocomplete>

        <v-text-field v-model="locationDetails.name" outlined
                      label="Dog Name (If available)" />
                    </v-text-field>
        <v-text-field v-model="locationDetails.breed" outlined
                      label="Breed" />
                    </v-text-field>

                    <v-combobox
          v-model="locationDetails.breed"
          :items="breeds"
          label="name"
          multiple
          outlined
          dense
        ></v-combobox>

        <v-textarea outlined label="Comments" v-model="locationDetails.comments"></v-textarea>


				<v-btn color="success" @click="addLocationMarker">Submit Dogs Location</v-btn>
        <v-btn @click="showForm=false">Cancel</v-btn>
      </v-card-text>

      <v-card-text v-else>
        <v-layout justify-center align-items-center class="my-auto">
          <div>
            <v-btn color="primary" block large class="py-2 mx-2" @click="showForm = true">Report a Lost Dog!</v-btn>
          </div>
        </v-layout>
        </v-card-text>


    </v-card>

  </v-container>

</template>

<script>

  import axios from 'axios'
  import FormattedLocation from '~/components/admin/shared/FormattedLocation';
  import { mapGetters } from 'vuex'

  export default {
    name: 'google-map',
    components: {FormattedLocation},
    data() {
      return {
        windowOpen: false,
        windowLocation: null,
        currentLocation: null,
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
          comments: '',
          breed: ''
        },
        showForm: false,
				saving: false,
        existingDog: {},
        breeds: [],

      }
    },
    props: ['markers'],
    computed: mapGetters({
      currentDog: 'dog/dog'
    }),
    mounted() {
      this.existingDog = JSON.parse(this.currentDog);
      axios.get('https://api.thecatapi.com/v1/breeds').then(res => { this.breeds = res.data });
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
      initMarker(loc) {
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
            this.$toast.success('Lost Dog Reported');
            this.$store.dispatch('dog/setDog', {dog: location.details});
						this.saving = false;
            this.showForm = false;
            this.locationDetails = {};

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

  }

</script>
