using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.Vehicle;
using System;

namespace MDV.Infrastructure.Vehicles
{
    internal class VehicleEntityTypeConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> vehicle)
        {
            vehicle.ToTable("Vehicle");
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Categories", SchemaNames.MDV);
            vehicle.HasKey(d => d.Id);
            try
            {
                vehicle.OwnsOne(d => d.licensePlate, p =>
                {
                    p.HasIndex(z => z.vehicleLicensePlate).IsUnique();
                    //p.Property(d => d.vehicleLicensePlate).HasColumnName("Vehicle License Plate");
                });
            }
            catch (Exception)
            {
                throw new Exception("License plate is repetead");
            }

             try
            {
                vehicle.OwnsOne(d => d.vehicleVIN, p =>
                {
                    p.HasIndex(z => z.vehicleVIN).IsUnique();
                    // p.Property(d => d.vehicleVIN).HasColumnName("Vehicle VIN");
                });
            }
            catch (Exception)
            {
                throw new Exception("Vehicle VIN is repetead");
            }
            vehicle.OwnsOne(d => d.vehicleTypeID
                            // d => {d.Property(d => d.vehicleTypeID).HasColumnName("Vehicle Type ID"); }
                            );
            vehicle.OwnsOne(d => d.vehicleEntranceDate
                            // d => {d.Property(d => d.date).HasColumnName("Vehicle Type ID"); }
                            );

            
            
           
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}