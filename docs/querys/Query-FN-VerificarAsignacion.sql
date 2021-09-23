/*
	+-------------------------------------------+
	|	Tipo:	FUNCION Verificar Asignación	|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	22/09/2021						|
	+-------------------------------------------+
*/

ALTER FUNCTION Aula.FNVerificarAsignacion (@IdCurso INT, @IdEstudiante INT)
RETURNS TINYINT
AS
BEGIN
	DECLARE
			@CodigoResultado INT = 0,
			@IdAsignacion INT = 0,
			@TxtEstudiante NVARCHAR(100) =  ' ',
			@IdCursoAsingado INT = 0,
			@NombreCursoAsignado NVARCHAR (200) = ' '
	SELECT
			@IdAsignacion = a.IdEstudianteAsignacion,
			@TxtEstudiante = CONCAT (u.TxtNombreUsuario, ' ', u.TxtApellidoUsuario),
			@IdCursoAsingado = a.IdCursoDetalle,
			@NombreCursoAsignado = c.TxtNombreCurso
	FROM
			Aula.EstudianteAsignacion AS a,
			Aula.Estudiante AS e,
			Aula.CursoDetalle AS c,
			Sesion.TblUsuario AS u
	WHERE
			c.IdCursoDetalle = @IdCurso and
			a.IdEstudiante = @IdEstudiante and
			c.IdCursoDetalle = a.IdCursoDetalle and
			e.IdEstudiante = u.IdUsuario

	IF		(@IdAsignacion != 0)

			BEGIN
				SET @CodigoResultado = 200
			END

	ELSE
			BEGIN
				SET @CodigoResultado = 100
			END
	
	RETURN	@CodigoResultado

END


