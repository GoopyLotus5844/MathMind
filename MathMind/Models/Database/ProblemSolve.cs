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
        public String ProblemText { get; set; }
        public int Answer { get; set; }
        public int Time { get; set; }
        public int UserID { get; set; }
        public User user { get; set; }
    }
}
