/*
	+---------------------------------------+
	|	Tipo:	Agregar encabezado de hoja	|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	26/10/2021					|
	+---------------------------------------+
*/

ALTER PROC Aula.AgregarHojaEncabezado (
										@TxtTitulo nvarchar(100),
										@RefLogo nvarchar(250),
										@TxtDocente nvarchar(250),
										@FechaAplicacion nvarchar(250),
										@TxtTipoHoja nvarchar(100),
										@IntPrivacidad int,
										@IdUsuario int
								)
AS
DECLARE @FilasAfectadas	TINYINT,
		@Resultado		SMALLINT,
		@UltimoID		SMALLINT,
		@IdHojaEncabezado INT
BEGIN
	BEGIN TRAN

		SELECT @UltimoID = ISNULL(MAX(a.IdHojaEncabezado),0) 
		FROM Aula.HojaEncabezado AS a

	BEGIN TRY

		INSERT INTO Aula.HojaEncabezado (IdHojaEncabezado, RefLogo, TxtDocente, TxtTitulo, FechaAplicacion, TxtTipoHoja, IntPrivacidad, IdUsuario)
		VALUES( @UltimoID + 1, @RefLogo, @TxtDocente, @TxtTitulo, @FechaAplicacion, @TxtTipoHoja, @IntPrivacidad, @IdUsuario)

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







/*
	+---------------------------------------+
	|	Tipo:	Agregar cuerpo de hoja		|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	26/10/2021					|
	+---------------------------------------+
*/

ALTER PROC Aula.AgregarHojaCuerpo (
										@IdHojaEncabezado int,
										@TxtDescripcion nvarchar(500)
								)
AS
DECLARE @FilasAfectadas	TINYINT,
		@Resultado		SMALLINT,
		@UltimoID		SMALLINT
BEGIN
	BEGIN TRAN

		SELECT @UltimoID = ISNULL(MAX(a.IdHojaCuerpo),0) 
		FROM Aula.HojaCuerpo AS a

	BEGIN TRY

		INSERT INTO Aula.HojaCuerpo(IdHojaCuerpo, IdHojaEncabezado, TxtDescripcion )
		VALUES( @UltimoID + 1, @IdHojaEncabezado, @TxtDescripcion)

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







/*
	+---------------------------------------+
	|	Tipo:	Agregar seccion de hoja		|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	26/10/2021					|
	+---------------------------------------+
*/

ALTER PROC Aula.AgregarHojaSeccion (
										
										@IdHojaCuerpo int,
										@IdTipoEvaluacion int
								)
AS
DECLARE @FilasAfectadas	TINYINT,
		@Resultado		SMALLINT,
		@UltimoID		SMALLINT
BEGIN
	BEGIN TRAN

		SELECT @UltimoID = ISNULL(MAX(a.IdHojaSeccion),0) 
		FROM Aula.HojaSeccion AS a

	BEGIN TRY

		INSERT INTO Aula.HojaSeccion(IdHojaSeccion, IdHojaCuerpo, IdTipoEvaluacion )
		VALUES( @UltimoID + 1, @IdHojaCuerpo, @IdTipoEvaluacion)

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


/*
	+---------------------------------------+
	|	Tipo:	Agregar palabras de hoja	|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	26/10/2021					|
	+---------------------------------------+
*/

ALTER PROC Aula.AgregarHojaPalabras (
										
										@IdHojaSeccion int,
										@IdPalabra int
								)
AS
DECLARE @FilasAfectadas	TINYINT,
		@Resultado		SMALLINT,
		@UltimoID		SMALLINT
BEGIN
	BEGIN TRAN

		SELECT @UltimoID = ISNULL(MAX(a.IdHojaPalabra),0) 
		FROM Aula.HojaPalabra AS a

	BEGIN TRY

		INSERT INTO Aula.HojaPalabra(IdHojaPalabra, IdHojaSeccion, IdPalabra)
		VALUES( @UltimoID + 1, @IdHojaSeccion, @IdPalabra)

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





/*
	+---------------------------------------+
	|	Tipo:	Ver encabezado de hoja		|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	26/10/2021					|
	+---------------------------------------+
*/
CREATE PROC Aula.VerHojaEncabezado(@IdHojaEncabezado int)
AS
BEGIN

	select	
			h.TxtTitulo, h.TxtDocente, h.TxtTipoHoja, h.FechaAplicacion
	from	
			Aula.HojaEncabezado AS h
	where
			h.IdHojaEncabezado = @IdHojaEncabezado

END



/*
	+---------------------------------------+
	|	Tipo:	Ver cuerpo de hoja			|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	26/10/2021					|
	+---------------------------------------+
*/
CREATE PROC Aula.VerHojaCuerpo(@IdHojaCuerpo int)
AS
BEGIN

	select	
			h.TxtDescripcion
	from	
			Aula.HojaCuerpo AS h
	where
			h.IdHojaCuerpo = @IdHojaCuerpo

END