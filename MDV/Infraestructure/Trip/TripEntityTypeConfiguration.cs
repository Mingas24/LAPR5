using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.Trips;
using MDV.Domain.Shared;
using System;

namespace MDV.Infrastructure.Trips
{
    internal class TripEntityTypeConfiguration : IEntityTypeConfiguration<Trip>
    {
        public void Configure(EntityTypeBuilder<Trip> trip)
        {
            trip.ToTable("Trips");
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Categories", SchemaNames.MDV);
            trip.HasKey(d => d.Id);
            try
            {
                trip.OwnsOne(d => d.tripCode, p =>
                 {
                     p.HasIndex(z => z.code).IsUnique();
                 });
            }
            catch (Exception)
            {
                 throw new BusinessRuleValidationException("Code in use!");
            }
            trip.OwnsOne(d => d.lineID);
            trip.OwnsOne(d => d.pathID);
            trip.OwnsOne(d => d.pathIDReturn);
            trip.OwnsOne(d => d.startDate);
            trip.OwnsOne(d => d.startTime);
            trip.OwnsMany(d => d.nodesList);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}
