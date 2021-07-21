using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

namespace ServerApp.Data
{
    public class SystemContext : IdentityDbContext<User, Role, int>
    {
        public SystemContext(DbContextOptions<SystemContext> options) : base(options) { }
        public DbSet<Student> Students { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<SchoolInfo> SchoolInfos { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<OrganizationEmployee> OrganizationEmployees { get; set; }
        public DbSet<OrganizationStudent> OrganizationStudents { get; set; }
    }
}