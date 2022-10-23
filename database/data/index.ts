import { countries, SeedCountry } from './countries';
import { products, SeedProduct } from './products';
import { SeedUser, users } from './users';

interface SeedData {
    countries: SeedCountry[];
    products: SeedProduct[];
    users: SeedUser[];
}

export const seedDatabase: SeedData = {
    users,
    products,
    countries,
}
