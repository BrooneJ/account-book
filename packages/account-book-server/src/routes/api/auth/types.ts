import { AuthBody } from './schema'
import { z } from 'zod'

export type AuthBodyType = z.infer<typeof AuthBody>
