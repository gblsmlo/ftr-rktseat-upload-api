import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { isRight, unwrapEither } from '@/shared/either'
import { makeUpload } from '@/test/factories/make-upload'
import { getUploads } from './get-uploads'

describe('get uploads', () => {
	it('should be able to get the uploads', async () => {
		const namePattern = randomUUID()

		const upload1 = await makeUpload({
			name: `file-${namePattern}-1.png`,
		})
		const upload2 = await makeUpload({
			name: `file-${namePattern}-2.png`,
		})
		const upload3 = await makeUpload({
			name: `file-${namePattern}-3.png`,
		})
		const upload4 = await makeUpload({
			name: `file-${namePattern}-4.png`,
		})

		const sut = await getUploads({
			searchQuery: namePattern,
		})

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).total).toBe(4)
		expect(unwrapEither(sut).uploads).toEqual([
			expect.objectContaining({ id: upload4.id }),
			expect.objectContaining({ id: upload3.id }),
			expect.objectContaining({ id: upload2.id }),
			expect.objectContaining({ id: upload1.id }),
		])
	})
	it('should be able to get paginated uploads', async () => {
		const namePattern = randomUUID()

		const upload1 = await makeUpload({
			name: `file-${namePattern}-1.png`,
		})
		const upload2 = await makeUpload({
			name: `file-${namePattern}-2.png`,
		})
		const upload3 = await makeUpload({
			name: `file-${namePattern}-3.png`,
		})
		const upload4 = await makeUpload({
			name: `file-${namePattern}-4.png`,
		})

		let sut = await getUploads({
			searchQuery: namePattern,
			page: 1,
			pageSize: 3,
		})
		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).total).toEqual(4)
		expect(unwrapEither(sut).uploads).toEqual([
			expect.objectContaining({ id: upload4.id }),
			expect.objectContaining({ id: upload3.id }),
			expect.objectContaining({ id: upload2.id }),
		])

		sut = await getUploads({
			searchQuery: namePattern,
			page: 1,
			pageSize: 2,
		})
		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).total).toEqual(4)
		expect(unwrapEither(sut).uploads).toEqual([
			expect.objectContaining({ id: upload4.id }),
			expect.objectContaining({ id: upload3.id }),
		])
	})
	it('should be able to get sorted uploads', async () => {
		const namePattern = randomUUID()

		const upload1 = await makeUpload({
			name: `file-${namePattern}-1.png`,
			createdAt: new Date(),
		})
		const upload2 = await makeUpload({
			name: `file-${namePattern}-2.png`,
			createdAt: dayjs().subtract(1, 'day').toDate(),
		})
		const upload3 = await makeUpload({
			name: `file-${namePattern}-3.png`,
			createdAt: dayjs().subtract(2, 'day').toDate(),
		})
		const upload4 = await makeUpload({
			name: `file-${namePattern}-4.png`,
			createdAt: dayjs().subtract(3, 'day').toDate(),
		})

		let sut = await getUploads({
			searchQuery: namePattern,
			sortBy: 'createdAt',
			sortDirection: 'desc',
		})

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).total).toBe(4)
		expect(unwrapEither(sut).uploads).toEqual([
			expect.objectContaining({ id: upload1.id }),
			expect.objectContaining({ id: upload2.id }),
			expect.objectContaining({ id: upload3.id }),
			expect.objectContaining({ id: upload4.id }),
		])

		sut = await getUploads({
			searchQuery: namePattern,
			sortBy: 'createdAt',
			sortDirection: 'asc',
		})

		expect(isRight(sut)).toBe(true)
		expect(unwrapEither(sut).total).toBe(4)
		expect(unwrapEither(sut).uploads).toEqual([
			expect.objectContaining({ id: upload4.id }),
			expect.objectContaining({ id: upload3.id }),
			expect.objectContaining({ id: upload2.id }),
			expect.objectContaining({ id: upload1.id }),
		])
	})
})
