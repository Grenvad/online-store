using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.CategoryService.Queries
{
    public class GetCategoryList
    {
        public record Query() : IRequest<IEnumerable<Category>>;

        public class Handler : IRequestHandler<Query, IEnumerable<Category>>
        {
            private readonly IMongoCollection<Category> _categoryCollection;

            public Handler(IMongoClient client)
            {
                var database = client.GetDatabase("OnlineStoreDb");
                _categoryCollection = database.GetCollection<Category>("Categories");
            }

            public async Task<IEnumerable<Category>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _categoryCollection.AsQueryable().ToListAsync();
            }
        }
    }
}
