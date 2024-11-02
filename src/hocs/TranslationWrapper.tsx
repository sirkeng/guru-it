// Next Imports
import type { headers } from 'next/headers'

// Type Imports
import type { ChildrenType } from '@core/types'

const TranslationWrapper = (params: { headersList: ReturnType<typeof headers>; } & ChildrenType) => {

  // ℹ️ This doesn't mean MISSING, it means INVALID

  return params.children
}

export default TranslationWrapper
