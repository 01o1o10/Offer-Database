"use strict";

const ipc = require('electron').ipcMain

const {app, BrowserWindow} = require('electron')


  // Keep a global reference of the windonpm install mysql-connector-nodejsmysql-xdevapi-8.0.11.tar.gzw object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Tarayıcı penceresini oluştur.
    win = new BrowserWindow({width: 2000, height: 1150})
  
    // ve uygulamanın index.html'sini yükle.
    win.loadFile('index.html')
  
    // Pencere kapatıldığında ortaya çıkar.
    win.on('closed', () => {
    //Pencere nesnesini referans dışı bırakın,
    // uygulamanız çoklu pencereleri destekliyorsa genellikle pencereleri
    // bir dizide saklarsınız, bu, ilgili öğeyi silmeniz gereken zamandır.
      win = null
    })
  }

  let winLogin
  
  function createWindowLogin () {
    // Tarayıcı penceresini oluştur.
    winLogin = new BrowserWindow({width: 550, height: 600, frame: false})
  
    // ve uygulamanın index.html'sini yükle.
    winLogin.loadFile('login.html')
  
    // Pencere kapatıldığında ortaya çıkar.
    winLogin.on('closed', () => {
    //Pencere nesnesini referans dışı bırakın,
    // uygulamanız çoklu pencereleri destekliyorsa genellikle pencereleri
    // bir dizide saklarsınız, bu, ilgili öğeyi silmeniz gereken zamandır.
    winLogin = null
    })
  }


  // Bu yöntem, Electron başlatmayı tamamladığında
  // ve tarayıcı pencereleri oluşturmaya hazır olduğunda çağrılır.
  // Bazı API'ler sadece bu olayın gerçekleşmesinin ardından kullanılabilir.
  app.on('ready', createWindowLogin)
  //app.on('ready', createWindow('index.html', true, 2000, 1150))


  // Bütün pencereler kapatıldığında çıkış yap.
  app.on('window-all-closed', () => {
    // MacOS'de kullanıcı CMD + Q ile çıkana dek uygulamaların ve menü barlarının
    // aktif kalmaya devam etmesi normaldir.
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })    
  
  app.on('activate', () => {
    // MacOS'de dock'a tıklandıktan sonra eğer başka pencere yoksa
    // yeni pencere açılması normaldir.
    if (win === null) {
      createWindow()
    }
  })
  // Bu dosyada, uygulamanızın özel ana işleminin geri kalan bölümünü ekleyebilirsiniz
  // Kod. Ayrıca bunları ayrı dosyalara koyabilir ve buradan isteyebilirsiniz.