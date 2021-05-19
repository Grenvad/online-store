using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.OrderService.Commands
{
    public class CreateOrder
    {
        public record Command(Order Order) : IRequest<Response>;

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
                await _orderCollection.InsertOneAsync(request.Order);
                return new Response(true, $"Заказ успешно добавлен");
            }
        }
    }
}
