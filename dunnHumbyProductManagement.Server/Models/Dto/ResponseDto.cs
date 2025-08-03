namespace dunnHumbyProductManagement.Server.Models.Dto
{
    public class ResponseDto
    {
        public object? Result { get; set; }
        public object? Result1 { get; set; }
        public bool IsSuccess { get; set; } = true;
        public string Message { get; set; } = "";
    }
}
