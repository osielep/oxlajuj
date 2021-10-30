using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class MaterialDidacticoDatos
    {
        public static DataTable AgregarHojaEncabezado(Entidades.HojaEncabezado Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.AgregarHojaEncabezado");
            Comando.Parameters.AddWithValue("@TxtTitulo", Entidad.TxtTitulo);
            Comando.Parameters.AddWithValue("@RefLogo", Entidad.RefLogo);
            Comando.Parameters.AddWithValue("@TxtDocente", Entidad.TxtDocente);
            Comando.Parameters.AddWithValue("@FechaAplicacion", Entidad.FechaAplicacion);
            Comando.Parameters.AddWithValue("@TxtTipoHoja", Entidad.TxtTipoHoja);
            Comando.Parameters.AddWithValue("@IntPrivacidad", Entidad.IntPrivacidad);
            Comando.Parameters.AddWithValue("@IdUsuario", Entidad.IdUsuario);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable AgregarHojaCuerpo(Entidades.HojaCuerpo Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.AgregarHojaCuerpo");
            Comando.Parameters.AddWithValue("@IdHojaEncabezado", Entidad.IdHojaEncabezado);
            Comando.Parameters.AddWithValue("@TxtDescripcion", Entidad.TxtDescripcion);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable AgregarHojaSeccion(Entidades.HojaSeccion Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.AgregarHojaSeccion");
            Comando.Parameters.AddWithValue("@IdHojaCuerpo", Entidad.IdHojaCuerpo);
            Comando.Parameters.AddWithValue("@IdTipoEvaluacion", Entidad.IdTipoEvaluacion);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable AgregarHojaPalabras(Entidades.HojaPalabras Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.AgregarHojaPalabras");
            Comando.Parameters.AddWithValue("@IdHojaSeccion", Entidad.IdHojaSeccion);
            Comando.Parameters.AddWithValue("@IdPalabra", Entidad.IdPalabra);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }


        public static DataTable VerHojaEncabezado(Entidades.HojaEncabezado Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.VerHojaEncabezado");
            Comando.Parameters.AddWithValue("@IdHojaEncabezado", Entidad.IdHojaEncabezado);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable VerHojaCuerpo(Entidades.HojaCuerpo Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.VerHojaCuerpo");
            Comando.Parameters.AddWithValue("@IdHojaCuerpo", Entidad.IdHojaCuerpo);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }


        public static DataTable TopCincoPalabras(Entidades.TipoDepalabraEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Idiomas.SP_CincoPalabrasAleatorias");
            Comando.Parameters.AddWithValue("@IdTipoPalabra", Entidad.IdTipoPalabra);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable ObtenerCategorias()
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Idiomas.SP_ObtenerCategorias");

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }


        public static DataTable ObtenerTipoEvaluacion()
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Aula.SP_ObtenerTipoEvaluacion");

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }
    }
}
