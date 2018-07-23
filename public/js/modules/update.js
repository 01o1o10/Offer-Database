module.exports = {

    updateProduct: function(data){
        console.log(data)
        if(!data){
            ui.alert('update-product-failed', 'Entered product data is empty!', false)
        }
        else{
            if(!data.category){
                ui.alert('update-product-failed', 'Please select a category!', false)
            }
            else if(!data.product || !data.inf || !data.steel || !data.cup || !data.lead || !data.zinc || !data.wms || !data.extra){
                ui.alert('update-product-failed', 'Fields can not be empty!', false)
            }
            else if(!$.isNumeric(data.inf) || !$.isNumeric(data.steel) || !$.isNumeric(data.cup) || !$.isNumeric(data.lead) || !$.isNumeric(data.zinc) || !$.isNumeric(data.wms) || !$.isNumeric(data.extra)){
                ui.alert('update-product-failed', 'Inflation, Steel, Cuprum, Lead and Workmanship fields must be numeric!', false)
            }
            else if((parseFloat(data.inf) + parseFloat(data.steel) + parseFloat(data.cup) + parseFloat(data.lead) + parseFloat(data.zinc) + parseFloat(data.wms) + parseFloat(data.extra)) != 1){
                ui.alert('update-product-failed', 'Total effects value must be equal to 1!', false)
            }
            else{
                sql.query("select * from products where p_id=" + data.id + ";", function(check){
                    var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10) values('update', 'products', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check[0].p_id + ", "+ check[0].c_id + ",'" + check[0].p_name + "', " + check[0].inf_effect + ", " + check[0].steel_effect + ", " + check[0].cup_effect + ", " + check[0].lead_effect + ", " + check[0].zinc_effect + ", " + check[0].wms_effect + ", " + check[0].extra_effect + ");"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){})
                    sqlStatement = "update products set c_id=" + data.category + ", p_name='" + data.product + "', inf_effect=" + data.inf + ", steel_effect=" + data.steel + ", cup_effect=" + data.cup + ", lead_effect=" + data.lead + ", zinc_effect=" + data.zinc + ", wms_effect=" + data.wms + ", extra_effect=" + data.extra + " where p_id=" + data.id + ";"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){
                        select.productId[data.product] = ui.updateId
                        delete select.productId[check[0].p_name]
                        select.productName[ui.updateId] = data.product
                        $('.select product input[value=' + ui.updateId + ']').text(data.product)
                        $('.select-product').sumo.reload()
                        ui.alert('update-product-succes', 'Product updated succesfully!', true)
                    })
                })
            }
        }
    },

    updateCategory: function(data){
        if(!data.category){
            ui.alert('update-category-failed', 'Category name can not be empty!', false)
        }
        else{
            sql.query("select * from categories where c_id=" + data.id + ";", function(check){
                var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('update', 'categories', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check[0].c_id + ", '"+ check[0].c_name + "');"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){})
                sqlStatement = "update categories set c_name='" + data.category + "' where c_id=" + data.id + ";"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    ui.alert('update-category-succes', 'Category udated succesfully!', true)
                })
            })
        }
    },

    updateProject: function(data){
        if(!data.project){
            ui.alert('update-project-failed', 'Project name can not be empty!', false)
        }
        else{
            sql.query("select * from projects where pj_id=" + data.id + ";", function(check){
                var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('update', 'projects', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check[0].pj_id + ", '"+ check[0].pj_name + "');"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){})
                sqlStatement = "update projects set pj_name='" + data.project + "' where pj_id=" + data.id + ";"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    ui.alert('update-project-succes', 'Project udated succesfully!', true)
                })
            })
        }
    },

    updateSupplier: function(data){
        if(!data.supplier){
            ui.alert('update-supplier-failed', 'Supplier name can not be empty!', false)
        }
        else{
            sql.query("select * from suppliers where s_id=" + data.id + ";", function(check){
                var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('update', 'suppliers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check[0].s_id + ", '"+ check[0].s_name + "');"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){})
                sqlStatement = "update suppliers set s_name='" + data.supplier + "' where s_id=" + data.id + ";"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    ui.alert('update-supplier-succes', 'Supplier udated succesfully!', true)
                })
            })
        }
    },

    updateOffer: function(data){
        if(!data){
            ui.alert('update-offer-failed', 'Entered offer data is empty!', false)
        }
        else if(!data.product || !data.project || !data.supplier || !data.price){
            ui.alert('update-offer-failed', 'Any field can not be empty!', false)
        }
        else {
            if(!$.isNumeric(data.price)){
                ui.alert('update-offer-failed', 'Price must be numeric!', false)
            }
            else {
                sql.query("select * from offers where o_id=" + data.id + ";", function(check){
                    var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9) values('update', 'offers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check[0].o_id  + ",'" + check[0].pd_id + "', '" + check[0].pj_id + "', '" + check[0].s_id + "', '" + check[0].price + "', '" + check[0].date + "', '" + check[0].exchange + "', '" + check[0].usd + "', '" + check[0].eur + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){})
                    sqlStatement = "update offers set pd_id=" + data.product + ", pj_id=" + data.project + ", s_id=" + data.supplier + ", price=" + data.price + ", date='" + data.date + "', exchange='" + data.exchange + "', usd=" + data.usd + ", eur=" + data.eur + " where o_id=" + data.id + ";"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){
                        ui.alert('update-offer-succes', 'Offer saved succesfully!', true)
                    })
                })
            }
        }
    }
}