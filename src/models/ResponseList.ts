

interface ResponseList <T> {
    totalItems: number;
    pageNo: number;
    pageSize: number;
    totalPages: number
    items : T []
    first: boolean;
    last: boolean;
}

export default ResponseList