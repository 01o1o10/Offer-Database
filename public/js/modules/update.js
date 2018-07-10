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
            else if(!data.product || !data.inf || !data.steel || !data.cup || !data.lead || !data.zinc || !data.wms){
                ui.alert('update-product-failed', 'Fields can not be empty!', false)
            }
            else if(!$.isNumeric(data.inf) || !$.isNumeric(data.steel) || !$.isNumeric(data.cup) || !$.isNumeric(data.lead) || !$.isNumeric(data.zinc) || !$.isNumeric(data.wms)){
                ui.alert('update-product-failed', 'Inflation, Steel, Cuprum, Lead and Workmanship fields must be numeric!', false)
            }
            else{
                var sqlStatement = "update products set c_id=" + data.category + ", p_name='" + data.product + "', inf_effect=" + data.inf + ", steel_effect=" + data.steel + ", cup_effect=" + data.cup + ", lead_effect=" + data.lead + ", zinc_effect=" + data.zinc + ", wms_effect=" + data.wms + " where p_id=" + data.id + ";"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    ui.alert('update-product-succes', 'Product updated succesfully!', true)
                })
            }
        }
    },

    updateCategory: function(data){
        if(!data.category){
            ui.alert('update-category-failed', 'Category name can not be empty!', false)
        }
        else{
            var sqlStatement = "update categories set c_name='" + data.category + "' where c_id=" + data.id + ";"
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                ui.alert('update-category-succes', 'Category udated succesfully!', true)
            })
        }
    },

    updateProject: function(data){
        if(!data.project){
            ui.alert('update-project-failed', 'Project name can not be empty!', false)
        }
        else{
            var sqlStatement = "update projects set pj_name='" + data.project + "' where pj_id=" + data.id + ";"
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                ui.alert('update-project-succes', 'Project udated succesfully!', true)
            })
        }
    },

    updateSupplier: function(data){
        if(!data.supplier){
            ui.alert('update-supplier-failed', 'Supplier name can not be empty!', false)
        }
        else{
            var sqlStatement = "update suppliers set s_name='" + data.supplier + "' where s_id=" + data.id + ";"
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                ui.alert('update-supplier-succes', 'Supplier udated succesfully!', true)
            })
        }
    },

    updateOffer: function(data, cb){
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
                var sqlStatement = "update offers set pd_id=" + data.product + ", pj_id=" + data.project + ", s_id=" + data.supplier + ", price=" + data.price + ", date='" + data.date + "', exchange='" + data.exchange + "' where o_id=" + data.id + ";"
                console.log(sqlStatement)
                sql.query(sqlStatement, function(check){
                    ui.alert('update-offer-succes', 'Offer saved succesfully!', true)
                })
            }
        }
    }
}