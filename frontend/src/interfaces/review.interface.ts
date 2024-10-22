export interface Reviews {
    review: Array<{
        id: number
        author: string
        content: string
        rating: number
        date: string
    }>
}