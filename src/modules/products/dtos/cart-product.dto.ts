import { Expose } from "class-transformer"

export class cartProductDto {
    @Expose()
    id: number

    @Expose()
    quantity: number

    @Expose()
    idComprador: number

    @Expose()
    idRestaurant: number
}