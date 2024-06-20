using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CrewServices",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Code_code = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrewServices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    mecanographicNumber_number = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    driverName_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    birthDate_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    citizenCardNumber_citizenCardNumber = table.Column<long>(type: "bigint", nullable: true),
                    driverNIF_nif = table.Column<long>(type: "bigint", nullable: true),
                    entryDate_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    leavingDate_date = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Families",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Families", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Mail_mail = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Pass_pass = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address_address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PNumber_number = table.Column<long>(type: "bigint", nullable: true),
                    Role_role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Age_date = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vehicle",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    licensePlate_vehicleLicensePlate = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    vehicleVIN_vehicleVIN = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    vehicleTypeID_vehicleTypeID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    vehicleEntranceDate_date = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VehicleServices",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    vehicleServiceName_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    vehicleServiceCode_code = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    vehicleServiceColor_color = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleServices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DriverLicence",
                columns: table => new
                {
                    DriverId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    dled_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dln_number = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Id = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverLicence", x => x.DriverId);
                    table.ForeignKey(
                        name: "FK_DriverLicence_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DriverTypeID",
                columns: table => new
                {
                    DriverId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    driverTypeID = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DriverTypeID", x => new { x.DriverId, x.Id });
                    table.ForeignKey(
                        name: "FK_DriverTypeID_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Workblocks",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    startTime_datetime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    endTime_datetime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    workblockCode_code = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CrewServiceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    VehicleServiceDId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workblocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workblocks_CrewServices_CrewServiceId",
                        column: x => x.CrewServiceId,
                        principalTable: "CrewServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Workblocks_VehicleServices_VehicleServiceDId",
                        column: x => x.VehicleServiceDId,
                        principalTable: "VehicleServices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Trips",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    tripCode_code = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    lineID_tripLineID = table.Column<long>(type: "bigint", nullable: true),
                    pathID_tripPathID = table.Column<long>(type: "bigint", nullable: true),
                    pathIDReturn_tripPathID = table.Column<long>(type: "bigint", nullable: true),
                    startDate_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    startTime_datetime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkblockId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trips", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trips_Workblocks_WorkblockId",
                        column: x => x.WorkblockId,
                        principalTable: "Workblocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Node",
                columns: table => new
                {
                    TripId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    node = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    passingTime = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Node", x => new { x.TripId, x.Id });
                    table.ForeignKey(
                        name: "FK_Node_Trips_TripId",
                        column: x => x.TripId,
                        principalTable: "Trips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CrewServices_Code_code",
                table: "CrewServices",
                column: "Code_code",
                unique: true,
                filter: "[Code_code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_DriverLicence_dln_number",
                table: "DriverLicence",
                column: "dln_number",
                unique: true,
                filter: "[dln_number] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_citizenCardNumber_citizenCardNumber",
                table: "Drivers",
                column: "citizenCardNumber_citizenCardNumber",
                unique: true,
                filter: "[citizenCardNumber_citizenCardNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_driverNIF_nif",
                table: "Drivers",
                column: "driverNIF_nif",
                unique: true,
                filter: "[driverNIF_nif] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_mecanographicNumber_number",
                table: "Drivers",
                column: "mecanographicNumber_number",
                unique: true,
                filter: "[mecanographicNumber_number] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_tripCode_code",
                table: "Trips",
                column: "tripCode_code",
                unique: true,
                filter: "[tripCode_code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_WorkblockId",
                table: "Trips",
                column: "WorkblockId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Mail_mail",
                table: "Users",
                column: "Mail_mail",
                unique: true,
                filter: "[Mail_mail] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Users_PNumber_number",
                table: "Users",
                column: "PNumber_number",
                unique: true,
                filter: "[PNumber_number] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicle_licensePlate_vehicleLicensePlate",
                table: "Vehicle",
                column: "licensePlate_vehicleLicensePlate",
                unique: true,
                filter: "[licensePlate_vehicleLicensePlate] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicle_vehicleVIN_vehicleVIN",
                table: "Vehicle",
                column: "vehicleVIN_vehicleVIN",
                unique: true,
                filter: "[vehicleVIN_vehicleVIN] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleServices_vehicleServiceCode_code",
                table: "VehicleServices",
                column: "vehicleServiceCode_code",
                unique: true,
                filter: "[vehicleServiceCode_code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Workblocks_CrewServiceId",
                table: "Workblocks",
                column: "CrewServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Workblocks_VehicleServiceDId",
                table: "Workblocks",
                column: "VehicleServiceDId");

            migrationBuilder.CreateIndex(
                name: "IX_Workblocks_workblockCode_code",
                table: "Workblocks",
                column: "workblockCode_code",
                unique: true,
                filter: "[workblockCode_code] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "DriverLicence");

            migrationBuilder.DropTable(
                name: "DriverTypeID");

            migrationBuilder.DropTable(
                name: "Families");

            migrationBuilder.DropTable(
                name: "Node");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Vehicle");

            migrationBuilder.DropTable(
                name: "Drivers");

            migrationBuilder.DropTable(
                name: "Trips");

            migrationBuilder.DropTable(
                name: "Workblocks");

            migrationBuilder.DropTable(
                name: "CrewServices");

            migrationBuilder.DropTable(
                name: "VehicleServices");
        }
    }
}
