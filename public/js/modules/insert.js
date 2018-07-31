module.exports = {

    addProduct: function(data, cb){
        if(!data){
            if(cb){
                cb()
            }
            else{
                ui.alert('add-product-failed', 'Entered product data is empty!', false)
            }
        }
        else{
            if(!data.category){
                if(cb){
                    cb('Please select a category!')
                }
                else{
                    ui.alert('add-product-failed', 'Please select a category!', false)
                }
            }
            else if(!data.product || !data.inf || !data.steel || !data.cup || !data.lead || !data.zinc || !data.wms || !data.extra){
                if(cb){
                    cb('Fields can not be empty!')
                }
                else{
                    ui.alert('add-product-failed', 'Fields can not be empty!', false)
                }
            }
            else if((parseFloat(data.inf) + parseFloat(data.steel) + parseFloat(data.cup) + parseFloat(data.lead) + parseFloat(data.zinc) + parseFloat(data.wms) + parseFloat(data.extra)) != 1){
                if(cb){
                    cb('Total effects value must be equal to 1!')
                }
                else{
                    ui.alert('add-product-failed', 'Total effects value must be equal to 1!', false)
                }
            }
            else if(select.productId[data.product]){
                if(cb){
                    cb('This product is already exists!')
                }
                else{
                    ui.alert('add-product-failed', 'This product is already exists!', false)
                }
            }
            else{
                var sqlStatement = "insert into products(p_name, c_id, inf_effect, steel_effect, cup_effect, lead_effect, zinc_effect, wms_effect, extra_effect) values('" + data.product + "', " + data.category + ", " + data.inf + ", " + data.steel + ", " + data.cup + ", " + data.lead + ", " + data.zinc + ", " + data.wms + ", " + data.extra + ");"
                //console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    if(check.insertId){
                        select.productId[data.product] = check.insertId
                        select.productName['id' + check.insertId] = data.product
                        select.update({className: 'select-product', value: check.insertId, text: data.product})
                        var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10) values('add', 'products', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", '" + data.product + "', " + data.category + ", " + data.inf + ", " + data.steel + ", " + data.cup + ", " + data.lead + ", " + data.zinc + ", " + data.wms + ", " + data.extra + ");"
                        //console.log(sqlStatement)
                        sql.query(sqlStatement, function(check){})
                        if(cb){
                            cb(check.insertId)
                        }
                        else{
                            ui.alert('add-product-succes', 'Product saved succesfully!', true)
                        }
                    }
                })
            }
        }
    },

    addCategory: function(category, cb){
        if(!category){
            if(cb){
                cb('Category name can not be empty!')
            }
            else{
                ui.alert('add-category-failed', 'Category name can not be empty!', false)
            }
        }
        else if(select.categoryId[category]){
            if(cb){
                cb('This category is already exists!')
            }
            else{
                ui.alert('add-category-failed', 'This category is already exists!', false)
            }
        }
        else{
            var sqlStatement = "insert into categories(c_name) values('" + category + "');"
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                if(check.insertId){
                    select.categoryId[category] = check.insertId
                    select.categoryName['id' + check.insertId] = category
                    select.update({className: 'select-category', value: check.insertId, text: category})
                    var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('add', 'categories', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check.insertId + ", '"+ category + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){})
                    if(cb){
                        cb(check.insertId)
                    }
                    else{
                        ui.alert('add-category-succes', 'Category saved succesfully!', true)
                    }
                }
            })
        }
    },

    addProject: function(project, cb){
        if(!project){
            if(cb){
                cb('Project name can not be empty!')
            }
            else{
                ui.alert('add-project-failed', 'Project name can not be empty!', false)
            }
        }
        else if(select.projectId[project]){
            if(cb){
                cb('This project is already exists!')
            }
            else{
                ui.alert('add-project-failed', 'This project is already exists!', false)
            }
        }
        else{
            var sqlStatement = "insert into projects(pj_name) values('" + project + "');"
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                if(check.insertId){
                    select.projectId[category] = check.insertId
                    select.projectName['id' + check.insertId] = project
                    select.update({className: 'select-project', value: check.insertId, text: project})
                    var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('add', 'projects', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", '"+ project + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){})
                    if(cb){
                        cb(check.insertId)
                    }
                    else{
                        ui.alert('add-project-succes', 'Project saved succesfully!', true)
                    }
                }
            })
        }
    },

    addSupplier: function(supplier, cb){
        if(!supplier){
            if(cb){
                cb('Supplier name can not be empty!')
            }
            else{
                ui.alert('add-supplier-failed', 'Supplier name can not be empty!', false)
            }
        }
        else if(select.supplierId[supplier]){
            if(cb){
                cb('This supplier is already exists!')
            }
            else{
                ui.alert('add-supplier-failed', 'This supplier is already exists!', false)
            }
        }
        else{
            var sqlStatement = "insert into suppliers(s_name) values('" + supplier + "');"
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                if(check.insertId){
                    select.supplierId[supplier] = check.insertId
                    select.supplierName['id' + check.insertId] = supplier
                    select.update({className: 'select-supplier', value: check.insertId, text: supplier})
                    var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2) values('add', 'suppliers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', "+ check.insertId + ", '"+ supplier + "');"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){})
                    if(cb){
                        cb(check.insertId)
                    }
                    else{
                        ui.alert('add-supplier-succes', 'Supplier saved succesfully!', true)
                    }
                }
            })
        }
    },

    addOffer: function(data, cb){
        if(!data){
            if(cb){
                cb('Entered offer data is empty!')
            }
            else{
                ui.alert('add-offer-failed', 'Entered offer data is empty!', false)
            }
        }
        else if(!data.product || !data.project || !data.supplier || !data.price){
            if(cb){
                cb('Any field can not be empty!')
            }
            else{
                ui.alert('add-offer-failed', 'Any field can not be empty!', false)
            }
        }
        else {
            var sqlStatement = "insert into offers(pd_id, pj_id, s_id, price, date, exchange, usd, eur) values(" + data.product + ", " + data.project + ", " + data.supplier + ", " + data.price + ", '" + data.date + "', '" + data.exchange + "', " + data.usd + ", " + data.eur + ");"
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                var sqlStatement = "insert into operations(op, op_table, op_user, op_date, col1, col2, col3, col4, col5, col6, col7, col8, col9) values('add', 'offers', '" + user.userInfo.u_name + "', '" + od.getDateNow() + "', " + check.insertId  + ",'" + data.product + "', '" + data.project + "', '" + data.supplier + "', '" + data.price + "', '" + data.exchange + "', '" + data.date + "', '" + data.usd + "', '" + data.eur + "');"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){})
                if(check){
                    if(cb){
                        cb(check.insertId)
                    }
                    else{
                        ui.alert('add-offer-succes', 'Offer saved succesfully!', true)
                    }
                }
            })
        }
    },

    addPrice: function(price, tableInfo){
        //add metal prices to db
        if(!price){
            ui.setAlertModal('Price can not get for' + tableInfo.tableName + '!</br>Please contact with <strong>Ilyas Mammadov</strong></br>Tel: +90 506 110 7443</br>E-mail: ilyas.mammadov.96@gmail.com' , false)
        }
        else if(!$.isNumeric(price)){
            ui.setAlertModal('Price must be numeric for' + tableInfo.tableName + '!</br>Please contact with <strong>Ilyas Mammadov</strong></br>Tel: +90 506 110 7443</br>E-mail: ilyas.mammadov.96@gmail.com' , false)
        }
        else {
            var sqlStatement = "insert into " + tableInfo.tableName + "(" + tableInfo.cols[0] + ", " + tableInfo.cols[1] + ") values('" + od.getDateNow() + "', " + price + ");"
            sql.query(sqlStatement, function(check){})
        }
    }
}