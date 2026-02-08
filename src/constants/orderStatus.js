/**
 * Order status. Matches Order.orderStatus enum.
 */
export const ORDER_STATUS = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "returned",
  "refunded",
  "partially_delivered",
  "failed",
];

export const ORDER_STATUS_LABELS = {
  pending: "Pending (payment pending)",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
  refunded: "Refunded",
  partially_delivered: "Partially delivered",
  failed: "Failed",
};

export default ORDER_STATUS;
