using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.Workblocks;
using System;
using MDV.Domain.Shared;
using MDV.Domain.Trips;

namespace MDV.Infrastructure.Workblocks
{
    internal class WorkblockEntityTypeConfiguration : IEntityTypeConfiguration<Workblock>
    {
        public void Configure(EntityTypeBuilder<Workblock> workblock)
        {
            workblock.ToTable("Workblocks");
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Categories", SchemaNames.MDV);
            workblock.HasKey(d => d.Id);
            workblock.OwnsOne(d => d.startTime);
            workblock.OwnsOne(d => d.endTime);
            try
            {
                workblock.OwnsOne(d => d.workblockCode, p =>
                 {
                     p.HasIndex(z => z.code).IsUnique();
                 });
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("Code already exists!");
            }
            workblock.HasMany(d => d.trips).WithOne();
        }
    }
}
