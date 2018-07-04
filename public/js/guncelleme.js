$(document).ready(function(){

    var teklif_id = ''

    $('#guncellle').click(function(){
        var checklist = document.getElementsByClassName('sonuc-liste-elemani')
        for(var i = 0; i < checklist.length; i++){
            if(checklist[i].checked){
                teklif_id = checklist[i].id
                var input = document.getElementById('urung')
                input.value = checklist[i].parentNode.nextSibling.textContent
                input = document.getElementById('projeg')
                input.value = checklist[i].parentNode.nextSibling.nextSibling.textContent
                input = document.getElementById('tedarikcig')
                input.value = checklist[i].parentNode.nextSibling.nextSibling.nextSibling.textContent
            }
        }
    })

    $('#guncelleme-submit').click(function(){

        var yil = document.getElementById('gtarihy').childNodes
        var ay = document.getElementById('gtariha').childNodes
        var gun = document.getElementById('gtarihg').childNodes
        for(var i = 0; i < yil.length; i++){
            if(yil[i].value == (new Date()).getFullYear()){
                yil[i].setAttribute('selected','selected')
            }
        }
        for(var i = 0; i < ay.length; i++){
            if(ay[i].value == (new Date()).getMonth()){
                ay[i].setAttribute('selected','selected')
            }
        }
        for(var i = 0; i < gun.length; i++){
            if(gun[i].value == (new Date()).getDay()){
                gun[i].setAttribute('selected','selected')
            }
        }

        var urun = $('#urung').val();
        var fiyat = $('#fiyatg').val();
        var proje = $('#projeg').val();
        var tedarikci = $('#tedarikcig').val();
        
        if(urun && fiyat && proje && tedarikci){
            if($.isNumeric(fiyat)){
                var urunid = undefined;
                sorgu("select urun_id from urunler where urun_adi='" + urun + "';", function(data){
                    if(data.length != 0){
                        urunid = data[0].urun_id;
                    }
                    else{
                        sorgu("insert into urunler (urun_adi) values('" + urun + "');", function(data){});
                        sorgu("select urun_id from urunler where urun_adi='" + urun + "';", function(data){
                            if(data.length != 0){
                                urunid = data[0].urun_id;
                            }
                        });
                    }
                });
                
                var projeid = undefined;
                sorgu("select proje_id from projeler where proje_adi='" + proje + "';", function(data){
                    if(data.length != 0){
                        projeid = data[0].proje_id;
                    }
                    else{
                        sorgu("insert into projeler (proje_adi) values('" + proje + "');", function(data){});
                        sorgu("select proje_id from projeler where proje_adi='" + proje + "';", function(data){
                            if(data.length != 0){
                                projeid = data[0].proje_id;
                            }
                        });
                    }
                });
                
                var tedarikciid = undefined;
                sorgu("select tedarikci_id from tedarikciler where tedarikci_adi='" + tedarikci + "';", function(data){
                    if(data.length != 0){
                        tedarikciid = data[0].tedarikci_id;
                    }
                    else{
                        sorgu("insert into tedarikciler (tedarikci_adi) values('" + tedarikci + "');", function(data){});
                        sorgu("select tedarikci_id from tedarikciler where tedarikci_adi='" + tedarikci + "';", function(data){
                            if(data.length != 0){
                                tedarikciid = data[0].tedarikci_id;
                            }
                        });
                    }
                });
                
                setTimeout(function(){
                    var tarih =document.getElementById('gtarihy').value + '-' + document.getElementById('gtariha').value + '-' + document.getElementById('gtarihg').value

                    console.log(urunid, projeid, tedarikciid, fiyat, tarih, doviz)
                    if(urunid && projeid && tedarikciid && fiyat && tarih && doviz){
                        var sql = "update teklifler set urun_id=" + urunid + ", proje_id=" + projeid + ", tedarikci_id=" + tedarikciid + ", urun_fiyati=" + fiyat + ",teklif_tarihi='" + tarih + "',kur='" + $('#kurg').val() + "',usd=" + doviz[0].selling + ",euro=" + doviz[1].selling +" where teklif_id=" + teklif_id + ";"
                        console.log(sql)
                        sorgu(sql, function(cevap){
                            fade($('#sucg'));
                            $('#fiyatg').val('');
                            select()
                        });
                    }
                    else{
                        alert('Değerlerden biri eksik!');
                    }
                
                }, 200);
            }
            else{
                fade($('#warn2g'));
            }
        }
        else{
            fade($('#warn1g'));
        }
    });

    function fade(ob){
        ob.slideToggle('slow');
        setTimeout(function(){
            ob.slideToggle('slow');
        }, 3000);
    }
})