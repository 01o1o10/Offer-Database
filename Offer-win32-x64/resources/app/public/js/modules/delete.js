module.exports = {

    errorCount: 0,

    deleteData: function(idArray, tableInfo){
        if(idArray.length != 0){
            del.errorCount = 0
            del.deleteDataFromDb(tableInfo, idArray, 0)
        }
    },

    deleteDataFromDb: function(tableInfo, idArray, i){
        if(idArray.length != i){
            sql.query("select * from " + tableInfo.tableName + " where " + tableInfo.idColName + "=" + idArray[i] + ";", function(check){
                sql.query("delete from " + tableInfo.tableName + " where " + tableInfo.idColName + "=" + idArray[i] + ";", function(check1){
                    if(check1.affectedRows && check1.affectedRows){
                        $('#' + idArray[i]).parent().parent().remove()
                        if(tableInfo.tableName != 'operations'){
                            var sqlStatement
                            switch(tableInfo.tableName){
                                case 'products': sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10) values('delete', 'products', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check[0].p_id + ", "+ check[0].c_id + ",'" + check[0].p_name + "', " + check[0].inf_effect + ", " + check[0].steel_effect + ", " + check[0].cup_effect + ", " + check[0].lead_effect + ", " + check[0].zinc_effect + ", " + check[0].wms_effect + ", " + check[0].extra_effect + ");"
                                    break
                                case 'categories': sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('delete', 'categories', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check[0].c_id + ", '"+ check[0].c_name + "');"
                                    break
                                case 'projects': sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('delete', 'projects', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check[0].pj_id + ", '"+ check[0].pj_name + "');"
                                    break
                                case 'suppliers': sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('delete', 'suppliers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check[0].s_id + ", '"+ check[0].s_name + "');"
                                    break
                                case 'offers': sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9) values('delete', 'offers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check[0].o_id  + ",'" + check[0].pd_id + "', '" + check[0].pj_id + "', '" + check[0].s_id + "', '" + check[0].price + "', '" + check[0].exchange + "', '" + check[0].date + "', '" + check[0].usd + "', '" + check[0].eur + "');"
                                    break
                            }
                            console.log(sqlStatement)
                            sql.query(sqlStatement, function(check){})
                            del.deleteDataFromDb(tableInfo, idArray, ++i)
                        }
                        else{
                            del.deleteDataFromDb(tableInfo, idArray, ++i)
                        }
                    }
                    else{
                        del.errorCount++
                        del.deleteDataFromDb(tableInfo, idArray, ++i)
                    }
                })
            })
        }
        else{
            ui.setAlertModal(idArray.length - del.errorCount + ' records deleted, ' + del.errorCount + ' could not. May be in use.!', true)
        }
    },
}