<template>
	<v-content v-if="location">
		<h3>{{ location.name}} </h3>
    <small>{{ location.formatted_address }}</small><br/>
    <v-alert v-if="location.comments"><i>"{{ location.comments }}"</i></v-alert>
	</v-content>
</template>

<script>

export default {
  name: 'formatted-location',
  props: ['location'],
}
</script>
