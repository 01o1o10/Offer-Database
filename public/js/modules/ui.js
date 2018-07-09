module.exports = {
    
    readFilterProductModal: function(){
        categories = $('#filter-product-category').val()
        return categories
    },
   
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
        return data
    },

    readAddCategoryModal: function(){
        var category = document.getElementById('add-category-name').value
        return category
    },

    readAddProjectModal: function(){
        var project = document.getElementById('add-project-name').value
        return project
    },

    readAddSupplierModal: function(){
        var supplier = document.getElementById('add-supplier-name').value
        return supplier
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
   
    readUpdateProductModal: function(){
        var data = {}
        data.category = document.getElementById('update-product-category').value
        data.product = document.getElementById('update-product-name').value
        return data
    },

    readUpdateCategoryModal: function(){
        var category = document.getElementById('update-category-name').value
        return category
    },

    readUpdateProjectModal: function(){
        var project = document.getElementById('update-project-name').value
        return project
    },

    readUpdateSupplierModal: function(){
        var supplier = document.getElementById('update-supplier-name').value
        return supplier
    },

    readUpdateOfferModal: function(){
        var data = {}
        data.product = $('#update-offer-product').val()
        data.project = $('#update-offer-project').val()
        data.supplier = $('#update-offer-supplier').val()
        data.exchange = $('#update-offer-exchange').val()
        data.price = $('#update-offer-price').val()
        data.date = this.readDate('update-offer-date')
        return data
    },
   
    writeUpdateProductModal: function(data){
        document.getElementById('update-product-category').value = data.category
        document.getElementById('update-product-name').value = data.product
    },

    writeUpdateCategoryModal: function(category){
        document.getElementById('update-category-name').value = category
    },

    writeUpdateProjectModal: function(project){
        document.getElementById('update-project-name').value = project
    },

    writeUpdateSupplierModal: function(supplier){
        document.getElementById('update-supplier-name').value = supplier
    },

    writeUpdateOfferModal: function(data){
        $('#update-offer-product').val(data.product)
        $('#update-offer-project').val(data.project)
        $('#update-offer-supplier').val(data.supplier)
        $('#update-offer-exchange').val(data.exchange)
        $('#update-offer-price').val(data.price)
        this.writeDate('update-offer-date', data.date)
    },

    writeDate: function(id, data){
        var date = []
        date.push(data.substr(0, 4))
        date.push(data.substr(5, 7).substr(0, 2))
        date.push(data.substr(8, 10))

        $('#' + id).children().eq(1).children().first().prop('selectedIndex', parseInt(date[0].substr(2, 4)))
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
                    td.innerHTML = '<input type="checkbox" id="' + data[i][keys[0]] + '" class="result-checkbox"><span class="glyphicon filter-edit-icon">&#x270f;</span>'
                }
                else if(keys[j] == 'usd'){
                    td.setAttribute('title', data[i][keys[j]])
                    td.style.display = 'none'
                }
                else if(j >= 9){
                    td.setAttribute('title', data[i][keys[j]])
                    td.style.display = 'none'
                }
                else{
                    td.innerHTML = data[i][keys[j]]
                    td.setAttribute('title', data[i][keys[j]])
                }
                if(keys[j] == 'price'){
                    var price = td.innerHTML
                    for(var index = 3; index < price.length; index += 4){
                        price = price.substr(0, index) + '.' + price.substr(index)
                    }
                    td.innerHTML = price
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
            var table = '<div class="dropdown-content-price"><table class="table table-striped table-dark" style="margin: 0;"><thead><tr><th></th><th>t</th><th>$</th><th>€</th></tr></thead><tr><td>Old</td><td id="11"></td><td id="12"></td><td id="13"></td></tr><tr><td>*</td><td id="21"></td><td id="22"></td><td id="23"></td></tr><tr><td>New</td><td id="31"></td><td id="32"></td><td id="33"></td></tr><tr><td>*</td><td id="41"></td><td id="42"></td><td id="43"></td></tr></tbody></table></div>'
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
        for(var i = 1; i < headers.length; i++){
            rowInfo[headers[i]] = row.children().eq(i).attr('title')
        }
        console.log('rowInfo: ', rowInfo)
        return rowInfo
    },

    readPriceInfo: function(row){
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

    readImportExcelModal: function(){
        var fileName = document.getElementById('import-excel-file-name').files[0].path
        return fileName
    },

    readExportExcelModal: function(){
        var fileName = document.getElementById('export-excel-file-name').files[0].path
        return fileName
    },

    readLoginModal: function(){
        var userInfo = {}
        userInfo.userName = document.getElementById('login-modal-username').value
        userInfo.password =  document.getElementById('login-modal-password').value
        return userInfo
    }
}