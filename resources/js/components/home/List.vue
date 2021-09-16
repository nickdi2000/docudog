<template>

  <v-container fluid class="w-100 my-0" >
		<v-alert v-if="showWarning()" class="high-alert" color="error">Too many dogs are lost</v-alert>

    <v-card v-for="(loc, index) in locations"
            class="mx-auto my-2 "
            outlined
            :key="index">
        <v-alert
                 class="transition-fast-in-fast-out v-card--reveal mx-2 px-2 my-2 py-2"
                 color="primary"
                 border="left"
                 elevation="2"
                 colored-border
                 icon="mdi-dog">
          <div>
            <i><b>{{loc.name}}</b></small><br/> {{ loc.formatted_address }}</i> <br/>
            <p>Breed: {{loc.breed }}</p>
            <p>Comments: {{ loc.comments }} </p>
            <a :href="loc.url">Get Directions</a>
          </div>

          <div class="d-flex flex-row-reverse">
            <v-btn color="error" small outlined @click="destroy(loc.id)">
              <v-icon left>delete</v-icon>
              Delete</v-btn>
          </div>

        </v-alert>


    </v-card>
  </v-container>

</template>

<script>
import axios from 'axios'

  export default {
    props: ['locations'],
    data() {
      return {
				items: this.locations
      }
    },
    methods: {
			destroy(id){
				axios.delete("/api/location/" + id)
					.then(res =>{
						this.$toast('Lost Dog Report Deleted');
						this.$emit('get-locations');
					});
			},
			showWarning(){
				// console.log(this.items.length);
				return this.items.length > 2 ? true : false;
			}
    }
  }

</script>
