module.exports = {

    filterAction: function(filter){
        var sqlStatement = "select op_id, op, op_table, op_user, substr(op_date, 1, 12) as op_date, col1, " + 
            "(case " + 
            "when op_table='products' then (select c_name from categories where c_id=col2) " + 
            "when op_table='offers' then (select p_name from products where p_id=col2) " + 
            "else col2 end), " + 
            "(case when op_table='offers' then (select pj_name from projects where pj_id=col3) else col3 end), " + 
            "(case when op_table='offers' then (select s_name from suppliers where s_id=col4) end), " + 
            "(case when op_table='offers' then concat(col5, ' ', col6) end), " + 
            "(case when op_table='offers' then substr(col7, 4, 12) end) " + 
            "from operations where op_date>='" + filter.date1 + "' and op_date<='" + filter.date2 + "'"

        if(filter.tables.length == 1){
            sqlStatement += " and op_table='" + filter.tables[0] + "'"
        }
        else if(filter.tables.length > 1){
            sqlStatement += " and op_table='" + filter.tables[0] + "'"
            for(var i = 1; i < filter.tables.length; i++){
                sqlStatement += " or op_table='" + filter.tables[i] + "'"
            }
            sqlStatement += ")"
        }

        if(filter.types.length == 1){
            sqlStatement += " and op='" + filter.types[0] + "'"
        }
        else if(filter.types.length > 1){
            sqlStatement += " and op='" + filter.types[0] + "'"
            for(var i = 1; i < filter.types.length; i++){
                sqlStatement += " or op='" + filter.types[i] + "'"
            }
            sqlStatement += ")"
        }

        if(user.userInfo.u_aut.charAt(35) != '1'){
            sqlStatement += " and op_user='" + user.userInfo.u_name + "'"
        }
        else if(filter.users.length == 1){
            sqlStatement += " and op_user='" + filter.users[0] + "'"
        }
        else if(filter.users.length > 1){
            sqlStatement += " and op_user='" + filter.users[0] + "'"
            for(var i = 1; i < filter.users.length; i++){
                sqlStatement += " or op_user='" + filter.users[i] + "'"
            }
            sqlStatement += ")"
        }

        if(filter.sort != 'sort'){
            sqlStatement += " ORDER BY " + filter.sort + " " + filter.ascDesc
        }
        sqlStatement += ";"

        console.log(sqlStatement)

        sql.query(sqlStatement, function(data){
            console.log(data)
            ui.setResults(data, ['Action', 'Dataset', 'User', 'Date', 'col1', 'col2', 'col3', 'col4', 'col5'], 'delete-actions')
        })
    },

    cancel: function(ids, i){
        if(ids.length == i){
            return
        }
        var row = $('#' + ids[i]).parent().parent()
        var data = ui.readResultsRow(row)

        switch(data.Dataset){
            case 'offers': {
                switch(data.Action){
                    case 'add': {
                        sql.query("delete from offers where o_id=" + data.col1+ ";", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                    case 'delete': {
                        sql.query("select * from operations where op_id=" + ui.updateId + ";", function(check){
                            var sqlStatement = "insert into offers(o_id, pd_id, pj_id, s_id, price, exchange, date, usd, eur) values(" + check[0].col1 + ", "  + check[0].col2 + ", " + check[0].col3 + ", " + check[0].col4 + ", " + check[0].col5 + ", '" + check[0].col6 + "', '" + od.editDate(check[0].col7.substr(4, 11)) + "', " + check[0].col8 + ", " + check[0].col9 + ");"
                            console.log(sqlStatement)
                            sql.query(sqlStatement, function(check){
                                sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                    row.remove()
                                    action.cancel(ids, ++i)
                                })
                            })
                        })
                    } break
                    case 'update': {
                        sql.query("select * from operations where op_id=" + ui.updateId + ";", function(check){
                            var sqlStatement = "update offers set pd_id=" + check[0].col2 + ", pj_id=" + check[0].col3 + ", s_id=" + check[0].col4 + ", price=" + check[0].col5 + ", date='" + od.editDate(check[0].col6.substr(4, 11)) + "', exchange='" + check[0].col7 + "', usd=" + check[0].col8 + ", eur=" + check[0].col9 + " where o_id=" + check[0].col1 + ";"
                            console.log(sqlStatement)
                            sql.query(sqlStatement, function(check){
                                sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                    row.remove()
                                    action.cancel(ids, ++i)
                                })
                            })
                        })
                    } break
                }
            } break
            case 'products': {
                switch(data.Action){
                    case 'add': {
                        sql.query("delete from products where p_id=" + data.col1+ ";", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                    case 'delete': {
                        sql.query("select * from operations where op_id=" + ui.updateId + ";", function(check){
                            var sqlStatement = "insert into products(p_id, c_id, p_name, inf_effect, steel_effect, cup_effect, lead_effect, zinc_effect, wms_effect, extra_effect) values(" + check[0].col1 + ", "  + check[0].col2 + ",'" + check[0].col3 + "', " + check[0].col4 + ", " + check[0].col5 + ", " + check[0].col6 + ", " + check[0].col7 + ", " + check[0].col8 + ", " + check[0].col9 + ", " + check[0].col10 + ");"
                            console.log(sqlStatement)
                            sql.query(sqlStatement, function(check){
                                sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                    row.remove()
                                    action.cancel(ids, ++i)
                                })
                            })
                        })
                    } break
                    case 'update': {
                        sql.query("select * from operations where op_id=" + ui.updateId + ";", function(check){
                            var sqlStatement = "update products set c_id=" + check[0].col2 + ", p_name='" + check[0].col3 + "', inf_effect=" + check[0].col4 + ", steel_effect=" + check[0].col5 + ", cup_effect=" + check[0].col6 + ", lead_effect=" + check[0].col7 + ", zinc_effect=" + check[0].col8 + ", wms_effect=" + check[0].col9 + ", extra_effect=" + check[0].col10 + " where p_id=" + check[0].col1 + ";"
                            console.log(sqlStatement)
                            sql.query(sqlStatement, function(check){
                                sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                    row.remove()
                                    action.cancel(ids, ++i)
                                })
                            })
                        })
                    } break
                }
            } break
            case 'suppliers': {
                switch(data.Action){
                    case 'add': {
                        sql.query("delete from suppliers where s_id=" + data.col1+ ";", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                    case 'delete': {
                        sql.query("insert into suppliers(s_id, s_name) values(" + data.col1 + ", '" + data.col2+ "');", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                    case 'update': {
                        sql.query("update suppliers set s_name='" + data.col2+ "' where s_id=" + data.col1 + ";", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                }
            } break
            case 'categories': {
                switch(data.Action){
                    case 'add': {
                        sql.query("delete from categories where c_id=" + data.col1+ ";", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                    case 'delete': {
                        sql.query("insert into categories(c_id, c_name) values(" + data.col1 + ", '" + data.col2+ "');", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                    case 'update': {
                        sql.query("update categories set c_name='" + data.col2+ "' where c_id=" + data.col1 + ";", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                }
            } break
            case 'projects': {
                switch(data.Action){
                    case 'add': {
                        sql.query("delete from projects where pj_id=" + data.col1+ ";", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                    case 'delete': {
                        sql.query("insert into projects(pj_id, pj_name) values(" + data.col1 + ", '" + data.col2+ "');", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                    case 'update': {
                        sql.query("update projects set pj_name='" + data.col2+ "' where pj_id=" + data.col1 + ";", function(check){
                            sql.query("delete from operations where op_id=" + ui.updateId + ";", function(check){
                                row.remove()
                                action.cancel(ids, ++i)
                            })
                        })
                    } break
                }
            } break
        }
    },

    cancelSelecteds: function(){
        var ids = ui.getSelectedRowsId()
        action.cancel(ids, 0)
    }
}