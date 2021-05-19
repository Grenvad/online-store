using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace OnlineStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FilesController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("UploadImages")]
        public async Task<IActionResult> UploadImages([FromForm] IFormFile[] files)
        {
            List<string> imageLinks = new List<string>();
            string newFileName;
            string path;
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    newFileName = String.Format($"{Guid.NewGuid()}{file.FileName.Substring(file.FileName.LastIndexOf('.'))}");
                    path = Path.Combine(_webHostEnvironment.WebRootPath, $"images\\" + newFileName);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                        imageLinks.Add($"{ Request.Scheme}://{Request.Host}/images/{newFileName}");
                    }
                }
            }
            return Ok(imageLinks);
        }

    }
}
