
using ActorApi.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ActorApi.Data.DAL
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Actor> Actors { get; set; }
    }
}
