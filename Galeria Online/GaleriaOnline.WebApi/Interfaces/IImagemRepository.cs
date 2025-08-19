using GaleriaOnline.WebApi.Models;

namespace GaleriaOnline.WebApi.Interfaces
{
    public interface IImagemRepository
    {
        Task<IEnumerable<Imagem>> GetALLAsync();
        Task<Imagem?> GetByIdAsync(int id);
        Task<Imagem> CreateAsync(Imagem imagem);
        Task<bool> UpdateAsync(Imagem imagem);
        Task<bool> DeleteAsync(int id);
    }
}
