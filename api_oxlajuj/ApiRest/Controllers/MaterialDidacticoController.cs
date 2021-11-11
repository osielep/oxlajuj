using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiRest.Controllers
{
    public class MaterialDidacticoController : ApiController
    {
        [HttpPost]
        [Route("api/AgregarHojaEncabezado")]
        public DataTable AgregarHojaEncabezado(Entidades.HojaEncabezado entidad)
        {
            return Datos.MaterialDidacticoDatos.AgregarHojaEncabezado(entidad);
        }

        [HttpPost]
        [Route("api/AgregarHojaCuerpo")]
        public DataTable AgregarHojaCuerpo(Entidades.HojaCuerpo entidad)
        {
            return Datos.MaterialDidacticoDatos.AgregarHojaCuerpo(entidad);
        }

        [HttpPost]
        [Route("api/AgregarHojaSeccion")]
        public DataTable AgregarHojaSeccion(Entidades.HojaSeccion entidad)
        {
            return Datos.MaterialDidacticoDatos.AgregarHojaSeccion(entidad);
        }

        [HttpPost]
        [Route("api/AgregarHojaPalabras")]
        public DataTable AgregarHojaPalabras(Entidades.HojaPalabras entidad)
        {
            return Datos.MaterialDidacticoDatos.AgregarHojaPalabras(entidad);
        }


        [HttpPost]
        [Route("api/VerHojaEncabezado")]
        public DataTable VerHojaEncabezado(Entidades.HojaEncabezado entidad)
        {
            return Datos.MaterialDidacticoDatos.VerHojaEncabezado(entidad);
        }

        [HttpPost]
        [Route("api/VerHojaCuerpo")]
        public DataTable VerHojaCuerpo(Entidades.HojaCuerpo entidad)
        {
            return Datos.MaterialDidacticoDatos.VerHojaCuerpo(entidad);
        }

        [HttpPost]
        [Route("api/TopCincoPalabras")]
        public DataTable TopCincoPalabras(Entidades.TipoDepalabraEntidad entidad)
        {
            return Datos.MaterialDidacticoDatos.TopCincoPalabras(entidad);
        }

        [HttpGet]
        [Route("api/ObtenerCategorias")]
        public DataTable ObtenerCategorias()
        {
            return Datos.MaterialDidacticoDatos.ObtenerCategorias();
        }

        [HttpGet]
        [Route("api/ObtenerTipoEvaluacion")]
        public DataTable ObtenerTipoEvaluacion()
        {
            return Datos.MaterialDidacticoDatos.ObtenerTipoEvaluacion();
        }

        [HttpGet]
        [Route("api/VerAllWorksheet")]
        public DataTable VerAllWorksheet()
        {
            return Datos.MaterialDidacticoDatos.VerAllWorksheet();
        }

        [HttpPost]
        [Route("api/ObtenerTituloSeccion")]
        public DataTable ObtenerTituloSeccion(Entidades.HojaSeccion entidad)
        {
            return Datos.MaterialDidacticoDatos.ObtenerTituloSeccion(entidad);
        }

        [HttpPost]
        [Route("api/ObtenerPalabrasPorSeccion")]
        public DataTable ObtenerPalabrasPorSeccion(Entidades.HojaSeccion entidad)
        {
            return Datos.MaterialDidacticoDatos.ObtenerPalabrasPorSeccion(entidad);
        }

    }
}
