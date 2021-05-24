using Application.Services.UserService.Queries;
using Domain.Entitties.Identity;
using OnlineStoreApi.Core.Services.UserService.Commands;
using OnlineStoreApi.Core.Services.UserService.Queries;
using OnlineStoreApi.Domain.Entitties.Identity;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreApi.Entitties.Identity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OnlineStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<UserViewModel>> GetUserList()
        {
           return await _mediator.Send(new GetUserList.Query());
        }

        [Authorize]
        [HttpGet("loaduserdata")]
        public async Task<IActionResult> LoadUserData()
        {
            var currentUserData = await _mediator.Send(new GetUserData.Query(User));
            if (currentUserData != null)
            {
                return Ok(currentUserData.User);
            }
            return BadRequest("не удалось загрузить данные");
        }

        [AllowAnonymous]
        [HttpPost("refreshtoken")]
        public async Task<IActionResult> RefreshToken()
        {
            if (!Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken))
            {
                return BadRequest();
            }
            var result = await _mediator.Send(new UserRefreshToken.Command(refreshToken));
            if (result.Succeeded)
            {
                Response.Cookies.Append("X-Refresh-Token", result.Tokens.RefreshToken,
                new CookieOptions() { HttpOnly = true, Secure = true, Expires = DateTimeOffset.UtcNow.AddDays(7) });
                return Ok(result.Tokens.AccessToken);
            }
            return BadRequest("не удалось обновить токен");
        }

        [HttpPost("gettoken")]
        public async Task<IActionResult> GetTokenAsync([FromBody] LoginModel creditals)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Неверные данные");
            }
            var result = await _mediator.Send(new GetUserToken.Query(creditals.Email, creditals.Password));
            if (result.Succeeded)
            {
                HttpContext.Response.Cookies.Append("X-Refresh-Token", result.RefreshToken,
                    new CookieOptions() { HttpOnly = true, Secure = true, Expires = DateTimeOffset.UtcNow.AddDays(7) });
                return Ok(new { result.User, result.AccessToken });
            }
            return BadRequest(result.Message);
        }

        [Authorize]
        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync(UserRegisterModel model)
        {
            var result = await _mediator.Send(new RegisterUser.Command(model));
            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var result = await _mediator.Send(new DeleteUser.Command(id));
            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
        }
    }
}
