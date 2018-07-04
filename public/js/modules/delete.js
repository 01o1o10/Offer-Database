module.exports = {
    deleteData: function(idArray, tableInfo){
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
            sql.query(sqlStatement, function(check2){
                var checkedCheckboxes = $('.result-checkbox:checkbox:checked')
                for(var i = 0; i < checkedCheckboxes.length; i++){
                    checkedCheckboxes[i].parentNode.parentNode.remove()
                }
                ui.setAlertModal('<strong>Succes!</strong> Deleted selected rows!', true)
            })
        }
    }
}