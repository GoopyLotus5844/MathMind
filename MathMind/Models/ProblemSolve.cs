using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MathMind.Models
{
    public class ProblemSolve
    {
        public int ID { get; set; }
        public int Tries { get; set; }
        public int Time { get; set; }
        public int ProblemID { get; set; }
        public Problem Problem { get; set; }
    }
}
