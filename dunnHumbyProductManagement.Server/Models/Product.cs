namespace dunnHumbyProductManagement.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string ProductCode { get; set; }
        public double Price { get; set; }
        public string SKU { get; set; }
        public int StockQuantity { get; set; }
        public DateTime? DateAdded { get; set; }
    }
}
