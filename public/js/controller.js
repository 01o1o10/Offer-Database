/////     IMPORTS
const sql = require('./public/js/modules/sql')
const select = require('./public/js/modules/select')
const ui = require('./public/js/modules/ui')
const insert = require('./public/js/modules/insert')
const od = require('./public/js/modules/outdata')
const filter = require('./public/js/modules/filter')
const del = require('./public/js/modules/delete')
const excel = require('./public/js/modules/excel')
const login = require('./public/js/modules/login')

$(document).ready(function(){
    /////     VARIABLES






    /////     OPERATIONS
    start()

    $(document).on('click', '#add-product-submit', function(){
        insert.addProduct(ui.readAddProductModal())
    })

    $(document).on('click', '#add-category-submit', function(){
        insert.addCategory(ui.readAddCategoryModal())
    })

    $(document).on('click', '#add-project-submit', function(){
        insert.addProject(ui.readAddProjectModal())
    })

    $(document).on('click', '#add-supplier-submit', function(){
        insert.addSupplier(ui.readAddSupplierModal())
    })

    $(document).on('click', '#add-offer-submit', function(){
        var data = ui.readAddOfferModal()
        if(data.date == od.getDateNow()){
            od.setExchangeRateNow(function(exchange){
                data.usd = exchange[0].selling
                data.eur = exchange[1].selling
                insert.addOffer(data)
            })
        }
        else{
            od.getDollarRate(data.date, function(rate1){
                data.usd = rate1
                od.getEuroRate(data.date, function(rate2){
                    data.eur = rate2
                    insert.addOffer(data)
                })
            })
        }
    })

    $(document).on('click', '#filter-product-submit', function(){
        filter.filterProducts(ui.readFilterProductModal())
    })

    $(document).on('click', '#filter-category-submit', function(){
        filter.filterCategories()
    })

    $(document).on('click', '#filter-project-submit', function(){
        filter.filterProjects()
    })

    $(document).on('click', '#filter-supplier-submit', function(){
        filter.filterSuppliers()
    })

    $(document).on('click', '#filter-offer-submit', function(){
        filter.filterOffers(ui.readFilterOfferModal())
    })

    $(document).on('click', '#filter-offer-min-prices', function(){
        filter.filterMinPrices()
    })

    $(document).on('click', '#filter-offer-max-prices', function(){
        filter.filterMaxPrices()
    })

    $(document).on('click', '#delete-products', function(){
        del.deleteData(ui.getSelectedRowsId(), {tableName: 'products', idColName: 'p_id'})
    })

    $(document).on('click', '#delete-categories', function(){
        del.deleteData(ui.getSelectedRowsId(), {tableName: 'categories', idColName: 'c_id'})
    })

    $(document).on('click', '#delete-projects', function(){
        del.deleteData(ui.getSelectedRowsId(), {tableName: 'projects', idColName: 'p_id'})
    })

    $(document).on('click', '#delete-suppliers', function(){
        del.deleteData(ui.getSelectedRowsId(), {tableName: 'suppliers', idColName: 's_id'})
    })

    $(document).on('click', '#delete-offers', function(){
        del.deleteData(ui.getSelectedRowsId(), {tableName: 'offers', idColName: 'o_id'})
    })

    $(document).on('change', '#head-checkbox', function(){
        ui.selectAll()
    })

    $(document).on('click', '.price', function(){
        filter.calcOtherVals($(this))
    })

    $(document).on('click', '#steel-price-submit', function(){
        var price = ui.readPriceAlert()
        insert.addPrice(price, {tableName: 'steelprices', cols: ['sp_date', 'sp_price']})
    })

    $(document).on('click', '#cuprum-price-submit', function(){
        var price = ui.readPriceAlert()
        insert.addPrice(price, {tableName: 'scuprumprices', cols: ['cp_date', 'cp_price']})
    })

    $(document).on('click', '#lead-price-submit', function(){
        var price = ui.readPriceAlert()
        insert.addPrice(price, {tableName: 'leadprices', cols: ['lp_date', 'lp_price']})
    })

    $(document).on('click', '#zinc-price-submit', function(){
        var price = ui.readPriceAlert()
        insert.addPrice(price, {tableName: 'zincprices', cols: ['zp_date', 'zp_price']})
    })

    $(document).on('click', '#mw-amount-submit', function(){
        var price = ui.readPriceAlert()
        insert.addPrice(price, {tableName: 'minwage', cols: ['mw_date', 'mw_amount']})
    })

    $(document).on('click', '#import-excel-submit', function(){
        excel.import(ui.readImportExcelModal())
    })

    $(document).on('click', '#export-excel-submit', function(){
        excel.export(ui.readExportExcelModal())
    })

    $(document).on('click', '#login-modal-submit', function(){
        login.login(ui.readLoginModal())
    })





    /////     FUNCTIONS
    function start(){
        sql.startconnection()
        select.getOptions('select-category')
        select.getOptions('select-product')
        select.getOptions('select-project')
        select.getOptions('select-supplier')
        ui.writeDate('add-offer-date', od.getDateNow())
        od.setExchangeRateNow()
        od.setInflationTableToDb()
        od.setSteelCurrentPrice()
        od.setMwCurrentAmount()
    }
})