using dunnHumbyProductManagement.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace dunnHumbyProductManagement.Server.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<ProductsWMY> ProductsWMY { get; set; }
    }
}
