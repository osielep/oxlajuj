using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Datos;
using System.Web.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Text;

namespace ApiRest.Clases
{
    public   class ValidaUsuario
    {
        private static string Usuario = WebConfigurationManager.AppSettings["Usuario"].ToString();
        private static string Password = WebConfigurationManager.AppSettings["Password"].ToString();
        private static string Server = WebConfigurationManager.AppSettings["Server"].ToString();
        private static string DB = WebConfigurationManager.AppSettings["DB"].ToString();

        public  string   usuario { get;set; }
        public string  clave { get; set; }
        public int codigo { get; set; }

        public int id_usuario { get; set; }
        public string nombre_usuario { get;set; }
        public string lblStatus = "";
        private static string CodPassword = "C0pern!c0";

        public ValidaUsuario()
        {

        }

        public static  string PasswordSHA512(string Password)
        {
            System.Security.Cryptography.SHA512Managed HashTool = new System.Security.Cryptography.SHA512Managed();
            Byte[] HashByte = Encoding.UTF8.GetBytes(String.Concat(Password, CodPassword)); //Convierte a una cadena de de bytes utf8 usando la password del usuario y el código del sistema.
            Byte[] EncryptedByte = HashTool.ComputeHash(HashByte);
            HashTool.Clear();

            return Convert.ToBase64String(EncryptedByte);
        }

        public static string CadenaConexionSQL()
        {
            return "Persist Security info = False; User ID = '" + Usuario +
                    "'; Password = '" + Password +
                    "'; Initial Catalog = '" + DB +
                    "'; Server = '" + Server + "'";
        }

        public static SqlCommand EjecutarPA(String SP)
        {
            string CadenaConexion = ValidaUsuario.CadenaConexionSQL();
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
        public static ValidaUsuario Login (ValidaUsuario validaUsuario)
        {

            DataTable DT = new DataTable();
            SqlCommand Comando = ValidaUsuario.EjecutarPA("Sesion.LoginUsuario");

            
            Comando.Parameters.AddWithValue("@EmailUsuario", validaUsuario.usuario);
            Comando.Parameters.AddWithValue("@PasswordUsuario", ValidaUsuario.PasswordSHA512(validaUsuario.clave));

            DT = ValidaUsuario.EjecutarComandoSelect(Comando);

            ValidaUsuario usuario = new ValidaUsuario();

            usuario.codigo = Convert.ToInt32( DT.Rows[0]["codigo_retorno"].ToString());
            usuario.id_usuario = Convert.ToInt32(DT.Rows[0]["id_usuario"].ToString());
            usuario.nombre_usuario = DT.Rows[0]["nombre_usuario"].ToString();



            //conexion 

            return usuario;
        }

    }
}