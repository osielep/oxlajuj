﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datos
{
    public class Usuarios
    {
        private static readonly Funciones Funciones = new Funciones();

        public static DataTable AgregarUsuario(Entidades.UsuarioEntidad Entidad)
        {
            DataTable DT = new DataTable();

            SqlCommand Comando = Conexion.EjecutarPA("Sesion.SPAgregarUsuario");
            Comando.Parameters.AddWithValue("@IdRol", Entidad.IdRol);
            Comando.Parameters.AddWithValue("@IdInstitucion", Entidad.IdInstitucion);
            Comando.Parameters.AddWithValue("@TxtNombreUsuario", Entidad.TxtNombreUsuario);
            Comando.Parameters.AddWithValue("@TxtApellidoUsuario", Entidad.TxtApellidoUsuario);
            Comando.Parameters.AddWithValue("@TxtEmailUsuario", Entidad.TxtEmailUsuario);
            Comando.Parameters.AddWithValue("@TxtPasswordUsuario", Funciones.PasswordSHA512(Entidad.TxtPasswordUsuario));
            Comando.Parameters.AddWithValue("@TxtGenero", Entidad.TxtGenero);
            Comando.Parameters.AddWithValue("@TxtDescripcion", Entidad.TxtDescripcion);
            Comando.Parameters.AddWithValue("@TxtImg", Entidad.TxtImg);

            DT = Conexion.EjecutarComandoSelect(Comando);

            return DT;
        }
    }
}
