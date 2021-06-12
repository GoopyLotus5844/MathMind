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

            var solves = new ProblemSolve[]
            {
            new ProblemSolve{Tries=2,Time=500,ProblemText="2+2",Answer=4,UserID=1}
            };
            foreach (ProblemSolve p in solves)
            {
                context.Solves.Add(p);
            }
            context.SaveChanges();
        }
    }
}