using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class WorksheetDatos
    {
        public static DataTable VerWorksheetHeader(Entidades.WorksheetHeaderEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.SPWorksheetHeaderView");
            Comando.Parameters.AddWithValue("@IdWorksheetHeader", Entidad.IdWorksheetHeader);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable VerWorksheetBody(Entidades.WorksheetHeaderEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.SPWorksheetBodyView");
            Comando.Parameters.AddWithValue("@IdWorksheetHeader", Entidad.IdWorksheetHeader);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }
    }
}
