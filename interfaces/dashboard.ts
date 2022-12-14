
export interface DashboardSummaryResponse {
    paidOrders:              number;
    notPaidOrders:           number;
    numberOfOrders:          number;
    numberOfClients:         number;
    numberOfProducts:        number;
    productsWithNoInventary: number;
    lowInventary:            number;
}
