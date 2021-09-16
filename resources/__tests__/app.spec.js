import { shallowMount } from '@vue/test-utils'
import 'regenerator-runtime/runtime'
import List from '../js/components/home/List.vue'


describe('Show Banner based on report count', () => {
	it('high count', () => {

	  const locations = ['1', '2', '3']
	    const wrapper = shallowMount(List, {
	      propsData: { locations }
	    })

	  expect(wrapper.find('.high-alert').exists()).toBe(true)

	})

	it('low count', () => {

	  const locations = ['1', '2']
	    const wrapper = shallowMount(List, {
	      propsData: { locations }
	    })

	  expect(wrapper.find('.high-alert').exists()).toBe(false)

	})

});
