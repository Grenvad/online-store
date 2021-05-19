using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.ProductService.Commands
{
    public class CreateProduct
    {
        public record Command(Product Product) : IRequest<Response>;

        public record Response(bool Successed, string Message);

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IMongoCollection<Product> _productCollection;

            public Handler(IMongoClient client)
            {
                var database = client.GetDatabase("OnlineStoreDb");
                _productCollection = database.GetCollection<Product>("Products");
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                await _productCollection.InsertOneAsync(request.Product);
                return new Response(true, $"Товар успешно добавлен");
            }
        }
    }
}
