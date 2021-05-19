using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.CategoryService.Commands
{
    public class CreateCategory
    {
        public record Command(Category Category) : IRequest<Response>;

        public record Response(bool Successed, string Message);

        public class Handler : IRequestHandler<Command, Response>
        {
            private IMongoCollection<Category> _categoryCollection;

            public Handler(IMongoClient client)
            {
                var database = client.GetDatabase("OnlineStoreDb");
                _categoryCollection = database.GetCollection<Category>("Categories");
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                await _categoryCollection.InsertOneAsync(request.Category);
                return new Response(true, $"категория успешно добавлена");
            }
        }
    }
}
