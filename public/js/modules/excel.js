const ex = require('xlsx')

module.exports = {
    import: function(fileName){
        var workbook = ex.readFile(fileName);
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var data = this.readExcelAsArray(worksheet)
        insert.excelToDb(data, 0)
        console.log(data)
    }, 

    readExcelAsArray: function(worksheet){
        var result = []
        var row
        var rowNum
        var colNum
        var range = ex.utils.decode_range(worksheet['!ref'])
        for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
           row = []
            for(colNum=range.s.c; colNum<=range.e.c; colNum++){
               var nextCell = worksheet [
                  ex.utils.encode_cell({r: rowNum, c: colNum})
               ]
               if( typeof nextCell === 'undefined' ){
                  row.push(void 0)
               } else row.push(nextCell.w)
            }
            result.push(row)
        }
        return result
    },

    export: function(fileName){
        var data = []
        var selectedRowsId = ui.getSelectedRowsId()
        for(var i = 0; i < selectedRowsId.length; i++){
            var hucreler = ui.readResultsRow($('#' + selectedRowsId[i]).parent().parent())
            data.push(hucreler)
        }
        console.log(data)
        var ws = ex.utils.json_to_sheet(data)

        /* add to workbook */
        var wb = ex.utils.book_new()
        ex.utils.book_append_sheet(wb, ws, "Teklif Veritabanı")
        
        /* generate an XLSX file */
        ex.writeFile(wb, fileName)
        ui.alert('export-excel-succes', 'Data exported!', true)
    }
}