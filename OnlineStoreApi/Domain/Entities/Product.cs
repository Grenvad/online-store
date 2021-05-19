using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineStoreApi.Domain.Entities
{
    public class Product
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("categoryId")]
        public string CategoryId { get; set; }
        [BsonElement("image")]
        public string Image { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("description")]
        public string Description { get; set; }
        [BsonElement("price")]
        public decimal Price { get; set; }
    }
}
