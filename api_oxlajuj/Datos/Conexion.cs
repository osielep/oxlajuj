using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace Datos
{
    class Conexion
    {
        private static string Usuario   = WebConfigurationManager.AppSettings["Usuario"].ToString();
        private static string Password  = WebConfigurationManager.AppSettings["Password"].ToString();
        private static string Server    = WebConfigurationManager.AppSettings["Server"].ToString();
        private static string DB        = WebConfigurationManager.AppSettings["DB"].ToString();

        private static string CadenaConexionSQL()
        {
            return  "Persist Security info = False; User ID = '" + Usuario +
                    "'; Password = '" + Password +
                    "'; Initial Catalog = '" + DB +
                    "'; Server = '" + Server + "'";
        }


        //
        public static SqlCommand EjecutarPA(String SP)
        {
            string CadenaConexion = Conexion.CadenaConexionSQL();
            SqlConnection MiConexion = new SqlConnection(CadenaConexion);
            SqlCommand Comando = new SqlCommand(SP, MiConexion);
            Comando.CommandType = CommandType.StoredProcedure;

            return Comando;
        }



        public static DataTable EjecutarComandoSelect(SqlCommand Comando)
        {
            DataTable DT = new DataTable();

            try
            {
                Comando.Connection.Open();
                SqlDataAdapter adaptador = new SqlDataAdapter();
                adaptador.SelectCommand = Comando;
                adaptador.Fill(DT);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                Comando.Connection.Dispose();
                Comando.Connection.Close();
            }

            return DT;
        }
    }
}
