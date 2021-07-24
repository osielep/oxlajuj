using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    }
}
