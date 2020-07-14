<template>
  <div class="componentContainer" >
    <h3>导出</h3>
    <div>
      <div>
		<input type="file" id="fileDemo" class="input">
		<input type="button" @click="loadExcel" value="导入">
        <input type="button" @click="exportXlsx" value="导出">
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
import ExcelIO from '@grapecity/spread-excelio'
import '@grapecity/spread-sheets-charts'
import FaverSaver from 'file-saver'
import s from './e.json'

export default {
  name: 'ExportXlsx',
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
    exportXlsx () {
      let ex = new ExcelIO.IO()
      let json = this.spread.toJSON()
      ex.save(json, function (blob) {
        FaverSaver.saveAs(blob, 'export.xlsx')
      }, function (e) {
        console.log(e)
      })
    },
	loadExcel () {
		let excelIo = new ExcelIO.IO()
		var excelFile = document.getElementById("fileDemo").files[0];
		var spread = this.spread;
		// here is excel IO API
		excelIo.open(excelFile, function (json) {
			var workbookObj = json;
			spread.fromJSON(workbookObj);
		}, function (e) {
			// process error
			alert(e.errorMessage);
			if (e.errorCode === 2/*noPassword*/  || e.errorCode === 3 /*invalidPassword*/) {
				// $("#password").select();
			}
		}, {password: ""});
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
