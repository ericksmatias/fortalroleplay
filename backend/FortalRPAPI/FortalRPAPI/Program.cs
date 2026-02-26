using FortalRPAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🔹 REGISTRAR SERVIÇOS AQUI
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=fortal.db"));

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 🔹 CONFIGURAR PIPELINE AQUI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Administradores}/{action=Index}/{id?}");

app.Run();