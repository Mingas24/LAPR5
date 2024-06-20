using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MDV.Infrastructure;
using MDV.Infrastructure.Categories;
using MDV.Infrastructure.Products;
using MDV.Infrastructure.Families;
using MDV.Infrastructure.Shared;
using MDV.Domain.Shared;
using MDV.Domain.Categories;
using MDV.Domain.Products;
using MDV.Domain.Families;
using MDV.Domain.Driver;
using MDV.Domain.Vehicle;
using MDV.Domain.VehicleService;
using MDV.Domain.Trips;
using MDV.Domain.CrewService;
using MDV.Services;
using MDV.Infrastructure.Drivers;
using MDV.Infrastructure.Vehicles;
using MDV.Infrastructure.VehicleServices;
using MDV.Infrastructure.Users;
using MDV.Infrastructure.Workblocks;
using MDV.Infrastructure.Trips;
using MDV.Infrastructure.CrewServices;



namespace MDV
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("MyAllowSpecificOrigins",
                builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                });
            });
            // services.AddDbContext<DDDSample1DbContext>(opt =>
            //     opt.UseInMemoryDatabase("DDDSample1DB")
            //     .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
            services.AddDbContext<DDDSample1DbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("dbString"))
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);


            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("MyAllowSpecificOrigins");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseCors(MyAllowSpecificOrigins);
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<CategoryService>();

            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<ProductService>();

            services.AddTransient<IFamilyRepository, FamilyRepository>();
            services.AddTransient<FamilyService>();

            services.AddTransient<IDriverRepository, DriverRepository>();
            services.AddTransient<IDriverService,DriverService>();

            services.AddTransient<IVehicleRepository,VehicleRepository>();
            services.AddTransient<IVehicleService, VehicleService>();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<UserService>();

            services.AddTransient<IVehicleServiceRepository, VehicleServiceRepository>();
            services.AddTransient<IVehicleServiceService,VehicleServiceService>();

            services.AddTransient<IWorkblockRepository, WorkblockRepository>();
            services.AddTransient<IWorkblockService,WorkblockService>();

            services.AddTransient<ITripRepository, TripRepository>();
            services.AddTransient<ITripService,TripService>();

            services.AddTransient<ICrewServiceRepository, CrewServiceRepository>();
            services.AddTransient<ICrewService, CrewServiceS>();

            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins, builder =>
                {
                    builder.WithOrigins("https://localhost:5001/", "http://localhost:5000/");
                    builder.AllowAnyHeader();
                });
            });
        }
    }
}
