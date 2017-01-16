import Cart from '../models/Cart'
import { getSchema } from '@risingstack/graffiti-mongoose'

const options = {
  mutation: false, // mutation fields can be disabled
  allowMongoIDMutation: false // mutation of mongo _id can be enabled
}

export const schema = getSchema([Cart], options)