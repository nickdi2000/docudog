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
                           class="form-control my-4 py-2 g-auto"
                           >
        </gmap-autocomplete>

        <v-text-field v-model="locationDetails.name" outlined
                      label="Dog Name (If available)" />
                    </v-text-field>
        <v-text-field v-model="locationDetails.breed" outlined
                      label="Breed" />
                    </v-text-field>

        <v-textarea outlined label="Comments" v-model="locationDetails.comments"></v-textarea>


				<v-btn color="success" @click="addLocationMarker">Submit Dogs Location</v-btn>
        <v-btn @click="showForm=false">Cancel</v-btn>
      </v-card-text>

      <v-card-text v-if="!showForm && !currentDog">
          <v-flex fluid style="width:100%;text-align:center">
							<img src="/images/dog-icon.png" style="width:20%" align-self-center /><br/>
            	<v-btn id="reportDogBtn" color="primary" large class="py-2 mx-2" @click="showForm = true">Report a Lost Dog!</v-btn>
					</v-flex>
        </v-card-text>


    </v-card>

  </v-container>

</template>

<script>

  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    name: 'google-map',
    data() {
      return {
        locationDetails: {
          name: '',
          comments: '',
          breed: ''
        },
				existingPlace: null,
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
    created() {
      this.existingDog = JSON.parse(this.currentDog);
    },

    methods: {
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
						this.$emit('get-locations');

          });

        }
      },
      saveLocation(marker) {
        let location_ = {
          address: this.existingPlace,
          details: this.locationDetails
        }
      },
    },

  }

</script>
