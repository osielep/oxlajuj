using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiRest
{
    public class UsuariosController : ApiController
    {
        [HttpPost]
        [Route("api/RegistroUsuarios")]
        public DataTable RegistroUsuarios(Entidades.UsuarioEntidad entidad)
        {
            return Datos.UsuariosDatos.RegistroUsuarios(entidad);
        }

        [HttpGet]
        [Route("api/ObtenerUsuarios")]
        public DataTable ObtenerUsuarios()
        {
            return Datos.UsuariosDatos.ObtenerUsuarios();
        }

        [HttpPost]
        [Route("api/OtenerDatosUsuario")]
        public DataTable OtenerDatosUsuario(Entidades.UsuarioEntidad entidad)
        {
            return Datos.UsuariosDatos.OtenerDatosUsuario(entidad);
        }

        [HttpPost]
        [Route("api/EliminarUsuario")]
        public DataTable EliminarUsuario(Entidades.UsuarioEntidad entidad)
        {
            return Datos.UsuariosDatos.EliminarUsuario(entidad);
        }

        [HttpPost]
        [Route("api/ActualizarUsuario")]
        public DataTable ActualizarUsuario(Entidades.UsuarioEntidad entidad)
        {
            return Datos.UsuariosDatos.ActualizarUsuario(entidad);
        }

        [HttpPost]
        [Route("api/IniciarSesion")]
        public DataTable IniciarSesion(Entidades.UsuarioEntidad entidad)
        {
            return Datos.UsuariosDatos.IniciarSesion(entidad);
        }
    }
}