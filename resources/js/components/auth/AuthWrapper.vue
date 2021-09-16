<template>
  <v-content class="m-0 p-0">
    <v-container fluid justify-center align-center class="m-0 p-0">
      <v-container fluid justify-center align-center fill-height class="m-0 p-0">
  			<transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
	  </v-container>
	  </v-content>
</template>

<script>
import Pulse from '~/components/misc/Pulse'

export default {
	components: {Pulse}
}
</script>


<style scoped>
	#logoDiv{
			width:100%;
			height: 100%;
			background: url("/images/golf-ball.png");
			background-size: cover;
	}


	.pulse{
		bottom: 15%;
		width: 10%;
		left: 45%;
	}

  h1{
    z-index: 99;
  }


</style>
