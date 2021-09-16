<template>

  <v-container fluid class="w-100 my-0">
    <v-card v-for="(loc, index) in locations"
            class="mx-auto my-2 "
            outlined
            :key="index">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h4 mb-1">
            <b>{{loc.name}}</b>
          </v-list-item-title>
          <v-list-item-subtitle>
							 <v-alert
						      border="left"
						      colored-border
						      type="success"
						      elevation="2"
						    >
								<v-icon small>mdi-format-quote-open</v-icon>	{{ loc.comments }} <v-icon small>mdi-format-quote-close</v-icon>
						    </v-alert>
					</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn text x-small
               color="primary"
               @click="revealInfo(index)">
          Restaurant Info <v-icon>vdi-menu-down</v-icon>
        </v-btn>

				<v-btn color="error" v-if="isAdmin" @click="destroy(loc.id)">DELETE</v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-alert v-if="isRevealed(index)"
                 class="transition-fast-in-fast-out v-card--reveal mx-2 px-2 my-2 py-2"
                 color="primary"
                 border="left"
                 elevation="2"
                 colored-border
                 icon="mdi-silverware">
          <div>
            <small class="text-muted"><b>{{loc.name}}</b></small><br/> {{ loc.formatted_address }} <br/>
            <a :href="loc.website">{{ loc.website }}</a><br/>
            <a :href="loc.url">Get Directions</a>
          </div>

        </v-alert>

      </v-expand-transition>

    </v-card>
  </v-container>

</template>

<script>
import axios from 'axios'

  export default {
    props: ['locations', 'isAdmin'],
    data() {
      return {
        beerAvatar: '/images/beer-clink.png',
        revealed: null,
      }
    },
    methods: {
      revealInfo(i){
        this.revealed = this.revealed ? null : i;
      },
			destroy(id){
				if(prompt('Enter password to permanently delete') != 'lint'){
					return;
				}
				axios.delete("/api/location/" + id)
					.then(res =>{
						this.$toast('Location deleted');
						this.$emit('get-locations');
					});
			},
      isRevealed(i){
        return this.revealed == i;
      }
    }
  }

</script>
