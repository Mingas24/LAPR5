using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.VehicleService;
using MDV.Domain.Workblocks;
using MDV.Domain.Shared;

namespace MDV.Infrastructure.VehicleServices
{
    internal class VehicleServiceEntityTypeConfiguration : IEntityTypeConfiguration<VehicleServiceD>
    {
        public void Configure(EntityTypeBuilder<VehicleServiceD> vs)
        {
            vs.ToTable("VehicleServices");
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            //builder.ToTable("Categories", SchemaNames.MDV);
            vs.HasKey(d => d.Id);
            try
            {
                vs.OwnsOne(d => d.vehicleServiceCode, p =>
                 {
                     p.HasIndex(z => z.code).IsUnique();
                 });
            }
            catch
            {
                throw new BusinessRuleValidationException("Vehicle Service Code already exists!");
            }
            vs.OwnsOne(d => d.vehicleServiceName);
            vs.OwnsOne(d => d.vehicleServiceColor);
            vs.HasMany(d => d.workblockCodeList).WithOne();
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}