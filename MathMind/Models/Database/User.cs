using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MathMind.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public int Level { get; set; }
        public ICollection<ProblemSolve> solves { get; set; }
    }
}
