using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreApi.Core.Services.CategoryService.Commands;
using OnlineStoreApi.Core.Services.CategoryService.Queries;
using OnlineStoreApi.Domain.Entities;
using System.Threading.Tasks;


namespace OnlineStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoryList()
        {
            var result = await _mediator.Send(new GetCategoryList.Query());
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("не найдено");
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] Category category)
        {
            var result = await _mediator.Send(new CreateCategory.Command(category));
            if (result.Successed)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCategory([FromBody] Category category)
        {
            var result = await _mediator.Send(new UpdateCategory.Command(category));
            if (result.Successed)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(string id)
        {
            var result = await _mediator.Send(new DeleteCategory.Command(id));
            if (result.Successed)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
    }
}
