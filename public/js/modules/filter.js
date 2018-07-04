module.exports = {
    filterProducts: function(categories){
        console.log(categories)
        var sqlStatement = "select p_id, p_name, c_name from products p, categories c where p.c_id=c.c_id"
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
            ui.setResults(data, ['Product', 'Category', 'Inflation', 'Steel', 'Cuprum', 'Lead', 'Workmanship'], 'delete-products')
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
                ui.alert('filter-offer-failed', '<strong>Failed!</strong> Price must be numeric!')
            }
        }

        if(filter.maxPrice){
            if($.isNumeric(filter.maxPrice)){
                sqlStatement += ' and o.price<=' + parseFloat(filter.maxPrice)
            }
            else {
                ui.alert('filter-offer-failed', '<strong>Failed!</strong> Price must be numeric!')
            }
        }

        sqlStatement += " and o.date>='" + filter.date1 + "' and o.date<='" + filter.date2 + "'"

        if(filter.sort != 'sort'){
            sqlStatement += " ORDER BY " + filter.sort + " " + filter.ascDesc
        }
        sqlStatement += ";"
        
        console.log(sqlStatement)
        sql.query(sqlStatement, function(data){
            ui.setResults(data, ['Product', 'Category', 'Project', 'Supplier', 'Price', 'Exchange', 'Date', '$', '€', 'Inf'], 'delete-offers')
        })
    },

    filterMinPrices: function(){
        var sqlStatement = "select o.o_id, pd.p_name as product, c.c_name, pj.p_name as project, s.s_name, min(o.price), o.exchange, substr(o.date, 0, 12) as date, o.usd, o.eur, (1.0 + ((select case when sum(inf) is null then 0 else sum(inf) end from inflation where left(date, 7)>=left(o.date, 7))/100)) as inf from products pd, categories c, projects pj, suppliers s, offers o where (pd.c_id=c.c_id and o.pd_id=pd.p_id and o.pj_id=pj.p_id and o.s_id=s.s_id) group by pd.p_name"
        sql.query(sqlStatement, function(data){
            ui.setResults(data, ['Product', 'Category', 'Project', 'Supplier', 'Price', 'Exchange', 'Date', '$', '€', 'Inf'], 'delete-offers')
        })
    },

    filterMaxPrices: function(){
        var sqlStatement = "select o.o_id, pd.p_name as product, c.c_name, pj.p_name as project, s.s_name, max(o.price), o.exchange, substr(o.date, 0, 12) as date, o.usd, o.eur, (1.0 + ((select case when sum(inf) is null then 0 else sum(inf) end from inflation where left(date, 7)>=left(o.date, 7))/100)) as inf from products pd, categories c, projects pj, suppliers s, offers o where (pd.c_id=c.c_id and o.pd_id=pd.p_id and o.pj_id=pj.p_id and o.s_id=s.s_id) group by pd.p_name"
        sql.query(sqlStatement, function(data){
            ui.setResults(data, ['Product', 'Category', 'Project', 'Supplier', 'Price', 'Exchange', 'Date', '$', '€', 'Inf'], 'delete-offers')
        })
    },

    calcOtherVals: function(price){
        var data = {}
        var priceInfo = ui.readPriceInfo(price.parent())
        
        if(!price.children().length){
            data.cell11 = '1'
            data.cell12 = priceInfo.usd
            data.cell13 = priceInfo.eur

            data.cell31 = priceInfo.inf
            data.cell32 = od.getDollarRate()
            data.cell33 = od.getEuroRate()
            
            if(priceInfo.type == 'TL'){
                data.cell21 = priceInfo.price
                data.cell22 = Math.round(parseFloat(priceInfo.price) / parseFloat(priceInfo.usd))
                data.cell23 = Math.round(parseFloat(priceInfo.price) / parseFloat(priceInfo.eur))

                data.cell41 = parseFloat(priceInfo.price) * parseFloat(priceInfo.inf)
                data.cell42 = Math.round(parseFloat(priceInfo.price) * parseFloat(priceInfo.inf) / od.getDollarRate())
                data.cell43 = Math.round(parseFloat(priceInfo.price) * parseFloat(priceInfo.inf) / od.getEuroRate())
            }
            else if(priceInfo.type == '$'){
                data.cell21 = Math.round(Math.round(parseFloat(priceInfo.price) * parseFloat(priceInfo.usd)))
                data.cell22 = priceInfo.price
                data.cell23 = Math.round(parseFloat(priceInfo.price) / (parseFloat(priceInfo.eur)/parseFloat(priceInfo.usd)))

                data.cell41 = Math.round(parseFloat(priceInfo.price) * od.getDollarRate() * parseFloat(priceInfo.inf))
                data.cell42 = priceInfo.price
                data.cell43 = Math.round(parseFloat(priceInfo.price) / (od.getEuroRate()/od.getDollarRate()))
            }
            else{
                data.cell21 = Math.round(parseFloat(priceInfo.price) * parseFloat(priceInfo.eur))
                data.cell22 = Math.round(parseFloat(priceInfo.price) * (parseFloat(priceInfo.eur)/parseFloat(priceInfo.usd)))
                data.cell23 = priceInfo.price

                data.cell41 = Math.round(parseFloat(priceInfo.price) * od.getEuroRate() * parseFloat(priceInfo.inf))
                data.cell42 = Math.round(parseFloat(priceInfo.price) * (od.getEuroRate()/od.getDollarRate()))
                data.cell43 = priceInfo.price
            }
        }
        console.log(data)
        ui.showOtherVals(price, data)
    }
}