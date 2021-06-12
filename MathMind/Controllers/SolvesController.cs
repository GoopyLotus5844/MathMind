using MathMind.Data;
using MathMind.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MathMind.Controllers
{
    public class SolvesController : Controller
    {
        private readonly ILogger<ProblemController> _logger;
        private readonly MathContext _context;

        public SolvesController(ILogger<ProblemController> logger, MathContext context)
        {
            _logger = logger;
            _context = context;
        }


        [HttpPost]
        public async Task<IActionResult> Create([Bind("Tries,Time,ProblemID")] ProblemSolve solve)
        {
            if (ModelState.IsValid)
            {
                _context.Add(solve);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }
    }
}
