<template>
  <div class="componentContainer" >
    <h3>筛选</h3>
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
  name: 'Filter',
  data () {
    return {
      spread: {}
    }
  },
  methods: {
    spreadInitHandle: function (spread) {
		this.spread = spread;
		var spreadNS = GC.Spread.Sheets;
		let sheet = spread.getActiveSheet();
		var salesData = [
				["SalesPers", "Birth", "Region", "SaleAmt", "ComPct", "ComAmt"],
				["Joe", new Date("2000/01/23"), "North", 260, 0.1, 26],
				["Robert", new Date("1988/08/21"), "South", 660, 0.15, 99],
				["Michelle", new Date("1995/08/03"), "East", 940, 0.15, 141],
				["Erich", new Date("1994/05/23"), "West", 410, 0.12, 49.2],
				["Dafna", new Date("1992/07/21"), "North", 800, 0.15, 120],
				["Rob", new Date("1995/11/03"), "South", 900, 0.15, 135],
				["Jonason", new Date("1987/02/11"), "West", 300, 0.17, 110],
				["Enana", new Date("1997/04/01"), "West", 310, 0.16, 99.2],
				["Dania", new Date("1997/02/15"), "North", 500, 0.10, 76],
				["Robin", new Date("1991/12/28"), "East", 450, 0.18, 35]];
		sheet.suspendPaint();
		sheet.options.allowCellOverflow = true;
		sheet.name("FilterDialog");

		sheet.setArray(1, 1, salesData);
		var filter = new spreadNS.Filter.HideRowFilter(new spreadNS.Range(2, 1, salesData.length - 1, salesData[0].length));
		sheet.rowFilter(filter);
		//prepareFilterItems(sheet, salesData[0]);
		sheet.defaults.rowHeight = 28;
		sheet.setColumnWidth(1, 110);
		sheet.setColumnWidth(2, 80);
		sheet.setColumnWidth(3, 100);
		sheet.setColumnWidth(4, 80);
		sheet.setColumnWidth(5, 80);
		sheet.setColumnWidth(6, 80);
		sheet.getRange(2, 2, 10, 1).formatter("yyyy/mm/dd");

		var SpreadNS = GC.Spread.Sheets;
		var ComparisonOperators = SpreadNS.ConditionalFormatting.ComparisonOperators;
		var equalsTo = ComparisonOperators.equalsTo;

		var range = sheet.getRange(1, 1, 11, 6);
		range.setBorder(new spreadNS.LineBorder("gray", spreadNS.LineStyle.thin), {all: true});
		range.wordWrap(true);

		var ranges = [new SpreadNS.Range(2, 3, 10, 1)];
		var style1 = new SpreadNS.Style();
		style1.foreColor = "Accent 2";
		var rule1 = new SpreadNS.ConditionalFormatting.NormalConditionRule(1, ranges, style1, equalsTo, "West", "");
		sheet.conditionalFormats.addRule(rule1);
		var style2 = new SpreadNS.Style();
		style2.foreColor = "Accent 3";
		var rule2 = new SpreadNS.ConditionalFormatting.NormalConditionRule(1, ranges, style2, equalsTo, "East", "");
		sheet.conditionalFormats.addRule(rule2);
		var style3 = new SpreadNS.Style();
		style3.foreColor = "Accent 6";
		var rule3 = new SpreadNS.ConditionalFormatting.NormalConditionRule(1, ranges, style3, equalsTo, "North", "");
		sheet.conditionalFormats.addRule(rule3);
		var style4 = new SpreadNS.Style();
		style4.foreColor = "Accent 1";
		var rule4 = new SpreadNS.ConditionalFormatting.NormalConditionRule(1, ranges, style4, equalsTo, "South", "");
		sheet.conditionalFormats.addRule(rule4);

		var ranges = [new SpreadNS.Range(2, 2, 10, 1)];
		var style1 = new SpreadNS.Style();
		style1.backColor = "rgb(241, 135, 102)";
		var rule1 = new SpreadNS.ConditionalFormatting.NormalConditionRule(1, ranges, style1, ComparisonOperators.lessThan, "1990/01/01", "");
		sheet.conditionalFormats.addRule(rule1);
		var style2 = new SpreadNS.Style();
		style2.backColor = "lightGreen";
		var rule2 = new SpreadNS.ConditionalFormatting.NormalConditionRule(1, ranges, style2, ComparisonOperators.between, "1990/01/01", "2000/01/01");
		sheet.conditionalFormats.addRule(rule2);
		var style3 = new SpreadNS.Style();
		style3.backColor = "deepSkyBlue";
		var rule3 = new SpreadNS.ConditionalFormatting.NormalConditionRule(1, ranges, style3, ComparisonOperators.greaterThan, "2000/01/01", "");
		sheet.conditionalFormats.addRule(rule3);

		sheet.bind(GC.Spread.Sheets.Events.RangeFiltered, function (e, info) {    
			console.log(info);
		});
		sheet.bind(GC.Spread.Sheets.Events.RangeSorted, function (e, info) {    
			let sheet = info.sheet;
			let filterRange = sheet.rowFilter().range;
			let row = filterRange.row,
				rowCount = filterRange.rowCount;
			sheet.suspendPaint();
			for(let i=row; i<row+rowCount; i++){
				sheet.autoFitRow(i);
			}
			sheet.resumePaint();
		});

		sheet.resumePaint();
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
