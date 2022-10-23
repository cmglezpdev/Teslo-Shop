
export interface IRegion {
    _id: string;
    name: string;
    code: string;
}

export interface ICountry {
    _id: string;
    name: string,
    code: string,
    capital: string,
    region: string,
    currency: {
        code: string,
        name: string,
        symbol: string | null,
    },
    language: {
        code: string,
        name: string,
    },
    flag: string,
}