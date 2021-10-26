import * as React from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
  domain: process.env.GATSBY_SHOPIFY_STORE_URL,
})

const defaultValues = {
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  doCheckout: () => {},
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

  const removeFromCart = itemId => {
    // create an array of line items
    const lineItemsToRemove = [itemId]

    // add line items to the checkout
    const checkoutId = checkout.id
    client.checkout.removeLineItems(checkoutId, lineItemsToRemove).then(res => {
      setCheckout(res)
    })
  }

  const updateQuantity = async (itemId, quantity) => {
    // create an array of line items
    const lineItemsToUpdate = [{ id: itemId, quantity }]

    // update items in checkout
    const checkoutId = checkout.id
    client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
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

  const doCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        doCheckout,
        checkout,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
