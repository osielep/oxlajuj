using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using ApiRest.Models;
using Entidades;

namespace ApiRest.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("echoping")]
        public IHttpActionResult EchoPing()
        {
            return Ok(true);
        }

        [HttpGet]
        [Route("echouser")]
        public IHttpActionResult EchoUser()
        {
            var identity = Thread.CurrentPrincipal.Identity;
            return Ok($" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}");
        }


        //[HttpPost]
        //[Route("login")]
        //public IHttpActionResult Login(Entidades.UsuarioEntidad entidad)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    bool isCredentialValid = (entidad.TxtPasswordUsuario == "123456");
        //    if (isCredentialValid)
        //    {
        //        var token = TokenGenerator.GenerateTokenJwt(entidad.TxtEmailUsuario);
        //        return Ok(token);
        //    }
        //    else
        //    {
        //        return Unauthorized();
        //    }
        //}

        //[HttpPost]
        //[Route("authenticate")]
        //public IHttpActionResult Authenticate(LoginRequest login)
        //{
        //     if (login == null)
        //        throw new HttpResponseException(HttpStatusCode.BadRequest);

        //    //TODO: Validate credentials Correctly, this code is only for demo !!
        //    bool isCredentialValid = (login.Password == "123456");

        //    if (isCredentialValid)
        //    {
        //        var token = TokenGenerator.GenerateTokenJwt(login.Username);
        //        return Ok(token);
        //    }
        //    else
        //    {
        //        return Unauthorized();
        //    }
        //}

        [HttpPost]
        [Route("authenticate")]
        public IHttpActionResult Authenticate(Clases.ValidaUsuario plogin)
        {
            
            if (plogin == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);


            Clases.ValidaUsuario usrvalido = new Clases.ValidaUsuario();

            usrvalido = Clases.ValidaUsuario.Login(plogin);

            string iduser = usrvalido.id_usuario.ToString();

            if (usrvalido.codigo == 200)
            {
                var token = TokenGenerator.GenerateTokenJwt(usrvalido.nombre_usuario, iduser);
                return Ok(token);
            }
            else
            {
                return Unauthorized();
            }

            //fin de la creacion de la conexion a la db

           
        }
    }
}
