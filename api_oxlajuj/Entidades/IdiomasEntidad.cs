using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    class IdiomasEntidad
    {
    }

    public class PalabraEntidad : TokenEntidad
    {
        public int IdPalabra { get; set; }

        public string TxtPalabraEspanol { get; set; }
        public string TxtPalabraIdiomaMaya { get; set; }


        public int IdIdioma { get; set; }
        public string TxtDefinicion { get; set; }
        public string TxtDefTemp { get; set; }
        public int IntSinonimo { get; set; }
        public int IntAntonimo { get; set; }
        public int IdGenero { get; set; }
        public int IdCategoriaGramatical { get; set; }
        public int IdTipoPalabra { get; set; }
        public string TxtImg { get; set; }
        public string TxtAudio { get; set; }
        public int IdAutor { get; set; }

    }

    public class TipoDepalabraEntidad : TokenEntidad
    {
        public int IdTipoPalabra { get; set; }
        public string TxtNombreTipoPalabra { get; set; }
        public string TxtDescripcion { get; set; }
    }

    public class IdiomaEntidad : TokenEntidad
    {
        public int IdIdioma { get; set; }
        public string TxtNombreIdioma { get; set; }
        public string TxtDescripcion { get; set; }
    }

    public class CtaGramaticalEntidad : TokenEntidad
    {
        public int IdCtaGramatical { get; set; }
        public string TxtNombreCtaGramatical { get; set; }
        public string TxtDescripcion { get; set; }
    }

    public class AutorEntidad : TokenEntidad
    {
        public int IdAutor { get; set; }
        public string TxtNombreAutor { get; set; }
        public string TxtApellidoAutor { get; set; }
        public string TxtEmailAutor { get; set; }
        public string TxtGenero { get; set; }
        public string TxtDescripcion { get; set; }
        public string TxtImg { get; set; }

    }
}
