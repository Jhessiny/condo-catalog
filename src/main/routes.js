"use strict";
exports.__esModule = true;
exports.routes = void 0;
var controllers_factories_1 = require("./controllers-factories");
exports.routes = [
    {
        name: 'create-merchant',
        path: '/merchants',
        method: 'post',
        handler: (0, controllers_factories_1.makeCreateMerchantController)()
    },
    {
        name: 'merchant-list',
        path: '/merchants',
        method: 'get',
        handler: (0, controllers_factories_1.makeListMerchantsController)()
    },
];
