using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MathMind.Migrations
{
    public partial class Problem_Solved_DateTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "submitted",
                table: "Solves",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "submitted",
                table: "Solves");
        }
    }
}
