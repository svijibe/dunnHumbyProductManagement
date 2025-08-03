using AutoMapper;
using dunnHumbyProductManagement.Server.Models;
using dunnHumbyProductManagement.Server.Models.Dto;

namespace dunnHumbyProductManagement.Server
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Product, ProductDto>();
                config.CreateMap<ProductDto, Product>();
            });
            return mappingConfig;
        }
    }
}
