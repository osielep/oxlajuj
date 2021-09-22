using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class UsuariosDatos
    {
        private static readonly Funciones Funciones = new Funciones();
        private static readonly int VigenciaMinutos = 60;

        public static DataTable RegistroUsuarios(Entidades.UsuarioEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Sesion.SPAgregarUsuario");
            Comando.Parameters.AddWithValue("@IdInstitucion", Entidad.IdInstitucion);
            Comando.Parameters.AddWithValue("@TxtNombreUsuario", Entidad.TxtNombreUsuario);
            Comando.Parameters.AddWithValue("@TxtApellidoUsuario", Entidad.TxtApellidoUsuario);
            Comando.Parameters.AddWithValue("@TxtEmailUsuario", Entidad.TxtEmailUsuario);
            Comando.Parameters.AddWithValue("@TxtPasswordUsuario", Funciones.PasswordSHA512(Entidad.TxtPasswordUsuario));
            Comando.Parameters.AddWithValue("@IdGenero", Entidad.IdGenero);
            Comando.Parameters.AddWithValue("@TxtDescripcion", Entidad.TxtDescripcion);
            Comando.Parameters.AddWithValue("@TxtImg", Entidad.TxtImg);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable ObtenerUsuarios()
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Sesion.SPObtenerUsuarios");
            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable OtenerDatosUsuario(Entidades.UsuarioEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Sesion.SPObtenerDatosUsuario");
            Comando.Parameters.AddWithValue("@IdUsuario", Entidad.IdUsuario);
            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable EliminarUsuario(Entidades.UsuarioEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Sesion.SPEliminarUsuario");
            Comando.Parameters.AddWithValue("@IdUsuario", Entidad.IdUsuario);
            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static DataTable ActualizarUsuario(Entidades.UsuarioEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Sesion.SPActualizarUsuario");
            Comando.Parameters.AddWithValue("@IdUsuario", Entidad.IdUsuario);
            Comando.Parameters.AddWithValue("@IdRol", Entidad.IdRol);
            Comando.Parameters.AddWithValue("@IdInstitucion", Entidad.IdInstitucion);
            Comando.Parameters.AddWithValue("@TxtNombreUsuario", Entidad.TxtNombreUsuario);
            Comando.Parameters.AddWithValue("@TxtApellidoUsuario", Entidad.TxtApellidoUsuario);
            Comando.Parameters.AddWithValue("@TxtEmailUsuario", Entidad.TxtEmailUsuario);
            Comando.Parameters.AddWithValue("@TxtPasswordUsuario", Funciones.PasswordSHA512(Entidad.TxtPasswordUsuario));
            Comando.Parameters.AddWithValue("@IdGenero", Entidad.IdGenero);
            Comando.Parameters.AddWithValue("@TxtDescripcion", Entidad.TxtDescripcion);
            Comando.Parameters.AddWithValue("@TxtImg", Entidad.TxtImg);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }


        public static DataTable IniciarSesion(Entidades.UsuarioEntidad Entidad)
        {
            DataTable DT = new DataTable();
            SqlCommand Comando = Conexion.EjecutarPA("Sesion.SPIniciarSesion");
            Comando.Parameters.AddWithValue("@TxtEmail", Entidad.TxtEmailUsuario);
            Comando.Parameters.AddWithValue("@TxtPassword", Funciones.PasswordSHA512(Entidad.TxtPasswordUsuario));
            Comando.Parameters.AddWithValue("@TxtToken", Entidad.TxtToken);
            Comando.Parameters.AddWithValue("@VigenciaMin", Entidad.VigenciaMinutos);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }

        public static int ObtenerEstadoToken(string TxtToken)
        {
            DataTable DT = new DataTable();
            SqlCommand Comando = Conexion.EjecutarPA("Sesion.SPObtenerEstadoToken");
            Comando.Parameters.AddWithValue("@TxtToken", TxtToken);

            DT = Conexion.EjecutarComandoSelect(Comando);
            return Convert.ToInt32(DT.Rows[0][0].ToString());
        }

        public static DataTable AgregarEstadoToken(DataTable DT, string Estado)
        {

        }
    }
}
