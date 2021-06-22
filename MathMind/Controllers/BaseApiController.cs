using MathMind.Data;
using MathMind.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MathMind.Controllers
{
    [Route("api/")]
    public class BaseApiController : ControllerBase
    {
        private readonly ILogger<BaseApiController> _logger;
        private readonly MathContext _context;

        public BaseApiController(ILogger<BaseApiController> logger, MathContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("problem")]
        public Problem Problem([FromQuery] int userID, [FromQuery] int type)
        {
            var rng = new Random();
            int range = type == 2 ? 20 : 100;
            int a = rng.Next(range), b = rng.Next(range);

            if (type == 0)
            {
                return new Problem
                {
                    ProblemText = a + "+" + b,
                    CorrectAnswer = a + b
                };
            }
            else if (type == 1)
            {
                return new Problem
                {
                    ProblemText = a + "-" + b,
                    CorrectAnswer = a - b
                };
            }
            else
            {
                return new Problem
                {
                    ProblemText = a + "x" + b,
                    CorrectAnswer = a * b
                };
            }
        }

        [HttpPost]
        [Route("submitsolve")]
        public async Task<IActionResult> Solve([Bind("Tries,Time,UserID,ProblemText,Answer")] ProblemSolve solve)
        {
            if (ModelState.IsValid)
            {
                solve.submitted = DateTime.UtcNow;
                _context.Add(solve);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpGet]
        [Route("solvedproblems")]
        public async Task<List<ProblemSolve>> GetSolvedProblems([FromQuery] int? userID)
        {
            return await _context.Solves
                .Where(s => s.UserID == userID)
                .OrderByDescending(s => s.submitted)
                .AsNoTracking()
                .Take(10)
                .ToListAsync();
        }

        [HttpPost]
        [Route("newuser")]
        public async Task<IActionResult> NewUser([Bind("Username", "Level")] User user)
        {
            if (ModelState.IsValid) 
            {
                _context.Add(user);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }
    }
}
