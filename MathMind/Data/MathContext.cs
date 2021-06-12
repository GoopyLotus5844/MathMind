using MathMind.Models;
using Microsoft.EntityFrameworkCore;

namespace MathMind.Data
{
    public class MathContext : DbContext
    {
        public MathContext(DbContextOptions<MathContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Problem> Problems { get; set; }
        public DbSet<ProblemSolve> Solves { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Problem>().ToTable("Problems");
            modelBuilder.Entity<ProblemSolve>().ToTable("Solves");
        }
    }
}