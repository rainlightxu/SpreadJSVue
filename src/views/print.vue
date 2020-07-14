<template>
  <div class="componentContainer" >
    <h3>打印</h3>
    <div>
      <div>
        <input type="button" @click="print" value="打印">
      </div>
    </div>
    <div class="spreadContainer" >
      <gc-spread-sheets
        :hostClass='"spreadHost"'
        @workbookInitialized='spreadInitHandle($event)'>
      </gc-spread-sheets>
    </div>
  </div>
</template>

<script>
import print from '@grapecity/spread-sheets-print'
import s from './e.json'

export default {
  name: 'print',
  data () {
    return {
      spread: {}
    }
  },
  methods: {
    spreadInitHandle: function (spread) {
      this.spread = spread
      this.spread.fromJSON(s)
    },
    print () {
      this.spread.print();
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
