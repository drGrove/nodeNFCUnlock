var serial = require('serialport').SerialPort,
    sys = require('sys'),
    exec = require('child_process').exec,
    config = require('./libs/config'),
    user = require('./libs/user'),
    card = require('./libs/cards'),
    sp = new serial(config.serial, {
        baudrate: 57600
    }); 


function puts (error, stdout, stderr) { sys.puts(stdout)}
// Check for connection 
var readData = "";

function clearData() {
    dataStringBuf = "";
    readData = "";
    cardData = "";
    cardBuf = "";
    cardid = "";
    fromDB = "";
}

sp.on("open", function(){
    console.log("Reader active and waiting for card");
    sp.on('data', function(data){
        console.log("Reading Card......")
        var dataStringBuf = new String(data);
        if(dataStringBuf.indexOf("*") != 1) {
            readData += dataStringBuf;
        } else {
            readData += dataStringBuf;
        }

        if(readData.indexOf("*") != -1) {
            var cardData = readData.split(",");
            var cardBuf = cardData[4];
            var cardid = cardBuf.replace(/_/g, "");
            console.log("Card: " + cardid);
            // Check for Door Auth Code
            // Check postgres for nfc/rfid match
            new card.Card({cardid: cardid})
                .fetch()
                .then(function(crd){
                    fromDB= crd.get('cardid') || null
                    if( fromDB == cardid ){
                        exec("killall xscreensaver", puts);
                        exec("xscreensaver");
                    }
                    clearData();
                })
                .otherwise(function(err){
                    console.log(err)
                    clearData();
                })
                /*
            pgClient.query("SELECT firstname, lastname from users u left join cards c on u.id = c.user_id where c.cardid = '" + card + "'", function(err, result) {
                if(result.rowCount > 0) {
                    // Grab member Data
                    var fname = result.rows[0].firstname;
                    var lname = result.rows[0].lastname;
                    console.log("Welcome " + fname + " " + lname + "!");
                    exec("killall xscreensaver", puts);
                    exec("xscreensaver");
                } else {
                    console.log("This is not the lab you're looking for.")
                }
                clearData();
            });
            */
        }
    });
});
