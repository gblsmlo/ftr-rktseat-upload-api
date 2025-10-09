import { z } from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().min(1).max(65535).default(3333),
	NODE_ENV: z
		.enum(['development', 'test', 'production'])
		.default('development'),
	DATABASE_URL: z.url().startsWith('postgresql://'),
	CLOUDFLARE_BUCKET_NAME: z.string(),
	CLOUDFLARE_ACCOUNT_ID: z.string(),
	CLOUDFLARE_ACCESS_KEY: z.string(),
	CLOUDFLARE_ACCESS_SECRET: z.string(),
	CLOUDFLARE_PUBLIC_URL: z.url(),
})

export const env = envSchema.parse(process.env)
