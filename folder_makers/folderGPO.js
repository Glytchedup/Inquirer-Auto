
function folderGPO () {

    var fs = require('fs');
    var moment = require('moment');
    var path = require('path');
    var userName = process.env['USERPROFILE'].split(path.sep)[2];
    var loginId = path.join(userName);

    var dir = 'C:/Users/' + loginId + '/Desktop/GPO ' + moment().format('MM-DD-YYYY');

    !fs.existsSync(dir) && fs.mkdirSync(dir);
    };

folderGPO();

   