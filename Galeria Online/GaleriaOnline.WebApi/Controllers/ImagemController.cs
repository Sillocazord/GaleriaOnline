using System;
using GaleriaOnline.WebApi.DTO;
using GaleriaOnline.WebApi.Interfaces;
using GaleriaOnline.WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace GaleriaOnline.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagemController : ControllerBase
    {
        private readonly IImagemRepository _repository;
        private readonly IWebHostEnvironment _env;

        public ImagemController(IImagemRepository repository, IWebHostEnvironment env)
        {
            _repository = repository;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetTodasAsImagens()
        {
           var imagens = await _repository.GetALLAsync();
            return Ok(imagens);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetImagemPorId(int id)
        {
            var imagem = await _repository.GetByIdAsync(id);
            if (imagem == null)
            {
                return NotFound();
            }

            return Ok(imagem);
        }
        [HttpPost("Upload")]
        public async Task<IActionResult> UploadImagem([FromForm] ImagemDTO dto)
        {
            if (dto.Arquivo == null || dto.Arquivo.Length == 0 || String.IsNullOrWhiteSpace(dto.Nome))
            {
                return BadRequest("Nenhum arquivo enviado");
            }
            var extensao = Path.GetExtension(dto.Arquivo.FileName);
            var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

            var pastaRelativa = "wwwroot/imagens";
            var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

            if (!Directory.Exists(caminhoPasta))
            {
                Directory.CreateDirectory(caminhoPasta);
            }

            var caminhoCompleto = Path.Combine(caminhoPasta,nomeArquivo);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await dto.Arquivo.CopyToAsync(stream);
            }

            var imagem = new Imagem
            {
                Nome = dto.Nome,
                Caminho = Path.Combine(pastaRelativa, nomeArquivo).Replace("\\", "/")
            };

            await _repository.CreateAsync(imagem);

            return CreatedAtAction(nameof(GetImagemPorId), new { id = imagem.Id }, imagem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarImagem(int id, PutImagemDTO imagemAtualizada)
        {
            var imagem = await _repository.GetByIdAsync(id);

            if (imagem == null)
            {
                return NotFound("Imagem não encontrada");
            }
            if (imagemAtualizada.Arquivo == null && string.IsNullOrEmpty(imagemAtualizada.Nome))
                {
                   return BadRequest("Pelo menos um dos campos tem que ser preenchido");
            }
            if (!string.IsNullOrEmpty(imagemAtualizada.Nome)) 
            {
                imagem.Nome = imagemAtualizada.Nome;
            }

            var caminhoAntigo = Path.Combine(Directory.GetCurrentDirectory(),imagem.Caminho.Replace("/", Path.DirectorySeparatorChar.ToString()));

            if (imagemAtualizada.Arquivo != null && imagemAtualizada.Arquivo.Length > 0) {
                if (System.IO.File.Exists(caminhoAntigo)) 
                {
                    System.IO.File.Delete(caminhoAntigo);
                }

                var extensao = Path.GetExtension(imagemAtualizada.Arquivo.FileName);
                var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

                var pastaRelativa = "wwwroot/imagens";
                var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

                if (!Directory.Exists(caminhoPasta))
                {
                    Directory.CreateDirectory(caminhoPasta);
                }

                var caminhoCompleto = Path.Combine(caminhoPasta, nomeArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await imagemAtualizada.Arquivo.CopyToAsync(stream);
                }

                imagem.Caminho = Path.Combine(pastaRelativa, nomeArquivo).Replace("\\", "/");
            }
            var atualizado = await _repository.UpdateAsync(imagem);
            if (!atualizado)
            {
                return StatusCode(500, "Erro ao atualizar a imagem");
            }

            return Ok(imagem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarImagem(int id)
        {
            var imagem = await _repository.GetByIdAsync(id);
            if (imagem == null)
            {
                return BadRequest("Imagem não encontrada");
            }
            var caminhoFisico = Path.Combine(Directory.GetCurrentDirectory(), imagem.Caminho.Replace("/", Path.DirectorySeparatorChar.ToString()));
            if (System.IO.File.Exists(caminhoFisico))
            {
                try
                {
                    System.IO.File.Delete(caminhoFisico);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"erro ao excluir o arquivo {ex.Message}");
                }
            }
            
            var deletado = await _repository.DeleteAsync(id);
            if (!deletado)
            {
                return StatusCode(500, "Erro ao excluir imagem do banco");
            }
            return NoContent();
        }
    }
}