using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class TokenEntidad
    {
        public int IdToken { get; set; }
        public string TxtToken { get; set; }
        public int IdUsuario { get; set; }
        public int VigenciaMinutos { get; set; }
        public string FechaIngreso { get; set; }
        public int IdUsuarioAdmin { get; set; }
        public int IntEstado { get; set; }
    }
}
