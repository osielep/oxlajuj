using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class CursoDatos
    {
        public static DataTable ObtenerDetalleDeCurso(Entidades.CursoDetalleEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.SPObtenerDetalleCurso");
            Comando.Parameters.AddWithValue("@IdCurso", Entidad.IdCursoDetalle);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable ObtenerCapitulosDeCurso(Entidades.CursoDetalleEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.SPObtenerCapitulosDeCurso");
            Comando.Parameters.AddWithValue("@IdCurso", Entidad.IdCursoDetalle);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable ObtenerMaterialDeCapitulo(Entidades.CursoDetalleEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.SPObtenerMaterialCapitulo");
            Comando.Parameters.AddWithValue("@IdCurso", Entidad.IdCursoDetalle);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable ObtenerCursos()
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.SPObtenerCursos");

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }
    }
}
