<template>
  <div class="componentContainer" >
    <h3>事件</h3>
    <div>
      <div>
        EnterCell & LeaveCell
      </div>
    </div>
    <div class="spreadContainer" >
      <gc-spread-sheets
        :hostClass='"spreadHost"'
        @workbookInitialized='spreadInitHandle($event)'
		@enterCell="enterCell"
		@leaveCell="leaveCell"
		>
      </gc-spread-sheets>
    </div>
  </div>
</template>

<script>
import GC from '@grapecity/spread-sheets'

export default {
  name: 'Events',
  data () {
    return {
      spread: {}
    }
  },
  methods: {
    spreadInitHandle: function (spread) {
      this.spread = spread
    },
	async enterCell (s,args){
		console.log(s);
		console.log(args);
		
	},
	async leaveCell (s,args){
		console.log(s);
		console.log(args);
	}
  }
}
</script>

<style scoped>
  .componentContainer {
    position: absolute;
    padding: 10px;
    left: 242px;
    top: 0;
    bottom: 20px;
    right: 0;
  }
  .spreadContainer {
    padding: 10px;
    box-shadow: 0 0 20px grey;
  }
  .spreadContainer{
    position: absolute;
    left: 0px;
    right: 30px;
    top: 100px;
    bottom: 10px;
  }
  .spreadHost{
    width: 100%;
    height: 100%;
  }
</style>
