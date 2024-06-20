using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.User;
using System;
using MDV.Domain.Shared;

namespace MDV.Infrastructure.Users
{
    internal class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> User)
        {
            User.ToTable("Users");
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
            User.HasKey(d => d.Id);
            try
            {
                User.OwnsOne(d => d.Mail, p =>
                 {
                     p.HasIndex(z => z.mail).IsUnique();
                 });
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("Email already exists");
            }
            User.OwnsOne(d => d.Name);
            User.OwnsOne(d => d.Pass);
            User.OwnsOne(d => d.Address);
            try
            {
                User.OwnsOne(d => d.PNumber, p =>
                 {
                     p.HasIndex(z => z.number).IsUnique();
                 });
            }
            catch (Exception)
            {
                throw new BusinessRuleValidationException("Phone number already in use");
            }
            User.OwnsOne(d => d.Role);
            User.OwnsOne(d => d.Age);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}