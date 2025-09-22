import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const productModuleService = req.scope.resolve(Modules.PRODUCT)
    const pluginOptions = req.scope.resolve("meilisearch_options")

    // Verificar si el plugin de Meilisearch está configurado
    if (!pluginOptions) {
      return res.status(400).json({
        message: "Meilisearch plugin not configured",
        hint: "Make sure @rokmohar/medusa-plugin-meilisearch is properly configured in medusa-config.js"
      })
    }

    // Obtener todos los productos usando el método correcto
    const products = await productModuleService.listProducts(
      {},
      {
        relations: ["variants", "images", "categories"],
        take: 1000 // Ajusta según tu cantidad de productos
      }
    )

    // Forzar un reindex llamando al endpoint del plugin
    // El plugin de Meilisearch escucha eventos de productos automáticamente
    // pero podemos forzar una actualización emitiendo eventos
  const eventBus = req.scope.resolve(Modules.EVENT_BUS)

    let indexedCount = 0
    // Emit events in small batches to avoid overloading the bus
    const BATCH_SIZE = 100
    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      const slice = products.slice(i, i + BATCH_SIZE)
      const messages = slice.map((product) => ({
        name: "product.updated",
        data: {
          id: product.id,
          product,
        },
      }))

      try {
        await eventBus.emit(messages as any)
        indexedCount += slice.length
      } catch (error) {
        console.error("Error emitting reindex batch:", error)
      }
    }

    return res.json({
      message: "Product reindex events emitted successfully",
      total_products: products.length,
      indexed_count: indexedCount,
      note: "The Meilisearch plugin will process these events asynchronously"
    })
  } catch (error) {
    console.error("Reindex error:", error)
    return res.status(500).json({
      message: "Error triggering reindex",
      error: error.message
    })
  }
}
