using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.OrderService.Commands
{
    public class DeleteOrder
    {
        public record Command(string Id) : IRequest<Response>;

        public record Response(bool Successed, string Message);

        public class Handler : IRequestHandler<Command, Response>
        {
            private IMongoCollection<Order> _orderCollection;

            public Handler(IMongoClient client)
            {
                var database = client.GetDatabase("OnlineStoreDb");
                _orderCollection = database.GetCollection<Order>("Orders");
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                var result = await _orderCollection.DeleteOneAsync(p => p.Id == request.Id);
                return result.IsAcknowledged ? new Response(true, $"Категория успешно удалёна")
                                             : new Response(false, $"Что-то пошло не так");
            }
        }
    }
}
