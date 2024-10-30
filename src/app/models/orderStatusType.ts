export enum OrderStatusType {
    ALL = 'All',
    PENDING = 'pendi',
    TOSHIP = 'toShi',
    FORDELIVERY = 'forDe',
    RECEIVED = 'recei'
}
export const OrderStatusTypeLabels: { [key in OrderStatusType]: string } = {
    [OrderStatusType.ALL]: 'All Orders',
    [OrderStatusType.PENDING]: 'Pending',
    [OrderStatusType.TOSHIP]: 'To Ship',
    [OrderStatusType.FORDELIVERY]: 'For Delivery',
    [OrderStatusType.RECEIVED]: 'Received'
};