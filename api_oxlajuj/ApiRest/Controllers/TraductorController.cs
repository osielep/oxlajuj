using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiRest
{
    public class TraductorController : ApiController
    {
        [HttpPost]
        [Route("api/BuscarPalabra")]
        public DataTable BuscarPalabra(Entidades.PalabraEntidad entidad)
        {
            return Datos.TraductorDatos.BuscarPalabra(entidad);
        }

        [HttpPost]
        [Route("api/BuscarOracionDeEjemplo")]
        public DataTable BuscarOracionDeEjemplo(Entidades.PalabraEntidad entidad)
        {
            return Datos.TraductorDatos.BuscarOracionDeEjemplo(entidad);
        }

        [HttpGet]
        [Route("api/ObtenerTopPalabras")]
        public DataTable ObtenerTopPalabras()
        {
            return Datos.TraductorDatos.ObtenerTopPalabras();
        }
    }
}