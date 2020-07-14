<template>
  <div class="componentContainer" >
    <h3>自定义单元格类型</h3>
    <div>
      <div>
        CustomCellType
      </div>
    </div>
    <div class="spreadContainer" >
      <gc-spread-sheets
        :hostClass='"spreadHost"'
        @workbookInitialized='spreadInitHandle($event)'
		>
      </gc-spread-sheets>
    </div>
  </div>
</template>

<script>
import GC from '@grapecity/spread-sheets'

export default {
  name: 'CustomCellType',
  data () {
    return {
      spread: {}
    }
  },
  methods: {
    spreadInitHandle: function (spread) {
		this.spread = spread
		let sheet = spread.getActiveSheet();
		let spreadNS = GC.Spread.Sheets;
		function MutipHyperLinkPictureCellType(items, size, isHorizontal) {
			this.typeName = "MutipHyperLinkPictureCellType";
			this._size = size || 22;
			this._isHorizontal = isHorizontal || false;
			this._items = items || [];
			this._valueArr = [];
			this._itemsTextWidth = [];
			this._maxItemTextWidth = 0;
			this._sumItemTextWidth = 0;
			this._zoomCatah = 1;
			this._autofitheight = 0;
			this._autofitwidth = 0;
		}
		MutipHyperLinkPictureCellType.prototype = new spreadNS.CellTypes.Base();
		MutipHyperLinkPictureCellType.prototype.items = function(items){
			if (arguments.length === 0)
			{
				return this._items
			}
			this._items = items;
			this._isCatchedTextWidth = false;
			return this
		}
		MutipHyperLinkPictureCellType.prototype.size = function(size){
			if (arguments.length === 0)
			{
				return this._size
			}
			this._size = size;
			return this
		}
		MutipHyperLinkPictureCellType.prototype.isHorizontal = function(isHorizontal){
			if (arguments.length === 0)
			{
				return this._isHorizontal
			}
			this._isHorizontal = isHorizontal;
			return this
		}
		MutipHyperLinkPictureCellType.prototype._getPaintStartX = function(x, y, w, h, hAlign){
			return x;
		}
		MutipHyperLinkPictureCellType.prototype._getPaintStartY = function(x, y, w, h, vAlign){
			return y;
		}
		MutipHyperLinkPictureCellType.prototype.paint = function (ctx, value, x, y, w, h, style, options) {
			GC.Spread.Sheets.CellTypes.Base.prototype.paint.call(this, ctx, '', x, y, w, h, style, options);
			if (!ctx) {
				return;
			}
			var sheet = options.sheet;
			var items = this._items;
			var zoomFactor = sheet.zoom();

			ctx.save();

			ctx.rect(x, y, w, h);
			ctx.clip();

			ctx.font= style.font;
			ctx.fillStyle = style.foreColor;

					
			this._zoomCatah = zoomFactor;
				
			

			var size = this._size * zoomFactor;
			var startX = this._getPaintStartX(x, y, w, h, style.hAlign), 
				startY = this._getPaintStartY(x, y, w, h, style.vAlign);
				
			var hyperStyle = new GC.Spread.Sheets.Style();
			hyperStyle.foreColor = 'blue';
			hyperStyle.font = style.font;
			hyperStyle.textDecoration = GC.Spread.Sheets.TextDecorationType.underline;

			
			
			var valueArr = value.split(";");

			for(var i = 0; i < valueArr.length; i++){
				var backgroundImgStyle = new GC.Spread.Sheets.Style();
				backgroundImgStyle.backgroundImage = valueArr[i];
				var width = ctx.measureText(valueArr[i]).width;
				if(width + 100 + 10> this._autofitwidth){
					this._autofitwidth = width + 100 + 10;
				}
				var valueObj = {};
				valueObj.width = width;
				valueObj.value = valueArr[i];
				this._valueArr.push(valueObj);
				GC.Spread.Sheets.CellTypes.Text.prototype.paint.call(this, ctx, valueArr[i], startX + 100 + 10, startY + 50 + i * 100 - size / 2, width + 10, size, hyperStyle, options);
				GC.Spread.Sheets.CellTypes.Text.prototype.paint.call(this, ctx, "", startX, startY + i * 100,100,100, backgroundImgStyle, options);

			}
			this._autofitheight = valueArr.length*100;
			
			ctx.restore();
		};
		MutipHyperLinkPictureCellType.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
			var info = {
				x: x,
				y: y,
				row: context.row,
				col: context.col,
				cellStyle: cellStyle,
				cellRect: cellRect,
				sheetArea: context.sheetArea
			};
			for(var i=0;i<this._valueArr.length;i++){
				var width = this._valueArr[i].width;
				if (x > cellRect.x + 100 && x < cellRect.x + 100 + width) {
					if(y > cellRect.y + 50 + i * 100 - this._size*this._zoomCatah/2 && y < cellRect.y + 50 + i * 100 - this._size*this._zoomCatah/2 + this._size*this._zoomCatah){
						info.isReservedLocation = true;
						info.reservedLocation = i;
						info.url = this._valueArr[i].value;
						break;
					}
				}
			}

			return info;
		};
		MutipHyperLinkPictureCellType.prototype.processMouseMove = function (hitInfo) {
			var sheet = hitInfo.sheet;
			var div = sheet.getParent().getHost();
			var canvasId = div.id + "vp_vp";
			var canvas = $("#" + canvasId)[0];
			if (sheet && hitInfo.isReservedLocation) {
				canvas.style.cursor = 'pointer';
				return true;
			} else {
				canvas.style.cursor = 'default';
			}
			return false;
		};
		MutipHyperLinkPictureCellType.prototype.processMouseUp = function (hitInfo) {
			var sheet = hitInfo.sheet;
			if (sheet && hitInfo.isReservedLocation && hitInfo.reservedLocation >= 0) {
				var row = hitInfo.row, col = hitInfo.col, sheetArea = hitInfo.sheetArea;
				window.open(hitInfo.url);
				return true;
			}
			return false;
		};
		MutipHyperLinkPictureCellType.prototype.getAutoFitHeight = function(){
			return this._autofitheight;
		}
		MutipHyperLinkPictureCellType.prototype.getAutoFitWidth = function(){
			return this._autofitwidth;
		}
		sheet.suspendPaint();
		sheet.setColumnWidth(1, 270);
		sheet.setColumnWidth(2, 270);
		sheet.setColumnWidth(3, 270);

		sheet.setRowHeight(1, 200);
		sheet.setRowHeight(2, 70);

		var rbCellType = new MutipHyperLinkPictureCellType();

		var cell = sheet.getCell(1, 1);
		cell.foreColor("green");
		// cell.vAlign(GC.Spread.Sheets.VerticalAlign.top)
		cell.cellType(rbCellType);
		cell.value("https://www.baidu.com/img/bd_logo1.png?where=super;https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");

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
