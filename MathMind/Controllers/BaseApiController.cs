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
        public Problem Problem([FromQuery] int userID)
        {
            var rng = new Random();
            int a = rng.Next(100), b = rng.Next(100);
            return new Problem
            {
                ProblemText = a + "+" + b,
                CorrectAnswer = a + b
            };
        }

        [HttpPost]
        public async Task<IActionResult> Solve([Bind("Tries,Time,UserID,ProblemText,Answer")] ProblemSolve solve)
        {
            if (ModelState.IsValid)
            {
                _context.Add(solve);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpGet]
        public async Task<List<ProblemSolve>> GetSolvedProblems([FromQuery] int userID)
        {
            return await _context.Solves.Where(s => s.UserID == userID).ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> NewUser([Bind("Username")] User user)
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
