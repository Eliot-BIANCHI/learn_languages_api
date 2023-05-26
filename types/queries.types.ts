export type StringQuery = {
	values?: string[]
	default: string
}

export type NumberQuery = {
	min?: number
	max?: number
	default: number
}

export type Query = {
	name: string
	schema: StringQuery | NumberQuery
}
