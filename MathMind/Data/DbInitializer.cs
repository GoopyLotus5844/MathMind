using MathMind.Models;
using System;
using System.Linq;

namespace MathMind.Data
{
    public static class DbInitializer
    {
        public static void Initialize(MathContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            var users = new User[]
            {
            new User{Username="Jo Mama",Level=5},
            new User{Username="Bob the Builder",Level=20},
            new User{Username="witchdoctor",Level=40},
            };
            foreach (User u in users)
            {
                context.Users.Add(u);
            }
            context.SaveChanges();

            var problems = new Problem[]
            {
            new Problem{ProblemText="9 + 10", CorrectAnswer=21, UserID=1 },
            new Problem{ProblemText="2+2", CorrectAnswer=4, UserID=2},
            new Problem{ProblemText="99 * 2", CorrectAnswer=198, UserID=3}
            };
            foreach (Problem p in problems)
            {
                context.Problems.Add(p);
            }
            context.SaveChanges();

            var solves = new ProblemSolve[]
            {
            new ProblemSolve{Tries=2,Time=500,ProblemID=2}
            };
            foreach (ProblemSolve p in solves)
            {
                context.Solves.Add(p);
            }
            context.SaveChanges();
        }
    }
}