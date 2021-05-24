namespace OnlineStoreApi.Domain.Entities
{
    public class OrderViewModel
    {
        public string Id { get; set; }
        public string Address { get; set; }
        public string ClientPhoneNumber { get; set; }
        public bool IsCashPayment { get; set; }
        public decimal TotalPrice { get; set; }
        public string IsDelivered { get; set; }
        public OrderItemViewModel[] Items { get; set; }
    }
}
