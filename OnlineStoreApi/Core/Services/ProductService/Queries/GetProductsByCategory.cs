using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.ProductService.Queries
{
    public class GetProductsByCategory
    {
        public record Query(string CategoryId) : IRequest<IEnumerable<Product>>;

        public class Handler : IRequestHandler<Query, IEnumerable<Product>>
        {
            private readonly IMongoCollection<Product> _productCollection;

            public Handler(IMongoClient client)
            {
                var database = client.GetDatabase("OnlineStoreDb");
                _productCollection = database.GetCollection<Product>("Products");
            }

            public async Task<IEnumerable<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                return _productCollection.AsQueryable().Where(i => i.CategoryId == request.CategoryId).ToList();
            }
        }
    }
}
