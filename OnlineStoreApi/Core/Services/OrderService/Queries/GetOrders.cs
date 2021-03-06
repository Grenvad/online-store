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
        public record Query() : IRequest<IEnumerable<OrderViewModel>>;

        public class Handler : IRequestHandler<Query, IEnumerable<OrderViewModel>>
        {
            private readonly IMongoCollection<Order> _orderCollection;
            private readonly IMongoCollection<Product> _productCollection;

            public Handler(IMongoClient client)
            {
                var database = client.GetDatabase("OnlineStoreDb");
                _orderCollection = database.GetCollection<Order>("Orders");
                _productCollection = database.GetCollection<Product>("Products");
            }

            private OrderItemViewModel[] GetOrderItemsViewModels(OrderItem[] items)
            {
                var models = new List<OrderItemViewModel>();
                var products = _productCollection.AsQueryable().ToList();

                return items.Select(i => new OrderItemViewModel
                {
                    Item = products.Where(p => p.Id == i.ItemId).FirstOrDefault(),
                    Amount = i.Amount
                }).ToArray();
            }

            public async Task<IEnumerable<OrderViewModel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = _orderCollection.AsQueryable().ToList();
                return orders.Select(i => new OrderViewModel
                {
                    Id = i.Id,
                    Address = i.Address,
                    ClientPhoneNumber = i.ClientPhoneNumber,
                    IsCashPayment = i.IsCashPayment,
                    IsDelivered = i.IsDelivered,
                    TotalPrice = i.TotalPrice,
                    Items = i.Items.Select(item => new OrderItemViewModel
                    {
                        Item = _productCollection.Find(p => p.Id == item.ItemId).FirstOrDefault(),
                        Amount = item.Amount
                    }).ToArray()
                }).ToList();
            }
        }
    }
}
