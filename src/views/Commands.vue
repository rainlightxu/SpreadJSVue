<template>
  <div class="componentContainer" >
    <h3>命令</h3>
    <div>
      <div>
		<input type="button" @click="fonts" value="字体">
        <input type="button" @click="color" value="背景色">
        <input type="button" @click="undo" value="撤销">
        <input type="button" @click="redo" value="重做">
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
import GC from '@grapecity/spread-sheets'
export default {
  name: 'Commands',
  data () {
    return {
      spread: {}
    }
  },
  methods: {
    spreadInitHandle: function (spread) {
      this.spread = spread
	  spread.commandManager().register("fonts",
		{
			canUndo: true,
			execute: function (context, options, isUndo) {
				var Commands = GC.Spread.Sheets.Commands;
				// 在此加cmd名称
				options.cmd = "fonts";
				if (isUndo) {
					// isUndo 为true时，调用undoTransaction
					Commands.undoTransaction(context, options);
					return true;
				} else {
					// 开始事务
					Commands.startTransaction(context, options);
					var sheet = options.sheet;
					var ranges = options.ranges;
					if (ranges.length > 0) {
						for(let i=0; i<ranges.length; i++){
							var range = ranges[i];
							var cell = sheet.getRange(range.row, range.col, range.rowCount, range.colCount);
							cell.font("normal bold 15px 微软雅黑");
						}
					}
					// 结束事务
					Commands.endTransaction(context, options);
					return true;
				}
			}
		});
	  spread.commandManager().register("color",
		{
			canUndo: true,
			execute: function (context, options, isUndo) {
				var Commands = GC.Spread.Sheets.Commands;
				// 在此加cmd名称
				options.cmd = "color";
				if (isUndo) {
					// isUndo 为true时，调用undoTransaction
					Commands.undoTransaction(context, options);
					return true;
				} else {
					// 开始事务
					Commands.startTransaction(context, options);
					var sheet = options.sheet;
					var ranges = options.ranges;
					if (ranges.length > 0) {
						for(let i=0; i<ranges.length; i++){
							var range = ranges[i];
							var cell = sheet.getRange(range.row, range.col, range.rowCount, range.colCount);
							cell.backColor("red");
						}
					}
					// 结束事务
					Commands.endTransaction(context, options);
					return true;
				}
			}
		});
    },
    fonts () {
	  var spread = this.spread;
	  var sheet = spread.getActiveSheet();
      spread.commandManager().execute({
			cmd: "fonts",
			sheetName: sheet.name(),
			sheet: sheet,
			ranges: sheet.getSelections()
		});
    },
	color () {
	  var spread = this.spread;
	  var sheet = spread.getActiveSheet();
      spread.commandManager().execute({
			cmd: "color",
			sheetName: sheet.name(),
			sheet: sheet,
			ranges: sheet.getSelections()
		});
    },
	undo () {
		var undoManager = this.spread.undoManager();
		undoManager.undo();
    },
	redo () {
		var undoManager = this.spread.undoManager();
		undoManager.redo();
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
