const ex = require('xlsx')

module.exports = {

    fileName: '',

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
        excel.fileName = fileName
        var rows = []
        var selectedRowsId = ui.getSelectedRowsId()
        if(selectedRowsId.length == 0){
            ui.alert('export-excel-failed', 'Any row selected!', false)
        }
        else{
            excel.getExtraData(rows, selectedRowsId, 0)
        }
    },

    getExtraData: function(rows, selectedRowsId, i){
        var resultsRowData = ui.readResultsRow($('#' + selectedRowsId[i]).parent().parent())
        resultsRowData.Price = parseFloat(resultsRowData.Price)
        filter.calcOtherVals($('#' + selectedRowsId[i]).parent().parent().children().eq(5), function(ce, data, effect, prices, productInfo){
            rows.push(Object.assign({}, resultsRowData, {ce: ce}, data, effect, prices, productInfo))
            if(i == selectedRowsId.length-1){
                console.log(rows)
                var ws = ex.utils.json_to_sheet(rows)
        
                /* add to workbook */
                var wb = ex.utils.book_new()
                ex.utils.book_append_sheet(wb, ws, "Teklif Veritabanı")
                
                /* generate an XLSX file */
                ex.writeFile(wb, excel.fileName)
                ui.alert('export-excel-succes', 'Data exported!', true)
            }
            else{
                excel.getExtraData(rows, selectedRowsId, ++i)
            }
        })
    }
}