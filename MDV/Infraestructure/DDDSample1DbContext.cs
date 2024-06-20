using Microsoft.EntityFrameworkCore;
using MDV.Domain.Categories;
using MDV.Domain.Products;
using MDV.Domain.Families;
using MDV.Domain.Driver;
using MDV.Domain.Vehicle;
using MDV.Domain.VehicleService;
using MDV.Domain.Trips;
using MDV.Domain.User;
using MDV.Domain.CrewService;
using MDV.Infrastructure.Categories;
using MDV.Infrastructure.Products;
using MDV.Infrastructure.Drivers;
using MDV.Infrastructure.Vehicles;
using MDV.Infrastructure.VehicleServices;
using MDV.Infrastructure.Workblocks;
using MDV.Domain.Workblocks;
using MDV.Infrastructure.Users;
using MDV.Infrastructure.Trips;
using MDV.Infrastructure.CrewServices;


namespace MDV.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Family> Families { get; set; }

        public DbSet<Driver> Driver { get; set; }

        public DbSet<DriverLicence> DriverLicence { get; set; }

        public DbSet<DriverTypeID> DriverTypeID { get; set; }

        public DbSet<Vehicle> Vehicle { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<Workblock> Workblock { get; set; }

        public DbSet<VehicleServiceD> VehicleService { get; set; }

        public DbSet<CrewService> CrewService { get; set; }

        public DbSet<Trip> Trip { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DriverEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new VehicleEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TripEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new WorkblockEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new VehicleServiceEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CrewServiceEntityTypeConfiguration());
        }
    }
}