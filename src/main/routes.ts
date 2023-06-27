import { type Route } from '../application/models/route'
import {
  makeCreateMerchantController,
  makeFindMerchantByIdController,
  makeListMerchantsController,
} from './controllers-factories'

export const routes: Route[] = [
  {
    name: 'create-merchant',
    path: '/merchants',
    method: 'post',
    handler: makeCreateMerchantController(),
  },
  {
    name: 'merchant-list',
    path: '/merchants',
    method: 'get',
    handler: makeListMerchantsController(),
  },
  {
    name: 'merchant-by-id',
    path: '/merchants/:id',
    method: 'get',
    handler: makeFindMerchantByIdController(),
  },
]
