using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    class SesionEntidad
    {
        
    }

    public class UsuarioEntidad : TokenEntidad
    {
        // public int IdUsuario { get; set; }
        public int IdRol { get; set; }
        public int IdInstitucion { get; set; }
        public string TxtNombreUsuario { get; set; }
        public string TxtApellidoUsuario { get; set; }
        
        public string TxtEmailUsuario { get; set; }
        public string TxtPasswordUsuario { get; set; }
        public int IdGenero { get; set; }
        public string TxtDescripcion { get; set; }
        public string TxtImg { get; set; }
    }

    public class InstitucionIdentidad : TokenEntidad
    {
        public int IdInstitucion { get; set; }
        public string TxtNombreInstitucion { get; set; }
        public string TxtDireccionInstitucion { get; set; }
    }

    public class RolEntidad : TokenEntidad
    {
        public int IdRol { get; set; }
        public string TxtNombreRol { get; set; }
        public string TxtDescripcionRol { get; set; }
    }
}
