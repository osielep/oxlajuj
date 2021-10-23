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

        public static DataTable ObtenerMaterialDeCapituloAvances(Entidades.CursoDetalleEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.SPObtenerMaterialCapitulo2");
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

        public static DataTable MostarPorcentajeTotal(Entidades.EstudianteAsignacion Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.MostrarPorcentajeAvance");
            Comando.Parameters.AddWithValue("@IdCursoCapitulo", Entidad.IdCursoCapitulo);
            Comando.Parameters.AddWithValue("@IdEstudianteAsignacion", Entidad.IdEstudianteAsignacion);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable PuntosPorMaterial(Entidades.EstudianteAsignacion Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.PuntosPorMaterial");
            Comando.Parameters.AddWithValue("@IdEstudianteAsignacion", Entidad.IdEstudianteAsignacion);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }
    }
}
