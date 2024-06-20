using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.Driver;
using System;
using MDV.Domain.Shared;

namespace MDV.Infrastructure.Drivers
{
    internal class DriverEntityTypeConfiguration : IEntityTypeConfiguration<Driver>
    {
        public void Configure(EntityTypeBuilder<Driver> driver)
        {
            driver.ToTable("Drivers");
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Categories", SchemaNames.MDV);
            driver.HasKey(d => d.Id);
            try
            {
                driver.OwnsOne(d => d.mecanographicNumber, p =>
                 {
                     p.HasIndex(z => z.number).IsUnique();
                 });
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("Mecanographic Number is repetead");
            }
            driver.OwnsOne(d => d.driverName);
            driver.OwnsOne(d => d.birthDate);
            try
            {
                driver.OwnsOne(d => d.citizenCardNumber, p =>
                  {
                      p.HasIndex(z => z.citizenCardNumber).IsUnique();
                  });
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("Citizen Card Number is repetead");
            }
            try
            {
                driver.OwnsOne(d => d.driverNIF, p =>
                {
                    p.HasIndex(z => z.nif).IsUnique();
                });
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("Driver TIN is repetead");
            }
            driver.OwnsOne(d => d.entryDate);
            driver.OwnsOne(d => d.leavingDate);
            driver.OwnsOne<DriverLicence>(d => d.driverLicence, dl =>
            {
                try
                {
                    dl.OwnsOne(d1 => d1.dln, p =>
                     {
                         p.HasIndex(z => z.number).IsUnique();
                     });
                }
                catch (Exception)
                {
                    throw new BusinessRuleValidationException("Driver Licence Number is repetead");
                }
                dl.OwnsOne(d1 => d1.dled);
            });
            driver.OwnsMany<DriverTypeID>(d => d.driverTypeIDList);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}
