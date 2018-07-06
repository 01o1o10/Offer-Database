module.exports = {

    addProduct: function(data){
        if(!data){
            ui.alert('add-product-failed', '<strong>Failed!</strong> Entered product data is empty!')
        }
        else{
            if(!data.category){
               ui.alert('add-product-failed', '<strong>Failed!</strong> Please select a category!')
            }
            else if(!data.product || !data.inf || !data.steel || !data.cup || !data.lead || !data.wms){
                ui.alert('add-product-failed', '<strong>Failed!</strong> Fields can not be empty!')
            }
            else if(!$.isNumeric(data.inf) || !$.isNumeric(data.steel) || !$.isNumeric(data.cup) || !$.isNumeric(data.lead) || !$.isNumeric(data.wms)){
                ui.alert('add-product-failed', '<strong>Failed!</strong> Inflation, Steel, Cuprum, Lead and Workmanship fields must be numeric!')
            }
            else{
                sql.query("select * from products where p_name='" + data.product + "';", function(product){
                    if(product.length  != 0){
                        ui.alert('add-product-failed', '<strong>Failed!</strong> This product is already exists!')
                    }
                    else{
                        var sqlStatement = "insert into products(c_id, p_name, inf_effect, steel_effect, cup_effect, lead_effect, zinc_effect, wms_effect) values(" + data.category + ",'" + data.product + "', " + data.inf + ", " + data.steel + ", " + data.cup + ", " + data.lead + ", " + data.zinc + ", " + data.wms + ");"
                        sql.query(sqlStatement, function(check){
                            if(check.insertId){
                                console.log(sqlStatement)
                                ui.alert('add-product-succes', '<strong>Success!</strong> Product saved succesfully!')
                            }
                        })
                    }
                })
            }
        }
    },

    addCategory: function(category){
        if(!category){
            ui.alert('add-category-failed', '<strong>Failed!</strong> Category name can not be empty!')
        }
        else{
            sql.query("select * from categories where c_name='" + category + "';", function(categoryCheck){
                if(categoryCheck.length != 0){
                    ui.alert('add-category-failed', '<strong>Failed!</strong> This category is already exists!')
                }
                else{
                    var sqlStatement = "insert into categories(c_name) values('" + category + "');"
                    sql.query(sqlStatement, function(check){
                        if(check.insertId){
                            console.log(sqlStatement)
                            ui.alert('add-category-succes', '<strong>Success!</strong> Category saved succesfully!')
                        }
                    })
                }
            })
        }
    },

    addProject: function(project){
        if(!project){
            ui.alert('add-project-failed', '<strong>Failed!</strong> Project name can not be empty!')
        }
        else{
            sql.query("select * from projects where p_name='" + project + "';", function(projectCheck){
                if(projectCheck.length != 0){
                    ui.alert('add-project-failed', '<strong>Failed!</strong> This project is already exists!')
                }
                else{
                    var sqlStatement = "insert into projects(p_name) values('" + project + "');"
                    sql.query(sqlStatement, function(check){
                        if(check.insertId){
                            console.log(sqlStatement)
                            ui.alert('add-project-succes', '<strong>Success!</strong> Project saved succesfully!')
                        }
                    })
                }
            })
        }
    },

    addSupplier: function(supplier){
        if(!supplier){
            ui.alert('add-supplier-failed', '<strong>Failed!</strong> Supplier name can not be empty!')
        }
        else{
            sql.query("select * from suppliers where s_name='" + supplier + "';", function(supplierCheck){
                if(supplierCheck.length != 0){
                    ui.alert('add-supplier-failed', '<strong>Failed!</strong> This supplier is already exists!')
                }
                else{
                    var sqlStatement = "insert into suppliers(s_name) values('" + supplier + "');"
                    sql.query(sqlStatement, function(check){
                        if(check.insertId){
                            console.log(sqlStatement)
                            ui.alert('add-supplier-succes', '<strong>Success!</strong> Supplier saved succesfully!')
                        }
                    })
                }
            })
        }
    },

    addOffer: function(data){
        if(!data){
            ui.alert('add-offer-failed', '<strong>Failed!</strong> Entered offer data is empty!')
        }
        else if(!data.product && !data.project && !data.supplier && !data.price){
            ui.alert('add-offer-failed', '<strong>Failed!</strong> Any field can not be empty!')
        }
        else {
            if(!$.isNumeric(data.price)){
                ui.alert('add-offer-failed', '<strong>Failed!</strong> Price must be numeric!')
            }
            else {
                var sqlStatement = "insert into offers(pd_id, pj_id, s_id, price, date, exchange, usd, eur) values(" + data.product + ", " + data.project + ", " + data.supplier + ", " + data.price + ", '" + data.date + "', '" + data.exchange + "', " + data.usd + ", " + data.eur + ");"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    if(check.insertId){
                        ui.alert('add-offer-succes', '<strong>Success!</strong> Offer saved succesfully!')
                    }
                })
            }
        }
    },

    addPrice: function(price, tableInfo){
        if(!price){
            ui.alert('alert-modal-failed', 'Price can not be empty!')
        }
        else if(!$.isNumeric(price)){
            ui.alert('alert-modal-failed', 'Price must be numeric!')
        }
        else {
            var sqlStatement = "insert into " + tableInfo.tableName + "(" + tableInfo.cols[0] + ", " + tableInfo.cols[1] + ") values('" + od.getDateNow() + "', " + price + ");"
            sql.query(sqlStatement, function(check){
                ui.alert('alert-modal-succes', 'Price insert process is ok!')
            })
        }
    }
}