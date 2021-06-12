using MathMind.Data;
using MathMind.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MathMind.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProblemController : ControllerBase
    {
        private readonly ILogger<ProblemController> _logger;
        private readonly MathContext _context;

        public ProblemController(ILogger<ProblemController> logger, MathContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<Problem> Get()
        {
            var rng = new Random();
            int id = rng.Next(3) + 1;
            Problem problem = await _context.Problems
                .FirstOrDefaultAsync(p => p.ID == id);
            if (problem == null)
            {
                return null;
            }

            return problem;
        }
    }
}
