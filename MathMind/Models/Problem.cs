using System;
using System.Collections.Generic;

namespace MathMind.Models
{
    public class Problem
    {
        public int ID { get; set; }
        public string ProblemText { get; set; }
        public int CorrectAnswer { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
        public ICollection<ProblemSolve> solves { get; set; }
    }
}