#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqps://ukirirue:HLCziFbXs5CNnbz9M2cqXo3ecmCl_IMW@jackal.rmq.cloudamqp.com/ukirirue', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        var queue = 'nova_fila';
        var msg = 'Hello World!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});