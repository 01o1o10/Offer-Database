var request = require('request');

module.exports = {

    /////     DATE FUNCTIONS
    getDateNow: function(){
        return (new Date()).toISOString().substr(0, 10)
    },

    dayAgo: function(date, dif){
        //console.log(date)
        var year = parseInt(date.substr(0, 4))
        var month = parseInt(date.substr(5, 2))
        var day = parseInt(date.substr(8, 2))
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

    editDate: function(date){
        console.log(date)
        var year = date.substr(7, 4)
        var month = date.substr(0, 3)
        var day = date.substr(4, 2)

        switch(month){
            case 'Jan': month = '01'
                break
            
            case 'Feb': month = '02'
                break
            
            case 'Mar': month = '03'
                break
            
            case 'Apr': month = '04'
                break
            
            case 'May': month = '05'
                break
            
            case 'Jun': month = '06'
                break
            
            case 'Jul': month = '07'
                break
            
            case 'Aug': month = '08'
                break
            
            case 'Sep': month = '09'
                break
            
            case 'Oct': month = '10'
                break
            
            case 'Nov': month = '11'
                break
            
            case 'Dec': month = '12'
                break
        }
        console.log(year + '-' + month + '-' + day)
        return year + '-' + month + '-' + day
    },

    reverseDate: function(date){
        return (date.substr(6, 10) + '-' + date.substr(3, 5).substr(0, 2) + '-' + date.substr(0, 2))
    },




    
    /////     EXCHANGE FUNCTIONS
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
        //console.log(url)
        request(url, function (error, response, body) {
            if(error) throw error;
            var dollarRate = JSON.parse(body)
            cb(dollarRate[0].selling)
        });
    },

    getEuroRate: function(date2, cb){
        var date1 = this.dayAgo(date2, 2)
        var url = 'https://doviz.com/api/v1/currencies/EUR/archive?start=' + date1 + '&end=' + date2
        //console.log(url)
        request(url, function (error, response, body) {
            if(error) throw error;
            var euroRate = JSON.parse(body);
            cb(euroRate[0].selling)
        });
    },

    getExchangeRate: function(date, cb){
        var exchange = {}
        if(date == od.getDateNow()){
            od.setExchangeRateNow(function(exchange){
                exchange.usd = exchange[0].selling
                exchange.eur = exchange[1].selling
                cb(exchange)
            })
        }
        else{
            od.getDollarRate(date, function(rate1){
                exchange.usd = rate1
                od.getEuroRate(date, function(rate2){
                    exchange.eur = rate2
                    cb(exchange)
                })
            })
        }
    },




    
    /////     METAL EXCHANGE FUNCTIONS
    getMetalPrices: function(url, col){
        sql.query("select " + col + " from metal_prices where date='" + this.getDateNow() + "';", function(data){
            console.log(data)
            if(data.length == 0 || data[0][col] == null){
                console.log("data")
                request(url, function (error, response, body) {
                    if(error){
                        ui.setAlertModal('Price can not get for col!</br>Please contact with <strong>Ilyas Mammadov</strong></br>Tel: +90 506 110 7443</br>E-mail: ilyas.mammadov.96@gmail.com' , false)
                        throw error
                    }
                    else{
                        var html = document.createElement('DIV')
                        html.innerHTML = body
                        var table = html.getElementsByTagName('table')[0]
                        if(table){
                            var cells = table.rows[1].cells
                            var price = cells[cells.length-1].textContent
                            insert.addPrice(price, col)
                        }
                        else{
                            ui.setAlertModal('Price can not get for' + tableName + '!</br>Please contact with <strong>Ilyas Mammadov</strong></br>Tel: +90 506 110 7443</br>E-mail: ilyas.mammadov.96@gmail.com' , false)
                        }
                    }
                });
            }
        })
    },

    deleteNulls: function(){
        sql.query("select date from metal_prices where copper is null or steel is null or leadp is null or zinc is null order by date desc", function(check){
            for(var i in check){
                sql.query("delete from metal_prices where date='" + check[i].date + ";", function(check){
                    console.log('deleted: ' + i + ". index")
                })
            }
        })
    },

    setMetalPrices: function(code, metal){
        var url = 'https://www.quandl.com/api/v3/datasets/LME/PR_' + code + '?start_date=2010-01-01&end_date=2018-08-05&api_key=DsrViFcryyTfVWUDvyCD'
        request(url, function (error, response, body) {
            if(error) throw error
            var div = document.createElement('DIV')
            div.innerHTML = body
            var data = JSON.parse(div.getElementsByTagName('code')[0].textContent).dataset.data
            console.log(data)
            od.insertMetalPrices(metal, data, 0)
        });
    },

    insertMetalPrices: function(metal, data, i){
        if(i < data.length){
            var sqlStatement = "insert into metal_prices(date, " + metal + ") values('" + data[i][0] + "', " + data[i][1] + ");"
            console.log(sqlStatement)
            sql.query(sqlStatement, function(check){
                if(check.insertId){
                    od.insertMetalPrices(metal, data, ++i)
                }
                else {
                    var sqlStatement = "update metal_prices set " + metal + "=" + data[i][1] + " where date='" + data[i][0] + "';"
                    console.log(sqlStatement)
                    sql.query(sqlStatement, function(check){
                        od.insertMetalPrices(metal, data, ++i)
                    })
                }
            })
        }
    },

    insertSteelPrices: function(){
        var fs = require('fs')
        fs.readFile('./aaa.txt', 'utf-8', function(err, data){
            var div = document.createElement('DIV')
            div.innerHTML = data
            var rows = div.getElementsByTagName('table')[0].rows
            var data = []
            console.log(rows)
            for(var i = 1; i < rows.length; i++){
                data[i-1] = []
                data[i-1].push(od.editDate(rows[i-1].cells[0].textContent.replace(',', '')))
                data[i-1].push(rows[i-1].cells[2].textContent)
                console.log(data[i-1])
                
                if(i == rows.length - 1){
                    console.log(data)
                    od.insertMetalPrices('steel', data, 0)
                }
            }
        })
    },

    setInflationTableToDb: function(){
        request('http://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Istatistikler/Enflasyon+Verileri', function (error, response, body) {
            if(error){
                throw error
            }
            else{
                var html = document.createElement('DIV')
                html.innerHTML = body
                var tr = html.getElementsByTagName('tbody')[0].rows[0]
                /*for(var i = 0; i < tr.length; i++){
                    var sqlStatement = "insert into inflation(date, inf) values('" + od.reverseDate('01-' + tr[i].cells[0].textContent) + "', " + tr[i].cells[2].textContent + ");"
                    sql.query(sqlStatement, function(check){})
                }*/
                sql.query("select * from inflation where left(date, 7)='" + tr.cells[0].textContent.substr(3, 7) + '-' + tr.cells[0].textContent.substr(0, 2) + "';", function(check){
                    if(check.length == 0){
                        sql.query("insert into inflation(date, inf) values('" + tr.cells[0].textContent.substr(3, 7) + '-' + tr.cells[0].textContent.substr(0,2) + '-01' + "', " + tr.cells[2].textContent + ");", function(check){
                            console.log('Inlflation saved succesfully!')
                        })
                    }
                })
            }
        });
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