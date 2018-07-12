const electron = require('electron');
const app = electron.app;

const url = require('url');
const path = require('path');

const BrowserWindow = electron.BrowserWindow;
var mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({with: 1024, heigth: 768, backgroundColor: '#c3c3c3'});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname + '/game', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
});