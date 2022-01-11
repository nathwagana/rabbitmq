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

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});