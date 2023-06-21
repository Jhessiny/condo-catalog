import { type Route } from '../application/models/route'
import { createMerchantController } from './controllers/create-merchant-controller'
import { listMerchantsController } from './controllers/list-merchants-controller'

export const routes: Route[] = [
  {
    name: 'create-merchant',
    path: '/merchants',
    method: 'post',
    handler: createMerchantController,
  },
  {
    name: 'merchant-list',
    path: '/merchants',
    method: 'get',
    handler: listMerchantsController,
  },
]
