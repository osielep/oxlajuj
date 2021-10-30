using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    class AulaVirtualEntidad
    {

    }

    public class TipoDeEvaluacionEntidad : TokenEntidad
    {
        public int IdTipoEvaluacion { get; set; }
        public string TxtNombreEvaluacion { get; set; }
        public string TxtDescripcion { get; set; }
        public int IntMaxPalabras { get; set; }
    }

    public class CursoDetalleEntidad : TokenEntidad
    {
        public int IdCursoDetalle { get; set; }
        public string TxtNombreCurso { get; set; }
        public string TxtDescripcion { get; set; }
        public string TxtImagen { get; set; }
        public decimal IntPrecio { get; set; }
        public int IdEspecialziacionDetalle { get; set; }
        public int IdDificultad { get; set; }
        public int DuracionHoras { get; set; }
    }

    public class CursoProfesor : TokenEntidad
    {
        public int IdCursoProfesor { get; set; }
        public int IdCursoDetalle { get; set; }
        public int IdProfesor { get; set; }
    }

    public class EstudianteAsignacion : TokenEntidad
    {
        public int IdEstudianteAsignacion { get; set; }
        public int IdCursoDetalle { get; set; }
        public int IdEstudiante { get; set; }
        public string FechaDeAsignacion { get; set; }
        public int IdEstado { get; set; }
        public decimal IntNotaFinal { get; set; }
        public int IdCertificado { get; set; }
        public string UbicacionCertificado { get; set; }
        public int IdCursoCapitulo { get; set; }
    }

    public class HojaEncabezado : TokenEntidad
    {
        public int IdHojaEncabezado { get; set; }
        public string TxtTitulo { get; set; }
        public string RefLogo { get; set; }
        public string TxtDocente { get; set; }
        public string FechaAplicacion { get; set; }
        public string TxtTipoHoja { get; set; }
        public int IntPrivacidad { get; set; }
    }

    public class HojaCuerpo : TokenEntidad
    {
        public int IdHojaCuerpo { get; set; }
        public int IdHojaEncabezado { get; set; }
        public string TxtDescripcion { get; set; }
    }

    public class HojaSeccion : TokenEntidad
    {
        public int IdHojaSeccion { get; set; }
        public int IdHojaCuerpo { get; set; }
        public int IdTipoEvaluacion { get; set; }
    }

    public class HojaPalabras : TokenEntidad
    {
        public int IdHojaPalabra { get; set; }
        public int IdHojaSeccion { get; set; }
        public int IdPalabra { get; set; }
    }
}
