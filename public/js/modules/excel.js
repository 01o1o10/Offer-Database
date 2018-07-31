const ex = require('xlsx')

module.exports = {

    fileName: '',
    unimportedRows: [],

    import: function(fileName){
        var workbook = ex.readFile(fileName);
        var worksheet1 = workbook.Sheets[workbook.SheetNames[0]]
        var worksheet2 = workbook.Sheets[workbook.SheetNames[1]]
        var worksheet3 = workbook.Sheets[workbook.SheetNames[2]]
        var data1 = this.readExcelAsArray(worksheet1)
        var data2 = this.readExcelAsArray(worksheet2)
        var data3 = this.readExcelAsArray(worksheet3)

        $('#import-excel-progress').css('width', '0')
        excel.ws3ImportSupplierDb(data3, 0, function(){
            $('#import-excel-progress').css('width', '0')
            excel.ws3ImportProjectDb(data3, 0, function(){
                $('#import-excel-progress').css('width', '0')
                excel.ws3ImportCategoryDb(data3, 0, function(){
                    $('#import-excel-progress').css('width', '0')
                    excel.ws2ImportProductDb(data2, 0, function(){
                        $('#import-excel-progress').css('width', '0')
                        excel.ws2ImportOfferDb(data1, 0, function(){
                            if(excel.unimportedRows.length != 0){
                                console.log(excel.unimportedRows)
                                var ws = ex.utils.json_to_sheet(excel.unimportedRows)
                        
                                /* add to workbook */
                                var wb = ex.utils.book_new()
                                ex.utils.book_append_sheet(wb, ws, "Errors")
                                
                                /* generate an XLSX file */
                                ex.writeFile(wb, fileName.substr(0, fileName.length - 5) + '_errors.xlsx')
                                ui.setAlertModal('Data imported to DB from excel! Unimported data reported in import directory as ' + fileName.substr(0, fileName.length - 5) + '_errors.xlsx', true)
                            }
                            else {
                                ui.setAlertModal('Data imported to DB from excel!', true)
                            }
                        })
                    })
                })
            })
        })
    },

    ws3ImportSupplierDb: function(data, i, cb){
        $('#import-excel-progress').css('width', '' + ((i/(data.length))*100) + '%')
        if(data[i] && data[i][2]){
            if(!select.supplierId[data[i][2]]){
                sql.query("insert into suppliers(s_name) values('" + data[i][2] + "');", function(check){
                    if(check.insertId){
                        select.supplierId[data[i][2]] = check.insertId
                        select.supplierName['id' + check.insertId] = data[i][2]
                        var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('add', 'suppliers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", '"+ data[i][2] + "');"
                        //console.log(sqlStatement)
                        sql.query(sqlStatement, function(check){})
                        select.update({className: 'select-supplier', value: check.insertId, text: data[i][2]})
                        //console.log('Supplier saved succesfully!')
                        excel.ws3ImportSupplierDb(data, ++i, cb)
                    }
                    else{
                        excel.unimportedRows.push({row: (i+1), error: 'Supplier can not import to db'})
                        //console.log('Supplier can not import to db')
                        excel.ws3ImportSupplierDb(data, ++i, cb)
                    }
                })
            }
            else{
                excel.unimportedRows.push({row: (i+1), error: 'Supplier is already exist!'})
                //console.log('Supplier is already exist!')
                excel.ws3ImportSupplierDb(data, ++i, cb)
            }
        }
        else{
            //console.log('Suppliers saved succesfully!')
            cb()
        }
    },

    ws3ImportProjectDb: function(data, i, cb){
        $('#import-excel-progress').css('width', '' + ((i/(data.length))*100) + '%')
        if(data[i] && data[i][1]){
            if(!select.projectId[data[i][2]]){
                sql.query("insert into projects(pj_name) values('" + data[i][1] + "');", function(check){
                    if(check.insertId){
                        select.projectId[data[i][1]] = check.insertId
                        select.projectName['id' + check.insertId] = data[i][1]
                        var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('add', 'projects', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", '"+ data[i][1] + "');"
                        //console.log(sqlStatement)
                        sql.query(sqlStatement, function(check){})
                        select.update({className: 'select-project', value: check.insertId, text: data[i][1]})
                        //console.log('Project saved succesfully!')
                        excel.ws3ImportProjectDb(data, ++i, cb)
                    }
                    else{
                        excel.unimportedRows.push({row: (i+1), error: 'Project can not import to db!'})
                        //console.log('Project can not import to db!')
                        excel.ws3ImportProjectDb(data, ++i, cb)
                    }
                })
            }
            else{
                excel.unimportedRows.push({row: (i+1), error: 'Project is already exist!'})
                //console.log('Project is already exist!')
                excel.ws3ImportProjectDb(data, ++i, cb)
            }
        }
        else{
            cb()
        }
    },

    ws3ImportCategoryDb: function(data, i, cb){
        $('#import-excel-progress').css('width', '' + ((i/(data.length))*100) + '%')
        if(data[i] && data[i][0]){
            if(!select.categoryId[data[i][0]]){
                sql.query("insert into categories(c_name) values('" + data[i][0] + "');", function(check){
                    if(check.insertId){
                        select.categoryId[data[i][0]] = check.insertId
                        select.categoryName['id' + check.insertId] = data[i][0]
                        var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('add', 'categories', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check.insertId + ", '"+ data[i][0] + "');"
                        //console.log(sqlStatement)
                        sql.query(sqlStatement, function(check){})
                        select.update({className: 'select-category', value: check.insertId, text: data[i][0]})
                        //console.log('Category saved succesfully!')
                        excel.ws3ImportCategoryDb(data, ++i, cb)
                    }
                    else{
                        excel.unimportedRows.push({row: (i+1), error: 'Category can not import to db!'})
                        //console.log('Category can not import to db!')
                        excel.ws3ImportCategoryDb(data, ++i, cb)
                    }
                })
            }
            else{
                excel.unimportedRows.push({row: (i+1), error: 'Category is already exist!'})
                //console.log('Category is already exist!')
                excel.ws3ImportCategoryDb(data, ++i, cb)
            }
        }
        else{
            cb()
        }
    },

    ws2ImportProductDb: function(data, i, cb){
        $('#import-excel-progress').css('width', '' + ((i/(data.length))*100) + '%')
        if(data[i] && data[i][0]){
            if(!select.productId[data[i][0]]){
                var sqlStatement = "insert into products(p_name, c_id, inf_effect, steel_effect, cup_effect, lead_effect, zinc_effect, wms_effect, extra_effect) values('" + data[i][0] + "', " + select.categoryId[data[i][1]] + ", " + data[i][2] + ", " + data[i][3] + ", " + data[i][4] + ", " + data[i][5] + ", " + data[i][6] + ", " + data[i][7] + ", " + data[i][8] + ");"
                //console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    if(check.insertId){
                        select.productId[data[i][0]] = check.insertId
                        select.productName['id' + check.insertId] = data[i][0]
                        var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10) values('add', 'products', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", "+ data[i][0] + "', " + select.categoryId[data[i][1]] + ", " + data[i][2] + ", " + data[i][3] + ", " + data[i][4] + ", " + data[i][5] + ", " + data[i][6] + ", " + data[i][7] + ", " + data[i][8] + ");"
                        //console.log(sqlStatement)
                        sql.query(sqlStatement, function(check){})
                        select.update({className: 'select-product', value: check.insertId, text: data[i][0]})
                        //console.log('Product saved succesfully!')
                        excel.ws2ImportProductDb(data, ++i, cb)
                    }
                    else{
                        excel.unimportedRows.push({row: (i+1), error: 'Project can not import to db!'})
                        //console.log('Project can not import to db!')
                        excel.ws2ImportProductDb(data, ++i, cb)
                    }
                })
            }
            else{
                excel.unimportedRows.push({row: (i+1), error: 'Project is already exist!'})
                //console.log('Project is already exist!')
                excel.ws2ImportProductDb(data, ++i, cb)
            }
        }
        else{
            //console.log('Project saved succesfully!')
            cb()
        }
    },

    ws2ImportOfferDb: function(data, i, cb){
        $('#import-excel-progress').css('width', '' + ((i/(data.length))*100) + '%')
        if(data[i] && data[i][0]){
            od.getExchangeRate(data[i][6], function(exchangeRate){
                var sqlStatement = "insert into offers(pd_id, pj_id, s_id, price, exchange, date, usd, eur) values(" + select.productId[data[i][0]] + ", " + select.projectId[data[i][2]] + ", " + select.supplierId[data[i][3]] + ", " + data[i][4] + ", '" + data[i][5] + "', '" + data[i][6] + "', " + exchangeRate.usd + ", " + exchangeRate.eur + ");"
                //console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    if(check.insertId){
                        var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10) values('add', 'offers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", "+ select.productId[data[i][0]] + ", " + select.projectId[data[i][2]] + ", " + select.supplierId[data[i][3]] + ", " + data[i][4] + ", '" + data[i][5] + "', '" + data[i][6] + "', " + exchangeRate.usd + ", " + exchangeRate.eur + ");"
                        //console.log(sqlStatement)
                        sql.query(sqlStatement, function(check){})
                        //console.log('Offer saved succesfully!')
                        excel.ws2ImportOfferDb(data, ++i, cb)
                    }
                    else{
                        if(!select.productId[data[i][0]]){
                            excel.unimportedRows.push({row: (i+1), error: 'Offer insert product is undefined!'})
                        }
                        else if(!select.projectId[data[i][2]]){
                            excel.unimportedRows.push({row: (i+1), error: 'Offer insert project is undefined!'})
                        }
                        else if(!select.supplierId[data[i][3]]){
                            excel.unimportedRows.push({row: (i+1), error: 'SOffer insert supplier is undefined!'})
                        }
                        else {
                            excel.unimportedRows.push({row: (i+1), error: 'Offer insert unknown error!'})
                        }
                        //console.log('Offer can not import to db!')
                        excel.ws2ImportOfferDb(data, ++i, cb)
                    }
                })
            })
        }
        else{
            cb()
        }
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
        var rows = [{Product: 'Product', Category: 'Category', Project: 'Project', Supplier: 'Supplier', Price: 'Price', Exchange: 'Currency', Date: 'Date', ce: 'Total Effect', cell12: 'Old USD', cell13: 'Old EUR', cell21: 'Old TL Price', cell22: 'Old USD Price', cell23: 'Old EUR Price',    cell31: 'Inflation', cell32: 'New USD', cell33: 'New EUR', cell41: 'New TL Price', cell42: 'New USD Price', cell43: 'New EUR Price', inf: 'Inf Eff', steel: 'Steel Eff', cup: 'Copper Eff', lead: 'Lead Eff', zinc: 'Zinc Eff', wms: 'WMS Eff', steelPriceNew: 'Steel New Price', steelPriceOld: 'Steel Old Price', cuprumPriceNew: 'Copper New Price', cuprumPriceOld: 'Copper Old Price', leadPriceNew: 'Lead New Price', leadPriceOld: 'Lead Old Price', zincPriceNew: 'Zinc New Price', zincPriceOld: 'Zinc Old Price', mwNew: 'WMS New Price', mwOld: 'WMS Old Price', p_name: 'Product', inf_effect: 'Inf Per', steel_effect: 'Steel Per', cup_effect: 'Cop Per', lead_effect: 'Lead Per', zinc_effect: 'Zinc Per', wms_effect: 'WMS Per', extra_effect: 'Extra Per', cur: 'Cur Per'}]
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
            delete data.cell11
            delete productInfo.p_id
            delete productInfo.c_id
            rows.push(Object.assign({}, resultsRowData, {ce: ce}, data, effect, prices, productInfo))
            if(i == selectedRowsId.length-1){
                $('#export-excel-progress').css('width', '' + 100 + '%')
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
                $('#export-excel-progress').css('width', '' + ((i/selectedRowsId.length)*100) + '%')
                excel.getExtraData(rows, selectedRowsId, ++i)
            }
        })
    }
}