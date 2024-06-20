using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.CrewService;
using System;
using MDV.Domain.Shared;

namespace MDV.Infrastructure.CrewServices
{
    internal class CrewServiceEntityTypeConfiguration : IEntityTypeConfiguration<CrewService>
    {
        public void Configure(EntityTypeBuilder<CrewService> CrewService)
        {
            CrewService.ToTable("CrewServices");
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            CrewService.HasKey(d => d.Id);
            try
            {
                CrewService.OwnsOne(d => d.Code, p =>
                 {
                     p.HasIndex(z => z.code).IsUnique();
                 });
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("Code already exists!");
            }
            CrewService.HasMany(d => d.Workblocks).WithOne();
        }
    }
}