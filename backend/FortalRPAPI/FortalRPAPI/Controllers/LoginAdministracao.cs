using FortalRPAPI.Data;
using FortalRPAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FortalRPAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginAdministracao : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public LoginAdministracao(AppDbContext appDbContext) { 
            _appDbContext = appDbContext;
        }


        // GET: api/<LoginAdministracao>
        [HttpGet("Login")]
        public ActionResult<ICollection<Administradores>> Login([FromQuery] string usuario, [FromQuery] string senha)
        {
            var admin = _appDbContext.Administradores
                .FirstOrDefault(a => a.Usuario == usuario && a.Senha == senha);

            if (admin == null)
                return Unauthorized("Login falhou!");

            return Ok(new
            {
                Mensagem = "Login realizado com sucesso!",
                Usuario = admin.Usuario,
                ListaAdmins = _appDbContext.Administradores.ToList()
            });
        }
    }
}
