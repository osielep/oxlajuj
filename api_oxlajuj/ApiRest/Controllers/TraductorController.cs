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

        [HttpPost]
        [Route("api/AutorTexto")]
        public DataTable AutorTexto(Entidades.PalabraEntidad entidad)
        {
            return Datos.TraductorDatos.AutorTexto(entidad);
        }

        [HttpPost]
        [Route("api/OtenerAudio")]
        public DataTable OtenerAUdio(Entidades.PalabraEntidad entidad)
        {
            return Datos.TraductorDatos.OtenerAUdio(entidad);
        }
    }
}