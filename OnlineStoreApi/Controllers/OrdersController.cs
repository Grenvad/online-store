using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreApi.Core.Services.OrderService.Commands;
using OnlineStoreApi.Core.Services.OrderService.Queries;
using OnlineStoreApi.Domain.Entities;
using System.Threading.Tasks;

namespace OnlineStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var result = await _mediator.Send(new GetOrders.Query());
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("не найдено");
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder([FromBody] Order order)
        {
            var result = await _mediator.Send(new CreateOrder.Command(order));
            if (result.Successed)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            var result = await _mediator.Send(new DeleteOrder.Command(id));
            if (result.Successed)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }
    }
}
