import type { Tables } from '@/types/database.types'
import type { ReferenceWine } from '@/types/wine'

export type CollectionItem = Tables<'collection_items'>

export type CollectionItemWithWine = CollectionItem & {
  reference_wine: ReferenceWine | null
}
