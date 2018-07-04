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

    getDollarRate: function(date){
        return exchangeRate[0].selling.toString()
        /*request('http://paracevirici.com/doviz-arsiv/merkez-bankasi/gecmis-tarihli-doviz/' + date.substr(0, 4) + '/amerikan-dolari', function (error, response, body) {
            if(error){
                ui.alert('add-offer-failed', '<strong>Success!</strong> Exchange rate cant get for dollar!')
                throw error
            }
            else{
                var html = document.createElement('DIV')
                html.innerHTML = body
                var data = html.getElementsByClassName('row')
                for(var i = 0; i < data.length; i++){
                    console.log(data[i])
                }
            }
        });*/
    },

    getEuroRate: function(date){
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
    }
}