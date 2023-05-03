const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
    chickens:store.collection('chickens'),
    farms:store.collection('farms'),
    logs:store.collection('logs')
 };