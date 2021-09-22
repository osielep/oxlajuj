/*
	+---------------------------------------+
	|	Tipo:	Funcion Verificar Token		|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	21/09/2021					|
	+---------------------------------------+
*/

ALTER FUNCTION Sesion.FNVerificarVigenciaToken( @TxtToken NVARCHAR(250) )
RETURNS TINYINT
AS
BEGIN
	DECLARE @IntResultado TINYINT = 0,
			@VigenciaMinutos INT = 30,
			@DateTimeCreacion DATETIME = '2001-01-01 01:01:01:001',
			@DateTimeActual DATETIME = getdate(),
			@TiempoMinutos INT = 0
	SELECT
			@VigenciaMinutos = a.VigenciaMinutos,
			@DateTimeCreacion = a.FechaIngreso
	FROM	
			Sesion.TblToken AS a
	WHERE
			a.TxtToken = @TxtToken and
			a.IntEstado = 1
	SET
			@TiempoMinutos = DATEDIFF(MINUTE, @DateTimeCreacion, @DateTimeActual)

	IF		(@TiempoMinutos > @VigenciaMinutos)
			BEGIN
				SET @IntResultado = 0
			END
	ELSE
			BEGIN
				SET @IntResultado = 1
			END

	RETURN @IntResultado
END




/*
	+---------------------------------------+
	|	Tipo:	Actualizar estado Token		|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	14/09/2021					|
	+---------------------------------------+
*/

CREATE PROCEDURE Sesion.SPActualizarVigenciaToken (  @TxtToken NVARCHAR(250) )
AS
BEGIN
	
	DELETE	Sesion.TblToken
	WHERE	IntEstado = 0

	UPDATE	Sesion.TblToken
	SET		FechaIngreso = getdate()
	WHERE	TxtToken = @TxtToken
	AND		IntEstado = 1

END


/*
	+---------------------------------------+
	|	Tipo:	Obtener estado Token		|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	14/09/2021					|
	+---------------------------------------+
*/

CREATE PROCEDURE Sesion.SPObtenerEstadoToken (  @TxtToken NVARCHAR(250) )
AS
DECLARE @EstadoToken TINYINT = 0
BEGIN

	SELECT @EstadoToken = Sesion.FNVerificarVigenciaToken ( @TxtToken )

	IF (@EstadoToken = 1)
		BEGIN
			EXEC Sesion.SPActualizarVigenciaToken @TxtToken
		END
	SELECT EstadoToken = @EstadoToken
END