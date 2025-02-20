﻿// <auto-generated />
using MDV.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DDDNetCore.Migrations
{
    [DbContext(typeof(DDDSample1DbContext))]
    partial class DDDSample1DbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("MDV.Domain.Categories.Category", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("MDV.Domain.CrewService.CrewService", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.ToTable("CrewServices");
                });

            modelBuilder.Entity("MDV.Domain.Driver.Driver", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("MDV.Domain.Families.Family", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Families");
                });

            modelBuilder.Entity("MDV.Domain.Products.Product", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("CategoryId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("MDV.Domain.Trips.Trip", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("WorkblockId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("WorkblockId");

                    b.ToTable("Trips");
                });

            modelBuilder.Entity("MDV.Domain.User.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MDV.Domain.Vehicle.Vehicle", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.ToTable("Vehicle");
                });

            modelBuilder.Entity("MDV.Domain.VehicleService.VehicleServiceD", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.ToTable("VehicleServices");
                });

            modelBuilder.Entity("MDV.Domain.Workblocks.Workblock", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CrewServiceId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("VehicleServiceDId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("CrewServiceId");

                    b.HasIndex("VehicleServiceDId");

                    b.ToTable("Workblocks");
                });

            modelBuilder.Entity("MDV.Domain.CrewService.CrewService", b =>
                {
                    b.OwnsOne("MDV.Domain.CrewService.CrewServiceCode", "Code", b1 =>
                        {
                            b1.Property<string>("CrewServiceId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("code")
                                .HasColumnType("nvarchar(450)");

                            b1.HasKey("CrewServiceId");

                            b1.HasIndex("code")
                                .IsUnique()
                                .HasFilter("[Code_code] IS NOT NULL");

                            b1.ToTable("CrewServices");

                            b1.WithOwner()
                                .HasForeignKey("CrewServiceId");
                        });

                    b.Navigation("Code");
                });

            modelBuilder.Entity("MDV.Domain.Driver.Driver", b =>
                {
                    b.OwnsOne("MDV.Domain.Driver.DriverCC", "citizenCardNumber", b1 =>
                        {
                            b1.Property<string>("DriverId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<long>("citizenCardNumber")
                                .HasColumnType("bigint");

                            b1.HasKey("DriverId");

                            b1.HasIndex("citizenCardNumber")
                                .IsUnique()
                                .HasFilter("[citizenCardNumber_citizenCardNumber] IS NOT NULL");

                            b1.ToTable("Drivers");

                            b1.WithOwner()
                                .HasForeignKey("DriverId");
                        });

                    b.OwnsOne("MDV.Domain.Driver.DriverLicence", "driverLicence", b1 =>
                        {
                            b1.Property<string>("DriverId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("Id")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("DriverId");

                            b1.ToTable("DriverLicence");

                            b1.WithOwner()
                                .HasForeignKey("DriverId");

                            b1.OwnsOne("MDV.Domain.Driver.DriverLicenceNumber", "dln", b2 =>
                                {
                                    b2.Property<string>("DriverLicenceDriverId")
                                        .HasColumnType("nvarchar(450)");

                                    b2.Property<string>("number")
                                        .HasColumnType("nvarchar(450)");

                                    b2.HasKey("DriverLicenceDriverId");

                                    b2.HasIndex("number")
                                        .IsUnique()
                                        .HasFilter("[dln_number] IS NOT NULL");

                                    b2.ToTable("DriverLicence");

                                    b2.WithOwner()
                                        .HasForeignKey("DriverLicenceDriverId");
                                });

                            b1.OwnsOne("MDV.Domain.Utils.Date", "dled", b2 =>
                                {
                                    b2.Property<string>("DriverLicenceDriverId")
                                        .HasColumnType("nvarchar(450)");

                                    b2.Property<string>("date")
                                        .HasColumnType("nvarchar(max)");

                                    b2.HasKey("DriverLicenceDriverId");

                                    b2.ToTable("DriverLicence");

                                    b2.WithOwner()
                                        .HasForeignKey("DriverLicenceDriverId");
                                });

                            b1.Navigation("dled");

                            b1.Navigation("dln");
                        });

                    b.OwnsOne("MDV.Domain.Driver.DriverNIF", "driverNIF", b1 =>
                        {
                            b1.Property<string>("DriverId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<long>("nif")
                                .HasColumnType("bigint");

                            b1.HasKey("DriverId");

                            b1.HasIndex("nif")
                                .IsUnique()
                                .HasFilter("[driverNIF_nif] IS NOT NULL");

                            b1.ToTable("Drivers");

                            b1.WithOwner()
                                .HasForeignKey("DriverId");
                        });

                    b.OwnsOne("MDV.Domain.Driver.DriverName", "driverName", b1 =>
                        {
                            b1.Property<string>("DriverId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("name")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("DriverId");

                            b1.ToTable("Drivers");

                            b1.WithOwner()
                                .HasForeignKey("DriverId");
                        });

                    b.OwnsOne("MDV.Domain.Driver.DriverNumber", "mecanographicNumber", b1 =>
                        {
                            b1.Property<string>("DriverId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("number")
                                .HasColumnType("nvarchar(450)");

                            b1.HasKey("DriverId");

                            b1.HasIndex("number")
                                .IsUnique()
                                .HasFilter("[mecanographicNumber_number] IS NOT NULL");

                            b1.ToTable("Drivers");

                            b1.WithOwner()
                                .HasForeignKey("DriverId");
                        });

                    b.OwnsMany("MDV.Domain.Driver.DriverTypeID", "driverTypeIDList", b1 =>
                        {
                            b1.Property<string>("DriverId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .UseIdentityColumn();

                            b1.Property<string>("driverTypeID")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("DriverId", "Id");

                            b1.ToTable("DriverTypeID");

                            b1.WithOwner()
                                .HasForeignKey("DriverId");
                        });

                    b.OwnsOne("MDV.Domain.Utils.Date", "birthDate", b1 =>
                        {
                            b1.Property<string>("DriverId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("date")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("DriverId");

                            b1.ToTable("Drivers");

                            b1.WithOwner()
                                .HasForeignKey("DriverId");
                        });

                    b.OwnsOne("MDV.Domain.Utils.Date", "entryDate", b1 =>
                        {
                            b1.Property<string>("DriverId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("date")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("DriverId");

                            b1.ToTable("Drivers");

                            b1.WithOwner()
                                .HasForeignKey("DriverId");
                        });

                    b.OwnsOne("MDV.Domain.Utils.Date", "leavingDate", b1 =>
                        {
                            b1.Property<string>("DriverId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("date")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("DriverId");

                            b1.ToTable("Drivers");

                            b1.WithOwner()
                                .HasForeignKey("DriverId");
                        });

                    b.Navigation("birthDate");

                    b.Navigation("citizenCardNumber");

                    b.Navigation("driverLicence");

                    b.Navigation("driverName");

                    b.Navigation("driverNIF");

                    b.Navigation("driverTypeIDList");

                    b.Navigation("entryDate");

                    b.Navigation("leavingDate");

                    b.Navigation("mecanographicNumber");
                });

            modelBuilder.Entity("MDV.Domain.Trips.Trip", b =>
                {
                    b.HasOne("MDV.Domain.Workblocks.Workblock", null)
                        .WithMany("trips")
                        .HasForeignKey("WorkblockId");

                    b.OwnsMany("MDV.Domain.Trips.Node", "nodesList", b1 =>
                        {
                            b1.Property<string>("TripId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .UseIdentityColumn();

                            b1.Property<string>("node")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<long>("passingTime")
                                .HasColumnType("bigint");

                            b1.HasKey("TripId", "Id");

                            b1.ToTable("Node");

                            b1.WithOwner()
                                .HasForeignKey("TripId");
                        });

                    b.OwnsOne("MDV.Domain.Trips.TripCode", "tripCode", b1 =>
                        {
                            b1.Property<string>("TripId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("code")
                                .HasColumnType("nvarchar(450)");

                            b1.HasKey("TripId");

                            b1.HasIndex("code")
                                .IsUnique()
                                .HasFilter("[tripCode_code] IS NOT NULL");

                            b1.ToTable("Trips");

                            b1.WithOwner()
                                .HasForeignKey("TripId");
                        });

                    b.OwnsOne("MDV.Domain.Trips.TripLineID", "lineID", b1 =>
                        {
                            b1.Property<string>("TripId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<long>("tripLineID")
                                .HasColumnType("bigint");

                            b1.HasKey("TripId");

                            b1.ToTable("Trips");

                            b1.WithOwner()
                                .HasForeignKey("TripId");
                        });

                    b.OwnsOne("MDV.Domain.Trips.TripPathID", "pathID", b1 =>
                        {
                            b1.Property<string>("TripId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<long>("tripPathID")
                                .HasColumnType("bigint");

                            b1.HasKey("TripId");

                            b1.ToTable("Trips");

                            b1.WithOwner()
                                .HasForeignKey("TripId");
                        });

                    b.OwnsOne("MDV.Domain.Trips.TripPathID", "pathIDReturn", b1 =>
                        {
                            b1.Property<string>("TripId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<long>("tripPathID")
                                .HasColumnType("bigint");

                            b1.HasKey("TripId");

                            b1.ToTable("Trips");

                            b1.WithOwner()
                                .HasForeignKey("TripId");
                        });

                    b.OwnsOne("MDV.Domain.Utils.Date", "startDate", b1 =>
                        {
                            b1.Property<string>("TripId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("date")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("TripId");

                            b1.ToTable("Trips");

                            b1.WithOwner()
                                .HasForeignKey("TripId");
                        });

                    b.OwnsOne("MDV.Domain.Utils.Hours", "startTime", b1 =>
                        {
                            b1.Property<string>("TripId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("datetime")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("TripId");

                            b1.ToTable("Trips");

                            b1.WithOwner()
                                .HasForeignKey("TripId");
                        });

                    b.Navigation("lineID");

                    b.Navigation("nodesList");

                    b.Navigation("pathID");

                    b.Navigation("pathIDReturn");

                    b.Navigation("startDate");

                    b.Navigation("startTime");

                    b.Navigation("tripCode");
                });

            modelBuilder.Entity("MDV.Domain.User.User", b =>
                {
                    b.OwnsOne("MDV.Domain.User.UserAddress", "Address", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("address")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("MDV.Domain.User.UserMail", "Mail", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("mail")
                                .HasColumnType("nvarchar(450)");

                            b1.HasKey("UserId");

                            b1.HasIndex("mail")
                                .IsUnique()
                                .HasFilter("[Mail_mail] IS NOT NULL");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("MDV.Domain.User.UserName", "Name", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("name")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("MDV.Domain.User.UserNumber", "PNumber", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<long>("number")
                                .HasColumnType("bigint");

                            b1.HasKey("UserId");

                            b1.HasIndex("number")
                                .IsUnique()
                                .HasFilter("[PNumber_number] IS NOT NULL");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("MDV.Domain.User.UserPass", "Pass", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("pass")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("MDV.Domain.User.UserRole", "Role", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("role")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("MDV.Domain.Utils.Date", "Age", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("date")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.Navigation("Address");

                    b.Navigation("Age");

                    b.Navigation("Mail");

                    b.Navigation("Name");

                    b.Navigation("Pass");

                    b.Navigation("PNumber");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("MDV.Domain.Vehicle.Vehicle", b =>
                {
                    b.OwnsOne("MDV.Domain.Vehicle.VehicleEntranceDate", "vehicleEntranceDate", b1 =>
                        {
                            b1.Property<string>("VehicleId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("date")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("VehicleId");

                            b1.ToTable("Vehicle");

                            b1.WithOwner()
                                .HasForeignKey("VehicleId");
                        });

                    b.OwnsOne("MDV.Domain.Vehicle.VehicleLicensePlate", "licensePlate", b1 =>
                        {
                            b1.Property<string>("VehicleId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("vehicleLicensePlate")
                                .HasColumnType("nvarchar(450)");

                            b1.HasKey("VehicleId");

                            b1.HasIndex("vehicleLicensePlate")
                                .IsUnique()
                                .HasFilter("[licensePlate_vehicleLicensePlate] IS NOT NULL");

                            b1.ToTable("Vehicle");

                            b1.WithOwner()
                                .HasForeignKey("VehicleId");
                        });

                    b.OwnsOne("MDV.Domain.Vehicle.VehicleTypeID", "vehicleTypeID", b1 =>
                        {
                            b1.Property<string>("VehicleId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("vehicleTypeID")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("VehicleId");

                            b1.ToTable("Vehicle");

                            b1.WithOwner()
                                .HasForeignKey("VehicleId");
                        });

                    b.OwnsOne("MDV.Domain.Vehicle.VehicleVIN", "vehicleVIN", b1 =>
                        {
                            b1.Property<string>("VehicleId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("vehicleVIN")
                                .HasColumnType("nvarchar(450)");

                            b1.HasKey("VehicleId");

                            b1.HasIndex("vehicleVIN")
                                .IsUnique()
                                .HasFilter("[vehicleVIN_vehicleVIN] IS NOT NULL");

                            b1.ToTable("Vehicle");

                            b1.WithOwner()
                                .HasForeignKey("VehicleId");
                        });

                    b.Navigation("licensePlate");

                    b.Navigation("vehicleEntranceDate");

                    b.Navigation("vehicleTypeID");

                    b.Navigation("vehicleVIN");
                });

            modelBuilder.Entity("MDV.Domain.VehicleService.VehicleServiceD", b =>
                {
                    b.OwnsOne("MDV.Domain.VehicleService.VehicleServiceCode", "vehicleServiceCode", b1 =>
                        {
                            b1.Property<string>("VehicleServiceDId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("code")
                                .HasColumnType("nvarchar(450)");

                            b1.HasKey("VehicleServiceDId");

                            b1.HasIndex("code")
                                .IsUnique()
                                .HasFilter("[vehicleServiceCode_code] IS NOT NULL");

                            b1.ToTable("VehicleServices");

                            b1.WithOwner()
                                .HasForeignKey("VehicleServiceDId");
                        });

                    b.OwnsOne("MDV.Domain.VehicleService.VehicleServiceColor", "vehicleServiceColor", b1 =>
                        {
                            b1.Property<string>("VehicleServiceDId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("color")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("VehicleServiceDId");

                            b1.ToTable("VehicleServices");

                            b1.WithOwner()
                                .HasForeignKey("VehicleServiceDId");
                        });

                    b.OwnsOne("MDV.Domain.VehicleService.VehicleServiceName", "vehicleServiceName", b1 =>
                        {
                            b1.Property<string>("VehicleServiceDId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("name")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("VehicleServiceDId");

                            b1.ToTable("VehicleServices");

                            b1.WithOwner()
                                .HasForeignKey("VehicleServiceDId");
                        });

                    b.Navigation("vehicleServiceCode");

                    b.Navigation("vehicleServiceColor");

                    b.Navigation("vehicleServiceName");
                });

            modelBuilder.Entity("MDV.Domain.Workblocks.Workblock", b =>
                {
                    b.HasOne("MDV.Domain.CrewService.CrewService", null)
                        .WithMany("Workblocks")
                        .HasForeignKey("CrewServiceId");

                    b.HasOne("MDV.Domain.VehicleService.VehicleServiceD", null)
                        .WithMany("workblockCodeList")
                        .HasForeignKey("VehicleServiceDId");

                    b.OwnsOne("MDV.Domain.Utils.Time", "endTime", b1 =>
                        {
                            b1.Property<string>("WorkblockId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("datetime")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("WorkblockId");

                            b1.ToTable("Workblocks");

                            b1.WithOwner()
                                .HasForeignKey("WorkblockId");
                        });

                    b.OwnsOne("MDV.Domain.Utils.Time", "startTime", b1 =>
                        {
                            b1.Property<string>("WorkblockId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("datetime")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("WorkblockId");

                            b1.ToTable("Workblocks");

                            b1.WithOwner()
                                .HasForeignKey("WorkblockId");
                        });

                    b.OwnsOne("MDV.Domain.Workblocks.WorkblockCode", "workblockCode", b1 =>
                        {
                            b1.Property<string>("WorkblockId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("code")
                                .HasColumnType("nvarchar(450)");

                            b1.HasKey("WorkblockId");

                            b1.HasIndex("code")
                                .IsUnique()
                                .HasFilter("[workblockCode_code] IS NOT NULL");

                            b1.ToTable("Workblocks");

                            b1.WithOwner()
                                .HasForeignKey("WorkblockId");
                        });

                    b.Navigation("endTime");

                    b.Navigation("startTime");

                    b.Navigation("workblockCode");
                });

            modelBuilder.Entity("MDV.Domain.CrewService.CrewService", b =>
                {
                    b.Navigation("Workblocks");
                });

            modelBuilder.Entity("MDV.Domain.VehicleService.VehicleServiceD", b =>
                {
                    b.Navigation("workblockCodeList");
                });

            modelBuilder.Entity("MDV.Domain.Workblocks.Workblock", b =>
                {
                    b.Navigation("trips");
                });
#pragma warning restore 612, 618
        }
    }
}
