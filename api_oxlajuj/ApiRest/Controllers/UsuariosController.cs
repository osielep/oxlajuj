using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
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

        [Authorize]
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
        [Route("api/CambiarContrasenia")]
        public DataTable CambiarContrasenia(Entidades.UsuarioEntidad entidad)
        {
            return Datos.UsuariosDatos.CambiarContrasenia(entidad);
        }

        [HttpPost]
        [Route("api/IniciarSesion")]
        public DataTable IniciarSesion(Entidades.UsuarioEntidad entidad)
        {
            return Datos.UsuariosDatos.IniciarSesion(entidad);
        }


        [HttpPost]
        [Route("api/SubirArchivo")]
        public string GuardarArchivo()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = HttpContext.Current.Server.MapPath("~/C:/Oxlanjuj/git/oxlajuj/web_app/usuarios/multimedia/pp" + filename);
                //var physicalPath = HttpContext.Current.Server.MapPath("C:/web_apps/oxlajuj.com/usuarios/multimedia/pp" + filename);
                postedFile.SaveAs(physicalPath);
                return filename;
            }
            catch (Exception)
            {
                return "pp.png";
            }
        }


        [HttpGet]
        [Route("api/ReporteUsuariosActivos")]
        public DataTable ReporteUsuariosActivos()
        {
            return Datos.UsuariosDatos.ReporteUsuariosActivos();
        }

        [HttpGet]
        [Route("api/ReporteUsuariosInactivos")]
        public DataTable ReporteUsuariosInactivos()
        {
            return Datos.UsuariosDatos.ReporteUsuariosInactivos();
        }


        [HttpGet]
        [Route("api/ReporteTopLPalabras")]
        public DataTable ReporteTopLPalabras()
        {
            return Datos.UsuariosDatos.ReporteTopLPalabras();
        }

        [HttpGet]
        [Route("api/ReportePalabrasPopulares")]
        public DataTable ReportePalabrasPopulares()
        {
            return Datos.UsuariosDatos.ReportePalabrasPopulares();
        }

        [HttpPost]
        [Route("api/TitulosWoksheetUser")]
        public DataTable TitulosWoksheetUser(Entidades.UsuarioEntidad entidad)
        {
            return Datos.UsuariosDatos.TitulosWoksheetUser(entidad);
        }

    }
}