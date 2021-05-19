using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace OnlineStoreApi.Domain.Entities
{
    public class Category
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
    }
}
