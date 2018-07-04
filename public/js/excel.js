$(document).ready(function(){
    var ex = require('xlsx')

    
    $(document).on('click', '#excel-export', function(){
        var data = []
        var filename = document.getElementById('dirnamee').files[0].path
         filename = filename.split('').reverse().join('')
         filename = filename.substr(filename.indexOf('\\'), filename.length)
         filename = filename.split('').reverse().join('')
         filename += document.getElementById('export-file').value + '.xlsx'
        var satirlar = document.getElementById('sonuclar').childNodes
        for(var i = 0; i < satirlar.length; i++){
            var hucreler = satirlar[i].childNodes
            data.push({urun:hucreler[1].textContent, proje:hucreler[2].textContent, tedarikci:hucreler[3].textContent, tl:hucreler[4].textContent, usd:hucreler[5].textContent, euro:hucreler[6].textContent, tarih:hucreler[7].textContent})
        }
        console.log(data)
        var ws = ex.utils.json_to_sheet(data);

        /* add to workbook */
        var wb = ex.utils.book_new();
        ex.utils.book_append_sheet(wb, ws, "Teklif Veritabanı");
        
        /* generate an XLSX file */
        ex.writeFile(wb, filename);
    })
    
    $(document).on('click', '#excel-import', function(){
        var filename = document.getElementById('import-file').files[0].path
        var workbook = ex.readFile(filename);
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var data = getarr(worksheet)
        console.log(data)
    })

    function getarr(sheet){
        var result = [];
        var row;
        var rowNum;
        var colNum;
        var range = ex.utils.decode_range(sheet['!ref']);
        for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
           row = [];
            for(colNum=range.s.c; colNum<=range.e.c; colNum++){
               var nextCell = sheet[
                  ex.utils.encode_cell({r: rowNum, c: colNum})
               ];
               if( typeof nextCell === 'undefined' ){
                  row.push(void 0);
               } else row.push(nextCell.w);
            }
            result.push(row);
        }
        return result;
     };
})