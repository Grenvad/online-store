using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.OrderService.Queries
{
    public class GetOrders
    {
        public record Query() : IRequest<IEnumerable<Order>>;

        public class Handler : IRequestHandler<Query, IEnumerable<Order>>
        {
            private readonly IMongoCollection<Order> _orderCollection;

            public Handler(IMongoClient client)
            {
                var database = client.GetDatabase("OnlineStoreDb");
                _orderCollection = database.GetCollection<Order>("Orders");
            }

            public async Task<IEnumerable<Order>> Handle(Query request, CancellationToken cancellationToken)
            {
                return _orderCollection.AsQueryable().ToList();
            }
        }
    }
}
