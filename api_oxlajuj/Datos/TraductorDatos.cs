using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class TraductorDatos
    {

        public static DataTable BuscarPalabra(Entidades.PalabraEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Idiomas.SPBuscarPalabra");
            Comando.Parameters.AddWithValue("@TxtPalabraEspanol", Entidad.TxtPalabraEspanol);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable BuscarOracionDeEjemplo(Entidades.PalabraEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Idiomas.SPBuscarOracionesDeEjemplo");
            Comando.Parameters.AddWithValue("@TxtPalabraEspanol", Entidad.TxtPalabraEspanol);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }
    }
}
