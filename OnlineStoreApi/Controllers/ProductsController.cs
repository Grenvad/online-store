using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreApi.Core.Services.ProductService.Commands;
using OnlineStoreApi.Core.Services.ProductService.Queries;
using OnlineStoreApi.Domain.Entities;
using System.Threading.Tasks;

namespace OnlineStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductList(string categoryId)
        {
            var result = await _mediator.Send(new GetProductsByCategory.Query(categoryId));
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("не найдено");
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            var result = await _mediator.Send(new CreateProduct.Command(product));
            if (result.Successed)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct([FromBody] Product product)
        {
            var result = await _mediator.Send(new UpdateProduct.Command(product));
            if (result.Successed)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var result = await _mediator.Send(new DeleteProduct.Command(id));
            if (result.Successed)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
    }
}
