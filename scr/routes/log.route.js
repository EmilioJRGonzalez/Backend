import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
    req.logger.debug("Prueba de log level debug")
    req.logger.info("Prueba de log level info")
    req.logger.http("Prueba de log level http")
    req.logger.warning("Prueba de log level warning")
    req.logger.error("Prueba de log level error")
    req.logger.fatal("Prueba de log level fatal")
    res.send("Prueba de logger!")

})

export default router;