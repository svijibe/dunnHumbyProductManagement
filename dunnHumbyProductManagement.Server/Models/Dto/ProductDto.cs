using System.ComponentModel.DataAnnotations;

namespace dunnHumbyProductManagement.Server.Models.Dto
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string ProductCode { get; set; }
        [Range(1, 1000)]
        public double Price { get; set; }
        public string SKU { get; set; }
        public int StockQuantity { get; set; }
        public DateTime? DateAdded { get; set; }
    }
}
