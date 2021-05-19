using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.ProductService.Commands
{
    public class DeleteProduct
    {
        public record Command(string Id) : IRequest<Response>;

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
                var result = await _productCollection.DeleteOneAsync(p => p.Id == request.Id);
                return result.IsAcknowledged ? new Response(true, $"Товар успешно удалён")
                                             : new Response(false, $"Что-то пошло не так");
            }
        }
    }
}
