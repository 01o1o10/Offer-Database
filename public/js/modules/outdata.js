var request = require('request');

module.exports = {
    exchangeRate: [],

    getDateNow: function(){
        return (new Date()).toISOString().substr(0, 10)
    },

    setExchangeRateNow: function(){
        var request = require('request');

        request('http://www.doviz.com/api/v1/currencies/all/latest', function (error, response, body) {
            if(error) throw error;
            exchangeRate = JSON.parse(body).slice(0, 2);
            document.getElementById('dolar').innerHTML = ' ' +exchangeRate[0].selling
            document.getElementById('euro').innerHTML = ' ' +exchangeRate[1].selling
        });
    },

    getDollarRate: function(){
        return exchangeRate[0].selling.toString()
    },

    getEuroRate: function(){
        return exchangeRate[1].selling.toString()
    },

    setInflationTableToDb: function(){
        request('http://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Istatistikler/Enflasyon+Verileri', function (error, response, body) {
            if(error) throw error;
            else{
                sql.query('delete from inflation;', function(){})
                var html = document.createElement('DIV')
                html.innerHTML = body
                var tbody = html.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
                for(var i = 0; i < tbody.length; i++){
                    var tds = tbody[i].getElementsByTagName('td')
                    sql.query("insert into inflation values('" + tds[0].innerHTML.substr(3, 7) + "-" + tds[0].innerHTML.substr(0, 2) + "-01', " + tds[2].innerHTML + ");", function(){})
                }
            }
        });
    },

    reverseDate: function(date){
        console.log(date.substr(8, 10) + '-' + date.substr(5, 7).substr(0, 2) + '-' + date.substr(0, 4))
    }, 

    setSteelCurrentPrice: function(){
        sql.query("select * from steelprices where sp_date='" + this.getDateNow() + "';", function(data){
            if(data.length == 0){
                request('https://www.lme.com/Metals/Ferrous/Steel-Rebar#tabIndex=0', function (error, response, body) {
                    if(error){
                        var html = 'Steel price can not get from the page!</br><form><div class="form-group"><input type="text" class="form-control" id="steel-price-input" placeholder="Type steel today price..."></div><div class="form-group"><button type="button" class="form-control btn btn-primary" id="steel-price-submit">Set</button></div></form>'
                        ui.setAlertModal(html , false)
                        throw error
                    }
                    else{
                        var html = document.createElement('DIV')
                        html.innerHTML = body
                        var price = html.getElementsByTagName('table')[0].rows[1].cells[1].textContent
                        insert.addPrice(price, {tableName: 'steelprices', cols: ['sp_date', 'sp_price']})
                    }
                });
            }
        })
    },

    setCuprumCurrentPrice: function(){
        sql.query("select * from cuprumprices where cp_date='" + this.getDateNow() + "';", function(data){
            if(data.length == 0){
                request('https://www.lme.com/Metals/Non-ferrous/Copper#tabIndex=0', function (error, response, body) {
                    if(error){
                        var html = 'Cuprum price can not get from the page!</br><form><div class="form-group"><input type="text" class="form-control" id="cuprum-price-input" placeholder="Type cuprum today price..."></div><div class="form-group"><button type="button" class="form-control btn btn-primary" id="cuprum-price-submit">Set</button></div></form>'
                        ui.setAlertModal(html , false)
                        throw error
                    }
                    else{
                        var html = document.createElement('DIV')
                        html.innerHTML = body
                        var price = html.getElementsByTagName('table')[0].rows[1].cells[1].textContent
                        insert.addPrice(price, {tableName: 'cuprumprices', cols: ['cp_date', 'cp_price']})
                    }
                });
            }
        })
    },

    setLeadCurrentPrice: function(){
        sql.query("select * from leadprices where lp_date='" + this.getDateNow() + "';", function(data){
            if(data.length == 0){
                request('https://www.lme.com/Metals/Non-ferrous/Lead#tabIndex=0', function (error, response, body) {
                    if(error){
                        var html = 'Lead price can not get from the page!</br><form><div class="form-group"><input type="text" class="form-control" id="lead-price-input" placeholder="Type lead today price..."></div><div class="form-group"><button type="button" class="form-control btn btn-primary" id="lead-price-submit">Set</button></div></form>'
                        ui.setAlertModal(html , false)
                        throw error
                    }
                    else{
                        var html = document.createElement('DIV')
                        html.innerHTML = body
                        var price = html.getElementsByTagName('table')[0].rows[1].cells[1].textContent
                        insert.addPrice(price, {tableName: 'leadprices', cols: ['lp_date', 'lp_price']})
                    }
                });
            }
        })
    },

    setZincCurrentPrice: function(){
        sql.query("select * from zincprices where zp_date='" + this.getDateNow() + "';", function(data){
            if(data.length == 0){
                request('https://www.lme.com/Metals/Non-ferrous/Zinc#tabIndex=0', function (error, response, body) {
                    if(error){
                        var html = 'Zinc price can not get from the page!</br><form><div class="form-group"><input type="text" class="form-control" id="zinc-price-input" placeholder="Type steel today price..."></div><div class="form-group"><button type="button" class="form-control btn btn-primary" id="zinc-price-submit">Set</button></div></form>'
                        ui.setAlertModal(html , false)
                        throw error
                    }
                    else{
                        var html = document.createElement('DIV')
                        html.innerHTML = body
                        var price = html.getElementsByTagName('table')[0].rows[1].cells[1].textContent
                        insert.addPrice(price, {tableName: 'zincprices', cols: ['zp_date', 'zp_price']})
                    }
                });
            }
        })
    }
}