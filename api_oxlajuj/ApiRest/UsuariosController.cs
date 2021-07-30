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
        [Route("api/AgregarUsuario")]
        public DataTable AgregarUsuario(Entidades.UsuarioEntidad entidad)
        {
            return Datos.UsuariosDatos.AgregarUsuario(entidad);
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
    }
}