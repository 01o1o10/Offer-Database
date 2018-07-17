module.exports = {
    
    updateId: 0,
    
    /////     PRODUCT FUNCTIONS
    readFilterProductModal: function(){
        categories = $('#filter-product-category').val()
        return categories
    },
   
    readAddProductModal: function(){
        var data = {}
        data.category = document.getElementById('add-product-category').value
        data.product = document.getElementById('add-product-name').value
        data.inf = document.getElementById('add-product-inf').value
        data.steel = document.getElementById('add-product-steel').value
        data.cup = document.getElementById('add-product-cup').value
        data.lead = document.getElementById('add-product-lead').value
        data.zinc = document.getElementById('add-product-zinc').value
        data.wms = document.getElementById('add-product-wms').value
        data.extra = document.getElementById('add-product-extra').value
        return data
    },
   
    readUpdateProductModal: function(){
        var data = {}
        data.id = this.updateId
        data.category = document.getElementById('update-product-category').value
        data.product = document.getElementById('update-product-name').value
        data.inf = document.getElementById('update-product-inf').value
        data.steel = document.getElementById('update-product-steel').value
        data.cup = document.getElementById('update-product-cup').value
        data.lead = document.getElementById('update-product-lead').value
        data.zinc = document.getElementById('update-product-zinc').value
        data.wms = document.getElementById('update-product-wms').value
        data.extra = document.getElementById('update-product-extra').value
        return data
    },
   
    writeUpdateProductModal: function(data){
        console.log(data)
        document.getElementById('update-product-name').value = data.Product
        document.getElementById('update-product-inf').value = data.Inflation
        document.getElementById('update-product-steel').value = data.Steel
        document.getElementById('update-product-cup').value = data.Cuprum
        document.getElementById('update-product-lead').value = data.Lead
        document.getElementById('update-product-zinc').value = data.Zinc
        document.getElementById('update-product-wms').value = data.Workmanship
        document.getElementById('update-product-extra').value = data.Extra
        sql.query("select * from categories where c_name='" + data.Category + "';", function(category){
            document.getElementById('update-product-category').value = category[0].c_id
        })
    },





   
    /////     OFFER FUNCTIONS
    readFilterOfferModal: function(){
        var data = {}
        data.categories = $('#filter-offer-category').val()
        data.products = $('#filter-offer-product').val()
        data.projects = $('#filter-offer-project').val()
        data.suppliers = $('#filter-offer-supplier').val()
        data.sort = $('#filter-offer-sort').val()
        data.ascDesc = $('#filter-offer-select-asc-desc').val()
        data.exchange = $('#filter-offer-exchange').val()
        data.minPrice = $('#filter-offer-min-price').val()
        data.maxPrice = $('#filter-offer-max-price').val()
        data.date1 = this.readDate('filter-offer-date1')
        data.date2 = this.readDate('filter-offer-date2')
        console.log(data)
        return data
    },

    readAddOfferModal: function(){
        var data = {}
        data.product = $('#add-offer-product').val()
        data.project = $('#add-offer-project').val()
        data.supplier = $('#add-offer-supplier').val()
        data.exchange = $('#add-offer-exchange').val()
        data.price = $('#add-offer-price').val()
        data.date = this.readDate('add-offer-date')
        console.log(data)
        return data
    },

    readUpdateOfferModal: function(){
        var data = {}
        data.id = this.updateId
        data.product = $('#update-offer-product').val()
        data.project = $('#update-offer-project').val()
        data.supplier = $('#update-offer-supplier').val()
        data.exchange = $('#update-offer-exchange').val()
        data.price = $('#update-offer-price').val()
        data.date = this.readDate('update-offer-date')
        return data
    },

    writeUpdateOfferModal: function(data){
        $('#update-offer-exchange').val(data.Exchange)
        $('#update-offer-price').val(data.Price)
        this.writeDate('update-offer-date', data.Date)
    },






    /////     CATEGORY FUNCTIONS
    readAddCategoryModal: function(){
        var category = document.getElementById('add-category-name').value
        return category
    },

    readUpdateCategoryModal: function(){
        var data = {}
        data.category = document.getElementById('update-category-name').value
        data.id = this.updateId
        return data
    },

    writeUpdateCategoryModal: function(data){
        document.getElementById('update-category-name').value = data.Category
    },







    /////     PROJECT FUNCTIONS
    readAddProjectModal: function(){
        var project = document.getElementById('add-project-name').value
        return project
    },

    readUpdateProjectModal: function(){
        var data = {}
        data.project = document.getElementById('update-project-name').value
        data.id = this.updateId
        return data
    },

    writeUpdateProjectModal: function(data){
        document.getElementById('update-project-name').value = data.Project
    },






    /////     SUPPLIER FUNCTIONS
    readAddSupplierModal: function(){
        var supplier = document.getElementById('add-supplier-name').value
        return supplier
    },

    readUpdateSupplierModal: function(){
        var data = {}
        data.supplier = document.getElementById('update-supplier-name').value
        data.id = this.updateId
        return data
    },

    writeUpdateSupplierModal: function(data){
        document.getElementById('update-supplier-name').value = data.Supplier
    },






    /////     DATE FUNCTIONS
    writeDate: function(id, data){
        var date = []
        date.push(data.substr(0, 4))
        date.push(data.substr(5, 7).substr(0, 2))
        date.push(data.substr(8, 10))

        $('#' + id).children().eq(1).children().first().first().prop('selectedIndex', parseInt(date[0].substr(2, 4)-15))
        $('#' + id).children().eq(3).children().first().prop('selectedIndex', parseInt(date[1])-1)
        $('#' + id).children().eq(5).children().first().prop('selectedIndex', parseInt(date[2])-1)
    },

    readDate: function(id){
        var date = ''
        date = $('#' + id).children().eq(1).children().first().val()
        date += '-' + $('#' + id).children().eq(3).children().first().val()
        date += '-' + $('#' + id).children().eq(5).children().first().val()
        return date
    },






    /////     ALERT FUNCTIONS
    alert: function(id, message, succes){
        var alrt = $('#' + id)
        alrt.html('')
        if(succes){
            alrt.html('<strong>Succes!</strong> ' + message)
        }
        else{
            alrt.html('<strong>Failed!</strong> ' + message)
        }
        alrt.slideToggle('slow');
        setTimeout(function(){
            alrt.slideToggle('slow');
        }, 3000);
    },

    setAlertModal: function(message, succes){
        if(succes){
            $('#alert-modal-suc').html('<strong>Succes!</strong> ' + message)
            $('#alert-modal-close').attr('class', 'btn btn-success')
            $('#alert-modal-suc').show()
            $('#alert-modal-fail').hide()
        }
        else{
            $('#alert-modal-fail').html('<strong>Failed!</strong> ' + message)
            $('#alert-modal-close').attr('class', 'btn btn-danger')
            $('#alert-modal-fail').show()
            $('#alert-modal-suc').hide()
        }
        document.getElementById('alert-modal-submit').click()
    },

    readPriceAlert: function(){
        var price = $('#alert-price-input').val()
        return price
    },






    /////     RESULT FUNCTIONS
    setResults: function(data, header, deleteBtnId){
        var resultHeader = document.getElementById('result-header')

        // Setting header row
        resultHeader.innerHTML = ''
        resultHeader.innerHTML = '<div class="col"><input type="checkbox" id="head-checkbox"><button style="margin: 0px 10px;" type="button" class="btn-sm btn-danger" id="' + deleteBtnId + '">Del</button>'
        for(var i in header){
            var div = document.createElement('DIV')
            div.setAttribute('class', 'col')
            div.innerHTML = header[i]
            resultHeader.appendChild(div)
        }

        //Getting data keys
        var keys = []
        if(data.length != 0){
            keys = this.getKeys(data[0])
        }

        // Setting body
        var resultBody = document.getElementById('result-body')
        resultBody.innerHTML = ''
        for(var i = 0; i < data.length; i++){
            var tr = document.createElement('DIV')
            tr.setAttribute('class', 'row tr')
            for(var j = 0; j < keys.length; j++){
                var td = document.createElement('DIV')
                td.setAttribute('class', 'col td')
                if(j == 0){
                    td.innerHTML = '<input type="checkbox" id="' + data[i][keys[0]] + '" class="result-checkbox"><span id="' + keys[0] + '" class="glyphicon filter-edit-icon">&#x270f;</span>'
                }
                else if(keys[j] == 'usd' || keys[j] == 'eur'){
                    td.setAttribute('title', data[i][keys[j]])
                    td.style.display = 'none'
                }
                else if(j >= 10){
                    td.setAttribute('title', data[i][keys[j]])
                    td.style.display = 'none'
                }
                else{
                    td.innerHTML = data[i][keys[j]]
                    td.setAttribute('title', data[i][keys[j]])
                }
                if(keys[j] == 'price'){
                    /*var price = td.innerHTML
                    for(var index = 3; index < price.length; index += 4){
                        price = price.substr(0, index) + '.' + price.substr(index)
                    }
                    td.innerHTML = price*/
                    td.classList.add('price')
                }
                tr.appendChild(td)
            }
            resultBody.appendChild(tr)
        }
    },

    getKeys: function(obj){
        var keys = []
        for(var i in obj){
            keys.push(i)
        }
        return keys
    },

    getSelectedRowsId: function(){
        var results = $('.result-checkbox:checkbox:checked')
        var idArray = []
        for(var i = 0; i < results.length; i++){
            idArray.push(results[i].id)
        }
        return idArray
    },

    selectAll: function(){
        var checkboxes = $('.result-checkbox')
        var HCStatus = document.getElementById('head-checkbox').checked

        for(var i = 0; i < checkboxes.length; i++){
            checkboxes[i].checked = HCStatus
        }
    },

    showOtherVals: function(price, data){
        if(!price.children().length){
            var table = '<div class="dropdown-content-price"><table class="table table-striped table-dark" style="margin: 0;"><thead><tr><th></th><th>t</th><th>$</th><th>€</th></tr></thead><tr><td>Old Offer</td><td id="11"></td><td id="12"></td><td id="13"></td></tr><tr><td>*</td><td id="21"></td><td id="22"></td><td id="23"></td></tr><tr><td>Expected Offer</td><td id="31"></td><td id="32"></td><td id="33"></td></tr><tr><td>*</td><td id="41"></td><td id="42"></td><td id="43"></td></tr></tbody></table></div>'
            price.html(price.html() + table)

            row = ['1', '2', '3', '4']
            col = ['1', '2', '3']
            var id = '#'
            var index = 'cell'
    
            for(var i in row){
                for(var j in col){
                    id = '#' + row[i] + col[j]
                    index = 'cell' + row[i] + col[j]
                    price.find(id).text(data[index])
                }
            }
        }
        if(price.children().first().css('display') == 'none'){
            $('.dropdown-content-price').slideUp('slow')
            price.children().first().slideToggle('slow');
        }
        else{
            $('.dropdown-content-price').slideUp('slow')
        }
    },

    readResultsRow: function(row){
        var header = $('#result-header')
        var headers = []
        for(var i = 0; i < header.children().length; i++){
            headers.push(header.children().eq(i).text())
        }
        console.log('headers: ', headers)
        var rowInfo = {}
        this.updateId = row.children().eq(0).children().eq(0).attr('id')
        console.log(this.updateId)
        for(var i = 1; i < headers.length; i++){
            rowInfo[headers[i]] = row.children().eq(i).attr('title')
        }
        console.log('rowInfo: ', rowInfo)
        return rowInfo
    },

    readOfferInfo: function(row){
        var priceInfo = {}
        priceInfo.product = row.children().eq(1).attr('title')
        priceInfo.category = row.children().eq(2).attr('title')
        priceInfo.price = row.children().eq(5).attr('title')
        priceInfo.type = row.children().eq(6).attr('title')
        priceInfo.date = row.children().eq(7).attr('title')
        priceInfo.usd = row.children().eq(8).attr('title')
        priceInfo.eur = row.children().eq(9).attr('title')
        priceInfo.inf = row.children().eq(10).attr('title')
        console.log('priceInfo: ', priceInfo)
        return priceInfo
    },







    /////      EXCEL FUNCTIONS
    readImportExcelModal: function(){
        var fileName = document.getElementById('import-excel-file-name').files[0].path
        return fileName
    },

    readExportExcelModal: function(){
        var fileName = document.getElementById('export-excel-file-name').files[0].path
        return fileName
    },





    
    /////     USER FUNCTIONS
    readAddUserModal: function(){
        var data = {}
        data.category = document.getElementById('add-user-category').value
        data.fname = document.getElementById('add-user-firstname').value
        data.lname = document.getElementById('add-user-lastname').value
        data.uname = document.getElementById('add-user-username').value
        data.pass = document.getElementById('add-user-password').value
        data.vpass = document.getElementById('add-user-vpassword').value

        var checkboxes = $('#add-user input[type="checkbox"]')
        console.log(checkboxes)
        data.auth = ''

        for(var i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].checked){
                data.auth += 1
            }
            else {
                data.auth += 0
            }
        }
        console.log('User Info: ', data)
        return data
    },

    readFilterUserModal: function(){
        var category = document.getElementById('filter-user-category').value
        return category
    },
   
    writeUpdateUserModal: function(data){
        document.getElementById('update-user-firstname').value = data.Firstname
        document.getElementById('update-user-lastname').value = data.Lastname
        document.getElementById('update-user-username').value = data.Username

        var checkboxes = $('#update-user input[type="checkbox"]')

        for(var i = 0; i < checkboxes.length; i++){
            if(data.Authority.charAt(i) == '1'){
                checkboxes[i].checked = true
            }
            else{
                checkboxes[i].checked = false
            }
        }

        sql.query("select u_categoryid from users where u_name='" + data.Username + "';", function(category){
            document.getElementById('update-user-category').value = category[0].u_categoryid    
        })
    },

    readUpdateUserModal: function(){
        var data = {}
        data.category = document.getElementById('update-user-category').value
        data.fname = document.getElementById('update-user-firstname').value
        data.lname = document.getElementById('update-user-lastname').value
        data.uname = document.getElementById('update-user-username').value

        var checkboxes = $('#update-user input[type="checkbox"]')
        console.log(checkboxes)
        data.auth = ''

        for(var i = 0; i < checkboxes.length; i++){
            if(checkboxes[i].checked){
                data.auth += 1
            }
            else {
                data.auth += 0
            }
        }
        console.log('User Info: ', data)
        return data
    },

    /////     USER CATEGORY FUNCTIONS
    readAddUserCategoryModal: function(){
        var category = document.getElementById('add-user-category-name').value
        return category
    },

    readUpdateUserCategoryModal: function(){
        var data = {}
        data.category = document.getElementById('update-user-category-name').value
        data.id = this.updateId
        return data
    },

    writeUpdateUserCategoryModal: function(data){
        document.getElementById('update-user-category-name').value = data.Category
    },

    /////     USER SELF FUNCTIONS
    setUserInfo: function(userInfo){
        document.getElementById('fullname').textContent = userInfo.u_fname + ' ' + userInfo.u_lname
    },

    readChangePasswordModal: function(){
         var data = {}
         data.oldPass = document.getElementById('user-change-password-oldpass').value
         data.newPass = document.getElementById('user-change-password-newpass').value
         data.newPassCheck = document.getElementById('user-change-password-newpasscheck').value
         return data
    },
   
    writeUserAuthoritiesModal: function(){
        var checkboxes = $('#user-authorities-form input[type="checkbox"]')

        for(var i = 0; i < checkboxes.length; i++){
            if(userInfo.u_aut.charAt(i) == '1'){
                checkboxes[i].checked = true
            }
            else{
                checkboxes[i].checked = false
            }
        }
    }
}