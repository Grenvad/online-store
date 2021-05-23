using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.ProductService.Queries
{
    public class GetProductById
    {
        public record Query(string Id) : IRequest<Product>;

        public class Handler : IRequestHandler<Query,Product>
        {
            private readonly IMongoCollection<Product> _productCollection;

            public Handler(IMongoClient client)
            {
                var database = client.GetDatabase("OnlineStoreDb");
                _productCollection = database.GetCollection<Product>("Products");
            }

            public async Task<Product> Handle(Query request, CancellationToken cancellationToken)
            {
                return _productCollection.AsQueryable().Where(i => i.Id == request.Id).FirstOrDefault();
            }
        }
    }
}
