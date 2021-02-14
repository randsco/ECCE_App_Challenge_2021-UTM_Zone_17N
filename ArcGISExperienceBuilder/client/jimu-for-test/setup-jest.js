require('jest-fetch-mock').enableMocks()

const { System } = require('systemjs');
global.systemRegister = System.register;