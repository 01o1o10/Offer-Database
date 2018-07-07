module.exports = {
    filterProducts: function(categories){
        console.log(categories)
        var sqlStatement = "select p_id, p_name, c_name, inf_effect, steel_effect, cup_effect, lead_effect, zinc_effect, wms_effect from products p, categories c where p.c_id=c.c_id"
        if(categories.length == 1){
            sqlStatement += " and p.c_id=" + categories[0]
        }
        else if(categories.length > 1){
            sqlStatement += " and (p.c_id=" + categories[0]
            for(var i = 1; i < categories.length; i++){
                sqlStatement += " or p.c_id=" + categories[i]
            }
            sqlStatement += ")"
        }
        sqlStatement += ";"

        console.log(sqlStatement)
        sql.query(sqlStatement, function(data){
            ui.setResults(data, ['Product', 'Category', 'Inflation', 'Steel', 'Cuprum', 'Lead', 'Zinc', 'Workmanship'], 'delete-products')
        })
    },

    filterCategories: function(){
        sql.query('select * from categories;', function(data){
            ui.setResults(data, ['Category'], 'delete-categories')
        })
    },

    filterProjects: function(){
        sql.query('select * from projects;', function(data){
            ui.setResults(data, ['Project'], 'delete-projects')
        })
    },

    filterSuppliers: function(){
        sql.query('select * from suppliers;', function(data){
            ui.setResults(data, ['Supplier'], 'delete-suppliers')
        })
    },

    filterOffers: function(filter){
        var sqlStatement = "select o.o_id, pd.p_name as product, c.c_name, pj.p_name as project, s.s_name, o.price, o.exchange, substr(o.date, 1, 12) as date, o.usd, o.eur, (1.0 + ((select case when sum(inf) is null then 0 else sum(inf) end from inflation where left(date, 7)>=left(o.date, 7))/100)) as inf from products pd, categories c, projects pj, suppliers s, offers o where (pd.c_id=c.c_id and o.pd_id=pd.p_id and o.pj_id=pj.p_id and o.s_id=s.s_id)"

        
        if(filter.products.length == 1){
            sqlStatement += " and pd.p_id=" + data.products[0]
        }
        else if(filter.products.length > 1){
            sqlStatement += " and (pd.p_id=" + filter.products[0]
            for(var i = 1; i < filter.products.length; i++){
                sqlStatement += " or pd.p_id=" + filter.products[i]
            }
            sqlStatement += ")"
        }
        
        if(filter.categories.length == 1){
            sqlStatement += " and c.c_id=" + filter.categories[0]
        }
        else if(filter.categories.length > 1){
            sqlStatement += " and (c.c_id=" + filter.categories[0]
            for(var i = 1; i < filter.categories.length; i++){
                sqlStatement += " or c.c_id=" + filter.categories[i]
            }
            sqlStatement += ")"
        }
        
        if(filter.projects.length == 1){
            sqlStatement += " and pd.p_id=" + filter.projects[0]
        }
        else if(filter.projects.length > 1){
            sqlStatement += " and (pd.p_id=" + filter.projects[0]
            for(var i = 1; i < filter.projects.length; i++){
                sqlStatement += " or pd.p_id=" + filter.projects[i]
            }
            sqlStatement += ")"
        }
        
        if(filter.suppliers.length == 1){
            sqlStatement += " and s.s_id=" + filter.suppliers[0]
        }
        else if(filter.suppliers.length > 1){
            sqlStatement += " and (s.s_id=" + filter.suppliers[0]
            for(var i = 1; i < filter.suppliers.length; i++){
                sqlStatement += " or s.s_id=" + filter.suppliers[i]
            }
            sqlStatement += ")"
        }
        
        if(filter.exchange != 'all'){
            sqlStatement += " and o.exchange='" + filter.exchange + "'"
        }
        
        if(filter.minPrice){
            if($.isNumeric(filter.minPrice)){
                sqlStatement += ' and o.price>=' + parseFloat(filter.minPrice)
            }
            else {
                ui.alert('filter-offer-failed', 'Price must be numeric!', false)
            }
        }

        if(filter.maxPrice){
            if($.isNumeric(filter.maxPrice)){
                sqlStatement += ' and o.price<=' + parseFloat(filter.maxPrice)
            }
            else {
                ui.alert('filter-offer-failed', 'Price must be numeric!', false)
            }
        }

        sqlStatement += " and o.date>='" + filter.date1 + "' and o.date<='" + filter.date2 + "'"

        if(filter.sort != 'sort'){
            sqlStatement += " ORDER BY " + filter.sort + " " + filter.ascDesc
        }
        sqlStatement += ";"
        
        console.log(sqlStatement)
        sql.query(sqlStatement, function(data){
            ui.setResults(data, ['Product', 'Category', 'Project', 'Supplier', 'Price', 'Exchange', 'Date'], 'delete-offers')
        })
    },

    filterMinPrices: function(){
        var sqlStatement = "select o.o_id, pd.p_name as product, c.c_name, pj.p_name as project, s.s_name, min(o.price), o.exchange, substr(o.date, 0, 12) as date, o.usd, o.eur, (1.0 + ((select case when sum(inf) is null then 0 else sum(inf) end from inflation where left(date, 7)>=left(o.date, 7))/100)) as inf from products pd, categories c, projects pj, suppliers s, offers o where (pd.c_id=c.c_id and o.pd_id=pd.p_id and o.pj_id=pj.p_id and o.s_id=s.s_id) group by pd.p_name"
        sql.query(sqlStatement, function(data){
            ui.setResults(data, ['Product', 'Category', 'Project', 'Supplier', 'Price', 'Exchange', 'Date'], 'delete-offers')
        })
    },

    filterMaxPrices: function(){
        var sqlStatement = "select o.o_id, pd.p_name as product, c.c_name, pj.p_name as project, s.s_name, max(o.price), o.exchange, substr(o.date, 0, 12) as date, o.usd, o.eur, (1.0 + ((select case when sum(inf) is null then 0 else sum(inf) end from inflation where left(date, 7)>=left(o.date, 7))/100)) as inf from products pd, categories c, projects pj, suppliers s, offers o where (pd.c_id=c.c_id and o.pd_id=pd.p_id and o.pj_id=pj.p_id and o.s_id=s.s_id) group by pd.p_name"
        sql.query(sqlStatement, function(data){
            ui.setResults(data, ['Product', 'Category', 'Project', 'Supplier', 'Price', 'Exchange', 'Date'], 'delete-offers')
        })
    },

    calcOtherVals: function(price){
        if(!price.children().length){
            var data = {}
            var rowInfo = ui.readResultsRow(price.parent())
            var effect = {}

            sql.query("select * from products where p_name='" + rowInfo.product + "';", function(data1){
                sql.query("select sp_price from steelprices where sp_date='" + rowInfo.date + "' or sp_date='" + od.getDateNow() + "' order by sp_date asc;", function(data2){
                    if(data2.length == 0){
                        ui.alert('alert-modal-failed', 'Your steel material price is missing!', false)
                    }
                    else if(data2.length == 1){
                        data2[1] = {}
                        data2[1].sp_price = data2[0].sp_price
                    }
                    od.getMetalPrice(od.getDateNow(), 'CU', function(price11){
                        od.getMetalPrice(rowInfo.date, 'CU', function(price12){
                            effect.cup = data1[0].cup_effect* ((price11/price12) - 1)
                            od.getMetalPrice(od.getDateNow(), 'PB', function(price21){
                                od.getMetalPrice(rowInfo.date, 'PB', function(price22){
                                    effect.lead = data1[0].cup_effect* ((price21/price22) - 1)
                                    od.getMetalPrice(od.getDateNow(), 'ZI', function(price31){
                                        od.getMetalPrice(rowInfo.date, 'ZI', function(price32){
                                            effect.zinc = data1[0].cup_effect* ((price31/price32) - 1)
                                            sql.query("select mw_amount from minwage where left(mw_date, 4)='" + rowInfo.date.substr(0, 4) + "' or left(mw_date, 4)='" + od.getDateNow().substr(0, 4) + "' order by mw_date asc;", function(data6){
                                                if(data6.length == 0){
                                                    ui.alert('alert-modal-failed', 'Minimum wage is missing!', false)
                                                }
                                                else if(data6.length == 1){
                                                    data6[1] = {}
                                                    data6[1].mw_amount = data6[0].mw_amount
                                                }
            
                                                effect.inf = data1[0].inf_effect * (rowInfo.inf - 1)
                                                effect.steel = data1[0].steel_effect*((data2[1].sp_price/data2[0].sp_price) - 1)
                                                effect.wms = data1[0].wms_effect*((data6[1].mw_amount/data6[0].mw_amount) - 1)
            
                                                var ce =  1 + effect.inf + effect.steel + effect.cup + effect.lead + effect.zinc + effect.wms
            
                                                console.log(effect, ce)
            
                                                data.cell11 = '1'
                                                data.cell12 = rowInfo.usd
                                                data.cell13 = rowInfo.eur
            
                                                data.cell31 = rowInfo.inf
                                                data.cell32 = od.getDollarRate()
                                                data.cell33 = od.getEuroRate()
            
                                                if(rowInfo.type == 'TL'){
                                                    data.cell21 = rowInfo.price
                                                    data.cell22 = Math.round(parseFloat(rowInfo.price) / parseFloat(rowInfo.usd))
                                                    data.cell23 = Math.round(parseFloat(rowInfo.price) / parseFloat(rowInfo.eur))
                                    
                                                    data.cell41 = Math.round(parseFloat(rowInfo.price) * ce)
                                                    data.cell42 = Math.round(parseFloat(rowInfo.price) * ce / od.getDollarRate())
                                                    data.cell43 = Math.round(parseFloat(rowInfo.price) * ce / od.getEuroRate())
                                                }
                                                else if(rowInfo.type == '$'){
                                                    data.cell21 = Math.round(Math.round(parseFloat(rowInfo.price) * parseFloat(rowInfo.usd)))
                                                    data.cell22 = rowInfo.price
                                                    data.cell23 = Math.round(parseFloat(rowInfo.price) / (parseFloat(rowInfo.eur)/parseFloat(rowInfo.usd)))
                                    
                                                    data.cell41 = Math.round(parseFloat(rowInfo.price) * od.getDollarRate() * ce)
                                                    data.cell42 = Math.round(rowInfo.price * ce)
                                                    data.cell43 = Math.round(parseFloat(rowInfo.price) * ce / (od.getEuroRate()/od.getDollarRate()))
                                                }
                                                else{
                                                    data.cell21 = Math.round(parseFloat(rowInfo.price) * parseFloat(rowInfo.eur))
                                                    data.cell22 = Math.round(parseFloat(rowInfo.price) * (parseFloat(rowInfo.eur)/parseFloat(rowInfo.usd)))
                                                    data.cell23 = rowInfo.price
                                    
                                                    data.cell41 = Math.round(parseFloat(rowInfo.price) * ce * od.getEuroRate())
                                                    data.cell42 = Math.round(parseFloat(rowInfo.price) * ce * (od.getEuroRate()/od.getDollarRate()))
                                                    data.cell43 = Math.round(rowInfo.price * ce)
                                                }
                                                
                                                ui.showOtherVals(price, data)
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
        else {
            ui.showOtherVals(price, data)
        }
    }
}