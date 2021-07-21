using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace serverapp.Migrations
{
    public partial class changins : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "remainingInstallments",
                table: "Payments");

            migrationBuilder.AlterColumn<int>(
                name: "DateOfRegistration",
                table: "SchoolInfos",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfRegistration",
                table: "SchoolInfos",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "remainingInstallments",
                table: "Payments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
