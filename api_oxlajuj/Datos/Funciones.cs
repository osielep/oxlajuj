using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Datos
{
    class Funciones
    {
        public string lblStatus = "";
        private string CodPassword = "C0pern!c0";

        public string PasswordSHA512(string Password)
        {
            System.Security.Cryptography.SHA512Managed HashTool = new System.Security.Cryptography.SHA512Managed();
            Byte[] HashByte = Encoding.UTF8.GetBytes(String.Concat(Password, CodPassword)); //Convierte a una cadena de de bytes utf8 usando la password del usuario y el código del sistema.
            Byte[] EncryptedByte = HashTool.ComputeHash(HashByte);
            HashTool.Clear();

            return Convert.ToBase64String(EncryptedByte);
        }

        public string GenerarTokenDeSesion()
        {
            Random Rnd = new Random();
            int Aleatorio = Rnd.Next(1, 9999);

            string Hora = DateTime.Now.ToString("hh:mm:ss");
            string Fecha = DateTime.Now.ToString("dd/MM/yyyy");

            string TxtToken = PasswordSHA512(Fecha + Hora + Aleatorio);

            TxtToken = Regex.Replace(TxtToken, @"[^0-9A-Za-z]", "", RegexOptions.None);

            return TxtToken;
        }

        public static DataTable AgregarEstadoToken(DataTable DT, string Estado)
        {
            if (DT.Rows.Count > 0)
            {
                DT.Columns.Add("EstadoToken", typeof(string), Estado).SetOrdinal(0);
            }
            else
            {
                DT.Reset();
                DT.Clear();

                try
                {
                    DataColumn Col = new DataColumn();
                    Col.ColumnName = "EstadoToken";
                    DT.Columns.Add(Col);

                    DataRow Row = DT.NewRow();
                    Row["EstadoToken"] = Estado;
                    DT.Rows.Add(Row);
                }
                catch (Exception)
                {
                    DataRow Row = DT.NewRow();
                    Row["EstadoToken"] = Estado;
                    DT.Rows.Add(Row);
                }
            }

            return DT;
        }
    }
}
