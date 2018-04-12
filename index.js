var http = require('http');
var nodemailer = require('nodemailer');
var jsonfile = require('jsonfile');

var ip_actual = "";
var usuariogmail = "*****"
var contraseñagmail = "****"
var correodestino = "*****"
var tiempointervalo = 1000;
var file = 'ip.json';
file = __dirname+'/'+file;

ip_actual = jsonfile.readFileSync(file).ip;
console.log(__dirname);

setInterval(function know_public_ip(){
    console.log("Realizando petición");

    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
      resp.on('data', function(ip) {
        console.log("My public IP address is: " + ip);
        if(ip_actual != ip.toString()){
          console.log("La IP pública ha cambiado " + ip_actual + " --> " + ip);
          ip_actual = ip.toString();

          var obj = {ip: ip_actual}
          jsonfile.writeFile(file, obj, function (err) {
            console.error(err)

          var transporter = nodemailer.createTransport('smtps://'+usuariogmail+'%40gmail.com:'+contraseñagmail+'@smtp.gmail.com');

            var mailOptions = {
                from: '"Yo" ',
                to: correodestino,
                subject: 'Ip pública cambiada',
                text: 'La nueva IP pública es : ' + ip_actual,
            };

            transporter.sendMail(mailOptions, function(error, info){
            if(error){
              return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            });
          });
        }
        else{
          console.log("IP pública no ha cambiado")
        }
      });
    });

}, tiempointervalo);
