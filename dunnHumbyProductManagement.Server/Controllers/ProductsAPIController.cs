using AutoMapper;
using dunnHumbyProductManagement.Server.Data;
using dunnHumbyProductManagement.Server.Models.Dto;
using dunnHumbyProductManagement.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System;
using System.Text.RegularExpressions;

namespace ReactApp3.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsAPIController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private ResponseDto _response;
        private IMapper _mapper;
        public ProductsAPIController(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _response = new ResponseDto();
            _mapper = mapper;
        }
        [HttpGet]
        public ResponseDto Get()
        {
            try
            {
                IEnumerable<Product> objList = _dbContext.Products.ToList();
                _response.Result = _mapper.Map<IEnumerable<ProductDto>>(objList);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _dbContext.Products.FindAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpGet]
        [Route("CategoryQuantity")]
        public ResponseDto GetProductQuantityByCategory()
        {
            try
            {
                var objList = _dbContext.Products
                                .GroupBy(p => p.Category)
                                .Select(g => new { Category = g.Key, Quantity = g.Sum(o => o.StockQuantity) })
                                .ToList();

                var wmyResults = _dbContext.ProductsWMY
                    .FromSqlRaw("select Id, " +
                        "count(CASE WHEN DateAdded >= DATETIME('now', '-7 days') Then Id END) AS productsThisWeek," +
                        "count(CASE WHEN DateAdded >= DATETIME('now', '-30 days') Then Id END) AS productsThismonth," +
                        "count(CASE WHEN DateAdded >= DATETIME('now', '-365 days') Then Id END) AS productsThisYear" +
                        " from Products")
                    .ToList();


                _response.Result = objList;
                _response.Result1 = wmyResults;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        //select Category, sum(StockQuantity) from [Products] group by Category ;



        //select count(CASE WHEN DateAdded >= DATETIME('now', '-7 days') Then Id END) AS ProductsThisWeek,
        //        count(CASE WHEN DateAdded >= DATETIME('now', '-30 days') Then Id END) AS ProductsThismonth,
        //       count(CASE WHEN DateAdded >= DATETIME('now', '-365 days') Then Id END) AS ProductsThisYear
        //       from Products;
    }
}
