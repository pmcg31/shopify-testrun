import * as React from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  storefrontAccessToken: process.env.HEEHAW_STOREFRONT_TOKEN,
  domain: process.env.HEEHAW_STORE_URL,
})

const defaultValues = {
  addToCart: () => {},
  clearCart: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`

export const StoreContext = React.createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = React.useState(defaultValues.checkout)

  const setCheckoutItem = checkout => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
  }

  React.useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout)
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      const newCheckout = await client.checkout.create()
      setCheckoutItem(newCheckout)
    }

    initializeCheckout()
  }, [])

  const addToCart = (variantId, quantity) => {
    // create an array of line items
    const lineItemsToAdd = [{ variantId, quantity }]

    // add line items to the checkout
    const checkoutId = checkout.id
    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      setCheckout(res)
    })
  }

  const clearCart = () => {
    let lineItemIds = []

    checkout.lineItems.forEach(item => {
      lineItemIds.push(item.id)
    })

    client.checkout.removeLineItems(checkout.id, lineItemIds).then(res => {
      setCheckout(res)
    })
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addToCart,
        clearCart,
        checkout,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
