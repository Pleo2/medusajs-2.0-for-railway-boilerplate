import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const productModuleService = req.scope.resolve(Modules.PRODUCT)
    const meilisearchService = req.scope.resolve("meilisearchService")

    // Verificar que Meilisearch esté configurado
    if (!meilisearchService) {
      return res.status(400).json({ 
        message: "Meilisearch service not configured" 
      })
    }

    // Obtener todos los productos
    const [products, count] = await productModuleService.listAndCount(
      {}, 
      {
        relations: ["variants", "images", "categories"],
        take: 1000 // Ajusta según tu cantidad de productos
      }
    )

    // Reindexar productos en Meilisearch
    const indexedProducts = []
    for (const product of products) {
      try {
        await meilisearchService.addDocuments("products", [{
          id: product.id,
          title: product.title,
          description: product.description,
          handle: product.handle,
          variant_sku: product.variants?.map(v => v.sku).filter(Boolean).join(" ") || "",
          thumbnail: product.thumbnail || product.images?.[0]?.url || ""
        }])
        indexedProducts.push(product.id)
      } catch (error) {
        console.error(`Error indexing product ${product.id}:`, error)
      }
    }

    return res.json({ 
      message: "Products reindexed successfully",
      total_products: count,
      indexed_count: indexedProducts.length,
      indexed_ids: indexedProducts
    })
  } catch (error) {
    console.error("Reindex error:", error)
    return res.status(500).json({ 
      message: "Error reindexing products",
      error: error.message 
    })
  }
}