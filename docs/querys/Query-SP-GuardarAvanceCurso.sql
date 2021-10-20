

/*
	+-------------------------------------------+
	|	Tipo:	PROCEDURE Guardar avance		|
	+-------------------------------------------+
	|	Autor:	Widman Esquivel					|
	|	Fecha:	22/09/2021						|
	+-------------------------------------------+
*/

CREATE PROC Aula.SPGuardarAvanceCurso (
	@IdEstudianteAsignacion INT, 
	@IdCapituloMaterial INT,
	@FechaInicio DATETIME,
	@IntPuntajeObtenido INT
	)
AS
DECLARE 
		@FilasAfectadas	TINYINT,
		@Resultado		SMALLINT,
		@UltimoID		SMALLINT,
		@FechaFin		DATETIME = getdate()
BEGIN
	BEGIN TRAN
		SELECT @UltimoID = ISNULL(MAX(a.IdEstudianteResultados),0) 
		FROM Aula.EstudianteResultados AS a
	BEGIN TRY
		INSERT INTO Aula.EstudianteResultados (
			IdEstudianteResultados, 
			IdEstudianteAsignacion, 
			IdCapituloMaterial, 
			FechaInicio,
			FechaFinallizacion,
			IntPuntajeObtenido
			)
		VALUES(
			@UltimoID + 1,
			@IdEstudianteAsignacion,
			@IdCapituloMaterial,
			@FechaInicio,
			@FechaFin,
			@IntPuntajeObtenido
			)
		SET @FilasAfectadas = @@ROWCOUNT
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


exec Aula.SPGuardarAvanceCurso 1, 1, '2021-09-23 22:26:17.157', 8
exec Aula.SPGuardarAvanceCurso 1, 2, '2021-09-23 22:26:17.157', 5
