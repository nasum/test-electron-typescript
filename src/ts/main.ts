/// <reference path="typings/electron/electron.d.ts" />
/// <reference path="typings/node/node.d.ts" />

import app = require('app');
import ipc = require('ipc');
import BrowserWindow = require('browser-window');
import crashReporter = require('crash-reporter');
import dialog = require('dialog');

class Main{
  constructor(){

    crashReporter.start();

    app.on('window-all-closed', function() {
      if (process.platform != 'darwin')
        app.quit();
    });

    app.on('ready', function() {
      var main_width:number = 800;
      var main_height:number = 600;

      var mainWindow:BrowserWindow = new BrowserWindow({width: main_width, height: main_height});
      var subWindow:BrowserWindow = new BrowserWindow({width: 800, height: 600, x: main_width});

      mainWindow.loadUrl('file://' + __dirname + '/index.html');
      subWindow.loadUrl('file://' + __dirname + '/sub.html');

      mainWindow.on('closed', function() {
        dialog.showMessageBox(mainWindow,{
          type: 'info',
          buttons: ['hoge','huga'],
          title: 'hogehoge',
          message: 'hogehoge',
          detail: 'hogehogehugahuga'
        });
        mainWindow = null;
      });
    });
  }
}

var main:Main = new Main();
