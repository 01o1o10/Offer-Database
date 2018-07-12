var request = require('request');

module.exports = {
    
    getDateNow: function(){
        return (new Date()).toISOString().substr(0, 10)
    },

    setExchangeRateNow: function(cb){
        request('http://www.doviz.com/api/v1/currencies/all/latest', function (error, response, body) {
            if(error) throw error;
            var exchangeRate = JSON.parse(body).slice(0, 2)
            document.getElementById('dolar').innerHTML = ' ' + exchangeRate[0].selling
            document.getElementById('euro').innerHTML = ' ' + exchangeRate[1].selling
            if(cb){
                cb(exchangeRate)
            }
        });
    },

    getDollarRate: function(date2, cb){
        var date1 = this.dayAgo(date2, 2)
        var url = 'https://doviz.com/api/v1/currencies/USD/archive?start=' + date1 + '&end=' + date2
        console.log(url)
        request(url, function (error, response, body) {
            if(error) throw error;
            var dollarRate = JSON.parse(body);
            cb(dollarRate[0].selling)
        });
    },

    getEuroRate: function(date2, cb){
        var date1 = this.dayAgo(date2, 2)
        var url = 'https://doviz.com/api/v1/currencies/EUR/archive?start=' + date1 + '&end=' + date2
        console.log(url)
        request(url, function (error, response, body) {
            if(error) throw error;
            var euroRate = JSON.parse(body);
            cb(euroRate[0].selling)
        });
    },

    getMetalPrices: function(code, tableName){
        var date = this.dayAgo(this.getDateNow(), 1)
        sql.query("select * from " + tableName + " where date='" + date + "';", function(check){
            if(check.length == 0){
                var url = 'https://www.quandl.com/api/v3/datasets/LME/PR_' + code + '?start_date=' + date + '&end_date=' + date + '&api_key=DsrViFcryyTfVWUDvyCD'
                request(url, function (error, response, body) {
                    if(error) throw error;

                    var html = document.createElement('DIV')
                    html.innerHTML = body
                    body = html.getElementsByTagName('code')[0].textContent
                    var metalPrices = JSON.parse(body).dataset.data;
                    sql.query("insert into " + tableName + "(date, price) values('" + metalPrices[0][0] + "', " + metalPrices[0][2] + ");", function(check){})
                });
            }
        })
    },

    dayAgo: function(date, dif){
        var year = parseInt(date.substr(0, 4))
        var month = parseInt(date.substr(5, 7))
        var day = parseInt(date.substr(8, 10))
        if(dif > 0 && dif < 26){
            if(day > dif + 1){
                day -= dif
            }
            else if(month == 3){
                month--
                if(year%4 == 0 && month == 2){
                    day = 30 - dif
                }
                else if(year%4 != 0 && month == 2){
                    day = 29 - dif
                }
            }
            else if(month > 1){
                if(month < 9){
                    if(month % 2 == 1){
                        day = 32 - dif
                    }
                    else{
                        day = 31 - dif
                    }
                }
                else{
                    if(month % 2 ==1){
                        day = 31 -dif
                    }
                    else{
                        day = 32 -dif
                    }
                }
                month--
            }
            else{
                year--
                month = 12
                day = 32 - dif
            }

            if(day < 10){
                day = '0' + day
            }
            if(month < 10){
                month = '0' + month
            }
        }
        
        return year + '-' + month + '-' + day
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
        sql.query("select * from steel where date='" + this.getDateNow() + "';", function(data){
            if(data.length == 0){
                request('https://www.lme.com/Metals/Ferrous/Steel-Rebar#tabIndex=0', function (error, response, body) {
                    if(error){
                        var html = 'Steel price can not get from the page!</br><form><div class="form-group"><input type="text" class="form-control" id="alert-price-input" placeholder="Type steel today price..."></div><div class="form-group"><button type="button" class="form-control btn btn-primary" id="steel-price-submit">Set</button></div></form>'
                        ui.setAlertModal(html , false)
                        throw error
                    }
                    else{
                        var html = document.createElement('DIV')
                        html.innerHTML = body
                        var price = html.getElementsByTagName('table')[0].rows[1].cells[1].textContent
                        insert.addPrice(price, {tableName: 'steel', cols: ['date', 'price']})
                    }
                });
            }
        })
    },

    setMwCurrentAmount: function(){
        sql.query("select * from minwage where left(mw_date, 4)='" + this.getDateNow().substr(0, 4) + "';", function(data){
            if(data.length == 0){
                var html = 'You must insert minimum wage!</br><form><div class="form-group"><input type="text" class="form-control" id="alert-price-input" placeholder="Type minimum wage for today..."></div><div class="form-group"><button type="button" class="form-control btn btn-primary" id="mw-amount-submit">Set</button></div></form>'
                ui.setAlertModal(html , false)
            }
        })
    }
}