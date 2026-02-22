import type { UUID } from "node:crypto"

export interface Products {
    image: string,
    rating: number,
    volume: number,
    price: number
}

export interface Customer {
	name: string,
	review: string,
	rating: number
}


