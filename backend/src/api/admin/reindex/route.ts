import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const container = req.scope

  try {
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    // Obtener productos
    const { data: products } = await query.graph({
      entity: "product",
      fields: ["id", "title", "description", "handle", "status"],
      filters: { status: ["published", "draft"] }
    })

    console.log(`Reindexando ${products.length} productos...`)

    // Indexar en Meilisearch usando API directa
    const documentsToIndex = products.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      status: product.status
    }))

    const response = await fetch(`${process.env.MEILISEARCH_HOST}/indexes/products/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MEILISEARCH_ADMIN_KEY}`
      },
      body: JSON.stringify(documentsToIndex)
    })

    if (response.ok) {
      const result = await response.json()
      return res.json({
        success: true,
        message: `Reindexados ${products.length} productos`,
        taskUid: result.taskUid
      })
    } else {
      throw new Error(await response.text())
    }

  } catch (error) {
    console.error('Error reindexando:', error)
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
