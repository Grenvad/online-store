using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineStoreApi.Domain.Entities
{
    public class Order
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("address")]
        public string Address { get; set; }
        [BsonElement("clientPhoneNumber")]
        public string ClientPhoneNumber { get; set; }
        [BsonElement("isCashPayment")]
        public bool IsCashPayment { get; set; }
        [BsonElement("totalPrice")]
        public decimal TotalPrice { get; set; }
        [BsonElement("isDelivered")]
        public string IsDelivered { get; set; }
        [BsonElement("orderItems")]
        public OrderItem[] Items { get; set; }
    }
}
