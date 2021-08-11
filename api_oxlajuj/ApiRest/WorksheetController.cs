using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiRest
{
    public class WorksheetController : ApiController
    {


        [HttpPost]
        [Route("api/VerWorksheetHeader")]
        public DataTable VerWorksheetHeader(Entidades.WorksheetHeaderEntidad entidad)
        {
            return Datos.WorksheetDatos.VerWorksheetHeader(entidad);
        }

        [HttpPost]
        [Route("api/VerWorksheetBody")]
        public DataTable VerWorksheetBody(Entidades.WorksheetHeaderEntidad entidad)
        {
            return Datos.WorksheetDatos.VerWorksheetBody(entidad);
        }

    }
}