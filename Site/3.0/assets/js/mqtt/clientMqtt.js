function getVar(message, ident) {           //Função que trata a string e retorna o valor de cada variavel dependendo do seu identificador.
    var stg = message.split(': ');          //Separa o '+CGNSINF+CGNSINF: ' da string final
    var res = stg[1].split(',');
    return res[ident];
}

var client = mqtt.connect('ws://iot.eclipse.org:80/ws')
client.on('connect', function () {
    console.log('client connected')
    client.subscribe('/ufpa/circular/loc/+');
    client.on('message', function (topic, payload) {
        var circular = topic.split('/')
        var mess = payload.toString()
        busText= "Circular" + circular[4];     // Nome do circular + circular[3] que é o numero do circular
        busTimer = getVar(mess, 2)             // Hora e Data
        busLat = getVar(mess, 3)               // Latitude
        busLng = getVar(mess, 4)               // Longitude
        busSpeed = getVar(mess, 6)             // Velocidade

        set_bus(busLat, busLng, map);
    });
});
