import { LoginBody, RegisterAuthBody } from './schema'
import { z } from 'zod'

export type RegisterBodyType = z.infer<typeof RegisterAuthBody>
export type LoginBodyType = z.infer<typeof LoginBody>
