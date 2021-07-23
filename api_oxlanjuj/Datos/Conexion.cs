using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    class Conexion
    {
        private static string Usuario   = "sa";
        private static string Password  = "1234";
        private static string Server    = "MSI\\SQLEXPRESS";
        private static string DB        = "OXLANJUJ";

        private static string CadenaConexionSQL()
        {
            return  "Persist Security info = False; User ID = '" + Usuario +
                    "'; Passowrd = '" + Password +
                    "'; Initial Catalog = '" + DB +
                    "'; Server = '" + Server + "'";
        }
    }
}
