/////     IMPORTS
const sql = require('./public/js/modules/sql')
const select = require('./public/js/modules/select')
const ui = require('./public/js/modules/ui')
const insert = require('./public/js/modules/insert')
const od = require('./public/js/modules/outdata')
const filter = require('./public/js/modules/filter')
const del = require('./public/js/modules/delete')
const excel = require('./public/js/modules/excel')
const user = require('./public/js/modules/user')
const update = require('./public/js/modules/update')

$(document).ready(function(){
    /////     VARIABLES






    /////     OPERATIONS
    start()


    
    /////     ADD EVENTS
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


    
    /////     FILTER EVENTS
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

    

    /////     DELETE EVENTS
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


    
    /////     SELECT EVENTS
    $(document).on('change', '#head-checkbox', function(){
        ui.selectAll()
    })



    /////     PRICE EVENTS
    $(document).on('click', '.price', function(){
        filter.calcOtherVals($(this))
    })

    $(document).on('click', '#steel-price-submit', function(){
        var price = ui.readPriceAlert()
        insert.addPrice(price, {tableName: 'steelprices', cols: ['sp_date', 'sp_price']})
    })

    $(document).on('click', '#mw-amount-submit', function(){
        var price = ui.readPriceAlert()
        insert.addPrice(price, {tableName: 'minwage', cols: ['mw_date', 'mw_amount']})
    })


    
    /////     EXCEL EVENTS
    $(document).on('click', '#import-excel-submit', function(){
        excel.import(ui.readImportExcelModal())
    })

    $(document).on('click', '#export-excel-submit', function(){
        excel.export(ui.readExportExcelModal())
    })


    

    /////     UPDATE EVENTS
    $(document).on('click', '.filter-edit-icon', function(){
        var value = $(this).attr('id')
        switch(value){
            case 'o_id':
                ui.writeUpdateOfferModal(ui.readResultsRow($(this).parent().parent()))
                $('#update-offer-modal-button').click()
                break
            case 'p_id':
                ui.writeUpdateProductModal(ui.readResultsRow($(this).parent().parent()))
                $('#update-product-modal-button').click()
                break
            case 'c_id':
                ui.writeUpdateCategoryModal(ui.readResultsRow($(this).parent().parent()))
                $('#update-category-modal-button').click()
                break
            case 'pj_id':
                ui.writeUpdateProjectModal(ui.readResultsRow($(this).parent().parent()))
                $('#update-project-modal-button').click()
                break
            case 's_id':
                ui.writeUpdateSupplierModal(ui.readResultsRow($(this).parent().parent()))
                $('#update-supplier-modal-button').click()
                break
        }
    })

    $(document).on('click', '#update-supplier-submit', function(){
        update.updateSupplier(ui.readUpdateSupplierModal())
    })

    $(document).on('click', '#update-project-submit', function(){
        update.updateProject(ui.readUpdateProjectModal())
    })

    $(document).on('click', '#update-category-submit', function(){
        update.updateCategory(ui.readUpdateCategoryModal())
    })

    $(document).on('click', '#update-product-submit', function(){
        update.updateProduct(ui.readUpdateProductModal())
    })

    $(document).on('click', '#update-offer-submit', function(){
        update.updateOffer(ui.readUpdateOfferModal())
    })

    
    

    /////     USER EVENTS
    $(document).on('click', '#login-modal-submit', function(){
        user.login(ui.readLoginModal())
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

        const electron = require('electron')
        const ipc = electron.ipcRenderer
        
        ipc.send('update-notify-value', 'merhabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    }
})