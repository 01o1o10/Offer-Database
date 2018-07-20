module.exports = {

    deleteData: function(idArray, tableInfo){
        if(tableInfo.tableName != 'operations'){
            del.insertOperations(tableInfo, idArray, 0)
        }
        else{
            del.deleteDataFromDb(tableInfo, idArray)
        }
    },

    deleteDataFromDb: function(tableInfo, idArray){
        var sqlStatement = "delete from " + tableInfo.tableName
        if(idArray.length == 1){

            sqlStatement += " where " + tableInfo.idColName + "=" + idArray[0]
        }
        else if(idArray.length > 1){
            sqlStatement += " where " + tableInfo.idColName + "=" + idArray[0]
            for(var i = 1; i < idArray.length; i++){
                sqlStatement += " or " + tableInfo.idColName + "=" + idArray[i]
            }
        }
        sqlStatement += ";"

        if(idArray.length != 0){
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                var checkedCheckboxes = $('.result-checkbox:checkbox:checked')
                for(var i = 0; i < checkedCheckboxes.length; i++){
                    checkedCheckboxes[i].parentNode.parentNode.remove()
                }
                ui.setAlertModal('Deleted selected rows!', true)
            })
        }
    },

    insertOperations: function(tableInfo, idArray, i){
        sql.query("select * from " + tableInfo.tableName + " where " + tableInfo.idColName + "=" + idArray[i] + ";", function(check){
            switch(tableInfo.tableName){
                case 'products': var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10) values('delete', 'products', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check[0].p_id + ", "+ check[0].c_id + ",'" + check[0].p_name + "', " + check[0].inf_effect + ", " + check[0].steel_effect + ", " + check[0].cup_effect + ", " + check[0].lead_effect + ", " + check[0].zinc_effect + ", " + check[0].wms_effect + ", " + check[0].extra_effect + ");"
                    break
                case 'categories': var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('delete', 'categories', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check[0].c_id + ", '"+ check[0].c_name + "');"
                    break
                case 'projects': var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('delete', 'projects', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check[0].pj_id + ", '"+ check[0].pj_name + "');"
                    break
                case 'suppliers': var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('delete', 'supplier', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check[0].s_id + ", '"+ check[0].s_name + "');"
                    break
                case 'offers': var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9) values('delete', 'offers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check[0].o_id  + ",'" + check[0].pd_id + "', '" + check[0].pj_id + "', '" + check[0].s_id + "', '" + check[0].price + "', '" + check[0].date + "', '" + check[0].exchange + "', '" + check[0].usd + "', '" + check[0].eur + "');"
                    break
            }
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                if(i == idArray.length-1){
                    del.deleteDataFromDb(tableInfo, idArray)
                }
                else{
                    del.insertOperations(tableInfo, idArray, ++i)
                }
            })
        })
    }
}