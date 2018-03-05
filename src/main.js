const {app, BrowserWindow} = require('electron')
  const path = require('path')
  const url = require('url')
  // Create timestamps for console

  var log = console.log;
  console.log = function () {
      var first_parameter = arguments[0];
      var other_parameters = Array.prototype.slice.call(arguments, 1);

      function formatConsoleDate (date) {
          var hour = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          var milliseconds = date.getMilliseconds();

          return '[' +
                 ((hour < 10) ? '0' + hour: hour) +
                 ':' +
                 ((minutes < 10) ? '0' + minutes: minutes) +
                 ':' +
                 ((seconds < 10) ? '0' + seconds: seconds) +
                 '.' +
                 ('00' + milliseconds).slice(-3) +
                 '] ';
      }
      log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
  };

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

  function createWindow () {
    win = new BrowserWindow({
      show: false,
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      fullscreenable: false,
    })
    // and load the index.html of the app
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
    win.once('ready-to-show', () => {
      win.maximize()
      win.show()
      splash.destroy()
    })
    // creates a BrowserWindow, destroy's the splashscreen
    // Open the DevTools
    win.webContents.openDevTools()

    // Emitted when the window is closed
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
  // splashscreen initialization code
  function createSplash () {
    splash = new BrowserWindow({
      show: false,
      width: 400,
      height: 400,
      minWidth: 400,
      minHeight: 400,
      maxWidth: 400,
      maxHeight: 400,
      fullscreenable: false,
      maximizable:  false,
      frame: false,
    })
    splash.once('ready-to-show', () => {
      splash.show()
      console.log('opened the splashscreen')
    })
    splash.loadURL(url.format({
      pathname: path.join(__dirname, 'splash.html'),
      protocol: 'file:',
      slashes: true
    }))
    splash.on('closed', () => {
      splash = null
      console.log('closed the splashscreen')
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createSplash()
    createWindow()
    console.log('loaded app')
  })

  // Quit when all windows are closed
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
      console.log('app killed')
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
