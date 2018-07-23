/////     IMPORTS
const sql = require('./public/js/modules/sql')
const select = require('./public/js/modules/select')
const ui = require('./public/js/modules/ui')
const insert = require('./public/js/modules/insert')
const od = require('./public/js/modules/outdata')
const filter = require('./public/js/modules/filter')
const del = require('./public/js/modules/delete')
const excel = require('./public/js/modules/excel')
const update = require('./public/js/modules/update')
const user = require('./public/js/modules/user')
const action = require('./public/js/modules/action')





/////     VARIABLES






$(document).ready(function(){
    /////     OPERATIONS
    start()
    $('#filter-action-type').SumoSelect({placeholder: 'Select action type...'});
    $('#filter-action-data').SumoSelect({placeholder: 'Select effected data...'});


    
    /////     ADD EVENTS
    $(document).on('click', '#add-product-submit', function(){
        if(user.userInfo.u_aut.charAt(0) == '1'){
            insert.addProduct(ui.readAddProductModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#add-category-submit', function(){
        if(user.userInfo.u_aut.charAt(1) == '1'){
            insert.addCategory(ui.readAddCategoryModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#add-project-submit', function(){
        if(user.userInfo.u_aut.charAt(2) == '1'){
            insert.addProject(ui.readAddProjectModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#add-supplier-submit', function(){
        if(user.userInfo.u_aut.charAt(3) == '1'){
            insert.addSupplier(ui.readAddSupplierModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#add-offer-submit', function(){
        if(user.userInfo.u_aut.charAt(4) == '1'){
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
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })


    
    /////     FILTER EVENTS
    $(document).on('click', '#filter-product-submit', function(){
        if(user.userInfo.u_aut.charAt(5) == '1'){
            filter.filterProducts(ui.readFilterProductModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#filter-category-submit', function(){
        if(user.userInfo.u_aut.charAt(6) == '1'){
            filter.filterCategories()
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#filter-project-submit', function(){
        if(user.userInfo.u_aut.charAt(7) == '1'){
            filter.filterProjects()
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#filter-supplier-submit', function(){
        if(user.userInfo.u_aut.charAt(8) == '1'){
            filter.filterSuppliers()
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#filter-offer-submit', function(){
        if(user.userInfo.u_aut.charAt(9) == '1'){
            filter.filterOffers(ui.readFilterOfferModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#filter-offer-min-prices', function(){
        if(user.userInfo.u_aut.charAt(10) == '1'){
            filter.filterMinPrices()
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#filter-offer-max-prices', function(){
        if(user.userInfo.u_aut.charAt(11) == '1'){
            filter.filterMaxPrices()
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    

    /////     DELETE EVENTS
    $(document).on('click', '#delete-products', function(){
        if(user.userInfo.u_aut.charAt(12) == '1'){
            del.deleteData(ui.getSelectedRowsId(), {tableName: 'products', idColName: 'p_id'})
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#delete-categories', function(){
        if(user.userInfo.u_aut.charAt(13) == '1'){
            del.deleteData(ui.getSelectedRowsId(), {tableName: 'categories', idColName: 'c_id'})
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#delete-projects', function(){
        if(user.userInfo.u_aut.charAt(14) == '1'){
            del.deleteData(ui.getSelectedRowsId(), {tableName: 'projects', idColName: 'pj_id'})
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#delete-suppliers', function(){
        if(user.userInfo.u_aut.charAt(15) == '1'){
            del.deleteData(ui.getSelectedRowsId(), {tableName: 'suppliers', idColName: 's_id'})
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#delete-offers', function(){
        if(user.userInfo.u_aut.charAt(16) == '1'){
            del.deleteData(ui.getSelectedRowsId(), {tableName: 'offers', idColName: 'o_id'})
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })


    
    /////     SELECT EVENTS
    $(document).on('change', '#head-checkbox', function(){
        ui.selectAll()
    })

    $(document).on('sumo:closed', '#filter-offer-category', function(sumo) {
        var sel = $('#filter-offer-product')[0]
        var categories = $('#filter-offer-category').val()
        select.setingSelectProduct(sel, categories)
    });




    

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
            case 'u_id':
                ui.writeUpdateUserModal(ui.readResultsRow($(this).parent().parent()))
                $('#update-user-modal-button').click()
                break
            case 'categoryid':
                ui.writeUpdateUserCategoryModal(ui.readResultsRow($(this).parent().parent()))
                $('#update-user-category-modal-button').click()
                break
        }
    })

    $(document).on('click', '#update-supplier-submit', function(){
        if(user.userInfo.u_aut.charAt(17) == '1'){
            update.updateSupplier(ui.readUpdateSupplierModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#update-project-submit', function(){
        if(user.userInfo.u_aut.charAt(18) == '1'){
            update.updateProject(ui.readUpdateProjectModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#update-category-submit', function(){
        if(user.userInfo.u_aut.charAt(19) == '1'){
            update.updateCategory(ui.readUpdateCategoryModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#update-product-submit', function(){
        if(user.userInfo.u_aut.charAt(20) == '1'){
            update.updateProduct(ui.readUpdateProductModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#update-offer-submit', function(){
        if(user.userInfo.u_aut.charAt(21) == '1'){
            var data = ui.readUpdateOfferModal()
            if(data.date == od.getDateNow()){
                od.setExchangeRateNow(function(exchange){
                    data.usd = exchange[0].selling
                    data.eur = exchange[1].selling
                    update.updateOffer(data)
                })
            }
            else{
                od.getDollarRate(data.date, function(rate1){
                    data.usd = rate1
                    od.getEuroRate(data.date, function(rate2){
                        data.eur = rate2
                        update.updateOffer(data)
                    })
                })
            }
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })




    
    /////     EXCEL EVENTS

    $(document).on('click', '#export-excel-submit', function(){
        if(user.userInfo.u_aut.charAt(23) == '1'){
            excel.export(ui.readExportExcelModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#import-excel-submit', function(){
        if(user.userInfo.u_aut.charAt(22) == '1'){
            excel.import(ui.readImportExcelModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })





    /////     PRICE EVENTS
    $(document).on('click', '.price', function(){
        if(user.userInfo.u_aut.charAt(24) == '1'){
            filter.calcOtherVals($(this))
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#steel-price-submit', function(){
        if(user.userInfo.u_aut.charAt(25) == '1'){
            var price = ui.readPriceAlert()
            insert.addPrice(price, {tableName: 'steelprices', cols: ['sp_date', 'sp_price']})
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#mw-amount-submit', function(){
        if(user.userInfo.u_aut.charAt(26) == '1'){
            var price = ui.readPriceAlert()
            insert.addPrice(price, {tableName: 'minwage', cols: ['mw_date', 'mw_amount']})
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })






    /////     USER EVENTS

    $(document).on('click', '#add-user-submit', function(){
        if(user.userInfo.u_aut.charAt(27) == '1'){
            user.addUser(ui.readAddUserModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#filter-user-submit', function(){
        if(user.userInfo.u_aut.charAt(28) == '1'){
            user.filterUser(ui.readFilterUserModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#delete-users', function(){
        if(user.userInfo.u_aut.charAt(29) == '1'){
            del.deleteData(ui.getSelectedRowsId(), {tableName: 'users', idColName: 'u_id'})
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#update-user-submit', function(){
        if(user.userInfo.u_aut.charAt(30) == '1'){
            user.updateUser(ui.readUpdateUserModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })
    
    /////     USER CATEGORY EVENTS
    $(document).on('click', '#add-user-category-submit', function(){
        if(user.userInfo.u_aut.charAt(31) == '1'){
            user.addUserCategory(ui.readAddUserCategoryModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#filter-user-category-submit', function(){
        if(user.userInfo.u_aut.charAt(32) == '1'){
            user.filterUserCategories()
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#delete-user-categories', function(){
        if(user.userInfo.u_aut.charAt(34) == '1'){
            del.deleteData(ui.getSelectedRowsId(), {tableName: 'usercategories', idColName: 'categoryid'})
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    $(document).on('click', '#update-user-category-submit', function(){
        if(user.userInfo.u_aut.charAt(33) == '1'){
            user.updateUserCategory(ui.readUpdateUserCategoryModal())
        }
        else{
            ui.setAlertModal('Permission dained!', false)
        }
    })

    /////     USER SELF EVENTS
    $(document).on('click', '#user-change-password-submit', function(){
        user.changePassword(ui.readChangePasswordModal())
    })

    $(document).on('click', '#user-authorities-button', function(){
        ui.writeUserAuthoritiesModal()
    })






    

    /////     ACTION EVENTS
    $(document).on('click', '#filter-action-submit', function(){
        action.filterAction(ui.readFilterActionModal())
    })

    $(document).on('click', '#delete-actions', function(){
        del.deleteData(ui.getSelectedRowsId(), {tableName: 'operations', idColName: 'op_id'})
    })

    $(document).on('click', '#cancel-actions-submit', function(){
        action.cancelSelecteds()
    })

    
    






    /////     FUNCTIONS
    function start(){
        sql.startconnection()
        user.getUserInfo()
        select.getOptions('select-category')
        select.getOptions('select-product')
        select.getOptions('select-project')
        select.getOptions('select-supplier')
        select.getOptions('select-user-category')
        select.getOptions('select-user')
        ui.writeDate('add-offer-date', od.getDateNow())
        ui.writeDate('filter-offer-date2', od.getDateNow())
        ui.writeDate('filter-action-date2', od.getDateNow())
        od.setExchangeRateNow()
        od.setInflationTableToDb()
        od.setMwCurrentAmount()
        od.getMetalPrices('https://www.lme.com/Metals/Ferrous/Steel-Rebar#tabIndex=0', 'steel')
        od.getMetalPrices('https://www.lme.com/en-GB/Metals/Non-ferrous/Copper#tabIndex=0', 'coppor')
        od.getMetalPrices('https://www.lme.com/Metals/Non-ferrous/Lead#tabIndex=0', 'leadp')
        od.getMetalPrices('https://www.lme.com/Metals/Non-ferrous/Zinc#tabIndex=0', 'zinc')
    }
})