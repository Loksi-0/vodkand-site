type ProductType = {
  name: string
  value: string
  valueOld: string
  description: string
  title: string
  image: string
  buttonText: string
  disclaimer: string
}

const getPassPrice = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/pass`
    )

    if (!response.ok) {
      throw new Error()
    }

    const data = (await response.json()) as ProductType

    return { price: data.value.split('.')[0] }
  } catch {
    return { price: '-' }
  }
}

export default getPassPrice
