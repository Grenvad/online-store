using MediatR;
using MongoDB.Driver;
using OnlineStoreApi.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.CategoryService.Commands
{
    public class UpdateCategory
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
                var result = await _categoryCollection.
                   ReplaceOneAsync(i => i.Id == request.Category.Id, request.Category);
                return result.IsAcknowledged ? new Response(true, $"Категория успешно обновлена")
                                            : new Response(false, $"Что-то пошло не так");
            }
        }
    }
}
