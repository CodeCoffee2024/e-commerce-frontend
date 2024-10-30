import { Mapper } from "../shared/mapper";
import { Cart, CartDTO } from "./cart";
import { CityMunicipality, CityMunicipalityDTO } from "./cityMunicipality";
import { DTO } from "./dto";
import { Merchant, MerchantDTO } from "./merchant";
import { OrderStatusType, OrderStatusTypeLabels } from "./orderStatusType";
import { PaymentOption } from "./paymentOption";
import { Product } from "./product";
import { ShippingMerchantDTO } from "./shippingMerchant";
import { UserDTO, UserFragment } from "./user";

export interface OrderItem {
    id: Number;
    price: Number;
    product: Product;
    quantity: Number;
    status: OrderStatusType;
    canSetAsToShip: boolean;
    canSetAsForDelivery: boolean;
}
export interface Order {
    id: Number;
    items: OrderItem[];
    paymentOption: PaymentOption;
    referenceNumber: string;
    status: string;
    customer: UserFragment;
    totalPrice: Number;
    totalShipping: Number;
    canSetAsToShip: boolean;
    canSetAsForDelivery: boolean;
    shippingMerchant: ShippingMerchantDTO[];
}
export class OrderItemDTO implements OrderItem {
    id: Number;
    price: Number;
    product: Product;
    status: OrderStatusType;
    quantity: Number;
    canSetAsToShip: boolean;
    canSetAsForDelivery: boolean;
}
export class OrderDTO implements Order {
    id: Number;
    items: OrderItemDTO[];
    paymentOption: PaymentOption;
    status: string;
    referenceNumber: string;
    customer: UserFragment;
    shipTo: CityMunicipalityDTO;
    totalPrice: Number;
    totalShipping: Number;
    grandTotal: Number;
    canSetAsToShip: boolean;
    canSetAsForDelivery: boolean;
    createdAt: Date;
    shippingMerchant: ShippingMerchantDTO[];
    orderMapper(data) {
        let orderMapper = new Mapper<Order, OrderDTO>((orders: OrderDTO): OrderDTO => {
            return orders;
        })
        return orderMapper.map(data);
    }
    ordersMapper(data) {
        let orderMapper = new Mapper<Order[], OrderDTO[]>((orders: OrderDTO[]): OrderDTO[] => {
            return orders;
        })
        return orderMapper.map(data);
    }
}
export class OrderForm extends DTO implements Order {
    id: Number;
    items: OrderItemForm[] = [];
    paymentOption: PaymentOption;
    status: string;
    nextStatus: string;
    referenceNumber: string;
    customer: UserFragment;
    shipTo: CityMunicipalityDTO;
    totalPrice: Number;
    totalShipping: Number;
    grandTotal: Number;
    canSetAsToShip: boolean;
    canSetAsForDelivery: boolean;
    createdAt: Date;
    shippingMerchant: ShippingMerchantDTO[];
    get selectedItems () {
      return this.items.filter(it=>it.isSelected);
    }
    itemStatusTotal () {
      let selectedTotal = 0;
      this.merchants.forEach(merchant => {
        selectedTotal = this.selectedItems.reduce((total, item) => { 
          return total + (Number(item.price) * Number(item.quantity));
        }, 0) + this.merchantShippingFee(merchant);
      });
      return selectedTotal;
    }
    fill(order: OrderDTO) {
        this.id = order?.id;
        order.items.forEach(item => {
            let orderItem = new OrderItemForm();
            orderItem.fill(item)
            this.items.push(orderItem);
        });
        this.paymentOption = order.paymentOption;
        this.status = order.status;
        this.referenceNumber = order.referenceNumber;
        this.customer = order.customer;
        this.shipTo = order.shipTo;
        this.totalPrice = order.totalPrice;
        this.totalShipping = order.totalShipping;
        this.grandTotal = order.grandTotal;
        this.canSetAsToShip = order.canSetAsToShip;
        this.canSetAsForDelivery = order.canSetAsForDelivery;
        this.createdAt = order.createdAt;
        this.shippingMerchant = order.shippingMerchant;
    }
    merchantShippingFee(merchant: MerchantDTO) {
      return Number(this.shippingMerchant.find(it=> it.merchant.id == merchant.id)?.shippingFee);
    }
    getMerchantItems(merchant: MerchantDTO) {
      return this.items.filter(it=>it.product.merchant.id == merchant.id);
    }
    get merchants() {
      let cart = this.items;
      const merchants = cart.map(it => it).sort((a,b)=> a.id.valueOf() - b.id.valueOf())
        .map(item => item.product.merchant)
        .filter((merchant, index, self) => self.findIndex(m => m.id === merchant.id) === index);
      return merchants;
    }
    get nextActionClass() {
      switch (this.nextStatus) {
        case OrderStatusType.PENDING:
          return 'btn-info';
        case OrderStatusType.TOSHIP:
          return 'btn-warning';
        case OrderStatusType.FORDELIVERY:
          return 'btn-success';
        default: 
          return 'btn-secondary';
      }
    }
    get nextStatusAction() {
      switch (this.status) {
        case OrderStatusTypeLabels[OrderStatusType.PENDING]:
          return OrderStatusType.TOSHIP;
        case OrderStatusTypeLabels[OrderStatusType.TOSHIP]:
          return OrderStatusType.FORDELIVERY;
        case OrderStatusTypeLabels[OrderStatusType.FORDELIVERY]:
          return OrderStatusType.RECEIVED;
        default: 
          return OrderStatusType.PENDING;
      }
    }
    get nextActionLabel() {
      switch (this.nextStatus) {
        case OrderStatusType.PENDING:
            return OrderStatusTypeLabels[OrderStatusType.TOSHIP];
        case OrderStatusType.TOSHIP:
          return OrderStatusTypeLabels[OrderStatusType.FORDELIVERY];
        default:
            return OrderStatusTypeLabels[OrderStatusType.RECEIVED];
      }
    }
}
export class OrderItemForm implements OrderItem {
    id: Number;
    isSelected: boolean;
    price: Number;
    product: Product;
    status: OrderStatusType;
    quantity: Number;
    canSetAsToShip: boolean;
    canSetAsForDelivery: boolean;
    fill(order: OrderItemDTO) {
        this.id = order?.id;
        this.price = order.price;
        this.canSetAsForDelivery = order.canSetAsForDelivery;
        this.canSetAsForDelivery = order.canSetAsForDelivery;
        this.status = order.status;
        this.isSelected = false;
        this.quantity = order.quantity;
        this.product = order.product;
    }
}
