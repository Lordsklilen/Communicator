using Microsoft.EntityFrameworkCore.Migrations;

namespace Communicator.DataProvider.Migrations
{
    public partial class migration003 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isGroupChannel",
                table: "Channels",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isGroupChannel",
                table: "Channels");
        }
    }
}
