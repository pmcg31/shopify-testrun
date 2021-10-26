import * as React from "react"
import { StoreProvider } from "./src/components/store-context"

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
)
