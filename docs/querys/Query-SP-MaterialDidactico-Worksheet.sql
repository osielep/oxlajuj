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
ALTER PROC Aula.VerHojaCuerpo(@IdHojaCuerpo int)
AS
BEGIN

	select	
			 h.TxtDescripcion, h.IdHojaCuerpo
	from	
			Aula.HojaCuerpo AS h
	where
			h.IdHojaCuerpo = @IdHojaCuerpo

END


/*
	+---------------------------------------+
	|	Tipo:	Ver Worksheets				|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	11/11/2021					|
	+---------------------------------------+
*/
CREATE PROC Aula.SP_VerAllWorksheet
AS
BEGIN

	select e.IdHojaEncabezado, e.TxtTitulo, c.TxtDescripcion
	from aula.HojaEncabezado as e, aula.HojaCuerpo as c
	where e.IdHojaEncabezado = c.IdHojaEncabezado and
	e.IntPrivacidad = 1

END



/*
	+---------------------------------------+
	|	Tipo:	Ver todas las series		|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	11/11/2021					|
	+---------------------------------------+
*/
ALTER PROC Aula.SP_VerTodasLasSeries (@IdHojaCuerpo as INT)
AS
BEGIN

	select c.IdHojaCuerpo, s.IdHojaSeccion, s.IdTipoEvaluacion, e.TxtNombreEvaluacion, e.TxtDescripcion
	from Aula.HojaCuerpo AS c, Aula.HojaSeccion AS s, Aula.TipoEvaluacion AS e
	where s.IdHojaCuerpo = c.IdHojaCuerpo and
	s.IdTipoEvaluacion = e.IdTipoEvaluacion and
	c.IdHojaCuerpo = @IdHojaCuerpo

END



/*
	+---------------------------------------+
	|	Tipo:	Ver cuerpo de Workshheet	|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	11/11/2021					|
	+---------------------------------------+
*/
CREATE PROC Aula.SP_VerCuerpoP (@IdHojaEncabezado as INT)
AS
BEGIN

	select * 
	from aula.HojaCuerpo 
	where IdHojaEncabezado = @IdHojaEncabezado

END



/*
	+---------------------------------------+
	|	Tipo:	Ver palabras de Worksheet	|
	+---------------------------------------+
	|	Autor:	Widman Esquivel				|
	|	Fecha:	11/11/2021					|
	+---------------------------------------+
*/
CREATE PROC Aula.SP_VerPalabrasP(@IdHojaCuerpo as INT)
AS
BEGIN

	select c.IdHojaCuerpo, s.IdHojaSeccion, p.IdHojaPalabra, i.TxtPalabraEspanol, i.TxtPalabraIdiomaMaya
	from aula.HojaCuerpo as c, aula.HojaSeccion AS s, aula.HojaPalabra AS p, idiomas.TblPalabra AS i
	where p.IdHojaSeccion = s.IdHojaSeccion
	and s.IdHojaCuerpo = c.IdHojaCuerpo 
	and p.IdPalabra = i.IdPalabra
	and c.IdHojaCuerpo = @IdHojaCuerpo

END

exec Aula.SP_VerPalabrasP 5




