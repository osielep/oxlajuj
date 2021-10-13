using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiRest.Controllers
{
    public class CursoController : ApiController
    {
        [HttpPost]
        [Route("api/ObtenerDetalleDeCurso")]
        public DataTable ObtenerDetalleDeCurso(Entidades.CursoDetalleEntidad entidad)
        {
            return Datos.CursoDatos.ObtenerDetalleDeCurso(entidad);
        }

        [HttpPost]
        [Route("api/ObtenerCapitulosDeCurso")]
        public DataTable ObtenerCapitulosDeCurso(Entidades.CursoDetalleEntidad entidad)
        {
            return Datos.CursoDatos.ObtenerCapitulosDeCurso(entidad);
        }

        [HttpPost]
        [Route("api/ObtenerMaterialDeCapitulo")]
        public DataTable ObtenerMaterialDeCapitulo(Entidades.CursoDetalleEntidad entidad)
        {
            return Datos.CursoDatos.ObtenerMaterialDeCapitulo(entidad);
        }

        [HttpGet]
        [Route("api/ObtenerCursos")]
        public DataTable ObtenerCursos()
        {
            return Datos.CursoDatos.ObtenerCursos();
        }
    }
}
