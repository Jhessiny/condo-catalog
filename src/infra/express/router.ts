import { Router } from 'express'

const router = Router()

router.get('/catalog-list', (req, res) => res.status(200).json({ oi: 'oi' }))

export default router
