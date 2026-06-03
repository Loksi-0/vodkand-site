type Product = {
  name: string
  value: string
  valueOld?: string
  title: string
  image: string
  buttonText: string
}

const getProducts = async (): Promise<Product[] | 'error'> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      { next: { revalidate: 600 } }
    )

    if (!response.ok) {
      throw new Error()
    }

    const data = (await response.json()) as Product[]

    return data
  } catch {
    return 'error'
  }
}

export default getProducts
