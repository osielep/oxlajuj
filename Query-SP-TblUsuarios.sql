/*
	|------------------------------|
	|-- TABLA USUARIOS ------------|
	|------------------------------|
*/


/*
	Tipo:	Agregar nuevo usuario
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	23/07/2021
	-------------------------------------
*/

ALTER PROC Sesion.SPAgregarUsuario (
									@IdInstitucion			INT,
									@TxtNombreUsuario		NVARCHAR(50),
									@TxtApellidoUsuario		NVARCHAR(50),
									@TxtEmailUsuario		NVARCHAR(100),
									@TxtPasswordUsuario		NVARCHAR(150),
									@IdGenero				NVARCHAR(15),
									@TxtDescripcion			NVARCHAR(150),
									@TxtImg					NVARCHAR(100)
								)
AS

DECLARE @FilasAfectadas	TINYINT,
		@Resultado		SMALLINT,
		@UltimoID		SMALLINT

BEGIN
	BEGIN TRAN
		SELECT @UltimoID = ISNULL(MAX(a.IdUsuario),0) 
		FROM Sesion.TblUsuario AS a
	BEGIN TRY
		INSERT INTO Sesion.TblUsuario (
									IdUsuario,
									IdInstitucion,
									TxtNombreUsuario,
									TxtApellidoUsuario,
									TxtEmailUsuario,
									TxtPasswordUsuario,
									IdGenero,
									TxtDescripcion,
									TxtImg
									)
		VALUES
									(
									@UltimoID + 1,
									@IdInstitucion,
									@TxtNombreUsuario,
									@TxtApellidoUsuario,
									@TxtEmailUsuario,
									@TxtPasswordUsuario,
									@IdGenero,
									@TxtDescripcion,
									@TxtImg
									)
		SET @FilasAfectadas			= @@ROWCOUNT
	END TRY

	BEGIN CATCH
		SET @FilasAfectadas			= 0
	END CATCH

	--COMPROBAR EL ÉXITO O FRACASO DE LA TRANSACCION --

	IF (@FilasAfectadas > 0)
		BEGIN
			SET @Resultado			= @UltimoID + 1
			COMMIT
		END
		ELSE
			BEGIN
				SET @Resultado			= 0
				ROLLBACK
	END

		SELECT Resultado			= @Resultado
END



exec Sesion.SPAgregarUsuario 1, 'Edvin', 'Alballero', 'ed@gmail.com', 1234, 2, 'no', 'ss'


/*
	Tipo:	Obtener todos los usuarios
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	26/07/2021
	-------------------------------------
*/

CREATE PROC Sesion.SPObtenerUsuarios
AS
BEGIN
	SELECT
		a.IdUsuario, 
		CONCAT (a.TxtNombreUsuario, ' ', a.TxtApellidoUsuario) AS TxtNombre,
		i.TxtNombreInstitucion,
		r.TxtNombreRol,
		a.TxtEmailUsuario,
		a.TxtPasswordUsuario,
		a.TxtGenero,
		a.TxtDescripcion,
		a.TxtImg
	FROM Sesion.TblUsuario AS a, Sesion.TblInstitucion AS i, Sesion.TblRol AS r
	WHERE 
		i.IdInstitucion = a.IdInstitucion and
		r.IdRol = a.IdRol and
		a.IntEstado > 0
END






/*
	Tipo:	Obtener usuario en específico
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	26/07/2021
	-------------------------------------
*/

CREATE PROC Sesion.SPObtenerDatosUsuario (@IdUsuario INT)
AS
BEGIN
	SELECT
		a.IdUsuario, 
		CONCAT (a.TxtNombreUsuario, ' ', a.TxtApellidoUsuario) AS TxtNombre,
		i.TxtNombreInstitucion,
		r.TxtNombreRol,
		a.TxtEmailUsuario,
		a.TxtPasswordUsuario,
		a.TxtGenero,
		a.TxtDescripcion,
		a.TxtImg
	FROM Sesion.TblUsuario AS a, Sesion.TblInstitucion AS i, Sesion.TblRol AS r
	WHERE 
		i.IdInstitucion = a.IdInstitucion and
		r.IdRol = a.IdRol and
		a.IdUsuario = @IdUsuario
END







/*
	Tipo:	Eliminar un usuario
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	26/07/2021
	-------------------------------------
*/

CREATE PROC Sesion.SPEliminarUsuario (@IdUsuario INT)
AS
DECLARE @FilasAfectadas TINYINT,
		@Resultado		INT
BEGIN
	BEGIN TRAN

		BEGIN TRY
			UPDATE Sesion.TblUsuario SET IntEstado	= 0
			WHERE IdUsuario							= @IdUsuario

			--Si se hizo la transacción, se asigna las filas afectadas
			SET @FilasAfectadas						= @@ROWCOUNT

		END TRY

		BEGIN CATCH
			--Si no se hizo la transacción, se asigna 0
			SET @FilasAfectadas						= 0
		END CATCH

		-- Se comprueba la transacción y se hace la operación correspondiente
		IF(@FilasAfectadas > 0)
			BEGIN
				SET @Resultado = @IdUsuario
				COMMIT -- Se confirma
			END
		ELSE
			BEGIN
				SET @Resultado = 0
				ROLLBACK -- Se regresa al estado anterior
			END

		SELECT Resultado = @Resultado
END 



/*
	Tipo:	Actualizar datos de usuario
	-------------------------------------
	Autor:	Widman Esquivel
	Fecha:	28/07/2021
	-------------------------------------
*/

CREATE PROC Sesion.SPActualizarUsuario (
											@IdUsuario				INT,
											@IdRol					INT,
											@IdInstitucion			INT,
											@TxtNombreUsuario		NVARCHAR(50),
											@TxtApellidoUsuario		NVARCHAR(50),
											@TxtEmailUsuario		NVARCHAR(100),
											@TxtPasswordUsuario		NVARCHAR(150),
											@TxtGenero				NVARCHAR(15),
											@TxtDescripcion			NVARCHAR(150),
											@TxtImg					NVARCHAR(100)
										)
AS
DECLARE @FilasAfectadas TINYINT,
		@Resultado		INT
BEGIN
	BEGIN TRAN

		BEGIN TRY
			UPDATE Sesion.TblUsuario 
			SET								IdRol				=	@IdRol,
											IdInstitucion		=	@IdInstitucion,
											TxtNombreUsuario	=	@TxtNombreUsuario,
											TxtApellidoUsuario	=	@TxtApellidoUsuario,
											TxtEmailUsuario		=	@TxtEmailUsuario,
											TxtPasswordUsuario	=	@TxtPasswordUsuario,
											TxtGenero			=	@TxtGenero,
											TxtDescripcion		=	@TxtDescripcion,
											TxtImg				=	TxtImg

			WHERE							IdUsuario			=	@IdUsuario

			--Si se hizo la transacción, se asigna las filas afectadas
			SET @FilasAfectadas						= @@ROWCOUNT

		END TRY

		BEGIN CATCH
			--Si no se hizo la transacción, se asigna 0
			SET @FilasAfectadas						= 0
		END CATCH

		-- Se comprueba la transacción y se hace la operación correspondiente
		IF(@FilasAfectadas > 0)
			BEGIN
				SET @Resultado = @IdUsuario
				COMMIT -- Se confirma
			END
		ELSE
			BEGIN
				SET @Resultado = 0
				ROLLBACK -- Se regresa al estado anterior
			END

		SELECT Resultado = @Resultado
END 